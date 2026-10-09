const LEVEL_NAMES = ['基础', '初阶', '中阶', '高阶', '超凡', '宗师'];
const LEVELS = [
  // kinds 摊上几样；items 篮里几件；min/max 单价；sec 看价签秒数；score 答对得分；up 本级答对几题升级
  // unbought 摊上至少有一样不买；dup 至少一样买两件；moveStall 盖上后摊位换位置；near 价钱挨着（连续数）
  { lv: 1, kinds: 2, items: 2, min: 1, max: 5, sec: 5,  score: 24, up: 2, unbought: false, dup: false, moveStall: false, near: false, newDim: '学会怎么玩' },
  { lv: 2, kinds: 3, items: 2, min: 1, max: 5, sec: 6,  score: 29, up: 2, unbought: true,  dup: false, moveStall: false, near: false, newDim: '摊上有不买的' },
  { lv: 3, kinds: 3, items: 3, min: 1, max: 5, sec: 6,  score: 34, up: 2, unbought: true,  dup: true,  moveStall: false, near: false, newDim: '同一样买两件' },
  { lv: 4, kinds: 4, items: 3, min: 1, max: 9, sec: 8,  score: 38, up: 3, unbought: true,  dup: false, moveStall: false, near: false, newDim: '价钱变大（会进位）' },
  { lv: 5, kinds: 4, items: 4, min: 1, max: 9, sec: 8,  score: 43, up: 3, unbought: true,  dup: false, moveStall: true,  near: false, newDim: '盖上后摊位换位置' },
  { lv: 6, kinds: 5, items: 5, min: 1, max: 9, sec: 10, score: 48, up: 0, unbought: true,  dup: false, moveStall: true,  near: true,  newDim: '价钱挨得近' },
];
const ANSWER_SEC = 15;

const POOL = [{e:'carrot',n:'胡萝卜'}, {e:'tomato',n:'西红柿'}, {e:'eggplant',n:'茄子'}, {e:'corn',n:'玉米'}, {e:'cucumber',n:'黄瓜'}];

