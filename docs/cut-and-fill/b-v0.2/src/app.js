(function () {
  "use strict";

  const { CutFillBEngine, makeQuestion, findHintRoute, keyOf, sameCell } = window.CutFillB;
  const SCORE = { 1: 10, 2: 15, 3: 20, 4: 25, 5: 30, 6: 35 };
  const THRESHOLD = { 1: 20, 2: 30, 3: 40, 4: 50, 5: 90, 6: Infinity };
  const ROUND_SECONDS = 120;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const refs = {
    board: $("#board"), boardFrame: $("#boardFrame"), time: $("#timeValue"), level: $("#levelValue"), score: $("#scoreValue"),
    questionId: $("#questionId"), detail: $("#questionDetail"), feedback: $("#feedback"), hint: $("#hintButton"),
    startModal: $("#startModal"), pauseModal: $("#pauseModal"), resultModal: $("#resultModal"), finalScore: $("#finalScore"), bgm: $("#bgm"),
    modeLabel: $("#modeLabel"), density: $("#densityRange"), hintRange: $("#hintRange"), speed: $("#speedRange"),
    densityOutput: $("#densityOutput"), hintOutput: $("#hintOutput"), speedOutput: $("#speedOutput")
  };

  const state = {
    started: false, ended: false, paused: false, inputLocked: true, mode: "auto", level: 1,
    score: 0, progress: 0, completed: 0, assistedCompleted: 0, timeLeft: ROUND_SECONDS,
    lastTick: 0, timerId: null, stepIdleAt: 0, hintAvailable: false, assistedQuestion: false,
    hintRoute: [], engine: null, question: null, recentByLevel: {},
    config: { density: 100, hintDelay: 100, animationSpeed: 100 },
    pointerActive: false, activePointerId: null, lastPointerCell: null, feedbackTimer: null, generation: 0, inputLockedHint: false
  };

  function levelNumber(value) { return Number(String(value).replace("L", "")); }
  function formatTime(seconds) {
    const value = Math.max(0, Math.ceil(seconds));
    return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
  }

  function updateHeader() {
    refs.time.textContent = formatTime(state.timeLeft);
    refs.level.textContent = `L${state.level}`;
    refs.score.textContent = String(state.score);
    refs.modeLabel.textContent = `${state.mode === "auto" ? "自动" : "锁定"} · L${state.level}`;
    refs.time.classList.toggle("urgent", state.timeLeft <= 10);
  }

  function resizeBoard() {
    if (!state.question) return;
    const stage = $(".game-stage").getBoundingClientRect();
    const panelExpanded = stage.width >= 1000 && !$("#controlPanel").classList.contains("collapsed");
    const maxFrameWidth = Math.max(300, Math.min(panelExpanded ? stage.width - 300 : stage.width - 24, 1100));
    const maxFrameHeight = Math.max(300, Math.min(stage.height - 100, 820));
    const edge = Math.max(32, Math.min(60, Math.floor(Math.min(maxFrameWidth, maxFrameHeight) * .085)));
    const gap = 2;
    const maxCell = panelExpanded ? 145 : 165;
    const cell = Math.floor(Math.min(
      (maxFrameWidth - edge * 2 - gap * (state.question.cols - 1)) / state.question.cols,
      (maxFrameHeight - edge * 2 - gap * (state.question.rows - 1)) / state.question.rows,
      maxCell
    ));
    const safeCell = Math.max(32, cell);
    const gridWidth = safeCell * state.question.cols + gap * (state.question.cols - 1);
    const gridHeight = safeCell * state.question.rows + gap * (state.question.rows - 1);
    refs.boardFrame.style.width = `${gridWidth + edge * 2}px`;
    refs.boardFrame.style.height = `${gridHeight + edge * 2}px`;
    refs.boardFrame.style.setProperty("--frame-edge", `${edge}px`);
    refs.boardFrame.style.transform = panelExpanded ? "translateX(-58px)" : "translateX(0)";
    refs.board.style.setProperty("--cell", `${safeCell}px`);
    refs.board.style.setProperty("--cols", state.question.cols);
    refs.board.style.setProperty("--rows", state.question.rows);
  }

  function byLevel(level) {
    return window.B_MOTHERS.filter((mother) => levelNumber(mother.difficulty) === level);
  }

  function chooseMother(level) {
    const options = byLevel(level);
    const recent = state.recentByLevel[level] || [];
    const fresh = options.filter((item) => !recent.includes(item.templateId));
    const pool = fresh.length ? fresh : options;
    const mother = pool[Math.floor(Math.random() * pool.length)];
    state.recentByLevel[level] = [...recent, mother.templateId].slice(-Math.min(2, options.length - 1));
    return mother;
  }

  function newQuestion() {
    if (state.ended) return;
    state.generation += 1;
    state.inputLockedHint = false;
    const mother = chooseMother(state.level);
    state.question = makeQuestion(mother, { densityPercent: state.config.density });
    state.engine = new CutFillBEngine(state.question);
    state.assistedQuestion = false;
    state.hintAvailable = false;
    state.hintRoute = [];
    state.stepIdleAt = performance.now();
    state.inputLocked = false;
    refs.hint.hidden = true;
    refs.questionId.textContent = state.question.id;
    refs.detail.textContent = `${state.question.rows}×${state.question.cols} · ${state.question.soils.length}土${state.question.pits.length}坑 · ${state.question.walls.length}个障碍 · ${state.question.rotation}°`;
    renderBoard();
    updateHeader();
  }

  function cellImage(src, className, alt = "") {
    const image = document.createElement("img");
    image.src = src; image.className = `token ${className}`; image.alt = alt; image.draggable = false;
    return image;
  }

  function vehicleSource(route) {
    if (!route || route.length < 2) return "assets/elements/vehicle_up.png";
    const a = route[route.length - 2], b = route[route.length - 1];
    if (b[0] < a[0]) return "assets/elements/vehicle_up.png";
    if (b[0] > a[0]) return "assets/elements/vehicle_down.png";
    if (b[1] < a[1]) return "assets/elements/vehicle_left.png";
    return "assets/elements/vehicle_right.png";
  }

  function directionAngle(from, to) {
    if (to[0] < from[0]) return 0;
    if (to[1] > from[1]) return 90;
    if (to[0] > from[0]) return 180;
    return -90;
  }

  function nearestAngle(current, target) {
    let result = target;
    while (result - current > 180) result -= 360;
    while (result - current < -180) result += 360;
    return result;
  }

  function renderBoard() {
    if (!state.engine) return;
    const snap = state.engine.snapshot();
    const walls = new Set(snap.walls.map(keyOf));
    const routes = new Map(snap.route.map((cell, index) => [keyOf(cell), routeStyle(snap.route, index)]));
    const hints = new Map(state.hintRoute.map((cell, index) => [keyOf(cell), routeStyle(state.hintRoute, index)]));
    const filled = new Set(snap.filledPits.map(keyOf));
    const soilByCell = new Map(snap.soils.map((item) => [keyOf(item.at), item.id]));
    const pitByCell = new Map(snap.pits.map((item) => [keyOf(item.at), item.id]));
    refs.board.replaceChildren();
    for (let row = 0; row < snap.rows; row += 1) {
      for (let col = 0; col < snap.cols; col += 1) {
        const cell = [row, col], cellKey = keyOf(cell);
        const node = document.createElement("div");
        node.className = "cell";
        node.dataset.row = row; node.dataset.col = col; node.setAttribute("role", "gridcell");
        node.setAttribute("aria-label", `第${row + 1}行第${col + 1}列`);
        const track = routes.get(cellKey) || hints.get(cellKey);
        if (track) node.classList.add(routes.has(cellKey) ? "route" : "hint-route", ...track);
        if (filled.has(cellKey)) {
          node.classList.add("filled");
          node.append(cellImage("assets/vector/check.svg", "check", "已填平"));
        }
        if (walls.has(cellKey)) node.append(cellImage("assets/elements/obstacle.png", "wall", "石墩"));
        if (pitByCell.has(cellKey)) node.append(cellImage("assets/elements/pit_empty.png", "pit", "空坑"));
        if (soilByCell.has(cellKey)) node.append(cellImage("assets/elements/soil_normal.png", "soil", "土块"));
        if (sameCell(snap.car, cell)) node.append(cellImage(vehicleSource(snap.route), "vehicle", "工程车"));
        if (snap.targetPitId && pitByCell.get(cellKey) === snap.targetPitId) node.classList.add("endpoint");
        refs.board.append(node);
      }
    }
    resizeBoard();
  }

  function routeStyle(route, index) {
    const current = route[index], previous = route[index - 1], next = route[index + 1];
    const neighbors = [previous, next].filter(Boolean);
    if (neighbors.length < 2) {
      const other = neighbors[0];
      return other && other[0] === current[0] ? ["track-horizontal"] : [];
    }
    if (previous[0] === next[0]) return ["track-horizontal"];
    if (previous[1] === next[1]) return [];
    const directions = neighbors.map((cell) => `${Math.sign(cell[0] - current[0])},${Math.sign(cell[1] - current[1])}`);
    const has = (value) => directions.includes(value);
    if (has("1,0") && has("0,-1")) return ["track-turn"];
    if (has("0,-1") && has("-1,0")) return ["track-turn", "turn-90"];
    if (has("-1,0") && has("0,1")) return ["track-turn", "turn-180"];
    return ["track-turn", "turn-270"];
  }

  function showFeedback(message, type = "error", duration = 1600) {
    clearTimeout(state.feedbackTimer);
    refs.feedback.textContent = message;
    refs.feedback.className = `feedback show ${type}`;
    state.feedbackTimer = setTimeout(() => { refs.feedback.className = "feedback"; }, duration);
  }

  function cellFromEvent(event) {
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const node = target && target.closest(".cell");
    if (!node || !refs.board.contains(node)) return null;
    return [Number(node.dataset.row), Number(node.dataset.col)];
  }

  function enterToward(target) {
    if (!target || !state.engine.drawing) return;
    let current = state.engine.route[state.engine.route.length - 1];
    let guard = 0;
    while (!sameCell(current, target) && guard < 16) {
      guard += 1;
      const dr = target[0] - current[0], dc = target[1] - current[1];
      const next = Math.abs(dc) >= Math.abs(dr) && dc !== 0
        ? [current[0], current[1] + Math.sign(dc)]
        : [current[0] + Math.sign(dr), current[1]];
      const result = state.engine.enter(next);
      if (!result.accepted) break;
      current = next;
      if (result.action === "lock_pit") break;
    }
    renderBoard();
  }

  function pointerDown(event) {
    if (!state.started || state.ended || state.paused || state.inputLocked) return;
    if (state.pointerActive) return;
    const cell = cellFromEvent(event);
    if (!cell) return;
    state.hintRoute = [];
    const result = state.engine.begin(cell);
    if (!result.accepted) return;
    state.pointerActive = true;
    state.activePointerId = event.pointerId;
    state.lastPointerCell = cell;
    refs.board.setPointerCapture?.(event.pointerId);
    event.preventDefault();
    renderBoard();
  }

  function pointerMove(event) {
    if (!state.pointerActive || state.activePointerId !== event.pointerId || state.inputLocked) return;
    const cell = cellFromEvent(event);
    if (!cell || sameCell(cell, state.lastPointerCell)) return;
    state.lastPointerCell = cell;
    enterToward(cell);
    event.preventDefault();
  }

  async function pointerUp(event) {
    if (!state.pointerActive || state.activePointerId !== event.pointerId) return;
    state.pointerActive = false;
    state.activePointerId = null;
    state.lastPointerCell = null;
    if (state.engine.canCommit()) await commitGesture();
    else {
      state.engine.cancelGesture();
      renderBoard();
      showFeedback("还没有把土推进坑里，请重新划线。");
    }
    event.preventDefault();
  }

  function pointerCancel(event) {
    if (!state.pointerActive || state.activePointerId !== event.pointerId) return;
    state.pointerActive = false; state.activePointerId = null; state.lastPointerCell = null;
    state.engine.cancelGesture(); renderBoard();
  }

  function tokenPosition(cell) {
    const node = refs.board.querySelector(`[data-row="${cell[0]}"][data-col="${cell[1]}"]`);
    return node ? { x: node.offsetLeft, y: node.offsetTop, size: node.offsetWidth } : { x: 0, y: 0, size: 50 };
  }

  async function animateRoute(route, soilIndex, ghostOnly = false) {
    const desired = ghostOnly ? 45000 / state.config.animationSpeed : 22000 / state.config.animationSpeed;
    const moveDuration = ghostOnly
      ? Math.max(3000 / route.length, Math.min(6000 / route.length, desired))
      : Math.max(75, desired);
    const turnDuration = Math.max(90, 14000 / state.config.animationSpeed);
    if (ghostOnly) { state.hintRoute = route.map((cell) => [...cell]); renderBoard(); }

    const car = document.createElement("img");
    car.src = "assets/elements/vehicle_up.png";
    car.className = "moving-token car";
    if (ghostOnly) { car.style.opacity = ".58"; car.style.filter = "saturate(.65)"; }
    const staticCar = refs.board.querySelector(`[data-row="${route[0][0]}"][data-col="${route[0][1]}"] .vehicle`);
    const staticSoil = refs.board.querySelector(`[data-row="${route[soilIndex][0]}"][data-col="${route[soilIndex][1]}"] .soil`);
    if (staticCar) staticCar.style.visibility = "hidden";
    refs.board.append(car);
    const startCar = tokenPosition(route[0]);
    car.style.width = `${startCar.size}px`; car.style.height = `${startCar.size}px`;
    car.style.transform = `translate(${startCar.x}px, ${startCar.y}px)`;
    await wait(40);

    for (let i = 1; i < soilIndex; i += 1) {
      car.src = vehicleSource([route[i - 1], route[i]]);
      const carPos = tokenPosition(route[i]);
      car.style.transition = `transform ${moveDuration}ms linear`;
      car.style.transform = `translate(${carPos.x}px, ${carPos.y}px)`;
      await wait(moveDuration);
    }

    if (staticSoil) staticSoil.style.visibility = "hidden";
    car.remove();
    const unit = document.createElement("div");
    unit.className = `push-unit${ghostOnly ? " ghost-push" : ""}`;
    const pushCar = document.createElement("img");
    pushCar.src = "assets/elements/vehicle_up.png"; pushCar.className = "push-car"; pushCar.alt = "";
    const pushSoil = document.createElement("img");
    pushSoil.src = "assets/elements/soil_normal.png"; pushSoil.className = "push-soil"; pushSoil.alt = "";
    unit.append(pushCar, pushSoil);
    refs.board.append(unit);

    let soilPosition = tokenPosition(route[soilIndex]);
    let angle = directionAngle(route[soilIndex - 1], route[soilIndex]);
    unit.style.width = `${soilPosition.size}px`; unit.style.height = `${soilPosition.size}px`;
    unit.style.transform = `translate(${soilPosition.x}px, ${soilPosition.y}px) rotate(${angle}deg)`;
    await wait(40);

    for (let i = soilIndex + 1; i < route.length; i += 1) {
      const targetAngle = nearestAngle(angle, directionAngle(route[i - 1], route[i]));
      if (targetAngle !== angle) {
        unit.style.transition = `transform ${turnDuration}ms ease-in-out`;
        unit.style.transform = `translate(${soilPosition.x}px, ${soilPosition.y}px) rotate(${targetAngle}deg)`;
        await wait(turnDuration);
        angle = targetAngle;
      }
      soilPosition = tokenPosition(route[i]);
      unit.style.transition = `transform ${moveDuration}ms linear`;
      unit.style.transform = `translate(${soilPosition.x}px, ${soilPosition.y}px) rotate(${angle}deg)`;
      await wait(moveDuration);
    }
    unit.remove();
    if (ghostOnly) renderBoard();
  }

  async function commitGesture() {
    const generation = state.generation;
    state.inputLocked = true;
    const route = state.engine.route.map((cell) => [...cell]);
    const selectedAt = state.engine.soils.get(state.engine.selectedSoilId);
    const soilIndex = route.findIndex((cell) => sameCell(cell, selectedAt));
    await animateRoute(route, soilIndex);
    if (state.ended || generation !== state.generation) return;
    const result = state.engine.commit();
    renderBoard();
    state.stepIdleAt = performance.now();
    if (result.complete) await completeQuestion();
    else {
      state.inputLocked = false;
      showFeedback("推进成功，继续填满剩余的坑。", "success");
    }
  }

  async function completeQuestion() {
    const points = SCORE[state.level];
    state.score += points; state.completed += 1;
    let nextLevel = state.level;
    if (state.mode === "auto") {
      if (state.assistedQuestion) {
        state.assistedCompleted += 1;
        nextLevel = Math.max(1, state.level - 1); state.progress = 0;
      } else if (state.level < 6) {
        state.progress += points;
        if (state.progress >= THRESHOLD[state.level]) { nextLevel += 1; state.progress = 0; }
      }
    } else {
      if (state.assistedQuestion) state.assistedCompleted += 1;
      state.progress = 0;
    }
    updateHeader();
    showFeedback(`完成本题，+${points}分`, "success", 900);
    await wait(720);
    if (state.ended) return;
    state.level = nextLevel;
    newQuestion();
  }

  function startTimer() {
    state.lastTick = performance.now();
    clearInterval(state.timerId);
    state.timerId = setInterval(() => {
      const now = performance.now();
      if (!state.paused && !state.inputLockedHint && state.started && !state.ended) {
        state.timeLeft -= (now - state.lastTick) / 1000;
        if (state.timeLeft <= 0) { state.timeLeft = 0; endRound(); }
        const delay = 10000 * state.config.hintDelay / 100;
        if (!state.hintAvailable && now - state.stepIdleAt >= delay) {
          state.hintAvailable = true; refs.hint.hidden = false;
        }
      }
      state.lastTick = now;
      updateHeader();
    }, 100);
  }

  function resetRound() {
    clearInterval(state.timerId);
    Object.assign(state, {
      started: true, ended: false, paused: false, inputLocked: false, score: 0, progress: 0,
      completed: 0, assistedCompleted: 0, timeLeft: ROUND_SECONDS, hintAvailable: false,
      assistedQuestion: false, hintRoute: [], pointerActive: false, activePointerId: null, recentByLevel: {}
    });
    if (state.mode === "auto") state.level = 1;
    refs.resultModal.hidden = true; refs.pauseModal.hidden = true; refs.startModal.hidden = true;
    refs.bgm.volume = 0.16;
    refs.bgm.play().catch(() => {});
    newQuestion(); startTimer();
  }

  function endRound() {
    if (state.ended) return;
    state.ended = true; state.inputLocked = true; state.pointerActive = false; state.activePointerId = null;
    state.engine?.cancelGesture(); clearInterval(state.timerId); renderBoard();
    refs.finalScore.textContent = String(state.score);
    $("#resultSummary").textContent = `完成 ${state.completed} 道题，其中 ${state.assistedCompleted} 道使用了提示。`;
    refs.resultModal.hidden = false;
  }

  function togglePause(force) {
    if (!state.started || state.ended) return;
    state.paused = typeof force === "boolean" ? force : !state.paused;
    refs.pauseModal.hidden = !state.paused;
    $("#pauseButton").textContent = state.paused ? "▶" : "Ⅱ";
    if (!state.paused) { state.lastTick = performance.now(); state.stepIdleAt = performance.now(); }
  }

  async function showHint() {
    if (state.inputLocked || state.paused || state.ended) return;
    const route = findHintRoute(state.engine);
    if (!route) { showFeedback("当前没有找到可演示路线，请重开本题。"); return; }
    const generation = state.generation;
    state.assistedQuestion = true; state.inputLocked = true; state.inputLockedHint = true;
    state.engine.cancelGesture();
    await animateRoute(route, route.findIndex((cell) => state.engine.objectAt(state.engine.soils, cell)), true);
    if (state.ended || generation !== state.generation) return;
    state.inputLocked = false; state.inputLockedHint = false; state.lastTick = performance.now();
    showFeedback("照着亮起的路线试一试。", "success", 1800);
  }

  function setLevelMode(level) {
    if (level === null) state.mode = "auto";
    else { state.mode = "manual"; state.level = level; state.progress = 0; }
    $$(".level-buttons button").forEach((button) => {
      button.classList.toggle("active", level === null ? button.dataset.mode === "auto" : Number(button.dataset.level) === level);
    });
    updateHeader();
    if (state.started && !state.ended) newQuestion();
  }

  function updateConfig() {
    state.config.density = Number(refs.density.value);
    state.config.hintDelay = Number(refs.hintRange.value);
    state.config.animationSpeed = Number(refs.speed.value);
    refs.densityOutput.textContent = `${state.config.density}%`;
    refs.hintOutput.textContent = `${state.config.hintDelay}%`;
    refs.speedOutput.textContent = `${state.config.animationSpeed}%`;
  }

  refs.board.addEventListener("pointerdown", pointerDown);
  refs.board.addEventListener("pointermove", pointerMove);
  window.addEventListener("pointerup", pointerUp);
  window.addEventListener("pointercancel", pointerCancel);
  window.addEventListener("resize", resizeBoard);
  $("#startButton").addEventListener("click", resetRound);
  $("#playAgainButton").addEventListener("click", resetRound);
  $("#restartButton").addEventListener("click", resetRound);
  $("#pauseButton").addEventListener("click", () => togglePause());
  $("#resumeButton").addEventListener("click", () => togglePause(false));
  refs.hint.addEventListener("click", showHint);
  $("#panelToggle").addEventListener("click", () => {
    const panel = $("#controlPanel"); panel.classList.toggle("collapsed");
    $("#panelToggle").setAttribute("aria-expanded", String(!panel.classList.contains("collapsed")));
    resizeBoard();
  });
  $$(".level-buttons button[data-level]").forEach((button) => button.addEventListener("click", () => setLevelMode(Number(button.dataset.level))));
  $(".level-buttons button[data-mode='auto']").addEventListener("click", () => setLevelMode(null));
  [refs.density, refs.hintRange, refs.speed].forEach((input) => input.addEventListener("input", updateConfig));
  $("#restoreButton").addEventListener("click", () => {
    refs.density.value = 100; refs.hintRange.value = 100; refs.speed.value = 100; updateConfig(); setLevelMode(null);
  });
  $("#soundButton").addEventListener("click", () => {
    refs.bgm.muted = !refs.bgm.muted; $("#soundButton").textContent = refs.bgm.muted ? "♩" : "♪";
    $("#soundButton").setAttribute("aria-label", refs.bgm.muted ? "打开背景音乐" : "关闭背景音乐");
  });

  updateConfig(); updateHeader();
  window.__B_DEMO__ = {
    state,
    newQuestion,
    forceTimeout: () => { state.timeLeft = 0; endRound(); },
    setLevel: (level) => setLevelMode(level),
    useHintNow: () => { state.hintAvailable = true; refs.hint.hidden = false; },
    completeCurrentStep: async () => {
      const route = findHintRoute(state.engine);
      if (!route) return false;
      state.engine.begin(route[0]); route.slice(1).forEach((cell) => state.engine.enter(cell));
      await commitGesture(); return true;
    }
  };

  const query = new URLSearchParams(location.search);
  if (query.has("level")) setLevelMode(Math.max(1, Math.min(6, Number(query.get("level")))));
  if (query.has("density")) { refs.density.value = query.get("density"); updateConfig(); }
  if (query.get("autostart") === "1") {
    resetRound();
    if (query.get("hint") === "1") setTimeout(() => { state.hintAvailable = true; refs.hint.hidden = false; showHint(); }, 200);
    if (query.get("timeout") === "1") endRound();
  }
})();
