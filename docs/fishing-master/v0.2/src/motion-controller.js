export const ACTOR_MOTION = Object.freeze({
  castMs: 900,
  castBackswingMs: 250,
  castForwardMs: 250,
  castFlightMs: 500,
  castLineSettleMs: 150,
  celebrateMs: 800,
  celebrateFrameMs: 200,
  blinkMs: 140,
  blinkMinMs: 3000,
  blinkMaxMs: 6000,
});

const TAIL_FRAME_PATTERN = Object.freeze([0, 1, 2, 1]);

export function createActorMotion(now = 0, { initialCast = false } = {}) {
  return {
    pose: initialCast ? 'cast' : 'idle',
    stageStartedAt: now,
    stageEndsAt: initialCast ? now + ACTOR_MOTION.castMs : now,
    inputLocked: initialCast,
  };
}

export function queueOutcomeMotion(_current, outcome, now) {
  if (outcome === 'fish') {
    return {
      pose: 'celebrate',
      stageStartedAt: now,
      stageEndsAt: now + ACTOR_MOTION.celebrateMs,
      inputLocked: true,
    };
  }
  return {
    pose: 'cast',
    stageStartedAt: now,
    stageEndsAt: now + ACTOR_MOTION.castMs,
    inputLocked: true,
  };
}

export function advanceActorMotion(current, now) {
  let next = { ...current };
  while (next.inputLocked && now >= next.stageEndsAt) {
    if (next.pose === 'celebrate') {
      next = {
        pose: 'cast',
        stageStartedAt: next.stageEndsAt,
        stageEndsAt: next.stageEndsAt + ACTOR_MOTION.castMs,
        inputLocked: true,
      };
      continue;
    }
    next = { pose: 'idle', stageStartedAt: now, stageEndsAt: now, inputLocked: false };
  }
  return next;
}

export function getActorMotionProgress(motion, now) {
  if (!motion.inputLocked || motion.stageEndsAt <= motion.stageStartedAt) return 1;
  return Math.min(1, Math.max(0, (now - motion.stageStartedAt) / (motion.stageEndsAt - motion.stageStartedAt)));
}

export function getRenderedActorFrame(hook, motion, now) {
  if (hook.state === 'retract' || hook.state === 'recovery') {
    const progress = hook.duration > 0 ? Math.min(1, Math.max(0, hook.elapsed / hook.duration)) : 1;
    if (progress < 0.3) return 1;
    if (progress < 0.72) return 2;
    return 3;
  }
  if (hook.state === 'down') return 0;
  if (motion.pose === 'celebrate') {
    const index = Math.floor(Math.max(0, now - motion.stageStartedAt) / ACTOR_MOTION.celebrateFrameMs) % 2;
    return index === 0 ? 4 : 5;
  }
  if (motion.pose === 'cast') {
    const elapsed = Math.max(0, now - motion.stageStartedAt);
    if (elapsed < ACTOR_MOTION.castBackswingMs) return 6;
    if (elapsed < ACTOR_MOTION.castBackswingMs + ACTOR_MOTION.castForwardMs) return 7;
    return 8;
  }
  return 0;
}

export function getCastHookPoint(progress, releasePoint, landingPoint) {
  const castProgress = Math.min(1, Math.max(0, progress));
  const elapsed = castProgress * ACTOR_MOTION.castMs;
  const flightElapsed = elapsed - ACTOR_MOTION.castBackswingMs;
  if (flightElapsed < 0) {
    return {
      visible: false,
      phase: 'charging',
      flightProgress: 0,
      settleProgress: 0,
      x: releasePoint.x,
      y: releasePoint.y,
      rotation: 0,
    };
  }

  if (flightElapsed < ACTOR_MOTION.castFlightMs) {
    const flightProgress = flightElapsed / ACTOR_MOTION.castFlightMs;
    const horizontalProgress = 1 - ((1 - flightProgress) ** 1.15);
    const gravity = 400;
    const verticalDistance = landingPoint.y - releasePoint.y;
    const rotation = -14 * (1 - flightProgress) + 18 * Math.sin(Math.PI * flightProgress);
    return {
      visible: true,
      phase: 'flight',
      flightProgress,
      settleProgress: 0,
      x: releasePoint.x + (landingPoint.x - releasePoint.x) * horizontalProgress,
      y: releasePoint.y + (verticalDistance - gravity) * flightProgress
        + gravity * flightProgress * flightProgress,
      rotation,
    };
  }

  const settleProgress = Math.min(
    1,
    (flightElapsed - ACTOR_MOTION.castFlightMs) / ACTOR_MOTION.castLineSettleMs,
  );
  return {
    visible: true,
    phase: settleProgress < 1 ? 'settling' : 'settled',
    flightProgress: 1,
    settleProgress,
    x: landingPoint.x,
    y: landingPoint.y,
    rotation: settleProgress >= 1 ? 0 : -4 * (1 - settleProgress),
  };
}