function randInt(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// 干扰项：记串价 swap（total - pA + pB）／漏算 omit／多算 extra／差一点 near（±1，兜底 ±2、±3…）
// 先随机定答案在四个数里从小到大排第几，再按两边挑，防“挑中间那个”蒙对。
function makeOptions(stall, basket, total) {
  const usedIdx = [...new Set(basket)];
  const cands = [];
  for (const a of usedIdx) {
    for (let b = 0; b < stall.length; b++) {
      if (b !== a) cands.push({ v: total - stall[a].price + stall[b].price, tag: 'swap' });
    }
    cands.push({ v: total - stall[a].price, tag: 'omit' });
    cands.push({ v: total + stall[a].price, tag: 'extra' });
  }
  cands.push({ v: total + 1, tag: 'near' }, { v: total - 1, tag: 'near' });
  const ok = v => Number.isInteger(v) && v > 0 && v !== total;
  const valid = shuffle(cands.filter(c => ok(c.v)));
  const need = { below: randInt(0, 3) };
  need.above = 3 - need.below;
  const side = v => (v < total ? 'below' : 'above');
  const chosen = [];
  const take = c => { chosen.push(c); need[side(c.v)]--; };
  const free = c => need[side(c.v)] > 0 && !chosen.some(x => x.v === c.v);
  for (const t of shuffle(['swap', 'count', 'near'])) {
    const c = valid.find(c => free(c) && (t === 'count' ? (c.tag === 'omit' || c.tag === 'extra') : c.tag === t));
    if (c) take(c);
  }
  for (const c of valid) if (chosen.length < 3 && free(c)) take(c);
  for (let k = 2; chosen.length < 3; k++) {
    if (need.below > 0 && total - k <= 0) { need.above += need.below; need.below = 0; }
    for (const v of [total - k, total + k]) {
      const c = { v, tag: 'near' };
      if (chosen.length < 3 && ok(v) && free(c)) take(c);
    }
  }
  const opts = shuffle([{ v: total, tag: 'answer' }].concat(chosen));
  return { options: opts.map(o => o.v), tags: opts.map(o => o.tag), answerIndex: opts.findIndex(o => o.tag === 'answer') };
}

function genPrices(L) {
  if (L.near) { // 价钱挨着：取一段连续的数，再打乱分给各样
    const start = randInt(L.min, L.max - L.kinds + 1);
    return shuffle(Array.from({ length: L.kinds }, (_, i) => start + i));
  }
  return shuffle(Array.from({ length: L.max - L.min + 1 }, (_, i) => L.min + i)).slice(0, L.kinds);
}

function genQuestion(lvNum) {
  const L = LEVELS[lvNum - 1];
  const goods = shuffle(POOL).slice(0, L.kinds);
  const prices = genPrices(L);
  const stall = goods.map((g, i) => ({ e: g.e, n: g.n, price: prices[i] }));
  // 篮子用几样：至少 2 样；有“不买的”时最多 kinds-1；有“买两件”时最多 items-1
  let hi = Math.min(L.kinds, L.items);
  if (L.unbought) hi = Math.min(hi, L.kinds - 1);
  if (L.dup) hi = Math.min(hi, L.items - 1);
  // 每样最多买两件（不出现 3 个苹果这种近似乘法），所以至少要用 items/2 样
  const k = randInt(Math.max(2, Math.ceil(L.items / 2)), hi);
  const kindIdx = shuffle(stall.map((_, i) => i)).slice(0, k);
  const counts = kindIdx.map(() => 1);
  for (let left = L.items - k; left > 0; left--) {
    const ones = counts.map((c, j) => (c < 2 ? j : -1)).filter(j => j >= 0);
    counts[ones[randInt(0, ones.length - 1)]]++;
  }
  // 篮子顺序：各样之间打乱（不跟摊位顺序），同一样的挨着放
  const basket = [];
  kindIdx.forEach((idx, j) => { for (let c = 0; c < counts[j]; c++) basket.push(idx); });
  const total = basket.reduce((s, i) => s + stall[i].price, 0);
  // 盖上后摊位换位置：给出新的摆放顺序，尽量每样都离开原位
  let order = stall.map((_, i) => i);
  if (L.moveStall) {
    let best = null, bestStay = 99;
    for (let t = 0; t < 30 && bestStay > 0; t++) {
      const o = shuffle(order); const stay = o.filter((v, i) => v === i).length;
      if (stay < bestStay) { best = o; bestStay = stay; }
    }
    order = best;
  }
  const o = makeOptions(stall, basket, total);
  return { lv: lvNum, stall, basket, total, order, options: o.options, tags: o.tags, answerIndex: o.answerIndex };
}

function createProgress() { return {level:1,prog:0,missStreak:0,score:0,maxLv:1}; }
function settle(progress,correct,lockedLevel=0) {
 const p={...progress},playedLevel=p.level,L=LEVELS[playedLevel-1],gain=correct?L.score:0;
 p.score+=gain;
 if(!lockedLevel) {
  if(correct){p.missStreak=0;if(L.up && ++p.prog>=L.up){p.level++;p.prog=0;}}
  else if(++p.missStreak>=2){p.missStreak=0;if(p.level>1)p.level--;p.prog=0;}
 } else {p.level=lockedLevel;p.prog=0;p.missStreak=0;}
 p.maxLv=Math.max(p.maxLv,p.level);
 return {progress:p,gain,playedLevel,levelUp:p.level>playedLevel};
}
function timing(level,memoPercent=100,answerPercent=100) {
 return {memoMs:LEVELS[level-1].sec*1000*memoPercent/100,answerMs:ANSWER_SEC*1000*answerPercent/100};
}
export {LEVEL_NAMES,LEVELS,POOL,ANSWER_SEC,genQuestion,createProgress,settle,timing};
