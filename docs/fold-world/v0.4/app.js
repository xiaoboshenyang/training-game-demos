import {createGameShell, LEVELS} from './public-template/template.js';

// 本页只处理整局。关节、碰撞、提示路径和拖动均由 game-core.js 处理。
const FULL_POINTS = [40, 48, 56, 64, 72, 80];
const PROMOTION_NEEDS = [2, 2, 2, 3, 3];
const ROUND_MS = 120_000;

const elements = {
  mount: document.querySelector('#gameMount'),
  mode: document.querySelector('#levelMode'),
  scale: document.querySelector('#scalePercent'),
  reminder: document.querySelector('#reminderPercent'),
  scaleValue: document.querySelector('#scaleValue'),
  reminderValue: document.querySelector('#reminderValue'),
  readout: document.querySelector('#reviewReadout'),
  reset: document.querySelector('#resetReview'),
};

let bank;
let images;
let shell;
let core;
let session;
let paused = false;
let lastFrameAt = performance.now();
let lastShellUpdateAt = 0;
let lastStatusHtml = '';

const setting = (input) => Number(input.value);
const lockedLevel = () => elements.mode.value === 'auto' ? null : Number(elements.mode.value);
const levelName = (level) => `L${level} ${LEVELS[level - 1]}`;

function newStatistics() {
  return LEVELS.map((label, i) => ({
    level: i + 1,
    label,
    score: 0,
    clears: 0,
    errors: 0,
  }));
}

function freshSession() {
  return {
    phase: 'system', // answer 走表；完整图展示、反馈、暂停和结束停表。
    remainingMs: ROUND_MS,
    score: 0,
    level: lockedLevel() ?? 1,
    highestLevel: lockedLevel() ?? 1,
    independentRun: 0,
    helpRun: 0,
    current: null,
    usedImages: new Set(),
    previousCategory: null,
    completed: 0,
    skipped: 0,
    stats: newStatistics(),
    endReason: '',
  };
}

function displaySettings() {
  elements.scaleValue.textContent = `${setting(elements.scale)}%`;
  elements.reminderValue.textContent = `${setting(elements.reminder)}%`;
  core?.setDisplayScale(setting(elements.scale));
  core?.setReminderDelay(setting(elements.reminder));
  displayStatus();
}

function displayStatus() {
  if (!session) return;
  const mode = lockedLevel() == null ? '自动' : `锁定 ${levelName(lockedLevel())}`;
  const current = session.current ? `当前题：${session.current.item.img}（${levelName(session.current.level)}）` : '当前无题';
  const waiting = session.current && lockedLevel() != null && lockedLevel() !== session.current.level ? '；等级变更下题生效' : '';
  const source = session.phase === 'ended' && session.endReason ? `<br>${session.endReason}` : '';
  const rows = session.stats.map(s => `${levelName(s.level)}：${s.score} 分，过关 ${s.clears}，换题 ${s.errors}`).join('<br>');
  const html = `模式：${mode}${waiting}<br>${current}<br>生效参数：图形 ${setting(elements.scale)}% · 提醒 ${setting(elements.reminder)}%<br>本局 ${session.score} 分 · 过关 ${session.completed} · 换题 ${session.skipped}<br>最高 ${levelName(session.highestLevel)} · 剩余 ${Math.ceil(session.remainingMs / 1000)} 秒${source}<details><summary>各级统计</summary>${rows}</details>`;
  if (html === lastStatusHtml) return;
  const detailsOpen = elements.readout.querySelector('details')?.open;
  lastStatusHtml = html;
  elements.readout.innerHTML = html;
  if (detailsOpen) elements.readout.querySelector('details').open = true;
}

function updateShell(force = false) {
  if (!session || !shell) return;
  const now = performance.now();
  if (!force && now - lastShellUpdateAt < 100) return;
  lastShellUpdateAt = now;
  shell.update({
    remainingMs: session.remainingMs,
    score: session.score,
    level: session.level,
  });
  displayStatus();
}

function selectQuestion(level) {
  const pool = bank.levels[level - 1]?.items ?? [];
  const fresh = pool.filter(item => !session.usedImages.has(item.img));
  if (!fresh.length) return null;
  const differentCategory = fresh.filter(item => item.cat !== session.previousCategory);
  const choices = differentCategory.length ? differentCategory : fresh;
  return choices[Math.floor(Math.random() * choices.length)];
}

function nextQuestion() {
  if (!session || session.phase === 'ended') return;
  if (session.remainingMs <= 0) { endSession(); return; }

  const forced = lockedLevel();
  if (forced != null && forced !== session.level) {
    session.level = forced;
    session.independentRun = 0;
    session.helpRun = 0;
  }
  session.highestLevel = Math.max(session.highestLevel, session.level);
  const item = selectQuestion(session.level);
  if (!item) {
    session.endReason = '本局该等级的不同图片已用完。';
    endSession();
    return;
  }

  session.usedImages.add(item.img);
  session.previousCategory = item.cat;
  session.current = {
    item,
    level: session.level,
    wasLocked: forced != null,
    hinted: false,
    settled: false,
    revealReady: false,
  };
  session.phase = 'answer';
  core.setLocked(false);
  core.setDisplayScale(setting(elements.scale));
  core.setReminderDelay(setting(elements.reminder));
  core.load(item);
  lastFrameAt = performance.now();
  updateShell(true);
}

function onSolved() {
  if (!session || session.phase !== 'answer' || paused || shell?.getState().state !== 'game') return;
  const question = session.current;
  if (!question || question.settled) return;
  session.phase = 'system';
  core.setLocked(true);
  Promise.resolve(core.revealSolved()).then(() => {
    if (!session || session.current !== question || session.phase !== 'system' || question.settled) return;
    if (paused) { question.revealReady = true; return; }
    settle('solved', true);
  }).catch(showError);
}

