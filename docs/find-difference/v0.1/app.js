import { createGameShell } from './public-template/template.js';
import { BANK } from './bank.js';
import { createEngine, FROZEN, DIFF_COUNT, hitBoxes } from './engine.js';

const params = new URLSearchParams(location.search);
const DEBUG = params.get('debug') === '1';
const seed = Number(params.get('seed')) || Math.floor(Math.random() * 1e9);
const COMPLETE_DELAY_MS = 700;   // 最后一处浮字可见后再出公共成功提示（停表）
const DRAG_PX = 16;               // 按下到抬起移动超过此距离视为拖动，不算作答

const $ = s => document.querySelector(s);
let api, engine, remaining = FROZEN.roundMs, pendingComplete = 0, speed = 1, root, showBoxes = false;
const LEVEL_NAME = ['基础', '初阶', '中阶', '高阶', '超凡', '宗师'];

// —— 资源就绪后再开局：先等第一题的两张图，其余后台预载 ——
const loading = $('#loading');
const preload = src => new Promise((ok, bad) => {
  const img = new Image(); img.onload = () => ok(src); img.onerror = () => bad(Error('图片加载失败 ' + src)); img.src = src;
});

engine = createEngine({ bank: BANK, seed });
await Promise.all([engine.state.q.a, engine.state.q.b].map(preload))
  .catch(e => { loading.textContent = e.message; throw e; });
loading.remove();
Promise.all(BANK.flatMap(q => [q.a, q.b]).map(src => preload(src).catch(e => console.warn('[火眼金睛] ' + e.message))));

window.__fd = DEBUG ? { engine: () => engine, api: () => api, BANK, hitBoxes, seed } : undefined;

const surfaceHtml = `<section class="fd-surface">
  <div class="fd-board">${[0, 1].map(i => `<div class="fd-picture" data-side="${i}"><img alt="${i ? '对比图' : '原图'}" draggable="false"><div class="fd-layer"></div></div>`).join('')}</div>
  <div class="fd-controls"><div class="fd-progress"><span class="fd-track"><i class="fd-fill"></i></span><strong class="fd-count">0 / 3</strong></div>
  <div class="fd-answer-wrap"><button class="fd-answer" type="button">查看答案</button><p class="fd-hint" aria-live="polite">可以点“查看答案”</p></div></div></section>`;

function renderQuestion() {
  const { q } = engine.state;
  root.querySelectorAll('.fd-picture').forEach((pic, i) => {
    pic.querySelector('img').src = i ? q.b : q.a;
    pic.querySelector('.fd-layer').replaceChildren();
  });
  root.querySelector('.fd-surface').dataset.qid = q.id;
  renderStatus();
}

function markEl(a, kind) {
  const [x0, y0, x1, y1] = a.rect, el = document.createElement('span');
  el.className = 'fd-mark ' + kind; el.dataset.id = a.id;
  el.style.cssText = `left:${x0 * 100}%;top:${y0 * 100}%;width:${(x1 - x0) * 100}%;height:${(y1 - y0) * 100}%`;
  if (kind === 'found') el.innerHTML = '<b aria-hidden="true">✓</b>';
  return el;
}

function renderMarks() {
  const { q, found, answerShown } = engine.state;
  root.querySelectorAll('.fd-layer').forEach(layer => {
    layer.querySelectorAll('.fd-mark,.fd-hitbox').forEach(n => n.remove());
    q.answers.forEach(a => {
      if (found.has(a.id)) layer.append(markEl(a, 'found'));
      else if (answerShown) layer.append(markEl(a, 'answer'));
      if (showBoxes) {   // 试玩面板：画出真实判定范围，便于核对“点不到”的位置
        const [x0, y0, x1, y1] = hitBoxes(a, engine.settings.hitPct / 100)[0], el = document.createElement('span');
        el.className = 'fd-hitbox';
        el.style.cssText = `left:${x0 * 100}%;top:${y0 * 100}%;width:${(x1 - x0) * 100}%;height:${(y1 - y0) * 100}%`;
        layer.append(el);
      }
    });
  });
}

