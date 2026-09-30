// 同一套管道截面适用于直线、转弯、三通；题目只提供中心线坐标。
const layers = [
  { width: 80, color: 'rgba(94, 50, 21, .26)', shadow: 7 },
  { width: 73, color: '#754727' },
  { width: 69, color: '#ad7541' },
  { width: 62, color: '#f4d7ad' },
  { width: 58, color: '#d2a16e' },
  { width: 52, color: '#60402d' },
  { width: 45, color: '#38251e' },
];

function points(edge) {
  return edge.pts.map(([x, y]) => ({ x, y }));
}

function path(ctx, pts) {
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
}

function paint(ctx, routes, cap = 'round') {
  ctx.save();
  ctx.lineCap = cap;
  ctx.lineJoin = 'round';
  // 全部边先画同一层，再画下一层；岔口不会被后一条边的外框切断。
  for (const layer of layers) {
    ctx.lineWidth = layer.width;
    ctx.strokeStyle = layer.color;
    ctx.shadowColor = layer.shadow ? 'rgba(65, 31, 12, .25)' : 'transparent';
    ctx.shadowBlur = layer.shadow || 0;
    for (const pts of routes) { path(ctx, pts); ctx.stroke(); }
  }
  ctx.restore();
}

// 不同边的内部正交相交、且并非共享端点时，是“跨越”而不是岔口。
export function findCrossings(edges) {
  const found = new Map();
  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      const a = points(edges[i]), b = points(edges[j]);
      for (let ai = 1; ai < a.length; ai++) for (let bi = 1; bi < b.length; bi++) {
        const a0 = a[ai - 1], a1 = a[ai], b0 = b[bi - 1], b1 = b[bi];
        const aH = a0.y === a1.y, bH = b0.y === b1.y;
        if (aH === bH) continue;
        const h0 = aH ? a0 : b0, h1 = aH ? a1 : b1;
        const v0 = aH ? b0 : a0, v1 = aH ? b1 : a1;
        const x = v0.x, y = h0.y;
        const insideH = x > Math.min(h0.x, h1.x) && x < Math.max(h0.x, h1.x);
        const insideV = y > Math.min(v0.y, v1.y) && y < Math.max(v0.y, v1.y);
        if (!insideH || !insideV) continue;
        const overHorizontal = bH; // 数据中后绘制的边跨在前一条边上方。
        found.set(`${x},${y}`, { x, y, overHorizontal });
      }
    }
  }
  return [...found.values()];
}

export function drawTrackNetwork(ctx, edges) {
  paint(ctx, edges.map(points));
  for (const c of findCrossings(edges)) {
    ctx.clearRect(c.x - 43, c.y - 43, 86, 86);
    const segment = c.overHorizontal
      ? [{ x: c.x - 58, y: c.y }, { x: c.x + 58, y: c.y }]
      : [{ x: c.x, y: c.y - 58 }, { x: c.x, y: c.y + 58 }];
    paint(ctx, [segment], 'butt');
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 240, 209, .75)';
    ctx.lineWidth = 3;
    if (c.overHorizontal) {
      for (const dy of [-30, 30]) {
        ctx.beginPath(); ctx.moveTo(c.x - 39, c.y + dy); ctx.lineTo(c.x + 39, c.y + dy); ctx.stroke();
      }
    } else {
      for (const dx of [-30, 30]) {
        ctx.beginPath(); ctx.moveTo(c.x + dx, c.y - 39); ctx.lineTo(c.x + dx, c.y + 39); ctx.stroke();
      }
    }
    ctx.restore();
  }
}
