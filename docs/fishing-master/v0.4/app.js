import { FishingGameCore } from './src/game-core.js';
import { FISH_TYPES, GAME_CONFIG, HOOK_CONFIG, LANES, LEVEL_CONFIG } from './src/game-config.js';
import {
  advanceActorMotion,
  advanceFishMotion,
  createActorMotion,
  createFishMotion,
  getCastLineOrigin,
  getFlexibleLinePath,
  getActorMotionProgress,
  getCastHookPoint,
  getRenderedActorFrame,
  queueOutcomeMotion,
} from './src/motion-controller.js';

const core = new FishingGameCore();
const images = {
  big: './assets/generated-motion-v0.1-candidate/fish-big-motion-sheet-v01.png',
  medium: './assets/generated-motion-v0.1-candidate/fish-medium-motion-sheet-v01.png',
  small: './assets/generated-motion-v0.1-candidate/fish-small-motion-sheet-v01.png',
  shark: './assets/generated-motion-v0.1-candidate/shark-motion-sheet-v01.png',
  turtle: './assets/generated-motion-v0.3-candidate/turtle-motion-sheet-v02-candidate.png',
  starfish: './assets/generated-motion-v0.3-candidate/starfish-motion-sheet-v02-candidate.png',
  seahorse: './assets/generated-motion-v0.3-candidate/seahorse-motion-sheet-v01-candidate.png',
};

const spriteContainerScale = {
  big: 627 / 560,
  medium: 627 / 560,
  small: 627 / 550,
  shark: 627 / 570,
  turtle: 627 / 580,
  starfish: 627 / 535,
  seahorse: 627 / 300,
};
const tailFrameDurationMs = {
  big: 220,
  medium: 190,
  small: 160,
  shark: 270,
  turtle: 320,
  starfish: 400,
  seahorse: 130,
};
const RIPPLE_DURATION_MS = 700;
const actorLayout = Object.freeze({ x: 360, y: -26, size: 300, bobAmplitude: 3, bobPeriodMs: 3200 });
const rodTipAnchors = Object.freeze([
  Object.freeze({ x: .965, y: .405 }),
  Object.freeze({ x: .866, y: .329 }),
  Object.freeze({ x: .970, y: .240 }),
  Object.freeze({ x: .945, y: .305 }),
  Object.freeze({ x: .955, y: .325 }),
  Object.freeze({ x: .955, y: .325 }),
  Object.freeze({ x: .120, y: .350 }),
  Object.freeze({ x: .100, y: .350 }),
  Object.freeze({ x: .980, y: .460 }),
]);
const castLandingPoint = Object.freeze({ x: GAME_CONFIG.worldWidth / 2, y: HOOK_CONFIG.surfaceY });
const caughtHookOffset = Object.freeze({ x: -10, y: 20 });
const caughtFishMouthAnchors = Object.freeze({
  big: Object.freeze({ x: .965, y: .335 }),
  medium: Object.freeze({ x: .965, y: .33 }),
  small: Object.freeze({ x: .965, y: .325 }),
  turtle: Object.freeze({ x: .94, y: .48 }),
  starfish: Object.freeze({ x: .50, y: .08 }),
  seahorse: Object.freeze({ x: .82, y: .36 }),
});

const dom = {
  gameArea: document.querySelector('#game-area'),
  fishingScene: document.querySelector('#fishing-scene'),
  fisherman: document.querySelector('#fisherman'),
  entityLayer: document.querySelector('#entity-layer'),
  hookRig: document.querySelector('#hook-rig'),
  hookLinePath: document.querySelector('#hook-line-path'),
  caughtFish: document.querySelector('#caught-fish'),
  caughtFishVisual: document.querySelector('.caught-fish__visual'),
  ripple: document.querySelector('#surface-ripple'),
  feedback: document.querySelector('#feedback'),
  progress: document.querySelector('#level-progress'),
  progressText: document.querySelector('.level-progress__text'),
  progressFill: document.querySelector('.level-progress__fill'),
  startPanel: document.querySelector('#start-panel'),
  pausePanel: document.querySelector('#pause-panel'),
  resultDialog: document.querySelector('#result-dialog'),
  startButton: document.querySelector('#start-button'),
  pauseButton: document.querySelector('#pause-button'),
  pauseLabel: document.querySelector('.control-button__label'),
  pauseIcon: document.querySelector('.control-button__icon'),
  restartButton: document.querySelector('#restart-button'),
  time: document.querySelector('[data-stat="time"]'),
  level: document.querySelector('[data-stat="level"]'),
  score: document.querySelector('[data-stat="score"]'),
  speedTuner: document.querySelector('#speed-tuner'),
  speedTunerToggle: document.querySelector('#speed-tuner-toggle'),
  speedScale: document.querySelector('#fish-speed-scale'),
  speedScaleValue: document.querySelector('#fish-speed-scale-value'),
  speedReset: document.querySelector('#speed-tuner-reset'),
  difficultyButtons: [...document.querySelectorAll('[data-difficulty-level]')],
  difficultyDynamic: document.querySelector('#difficulty-dynamic'),
  difficultyMode: document.querySelector('#difficulty-mode'),
  crossingTimes: Object.fromEntries(
    ['big', 'medium', 'small'].map((type) => [type, document.querySelector(`[data-crossing-time="${type}"]`)]),
  ),
};