function renderStatus() {
  const { q, found, answerShown, hint } = engine.state, n = q.answers.length;
  root.querySelector('.fd-fill').style.width = (found.size / n * 100) + '%';
  root.querySelector('.fd-count').textContent = `${found.size} / ${n}`;
  const btn = root.querySelector('.fd-answer');
  btn.textContent = answerShown ? '答案已显示' : '查看答案'; btn.classList.toggle('shown', answerShown);
  root.querySelector('.fd-hint').classList.toggle('on', hint && !answerShown);
  renderMarks(); renderPanelStatus();
}

function floatScore(pic, x, y, award) {
  const el = document.createElement('span');
  el.className = 'fd-float'; el.textContent = `+${award} 分`;
  // 贴边时往里收，避免被图片边缘裁掉
  el.style.left = Math.min(0.88, Math.max(0.12, x)) * 100 + '%'; el.style.top = Math.max(0.1, y) * 100 + '%';
  pic.querySelector('.fd-layer').append(el);
  el.addEventListener('animationend', () => el.remove());
}

function onTap(pic, e) {
  if (!api.isInteractive() || pendingComplete) return;
  const r = pic.querySelector('img').getBoundingClientRect();   // 已含公共外壳缩放
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  if (x < 0 || x > 1 || y < 0 || y > 1) return;
  const res = engine.click(x, y);
  if (DEBUG) console.debug('[火眼金睛] tap', { x: +x.toFixed(4), y: +y.toFixed(4), ...res });
  if (res.type !== 'found') { renderPanelStatus(); return; }
  api.update({ score: engine.state.score });
  floatScore(pic, x, y, res.award);
  renderStatus();
  if (res.complete) pendingComplete = COMPLETE_DELAY_MS;
}

function completeNow() {
  const { next, levelUp } = engine.state.settled;
  const ok = api.feedback({ correct: true, score: engine.state.score, level: next, levelUp,
    onComplete: () => { engine.advance(); renderQuestion(); } });
  if (!ok) console.warn('[火眼金睛] 公共反馈未接受（可能已到时）');
}

// —— 唯一计时：external，只在 game 状态走表；反馈/升级/暂停停表（公共规范第1节 U4） ——
let last = performance.now();
function loop(now) {
  const dt = Math.min(100, now - last) * speed; last = now;
  const state = api?.getState().state;
  if (state === 'game' && !engine.state.ended) {
    if (pendingComplete) {
      pendingComplete -= dt;
      if (pendingComplete <= 0) { pendingComplete = 0; completeNow(); }
    } else {
      remaining = Math.max(0, remaining - dt);
      const hintBefore = engine.state.hint;
      if (engine.tick(dt) !== hintBefore) renderStatus();
      api.update({ remainingMs: remaining });
      if (remaining === 0) finishRound();
    }
  }
  requestAnimationFrame(loop);
}

function finishRound() {
  engine.end(); pendingComplete = 0;
  const r = engine.result();
  window.__fdLastResult = r;
  console.info('[火眼金睛] 本局结果', JSON.stringify(r));
  api.finish({ totalScore: r.totalScore, levels: r.levels });
  renderPanelStatus();
}

createGameShell({
  mount: $('#mount'), mode: 'playtest',
  config: { title: '火眼金睛', clock: 'external', feedbackDurationMs: 1500, templateVersion: '1.2.1' },
  adapter: {
    mount({ container, api: a }) {
      api = a; root = container; container.innerHTML = surfaceHtml;
      container.querySelectorAll('.fd-picture').forEach(pic => {
        let down = null;
        pic.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, id: e.pointerId }; });
        pic.addEventListener('pointerup', e => {
          if (!down || down.id !== e.pointerId) return;
          const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y); down = null;
          if (moved <= DRAG_PX) onTap(pic, e);
        });
        pic.addEventListener('pointercancel', () => { down = null; });
      });
      container.querySelector('.fd-answer').addEventListener('click', () => {
        if (!api.isInteractive() || pendingComplete) return;
        if (engine.showAnswer()) renderStatus();
      });
    },
    start() {
      remaining = FROZEN.roundMs; pendingComplete = 0; engine.reset();
      api.update({ score: 0, level: engine.state.level, remainingMs: remaining });
      renderQuestion();
    },
    pause() {}, resume() { last = performance.now(); },
    getResult: () => engine.result(),
  },
});
requestAnimationFrame(loop);

