// 折叠动物 v0.3 · 几何与碰撞引擎（浏览器与 Node 共用）
// 纸片坐标一律按“拼好时”的世界坐标书写；角度是相对拼好姿态的旋转量（度，屏幕坐标下正值为顺时针）。
// v0.3：一片可以由几个凸块（parts）组成，poly 只用于显示；台面大小可按题设定（puz.board）。
(function (root) {
  const EPS = 1.5;          // 重叠深度超过它才算碰撞；贴边、共点不算
  const STEP = 2;           // 扫掠检查的角度步长
  const BOARD = { x: 0, y: 0, w: 800, h: 560, pad: 6 };

  const ident = () => [1, 0, 0, 1, 0, 0];
  function mul(m, n) {
    return [m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1], m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3], m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5]];
  }
  function rotAbout(h, deg) {
    const r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    return [c, s, -s, c, h[0] - c * h[0] + s * h[1], h[1] - s * h[0] - c * h[1]];
  }
  const apply = (m, p) => [m[0] * p[0] + m[2] * p[1] + m[4], m[1] * p[0] + m[3] * p[1] + m[5]];

  // 没有 parent 的片是固定片（可以不止一块）；可动片的 parent 指向更靠前的下标
  function prepare(puz) {
    const n = puz.pieces.length;
    puz.children = Array.from({ length: n }, () => []);
    const fixed = p => p.parent === undefined || p.parent === null || p.parent < 0;
    puz.pieces.forEach((p, i) => { p.fixed = fixed(p); if (!p.fixed) puz.children[p.parent].push(i); });
    puz.movable = puz.pieces.map((p, i) => i).filter(i => !puz.pieces[i].fixed);
    puz.subtree = puz.pieces.map((_, i) => { const out = []; (function go(k) { out.push(k); puz.children[k].forEach(go); })(i); return out; });
    puz.pieces.forEach(p => {
      if (!p.parts) p.parts = [p.poly];
      let r = 0; const h = p.hinge || p.poly[0];
      p.poly.forEach(q => { r = Math.max(r, Math.hypot(q[0] - h[0], q[1] - h[1])); });
      p.radius = r;
    });
    const b = Object.assign({}, BOARD, puz.board || {});
    puz.bounds = { x0: b.x + b.pad, y0: b.y + b.pad, x1: b.x + b.w - b.pad, y1: b.y + b.h - b.pad };
    return puz;
  }

  function matrices(puz, angles) {
    const ms = [ident()];
    for (let i = 1; i < puz.pieces.length; i++) { const p = puz.pieces[i]; ms[i] = p.fixed ? ident() : mul(ms[p.parent], rotAbout(p.hinge, angles[i] || 0)); }
    return ms;
  }
  function worldPolys(puz, angles) {
    const ms = matrices(puz, angles);
    return puz.pieces.map((p, i) => p.poly.map(q => apply(ms[i], q)));
  }
  // 每片的凸块，附带包围盒，用于碰撞
  function box(P) { let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity; for (const q of P) { if (q[0] < x0) x0 = q[0]; if (q[0] > x1) x1 = q[0]; if (q[1] < y0) y0 = q[1]; if (q[1] > y1) y1 = q[1]; } return { P, x0, y0, x1, y1 }; }
  function partsOf(puz, ms, i) { return puz.pieces[i].parts.map(P => box(P.map(q => apply(ms[i], q)))); }
  function worldParts(puz, angles) { const ms = matrices(puz, angles); return puz.pieces.map((_, i) => partsOf(puz, ms, i)); }

  function overlapDepth(A, B) {
    let best = Infinity;
    for (const P of [A, B]) {
      for (let i = 0; i < P.length; i++) {
        const a = P[i], b = P[(i + 1) % P.length];
        let nx = b[1] - a[1], ny = a[0] - b[0]; const L = Math.hypot(nx, ny); if (L < 1e-9) continue; nx /= L; ny /= L;
        let a0 = Infinity, a1 = -Infinity, b0 = Infinity, b1 = -Infinity;
        for (const q of A) { const d = q[0] * nx + q[1] * ny; if (d < a0) a0 = d; if (d > a1) a1 = d; }
        for (const q of B) { const d = q[0] * nx + q[1] * ny; if (d < b0) b0 = d; if (d > b1) b1 = d; }
        const o = Math.min(a1, b1) - Math.max(a0, b0);
        if (o < best) best = o;
        if (best <= EPS) return best;
      }
    }
    return best;
  }
  function hitsParts(As, Bs) {
    for (const a of As) for (const b of Bs) {
      if (a.x1 < b.x0 + EPS || b.x1 < a.x0 + EPS || a.y1 < b.y0 + EPS || b.y1 < a.y0 + EPS) continue;
      if (overlapDepth(a.P, b.P) > EPS) return true;
    }
    return false;
  }
  const inBoard = (puz, parts) => parts.every(p => p.x0 >= puz.bounds.x0 && p.x1 <= puz.bounds.x1 && p.y0 >= puz.bounds.y0 && p.y1 <= puz.bounds.y1);

  // 整个姿态是否合法：纸片两两不重叠、都在台面内
  function validState(puz, angles) {
    const W = worldParts(puz, angles);
    for (let i = 0; i < W.length; i++) {
      if (!inBoard(puz, W[i])) return false;
      for (let j = i + 1; j < W.length; j++) if (hitsParts(W[i], W[j])) return false;
    }
    return true;
  }

  // 转动关节 j（带着它的下游一起）从 from 扫到 to；返回能否走完，以及被谁挡住、是哪一片撞上的
  function sweep(puz, angles, j, from, to) {
    const moving = puz.subtree[j];
    const inMove = new Set(moving);
    const a = angles.slice();
    a[j] = from;
    const W0 = worldParts(puz, a);
    const statics = [];
    for (let k = 0; k < puz.pieces.length; k++) if (!inMove.has(k)) statics.push(k);
    const dir = to > from ? 1 : -1;
    let last = from;
    // v0.4：检查点取固定网格（STEP 的整数倍）+ 终点，正转、反转检查的是同一组角度，结果才一致
    for (let t = from; ; ) {
      const next = dir > 0 ? Math.min(Math.floor(t / STEP + 1e-9) * STEP + STEP, to) : Math.max(Math.ceil(t / STEP - 1e-9) * STEP - STEP, to);
      a[j] = next;
      const ms = matrices(puz, a);
      for (const m of moving) {
        const Pm = partsOf(puz, ms, m);
        if (!inBoard(puz, Pm)) return { ok: false, at: last, blocker: -2, hitter: m };
        for (const s of statics) if (hitsParts(Pm, W0[s])) return { ok: false, at: last, blocker: s, hitter: m };
      }
      last = next; t = next;
      if (t === to) return { ok: true, at: to, blocker: -1, hitter: -1 };
    }
  }

  const norm = d => { d = ((d % 360) + 540) % 360 - 180; return d === -180 ? 180 : d; };
  function hingeWorld(puz, angles, i) { return apply(matrices(puz, angles)[puz.pieces[i].parent], puz.pieces[i].hinge); }

  const api = { EPS, STEP, BOARD, prepare, matrices, worldPolys, worldParts, validState, sweep, norm, overlapDepth, hingeWorld };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.FoldEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