const entityElements = new Map();
const entityMotionStates = new Map();
const cycleWaiters = [];
let paused = false;
let hasStarted = false;
let lastFrameTime = performance.now();
let rippleUntil = 0;
let cycleId = 0;
let lastOutcome = null;
let attachedFishType = null;
let feedbackTimer = 0;
let motionNowMs = 0;
let actorMotion = createActorMotion(0);

function formatTime(seconds) {
  const rounded = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(rounded / 60);
  const remainder = rounded % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function showFeedback(text, kind = 'normal') {
  window.clearTimeout(feedbackTimer);
  dom.feedback.textContent = text;
  dom.feedback.classList.remove('is-visible', 'is-shark');
  void dom.feedback.offsetWidth;
  dom.feedback.classList.toggle('is-shark', kind === 'shark');
  dom.feedback.classList.add('is-visible');
  feedbackTimer = window.setTimeout(() => dom.feedback.classList.remove('is-visible'), 1050);
}

function showRipple() {
  rippleUntil = performance.now() + RIPPLE_DURATION_MS;
  dom.ripple.classList.remove('is-visible');
  void dom.ripple.offsetWidth;
  dom.ripple.classList.add('is-visible');
}

function updateSpeedTuner(scale) {
  dom.speedScale.value = String(scale);
  dom.speedScaleValue.value = `${scale.toFixed(2)}×`;
  for (const type of ['big', 'medium', 'small']) {
    dom.crossingTimes[type].textContent = (FISH_TYPES[type].crossingSeconds / scale).toFixed(1);
  }
}

function applySpeedScale() {
  const scale = core.setFishSpeedScale(dom.speedScale.value);
  updateSpeedTuner(scale);
}

function updateDifficultyTuner(snapshot) {
  const isDynamic = snapshot.difficultyLock === null;
  for (const button of dom.difficultyButtons) {
    const selected = !isDynamic && Number(button.dataset.difficultyLevel) === snapshot.difficultyLock;
    button.setAttribute('aria-pressed', String(selected));
  }
  dom.difficultyMode.value = isDynamic
    ? `动态 · 当前 L${snapshot.level}`
    : `锁定 · L${snapshot.difficultyLock}`;
  dom.difficultyDynamic.disabled = isDynamic;
}

function handleEvents(events) {
  for (const event of events) {
    if (event.type === 'hookDropped') {
      cycleId += 1;
      lastOutcome = null;
      showRipple();
    }
    if (event.type === 'fishHooked') {
      attachedFishType = event.fishType;
    }
    if (event.type === 'catchCompleted') {
      lastOutcome = 'fish';
      attachedFishType = null;
      actorMotion = queueOutcomeMotion(actorMotion, 'fish', motionNowMs);
      showFeedback(`+${event.points} 分`);
    }
    if (event.type === 'emptyRetract') {
      lastOutcome = 'empty';
      actorMotion = queueOutcomeMotion(actorMotion, 'empty', motionNowMs);
      showFeedback('再看准一点');
    }
    if (event.type === 'sharkHit') {
      lastOutcome = 'shark';
      attachedFishType = null;
      showFeedback('碰到鲨鱼啦', 'shark');
    }
    if (event.type === 'hookReady' && lastOutcome === 'shark') {
      actorMotion = queueOutcomeMotion(actorMotion, 'shark', motionNowMs);
    }
    if (event.type === 'levelChanged') {
      showFeedback(event.reason === 'upgrade' ? '水域更热闹了' : '放慢一点，再试试');
    }
    if (event.type === 'gameEnded') {
      actorMotion = createActorMotion(motionNowMs);
      showResult();
    }
  }
}

function renderEntities(snapshot) {
  const liveIds = new Set(snapshot.entities.map((entity) => entity.id));
  for (const [id, element] of entityElements) {
    if (!liveIds.has(id)) {
      element.remove();
      entityElements.delete(id);
      entityMotionStates.delete(id);
    }
  }

  for (const entity of snapshot.entities) {
    let element = entityElements.get(entity.id);
    if (!element) {
      element = document.createElement('span');
      element.className = `entity entity--${entity.type}`;
      const visual = document.createElement('span');
      visual.className = 'entity__visual';
      element.append(visual);
      element.dataset.depth = entity.laneId;
      element.style.setProperty('--fish-sprite', `url("${images[entity.type]}")`);
      const motionState = createFishMotion(entity.id, motionNowMs);
      element.style.setProperty('--swim-delay', `-${motionState.phaseOffsetMs}ms`);
      dom.entityLayer.append(element);
      entityElements.set(entity.id, element);
      entityMotionStates.set(entity.id, motionState);
    }
    const x = entity.x / GAME_CONFIG.worldWidth * 100;
    const y = entity.y / GAME_CONFIG.worldHeight * 100;
    const direction = entity.direction === 1 ? 1 : -1;
    element.style.width = `${entity.visualWidth * spriteContainerScale[entity.type] / GAME_CONFIG.worldWidth * 100}%`;
    element.style.left = `${x}%`;
    element.style.top = `${y}%`;
    element.style.transform = `translate(-50%, -50%) scaleX(${direction})`;

    const motionResult = advanceFishMotion(
      entityMotionStates.get(entity.id),
      motionNowMs,
      tailFrameDurationMs[entity.type],
    );
    entityMotionStates.set(entity.id, motionResult.state);
    element.dataset.frame = String(motionResult.frame);
  }
}

function getBoatBobOffset(now) {
  const phase = (now % actorLayout.bobPeriodMs) / actorLayout.bobPeriodMs * Math.PI * 2;
  return (1 - Math.cos(phase)) * actorLayout.bobAmplitude / 2;
}

function getRodTip(frame, bobY) {
  const anchor = rodTipAnchors[frame] || rodTipAnchors[0];
  return {
    x: actorLayout.x + anchor.x * actorLayout.size,
    y: actorLayout.y + anchor.y * actorLayout.size + bobY,
  };
}

function getActorStateName(snapshot, frame) {
  if (snapshot.hook.state === 'retract' || snapshot.hook.state === 'recovery') return `reel-${frame}`;
  if (actorMotion.pose === 'celebrate') return `beard-${frame}`;
  if (actorMotion.pose === 'cast') return `cast-${frame}`;
  return 'idle';
}

function renderActor(snapshot) {
  const previousPose = actorMotion.pose;
  actorMotion = advanceActorMotion(actorMotion, motionNowMs);
  if (hasStarted && previousPose === 'cast' && actorMotion.pose === 'idle') showRipple();
  const frame = getRenderedActorFrame(snapshot.hook, actorMotion, motionNowMs);
  const bobY = getBoatBobOffset(motionNowMs);
  dom.fishingScene.style.transform = `translateY(${bobY / GAME_CONFIG.worldHeight * 100}%)`;
  dom.fisherman.dataset.frame = String(frame);
  dom.gameArea.dataset.actorState = getActorStateName(snapshot, frame);
  return { frame, bobY };
}

function renderHook(snapshot, actorRender) {
  let hookPoint = { x: snapshot.hook.x, y: snapshot.hook.y };
  let hookRotation = 0;
  let lineMotion = { phase: 'settled', flightProgress: 1, settleProgress: 1 };
  let visible = true;
  if (snapshot.hook.state === 'idle' && actorMotion.pose === 'celebrate') visible = false;
  let rodTip = getRodTip(actorRender.frame, actorRender.bobY);
  if (snapshot.hook.state === 'idle' && actorMotion.pose === 'cast') {
    const releasePoint = getRodTip(7, actorRender.bobY);
    const settledPoint = getRodTip(8, actorRender.bobY);
    const castProgress = getActorMotionProgress(actorMotion, motionNowMs);
    const castPoint = getCastHookPoint(
      castProgress,
      releasePoint,
      castLandingPoint,
    );
    visible = castPoint.visible;
    hookPoint = { x: castPoint.x, y: castPoint.y };
    hookRotation = castPoint.rotation;
    lineMotion = castPoint;
    rodTip = getCastLineOrigin(castProgress, releasePoint, settledPoint);
  }

  dom.hookRig.style.setProperty('--hook-x', `${hookPoint.x / GAME_CONFIG.worldWidth * 100}%`);
  dom.hookRig.style.setProperty('--hook-y', `${hookPoint.y / GAME_CONFIG.worldHeight * 100}%`);
  dom.hookRig.style.setProperty('--hook-rotation', `${hookRotation}deg`);
  dom.hookLinePath.setAttribute(
    'd',
    visible ? getFlexibleLinePath(rodTip, hookPoint, lineMotion) : '',
  );
  dom.hookRig.dataset.state = snapshot.hook.state;
  dom.hookRig.dataset.visible = String(visible);
  if (attachedFishType && visible) {
    const mouthAnchor = caughtFishMouthAnchors[attachedFishType];
    dom.caughtFishVisual.style.backgroundImage = `url("${images[attachedFishType]}")`;
    dom.caughtFish.style.left = `${(hookPoint.x + caughtHookOffset.x) / GAME_CONFIG.worldWidth * 100}%`;
    dom.caughtFish.style.top = `${(hookPoint.y + caughtHookOffset.y) / GAME_CONFIG.worldHeight * 100}%`;
    dom.caughtFish.style.setProperty('--mouth-x', `${mouthAnchor.x * 100}%`);
    dom.caughtFish.style.setProperty('--mouth-y', `${mouthAnchor.y * 100}%`);
    dom.caughtFish.style.setProperty('--mouth-translate-x', `${mouthAnchor.x * -100}%`);
    dom.caughtFish.style.setProperty('--mouth-translate-y', `${mouthAnchor.y * -100}%`);
    const visibleWidth = Math.max(56, FISH_TYPES[attachedFishType].visualWidth * .72);
    dom.caughtFish.style.width = `${visibleWidth * spriteContainerScale[attachedFishType] / GAME_CONFIG.worldWidth * 100}%`;
    dom.caughtFish.hidden = false;
  } else {
    dom.caughtFish.hidden = true;
  }
}

function renderProgress(snapshot) {
  if (snapshot.difficultyLock !== null) {
    dom.progressText.textContent = `试玩锁定 L${snapshot.difficultyLock}`;
    dom.progressFill.style.width = '0%';
    return;
  }
  const threshold = LEVEL_CONFIG[snapshot.level].upgradeScore;
  if (threshold === null) {
    dom.progressText.textContent = '已到最高难度';
    dom.progressFill.style.width = '100%';
    return;
  }
  const progress = Math.min(1, snapshot.levelRun.progressScore / threshold);
  dom.progressText.textContent = `升级进度 ${snapshot.levelRun.progressScore} / ${threshold}`;
  dom.progressFill.style.width = `${progress * 100}%`;
}

function render(snapshot = core.getSnapshot()) {
  dom.time.textContent = formatTime(snapshot.remainingSeconds);
  dom.level.textContent = snapshot.level;
  dom.score.textContent = snapshot.score;
  updateSpeedTuner(snapshot.fishSpeedScale);
  updateDifficultyTuner(snapshot);
  const actorRender = renderActor(snapshot);
  renderEntities(snapshot);
  renderHook(snapshot, actorRender);
  renderProgress(snapshot);
  dom.pauseButton.disabled = !hasStarted || snapshot.phase === 'ended';
  dom.ripple.classList.toggle('is-visible', performance.now() < rippleUntil);
  dom.gameArea.dataset.phase = gamePhase(snapshot);
  dom.gameArea.dataset.hookState = hookState(snapshot.hook.state);
  dom.gameArea.dataset.inputLocked = String(
    paused || snapshot.phase !== 'running' || snapshot.hook.state !== 'idle' || actorMotion.inputLocked,
  );
  dom.gameArea.dataset.lastOutcome = lastOutcome || '';
  dom.gameArea.dataset.cycleId = String(cycleId);
  resolveFinishedCycles(snapshot);
}

function showResult() {
  const snapshot = core.getSnapshot();
  dom.resultDialog.querySelector('[data-result="score"]').textContent = snapshot.score;
  dom.resultDialog.querySelector('[data-result="total"]').textContent = snapshot.stats.totalCaught;
  dom.resultDialog.querySelector('[data-result="big"]').textContent = snapshot.stats.byType.big;
  dom.resultDialog.querySelector('[data-result="medium"]').textContent = snapshot.stats.byType.medium;
  dom.resultDialog.querySelector('[data-result="small"]').textContent = snapshot.stats.byType.small;
  dom.resultDialog.querySelector('[data-result="turtle"]').textContent = snapshot.stats.byType.turtle;
  dom.resultDialog.querySelector('[data-result="starfish"]').textContent = snapshot.stats.byType.starfish;
  dom.resultDialog.querySelector('[data-result="seahorse"]').textContent = snapshot.stats.byType.seahorse;
  dom.resultDialog.hidden = false;
  dom.pauseButton.disabled = true;
  window.setTimeout(() => dom.restartButton.focus(), 0);
}

function startGame() {
  core.start();
  hasStarted = true;
  paused = false;
  attachedFishType = null;
  lastOutcome = null;
  rippleUntil = 0;
  motionNowMs = 0;
  actorMotion = createActorMotion(motionNowMs, { initialCast: true });
  entityMotionStates.clear();
  lastFrameTime = performance.now();
  dom.startPanel.hidden = true;
  dom.pausePanel.hidden = true;
  dom.resultDialog.hidden = true;
  dom.pauseButton.disabled = false;
  dom.pauseLabel.textContent = '暂停';
  dom.pauseIcon.textContent = 'Ⅱ';
  dom.pauseButton.setAttribute('aria-label', '暂停游戏');
  handleEvents(core.drainEvents());
  render();
  dom.gameArea.focus();
}

function resetToReady() {
  core.phase = 'ready';
  core.remainingSeconds = GAME_CONFIG.durationSeconds;
  core.entities = [];
  core.hook = core.createIdleHook();
  hasStarted = false;
  paused = false;
  attachedFishType = null;
  lastOutcome = null;
  motionNowMs = 0;
  actorMotion = createActorMotion(motionNowMs);
  entityMotionStates.clear();
  dom.resultDialog.hidden = true;
  dom.pausePanel.hidden = true;
  dom.startPanel.hidden = false;
  dom.pauseButton.disabled = true;
  render();
}

function requestHookDrop() {
  if (paused) return false;
  actorMotion = advanceActorMotion(actorMotion, motionNowMs);
  if (actorMotion.inputLocked) return false;
  const accepted = core.dropHook();
  if (!accepted) return false;
  handleEvents(core.drainEvents());
  render();
  return true;
}

function togglePause() {
  if (!hasStarted || core.phase === 'ended') return;
  paused = !paused;
  dom.pausePanel.hidden = !paused;
  dom.pauseLabel.textContent = paused ? '继续' : '暂停';
  dom.pauseIcon.textContent = paused ? '▶' : 'Ⅱ';
  dom.pauseButton.setAttribute('aria-label', paused ? '继续游戏' : '暂停游戏');
  if (!paused) {
    lastFrameTime = performance.now();
    dom.gameArea.focus();
  }
}

function resolveFinishedCycles(snapshot) {
  if ((snapshot.hook.state !== 'idle' || actorMotion.inputLocked) && snapshot.phase !== 'ended') return;
  while (cycleWaiters.length) cycleWaiters.shift()();
}

function gamePhase(snapshot) {
  if (paused) return 'paused';
  if (snapshot.phase === 'ready') return 'ready';
  if (snapshot.phase === 'ended') return 'ended';
  return 'playing';
}

function hookState(state) {
  return ({ idle: 'idle', down: 'descending', retract: 'returning', recovery: 'recovering' })[state] || state;
}

function debugSnapshot() {
  const snapshot = core.getSnapshot();
  return {
    phase: gamePhase(snapshot),
    inputLocked: paused || snapshot.phase !== 'running' || snapshot.hook.state !== 'idle' || actorMotion.inputLocked,
    hookState: hookState(snapshot.hook.state),
    rippleVisible: performance.now() < rippleUntil,
    cycleId,
    timeLeft: snapshot.remainingSeconds,
    level: `L${snapshot.level}`,
    score: snapshot.score,
    actorState: dom.gameArea.dataset.actorState || 'idle',
    lastOutcome,
    stats: snapshot.stats,
    entities: snapshot.entities,
    fishSpeedScale: snapshot.fishSpeedScale,
    difficultyLock: snapshot.difficultyLock,
  };
}

function debugSpawnAtHook(type) {
  if (!FISH_TYPES[type]) throw new Error(`Unknown demo entity: ${type}`);
  core.entities = core.entities.filter((entity) => Math.abs(entity.x - GAME_CONFIG.worldWidth / 2) > 280);
  if (FISH_TYPES[type].special) {
    core.entities = core.entities.filter((entity) => !FISH_TYPES[entity.type]?.special);
  }
  const previousLevel = core.level;
  const minimumLevel = FISH_TYPES[type].minimumLevel ?? (type === 'shark' ? 2 : 1);
  core.level = Math.max(previousLevel, minimumLevel);
  const laneId = FISH_TYPES[type].allowedLanes?.[0] ?? (type === 'shark' ? 'top' : 'middle');
  const lane = LANES.find((candidate) => candidate.id === laneId);
  const entity = core.spawnEntity(type, laneId, {
    x: GAME_CONFIG.worldWidth / 2,
    y: lane.yRatios[1] * GAME_CONFIG.worldHeight,
    subLaneIndex: 1,
    direction: 1,
    speed: 0,
  });
  core.level = previousLevel;
  core.drainEvents();
  render();
  return entity;
}

function debugForceHookCycle() {
  if (!requestHookDrop() && core.getSnapshot().hook.state === 'idle') return Promise.resolve(debugSnapshot());
  return new Promise((resolve) => {
    cycleWaiters.push(() => resolve(debugSnapshot()));
  });
}

dom.startButton.addEventListener('click', (event) => { event.stopPropagation(); startGame(); });
dom.restartButton.addEventListener('click', (event) => { event.stopPropagation(); startGame(); });
dom.pauseButton.addEventListener('click', togglePause);
dom.speedScale.addEventListener('input', applySpeedScale);
dom.speedReset.addEventListener('click', () => {
  dom.speedScale.value = String(GAME_CONFIG.fishSpeedTuning.default);
  applySpeedScale();
});
for (const button of dom.difficultyButtons) {
  button.addEventListener('click', () => {
    core.setDifficultyLock(Number(button.dataset.difficultyLevel));
    handleEvents(core.drainEvents());
    render();
  });
}
dom.difficultyDynamic.addEventListener('click', () => {
  core.clearDifficultyLock();
  handleEvents(core.drainEvents());
  render();
});
dom.speedTunerToggle.addEventListener('click', () => {
  const collapsed = dom.speedTuner.classList.toggle('is-collapsed');
  dom.speedTunerToggle.textContent = collapsed ? '调参数' : '收起';
  dom.speedTunerToggle.setAttribute('aria-expanded', String(!collapsed));
});
dom.gameArea.addEventListener('click', (event) => {
  if (event.target.closest('button, .overlay')) return;
  requestHookDrop();
});
dom.gameArea.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  requestHookDrop();
});

