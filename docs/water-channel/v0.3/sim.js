// 【round014 正式引擎】在 round006 门组物理上加入 mode:'hold'（开关上有水门才开，水离开就关；关门时门格里的水挤到相连的最近空格）。2026-10-08 博书同意引入。跷跷板门（closes）已搁置，未并入。其余物理未改。
// 引水灰盒 v0.2 共用物理：细格重力水。浏览器与 Node 验题共用同一份。
// 水粒子逐格下落；下方堵住就斜滑、再沿水平方向流动（带方向惯性）；坑会被装满、从最低处溢出；水不会往上爬。
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.WaterSim = factory();
})(this, function () {
  'use strict';
  const B = 5;                 // 每个地图块 = 5×5 细格
  const T = { EMPTY: 0, ROCK: 1, DIRT: 2, WATER: 3, SPONGE: 4, GATE: 5, SWITCH: 6, BATH: 7, DRAIN: 8, SPONGE_FULL: 9, MUD: 10 };
  const CHAR = { '#': T.ROCK, 'd': T.DIRT, '.': T.EMPTY, 'w': T.WATER, 'B': T.BATH, 'X': T.DRAIN, 'S': T.SPONGE, 'k': T.SWITCH, 'g': T.GATE, 'm': T.MUD };
  const DISP = 3;              // 每次水平流动的最大格数
  const BRUSH = 3.2;           // 手指挖土半径（细格）
  const HOLD_RELEASE = 8;      // 压住开关：连续这么多拍没有水碰才关门
  const SPONGE_REACH = 2;      // 海绵的吸水范围（细格）：离海绵 2 格以内的水都会被吸

  const VERSION = 'round014-gates-hold-v1';
  function gateMetadata(level, cols, rows, W, H) {
    if (level.gateGroups === undefined) return null;
    const fail = message => { throw new Error(level.id + ' gateGroups: ' + message); };
    const groups = level.gateGroups;
    if (cols !== 20 || rows !== 13) fail('grouped map must be 20 x 13');
    if (!Array.isArray(groups) || groups.length < 1 || groups.length > 2) fail('must contain one or two groups');
    const ids = new Set(), assigned = new Set(), switchGroup = new Uint8Array(W * H), groupGates = [], groupIds = [], groupModes = [];
    groups.forEach((group, index) => {
      if (!group || typeof group.id !== 'string' || !group.id.trim() || ids.has(group.id)) fail('nonempty unique id required');
      ids.add(group.id); groupIds.push(group.id); groupGates.push([]);
      if (group.mode !== undefined && group.mode !== 'hold') fail(group.id + ' unknown mode');
      groupModes.push(group.mode === 'hold' ? 'hold' : 'latch');
      for (const [field, symbol] of [['switches', 'k'], ['gates', 'g']]) {
        if (!Array.isArray(group[field]) || !group[field].length) fail(group.id + ' requires ' + field);
        for (const point of group[field]) {
          if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isInteger)) fail('integer coordinate pair required');
          const [c, r] = point;
          if (c < 0 || c >= cols || r < 0 || r >= rows) fail('coordinate out of bounds');
          if (level.map[r][c] !== symbol) fail(field + ' coordinate has wrong tile');
          const key = c + ',' + r;
          if (assigned.has(key)) fail('duplicate coordinate');
          assigned.add(key);
          for (let y = r * B; y < (r + 1) * B; y++) for (let x = c * B; x < (c + 1) * B; x++) {
            const i = y * W + x;
            if (symbol === 'k') switchGroup[i] = index + 1;
            else groupGates[index].push(i);
          }
        }
      }
    });
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      if ((level.map[r][c] === 'k' || level.map[r][c] === 'g') && !assigned.has(c + ',' + r)) fail('unassigned switch or gate');
    }
    return {groupIds, switchGroup, groupGates, groupModes, touched: new Uint8Array(groupIds.length), idle: new Uint16Array(groupIds.length), groupsOpen: Object.fromEntries(groupIds.map(id => [id, false]))};
  }

  function triggerGroups(s, x, y) {
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || nx >= s.W || ny < 0 || ny >= s.H) continue;
      const group = s.switchGroup[ny * s.W + nx] - 1;
      if (group < 0) continue;
      const id = s.groupIds[group];
      s.touched[group] = 1;
      if (!s.groupsOpen[id]) {
        s.groupsOpen[id] = true;
        for (const i of s.groupGates[group]) if (s.g[i] === T.GATE) s.g[i] = T.EMPTY;
      }
    }
    s.gateOpen = s.groupIds.every(id => s.groupsOpen[id]);
  }

  // 每拍结束：hold 组本拍没被水碰到就关门；门格里有水就挤到相连的最近空格再关。
  function shut(s, i) {
    const t = s.g[i];
    if (t === T.EMPTY) { s.g[i] = T.GATE; return; }
    if (t !== T.WATER && t !== T.MUD) return;
    // 门格里有水：沿相连的水找最近的空格（先上、再左右、最后下），把这格水挪过去再关门；400 格内找不到才暂缓。
    const seen = new Set([i]), queue = [i];
    for (let q = 0; q < queue.length && q < 400; q++) {
      const c = queue[q], x = c % s.W;
      for (const n of [c - s.W, x > 0 ? c - 1 : -1, x < s.W - 1 ? c + 1 : -1, c + s.W]) {
        if (n < 0 || n >= s.g.length || seen.has(n)) continue;
        seen.add(n);
        if (s.g[n] === T.EMPTY) { s.g[n] = t; s.dir[n] = s.dir[i]; s.g[i] = T.GATE; s.still = 0; return; }
        if (s.g[n] === T.WATER || s.g[n] === T.MUD) queue.push(n);
      }
    }
  }
  function settleGates(s) {
    s.groupIds.forEach((id, k) => {
      // 压住开关带一点迟钝：连续 HOLD_RELEASE 拍没有水碰才关门，避免水在开关边上晃动时门每拍开关。
      if (s.touched[k]) s.idle[k] = 0; else if (s.idle[k] < 65535) s.idle[k]++;
      if (s.groupModes[k] === 'hold' && s.groupsOpen[id] && s.idle[k] >= HOLD_RELEASE) s.groupsOpen[id] = false;
      if (s.groupModes[k] === 'hold' && !s.groupsOpen[id]) for (const i of s.groupGates[k]) shut(s, i);
      s.touched[k] = 0;
    });
    s.gateOpen = s.groupIds.every(id => s.groupsOpen[id]);
  }

  function create(level) {
    const rows = level.map, cols = rows[0].length;
    for (const r of rows) if (r.length !== cols) throw new Error(level.id + ' 行宽不一致: ' + r);
    const W = cols * B, H = rows.length * B;
    const g = new Uint8Array(W * H), dir = new Int8Array(W * H), moved = new Uint8Array(W * H);
    let total = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const t = CHAR[rows[(y / B) | 0][(x / B) | 0]];
      if (t === undefined) throw new Error(level.id + ' 未知字符');
      g[y * W + x] = t;
      if (t === T.WATER) total++;
      if (t === T.WATER || t === T.MUD) dir[y * W + x] = (x & 1) ? 1 : -1;
    }
    const metadata = gateMetadata(level, cols, rows.length, W, H);
    const ducks = (level.ducks || []).map(([c, r]) => ({ c, r, got: false }));
    return {
      level, W, H, g, dir, moved, tick: 0, total,
      bath: 0, lost: 0, absorbed: 0, spoiled: 0, dirty: 0, dirtyMax: level.dirtyMax || 0,
      target: Math.round(total * level.need),
      spongeLeft: level.sponge || 0, gateOpen: false,
      ducks, still: 0, lastMoves: 0, ...(metadata || {})
    };
  }

  const passable = t => t === T.EMPTY || t === T.BATH || t === T.DRAIN;

  function step(s) {
    const { W, H, g, dir, moved } = s;
    s.tick++; moved.fill(0);
    let moves = 0;
    const at = (x, y) => (x < 0 || x >= W || y < 0 || y >= H) ? T.ROCK : g[y * W + x];
    // 只把"往下走"和"被吸收/流走"计为变化，水面左右晃动不算，用来判断水是否已静止
    function go(i0, x1, y1) {
      const t = at(x1, y1), i1 = y1 * W + x1;
      if (t === T.EMPTY) { g[i1] = g[i0]; dir[i1] = dir[i0]; moved[i1] = 1; g[i0] = T.EMPTY; if (i1 >= i0 + W) moves++; return true; }
      const mud = g[i0] === T.MUD;
      if (t === T.BATH) { g[i0] = T.EMPTY; if (mud) s.dirty++; else s.bath++; moves++; return true; }
      if (t === T.DRAIN) { g[i0] = T.EMPTY; if (!mud) s.lost++; moves++; return true; }
      return false;
    }
    for (let y = H - 1; y >= 0; y--) {
      const ltr = ((y + s.tick) & 1) === 0;
      for (let k = 0; k < W; k++) {
        const x = ltr ? k : W - 1 - k, i = y * W + x;
        if ((g[i] !== T.WATER && g[i] !== T.MUD) || moved[i]) continue;
        // 泥水：清水碰到泥水就变脏
        if (g[i] === T.WATER && touches(s, x, y, T.MUD)) { g[i] = T.MUD; s.spoiled++; }
        // 海绵：碰到就吸
        if (s.spongeLeft > 0 && touches(s, x, y, T.SPONGE, SPONGE_REACH)) {
          if (g[i] === T.WATER) s.absorbed++;
          g[i] = T.EMPTY; s.spongeLeft--; moves++;
          if (s.spongeLeft === 0) for (let j = 0; j < g.length; j++) if (g[j] === T.SPONGE) g[j] = T.SPONGE_FULL;
          continue;
        }
        // 开关：碰到就开门
        if (s.groupsOpen) triggerGroups(s, x, y);
        else if (!s.gateOpen && touches(s, x, y, T.SWITCH)) {
          s.gateOpen = true;
          for (let j = 0; j < g.length; j++) if (g[j] === T.GATE) g[j] = T.EMPTY;
        }
        if (go(i, x, y + 1)) continue;
        let d = dir[i] || 1;
        if (passable(at(x + d, y)) && go(i, x + d, y + 1)) continue;
        if (passable(at(x - d, y)) && go(i, x - d, y + 1)) { continue; }
        if (slide(i, x, y, d)) continue;
        dir[i] = -d;
        slide(i, x, y, -d);
      }
    }
    function slide(i, x, y, d) {
      let nx = x;
      for (let k = 1; k <= DISP; k++) {
        const cx = x + d * k;
        if (!passable(at(cx, y))) break;
        nx = cx;
        if (at(cx, y) !== T.EMPTY || passable(at(cx, y + 1))) break;
      }
      return nx !== x && go(i, nx, y);
    }
    // 鸭子：块内出现水就算收到
    for (const dk of s.ducks) if (!dk.got) {
      for (let y = dk.r * B; y < dk.r * B + B && !dk.got; y++)
        for (let x = dk.c * B; x < dk.c * B + B; x++) if (g[y * W + x] === T.WATER || g[y * W + x] === T.MUD) { dk.got = true; break; }
    }
    if (s.groupsOpen) settleGates(s);
    s.lastMoves = moves;
    s.still = moves === 0 ? s.still + 1 : 0;
    return moves;
  }

  function touches(s, x, y, type, r = 1) {
    const { W, H, g } = s;
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && nx < W && ny >= 0 && ny < H && g[ny * W + nx] === type) return true;
    }
    return false;
  }

  // 以细格坐标挖一个圆
  function digAt(s, px, py, r = BRUSH) {
    let n = 0;
    const x0 = Math.max(0, Math.floor(px - r)), x1 = Math.min(s.W - 1, Math.ceil(px + r));
    const y0 = Math.max(0, Math.floor(py - r)), y1 = Math.min(s.H - 1, Math.ceil(py + r));
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const i = y * s.W + x;
      if (s.g[i] === T.DIRT && (x + 0.5 - px) ** 2 + (y + 0.5 - py) ** 2 <= r * r) { s.g[i] = T.EMPTY; n++; }
    }
    if (n) s.still = 0;
    return n;
  }
  function digLine(s, x0, y0, x1, y1, r) {
    const steps = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
    let n = 0;
    for (let k = 0; k <= steps; k++) n += digAt(s, x0 + (x1 - x0) * k / steps, y0 + (y1 - y0) * k / steps, r);
    return n;
  }
  // 笔画用地图块坐标（可带小数）
  function digStroke(s, pts, r) {
    for (let k = 0; k < pts.length; k++) {
      const [ax, ay] = pts[k], [bx, by] = pts[Math.min(k + 1, pts.length - 1)];
      digLine(s, ax * B, ay * B, bx * B, by * B, r);
    }
  }
  function digAll(s) { for (let i = 0; i < s.g.length; i++) if (s.g[i] === T.DIRT) s.g[i] = T.EMPTY; s.still = 0; }

  const inPlay = s => s.total - s.bath - s.lost - s.absorbed - s.spoiled;
  const muddy = s => s.dirty > s.dirtyMax;                       // 泥水进了浴缸
  const won = s => s.bath >= s.target && !muddy(s);
  const hopeless = s => muddy(s) || s.bath + inPlay(s) < s.target;

  // 跑到水静止（或上限）
  function settle(s, maxTicks = 8000, stillTicks = 40) {
    for (let t = 0; t < maxTicks; t++) { step(s); if (s.still >= stillTicks) break; }
    return s;
  }

  return { VERSION, B, T, BRUSH, create, step, digAt, digLine, digStroke, digAll, settle, inPlay, won, hopeless, muddy };
});
