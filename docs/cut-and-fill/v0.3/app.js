(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const debugMode = params.get("debug") === "1";
  const testMode = params.get("test") === "1";
  const stepDelay = testMode ? 0 : 90;
  const pushSettleDelay = testMode ? 70 : 180;
  const questionDelay = testMode ? 0 : 520;
  const hintStepDelay = testMode ? 24 : 145;
  const hintEndDelay = testMode ? 90 : 420;
  const assetRoot = "assets/elements/";
  const catalog = window.CUT_FILL_TEMPLATE_CATALOG;

  const board = document.querySelector("#board");
  const boardLayer = document.querySelector("#board-layer");
  const timeValue = document.querySelector("#time-value");
  const scoreValue = document.querySelector("#score-value");
  const levelValue = document.querySelector("#level-value");
  const progressValue = document.querySelector("#progress-value");
  const completedValue = document.querySelector("#completed-value");
  const status = document.querySelector("#status");
  const pauseButton = document.querySelector("#pause-button");
  const resetButton = document.querySelector("#reset-button");
  const hintButton = document.querySelector("#hint-button");
  const pauseOverlay = document.querySelector("#pause-overlay");
  const resumeButton = document.querySelector("#resume-button");
  const completionModal = document.querySelector("#completion-modal");
  const replayButton = document.querySelector("#replay-button");
  const resultScore = document.querySelector("#result-score");
  const resultCompleted = document.querySelector("#result-completed");
  const resultLevel = document.querySelector("#result-level");
  const debugPanel = document.querySelector("#debug-panel");
  const debugTemplate = document.querySelector("#debug-template");
  const debugInstance = document.querySelector("#debug-instance");
  const debugOrientation = document.querySelector("#debug-orientation");
  const debugWalls = document.querySelector("#debug-walls");
  const debugLevel = document.querySelector("#debug-level");
  const debugOrder = document.querySelector("#debug-order");

  const generator = new window.DynamicQuestionGenerator(catalog);
  const session = new window.DynamicGameSession(120);
  let question = null;
  let engine = null;
  let carDirection = "up";
  let animationCar = null;
  let busy = false;
  let suspended = false;
  let activePointerId = null;
  let lastPointerPoint = null;
  let pointerOutsideBoard = false;
  let phaseToken = 0;
  let manualPaused = false;
  let hintPaused = false;
  let idleActiveMs = 0;
  let ghostRoute = [];
  let ghostCar = null;
  let ghostDirection = "up";
  let lastTickAt = performance.now();

  const keyOf = ([row, col]) => `${row},${col}`;
  const sameCell = (left, right) => Boolean(left && right && left[0] === right[0] && left[1] === right[1]);
  const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
  const isPaused = () => manualPaused || hintPaused;
  const inputLocked = () => busy || isPaused() || session.ended;

  function imageAsset(src, className, alt = "") {
    const image = document.createElement("img");
    image.src = src;
    image.className = className;
    image.alt = alt;
    image.draggable = false;
    return image;
  }

  function setStatus(message, kind = "") {
    status.textContent = message;
    status.className = `status${kind ? ` is-${kind}` : ""}`;
  }

  function directionBetween(from, to) {
    const row = to[0] - from[0];
    const col = to[1] - from[1];
    if (row < 0) return "up";
    if (row > 0) return "down";
    if (col < 0) return "left";
    return "right";
  }

  function reasonCopy(reason) {
    const messages = {
      start_not_car: "请从工程车开始滑动。",
      wall: "石墩挡住了，换一条路。",
      unfilled_pit: "这个坑还没有填好，暂时不能经过。",
      pit_without_push: "要把对应土块直着推进坑里。",
      push_not_straight: "土块只能沿当前方向直着推进坑里。",
      second_dirt: "一笔只能推动一块土。",
      must_push_to_pit: "碰到土块后，要继续直推到对应的坑。",
      endpoint_locked: "已经到坑口，松手即可完成这一步。",
      self_intersection: "路线不能交叉，请退回后再走。"
    };
    return messages[reason] || "这条路线不能这样走。";
  }

  function formatTime(milliseconds) {
    const total = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(total / 60);
    const seconds = String(total % 60).padStart(2, "0");
    return `${String(minutes).padStart(2, "0")}:${seconds}`;
  }

  function renderMetrics() {
    const state = session.snapshot();
    const rule = session.levelRule();
    timeValue.textContent = formatTime(state.remainingMs);
    scoreValue.textContent = String(state.totalScore);
    levelValue.textContent = state.currentLevel;
    progressValue.textContent = rule.threshold === null
      ? "最高等级"
      : `${state.levelProgress} / ${rule.threshold}`;
    completedValue.textContent = `${state.completedQuestions} 题`;
    debugLevel.textContent = `${state.currentLevel} / ${state.levelProgress}`;
  }

  function renderDebug() {
    if (!question) return;
    debugPanel.hidden = !debugMode;
    debugTemplate.textContent = question.templateId;
    debugInstance.textContent = question.id;
    debugOrientation.textContent = `${question.orientationDegrees}°`;
    debugWalls.textContent = `可选 ${question.optionalWallCount} / 总数 ${question.walls.length}`;
    debugOrder.textContent = question.expectedSolutionSequences.map((sequence) => sequence.join("→")).join(" 或 ");
  }

  function trackDescriptor(route, index) {
    const previous = route[index - 1];
    const current = route[index];
    const next = route[index + 1];
    const before = previous ? [previous[0] - current[0], previous[1] - current[1]] : null;
    const after = next ? [next[0] - current[0], next[1] - current[1]] : null;
    const vectors = [before, after].filter(Boolean);
    if (vectors.length < 2 || vectors[0][0] === -vectors[1][0] && vectors[0][1] === -vectors[1][1]) {
      const vector = vectors[0] || [1, 0];
      return { type: "straight", angle: vector[0] === 0 ? 90 : 0 };
    }
    const has = (row, col) => vectors.some((vector) => vector[0] === row && vector[1] === col);
    if (has(1, 0) && has(0, -1)) return { type: "turn", angle: 0 };
    if (has(0, -1) && has(-1, 0)) return { type: "turn", angle: 90 };
    if (has(-1, 0) && has(0, 1)) return { type: "turn", angle: 180 };
    return { type: "turn", angle: 270 };
  }

  function collectTracks() {
    const map = new Map();
    if (busy || !engine.route.length) return map;
    engine.route.forEach((cell, index) => {
      if (index === 0 || index === engine.route.length - 1 && engine.lockedAtPit) return;
      map.set(keyOf(cell), trackDescriptor(engine.route, index));
    });
    return map;
  }

  function collectGhostTracks() {
    const map = new Map();
    ghostRoute.slice(0, -1).forEach((cell, index) => {
      map.set(keyOf(cell), trackDescriptor(ghostRoute, index));
    });
    return map;
  }

  function render() {
    if (!engine) return;
    const walls = new Set(question.walls.map(keyOf));
    const tracks = collectTracks();
    const ghostTracks = collectGhostTracks();
    const lockedPair = engine.activePairId
      ? question.pairs.find((pair) => pair.id === engine.activePairId)
      : null;
    const carCell = animationCar || engine.car;
    const pushingPair = busy && animationCar && lockedPair && sameCell(animationCar, lockedPair.dirt)
      ? lockedPair
      : null;

    boardLayer.style.setProperty("--grid-size", question.size);
    boardLayer.style.setProperty("--element-size", `${Math.min(1, question.size / 4) * 100}%`);
    boardLayer.replaceChildren();

    for (let row = 0; row < question.size; row += 1) {
      for (let col = 0; col < question.size; col += 1) {
        const cell = [row, col];
        const cellKey = keyOf(cell);
        const filledPit = question.pairs.find((pair) => engine.filled.has(pair.id) && sameCell(pair.pit, cell));
        const dirtPair = question.pairs.find((pair) => !engine.filled.has(pair.id) && sameCell(pair.dirt, cell));
        const pitPair = question.pairs.find((pair) => !engine.filled.has(pair.id) && sameCell(pair.pit, cell));
        const element = document.createElement("div");
        element.className = "cell";
        element.dataset.row = row;
        element.dataset.col = col;
        element.setAttribute("aria-label", walls.has(cellKey)
          ? `第 ${row + 1} 行第 ${col + 1} 列，石墩`
          : `第 ${row + 1} 行第 ${col + 1} 列，道路`);
        element.append(imageAsset(`${assetRoot}road_normal.png`, "road"));

        const descriptor = tracks.get(cellKey);
        if (descriptor && !walls.has(cellKey)) {
          const filename = descriptor.type === "turn" ? "track_mark_turn.png" : "track_mark.png";
          const track = imageAsset(`${assetRoot}${filename}`, `track ${descriptor.type}`);
          track.style.setProperty("--rotation", `${descriptor.angle}deg`);
          element.append(track);
        }

        const ghostDescriptor = ghostTracks.get(cellKey);
        if (ghostDescriptor && !walls.has(cellKey)) {
          const filename = ghostDescriptor.type === "turn" ? "track_mark_turn.png" : "track_mark.png";
          const track = imageAsset(`${assetRoot}${filename}`, `track ${ghostDescriptor.type} is-ghost`);
          track.style.setProperty("--rotation", `${ghostDescriptor.angle}deg`);
          element.append(track);
        }

        if (walls.has(cellKey)) element.append(imageAsset(`${assetRoot}obstacle.png`, "piece obstacle", "石墩"));

        if (dirtPair && dirtPair.id !== pushingPair?.id) {
          element.append(imageAsset(`${assetRoot}soil_normal.png`, "piece soil", "土块"));
        }

        if (pitPair) {
          element.append(imageAsset(`${assetRoot}pit_empty.png`, "piece pit", "未填的坑"));
          if (pushingPair && pitPair.id === pushingPair.id) {
            element.append(imageAsset(`${assetRoot}soil_normal.png`, "piece soil preview-soil", "即将推入坑中的土块"));
          }
        }

        if (filledPit) element.append(imageAsset("assets/vector/check.svg", "check", "已填好的道路"));
        if (sameCell(cell, carCell)) {
          element.append(imageAsset(`${assetRoot}vehicle_${carDirection}.png`, "piece vehicle", "工程车"));
        }
        if (ghostCar && sameCell(cell, ghostCar)) {
          element.append(imageAsset(`${assetRoot}vehicle_${ghostDirection}.png`, "piece vehicle is-ghost", "提示中的工程车"));
        }
        boardLayer.append(element);
      }
    }

    board.classList.toggle("is-drawing", engine.drawing);
    board.classList.toggle("is-busy", busy);
    board.classList.toggle("is-paused", isPaused());
    board.setAttribute("aria-label", `${question.size}乘${question.size}棋盘，当前等级${session.currentLevel}`);
    renderMetrics();
    renderDebug();
  }

  function clearPointerState() {
    activePointerId = null;
    lastPointerPoint = null;
    pointerOutsideBoard = false;
    suspended = false;
  }

  function cancelUncommittedRoute() {
    clearPointerState();
    if (engine) engine.cancelGesture();
  }

  function loadNewQuestion() {
    phaseToken += 1;
    question = generator.next(session.currentLevel);
    engine = new window.CutFillEngine(question);
    carDirection = "up";
    animationCar = null;
    ghostRoute = [];
    ghostCar = null;
    busy = false;
    cancelUncommittedRoute();
    idleActiveMs = 0;
    hintButton.hidden = true;
    setStatus("开始修路");
    render();
  }

  function restartQuestion() {
    if (session.ended || isPaused()) return;
    phaseToken += 1;
    engine = new window.CutFillEngine(question);
    carDirection = "up";
    animationCar = null;
    ghostRoute = [];
    ghostCar = null;
    busy = false;
    cancelUncommittedRoute();
    idleActiveMs = 0;
    hintButton.hidden = true;
    setStatus("本题已经重新开始");
    render();
  }

  function resetRound() {
    session.reset();
    generator.resetHistory();
    manualPaused = false;
    hintPaused = false;
    pauseOverlay.hidden = true;
    completionModal.hidden = true;
    pauseButton.textContent = "暂停";
    loadNewQuestion();
    lastTickAt = performance.now();
  }

  function endRound() {
    session.ended = true;
    phaseToken += 1;
    busy = false;
    hintPaused = false;
    ghostRoute = [];
    ghostCar = null;
    cancelUncommittedRoute();
    hintButton.hidden = true;
    resultScore.textContent = String(session.totalScore);
    resultCompleted.textContent = String(session.completedQuestions);
    resultLevel.textContent = session.currentLevel;
    completionModal.hidden = false;
    setStatus("时间到，本轮结束。", "success");
    render();
    replayButton.focus();
  }

  function consumeActiveTime(milliseconds) {
    if (isPaused() || session.ended) return;
    idleActiveMs += milliseconds;
    if (idleActiveMs >= 10000 && !busy) hintButton.hidden = false;
    if (session.consumeActiveTime(milliseconds)) endRound();
    else renderMetrics();
  }

  function pointToCell(clientX, clientY) {
    const rect = boardLayer.getBoundingClientRect();
    if (clientX < rect.left || clientX >= rect.right || clientY < rect.top || clientY >= rect.bottom) return null;
    return [
      Math.min(question.size - 1, Math.floor((clientY - rect.top) / (rect.height / question.size))),
      Math.min(question.size - 1, Math.floor((clientX - rect.left) / (rect.width / question.size)))
    ];
  }

  function processCell(cell) {
    const current = engine.route[engine.route.length - 1];
    if (suspended) {
      const resumed = Boolean(current && sameCell(cell, current));
      if (resumed) suspended = false;
      return { accepted: resumed, action: resumed ? "resume" : "suspended" };
    }
    const result = engine.enter(cell);
    if (!result.accepted && !["not_adjacent", "not_drawing"].includes(result.reason)) {
      suspended = true;
      setStatus(reasonCopy(result.reason), "error");
    } else if (result.accepted && result.action !== "stay") {
      if (engine.route.length > 1) carDirection = directionBetween(engine.route[0], engine.route[1]);
      setStatus(engine.lockedAtPit ? "松手，把土推进坑里。" : "继续滑动");
    }
    render();
    return result;
  }

  function processSegment(from, to) {
    const rect = boardLayer.getBoundingClientRect();
    const unit = Math.min(rect.width, rect.height) / question.size;
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(1, Math.ceil(distance / Math.max(4, unit * 0.16)));
    let lastKey = null;
    for (let index = 1; index <= steps; index += 1) {
      const point = {
        x: from.x + (to.x - from.x) * (index / steps),
        y: from.y + (to.y - from.y) * (index / steps)
      };
      const cell = pointToCell(point.x, point.y);
      if (!cell) {
        suspended = true;
        continue;
      }
      if (keyOf(cell) !== lastKey) processCell(cell);
      lastKey = keyOf(cell);
    }
  }

  async function finishGesture(pointerInside) {
    if (!engine.drawing) return;
    if (!pointerInside || suspended || !engine.canCommit()) {
      engine.cancelGesture();
      suspended = false;
      setStatus("这一笔没有完成，已经取消。", "error");
      render();
      return;
    }

    const route = engine.route.map((cell) => [...cell]);
    const pair = question.pairs.find((item) => item.id === engine.activePairId);
    const tokenAtStart = phaseToken;
    let previousCar = [...engine.car];
    busy = true;
    setStatus("工程车正在推土……");
    render();
    for (const cell of route.slice(1, -1)) {
      if (tokenAtStart !== phaseToken || session.ended) return;
      carDirection = directionBetween(previousCar, cell);
      animationCar = [...cell];
      render();
      previousCar = [...cell];
      if (stepDelay) await wait(stepDelay);
    }

    if (pushSettleDelay) await wait(pushSettleDelay);

    if (tokenAtStart !== phaseToken || session.ended) return;
    animationCar = [...pair.dirt];
    const result = engine.commit();
    animationCar = null;
    busy = false;
    suspended = false;
    idleActiveMs = 0;
    hintButton.hidden = true;
    render();

    if (!result.complete) {
      setStatus(`已修好 ${engine.filled.size} / ${question.pairs.length} 处`, "success");
      return;
    }

    const outcome = session.completeQuestion();
    setStatus(`完成本题，得 ${outcome.awardedScore} 分`, "success");
    renderMetrics();
    busy = true;
    if (questionDelay) await wait(questionDelay);
    if (tokenAtStart !== phaseToken || session.ended) return;
    loadNewQuestion();
  }

  async function demonstrateHint() {
    if (inputLocked() || hintButton.hidden) return;
    const completedSequence = [...engine.filled];
    const stage = window.chooseCutFillHintStage(question, completedSequence);
    if (!stage) {
      setStatus("当前没有可用提示。", "error");
      return;
    }

    session.markHintUsed();
    cancelUncommittedRoute();
    idleActiveMs = 0;
    hintButton.hidden = true;
    hintPaused = true;
    busy = true;
    setStatus("请看下一步怎么走");
    render();
    const tokenAtStart = phaseToken;

    for (let index = 0; index < stage.full_route.length; index += 1) {
      if (tokenAtStart !== phaseToken) return;
      ghostRoute = stage.full_route.slice(0, index + 1).map((cell) => [...cell]);
      ghostCar = [...stage.full_route[index]];
      if (index > 0) ghostDirection = directionBetween(stage.full_route[index - 1], stage.full_route[index]);
      render();
      await wait(hintStepDelay);
    }
    await wait(hintEndDelay);
    if (tokenAtStart !== phaseToken) return;
    ghostRoute = [];
    ghostCar = null;
    busy = false;
    hintPaused = false;
    hintButton.hidden = false;
    lastTickAt = performance.now();
    setStatus("现在请你来完成这一步");
    render();
  }

  function pauseGame() {
    if (session.ended || hintPaused || busy) return;
    cancelUncommittedRoute();
    manualPaused = true;
    pauseButton.textContent = "已暂停";
    pauseOverlay.hidden = false;
    setStatus("游戏已暂停");
    render();
    resumeButton.focus();
  }

  function resumeGame() {
    manualPaused = false;
    pauseOverlay.hidden = true;
    pauseButton.textContent = "暂停";
    lastTickAt = performance.now();
    setStatus("继续修路");
    render();
    board.focus();
  }

  board.addEventListener("pointerdown", (event) => {
    if (inputLocked() || activePointerId !== null) return;
    const cell = pointToCell(event.clientX, event.clientY);
    const result = cell ? engine.begin(cell) : { accepted: false, reason: "start_not_car" };
    if (!result.accepted) {
      setStatus(reasonCopy(result.reason), "error");
      return;
    }
    activePointerId = event.pointerId;
    lastPointerPoint = { x: event.clientX, y: event.clientY };
    pointerOutsideBoard = false;
    suspended = false;
    board.setPointerCapture(event.pointerId);
    setStatus("继续滑动");
    render();
  });

  board.addEventListener("pointermove", (event) => {
    if (event.pointerId !== activePointerId || inputLocked()) return;
    const next = { x: event.clientX, y: event.clientY };
    const nextCell = pointToCell(next.x, next.y);
    if (!nextCell) {
      pointerOutsideBoard = true;
      lastPointerPoint = null;
      return;
    }
    if (pointerOutsideBoard || !lastPointerPoint) {
      const result = processCell(nextCell);
      if (result?.accepted || suspended) {
        pointerOutsideBoard = false;
        lastPointerPoint = next;
      }
      return;
    }
    processSegment(lastPointerPoint, next);
    lastPointerPoint = next;
  });

  board.addEventListener("pointerup", async (event) => {
    if (event.pointerId !== activePointerId) return;
    const inside = Boolean(pointToCell(event.clientX, event.clientY)) && !pointerOutsideBoard;
    activePointerId = null;
    lastPointerPoint = null;
    pointerOutsideBoard = false;
    if (board.hasPointerCapture(event.pointerId)) board.releasePointerCapture(event.pointerId);
    await finishGesture(inside);
  });

  board.addEventListener("pointercancel", () => {
    cancelUncommittedRoute();
    setStatus("操作已取消，请重新开始。", "error");
    render();
  });

  board.addEventListener("lostpointercapture", (event) => {
    if (event.pointerId !== activePointerId) return;
    cancelUncommittedRoute();
    setStatus("操作已取消，请重新开始。", "error");
    render();
  });

  board.addEventListener("keydown", async (event) => {
    if (inputLocked()) return;
    const directions = {
      ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1]
    };
    if (directions[event.key]) {
      event.preventDefault();
      if (!engine.drawing) engine.begin(engine.car);
      const current = engine.route[engine.route.length - 1];
      const delta = directions[event.key];
      processCell([current[0] + delta[0], current[1] + delta[1]]);
    } else if (event.key === "Enter") {
      event.preventDefault();
      await finishGesture(true);
    } else if (event.key === "Escape") {
      engine.cancelGesture();
      suspended = false;
      setStatus("这一笔已经取消。");
      render();
    }
  });

  pauseButton.addEventListener("click", pauseGame);
  resumeButton.addEventListener("click", resumeGame);
  resetButton.addEventListener("click", restartQuestion);
  hintButton.addEventListener("click", demonstrateHint);
  replayButton.addEventListener("click", resetRound);

  setInterval(() => {
    const now = performance.now();
    const elapsed = Math.min(500, now - lastTickAt);
    lastTickAt = now;
    consumeActiveTime(elapsed);
  }, 100);

  window.__cutFillDynamic = {
    catalog,
    generator,
    session,
    snapshot() {
      return {
        question: JSON.parse(JSON.stringify(question)),
        busy,
        suspended,
        paused: isPaused(),
        hintVisible: !hintButton.hidden,
        ghostVisible: Boolean(ghostCar),
        idleActiveMs,
        ...session.snapshot(),
        ...engine.snapshot()
      };
    },
    hintStage() {
      return window.chooseCutFillHintStage(question, [...engine.filled]);
    },
    restartQuestion,
    resetRound,
    loadTemplateForTest(templateId) {
      if (!testMode) return false;
      const template = catalog.templates.find((item) => item.id === templateId);
      if (!template) return false;
      session.reset();
      session.currentLevel = template.difficulty;
      generator.resetHistory();
      const originalTemplates = generator.templatesByLevel[template.difficulty];
      const originalRng = generator.rng;
      generator.templatesByLevel[template.difficulty] = [template];
      generator.rng = () => 0;
      loadNewQuestion();
      generator.templatesByLevel[template.difficulty] = originalTemplates;
      generator.rng = originalRng;
      completionModal.hidden = true;
      return true;
    },
    forceHintAvailable() {
      if (!testMode) return false;
      idleActiveMs = 10000;
      hintButton.hidden = false;
      return true;
    },
    advanceActiveTime(seconds) {
      if (!testMode) return false;
      consumeActiveTime(Number(seconds) * 1000);
      return true;
    }
  };

  resetRound();
})();