if (new URLSearchParams(location.search).has('test')) {
  window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'q') debugSpawnAtHook('small');
    if (event.key.toLowerCase() === 'w') debugSpawnAtHook('shark');
    if (event.key.toLowerCase() === 'a') debugSpawnAtHook('seahorse');
    if (event.key.toLowerCase() === 's') debugSpawnAtHook('starfish');
    if (event.key.toLowerCase() === 'd') debugSpawnAtHook('turtle');
    if (/^[1-6]$/.test(event.key)) {
      core.setDifficultyLock(Number(event.key));
      handleEvents(core.drainEvents());
      render();
    }
    if (event.key.toLowerCase() === 'e') core.remainingSeconds = .12;
  });
}

window.FishingDemo = {
  debug: {
    snapshot: debugSnapshot,
    start: startGame,
    restart: resetToReady,
    setLevel(level) { core.setLevel(level, 'manual'); handleEvents(core.drainEvents()); render(); return debugSnapshot(); },
    setFishSpeedScale(scale) { core.setFishSpeedScale(scale); render(); return debugSnapshot(); },
    setDifficultyLock(level) { core.setDifficultyLock(level); handleEvents(core.drainEvents()); render(); return debugSnapshot(); },
    clearDifficultyLock() { core.clearDifficultyLock(); handleEvents(core.drainEvents()); render(); return debugSnapshot(); },
    setTimeLeft(seconds) { core.remainingSeconds = Math.max(0, Number(seconds) || 0); render(); return debugSnapshot(); },
    spawnAtHook: debugSpawnAtHook,
    forceHookCycle: debugForceHookCycle,
  },
};

function frame(now) {
  const deltaSeconds = Math.min(.05, Math.max(0, (now - lastFrameTime) / 1000));
  lastFrameTime = now;
  if (!paused && (core.phase === 'running' || core.phase === 'finishing')) {
    motionNowMs += deltaSeconds * 1000;
    core.tick(deltaSeconds);
    handleEvents(core.drainEvents());
  }
  render();
  requestAnimationFrame(frame);
}

render();
requestAnimationFrame(frame);
