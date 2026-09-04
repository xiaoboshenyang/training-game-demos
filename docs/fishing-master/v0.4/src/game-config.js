const freezeWeights = (
  big,
  medium,
  small,
  shark,
  turtle = 0,
  starfish = 0,
  seahorse = 0,
) => Object.freeze({ big, medium, small, shark, turtle, starfish, seahorse });
const freezeLevel = (spawnIntervalSeconds, topWeights, middleWeights, deepWeights, upgradeScore) => Object.freeze({
  spawnIntervalSeconds: Object.freeze(spawnIntervalSeconds),
  shallowMidWeights: topWeights,
  middleWeights,
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
  specialPresence: Object.freeze({
    maximumConcurrent: 2,
    maximumPerType: 1,
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
    crossingSeconds: 4.8, visualWidth: 70, collisionWidth: 58, collisionHeight: 37,
  }),
  shark: Object.freeze({
    id: 'shark', kind: 'shark', score: 0, relativeSize: 150,
    crossingSeconds: 6.5, visualWidth: 224, collisionWidth: 185, collisionHeight: 96,
  }),
  turtle: Object.freeze({
    id: 'turtle', kind: 'fish', special: true, score: 20, relativeSize: 90,
    crossingSeconds: 7.5, visualWidth: 130, collisionWidth: 100, collisionHeight: 60,
    minimumLevel: 1, allowedLanes: Object.freeze(['middle']),
  }),
  starfish: Object.freeze({
    id: 'starfish', kind: 'fish', special: true, score: 40, relativeSize: 58,
    crossingSeconds: 8.0, visualWidth: 72, collisionWidth: 48, collisionHeight: 48,
    minimumLevel: 2, allowedLanes: Object.freeze(['bottom']),
  }),
  seahorse: Object.freeze({
    id: 'seahorse', kind: 'fish', special: true, score: 50, relativeSize: 54,
    crossingSeconds: 4.5, visualWidth: 60, collisionWidth: 38, collisionHeight: 64,
    minimumLevel: 3, allowedLanes: Object.freeze(['middle']),
  }),
});

export const LEVEL_CONFIG = Object.freeze({
  1: freezeLevel([3.0, 3.6], freezeWeights(65, 35, 0, 0), freezeWeights(52, 28, 0, 0, 20), freezeWeights(65, 35, 0, 0), 50),
  2: freezeLevel([2.8, 3.4], freezeWeights(52, 30, 13, 5), freezeWeights(41, 24, 10, 5, 20), freezeWeights(45, 26, 11, 0, 0, 18), 70),
  3: freezeLevel([2.6, 3.2], freezeWeights(43, 31, 18, 8), freezeWeights(30, 22, 12, 8, 16, 0, 12), freezeWeights(38, 26, 16, 0, 0, 20), 90),
  4: freezeLevel([2.4, 3.0], freezeWeights(35, 31, 23, 11), freezeWeights(23, 20, 16, 11, 16, 0, 14), freezeWeights(30, 27, 21, 0, 0, 22), 110),
  5: freezeLevel([2.2, 2.8], freezeWeights(28, 30, 28, 14), freezeWeights(18, 19, 17, 14, 16, 0, 16), freezeWeights(24, 26, 26, 0, 0, 24), 130),
  6: freezeLevel([2.0, 2.6], freezeWeights(22, 28, 34, 16), freezeWeights(13, 17, 20, 16, 16, 0, 18), freezeWeights(19, 24, 31, 0, 0, 26), null),
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
