(function startCloudJourney(root) {
  "use strict";

  const core = root.CloudJourneyCore;
  const sessionApi = root.CloudJourneySession;
  const rendererApi = root.CloudJourneyRenderer;
  if (!core || !sessionApi || !rendererApi) throw new Error("Cloud Journey scripts loaded in the wrong order");

  const elements = {
    canvas: document.querySelector("#game-canvas"),
    timer: document.querySelector("#timer-value"),
    level: document.querySelector("#level-value"),
    score: document.querySelector("#score-value"),
    pauseButton: document.querySelector("#pause-button"),
    readyPanel: document.querySelector("#ready-panel"),
    pausePanel: document.querySelector("#pause-panel"),
    resultPanel: document.querySelector("#result-panel"),
    countdownPanel: document.querySelector("#countdown-panel"),
    feedbackLayer: document.querySelector("#feedback-layer"),
    seedInput: document.querySelector("#seed-input"),
    runModeNote: document.querySelector("#run-mode-note"),
    liveStatus: document.querySelector("#live-status"),
    startButton: document.querySelector("#start-button"),
    resumeButton: document.querySelector("#resume-button"),
    restartFromPause: document.querySelector("#restart-from-pause"),
    replayButton: document.querySelector("#replay-button"),
    newSeedButton: document.querySelector("#new-seed-button"),
    exportButton: document.querySelector("#export-button"),
    resultScore: document.querySelector("#result-score"),
    resultLevel: document.querySelector("#result-level"),
    resultPasses: document.querySelector("#result-passes"),
    resultCoins: document.querySelector("#result-coins"),
    resultCollisions: document.querySelector("#result-collisions"),
    resultSeed: document.querySelector("#result-seed"),
    playtestPanel: document.querySelector("#playtest-panel"),
    playtestToggle: document.querySelector("#playtest-toggle"),
    playtestSummary: document.querySelector("#playtest-summary"),
    playtestModeNote: document.querySelector("#playtest-mode-note"),
    playtestLevelButtons: Array.from(document.querySelectorAll("[data-playtest-level]")),
    speedPercent: document.querySelector("#speed-percent"),
    speedOutput: document.querySelector("#speed-output"),
    gapPercent: document.querySelector("#gap-percent"),
    gapOutput: document.querySelector("#gap-output"),
    frequencyPercent: document.querySelector("#frequency-percent"),
    frequencyOutput: document.querySelector("#frequency-output"),
    playtestReset: document.querySelector("#playtest-reset")
  };

  const query = new URLSearchParams(location.search);
  const requestedDuration = Number(query.get("duration"));
  const duration = Number.isFinite(requestedDuration) && requestedDuration >= 5
    ? Math.min(core.CONFIG.durationSeconds, requestedDuration)
    : core.CONFIG.durationSeconds;
  const renderer = rendererApi.createRenderer(elements.canvas);
  let session = null;
  let animationFrame = 0;
  let lastTimestamp = 0;
  let eventCursor = 0;
  let holding = false;
  let paused = false;
  let countdownToken = 0;
  let playtestSettings = { ...sessionApi.DEFAULT_PLAYTEST_SETTINGS };

  function newSeed() {
    return String(Date.now()).slice(-9);
  }

  function formatTime(seconds) {
    const wholeSeconds = Math.max(0, Math.ceil(seconds));
    const minutes = Math.floor(wholeSeconds / 60);
    const remainder = wholeSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }

  function setPanel(panel, visible) {
    panel.classList.toggle("overlay-panel--visible", visible);
    panel.setAttribute("aria-hidden", String(!visible));
  }

  function updateToolbar() {
    elements.timer.textContent = formatTime(session?.remaining ?? duration);
    elements.level.textContent = `L${session?.level ?? 1}`;
    elements.score.textContent = String(session?.score ?? 0);
    updatePlaytestSummary();
  }

  function currentPlaytestLevel() {
    if (session) return session.level;
    return playtestSettings.mode === "locked" ? playtestSettings.lockedLevel : 1;
  }

  function updatePlaytestSummary() {
    const modeLabel = playtestSettings.mode === "locked" ? "手动" : "自动";
    elements.playtestSummary.textContent = `${modeLabel} · L${currentPlaytestLevel()}`;
  }

  function renderPlaytestPanel() {
    const selected = playtestSettings.mode === "locked"
      ? String(playtestSettings.lockedLevel)
      : "auto";
    for (const button of elements.playtestLevelButtons) {
      button.setAttribute("aria-pressed", String(button.dataset.playtestLevel === selected));
    }
    elements.speedPercent.value = String(playtestSettings.speedPercent);
    elements.gapPercent.value = String(playtestSettings.gapPercent);
    elements.frequencyPercent.value = String(playtestSettings.frequencyPercent);
    elements.speedOutput.textContent = `${playtestSettings.speedPercent}%`;
    elements.gapOutput.textContent = `${playtestSettings.gapPercent}%`;
    elements.frequencyOutput.textContent = `${playtestSettings.frequencyPercent}%`;
    elements.playtestModeNote.textContent = playtestSettings.mode === "locked"
      ? `手动锁定：本回合固定在 L${playtestSettings.lockedLevel}，计分不会带离该等级。`
      : "自动模式：按正式计分规则升降级。";
    updatePlaytestSummary();
  }

  function applyPlaytestChanges(changes, message) {
    playtestSettings = sessionApi.normalizePlaytestSettings({ ...playtestSettings, ...changes });
    if (session?.status === "running") sessionApi.setPlaytestSettings(session, playtestSettings);
    renderPlaytestPanel();
    updateToolbar();
    if (message) announce(message);
  }

  function announce(text) {
    elements.liveStatus.textContent = "";
    requestAnimationFrame(() => { elements.liveStatus.textContent = text; });
  }

  function showFeedback(text, kind = "pass") {
    const node = document.createElement("div");
    node.className = `score-pop score-pop--${kind}`;
    node.textContent = text;
    elements.feedbackLayer.append(node);
    node.addEventListener("animationend", () => node.remove(), { once: true });
  }

  function showLevelChange(from, to) {
    const node = document.createElement("div");
    node.className = "level-pop";
    node.textContent = to > from ? `难度提升至 L${to}` : `难度调整至 L${to}`;
    elements.feedbackLayer.append(node);
    node.addEventListener("animationend", () => node.remove(), { once: true });
    announce(node.textContent);
  }

  function processEvents() {
    while (eventCursor < session.events.length) {
      const event = session.events[eventCursor];
      eventCursor += 1;
      if (event.type === "pass") showFeedback("+10", "pass");
      if (event.type === "coin") {
        showFeedback("指南针 +30", "coin");
        announce("收集指南针，加 30 分");
      }
      if (event.type === "collision") {
        showFeedback("碰撞 -10", "hit");
        announce("碰到逆风云，扣 10 分");
      }
      if (event.type === "level") showLevelChange(event.from, event.to);
    }
  }

  function finishGame() {
    cancelAnimationFrame(animationFrame);
    holding = false;
    paused = false;
    elements.pauseButton.disabled = true;
    elements.resultScore.textContent = String(session.score);
    elements.resultLevel.textContent = `L${session.maxLevel}`;
    elements.resultPasses.textContent = String(session.totals.passes);
    elements.resultCoins.textContent = String(session.totals.coins);
    elements.resultCollisions.textContent = String(session.totals.collisions);
    elements.resultSeed.textContent = session.seed;
    setPanel(elements.resultPanel, true);
    elements.replayButton.focus();
    announce(`训练完成，总分 ${session.score}，最高难度 L${session.maxLevel}`);
  }

  function gameLoop(timestamp) {
    if (!session || session.status === "ended") return;
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaSeconds = Math.min(0.1, (timestamp - lastTimestamp) / 1000);
    lastTimestamp = timestamp;
    if (!paused) {
      sessionApi.advanceSession(session, deltaSeconds, holding);
      processEvents();
      updateToolbar();
    }
    renderer.draw(session);
    if (session.status === "ended") finishGame();
    else animationFrame = requestAnimationFrame(gameLoop);
  }

  function delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  async function runCountdown(token) {
    elements.countdownPanel.classList.add("countdown-panel--visible");
    for (const value of [3, 2, 1]) {
      if (token !== countdownToken) return false;
      elements.countdownPanel.textContent = value;
      await delay(650);
    }
    if (token !== countdownToken) return false;
    elements.countdownPanel.textContent = "出发";
    await delay(450);
    elements.countdownPanel.classList.remove("countdown-panel--visible");
    elements.countdownPanel.textContent = "";
    return token === countdownToken;
  }

  async function beginGame({ skipCountdown = false } = {}) {
    countdownToken += 1;
    const token = countdownToken;
    cancelAnimationFrame(animationFrame);
    setPanel(elements.readyPanel, false);
    setPanel(elements.pausePanel, false);
    setPanel(elements.resultPanel, false);
    elements.feedbackLayer.replaceChildren();
    elements.startButton.disabled = true;
    if (!skipCountdown && !(await runCountdown(token))) return;

    const seed = elements.seedInput.value.trim() || newSeed();
    elements.seedInput.value = seed;
    session = sessionApi.createSession({ seed, duration, playtestSettings });
    eventCursor = session.events.length;
    holding = false;
    paused = false;
    lastTimestamp = 0;
    elements.pauseButton.disabled = false;
    elements.pauseButton.setAttribute("aria-label", "暂停游戏");
    elements.pauseButton.lastElementChild.textContent = "暂停";
    elements.startButton.disabled = false;
    updateToolbar();
    renderer.draw(session);
    elements.canvas.focus();
    announce("旅程开始。按住上升，松开下降。");
    animationFrame = requestAnimationFrame(gameLoop);
  }

  function pauseGame() {
    if (!session || session.status !== "running" || paused) return;
    paused = true;
    holding = false;
    setPanel(elements.pausePanel, true);
    elements.pauseButton.setAttribute("aria-label", "继续游戏");
    elements.pauseButton.lastElementChild.textContent = "继续";
    elements.resumeButton.focus();
    announce("游戏已暂停");
  }

  function resumeGame() {
    if (!session || !paused) return;
    paused = false;
    lastTimestamp = performance.now();
    setPanel(elements.pausePanel, false);
    elements.pauseButton.setAttribute("aria-label", "暂停游戏");
    elements.pauseButton.lastElementChild.textContent = "暂停";
    elements.canvas.focus();
    announce("继续旅程");
  }

  function exportRun() {
    if (!session) return;
    const data = sessionApi.exportSession(session);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `云上之旅_试玩记录_${session.seed}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function setHolding(value) {
    if (!session || session.status !== "running" || paused) return;
    holding = value;
  }

  elements.startButton.addEventListener("click", () => beginGame());
  elements.pauseButton.addEventListener("click", () => paused ? resumeGame() : pauseGame());
  elements.resumeButton.addEventListener("click", resumeGame);
  elements.restartFromPause.addEventListener("click", () => beginGame());
  elements.replayButton.addEventListener("click", () => beginGame());
  elements.newSeedButton.addEventListener("click", () => {
    elements.seedInput.value = newSeed();
    beginGame();
  });
  elements.exportButton.addEventListener("click", exportRun);
  elements.playtestToggle.addEventListener("click", () => {
    const collapsed = elements.playtestPanel.classList.toggle("playtest-panel--collapsed");
    elements.playtestToggle.setAttribute("aria-expanded", String(!collapsed));
  });
  for (const button of elements.playtestLevelButtons) {
    button.addEventListener("click", () => {
      const value = button.dataset.playtestLevel;
      if (value === "auto") {
        applyPlaytestChanges({ mode: "auto" }, "已恢复自动难度");
      } else {
        const level = Number(value);
        applyPlaytestChanges(
          { mode: "locked", lockedLevel: level },
          `已锁定 L${level}，后续障碍按该等级生成`
        );
      }
    });
  }
  elements.speedPercent.addEventListener("input", () => {
    applyPlaytestChanges(
      { speedPercent: Number(elements.speedPercent.value) },
      `障碍速度调整为 ${elements.speedPercent.value}%`
    );
  });
  elements.gapPercent.addEventListener("input", () => {
    applyPlaytestChanges(
      { gapPercent: Number(elements.gapPercent.value) },
      `通道宽度调整为 ${elements.gapPercent.value}%，下一组生效`
    );
  });
  elements.frequencyPercent.addEventListener("input", () => {
    applyPlaytestChanges(
      { frequencyPercent: Number(elements.frequencyPercent.value) },
      `出现频率调整为 ${elements.frequencyPercent.value}%，下一组生效`
    );
  });
  elements.playtestReset.addEventListener("click", () => {
    applyPlaytestChanges(
      { ...sessionApi.DEFAULT_PLAYTEST_SETTINGS },
      "试玩设置已恢复默认"
    );
  });

  elements.canvas.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    elements.canvas.setPointerCapture?.(event.pointerId);
    setHolding(true);
  });
  elements.canvas.addEventListener("pointerup", () => setHolding(false));
  elements.canvas.addEventListener("pointercancel", () => setHolding(false));
  elements.canvas.addEventListener("lostpointercapture", () => setHolding(false));
  elements.canvas.addEventListener("contextmenu", (event) => event.preventDefault());

  document.addEventListener("keydown", (event) => {
    const editingControl = event.target instanceof Element && Boolean(event.target.closest("button, input"));
    if ((event.code === "Space" || event.code === "ArrowUp") && !editingControl) {
      event.preventDefault();
      setHolding(true);
    }
    if (event.code === "Escape" && session?.status === "running") {
      event.preventDefault();
      paused ? resumeGame() : pauseGame();
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.code === "Space" || event.code === "ArrowUp") setHolding(false);
  });
  root.addEventListener("blur", () => setHolding(false));

  elements.seedInput.value = query.get("seed") || newSeed();
  if (duration < core.CONFIG.durationSeconds) {
    elements.runModeNote.textContent = `快速验收模式：${duration} 秒（正常试玩为 120 秒）`;
  }
  renderPlaytestPanel();
  updateToolbar();
  renderer.load().then((missingAssets) => {
    renderer.draw(null);
    if (missingAssets.length) announce(`有 ${missingAssets.length} 项候选素材未加载，已使用灰盒替代显示。`);
  });
})(typeof globalThis !== "undefined" ? globalThis : this);
