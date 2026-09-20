// 火眼金睛 v0.4 玩法引擎：纯状态，不碰 DOM，便于 node 单测。
export const LEVEL_LABELS = ['基础', '初阶', '中阶', '高阶', '超凡', '宗师'];
export const DIFF_COUNT = [3, 5, 6, 7, 8, 9];
export const FROZEN = { roundMs: 120000, pointsBefore: 10, pointsAfter: 5, upgradeStreak: 2, hintMs: 10000, minHit: 0.09 };

export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// 命中框：登记的 hit 区域，至少扩到 minHit（620 图约 56 设计像素），再按试玩百分比缩放；中心不变。
export function hitBoxes(answer, scale = 1, minHit = FROZEN.minHit) {
  return answer.hits.map(([x0, y0, x1, y1]) => {
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const w = Math.max(x1 - x0, minHit) * scale, h = Math.max(y1 - y0, minHit) * scale;
    return [cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2];
  });
}

export function createEngine({ bank, seed = Date.now(), settings = {} }) {
  const rng = mulberry32(seed);
  const s = { hintPct: 100, hitPct: 100, upgradePct: 100, lock: null, ...settings };
  let st;

  const upgradeNeed = () => Math.max(1, Math.round(FROZEN.upgradeStreak * s.upgradePct / 100));
  const hintMs = () => FROZEN.hintMs * s.hintPct / 100;

  function reset() {
    st = { level: s.lock ?? 1, score: 0, streak: 0, highest: s.lock ?? 1, q: null, found: new Set(), answerShown: false,
      before: 0, after: 0, idle: 0, hint: false, settled: null, used: new Set(), history: [], lastUsedAt: {}, seq: 0,
      levels: LEVEL_LABELS.map((label, i) => ({ level: i + 1, label, score: 0, clears: 0, errors: 0 })), ended: false };
    load(st.level);
  }

  function pick(level) {
    const pool = bank.filter(q => q.level === level);
    const fresh = pool.filter(q => !st.used.has(q.id));
    if (fresh.length) return { q: fresh[Math.floor(rng() * fresh.length)], repeat: false };
    // 题库耗尽（用户 2026-09-18 同意的试玩期临时做法）：重复最久未出的题，仅记日志，不向玩家提示
    const oldest = [...pool].sort((a, b) => (st.lastUsedAt[a.id] ?? -1) - (st.lastUsedAt[b.id] ?? -1))[0];
    return { q: oldest, repeat: true };
  }

  function load(level) {
    const { q, repeat } = pick(level);
    st.level = level; st.highest = Math.max(st.highest, level);
    st.q = q; st.found = new Set(); st.answerShown = false; st.before = 0; st.after = 0; st.idle = 0; st.hint = false; st.settled = null;
    st.used.add(q.id); st.lastUsedAt[q.id] = st.seq++;
    st.history.push({ id: q.id, level, repeat, answerUsed: false, before: 0, after: 0, misses: 0, completed: false });
    if (repeat) console.warn(`[火眼金睛] L${level} 新题已用完，重复出题 ${q.id}`);
  }

  const cur = () => st.history[st.history.length - 1];

  function locate(x, y) {
    let best = null, bestD = Infinity;
    for (const a of st.q.answers) {
      for (const [x0, y0, x1, y1] of hitBoxes(a, s.hitPct / 100)) {
        if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
          // 优先未找到的；重叠时取中心最近
          const d = Math.hypot(x - (x0 + x1) / 2, y - (y0 + y1) / 2) + (st.found.has(a.id) ? 10 : 0);
          if (d < bestD) { bestD = d; best = a; }
        }
      }
    }
    return best;
  }

  function click(x, y) {
    if (st.ended || st.settled) return { type: 'ignored' };
    const a = locate(x, y);
    if (!a) { st.levels[st.level - 1].errors++; cur().misses++; return { type: 'miss' }; }
    if (st.found.has(a.id)) return { type: 'dup', id: a.id };
    const award = st.answerShown ? FROZEN.pointsAfter : FROZEN.pointsBefore;
    st.found.add(a.id); st.score += award; st.levels[st.level - 1].score += award;
    if (st.answerShown) { st.after++; cur().after++; } else { st.before++; cur().before++; }
    st.idle = 0; st.hint = false;
    const res = { type: 'found', id: a.id, award, complete: st.found.size === st.q.answers.length };
    if (res.complete) res.settle = settle();
    return res;
  }

  // 完成当前题：结算升降级，但等级在换题时才生效
  function settle() {
    const h = cur(); h.completed = true; h.answerUsed = st.answerShown;
    st.levels[st.level - 1].clears++;
    let next = st.level;
    if (st.answerShown) { st.streak = 0; next = Math.max(1, st.level - 1); }
    else if (++st.streak >= upgradeNeed()) { st.streak = 0; next = Math.min(6, st.level + 1); }
    if (s.lock) next = s.lock;
    if (next !== st.level) st.streak = 0;
    st.settled = { next, levelUp: next > st.level, levelDown: next < st.level };
    return st.settled;
  }

  function advance() {
    if (!st.settled || st.ended) return;
    load(s.lock ?? st.settled.next);
  }

  function showAnswer() {
    if (st.ended || st.settled || st.answerShown) return false;
    st.answerShown = true; st.streak = 0; st.hint = false; cur().answerUsed = true;
    return true;
  }

  // 只在真正作答时调用（暂停、反馈、升级提示期间不调用）
  function tick(ms) {
    if (st.ended || st.settled || st.answerShown) return st.hint;
    st.idle += ms; if (st.idle >= hintMs()) st.hint = true;
    return st.hint;
  }

  function end() { st.ended = true; }

  function result() {
    return { totalScore: st.score, levels: st.levels.map(l => ({ ...l })), highestLevel: st.highest,
      completed: st.history.filter(h => h.completed).length,
      beforeHits: st.history.reduce((n, h) => n + h.before, 0), afterHits: st.history.reduce((n, h) => n + h.after, 0),
      questions: st.history.map(h => ({ ...h })), repeats: st.history.filter(h => h.repeat).map(h => `L${h.level}:${h.id}`) };
  }

  function setSettings(p) { Object.assign(s, p); if ('lock' in p && p.lock) st.streak = 0; }

  // 试玩面板用：直接出指定题（等级跟随该题），或换本级下一题。不计完成、不动分数。
  function goto(id) {
    const q = bank.find(x => x.id === id);
    if (!q || st.ended) return false;
    st.settled = null; st.level = q.level; st.highest = Math.max(st.highest, q.level);
    const before = st.used.has(q.id);
    st.used.add(q.id); st.lastUsedAt[q.id] = st.seq++;
    st.q = q; st.found = new Set(); st.answerShown = false; st.before = 0; st.after = 0; st.idle = 0; st.hint = false;
    st.history.push({ id: q.id, level: q.level, repeat: before, answerUsed: false, before: 0, after: 0, misses: 0, completed: false, forced: true });
    return true;
  }
  function skip() { if (st.ended) return false; st.settled = null; load(s.lock ?? st.level); return true; }

  reset();
  return { reset, click, showAnswer, tick, advance, end, result, setSettings, locate, goto, skip,
    get state() { return st; }, get settings() { return { ...s }; }, upgradeNeed, hintMs };
}