// —— 试玩设置面板 ——
const pct = id => Number($('#' + id).value);
$('#pick').innerHTML = BANK.map(q => `<option value="${q.id}">L${q.level} ${LEVEL_NAME[q.level - 1]}｜${q.id} ${q.name}（${q.answers.length}处）${q.pendingLevel ? ' ※等级待定' : ''}</option>`).join('');

function applyPanel() {
  const lockVal = $('#lock').value;
  engine.setSettings({ lock: lockVal === 'auto' ? null : Number(lockVal), hintPct: pct('hintPct'), hitPct: pct('hitPct'), upgradePct: pct('upgradePct') });
  $('#hintPct-v').textContent = `${pct('hintPct')}%（${engine.hintMs() / 1000} 秒）`;
  $('#hitPct-v').textContent = `${pct('hitPct')}%`;
  $('#upgradePct-v').textContent = `${pct('upgradePct')}%（连续 ${engine.upgradeNeed()} 题）`;
  if (showBoxes) renderMarks();
  renderPanelStatus();
}
function renderPanelStatus() {
  if (!engine?.state?.q) return;
  const st = engine.state, cfg = engine.settings, h = st.history.at(-1);
  const std = DIFF_COUNT[st.level - 1], real = st.q.answers.length;
  $('#setting-summary').textContent = `${cfg.lock ? '锁定 L' + cfg.lock : '自动'} · 当前 L${st.level}（本题 ${real} 处${real === std ? '' : '，六级表为 ' + std + ' 处'}） · 提醒${cfg.hintPct}% · 判定${cfg.hitPct}% · 升级${cfg.upgradePct}%`;
  $('#live-status').textContent = `本题 ${st.q.id} ${st.q.name}（${st.found.size}/${st.q.answers.length}${st.answerShown ? '，已看答案' : ''}${h?.repeat ? '，重复题' : ''}） · 连续未看答案 ${st.streak}/${engine.upgradeNeed()} · 剩余 ${(remaining / 1000).toFixed(0)} 秒 · 得分 ${st.score}`
    + (DEBUG ? ` · seed=${seed} 已出=${st.history.map(x => x.id + (x.repeat ? '*' : '')).join(',')}` : '');
  // 下拉框不跟着当前题自动跳，否则会覆盖刚选好的题；当前题看上面这行状态
}
// 面板强制换题：不计完成、不结算、不改分数
function forceQuestion(fn) {
  if (engine.state.ended || !api.isInteractive()) return;
  pendingComplete = 0;
  if (!fn()) return;
  api.update({ level: engine.state.level });
  renderQuestion();
}
['lock', 'hintPct', 'hitPct', 'upgradePct'].forEach(id => $('#' + id).addEventListener('input', applyPanel));
$('#defaults').addEventListener('click', () => {
  $('#lock').value = 'auto'; ['hintPct', 'hitPct', 'upgradePct'].forEach(id => { $('#' + id).value = 100; }); applyPanel();
});
$('#go').addEventListener('click', () => forceQuestion(() => engine.goto($('#pick').value)));
$('#skip').addEventListener('click', () => forceQuestion(() => engine.skip()));
$('#restart').addEventListener('click', () => api.start(true));
$('#speed').addEventListener('change', e => { speed = Number(e.target.value); });
$('#jump5').addEventListener('click', () => { remaining = Math.min(remaining, 5000); });
$('#showbox').addEventListener('click', e => {
  showBoxes = !showBoxes;
  e.currentTarget.textContent = showBoxes ? '隐藏判定框' : '显示所有判定框';
  renderMarks();
});
setInterval(renderPanelStatus, 500);
applyPanel();