function clampUnit(value) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(value) {
  const clamped = clampUnit(value);
  return clamped * clamped * (3 - 2 * clamped);
}

export function getCastLineOrigin(progress, forwardTip, settledTip) {
  const castProgress = clampUnit(progress);
  const switchAt = ACTOR_MOTION.castBackswingMs + ACTOR_MOTION.castForwardMs;
  const transitionMs = 120;
  const transitionStart = (switchAt - transitionMs / 2) / ACTOR_MOTION.castMs;
  const transitionEnd = (switchAt + transitionMs / 2) / ACTOR_MOTION.castMs;
  const originProgress = smoothstep(
    (castProgress - transitionStart) / (transitionEnd - transitionStart),
  );
  return {
    x: forwardTip.x + (settledTip.x - forwardTip.x) * originProgress,
    y: forwardTip.y + (settledTip.y - forwardTip.y) * originProgress,
  };
}

function rounded(value) {
  return Math.round(value * 10) / 10;
}

export function getFlexibleLinePath(start, end, motion = {}) {
  if (motion.phase !== 'flight' && motion.phase !== 'settling') {
    return `M ${rounded(start.x)} ${rounded(start.y)} L ${rounded(end.x)} ${rounded(end.y)}`;
  }

  const flightProgress = clampUnit(motion.flightProgress ?? 1);
  const settleProgress = clampUnit(motion.settleProgress ?? 0);
  const relaxation = motion.phase === 'settling' ? 1 - smoothstep(settleProgress) : 1;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const sag = (18 + 34 * Math.sin(Math.PI * flightProgress)) * relaxation;
  const lag = (8 + 24 * (1 - flightProgress)) * relaxation;
  const control1 = {
    x: start.x + dx * .28 - lag * .25,
    y: start.y + dy * .18 + sag * .35,
  };
  const control2 = {
    x: end.x - dx * .32 - lag,
    y: end.y - dy * .14 + sag,
  };
  return `M ${rounded(start.x)} ${rounded(start.y)} C ${rounded(control1.x)} ${rounded(control1.y)} ${rounded(control2.x)} ${rounded(control2.y)} ${rounded(end.x)} ${rounded(end.y)}`;
}

function hashText(value) {
  return [...String(value)].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 0);
}

export function createFishMotion(entityId, now = 0, random = Math.random) {
  const phaseOffsetMs = hashText(entityId) % 800;
  return {
    phaseOffsetMs,
    blinkUntil: 0,
    nextBlinkAt: now + ACTOR_MOTION.blinkMinMs
      + random() * (ACTOR_MOTION.blinkMaxMs - ACTOR_MOTION.blinkMinMs),
  };
}

export function advanceFishMotion(current, now, frameDurationMs, random = Math.random) {
  if (now < current.blinkUntil) return { state: current, frame: 3 };

  if (now >= current.nextBlinkAt) {
    const state = {
      ...current,
      blinkUntil: now + ACTOR_MOTION.blinkMs,
      nextBlinkAt: now + ACTOR_MOTION.blinkMs + ACTOR_MOTION.blinkMinMs
        + random() * (ACTOR_MOTION.blinkMaxMs - ACTOR_MOTION.blinkMinMs),
    };
    return { state, frame: 3 };
  }

  const frameIndex = Math.floor((now + current.phaseOffsetMs) / frameDurationMs)
    % TAIL_FRAME_PATTERN.length;
  return { state: current, frame: TAIL_FRAME_PATTERN[frameIndex] };
}