function getResult() {
  return {totalScore: session?.score ?? 0, levels: session?.stats ?? newStatistics()};
}

function endSession() {
  if (!session || session.phase === 'ended') return;
  session.phase = 'ended';
  session.remainingMs = 0;
  core?.setLocked(true);
  core?.pause();
  updateShell(true);
  shell?.finish(getResult());
  if (session.endReason) {
    const heading = elements.mount.querySelector('.playtest-panel h2');
    if (heading) heading.textContent = '本级题目已用完';
  }
}

function advanceProgress(helped) {
  const question = session.current;
  if (question.wasLocked) {
    session.independentRun = 0;
    session.helpRun = 0;
    return false;
  }
  if (helped) {
    session.helpRun += 1;
    session.independentRun = 0;
    if (session.helpRun >= 2) {
      if (session.level > 1) session.level -= 1;
      session.helpRun = 0;
      session.independentRun = 0;
    }
    return false;
  }
  session.independentRun += 1;
  session.helpRun = 0;
  const threshold = PROMOTION_NEEDS[session.level - 1];
  if (threshold && session.independentRun >= threshold) {
    session.level += 1;
    session.independentRun = 0;
    session.helpRun = 0;
    session.highestLevel = Math.max(session.highestLevel, session.level);
    return true;
  }
  if (session.level === 6) session.independentRun = 0;
  return false;
}

function settle(kind, afterReveal = false) {
  const expectedPhase = afterReveal && kind === 'solved' ? 'system' : 'answer';
  if (!session || session.phase !== expectedPhase || paused || shell?.getState().state !== 'game') return;
  const question = session.current;
  if (!question || question.settled) return;
  question.settled = true;
  session.phase = 'system';
  core.setLocked(true);

  const solved = kind === 'solved';
  const helped = !solved || question.hinted;
  const award = solved ? FULL_POINTS[question.level - 1] / (question.hinted ? 2 : 1) : 0;
  const gradeStats = session.stats[question.level - 1];
  session.score += award;
  gradeStats.score += award;
  if (solved) {
    gradeStats.clears += 1;
    session.completed += 1;
  } else {
    gradeStats.errors += 1;
    session.skipped += 1;
  }
  const levelUp = advanceProgress(helped);
  updateShell(true);

  const accepted = shell.feedback({
    correct: solved,
    score: session.score,
    scoreDelta: award || undefined,
    level: session.level,
    levelUp,
    onComplete: () => {
      if (!session || session.phase === 'ended') return;
      nextQuestion();
    },
  });
  if (!accepted) {
    // 公共层已进入结束状态时，不让旧题回调开启下一题。
    endSession();
  }
}

function onHint() {
  if (!session || session.phase !== 'answer' || !session.current) return;
  session.current.hinted = true;
  displayStatus();
}

function onStart({replay}) {
  paused = false;
  session = freshSession();
  core.resume();
  nextQuestion();
  lastFrameAt = performance.now();
  updateShell(true);
}

function frame(now) {
  const elapsed = Math.max(0, now - lastFrameAt);
  lastFrameAt = now;
  if (session && shell && !paused && shell.getState().state === 'game' && session.phase === 'answer') {
    session.remainingMs = Math.max(0, session.remainingMs - elapsed);
    if (session.remainingMs <= 0) {
      endSession();
    } else {
      updateShell();
    }
  }
  requestAnimationFrame(frame);
}

function showError(error) {
  console.error(error);
  if (shell) shell.destroy();
  elements.mount.innerHTML = `<div class="load-error">本地试玩加载失败。请查看浏览器控制台，确认资源文件齐全。</div>`;
  elements.readout.textContent = `错误：${error?.message || error}`;
}

async function boot() {
  if (!window.FoldGameCore?.create) throw new Error('拼块玩法脚本未加载');
  const [bankResponse, imageResponse] = await Promise.all([
    fetch('./assets/bank.json'),
    fetch('./assets/images.json'),
  ]);
  if (!bankResponse.ok || !imageResponse.ok) throw new Error('题库或图片索引读取失败');
  [bank, images] = await Promise.all([bankResponse.json(), imageResponse.json()]);
  if (!Array.isArray(bank.levels) || bank.levels.length !== 6 || !Array.isArray(images)) {
    throw new Error('题库格式与六级规则不符');
  }

  const adapter = {
    mount({container, api}) {
      shell = api;
      core = window.FoldGameCore.create({
        container,
        images,
        onSolved,
        onSkip: () => settle('skip'),
        onHint,
        onMove: () => {},
      });
      displaySettings();
    },
    start: onStart,
    pause() { paused = true; core?.pause(); },
    resume() {
      paused = false;
      core?.resume();
      lastFrameAt = performance.now();
      if (session?.phase === 'system' && session.current?.revealReady && !session.current.settled) {
        session.current.revealReady = false;
        settle('solved', true);
      }
    },
    getResult,
    destroy() { core?.destroy(); core = null; },
  };
  shell = createGameShell({
    mount: elements.mount,
    config: {title: '万象折纸', icon: '🦊', clock: 'external', feedbackDurationMs: 1500},
    adapter,
    mode: 'playtest',
  });
  lastFrameAt = performance.now();
  requestAnimationFrame(frame);
}

for (const input of [elements.scale, elements.reminder]) {
  input.addEventListener('input', displaySettings);
}
elements.mode.addEventListener('change', displayStatus);
elements.reset.addEventListener('click', () => {
  elements.mode.value = 'auto';
  elements.scale.value = '100';
  elements.reminder.value = '100';
  displaySettings();
});
displaySettings();
boot().catch(showError);
