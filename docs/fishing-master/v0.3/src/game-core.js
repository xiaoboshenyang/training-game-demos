import {
  FISH_TYPES,
  GAME_CONFIG,
  HOOK_CONFIG,
  LANES,
  LEVEL_CONFIG,
} from './game-config.js';

const FISH_IDS = Object.freeze(['big', 'medium', 'small']);
const SPAWN_IDS = Object.freeze(['big', 'medium', 'small', 'shark']);
const MAX_LEVEL = 6;
const TIMER_EPSILON = 1e-9;

export function createSequenceRandom(values, fallback = 0.5) {
  const sequence = Array.from(values);
  let index = 0;
  return () => {
    if (sequence.length === 0) return fallback;
    const value = sequence[index % sequence.length];
    index += 1;
    return value;
  };
}

function makeLevelRun() {
  return {
    progressScore: 0,
    attempts: 0,
    successes: 0,
    failures: 0,
    recentResults: [],
    consecutiveFailures: 0,
  };
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function copy(value) {
  return JSON.parse(JSON.stringify(value));
}

export class FishingGameCore {
  constructor({
    random = Math.random,
    worldWidth = GAME_CONFIG.worldWidth,
    worldHeight = GAME_CONFIG.worldHeight,
    autoPopulate = true,
  } = {}) {
    this.random = random;
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.autoPopulate = autoPopulate;
    this.fishSpeedScale = GAME_CONFIG.fishSpeedTuning.default;
    this.difficultyLock = null;
    this.phase = 'ready';
    this.remainingSeconds = GAME_CONFIG.durationSeconds;
    this.level = this.difficultyLock ?? 1;
    this.score = 0;
    this.entities = [];
    this.events = [];
    this.nextEntityNumber = 1;
    this.laneSpawnTimers = {};
    this.stats = this.createStats();
    this.levelRun = makeLevelRun();
    this.hook = this.createIdleHook();
  }

  createStats() {
    return {
      attempts: 0,
      successfulCatches: 0,
      failedAttempts: 0,
      totalCaught: 0,
      emptyHooks: 0,
      sharkHits: 0,
      upgrades: 0,
      downgrades: 0,
      byType: { big: 0, medium: 0, small: 0 },
    };
  }

  createIdleHook() {
    return {
      state: 'idle',
      x: this.worldWidth / 2,
      y: HOOK_CONFIG.surfaceY,
      elapsed: 0,
      duration: 0,
      retractStartY: HOOK_CONFIG.surfaceY,
      attachedEntityId: null,
      pendingOutcome: null,
    };
  }

  start() {
    this.phase = 'running';
    this.remainingSeconds = GAME_CONFIG.durationSeconds;
    this.level = this.difficultyLock ?? 1;
    this.score = 0;
    this.entities = [];
    this.events = [];
    this.nextEntityNumber = 1;
    this.stats = this.createStats();
    this.levelRun = makeLevelRun();
    this.hook = this.createIdleHook();
    this.laneSpawnTimers = this.autoPopulate ? this.createInitialLaneTimers() : {};
    this.emit('gameStarted', { durationSeconds: GAME_CONFIG.durationSeconds });
    this.ensureSharkPresence();
    return this.getSnapshot();
  }

  tick(deltaSeconds) {
    if (!Number.isFinite(deltaSeconds) || deltaSeconds <= 0) return this.getSnapshot();
    if (this.phase === 'ended' || this.phase === 'ready') return this.getSnapshot();

    if (this.phase === 'finishing') {
      this.advanceEntities(deltaSeconds);
      this.advanceHook(deltaSeconds);
      return this.getSnapshot();
    }

    const activeDelta = Math.min(deltaSeconds, this.remainingSeconds);
    const willExpire = this.remainingSeconds - activeDelta <= TIMER_EPSILON;
    this.advanceEntities(activeDelta);
    if (this.autoPopulate) this.advanceLaneSpawnTimers(activeDelta, !willExpire);
    this.advanceHook(activeDelta);
    this.remainingSeconds = Math.max(0, this.remainingSeconds - activeDelta);
    if (this.remainingSeconds > TIMER_EPSILON) this.ensureSharkPresence();

    if (this.remainingSeconds <= TIMER_EPSILON) {
      this.remainingSeconds = 0;
      if (this.hook.state === 'idle') this.endGame();
      else this.phase = 'finishing';
    }

    const remainingDelta = deltaSeconds - activeDelta;
    if (remainingDelta > TIMER_EPSILON && this.phase === 'finishing') {
      this.advanceEntities(remainingDelta);
      this.advanceHook(remainingDelta);
    }
    return this.getSnapshot();
  }

  dropHook(_clickX) {
    if (this.phase !== 'running' || this.remainingSeconds <= 0 || this.hook.state !== 'idle') return false;
    this.hook = {
      state: 'down',
      x: this.worldWidth / 2,
      y: HOOK_CONFIG.surfaceY,
      elapsed: 0,
      duration: HOOK_CONFIG.downSeconds,
      retractStartY: HOOK_CONFIG.surfaceY,
      attachedEntityId: null,
      pendingOutcome: null,
    };
    this.emit('hookDropped', { x: this.hook.x, y: HOOK_CONFIG.surfaceY });
    return true;
  }

  advanceHook(deltaSeconds) {
    if (this.hook.state === 'idle') return;
    if (this.hook.state === 'down') {
      const previousY = this.hook.y;
      this.hook.elapsed = Math.min(this.hook.duration, this.hook.elapsed + deltaSeconds);
      const progress = this.hook.elapsed / this.hook.duration;
      this.hook.y = HOOK_CONFIG.surfaceY
        + (HOOK_CONFIG.bottomY - HOOK_CONFIG.surfaceY) * progress;
      const collision = this.findFirstCollision(previousY, this.hook.y);
      if (collision) {
        this.hook.y = collision.hitY;
        if (collision.entity.kind === 'shark') this.hitShark(collision.entity);
        else this.catchFish(collision.entity);
        return;
      }
      if (this.hook.elapsed >= this.hook.duration - TIMER_EPSILON) {
        this.beginRetract(HOOK_CONFIG.emptyRetractSeconds, { success: false, failureKind: 'empty' });
      }
      return;
    }

    if (this.hook.state === 'retract') {
      this.hook.elapsed = Math.min(this.hook.duration, this.hook.elapsed + deltaSeconds);
      const progress = this.hook.duration === 0 ? 1 : this.hook.elapsed / this.hook.duration;
      this.hook.y = HOOK_CONFIG.surfaceY
        + (this.hook.retractStartY - HOOK_CONFIG.surfaceY) * (1 - progress);
      if (this.hook.elapsed >= this.hook.duration - TIMER_EPSILON) this.completeRetract();
      return;
    }

    if (this.hook.state === 'recovery') {
      this.hook.elapsed = Math.min(this.hook.duration, this.hook.elapsed + deltaSeconds);
      const retractProgress = Math.min(1, this.hook.elapsed / HOOK_CONFIG.emptyRetractSeconds);
      this.hook.y = HOOK_CONFIG.surfaceY
        + (this.hook.retractStartY - HOOK_CONFIG.surfaceY) * (1 - retractProgress);
      if (this.hook.elapsed >= this.hook.duration - TIMER_EPSILON) this.completeRecovery();
    }
  }

  findFirstCollision(previousY, currentY) {
    const candidates = [];
    for (const entity of this.entities) {
      const hookCollisionWidth = entity.kind === 'shark'
        ? HOOK_CONFIG.collisionWidth
        : HOOK_CONFIG.fishCollisionWidth;
      const horizontalReach = (hookCollisionWidth + entity.collisionWidth) / 2;
      if (Math.abs(entity.x - this.hook.x) > horizontalReach) continue;
      const verticalReach = (HOOK_CONFIG.collisionHeight + entity.collisionHeight) / 2;
      const firstContactY = entity.y - verticalReach;
      const lastContactY = entity.y + verticalReach;
      if (firstContactY > currentY || lastContactY < previousY) continue;
      candidates.push({ entity, hitY: Math.max(previousY, firstContactY) });
    }
    candidates.sort((left, right) => {
      const distance = left.hitY - right.hitY;
      if (Math.abs(distance) >= 2) return distance;
      if (left.entity.kind !== right.entity.kind) return left.entity.kind === 'shark' ? -1 : 1;
      return left.entity.sequence - right.entity.sequence;
    });
    return candidates[0] ?? null;
  }

  catchFish(entity) {
    this.entities = this.entities.filter((candidate) => candidate.id !== entity.id);
    const pendingOutcome = {
      success: true,
      points: FISH_TYPES[entity.type].score,
      fishType: entity.type,
    };
    this.beginRetract(HOOK_CONFIG.catchRetractSeconds, pendingOutcome, entity.id);
    this.emit('fishHooked', { entityId: entity.id, fishType: entity.type });
  }

  hitShark(entity) {
    this.hook.state = 'recovery';
    this.hook.elapsed = 0;
    this.hook.duration = HOOK_CONFIG.sharkRecoverySeconds;
    this.hook.retractStartY = this.hook.y;
    this.hook.attachedEntityId = null;
    this.hook.pendingOutcome = { success: false, failureKind: 'shark' };
    this.emit('sharkHit', { entityId: entity.id, recoverySeconds: HOOK_CONFIG.sharkRecoverySeconds });
  }

  beginRetract(duration, pendingOutcome, attachedEntityId = null) {
    this.hook.state = 'retract';
    this.hook.elapsed = 0;
    this.hook.duration = duration;
    this.hook.retractStartY = this.hook.y;
    this.hook.pendingOutcome = pendingOutcome;
    this.hook.attachedEntityId = attachedEntityId;
  }

  completeRetract() {
    const outcome = this.hook.pendingOutcome;
    this.recordAttempt(outcome);
    if (outcome.success) this.emit('catchCompleted', { points: outcome.points, fishType: outcome.fishType });
    else this.emit('emptyRetract', {});
    this.finishAction();
  }

  completeRecovery() {
    this.recordAttempt(this.hook.pendingOutcome);
    this.finishAction();
  }

  finishAction() {
    this.hook = this.createIdleHook();
    this.emit('hookReady', {});
    if (this.remainingSeconds <= 0 || this.phase === 'finishing') this.endGame();
  }

  recordAttempt({ success, points = 0, fishType = null, failureKind = 'empty' } = {}) {
    const didSucceed = Boolean(success);
    const awardedPoints = didSucceed ? Math.max(0, Number(points) || 0) : 0;
    this.stats.attempts += 1;
    this.levelRun.attempts += 1;
    this.levelRun.recentResults.push(didSucceed);
    if (this.levelRun.recentResults.length > 5) this.levelRun.recentResults.shift();

    if (didSucceed) {
      this.score += awardedPoints;
      this.levelRun.progressScore += awardedPoints;
      this.levelRun.successes += 1;
      this.levelRun.consecutiveFailures = 0;
      this.stats.successfulCatches += 1;
      this.stats.totalCaught += 1;
      if (FISH_IDS.includes(fishType)) this.stats.byType[fishType] += 1;
    } else {
      this.levelRun.failures += 1;
      this.levelRun.consecutiveFailures += 1;
      this.stats.failedAttempts += 1;
      if (failureKind === 'shark') this.stats.sharkHits += 1;
      else this.stats.emptyHooks += 1;
    }

    this.emit('attemptCompleted', {
      success: didSucceed,
      points: awardedPoints,
      fishType,
      failureKind: didSucceed ? null : failureKind,
    });
    this.evaluateLevelChange();
    return this.getSnapshot();
  }

  evaluateLevelChange() {
    if (this.difficultyLock !== null) return;
    const levelConfig = LEVEL_CONFIG[this.level];
    if (
      this.level < MAX_LEVEL
      && levelConfig.upgradeScore !== null
      && this.levelRun.progressScore >= levelConfig.upgradeScore
    ) {
      this.setLevel(this.level + 1, 'upgrade');
      return;
    }

    if (this.levelRun.consecutiveFailures < 4) return;
    if (this.level > 1) this.setLevel(this.level - 1, 'downgrade');
    else {
      this.levelRun.consecutiveFailures = 0;
      this.emit('failureStreakReset', { level: 1 });
    }
  }

  setLevel(level, reason = 'manual') {
    const nextLevel = clamp(Math.round(level), 1, MAX_LEVEL);
    if (nextLevel === this.level) return false;
    const previousLevel = this.level;
    this.level = nextLevel;
    this.levelRun = makeLevelRun();
    if (reason === 'upgrade') this.stats.upgrades += 1;
    if (reason === 'downgrade') this.stats.downgrades += 1;
    this.emit('levelChanged', { previousLevel, level: nextLevel, reason });
    this.ensureSharkPresence();
    return true;
  }

  setFishSpeedScale(value) {
    const tuning = GAME_CONFIG.fishSpeedTuning;
    const nextScale = clamp(Number(value) || tuning.default, tuning.minimum, tuning.maximum);
    const ratio = nextScale / this.fishSpeedScale;
    this.fishSpeedScale = nextScale;
    for (const entity of this.entities) {
      if (entity.kind === 'fish') entity.speed *= ratio;
    }
    this.emit('fishSpeedScaleChanged', { scale: nextScale });
    return nextScale;
  }

  setDifficultyLock(level) {
    const nextLevel = clamp(Math.round(Number(level) || 1), 1, MAX_LEVEL);
    const previousLevel = this.level;
    this.difficultyLock = nextLevel;
    this.level = nextLevel;
    this.levelRun = makeLevelRun();
    if (previousLevel !== nextLevel) {
      this.emit('levelChanged', { previousLevel, level: nextLevel, reason: 'tuning' });
    }
    this.emit('difficultyLockChanged', { level: nextLevel, locked: true });
    this.ensureSharkPresence();
    return nextLevel;
  }

  clearDifficultyLock() {
    if (this.difficultyLock === null) return false;
    this.difficultyLock = null;
    this.levelRun = makeLevelRun();
    this.emit('difficultyLockChanged', { level: this.level, locked: false });
    return true;
  }

  createInitialLaneTimers() {
    const [minimum, maximum] = GAME_CONFIG.initialSpawnDelaySeconds;
    return Object.fromEntries(LANES.map((lane) => [
      lane.id,
      minimum + (maximum - minimum) * this.random(),
    ]));
  }

  advanceLaneSpawnTimers(deltaSeconds, includeBoundary = true) {
    for (const lane of LANES) {
      this.laneSpawnTimers[lane.id] -= deltaSeconds;
      let spawnGuard = 0;
      const isReady = () => includeBoundary
        ? this.laneSpawnTimers[lane.id] <= TIMER_EPSILON
        : this.laneSpawnTimers[lane.id] < -TIMER_EPSILON;
      while (isReady() && spawnGuard < 100) {
        this.spawnForLane(lane.id);
        this.laneSpawnTimers[lane.id] += this.drawSpawnInterval();
        spawnGuard += 1;
      }
    }
  }

  drawSpawnInterval() {
    const [minimum, maximum] = LEVEL_CONFIG[this.level].spawnIntervalSeconds;
    return minimum + (maximum - minimum) * this.random();
  }

  selectSpawnType(laneId, roll = this.random()) {
    const lane = LANES.find((candidate) => candidate.id === laneId);
    if (!lane) return null;
    const weights = lane.allowsShark
      ? LEVEL_CONFIG[this.level].shallowMidWeights
      : LEVEL_CONFIG[this.level].deepWeights;
    const target = clamp(Number.isFinite(roll) ? roll : 0, 0, 1 - Number.EPSILON) * 100;
    let cumulative = 0;
    for (const type of SPAWN_IDS) {
      cumulative += weights[type];
      if (target < cumulative) return type;
    }
    return 'small';
  }

  selectFishType(laneId, roll = this.random()) {
    const lane = LANES.find((candidate) => candidate.id === laneId);
    if (!lane) return null;
    const weights = lane.allowsShark
      ? LEVEL_CONFIG[this.level].shallowMidWeights
      : LEVEL_CONFIG[this.level].deepWeights;
    const totalFishWeight = FISH_IDS.reduce((total, type) => total + weights[type], 0);
    const target = clamp(Number.isFinite(roll) ? roll : 0, 0, 1 - Number.EPSILON) * totalFishWeight;
    let cumulative = 0;
    for (const type of FISH_IDS) {
      cumulative += weights[type];
      if (target < cumulative) return type;
    }
    return 'small';
  }

  spawnForLane(laneId) {
    let type = this.selectSpawnType(laneId);
    if (
      type === 'shark'
      && this.countConcurrentSharks() >= GAME_CONFIG.sharkPresence.maximumConcurrent
    ) {
      type = this.selectFishType(laneId);
    }
    return this.spawnEntity(type, laneId);
  }

  spawnEntity(type, laneId, overrides = {}) {
    const typeConfig = FISH_TYPES[type];
    const lane = LANES.find((candidate) => candidate.id === laneId);
    if (!typeConfig || !lane) return null;
    if (type === 'shark' && (!lane.allowsShark || this.level < 2)) return null;
    if (
      type === 'shark'
      && this.countConcurrentSharks() >= GAME_CONFIG.sharkPresence.maximumConcurrent
    ) return null;

    const direction = overrides.direction === -1 || overrides.direction === 1
      ? overrides.direction
      : (this.random() < 0.5 ? 1 : -1);
    const visualWidth = overrides.visualWidth ?? typeConfig.visualWidth;
    const subLaneIndex = Number.isInteger(overrides.subLaneIndex)
      ? clamp(overrides.subLaneIndex, 0, lane.yRatios.length - 1)
      : Math.min(lane.yRatios.length - 1, Math.floor(this.random() * lane.yRatios.length));
    const defaultX = direction === 1
      ? -GAME_CONFIG.exitPadding - visualWidth / 2
      : this.worldWidth + GAME_CONFIG.exitPadding + visualWidth / 2;
    const entity = {
      id: `entity-${this.nextEntityNumber}`,
      sequence: this.nextEntityNumber,
      type,
      kind: typeConfig.kind,
      laneId,
      subLaneIndex,
      x: overrides.x ?? defaultX,
      y: overrides.y ?? lane.yRatios[subLaneIndex] * this.worldHeight,
      direction,
      speed: (overrides.speed ?? (this.worldWidth + visualWidth) / typeConfig.crossingSeconds)
        * (typeConfig.kind === 'fish' ? this.fishSpeedScale : 1),
      visualWidth,
      collisionWidth: overrides.collisionWidth ?? typeConfig.collisionWidth,
      collisionHeight: overrides.collisionHeight ?? typeConfig.collisionHeight,
    };
    this.nextEntityNumber += 1;
    this.entities.push(entity);
    this.emit('entitySpawned', copy(entity));
    return copy(entity);
  }

  isEntityVisible(entity) {
    const halfWidth = entity.visualWidth / 2;
    return entity.x + halfWidth > 0 && entity.x - halfWidth < this.worldWidth;
  }

  isSharkConcurrent(entity) {
    if (entity.kind !== 'shark') return false;
    const halfWidth = entity.visualWidth / 2;
    return entity.direction === 1
      ? entity.x < this.worldWidth + halfWidth
      : entity.x > -halfWidth;
  }

  countConcurrentSharks() {
    return this.entities.filter((entity) => this.isSharkConcurrent(entity)).length;
  }

  ensureSharkPresence() {
    if (
      this.phase !== 'running'
      || this.remainingSeconds <= TIMER_EPSILON
      || this.level < GAME_CONFIG.sharkPresence.minimumLevel
    ) return null;

    const visibleSharks = this.entities.filter((entity) => (
      entity.kind === 'shark' && this.isEntityVisible(entity)
    ));
    if (visibleSharks.length >= GAME_CONFIG.sharkPresence.minimumVisible) return null;

    const incomingShark = this.entities.find((entity) => this.isSharkConcurrent(entity));
    if (incomingShark) {
      incomingShark.x = incomingShark.direction === 1 ? 0 : this.worldWidth;
      this.emit('sharkPresenceRestored', { entityId: incomingShark.id, reused: true });
      return copy(incomingShark);
    }

    const sharkLanes = LANES.filter((lane) => lane.allowsShark);
    const laneIndex = Math.min(sharkLanes.length - 1, Math.floor(this.random() * sharkLanes.length));
    const direction = this.random() < 0.5 ? 1 : -1;
    const shark = this.spawnEntity('shark', sharkLanes[laneIndex].id, {
      direction,
      x: direction === 1 ? 0 : this.worldWidth,
    });
    if (shark) this.emit('sharkPresenceRestored', { entityId: shark.id, reused: false });
    return shark;
  }

  advanceEntities(deltaSeconds) {
    const exited = [];
    for (const entity of this.entities) {
      entity.x += entity.direction * entity.speed * deltaSeconds;
      const rightExit = this.worldWidth + GAME_CONFIG.exitPadding + entity.visualWidth / 2;
      const leftExit = -GAME_CONFIG.exitPadding - entity.visualWidth / 2;
      if ((entity.direction === 1 && entity.x > rightExit) || (entity.direction === -1 && entity.x < leftExit)) {
        exited.push(entity);
      }
    }
    if (exited.length === 0) return;
    const exitedIds = new Set(exited.map((entity) => entity.id));
    this.entities = this.entities.filter((entity) => !exitedIds.has(entity.id));
    for (const entity of exited) {
      this.emit('entityExited', { entityId: entity.id, type: entity.type, laneId: entity.laneId });
    }
  }

  endGame() {
    if (this.phase === 'ended') return;
    this.phase = 'ended';
    this.emit('gameEnded', { score: this.score, stats: copy(this.stats) });
  }

  emit(type, payload) {
    this.events.push({ type, ...payload });
  }

  drainEvents() {
    const events = copy(this.events);
    this.events = [];
    return events;
  }

  getSnapshot() {
    return copy({
      phase: this.phase,
      remainingSeconds: this.remainingSeconds,
      level: this.level,
      score: this.score,
      stats: this.stats,
      levelRun: this.levelRun,
      hook: this.hook,
      entities: this.entities,
      laneSpawnTimers: this.laneSpawnTimers,
      fishSpeedScale: this.fishSpeedScale,
      difficultyLock: this.difficultyLock,
    });
  }
}
