(function attachCloudJourneySession(root, factory) {
  const core = typeof module === "object" && module.exports
    ? require("./game-core.js")
    : root.CloudJourneyCore;
  const api = factory(core);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.CloudJourneySession = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createSessionApi(core) {
  "use strict";

  if (!core) throw new Error("CloudJourneyCore must be loaded before game-session.js");

  const {
    CONFIG,
    createRng,
    updateBalloon,
    createObstacle,
    collidesWithObstacle,
    collectsCoin,
    applyScoreEvent,
    levelForScore,
    clamp,
    obstaclePassageAt,
    balloonCollisionRect
  } = core;

  const DEFAULT_PLAYTEST_SETTINGS = Object.freeze({
    mode: "auto",
    lockedLevel: 1,
    speedPercent: 100,
    gapPercent: 100,
    frequencyPercent: 100
  });

  function normalizePercent(value, minimum, maximum) {
    return clamp(Math.round(Number(value) || 100), minimum, maximum);
  }

  function normalizePlaytestSettings(settings = {}) {
    const lockedLevel = clamp(Math.round(Number(settings.lockedLevel) || 1), 1, 6);
    return {
      mode: settings.mode === "locked" ? "locked" : "auto",
      lockedLevel,
      speedPercent: normalizePercent(settings.speedPercent, 70, 130),
      gapPercent: normalizePercent(settings.gapPercent, 80, 120),
      frequencyPercent: normalizePercent(settings.frequencyPercent, 70, 130)
    };
  }

  function activeWorldSpeed(session) {
    return CONFIG.levels[session.level].worldSpeed * session.playtest.speedPercent / 100;
  }

  function effectiveGap(session) {
    return CONFIG.levels[session.level].gap * session.playtest.gapPercent / 100;
  }

  function makeLevelStats() {
    return Object.fromEntries(Array.from({ length: 6 }, (_, index) => [
      index + 1,
      { score: 0, passes: 0, coins: 0, collisions: 0 }
    ]));
  }

  function createSession({ seed, duration = CONFIG.durationSeconds, playtestSettings } = {}) {
    const normalizedDuration = Math.max(1, Math.min(CONFIG.durationSeconds, Number(duration) || CONFIG.durationSeconds));
    const normalizedSeed = String(seed ?? Date.now());
    const playtest = normalizePlaytestSettings(playtestSettings);
    const initialLevel = playtest.mode === "locked" ? playtest.lockedLevel : 1;
    return {
      status: "running",
      seed: normalizedSeed,
      rng: createRng(normalizedSeed),
      visualRng: createRng(`${normalizedSeed}:cloud-visuals`),
      duration: normalizedDuration,
      remaining: normalizedDuration,
      elapsed: 0,
      score: 0,
      level: initialLevel,
      maxLevel: initialLevel,
      playtest,
      holding: false,
      balloon: { y: CONFIG.balloonStartY, velocity: 0 },
      obstacles: [],
      nextObstacleIndex: 0,
      previousCenter: CONFIG.balloonStartY,
      routeLevel: initialLevel,
      motionBudget: 0,
      consecutiveDoubles: 0,
      consecutiveSameSide: 0,
      lastObstacleKind: null,
      lastVisualVariant: -1,
      spawnIn: 1.25,
      collisionCooldown: 0,
      coinRng: createRng(`${normalizedSeed}:gap-coins`),
      totals: { passes: 0, coins: 0, collisions: 0 },
      byLevel: makeLevelStats(),
      generationLog: [],
      events: [{ type: "start", at: 0, seed: normalizedSeed, playtest: { ...playtest } }]
    };
  }

  function setPlaytestSettings(session, changes = {}) {
    if (!session) return null;
    const previousLevel = session.level;
    session.playtest = normalizePlaytestSettings({ ...session.playtest, ...changes });
    session.level = session.playtest.mode === "locked"
      ? session.playtest.lockedLevel
      : levelForScore(session.score);
    session.maxLevel = Math.max(session.maxLevel, session.level);
    if (session.level !== previousLevel) {
      session.routeLevel = -1;
      resetRouteStateForLevel(session);
      session.events.push({
        type: "playtest-level",
        at: round(session.elapsed),
        from: previousLevel,
        to: session.level,
        mode: session.playtest.mode
      });
    }
    session.events.push({
      type: "playtest-settings",
      at: round(session.elapsed),
      settings: { ...session.playtest }
    });
    return { ...session.playtest };
  }

  function resetRouteStateForLevel(session) {
    if (session.routeLevel === session.level) return;
    session.routeLevel = session.level;
    session.motionBudget = 0;
    session.consecutiveDoubles = 0;
    session.consecutiveSameSide = 0;
    session.lastObstacleKind = null;
  }

  function singleBufferKind(session, center) {
    return session.balloon.y <= center ? "bottom" : "top";
  }

  function clearMovement(obstacle) {
    obstacle.moving = false;
    obstacle.moveAmplitude = 0;
    obstacle.movePeriod = 0;
    obstacle.phase = 0;
  }

  function applyRouteConstraints(session, obstacle) {
    let adjusted = false;
    const doubleLimit = session.level <= 4 ? 2 : 3;
    if (session.level >= 2 && session.consecutiveDoubles >= doubleLimit) {
      if (obstacle.kind === "double") {
        obstacle.kind = singleBufferKind(session, obstacle.baseCenter);
      }
      clearMovement(obstacle);
      adjusted = true;
    }
    if (session.level <= 3 && obstacle.kind !== "double"
      && session.consecutiveSameSide >= 2 && obstacle.kind === session.lastObstacleKind) {
      obstacle.kind = obstacle.kind === "top" ? "bottom" : "top";
      adjusted = true;
    }
    obstacle.routeAdjusted = adjusted;
    return obstacle;
  }

  function safeCenterRange(obstacle, elapsedSeconds) {
    const passage = obstaclePassageAt(obstacle, elapsedSeconds);
    const collisionHalfHeight = balloonCollisionRect({ y: 0 }).height / 2;
    const visualHalfHeight = CONFIG.balloonHeight / 2;
    const movementMinimum = CONFIG.safeTop + visualHalfHeight;
    const movementMaximum = CONFIG.safeBottom - visualHalfHeight;
    let minimum = movementMinimum;
    let maximum = movementMaximum;

    if (obstacle.kind === "top" || obstacle.kind === "double") {
      minimum = Math.max(minimum, passage.gapTop + collisionHalfHeight);
    }
    if (obstacle.kind === "bottom" || obstacle.kind === "double") {
      maximum = Math.min(maximum, passage.gapBottom - collisionHalfHeight);
    }
    if (
      obstacle.kind === "double" &&
      (passage.gapTop < CONFIG.safeTop || passage.gapBottom > CONFIG.safeBottom)
    ) {
      return null;
    }
    return minimum <= maximum ? { minimum, maximum } : null;
  }

  function isObstacleReachable(session, obstacle) {
    const distanceToPlayer = Math.max(0, obstacle.x - CONFIG.balloonX);
    const worldSpeed = activeWorldSpeed(session);
    const arrivalSeconds = distanceToPlayer / worldSpeed;
    const interactionHalfWindow = (obstacle.width + CONFIG.balloonWidth) / (2 * worldSpeed);
    const samples = obstacle.moving
      ? [
          Math.max(0, arrivalSeconds - interactionHalfWindow),
          arrivalSeconds,
          arrivalSeconds + interactionHalfWindow
        ]
      : [arrivalSeconds];

    let minimum = -Infinity;
    let maximum = Infinity;
    for (const sample of samples) {
      const range = safeCenterRange(obstacle, sample);
      if (!range) return false;
      minimum = Math.max(minimum, range.minimum);
      maximum = Math.min(maximum, range.maximum);
    }
    if (minimum > maximum) return false;

    const target = clamp(session.balloon.y, minimum, maximum);
    const transitionAllowance = CONFIG.transitionSeconds;
    const movementTime = Math.max(0, arrivalSeconds - transitionAllowance);
    const reachableDistance = target < session.balloon.y
      ? CONFIG.riseSpeed * movementTime
      : CONFIG.fallSpeed * movementTime;
    return Math.abs(target - session.balloon.y) <= reachableDistance + 0.001;
  }

  function createSafeFallback(session) {
    const levelConfig = CONFIG.levels[session.level];
    const gap = effectiveGap(session);
    const absoluteMinimum = CONFIG.safeTop + gap / 2;
    const absoluteMaximum = CONFIG.safeBottom - gap / 2;
    const center = clamp(session.previousCenter, absoluteMinimum, absoluteMaximum);
    return {
      id: `obstacle-${session.nextObstacleIndex}`,
      index: session.nextObstacleIndex,
      generatedLevel: session.level,
      kind: singleBufferKind(session, center),
      gap,
      baseCenter: center,
      x: CONFIG.width + CONFIG.obstacleWidth,
      width: CONFIG.obstacleWidth,
      moving: false,
      moveAmplitude: 0,
      movePeriod: 0,
      phase: 0,
      coin: null,
      collided: false,
      passed: false,
      createdAt: 0,
      routeAdjusted: true,
      fallbackUsed: true,
      generationAttempts: 10
    };
  }

  function selectSafeObstacle(session, candidateFactory = createObstacle) {
    resetRouteStateForLevel(session);
    for (let attempt = 1; attempt <= 10; attempt += 1) {
      const obstacle = candidateFactory({
        level: session.level,
        rng: session.rng,
        previousCenter: session.previousCenter,
        index: session.nextObstacleIndex
      });
      if (session.playtest.gapPercent !== 100) obstacle.gap = effectiveGap(session);
      const absoluteMinimum = CONFIG.safeTop + obstacle.gap / 2;
      const absoluteMaximum = CONFIG.safeBottom - obstacle.gap / 2;
      obstacle.baseCenter = clamp(obstacle.baseCenter, absoluteMinimum, absoluteMaximum);
      if (session.nextObstacleIndex === 0) obstacle.baseCenter = CONFIG.balloonStartY;
      const settings = CONFIG.levels[session.level];
      const halfWidth = CONFIG.obstacleVisualMaxWidth / 2 + 7;
      const travelUntilEntry = Math.max(0, obstacle.x - halfWidth - CONFIG.width);
      // Older clouds leave first. Reserve a slot at this cloud's screen entry,
      // rather than counting already departed/offscreen clouds against the cap.
      const overlappingMoving = session.obstacles.filter(item => item.moving
        && item.x + halfWidth - travelUntilEntry > 0).length;
      const movingDue = session.motionBudget >= 1 - 1e-9;
      if (movingDue && settings.movingChance > 0 && overlappingMoving < settings.maxMoving) {
        obstacle.moving = true;
        obstacle.moveAmplitude = settings.moveAmplitude;
        obstacle.movePeriod = settings.movePeriod;
        obstacle.phase = obstacle.phase || session.rng() * Math.PI * 2;
        // Reserve the full swing so the corridor never crosses the safe edges.
        obstacle.baseCenter = clamp(obstacle.baseCenter,
          absoluteMinimum + obstacle.moveAmplitude, absoluteMaximum - obstacle.moveAmplitude);
      } else clearMovement(obstacle);
      applyRouteConstraints(session, obstacle);
      if (isObstacleReachable(session, obstacle)) {
        obstacle.fallbackUsed = false;
        obstacle.generationAttempts = attempt;
        return obstacle;
      }
    }
    const fallback = createSafeFallback(session);
    if (session.level <= 3) applyRouteConstraints(session, fallback);
    return fallback;
  }

  function round(value, precision = 2) {
    const factor = 10 ** precision;
    return Math.round(value * factor) / factor;
  }

  function logObstacle(session, obstacle) {
    session.generationLog.push({
      index: obstacle.index,
      at: round(session.elapsed),
      generatedLevel: obstacle.generatedLevel,
      kind: obstacle.kind,
      moving: obstacle.moving,
      gap: obstacle.gap,
      center: round(obstacle.baseCenter),
      moveAmplitude: obstacle.moveAmplitude,
      movePeriod: obstacle.movePeriod,
      worldSpeed: activeWorldSpeed(session),
      speedPercent: session.playtest.speedPercent,
      gapPercent: session.playtest.gapPercent,
      frequencyPercent: session.playtest.frequencyPercent,
      visualVariant: obstacle.visualVariant,
      visualScale: obstacle.visualScale,
      visualOffset: obstacle.visualOffset,
      coinY: obstacle.coin ? round(obstacle.coin.y) : null,
      coinOffsetX: obstacle.coin ? round(obstacle.coin.offsetX) : null,
      coinPlacement: obstacle.coinPlacement || null,
      routeAdjusted: Boolean(obstacle.routeAdjusted),
      generationAttempts: obstacle.generationAttempts,
      fallbackUsed: Boolean(obstacle.fallbackUsed)
    });
  }

  function assignVisualStyle(session, obstacle) {
    let variant = Math.floor(session.visualRng() * CONFIG.obstacleVisualStyleCount);
    if (variant === session.lastVisualVariant) {
      variant = (variant + 1 + Math.floor(session.visualRng() * (CONFIG.obstacleVisualStyleCount - 1)))
        % CONFIG.obstacleVisualStyleCount;
    }
    obstacle.visualVariant = variant;
    obstacle.visualScale = round(0.94 + session.visualRng() * 0.12, 3);
    obstacle.visualOffset = Math.round((session.visualRng() - 0.5) * 14);
    session.lastVisualVariant = variant;
  }

  function placeGapCoin(session, previous, obstacle) {
    if (!previous) { obstacle.coinPlacement = "first-group"; return; }
    if (session.coinRng() >= CONFIG.gapCoinChance) { obstacle.coinPlacement = "chance-miss"; return; }
    const hasCoin = session.obstacles.some(item => item.coin && !item.coin.collected
      && core.coinPositionX(item) + CONFIG.coinDisplayRadius > 0);
    if (hasCoin) { obstacle.coinPlacement = "coin-present"; return; }

    const x = (previous.x + obstacle.x) / 2;
    const offsetX = x - obstacle.x;
    const minimumY = CONFIG.safeTop + CONFIG.balloonHeight / 2;
    const maximumY = CONFIG.safeBottom - CONFIG.balloonHeight / 2;
    const band = (maximumY - minimumY) * 0.18;
    const upperFirst = session.coinRng() < 0.5;
    const availableTime = (x - CONFIG.balloonX) / activeWorldSpeed(session) - CONFIG.transitionSeconds;
    for (const upper of [upperFirst, !upperFirst]) {
      const y = upper ? minimumY + band * session.coinRng() : maximumY - band * session.coinRng();
      const movementSpeed = y < session.balloon.y ? CONFIG.riseSpeed : CONFIG.fallSpeed;
      if (availableTime < 0 || Math.abs(y - session.balloon.y) / movementSpeed > availableTime) continue;
      const candidate = { ...obstacle, coin: { y, offsetX, radius: CONFIG.coinRadius, collected: false } };
      // Full horizontal/vertical envelopes cover all neighboring clouds, including their motion.
      if (session.obstacles.some(other => core.coinOverlapsCloudEnvelope(candidate, other))) continue;
      obstacle.coin = candidate.coin;
      obstacle.coinPlacement = upper ? "upper-gap" : "lower-gap";
      return;
    }
    obstacle.coinPlacement = "no-safe-position";
  }

  function spawnObstacle(session) {
    resetRouteStateForLevel(session);
    session.motionBudget += CONFIG.levels[session.level].movingChance;
    const obstacle = selectSafeObstacle(session);
    if (obstacle.moving) session.motionBudget = Math.max(0, session.motionBudget - 1);
    assignVisualStyle(session, obstacle);

    const previous = session.obstacles[session.obstacles.length - 1];
    obstacle.createdAt = session.elapsed;
    session.obstacles.push(obstacle);
    placeGapCoin(session, previous, obstacle);
    session.previousCenter = obstacle.baseCenter;
    session.consecutiveDoubles = obstacle.kind === "double" ? session.consecutiveDoubles + 1 : 0;
    session.consecutiveSameSide = obstacle.kind === "double" ? 0
      : obstacle.kind === session.lastObstacleKind ? session.consecutiveSameSide + 1 : 1;
    session.lastObstacleKind = obstacle.kind;
    session.nextObstacleIndex += 1;
    session.spawnIn = CONFIG.levels[session.level].interval * 100 / session.playtest.frequencyPercent;
    logObstacle(session, obstacle);
  }

  function recordScoreEvent(session, eventName, obstacle) {
    const oldScore = session.score;
    const oldLevel = session.level;
    session.score = applyScoreEvent(session.score, eventName);
    const generatedLevel = obstacle.generatedLevel;
    const stats = session.byLevel[generatedLevel];
    stats.score += session.score - oldScore;

    if (eventName === "pass") {
      stats.passes += 1;
      session.totals.passes += 1;
    } else if (eventName === "coin") {
      stats.coins += 1;
      session.totals.coins += 1;
    } else {
      stats.collisions += 1;
      session.totals.collisions += 1;
    }

    session.level = session.playtest.mode === "locked"
      ? session.playtest.lockedLevel
      : levelForScore(session.score);
    session.maxLevel = Math.max(session.maxLevel, session.level);
    session.events.push({
      type: eventName,
      at: round(session.elapsed),
      obstacleIndex: obstacle.index,
      generatedLevel,
      delta: session.score - oldScore,
      score: session.score,
      level: session.level
    });
    if (session.level !== oldLevel) {
      session.events.push({ type: "level", at: round(session.elapsed), from: oldLevel, to: session.level, score: session.score });
    }
  }

  function stepSession(session, deltaSeconds, holding) {
    if (session.status !== "running") return session;
    const delta = Math.min(deltaSeconds, session.remaining);
    session.holding = Boolean(holding);
    session.elapsed = Math.min(session.duration, session.elapsed + delta);
    session.remaining = Math.max(0, session.duration - session.elapsed);
    if (session.remaining < 1e-9) {
      session.elapsed = session.duration;
      session.remaining = 0;
    }
    session.collisionCooldown = Math.max(0, session.collisionCooldown - delta);
    session.balloon = updateBalloon(session.balloon, session.holding, delta);

    session.spawnIn -= delta;
    if (session.spawnIn <= 0) spawnObstacle(session);

    const collisionRect = core.balloonCollisionRect(session.balloon);
    const passLine = collisionRect.x;
    const frameSpeed = activeWorldSpeed(session);
    for (const obstacle of session.obstacles) {
      obstacle.x -= frameSpeed * delta;

      if (!obstacle.coin?.collected && collectsCoin(session.balloon, obstacle)) {
        obstacle.coin.collected = true;
        obstacle.coin.collectedAt = session.elapsed;
        obstacle.coin.collectedX = core.coinPositionX(obstacle);
        recordScoreEvent(session, "coin", obstacle);
      }

      if (!obstacle.collided && session.collisionCooldown <= 0 && collidesWithObstacle(session.balloon, obstacle, session.elapsed - obstacle.createdAt)) {
        obstacle.collided = true;
        session.collisionCooldown = CONFIG.collisionGraceSeconds;
        recordScoreEvent(session, "collision", obstacle);
      }

      if (!obstacle.passed && obstacle.x + obstacle.width / 2 < passLine) {
        obstacle.passed = true;
        if (!obstacle.collided) recordScoreEvent(session, "pass", obstacle);
      }
    }

    session.obstacles = session.obstacles.filter((obstacle) => obstacle.x + obstacle.width > -40);

    if (session.remaining <= 0) {
      session.status = "ended";
      session.holding = false;
      session.events.push({ type: "end", at: round(session.elapsed), score: session.score, maxLevel: session.maxLevel });
    }
    return session;
  }

  function advanceSession(session, deltaSeconds, holding) {
    if (session.status !== "running") return session;
    let remainingDelta = Math.max(0, Number(deltaSeconds) || 0);
    while (remainingDelta > 0 && session.status === "running") {
      const step = Math.min(remainingDelta, 0.05);
      stepSession(session, step, holding);
      remainingDelta -= step;
    }
    return session;
  }

  function exportSession(session) {
    return {
      schemaVersion: "cloud-journey-session-v1",
      seed: session.seed,
      duration: session.duration,
      elapsed: round(session.elapsed),
      score: session.score,
      maxLevel: session.maxLevel,
      playtest: { ...session.playtest },
      worldSpeed: activeWorldSpeed(session),
      totals: { ...session.totals },
      byLevel: JSON.parse(JSON.stringify(session.byLevel)),
      generationLog: session.generationLog.map((entry) => ({ ...entry })),
      events: session.events.map((entry) => ({ ...entry }))
    };
  }

  return Object.freeze({
    createSession,
    activeWorldSpeed,
    placeGapCoin,
    advanceSession,
    exportSession,
    setPlaytestSettings,
    normalizePlaytestSettings,
    DEFAULT_PLAYTEST_SETTINGS,
    selectSafeObstacle,
    isObstacleReachable
  });
});
