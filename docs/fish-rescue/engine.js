// 救救小鱼 六级样题 demo v0.2：共用规则引擎（浏览器与 Node 共用）
// 规则：鱼随水沿预设通道前进；遇到没开的销钉就停下等（停着时安全）；
// 岔口按出口顺序走第一条没被销钉挡住的路；喷火、齿轮危险时经过即失败。
(function (root) {
  const SPEED = 150; // 像素/秒
  const STOP_GAP = 24; // 鱼停在销钉前的距离
  const HAZARD_HALF = 26; // 危险区半宽

  function prepare(level) {
    if (level._ready) return level;
    level.edgeMap = {};
    level.edges.forEach((e) => {
      e.seg = [];
      e.len = 0;
      for (let i = 0; i < e.pts.length - 1; i++) {
        const [x1, y1] = e.pts[i];
        const [x2, y2] = e.pts[i + 1];
        const l = Math.hypot(x2 - x1, y2 - y1);
        e.seg.push({ x1, y1, x2, y2, l, from: e.len });
        e.len += l;
      }
      e.pins = level.pins.filter((p) => p.edge === e.id);
      e.hazards = level.hazards.filter((h) => h.edge === e.id);
      level.edgeMap[e.id] = e;
    });
    Object.keys(level.nodes).forEach((id) => {
      const order = level.outOrder && level.outOrder[id];
      level.nodes[id].outs = order
        ? order.map((eid) => level.edgeMap[eid])
        : level.edges.filter((e) => e.from === id);
    });
    level._ready = true;
    return level;
  }

  function pointAt(edge, d) {
    d = Math.max(0, Math.min(edge.len, d));
    for (const s of edge.seg) {
      if (d <= s.from + s.l + 1e-6) {
        const k = s.l === 0 ? 0 : (d - s.from) / s.l;
        return {
          x: s.x1 + (s.x2 - s.x1) * k,
          y: s.y1 + (s.y2 - s.y1) * k,
          dx: (s.x2 - s.x1) / s.l,
          dy: (s.y2 - s.y1) / s.l,
        };
      }
    }
    const s = edge.seg[edge.seg.length - 1];
    return { x: s.x2, y: s.y2, dx: (s.x2 - s.x1) / s.l, dy: (s.y2 - s.y1) / s.l };
  }

  function hazardPhase(h, t) {
    const c = h.safe + h.danger;
    return (((t + (h.offset || 0)) % c) + c) % c;
  }
  function isDanger(h, t) {
    return hazardPhase(h, t) >= h.safe;
  }
  function isWarn(h, t) {
    const p = hazardPhase(h, t);
    return p >= h.safe - 0.7 && p < h.safe;
  }

  function createState(level) {
    prepare(level);
    const open = {};
    level.pins.forEach((p) => (open[p.id] = false));
    return {
      t: 0,
      edge: level.start.edge,
      s: level.start.s || 0,
      open,
      status: 'play', // play | win | fail
      waiting: false,
      trail: [],
      lastFork: null,
      fail: null,
      opened: [],
    };
  }

  function openPin(level, st, id) {
    if (st.status !== 'play' || st.open[id]) return false;
    st.open[id] = true;
    st.opened.push({ id, t: st.t });
    return true;
  }

  function failAt(st, reason, x, y) {
    st.status = 'fail';
    st.fail = { reason, x, y };
  }

  function step(level, st, dt) {
    if (st.status !== 'play') return;
    st.t += dt;
    let remain = SPEED * dt;
    st.waiting = false;
    let guard = 0;
    while (remain > 1e-6 && st.status === 'play' && guard++ < 20) {
      const e = level.edgeMap[st.edge];
      let target = e.len;
      for (const p of e.pins) {
        if (p.gate || st.open[p.id]) continue;
        const stop = p.at - STOP_GAP;
        if (stop >= st.s - 1e-6 && stop < target) target = stop;
      }
      const move = Math.min(remain, target - st.s);
      if (move > 0) {
        st.s += move;
        remain -= move;
      }
      for (const h of e.hazards) {
        if (Math.abs(st.s - h.at) < HAZARD_HALF && isDanger(h, st.t)) {
          const p = pointAt(e, h.at);
          failAt(st, h.type, p.x, p.y);
          return;
        }
      }
      if (st.s < e.len - 1e-6) {
        if (st.s >= target - 1e-6) st.waiting = true; // 被销钉挡住
        break;
      }
      // 到达节点
      const node = level.nodes[e.to];
      if (node.type === 'pool') {
        st.status = 'win';
        return;
      }
      if (node.type === 'trap' || node.type === 'dead') {
        const f = st.lastFork ? level.nodes[st.lastFork] : node;
        failAt(st, node.type, f.x, f.y);
        st.fail.endX = node.x;
        st.fail.endY = node.y;
        return;
      }
      let next = null;
      for (const o of node.outs) {
        const gate = o.pins.find((p) => p.gate);
        if (gate && !st.open[gate.id]) continue;
        next = o;
        break;
      }
      if (!next) {
        st.waiting = true;
        break;
      }
      if (node.outs.length > 1) st.lastFork = e.to;
      st.trail.push(e.id);
      st.edge = next.id;
      st.s = 0;
    }
  }

  const api = { SPEED, prepare, pointAt, hazardPhase, isDanger, isWarn, createState, openPin, step };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FishEngine = api;
})(typeof window !== 'undefined' ? window : globalThis);
