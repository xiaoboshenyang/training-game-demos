(function attachCloudJourneyCore(root, factory) {
  const masks = typeof module === "object" && module.exports ? require("./cloud-masks.js") : root.CloudJourneyMasks;
  const api = factory(masks);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.CloudJourneyCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createCloudJourneyCore(masks) {
  "use strict";

  const HEIGHT = 728;
  const WIDTH = 1280;

  const CONFIG = Object.freeze({
    width: WIDTH,
    height: HEIGHT,
    durationSeconds: 120,
    worldSpeed: 160,
    balloonX: Math.round(WIDTH * 0.24),
    balloonStartY: HEIGHT * 0.55,
    balloonWidth: 150,
    balloonHeight: 188,
    balloonCollisionWidth: 88,
    balloonCollisionHeight: 128,
    riseSpeed: HEIGHT * 0.3,
    fallSpeed: HEIGHT * 0.22,
    transitionSeconds: 0.15,
    safeTop: HEIGHT * 0.1,
    safeBottom: HEIGHT * 0.9,
    collisionGraceSeconds: 0.8,
    obstacleWidth: 208,
    obstacleCollisionWidth: 116,
    obstacleCollisionInset: 14,
    obstacleVisualMaxWidth: 221,
    obstacleVisualStyleCount: 3,
    coinRadius: 58,
    gapCoinChance: 0.45,
    coinDisplayRadius: 46,
    coinCollectRadius: 50,
    coinTurnSeconds: 3,
    coinPickupSeconds: 0.2,
    coinObstacleClearance: 24,
    levels: Object.freeze({
      1: Object.freeze({ gap: 400, worldSpeed: 160, interval: 4, kinds: [0.5, 0.5, 0], singleDepth: Object.freeze([240, 320]), movingChance: 0, maxMoving: 0, coinInterval: 4, maxCenterDelta: HEIGHT * 0.15 }),
      2: Object.freeze({ gap: 350, worldSpeed: 175, interval: 3.2, kinds: [0.3, 0.3, 0.4], singleDepth: Object.freeze([280, 370]), movingChance: 0, maxMoving: 0, coinInterval: 3, maxCenterDelta: HEIGHT * 0.25 }),
      3: Object.freeze({ gap: 320, worldSpeed: 190, interval: 2.7, kinds: [0.25, 0.25, 0.5], singleDepth: Object.freeze([290, 380]), movingChance: 0, maxMoving: 0, coinInterval: 3, maxCenterDelta: HEIGHT * 0.3 }),
      4: Object.freeze({ gap: 280, worldSpeed: 210, interval: 2.35, kinds: [0.15, 0.15, 0.7], singleDepth: Object.freeze([290, 380]), movingChance: 0.35, maxMoving: 2, moveAmplitude: 20, movePeriod: 5, coinInterval: 2, maxCenterDelta: HEIGHT * 0.35 }),
      5: Object.freeze({ gap: 250, worldSpeed: 230, interval: 2.2, kinds: [0.125, 0.125, 0.75], singleDepth: Object.freeze([300, 390]), movingChance: 0.5, maxMoving: 3, moveAmplitude: 30, movePeriod: 4, coinInterval: 2, maxCenterDelta: HEIGHT * 0.375 }),
      6: Object.freeze({ gap: 220, worldSpeed: 250, interval: 2.1, kinds: [0.1, 0.1, 0.8], singleDepth: Object.freeze([310, 400]), movingChance: 0.65, maxMoving: 3, moveAmplitude: 50, movePeriod: 3, coinInterval: 2, maxCenterDelta: HEIGHT * 0.4 })
    })
  });

  function normalizeSeed(value) {
    const text = String(value ?? "").trim();
    if (!text) return 1;
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0 || 1;
  }

  function createRng(seedValue) {
    let state = normalizeSeed(seedValue);
    return function seededRandom() {
      state |= 0;
      state = (state + 0x6d2b79f5) | 0;
      let value = Math.imul(state ^ (state >>> 15), 1 | state);
      value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function levelForScore(score) {
    const safeScore = Math.max(0, Number(score) || 0);
    if (safeScore >= 350) return 6;
    if (safeScore >= 260) return 5;
    if (safeScore >= 180) return 4;
    if (safeScore >= 110) return 3;
    if (safeScore >= 50) return 2;
    return 1;
  }

  function applyScoreEvent(score, eventName) {
    const changes = { pass: 10, coin: 30, collision: -30 };
    if (!(eventName in changes)) throw new Error(`Unknown score event: ${eventName}`);
    return Math.max(0, score + changes[eventName]);
  }

  function approach(current, target, maximumChange) {
    if (current < target) return Math.min(target, current + maximumChange);
    return Math.max(target, current - maximumChange);
  }

  function updateBalloon(balloon, isHolding, deltaSeconds) {
    const delta = clamp(Number(deltaSeconds) || 0, 0, 0.1);
    const targetVelocity = isHolding ? -CONFIG.riseSpeed : CONFIG.fallSpeed;
    const maximumChange = Math.max(CONFIG.riseSpeed, CONFIG.fallSpeed) * delta / CONFIG.transitionSeconds;
    const velocity = approach(balloon.velocity, targetVelocity, maximumChange);
    const visualHalfHeight = CONFIG.balloonHeight / 2;
    const minimumY = CONFIG.safeTop + visualHalfHeight;
    const maximumY = CONFIG.safeBottom - visualHalfHeight;
    const unclampedY = balloon.y + velocity * delta;
    const y = clamp(unclampedY, minimumY, maximumY);
    return {
      y,
      velocity: y === unclampedY ? velocity : 0
    };
  }

  function pickKind(rng, weights) {
    const roll = rng();
    if (roll < weights[0]) return "top";
    if (roll < weights[0] + weights[1]) return "bottom";
    return "double";
  }

  function createCoinSchedule(level = 1) {
    const safeLevel = clamp(Math.round(level), 1, 6);
    return { level: safeLevel, remaining: 2, pending: false };
  }

  function decideCoinForObstacle(schedule, level, moving, coinVisible = false) {
    const safeLevel = clamp(Math.round(level), 1, 6);
    const current = schedule && schedule.level === safeLevel
      ? { ...schedule }
      : createCoinSchedule(safeLevel);

    if (!current.pending) current.remaining = Math.max(0, current.remaining - 1);
    const due = current.pending || current.remaining === 0;
    const spawnCoin = due && !moving && !coinVisible;

    if (spawnCoin) {
      current.remaining = CONFIG.levels[safeLevel].coinInterval;
      current.pending = false;
    } else if (due) {
      current.remaining = 0;
      current.pending = true;
    }

    return { spawnCoin, schedule: current };
  }

  function createObstacle({ level, rng, previousCenter, index = 0 }) {
    const safeLevel = clamp(Math.round(level), 1, 6);
    const levelConfig = CONFIG.levels[safeLevel];
    const gap = levelConfig.gap;
    const absoluteMinimum = CONFIG.safeTop + gap / 2;
    const absoluteMaximum = CONFIG.safeBottom - gap / 2;
    const previous = clamp(Number(previousCenter) || CONFIG.balloonStartY, absoluteMinimum, absoluteMaximum);
    const minimum = Math.max(absoluteMinimum, previous - levelConfig.maxCenterDelta);
    const maximum = Math.min(absoluteMaximum, previous + levelConfig.maxCenterDelta);
    const baseCenter = minimum + (maximum - minimum) * rng();
    const kind = pickKind(rng, levelConfig.kinds);
    const moving = safeLevel >= 4 && rng() < levelConfig.movingChance;
    return {
      id: `obstacle-${index}`,
      index,
      generatedLevel: safeLevel,
      kind,
      gap,
      baseCenter,
      x: CONFIG.width + CONFIG.obstacleWidth,
      width: CONFIG.obstacleWidth,
      moving,
      moveAmplitude: moving ? levelConfig.moveAmplitude : 0,
      movePeriod: moving ? levelConfig.movePeriod : 0,
      phase: moving ? rng() * Math.PI * 2 : 0,
      coin: null,
      collided: false,
      passed: false,
      createdAt: 0
    };
  }

  function obstacleCenterAt(obstacle, elapsedSeconds) {
    if (!obstacle.moving) return obstacle.baseCenter;
    const radians = obstacle.phase + elapsedSeconds / obstacle.movePeriod * Math.PI * 2;
    return obstacle.baseCenter + Math.sin(radians) * obstacle.moveAmplitude;
  }

  function obstaclePassageAt(obstacle, elapsedSeconds) {
    const center = obstacleCenterAt(obstacle, elapsedSeconds);
    const offset = center - obstacle.baseCenter;
    const level = CONFIG.levels[obstacle.generatedLevel];
    if (level?.singleDepth && obstacle.kind !== "double") {
      const [minimum, maximum] = level.singleDepth;
      const routeFraction = clamp(
        (obstacle.baseCenter - CONFIG.safeTop - obstacle.gap / 2)
          / Math.max(1, CONFIG.safeBottom - CONFIG.safeTop - obstacle.gap), 0, 1);
      const fraction = obstacle.kind === "top" ? routeFraction : 1 - routeFraction;
      // Depth changes the position of the whole cloud, never its size.
      // The gap slider still opens/closes the single-sided passage around 100%.
      const depth = clamp(minimum + (maximum - minimum) * fraction
        - (obstacle.gap - level.gap) / 2, 120, 440);
      return {
        center,
        gapTop: obstacle.kind === "top" ? depth + offset : CONFIG.safeTop,
        gapBottom: obstacle.kind === "bottom" ? CONFIG.height - depth + offset : CONFIG.safeBottom
      };
    }
    if (obstacle.kind === "top") {
      return {
        center,
        gapTop: Math.min(obstacle.baseCenter - obstacle.gap / 2, CONFIG.safeBottom - obstacle.gap) + offset,
        gapBottom: CONFIG.safeBottom
      };
    }
    if (obstacle.kind === "bottom") {
      return {
        center,
        gapTop: CONFIG.safeTop,
        gapBottom: Math.max(obstacle.baseCenter + obstacle.gap / 2, CONFIG.safeTop + obstacle.gap) + offset
      };
    }
    return {
      center,
      gapTop: center - obstacle.gap / 2,
      gapBottom: center + obstacle.gap / 2
    };
  }

  function rectanglesOverlap(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  }

  function balloonCollisionRect(balloon) {
    const width = CONFIG.balloonCollisionWidth;
    const height = CONFIG.balloonCollisionHeight;
    return { x: CONFIG.balloonX - width / 2, y: balloon.y - height / 2, width, height };
  }

  const CLOUD_STYLES = Object.freeze([
    Object.freeze({ top: "obstacleRoundTop", bottom: "obstacleRoundBottom", width: 208, height: 520 }),
    Object.freeze({ top: "obstacleDiagonalTop", bottom: "obstacleDiagonalBottom", width: 208, height: 520 }),
    Object.freeze({ top: "obstacleDoubleTop", bottom: "obstacleDoubleBottom", width: 208, height: 520 })
  ]);

  function cloudStyleForObstacle(index, side = "top", visualVariant) {
    const requested = Number.isFinite(Number(visualVariant)) ? Number(visualVariant) : Number(index) || 0;
    const styleIndex = (Math.abs(Math.trunc(requested)) + (side === "bottom" ? 1 : 0)) % CLOUD_STYLES.length;
    const style = CLOUD_STYLES[styleIndex];
    return { ...style, index: styleIndex, spriteKey: style[side] };
  }

  // Same plan for drawing and collision. One cloud, one source, one rigid translation.
  function obstacleSpriteDrawPlan(obstacle, side = "top", elapsed = 0) {
    const style = cloudStyleForObstacle(obstacle.index, side, obstacle.visualVariant);
    const width = style.width * clamp(Number(obstacle.visualScale) || 1, .94, 1.06);
    const height = style.height;
    const xOffset = clamp(Number(obstacle.visualOffset) || 0, -7, 7);
    const passage = obstaclePassageAt(obstacle, elapsed);
    const boundary = side === "top" ? passage.gapTop : passage.gapBottom;
    return {
      style, spriteKey: style.spriteKey, source: masks[style.spriteKey].source,
      tiles: 1, flipX: false, flipY: false, corridorBoundaryY: boundary,
      destination: { x: -width / 2 + xOffset, y: side === "top" ? boundary - height : boundary, width, height }
    };
  }

  function collidesWithObstacle(balloon, obstacle, elapsedSeconds) {
    const balloonRect = balloonCollisionRect(balloon);
    if (Math.abs(CONFIG.balloonX - obstacle.x) > CONFIG.obstacleVisualMaxWidth / 2 + 7 + balloonRect.width / 2) return false;
    for (const side of obstacle.kind === "double" ? ["top", "bottom"] : [obstacle.kind]) {
      const plan = obstacleSpriteDrawPlan(obstacle, side, elapsedSeconds);
      const d = plan.destination;
      const cloudRect = { ...d, x: obstacle.x + d.x };
      if (!rectanglesOverlap(balloonRect, cloudRect)) continue;
      const mask = masks[plan.spriteKey];
      const cellWidth = d.width / mask.columns;
      const cellHeight = d.height / mask.rows;
      for (const [row, col, count] of mask.runs) {
        const solid = { x: cloudRect.x + col * cellWidth, y: d.y + row * cellHeight,
          width: count * cellWidth, height: cellHeight };
        if (rectanglesOverlap(balloonRect, solid)) return true;
      }
    }
    return false;
  }

  // Conservative full-motion envelope, including the coin's visible pulse.
  function coinOverlapsCloudEnvelope(owner, other) {
    if (!owner.coin) return false;
    const radius = owner.coin.radius * 1.04 + CONFIG.coinObstacleClearance;
    if (Math.abs(coinPositionX(owner) - other.x) >= CONFIG.obstacleVisualMaxWidth / 2 + 7 + radius) return false;
    const passage = obstaclePassageAt({ ...other, moving: false }, 0);
    const amplitude = other.moving ? other.moveAmplitude : 0;
    return ((other.kind === "top" || other.kind === "double") && owner.coin.y - radius < passage.gapTop + amplitude)
      || ((other.kind === "bottom" || other.kind === "double") && owner.coin.y + radius > passage.gapBottom - amplitude);
  }

  function coinCenterRange(obstacle, elapsedSeconds = 0) {
    const { gapTop, gapBottom } = obstaclePassageAt(obstacle, elapsedSeconds);
    const margin = CONFIG.coinRadius * 1.04 + CONFIG.coinObstacleClearance;
    const minimum = Math.max(CONFIG.safeTop + CONFIG.coinRadius, gapTop + margin);
    const maximum = Math.min(CONFIG.safeBottom - CONFIG.coinRadius, gapBottom - margin);
    return minimum <= maximum ? { minimum, maximum } : null;
  }

  function coinPositionX(obstacle) {
    return obstacle.x + (obstacle.coin?.offsetX || 0);
  }

  function collectsCoin(balloon, obstacle) {
    if (!obstacle.coin || obstacle.coin.collected) return false;
    const dx = CONFIG.balloonX - coinPositionX(obstacle);
    const dy = balloon.y - obstacle.coin.y;
    const balloonRadius = Math.min(CONFIG.balloonWidth * 0.35, CONFIG.balloonHeight * 0.4);
    return Math.hypot(dx, dy) <= CONFIG.coinCollectRadius + balloonRadius;
  }

  return Object.freeze({
    CONFIG,
    CLOUD_STYLES,
    cloudStyleForObstacle,
    obstacleSpriteDrawPlan,
    coinOverlapsCloudEnvelope,
    normalizeSeed,
    createRng,
    clamp,
    levelForScore,
    applyScoreEvent,
    updateBalloon,
    createCoinSchedule,
    decideCoinForObstacle,
    createObstacle,
    obstacleCenterAt,
    obstaclePassageAt,
    balloonCollisionRect,
    collidesWithObstacle,
    coinCenterRange,
    coinPositionX,
    collectsCoin,
    rectanglesOverlap
  });
});
