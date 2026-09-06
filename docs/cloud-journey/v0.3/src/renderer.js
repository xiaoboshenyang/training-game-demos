(function attachCloudJourneyRenderer(root, factory) {
  const core = typeof module === "object" && module.exports
    ? require("./game-core.js")
    : root.CloudJourneyCore;
  const api = factory(core);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.CloudJourneyRenderer = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createCloudJourneyRenderer(core) {
  "use strict";

  if (!core) throw new Error("CloudJourneyCore must be loaded before renderer.js");
  const { CONFIG, obstaclePassageAt, CLOUD_STYLES, cloudStyleForObstacle, obstacleSpriteDrawPlan } = core;
  const ASSET_PATHS = Object.freeze({
    background: "assets/background.png",
    obstacleRoundTop: "assets/obstacleRoundTop.png",
    obstacleRoundBottom: "assets/obstacleRoundBottom.png",
    obstacleDiagonalTop: "assets/obstacleDiagonalTop.png",
    obstacleDiagonalBottom: "assets/obstacleDiagonalBottom.png",
    obstacleDoubleTop: "assets/obstacleDoubleTop.png",
    obstacleDoubleBottom: "assets/obstacleDoubleBottom.png",
    balloon: "assets/balloon.png",
    flame: "assets/flame.png",
    coin: "assets/coin.png"
  });

  const LAYER_ORDER = Object.freeze(["background", "coins", "obstacles", "flame", "balloon", "vignette"]);
  const FLAME_LAYOUT = Object.freeze({
    width: 17,
    minHeight: 24,
    maxHeight: 28,
    burnerBaseY: 61,
    anchor: "bottom-center",
    direction: "up",
    sourceCrop: Object.freeze({ x: 90, y: 24, width: 76, height: 208 })
  });
  const OBSTACLE_LAYOUT = Object.freeze({
    usesWholeSprite: true,
    tilesPerSide: 1,
    fixedSize: true,
    styleCount: CLOUD_STYLES.length,
    collisionWidth: CONFIG.obstacleWidth,
    minimumVisualWidthScale: 1,
    corridorEdgeIsNatural: true,
    corridorAlphaInsetRatio: 0
  });

  function flameDrawPlan(elapsed) {
    const wave = (Math.sin(elapsed * 25) + 1) / 2;
    const height = FLAME_LAYOUT.minHeight + wave * (FLAME_LAYOUT.maxHeight - FLAME_LAYOUT.minHeight);
    return {
      source: { ...FLAME_LAYOUT.sourceCrop },
      destination: {
        x: -FLAME_LAYOUT.width / 2,
        y: FLAME_LAYOUT.burnerBaseY - height,
        width: FLAME_LAYOUT.width,
        height
      }
    };
  }

  function loadImage(source) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = source;
    });
  }

  function drawCover(context, image, width, height) {
    if (!image) {
      const gradient = context.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, "#56bcd8");
      gradient.addColorStop(1, "#f2cf84");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);
      return;
    }
    const scale = Math.max(width / image.width, height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
  }

  function drawFallbackCloud(context, x, plan) {
    const destination = plan.destination;
    const radius = Math.min(destination.width * 0.26, destination.height * 0.3);
    context.fillStyle = "#8794b6";
    context.beginPath();
    const centerY = destination.y + destination.height / 2;
    context.arc(x - radius * 0.8, centerY, radius, 0, Math.PI * 2);
    context.arc(x + radius * 0.15, centerY - radius * 0.25, radius * 1.15, 0, Math.PI * 2);
    context.arc(x + radius, centerY + radius * 0.08, radius * 0.82, 0, Math.PI * 2);
    context.fill();
  }

  function drawObstacleCloud(context, assets, x, obstacle, side, elapsed) {
    const plan = obstacleSpriteDrawPlan(obstacle, side, elapsed);
    const image = assets[plan.spriteKey];
    const destination = plan.destination;
    context.save();
    context.translate(x, 0);
    if (plan.flipX || plan.flipY) {
      context.translate(
        plan.flipX ? destination.x * 2 + destination.width : 0,
        plan.flipY ? destination.y * 2 + destination.height : 0
      );
      context.scale(plan.flipX ? -1 : 1, plan.flipY ? -1 : 1);
    }
    if (image) {
      const source = plan.source;
      context.drawImage(image, source.x, source.y, source.width, source.height, destination.x, destination.y, destination.width, destination.height);
    } else {
      context.setTransform(1, 0, 0, 1, 0, 0);
      drawFallbackCloud(context, x, plan);
    }
    context.restore();
  }

  function createRenderer(canvas) {
    const context = canvas.getContext("2d", { alpha: false });
    const assets = {};

    async function load() {
      const entries = await Promise.all(Object.entries(ASSET_PATHS).map(async ([name, path]) => [name, await loadImage(path)]));
      for (const [name, image] of entries) assets[name] = image;
      return Object.entries(assets).filter(([, image]) => !image).map(([name]) => name);
    }

    function drawBackground() {
      drawCover(context, assets.background, CONFIG.width, CONFIG.height);
    }

    function drawCoin(obstacle, elapsed) {
      if (!obstacle.coin || obstacle.coin.collected) return;
      const size = obstacle.coin.radius * 2;
      context.save();
      context.translate(obstacle.x, obstacle.coin.y);
      const pulse = 1 + Math.sin(elapsed * 4 + obstacle.index) * 0.04;
      context.scale(pulse, pulse);
      context.shadowColor = "rgba(96,57,13,.55)";
      context.shadowBlur = 18;
      if (assets.coin) context.drawImage(assets.coin, -size / 2, -size / 2, size, size);
      else {
        context.fillStyle = "#e7a92b";
        context.beginPath();
        context.arc(0, 0, size / 2, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    }

    function drawObstacle(obstacle, elapsed) {
      if (obstacle.kind === "top" || obstacle.kind === "double") {
        drawObstacleCloud(context, assets, obstacle.x, obstacle, "top", elapsed - obstacle.createdAt);
      }
      if (obstacle.kind === "bottom" || obstacle.kind === "double") {
        drawObstacleCloud(context, assets, obstacle.x, obstacle, "bottom", elapsed - obstacle.createdAt);
      }
    }

    function withPlayerTransform(session, draw) {
      const { balloon, collisionCooldown, elapsed } = session;
      const flicker = collisionCooldown > 0 && Math.floor(elapsed * 14) % 2 === 0;
      context.save();
      context.globalAlpha = flicker ? 0.42 : 1;
      context.translate(CONFIG.balloonX, balloon.y);
      context.rotate(Math.max(-0.06, Math.min(0.06, balloon.velocity / 3000)));
      draw(elapsed);
      context.restore();
    }

    function drawFlame(session) {
      if (!session.holding) return;
      withPlayerTransform(session, (elapsed) => {
        const plan = flameDrawPlan(elapsed);
        const source = plan.source;
        const destination = plan.destination;
        if (assets.flame) {
          context.drawImage(
            assets.flame,
            source.x,
            source.y,
            source.width,
            source.height,
            destination.x,
            destination.y,
            destination.width,
            destination.height
          );
        } else {
          context.fillStyle = "#ffb12e";
          context.beginPath();
          context.ellipse(0, destination.y + destination.height / 2, destination.width / 2, destination.height / 2, 0, 0, Math.PI * 2);
          context.fill();
        }
      });
    }

    function drawBalloon(session) {
      withPlayerTransform(session, () => {
        if (assets.balloon) {
          context.drawImage(assets.balloon, -CONFIG.balloonWidth / 2, -CONFIG.balloonHeight / 2, CONFIG.balloonWidth, CONFIG.balloonHeight);
        } else {
          context.fillStyle = "#c9682c";
          context.beginPath();
          context.ellipse(0, -20, 65, 82, 0, 0, Math.PI * 2);
          context.fill();
        }
      });
    }

    function drawVignette() {
      const vignette = context.createRadialGradient(CONFIG.width / 2, CONFIG.height / 2, 260, CONFIG.width / 2, CONFIG.height / 2, 760);
      vignette.addColorStop(0.6, "rgba(13,50,64,0)");
      vignette.addColorStop(1, "rgba(13,50,64,.13)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, CONFIG.width, CONFIG.height);
    }

    function draw(session) {
      const elapsed = session?.elapsed || 0;
      drawBackground();
      if (session) {
        for (const obstacle of session.obstacles) drawCoin(obstacle, elapsed);
        for (const obstacle of session.obstacles) drawObstacle(obstacle, elapsed);
        drawFlame(session);
        drawBalloon(session);
      } else {
        drawBalloon({ balloon: { y: CONFIG.balloonStartY, velocity: 0 }, holding: false, collisionCooldown: 0, elapsed: 0 });
      }
      drawVignette();
    }

    return Object.freeze({ load, draw });
  }

  return Object.freeze({
    ASSET_PATHS,
    LAYER_ORDER,
    FLAME_LAYOUT,
    CLOUD_STYLES,
    OBSTACLE_LAYOUT,
    cloudStyleForObstacle,
    flameDrawPlan,
    obstacleSpriteDrawPlan,
    createRenderer
  });
});
