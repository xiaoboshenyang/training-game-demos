(function () {
'use strict';
const app = document.getElementById('app');
const dialog = document.getElementById('pause-dialog');
const ghost = document.getElementById('drag-ghost');
const names = {banana:'香蕉',apple:'苹果',bun:'包子',carrot:'胡萝卜',corn:'玉米',broccoli:'西兰花',fish:'鱼',eggplant:'茄子',egg:'鸡蛋',grapes:'葡萄',watermelon:'西瓜',pear:'梨'};
let engine = null, screen = 'intro', selected = null, tutorial = false, config = {level:1,locked:false};
let last = performance.now(), renderKey = '', countdown = 0, countdownLeft = 0, afterCountdown = null, drag = null, suppressClickUntil = 0, exitConfirm = false;
let idleMs=0, hintMs=0, baseInstruction='';
const foodBounds = {"banana":[88,291,1187,999,1254,1254],"apple":[158,113,1159,1147,1254,1254],"bun":[30,138,1224,1134,1254,1254],"carrot":[69,140,1221,1108,1254,1254],"corn":[38,193,1230,1144,1254,1254],"broccoli":[181,170,1074,1085,1254,1254],"fish":[67,350,1200,902,1254,1254],"eggplant":[120,164,1187,1126,1254,1254],"egg":[205,93,1051,1188,1254,1254],"grapes":[233,111,1171,1171,1254,1254],"watermelon":[139,123,1113,1131,1254,1254],"pear":[240,92,1110,1170,1254,1254]};
const picture = id => {
  if(!id)return '';
  const [x1,y1,x2,y2,width,height]=foodBounds[id];
  const pad=Math.max(x2-x1,y2-y1)*0.08;
  const viewBox=`${x1-pad} ${y1-pad} ${x2-x1+pad*2} ${y2-y1+pad*2}`;
  return `<svg class="food-art" viewBox="${viewBox}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${names[id] || id}"><image href="assets/foods/${id}.png" width="${width}" height="${height}" /></svg>`;
};
function intro() {
  engine = null; screen = 'intro'; selected = null;
  app.innerHTML = `<section class="intro"><div class="intro-content"><div class="eyebrow">记一记 · 放一放</div><h1>食物位置记忆</h1><div class="intro-foods">${['banana','apple','bun'].map(picture).join('')}</div><p>先记住食物原来的位置，<br>再从右侧选出食物，放回左边。</p><p>可以拖动，也可以先点食物、再点位置。</p><button id="start" class="primary">开始游戏</button><p class="result-note">先练习一轮，再开始 2 分钟挑战。</p><details><summary>试玩设置</summary><div class="settings"><label>起始等级 <select id="start-level">${[1,2,3,4,5,6].map(n=>`<option value="${n}" ${n===config.level?'selected':''}>L${n}</option>`).join('')}</select></label><label><input id="locked" type="checkbox" ${config.locked?'checked':''}> 固定等级</label></div></details></div></section>`;
  document.getElementById('start').onclick = () => { config={level:Number(document.getElementById('start-level').value),locked:document.getElementById('locked').checked}; startCountdown(startTutorial); };
}
function startCountdown(next) { screen='countdown'; countdown=3; countdownLeft=1000; afterCountdown=next; drawCountdown(); }
function drawCountdown(){ app.innerHTML=`<section class="countdown" aria-live="polite"><p>准备好了吗？</p><strong>${countdown}</strong><p>记住食物的位置</p></section>`; }
function startTutorial(){ tutorial=true; engine=new FoodGame.Engine({seed:8,level:1,locked:true,tutorial:true}); screen='game'; selected=null; renderKey=''; renderGame(); }
function startFormal(){tutorial=false;engine=new FoodGame.Engine({seed:Date.now(),level:config.level,locked:config.locked,durationMs:120000});screen='game';selected=null;renderKey='';renderGame();}
function choose(id){ selected = selected===id ? null : id; renderGame(); }
function place(index){ if (!selected) return; applyPlace(selected,index); selected=null; renderGame(); }
function withdraw(){if(!selected)return;const i=engine.state.board.indexOf(selected);if(i>=0&&engine.remove(i))resetIdle();selected=null;renderGame();}
function resetIdle(){idleMs=0;hintMs=0;}
function applyPlace(id,index){
  const s=engine.state;
  if(engine.place(id,index)){resetIdle();return true;}
  if(s.phase==='play'&&!s.paused&&s.board[index]===null&&!s.board.includes(id)&&s.board.filter(Boolean).length>=s.M)hintMs=4000;
  return false;
}
function updateHint(){
  if(screen!=='game'||!engine||engine.state.phase!=='play')return;
  const el=document.querySelector('.heading .instruction');
  if(!el)return;
  const message=hintMs>0?`本桌摆${engine.state.M}件，可以替换已放好的物品`:!tutorial&&idleMs>=10000?'想不起来，可以再看一眼':baseInstruction;
  if(el.textContent!==message)el.textContent=message;
}
function progressText(s){
  const level=s.phase==='feedback'?s.roundResult.level:s.level;
  if(tutorial)return '跟着提示，先练习一桌';
  if(level===6)return `L6 · 当前记 ${s.M} 件`;
  if(config.locked)return `L${level} · 固定等级练习`;
  if(s.phase==='feedback' && s.level>level)return `本桌完成，下一桌进入 L${s.level}`;
  if(s.phase==='feedback' && s.level<level)return `下一桌从 L${s.level} 继续练习`;
  const remaining=Math.max(1,(level<=2?1:2)-s.progress);
  return `还差 ${remaining} 桌独立全对升级`;
}
function cellReference(id){return `<span class="cell-reference"><span>参考</span>${id?picture(id):'<span class="empty-reference">空位</span>'}</span>`;}
function renderGame(){
  const s=engine.state;
  if(s.phase==='ended'){renderResult();return;}
  const memory=s.phase==='memory', feedback=s.phase==='feedback', play=s.phase==='play';
  if(`${s.phase}/${s.roundId}/${s.level}`!==renderKey)resetIdle();
  const board=memory||feedback?s.answer:s.board, count=s.board.filter(Boolean).length;
  let instruction=memory?'看一看，每件食物放在哪里。记好了再开始摆。':'可以拖动，也可以先点食物，再点左边的位置。';
  if(tutorial&&memory)instruction='先练习：记住左边 3 件食物的位置。练习不计时。';
  if(tutorial&&play){const i=s.answer.findIndex((id,k)=>id&&s.board[k]!==id);instruction=i>=0?`练习：把${names[s.answer[i]]}放到左边第 ${i+1} 格。`:'都放好了，点“摆好了”试试。';}
  if(s.assisted&&play)instruction='参考已显示在格子右下方，照着放回去。';
  if(feedback) instruction=`本轮正确 ${s.roundResult.correct}/${s.roundResult.total} 件，获得 ${s.roundResult.points} 分。左边显示正确答案。`;
  baseInstruction=instruction;
  app.innerHTML=`<header class="topbar"><button class="pause-button" id="pause" aria-label="暂停游戏">Ⅱ 暂停</button><div class="timer" id="timer">${tutorial?'练习中':formatTime(s.remainingMs)}</div><div class="score"><span>L${feedback?s.roundResult.level:s.level}</span><span>得分 ${s.score}</span></div></header><section class="game"><div class="heading"><h1>${memory?'记住每件食物的位置':'从右边选出物品，放回原位'}</h1><p class="instruction ${feedback?'feedback-text':''}" role="status">${instruction}</p><p class="progress-text">${progressText(s)}</p></div><div class="tables"><section class="tray"><h2>${feedback?'正确答案':'原来的位置'}</h2><div class="grid board" style="--cols:${s.cols};--rows:${Math.ceil(s.P/s.cols)}">${board.map((id,i)=>`<button class="slot ${selected&&id===selected?'selected':''}" data-index="${i}" ${id?`data-food="${id}"`:''} aria-label="左边第${i+1}格${id?'，'+names[id]:'，空位'}" ${!play?'disabled':''}><span class="position">${i+1}</span>${picture(id)}${s.assisted&&play?cellReference(s.answer[i]):''}</button>`).join('')}</div></section><section class="tray candidate-tray"><h2>${memory?'等一会儿来选':feedback?'本轮结果':'可选物品'}</h2>${memory?'<div class="memory-wait"><p>先记住左边的食物位置</p><p>记好了，再从这里选食物。</p></div>':feedback?`<div class="round-feedback ${s.roundResult.perfect?'is-correct':'is-wrong'}" role="status"><div class="feedback-symbol" aria-hidden="true">${s.roundResult.perfect?'✓':'✕'}</div><h3>${s.roundResult.perfect?'全部放对了':'还有位置没放对'}</h3><strong class="round-points">本轮 +${s.roundResult.points} 分</strong><p>放对 ${s.roundResult.correct} / ${s.roundResult.total} 件</p><p>${tutorial?'练习不计分':'累计得分 '+s.score+' 分'}</p></div>`:`<div class="grid candidates" style="--cols:3;--rows:${Math.ceil(s.C/3)}">${s.candidates.map(id=>{const used=s.board.includes(id);return `<button class="slot ${used?'occupied-empty':''} ${selected===id?'selected':''}" data-candidate="${id}" ${!used?`data-food="${id}"`:''} aria-label="候选${names[id]}${used?'，已放到左边':''}" ${!play?'disabled':''}>${used?'<span>已放到左边</span>':picture(id)}</button>`;}).join('')}</div>`}</section></div><footer class="footer"><span class="placement">${memory?`记住 ${s.M} 件食物`:feedback?`放对 ${s.roundResult.correct}/${s.roundResult.total} 件`:`已摆 ${count}/${s.M} 件`}</span>${play?`<button class="return" id="return" ${!selected||!s.board.includes(selected)?'disabled':''}>放回候选区</button><button id="help">再看一眼</button><button id="submit" class="primary" ${count!==s.M?'disabled':''}>摆好了</button>`:memory?'<button id="remember" class="primary">我记好了</button>':tutorial?`<button id="tutorial-next" class="primary">${s.roundResult.perfect?'开始正式游戏':'再练习一次'}</button>`:'<span class="instruction">准备下一轮…</span>'}</footer></section>`;
  document.getElementById('pause').onclick=pause;
  if(memory)document.getElementById('remember').onclick=()=>{engine.remember();selected=null;renderGame();};
  if(play){document.getElementById('help').onclick=()=>{engine.help();renderGame();};document.getElementById('return').onclick=withdraw;document.getElementById('submit').onclick=()=>{engine.submit();selected=null;renderGame();};
  app.querySelectorAll('[data-index]').forEach(el=>el.onclick=()=>{if(performance.now()<suppressClickUntil)return;const i=Number(el.dataset.index);if(selected)place(i);else if(s.board[i])choose(s.board[i]);});
  app.querySelectorAll('[data-candidate]').forEach(el=>el.onclick=()=>{if(performance.now()<suppressClickUntil)return;const id=el.dataset.candidate;if(s.board.includes(id)){if(selected===id)withdraw();}else choose(id);});}
  if(tutorial&&feedback)document.getElementById('tutorial-next').onclick=s.roundResult.perfect?startFormal:startTutorial;
  renderKey=`${s.phase}/${s.roundId}/${s.level}`;
  updateHint();
}
function formatTime(ms){const secs=Math.max(0,Math.ceil(ms/1000));return `${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`;}
function renderResult(){
  screen='result';const s=engine.state;const r=s.roundResult;
  const lastRound=r?`末轮：正确 ${r.correct}/${r.total} 件，得分 ${r.points} 分${r.incomplete?(r.assisted?' · 求助后未完成':' · 未完成'):r.assisted?' · 使用了求助':' · 已完成'}`:'末轮仍在记忆阶段，尚未作答。';
  const rows=[1,2,3,4,5,6].map(level=>{const row=s.stats.levels[level]||{points:0,success:0,errors:0,helped:0};return `<tr><th scope="row">L${level}</th><td>${row.points}</td><td>${row.success}</td><td>${row.errors}</td><td>${row.helped}</td></tr>`;}).join('');
  app.innerHTML=`<section class="result"><div class="result-content"><div class="eyebrow">两分钟训练结束</div><h1>本次训练完成</h1><div class="result-score">${s.score}<span class="score-unit"> 分</span></div><div class="result-stats"><div><strong>${s.stats.success}</strong>成功桌数</div><div><strong>${s.stats.errors}</strong>失误桌数</div><div><strong>${s.stats.helped}</strong>求助桌数</div></div><table class="level-results"><caption>各等级表现</caption><thead><tr><th scope="col">等级</th><th scope="col">得分</th><th scope="col">成功</th><th scope="col">失误</th><th scope="col">求助</th></tr></thead><tbody>${rows}</tbody></table><p class="result-note">独立作答未完成 ${s.stats.incomplete} 桌</p><p class="last-round">${lastRound}</p><div class="result-actions"><button id="again" class="primary">继续训练</button><button id="home">返回首页</button></div></div></section>`;
  document.getElementById('again').onclick=()=>startCountdown(startFormal);document.getElementById('home').onclick=intro;
}
function pause(){if(screen!=='game'||dialog.open)return;engine.pause();exitConfirm=false;document.getElementById('pause-title').textContent='休息一下';document.getElementById('pause-copy').textContent='时间已暂停，摆放的位置都保留着。';document.getElementById('resume').textContent='继续训练';document.getElementById('exit').textContent='退出本次游戏';dialog.showModal();}
document.getElementById('resume').onclick=()=>{dialog.close();engine.resume();last=performance.now();};
document.getElementById('exit').onclick=()=>{if(!exitConfirm){exitConfirm=true;document.getElementById('pause-title').textContent='要结束这次游戏吗？';document.getElementById('pause-copy').textContent='退出后，本次训练进度不会保存，确定退出吗？';document.getElementById('exit').textContent='确认退出';document.getElementById('resume').textContent='继续训练';}else{dialog.close();intro();}};
dialog.addEventListener('cancel',e=>{e.preventDefault();dialog.close();engine.resume();last=performance.now();});
app.addEventListener('pointerdown',e=>{if(screen!=='game'||engine.state.phase!=='play'||engine.state.paused)return;const el=e.target.closest('[data-food]');if(!el||el.disabled)return;drag={id:el.dataset.food,x:e.clientX,y:e.clientY,pointer:e.pointerId,moved:false};});
document.addEventListener('pointermove',e=>{if(!drag||drag.pointer!==e.pointerId)return;if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>7){drag.moved=true;ghost.innerHTML=picture(drag.id);ghost.style.display='block';}if(drag.moved){e.preventDefault();ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';}}, {passive:false});
document.addEventListener('pointerup',e=>{if(!drag||drag.pointer!==e.pointerId)return;const d=drag;drag=null;ghost.style.display='none';if(!d.moved)return;suppressClickUntil=performance.now()+400;if(screen!=='game'||engine.state.phase!=='play'||engine.state.paused)return;const target=document.elementFromPoint(e.clientX,e.clientY);const cell=target&&target.closest('[data-index]');const candidate=target&&target.closest('.candidate-tray');if(cell){applyPlace(d.id,Number(cell.dataset.index));selected=null;renderGame();}else if(candidate){const i=engine.state.board.indexOf(d.id);if(i>=0){if(engine.remove(i))resetIdle();selected=null;renderGame();}}});
document.addEventListener('pointercancel',()=>{drag=null;ghost.style.display='none';});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();last=performance.now();});
function frame(now){const delta=now-last;last=now;if(screen==='countdown'&&!document.hidden){countdownLeft-=delta;if(countdownLeft<=0){countdown--;countdownLeft+=1000;if(countdown<=0)afterCountdown();else drawCountdown();}}else if(screen==='game'&&engine&&!engine.state.paused&&!tutorial){if(engine.state.phase==='play'){idleMs+=delta;hintMs=Math.max(0,hintMs-delta);}engine.tick(delta);const s=engine.state;if(`${s.phase}/${s.roundId}/${s.level}`!==renderKey){selected=null;renderGame();}else{const timer=document.getElementById('timer');if(timer)timer.textContent=formatTime(s.remainingMs);updateHint();}}requestAnimationFrame(frame);}
Object.defineProperty(window,'demo',{value:Object.freeze({get engine(){return engine;},get screen(){return screen;},get tutorial(){return tutorial;}})});
intro();requestAnimationFrame(frame);
})();

