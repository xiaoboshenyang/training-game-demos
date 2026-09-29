/* 万象折纸：真实拼块操作区。几何和碰撞统一调用锁定的 FoldEngine。 */
(function (root) {
  'use strict';
  const E = root.FoldEngine;
  if (!E) throw new Error('game-core.js 需要先加载 engine.js');
  const NS = 'http://www.w3.org/2000/svg';
  const STOPS = [-135, -90, -45, 0, 45, 90, 135, 180];
  const HOME_SNAP_DEGREES = 8;
  let nextId = 0;

  const svgEl = (tag, attrs = {}) => {
    const el = document.createElementNS(NS, tag);
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
    return el;
  };
  const points = poly => poly.map(p => `${(+p[0]).toFixed(1)},${(+p[1]).toFixed(1)}`).join(' ');
  function decodeTable(table) {
    const states = Uint8Array.from(atob(table.s), c => c.charCodeAt(0));
    const distances = Uint8Array.from(atob(table.d), c => c.charCodeAt(0));
    const map = new Map();
    let delta = 0, mul = 1, key = 0, n = 0;
    for (const b of states) {
      delta += (b & 127) * mul; mul *= 128;
      if (!(b & 128)) { key += delta; map.set(key, distances[n++]); delta = 0; mul = 1; }
    }
    return map;
  }

  function create(options) {
    if (!options || !options.container) throw new Error('FoldGameCore.create 需要 container');
    const host = options.container;
    const id = `fold-${++nextId}`;
    const assetsBase = options.assetsBase || 'assets/animals/';
    host.innerHTML = `
      <div class="fold-game" id="${id}">
        <div class="fold-board-wrap">
          <div class="fold-paper-grain" aria-hidden="true"></div>
          <svg class="fold-board" role="img" aria-label="万象折纸拼块操作区" preserveAspectRatio="xMidYMid meet"></svg>
          <div class="fold-instruction" aria-live="polite"></div>
        </div>
        <aside class="fold-tools" aria-label="游戏操作">
          <div class="fold-tools-cap" aria-hidden="true">折纸工具</div>
          <button type="button" class="fold-tool fold-undo" aria-label="撤回上一步"><span class="fold-tool-icon" aria-hidden="true">↶</span><span>撤回</span></button>
          <button type="button" class="fold-tool fold-hint" aria-label="提示下一步"><span class="fold-tool-icon fold-bulb" aria-hidden="true">✦</span><span>提示</span></button>
          <button type="button" class="fold-tool fold-skip" aria-label="换一道题"><span class="fold-tool-icon" aria-hidden="true">↻</span><span>换一道</span></button>
        </aside>
      </div>`;
    const rootEl = host.querySelector(`#${id}`);
    const board = rootEl.querySelector('.fold-board');
    const statusEl = rootEl.querySelector('.fold-instruction');
    const undoBtn = rootEl.querySelector('.fold-undo');
    const hintBtn = rootEl.querySelector('.fold-hint');
    const skipBtn = rootEl.querySelector('.fold-skip');
    let puzzle = null, angles = [], undo = [], active = null;
    let nodes = null, blocker = -1, hitter = -1, hintInfo = null;
    let solved = false, revealing = false, usedHint = false;
    let locked = false, paused = false, destroyed = false;
    let displayScale = 100, reminderPercent = 100, reminderTimer = null;
    let reminderShown = false, animationFrame = 0, animationResolve = null;

    function say(message, kind = '') {
      statusEl.textContent = message;
      statusEl.dataset.kind = kind;
    }
    function canPlay() { return !!puzzle && !solved && !locked && !paused && !destroyed; }
    function refreshButtons() {
      undoBtn.disabled = !canPlay() || !undo.length;
      hintBtn.disabled = !canPlay();
      skipBtn.disabled = !canPlay();
      hintBtn.classList.toggle('is-active', !!hintInfo);
    }
    function stopReminder() { if (reminderTimer) { clearTimeout(reminderTimer); reminderTimer = null; } }
    function scheduleReminder() {
      stopReminder();
      if (!canPlay() || reminderShown) return;
      reminderTimer = setTimeout(() => {
        reminderTimer = null;
        if (!canPlay() || reminderShown) return;
        reminderShown = true;
        say('按住彩色块，绕白点往浅色空位转。', 'tip');
      }, Math.max(1500, 10000 * reminderPercent / 100));
    }
    const atHome = i => Math.abs(E.norm(angles[i])) < 1;
    const allHome = () => puzzle && puzzle.movable.every(atHome);
    const stopIndex = angle => STOPS.findIndex(stop => Math.abs(E.norm(angle - stop)) < 1);
    const stateCode = a => {
      let code = 0;
      for (let k = 0; k < puzzle.movable.length; k++) {
        const index = stopIndex(a[puzzle.movable[k]]);
        if (index < 0) return null;
        code += index * 8 ** k;
      }
      return code;
    };
    const reachable = (i, target) => {
      const from = angles[i], delta = E.norm(target - from);
      if (Math.abs(delta) < .01) return true;
      return [delta, delta > 0 ? delta - 360 : delta + 360]
        .some(turn => E.sweep(puzzle, angles, i, from, from + turn).ok);
    };

    function setVisualScale() {
      if (!nodes || !puzzle) return;
      const b = puzzle.board, cx = b.x + b.w / 2, cy = b.y + b.h / 2, s = displayScale / 100;
      nodes.content.setAttribute('transform', `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`);
    }
    function buildScene() {
      if (!puzzle) return;
      board.replaceChildren();
      const b = puzzle.board;
      board.setAttribute('viewBox', `${b.x} ${b.y} ${b.w} ${b.h}`);
      const defs = svgEl('defs'); board.append(defs);
      const content = svgEl('g', { class: 'fold-content' }); board.append(content);
      // 每片完整轮廓都对应一格；底板没有假块，也没有遮挡层。
      const goals = svgEl('g', { class: 'fold-goals' });
      puzzle.pieces.forEach(p => goals.append(svgEl('polygon', { points: points(p.poly), class: 'fold-goal' })));
      content.append(goals);
      const groups = [], edges = [], images = [], hits = [];
      const order = puzzle.pieces.map((_, i) => i).sort((a, b) => Number(puzzle.pieces[b].fixed) - Number(puzzle.pieces[a].fixed));
      for (const i of order) {
        const p = puzzle.pieces[i], clipId = `${id}-clip-${i}`;
        const clip = svgEl('clipPath', { id: clipId, clipPathUnits: 'userSpaceOnUse' });
        clip.append(svgEl('polygon', { points: points(p.poly) })); defs.append(clip);
        const group = svgEl('g', { class: 'fold-piece' });
        const img = svgEl('image', {
          x: 0, y: 0, width: 1536, height: 1024,
          preserveAspectRatio: 'none', 'clip-path': `url(#${clipId})`
        });
        img.setAttribute('href', `${assetsBase}${encodeURIComponent(puzzle.img)}.webp`);
        const edge = svgEl('polygon', { points: points(p.poly), class: 'fold-piece-edge' });
        const hit = svgEl('polygon', { points: points(p.poly), class: `fold-hit${p.fixed ? ' is-fixed' : ''}`, 'data-index': i });
        if (!p.fixed) hit.addEventListener('pointerdown', onDown);
        group.append(img, edge, hit); content.append(group);
        groups[i] = group; edges[i] = edge; images[i] = img; hits[i] = hit;
      }
      const ghost = svgEl('polygon', { class: 'fold-hint-ghost' });
      ghost.style.display = 'none'; content.append(ghost);
      const joints = puzzle.movable.map(i => {
        const outer = svgEl('circle', { r: 22, class: 'fold-hinge-outer' });
        const inner = svgEl('circle', { r: 7, class: 'fold-hinge-inner' });
        content.append(outer, inner);
        return [i, outer, inner];
      });
      // 完成后改用一张完整 WebP，避免切块接缝留在结果展示里。
      const completeImage = svgEl('image', {
        x: 0, y: 0, width: 1536, height: 1024,
        preserveAspectRatio: 'none', class: 'fold-complete-image'
      });
      completeImage.setAttribute('href', `${assetsBase}${encodeURIComponent(puzzle.img)}.webp`);
      content.append(completeImage);
      nodes = { content, goals, groups, edges, images, hits, ghost, joints, completeImage };
      setVisualScale();
      render();
    }
    function render() {
      if (!nodes || !puzzle) return;
      const ms = E.matrices(puzzle, angles);
      nodes.groups.forEach((group, i) => group.setAttribute('transform', `matrix(${ms[i].map(v => v.toFixed(6)).join(' ')})`));
      nodes.edges.forEach((edge, i) => {
        const p = puzzle.pieces[i];
        const classes = ['fold-piece-edge'];
        if (p.fixed) classes.push('is-fixed');
        else if (i === blocker || i === hitter) classes.push('is-blocked');
        else if (active && active.i === i) classes.push('is-active');
        else if (hintInfo && hintInfo.i === i) classes.push('is-hinted');
        else if (atHome(i)) classes.push('is-home');
        edge.setAttribute('class', classes.join(' '));
      });
      for (const [i, outer, inner] of nodes.joints) {
        const h = E.hingeWorld(puzzle, angles, i);
        outer.setAttribute('cx', h[0]); outer.setAttribute('cy', h[1]);
        inner.setAttribute('cx', h[0]); inner.setAttribute('cy', h[1]);
      }
      if (hintInfo) {
        const a = angles.slice(); a[hintInfo.i] = hintInfo.angle;
        nodes.ghost.setAttribute('points', points(E.worldPolys(puzzle, a)[hintInfo.i]));
        nodes.ghost.style.display = '';
      } else nodes.ghost.style.display = 'none';
      rootEl.classList.toggle('is-complete-reveal', revealing);
      refreshButtons();
    }
    function pointInWorld(evt) {
      const point = new DOMPoint(evt.clientX, evt.clientY).matrixTransform(nodes.content.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    function pointerAngle(evt, i) {
      const h = E.hingeWorld(puzzle, angles, i), pt = pointInWorld(evt);
      return Math.atan2(pt[1] - h[1], pt[0] - h[0]) * 180 / Math.PI;
    }
    function onDown(evt) {
      if (!canPlay()) return;
      evt.preventDefault();
      const i = Number(evt.currentTarget.dataset.index);
      active = { i, id: evt.pointerId, last: pointerAngle(evt, i), before: angles.slice(), collision: '' };
      blocker = hitter = -1;
      try { board.setPointerCapture(evt.pointerId); } catch (_) { /* capture unavailable in a test DOM */ }
      render();
    }
    function onMove(evt) {
      if (!active || evt.pointerId !== active.id || !canPlay()) return;
      const a = pointerAngle(evt, active.i), delta = E.norm(a - active.last);
      active.last = a;
      if (Math.abs(delta) < .01) return;
      const from = angles[active.i], move = E.sweep(puzzle, angles, active.i, from, from + delta);
      angles[active.i] = move.at;
      blocker = move.ok ? -1 : move.blocker;
      hitter = move.ok || move.hitter === active.i ? -1 : move.hitter;
      if (!move.ok) {
        const target = move.blocker === -2 ? '边框' : `「${puzzle.pieces[move.blocker].name}」`;
        active.collision = hitter >= 0
          ? `挂在上面的「${puzzle.pieces[hitter].name}」撞到了${target}。`
          : `被${target}挡住了。`;
        say(active.collision, 'blocked');
      }
      render();
    }
    function onUp(evt) {
      if (!active || evt.pointerId !== active.id) return;
      const i = active.i, cur = angles[i], collision = active.collision;
      // 松手保留手指拖到的合法角度；只有靠近最终目标时帮玩家准确贴合。
      if (Math.abs(E.norm(cur)) <= HOME_SNAP_DEGREES &&
          E.sweep(puzzle, angles, i, cur, cur + E.norm(-cur)).ok) angles[i] = 0;
      else angles[i] = E.norm(cur);
      const changed = Math.abs(E.norm(angles[i] - active.before[i])) > .05;
      if (changed) { undo.push(active.before); hintInfo = null; if (options.onMove) options.onMove(); }
      active = null; blocker = hitter = -1; render();
      if (changed && allHome()) {
        solved = true; hintInfo = null; stopReminder(); render();
        say('拼好了！', 'success');
        if (options.onSolved) options.onSolved({ image: puzzle.img, usedHint, moves: undo.length });
      } else if (changed && atHome(i)) say(`「${puzzle.pieces[i].name}」到位了。`, 'success');
      else if (changed) say('转好了一步。');
      else if (collision) say(`${collision}换个方向，或先挪开挡路的块。`, 'blocked');
      else say('按住彩色块，绕白点转动。');
      if (changed) scheduleReminder();
    }
    board.addEventListener('pointermove', onMove);
    board.addEventListener('pointerup', onUp);
    board.addEventListener('pointercancel', onUp);

    function showHint() {
      if (!canPlay()) return;
      if (hintInfo) { hintInfo = null; render(); say('提示已收起。'); return; }
      const exactKey = stateCode(angles);
      const nearest = angles.slice();
      for (const i of puzzle.movable) {
        nearest[i] = STOPS.reduce((best, stop) =>
          Math.abs(E.norm(angles[i] - stop)) < Math.abs(E.norm(angles[i] - best)) ? stop : best, STOPS[0]);
      }
      const key = exactKey ?? (E.validState(puzzle, nearest) ? stateCode(nearest) : null);
      const distance = key === null ? undefined : puzzle.dist.get(key);
      const candidates = [];
      if (distance !== undefined) {
        for (let k = 0; k < puzzle.movable.length; k++) {
          const i = puzzle.movable[k], current = stopIndex(nearest[i]);
          for (let x = 0; x < STOPS.length; x++) {
            if (x === current || puzzle.dist.get(key + (x - current) * 8 ** k) !== distance - 1) continue;
            candidates.push({ i, angle: STOPS[x], reason: 'progress' });
          }
        }
      }
      for (const i of puzzle.movable) if (!atHome(i)) candidates.push({ i, angle: 0, reason: 'home' });
      const offGrid = puzzle.movable.filter(i => stopIndex(angles[i]) < 0);
      for (const i of offGrid) for (const angle of [...STOPS].sort((a, b) =>
        Math.abs(E.norm(angles[i] - a)) - Math.abs(E.norm(angles[i] - b)))) {
        candidates.push({ i, angle, reason: 'parking' });
      }
      const next = candidates.find(({ i, angle }) =>
        Math.abs(E.norm(angles[i] - angle)) > 1 && reachable(i, angle));
      if (!next) { say('这一步被挡住了，可先撤回，再从别的方向转。', 'blocked'); return; }
      hintInfo = { i: next.i, angle: next.angle };
      if (!usedHint) { usedHint = true; if (options.onHint) options.onHint(); }
      render();
      const name = puzzle.pieces[next.i].name;
      const suffix = next.reason === 'parking' ? '先停在这个不被挡的位置。' :
        next.angle === 0 ? '让这块回到正确位置。' : '先让开，给后面的块留空间。';
      say(`转动「${name}」，对齐蓝色虚线。${suffix}`, 'tip');
    }
    function undoMove() {
      if (!canPlay() || !undo.length) return;
      angles = undo.pop(); hintInfo = null; blocker = hitter = -1;
      render(); say('已撤回上一步。'); scheduleReminder();
    }
    undoBtn.addEventListener('click', undoMove);
    hintBtn.addEventListener('click', showHint);
    skipBtn.addEventListener('click', () => { if (canPlay() && options.onSkip) options.onSkip(); });

    function endAnimation() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (animationResolve) { const resolve = animationResolve; animationResolve = null; resolve(); }
    }
    function load(item) {
      if (destroyed) return;
      endAnimation();
      puzzle = item;
      rootEl.classList.toggle('is-advanced', item.metrics && item.metrics.movable >= 6);
      if (!puzzle.movable) E.prepare(puzzle);
      if (!puzzle.dist) puzzle.dist = decodeTable(puzzle.table);
      solved = false; revealing = false; usedHint = false;
      angles = puzzle.start.slice();
      undo = []; active = null; hintInfo = null; blocker = hitter = -1;
      reminderShown = false; stopReminder();
      buildScene();
      say('按住彩色块，绕白点转回浅色格子。');
      scheduleReminder();
      refreshButtons();
    }
    function revealSolved() {
      if (!puzzle || destroyed || !solved) return Promise.resolve();
      endAnimation();
      revealing = true;
      hintInfo = null;
      render();
      let last = 0, elapsed = 0;
      return new Promise(resolve => {
        animationResolve = resolve;
        function frame(now) {
          if (destroyed || !puzzle) { endAnimation(); return; }
          if (!last) last = now;
          if (!paused) elapsed += Math.min(50, now - last);
          last = now;
          if (elapsed < 1300) animationFrame = requestAnimationFrame(frame);
          else {
            animationFrame = 0; animationResolve = null;
            resolve();
          }
        }
        animationFrame = requestAnimationFrame(frame);
      });
    }
    function setLocked(value) {
      locked = !!value;
      if (locked) { active = null; stopReminder(); }
      else scheduleReminder();
      refreshButtons();
    }
    function pause() { paused = true; rootEl.classList.add('is-paused'); active = null; stopReminder(); refreshButtons(); }
    function resume() { paused = false; rootEl.classList.remove('is-paused'); scheduleReminder(); refreshButtons(); }
    function setDisplayScale(percent) {
      const value = Number(percent);
      displayScale = Number.isFinite(value) ? Math.max(65, Math.min(125, value)) : 100;
      setVisualScale();
    }
    function setReminderDelay(percent) {
      const value = Number(percent);
      reminderPercent = Number.isFinite(value) ? Math.max(20, Math.min(300, value)) : 100;
      scheduleReminder();
    }
    function getSnapshot() {
      return {
        image: puzzle ? puzzle.img : null,
        angles: angles.slice(), solved, revealing, usedHint, locked, paused,
        undoDepth: undo.length, hint: hintInfo ? { ...hintInfo } : null,
        displayScale, reminderPercent
      };
    }
    function destroy() {
      destroyed = true; stopReminder(); endAnimation();
      board.removeEventListener('pointermove', onMove);
      board.removeEventListener('pointerup', onUp);
      board.removeEventListener('pointercancel', onUp);
      host.replaceChildren();
    }
    refreshButtons();
    return { load, revealSolved, setLocked, pause, resume,
      destroy, setDisplayScale, setReminderDelay, getSnapshot };
  }

  root.FoldGameCore = { create, decodeTable };
})(window);
