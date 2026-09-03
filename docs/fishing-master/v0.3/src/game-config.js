const freezeWeights = (big, medium, small, shark) => Object.freeze({ big, medium, small, shark });
const freezeLevel = (spawnIntervalSeconds, shallowMidWeights, deepWeights, upgradeScore) => Object.freeze({
  spawnIntervalSeconds: Object.freeze(spawnIntervalSeconds),
  shallowMidWeights,
  deepWeights,
  upgradeScore,
});

export const GAME_CONFIG = Object.freeze({
  durationSeconds: 120,
  worldWidth: 1280,
  worldHeight: 728,
  initialSpawnDelaySeconds: Object.freeze([0.25, 0.8]),
  exitPadding: 80,
  sharkPresence: Object.freeze({
    minimumLevel: 2,
    minimumVisible: 1,
    maximumConcurrent: 2,
  }),
  fishSpeedTuning: Object.freeze({
    minimum: 0.7,
    maximum: 1.4,
    step: 0.05,
    default: 1,
  }),
});

export const LANES = Object.freeze([
  Object.freeze({ id: 'top', yRatios: Object.freeze([0.40, 0.43, 0.46]), allowsShark: true }),
  Object.freeze({ id: 'middle', yRatios: Object.freeze([0.53, 0.57, 0.61]), allowsShark: true }),
  Object.freeze({ id: 'bottom', yRatios: Object.freeze([0.70, 0.75, 0.80]), allowsShark: false }),
]);

export const FISH_TYPES = Object.freeze({
  big: Object.freeze({
    id: 'big', kind: 'fish', score: 10, relativeSize: 100,
    crossingSeconds: 6.8, visualWidth: 109, collisionWidth: 90, collisionHeight: 56,
  }),
  medium: Object.freeze({
    id: 'medium', kind: 'fish', score: 20, relativeSize: 80,
    crossingSeconds: 5.3, visualWidth: 87, collisionWidth: 72, collisionHeight: 46,
  }),
  small: Object.freeze({
    id: 'small', kind: 'fish', score: 30, relativeSize: 64,
    crossingSeconds: 4.1, visualWidth: 70, collisionWidth: 58, collisionHeight: 37,
  }),
  shark: Object.freeze({
    id: 'shark', kind: 'shark', score: 0, relativeSize: 150,
    crossingSeconds: 6.5, visualWidth: 224, collisionWidth: 185, collisionHeight: 96,
  }),
});

export const LEVEL_CONFIG = Object.freeze({
  1: freezeLevel([3.0, 3.6], freezeWeights(65, 35, 0, 0), freezeWeights(65, 35, 0, 0), 50),
  2: freezeLevel([2.8, 3.4], freezeWeights(52, 30, 13, 5), freezeWeights(55, 32, 13, 0), 70),
  3: freezeLevel([2.6, 3.2], freezeWeights(43, 31, 18, 8), freezeWeights(47, 33, 20, 0), 90),
  4: freezeLevel([2.4, 3.0], freezeWeights(35, 31, 23, 11), freezeWeights(39, 34, 27, 0), 110),
  5: freezeLevel([2.2, 2.8], freezeWeights(28, 30, 28, 14), freezeWeights(32, 34, 34, 0), 130),
  6: freezeLevel([2.0, 2.6], freezeWeights(22, 28, 34, 16), freezeWeights(26, 32, 42, 0), null),
});

export const HOOK_CONFIG = Object.freeze({
  surfaceY: 220,
  bottomY: 680,
  downSeconds: 0.9,
  emptyRetractSeconds: 0.65,
  catchRetractSeconds: 0.8,
  sharkRecoverySeconds: 1.5,
  fishCollisionWidth: 36,
  collisionWidth: 72,
  collisionHeight: 52,
});
