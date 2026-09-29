import {createGameShell, LEVELS} from './public-template/v1.2/template.js';
import {QUESTIONS} from './questions.js';

const SCORE = [25, 30, 35, 45, 50, 55];
const PROMOTE = [2, 2, 2, 3, 3, Infinity];
const LETTERS = 'ABCD';
const FACE = [
  {n:[1,0,0],v:[[1,0,0],[1,1,0],[1,1,1],[1,0,1]],light:.84},
  {n:[-1,0,0],v:[[0,0,1],[0,1,1],[0,1,0],[0,0,0]],light:.69},
  {n:[0,1,0],v:[[0,1,0],[0,1,1],[1,1,1],[1,1,0]],light:1.08},
  {n:[0,-1,0],v:[[0,0,1],[0,0,0],[1,0,0],[1,0,1]],light:.63},
  {n:[0,0,1],v:[[1,0,1],[1,1,1],[0,1,1],[0,0,1]],light:.98},
  {n:[0,0,-1],v:[[0,0,0],[0,1,0],[1,1,0],[1,0,0]],light:.76},
];

const controls = {
  toggle: document.querySelector('#toggleControls'),
  body: document.querySelector('#controlsBody'),
  summary: document.querySelector('#controlSummary'),
  active: document.querySelector('#activeSetting'),
  level: document.querySelector('#levelMode'),
  time: document.querySelector('#timeScale'),
  similarity: document.querySelector('#similarityScale'),
  restore: document.querySelector('#restoreDefaults'),
};
const music=document.querySelector('#bgm');
music.volume=.18;
let musicEnabled=true,musicUnlocked=false;

let area, api, board, canvases=[], progressBar, progressFill;
let current=null, options=[], answerIndex=0, views=[];
let totalMs=120000, questionMs=12000, questionLimitMs=12000;
let score=0, level=1, levelProgress=0, failureStreak=0, highestLevel=1;
let running=false, paused=false, feedbackPending=false, currentLocked=false;
let completion=null,showCompleted=false;
let appliedMode='auto', lastFrame=performance.now(), lastTopbar=0;
let attempts=0, usedByLevel=Array.from({length:6},()=>new Set());
let stats=LEVELS.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0}));

function setting(){return {mode:controls.level.value,time:Number(controls.time.value),similarity:Number(controls.similarity.value)}}
function syncControlLabel(){
  const s=setting();
  controls.summary.textContent=`${s.mode==='auto'?'自动':`锁定 L${s.mode}`} · L${current?.level||level} · ${s.time}%/${s.similarity}%`;
  controls.active.textContent=`当前 L${current?.level||level}｜单题 ${questionLimitMs/1000} 秒｜相似度 ${s.similarity}%`;
}
controls.toggle.addEventListener('click',()=>{
  controls.body.hidden=!controls.body.hidden;
  controls.toggle.setAttribute('aria-expanded',String(!controls.body.hidden));
});
[controls.level,controls.time,controls.similarity].forEach(el=>el.addEventListener('change',syncControlLabel));
controls.restore.addEventListener('click',()=>{
  controls.level.value='auto';controls.time.value='100';controls.similarity.value='100';syncControlLabel();
});

function rotation(p,a){
  const c=Math.cos(a.yaw),s=Math.sin(a.yaw),u=Math.cos(a.pitch),v=Math.sin(a.pitch);
  const x=p[0]*c+p[2]*s,z=-p[0]*s+p[2]*c;
  return [x,p[1]*u-z*v,p[1]*v+z*u];
}
function color(f){return `rgb(${[242,211,155].map(n=>Math.min(255,Math.round(n*f))).join(',')})`}
function drawShape(canvas,cells,angle,isTarget,{reference=cells,clear=true,offsetY=0,alpha=1,carved=isTarget}={}){
  if(!canvas||!cells?.length)return;
  const box=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2),w=Math.round(box.width*d),h=Math.round(box.height*d);
  if(!w||!h)return;
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
  const ctx=canvas.getContext('2d');if(clear)ctx.clearRect(0,0,w,h);
  const low=[0,1,2].map(k=>Math.min(...reference.map(p=>p[k]))),high=[0,1,2].map(k=>Math.max(...reference.map(p=>p[k])));
  const center=low.map((n,k)=>(n+high[k]+1)/2),extent=Math.max(...low.map((n,k)=>high[k]-n+1));
  const scale=Math.min(w/(extent+(isTarget?2.3:1.7)),h/(extent+(isTarget?1.5:1.1)));
  const set=new Set(cells.map(p=>p.join(','))),full=new Set(current.solid.map(p=>p.join(','))),polys=[];
  for(const p of cells)for(const f of FACE){
    const neighbor=[p[0]+f.n[0],p[1]+f.n[1],p[2]+f.n[2]].join(',');
    if(set.has(neighbor)||rotation(f.n,angle)[2]<=.005)continue;
    const verts=f.v.map(q=>rotation([p[0]+q[0]-center[0],p[1]+q[1]-center[1]+offsetY,p[2]+q[2]-center[2]],angle));
    const inner=carved&&full.has(neighbor);
    polys.push({verts,depth:verts.reduce((n,q)=>n+q[2],0)/4,fill:inner?'#82613d':color(f.light),edge:inner?'#614527':'#9b774a'});
  }
  polys.sort((a,b)=>a.depth-b.depth);ctx.lineJoin='round';ctx.globalAlpha=alpha;
  for(const poly of polys){
    ctx.beginPath();poly.verts.forEach((q,i)=>{const x=w/2+q[0]*scale,y=h/2-q[1]*scale;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});
    ctx.closePath();ctx.fillStyle=poly.fill;ctx.fill();ctx.strokeStyle=poly.edge;ctx.lineWidth=Math.max(1,d*1.05);ctx.stroke();
  }
  ctx.globalAlpha=1;
}
function render(){
  if(!current||canvases.length!==5)return;
  if(showCompleted||completion?.elapsed>=860){
    drawShape(canvases[0],current.solid,views[0],true,{carved:false});
  }else{
    drawShape(canvases[0],current.target,views[0],true,{reference:current.solid});
    if(completion){
      const t=Math.min(1,completion.elapsed/860),ease=1-(1-t)**3;
      drawShape(canvases[0],current.piece,views[0],true,{reference:current.solid,clear:false,
        offsetY:1.2*(1-ease),alpha:.55+.45*t,carved:false});
    }
  }
  options.forEach((cells,i)=>drawShape(canvases[i+1],cells,views[i+1],false));
}
function installDrag(el,index){
  let last=null,moved=false,suppressUntil=0;
  el.addEventListener('pointerdown',e=>{
    if(!running||paused||feedbackPending)return;
    el.setPointerCapture(e.pointerId);last=[e.clientX,e.clientY];moved=false;
  });
  el.addEventListener('pointermove',e=>{
    if(!last||!running||paused||feedbackPending)return;
    const dx=e.clientX-last[0],dy=e.clientY-last[1];
    if(Math.abs(dx)+Math.abs(dy)>2){
      views[index].yaw+=dx*.011;views[index].pitch=Math.max(-1.45,Math.min(1.45,views[index].pitch+dy*.011));
      last=[e.clientX,e.clientY];moved=true;render();
    }
  });
  el.addEventListener('pointerup',()=>{if(moved)suppressUntil=performance.now()+180;last=null});
  el.addEventListener('pointercancel',()=>{last=null});
  if(index>0)el.addEventListener('click',e=>{
    if(e.detail!==0&&performance.now()<suppressUntil)return;
    submit(index-1);
  });
}
function makeBoard(){
  area.innerHTML=`<div class="game-board"><div class="zone target-zone"><canvas aria-label="可拖动旋转的题目积木"></canvas><span class="rotate-mark" aria-hidden="true">⟳</span></div><div class="zone answer-zone">${[...LETTERS].map((letter,i)=>`<button class="choice" type="button" aria-label="选项 ${letter}，点击选择，拖动旋转" data-option="${i}"><span class="letter">${letter}</span><canvas></canvas></button>`).join('')}</div><button class="music-button" type="button" aria-pressed="true">♫ 音乐开</button><div class="time-track" role="progressbar" aria-label="本题剩余时间" aria-valuemin="0" aria-valuemax="12" aria-valuenow="12"><span></span></div></div>`;
  board=area.querySelector('.game-board');canvases=[...area.querySelectorAll('canvas')];
  progressBar=area.querySelector('.time-track');progressFill=progressBar.firstElementChild;
  installDrag(canvases[0],0);
  area.querySelectorAll('.choice').forEach((button,i)=>installDrag(button,i+1));
  const musicButton=area.querySelector('.music-button');
  musicButton.setAttribute('aria-pressed',String(musicEnabled));
  musicButton.textContent=musicEnabled?'♫ 音乐开':'♫ 音乐关';
  musicButton.addEventListener('click',()=>{
    musicEnabled=!musicEnabled;musicUnlocked=true;
    musicButton.setAttribute('aria-pressed',String(musicEnabled));
    musicButton.textContent=musicEnabled?'♫ 音乐开':'♫ 音乐关';
    if(musicEnabled&&!paused)music.play().catch(()=>{});else music.pause();
  });
}
function variant(question,similarity){
  const change=similarity===80?-1:similarity===120?1:0;
  const count=Math.max(0,Math.min(3,question.nearCount+change));
  if(change===0)return [question.options,question.answer];
  const near=change>0?question.nearPool.slice(0,count):(count?question.nearPool.slice(-count):[]);
  const farCount=3-count;
  const far=change>0?question.farPool.slice(0,farCount):question.farPool.slice(-farCount);
  const pieces=[...near,...far];
  pieces.splice(question.answer,0,question.piece);
  return [pieces,question.answer];
}
function pickQuestion(nextLevel){
  const pool=QUESTIONS.filter(q=>q.level===nextLevel),seen=usedByLevel[nextLevel-1];
  let available=pool.filter(q=>!seen.has(q.id));
  if(!available.length){seen.clear();available=pool;}
  const q=available[(attempts+nextLevel)%available.length];seen.add(q.id);return q;
}
function loadQuestion(){
  if(!running)return;
  completion=null;showCompleted=false;
  area.querySelectorAll('.choice.used').forEach(button=>button.classList.remove('used'));
  const s=setting();
  if(s.mode!==appliedMode){levelProgress=0;failureStreak=0;appliedMode=s.mode;}
  if(s.mode!=='auto')level=Number(s.mode);
  current=pickQuestion(level);currentLocked=s.mode!=='auto';
  [options,answerIndex]=variant(current,s.similarity);
  // A shared initial pose keeps same-footprint distractors visually comparable.
  views=Array.from({length:5},()=>({yaw:-.61,pitch:.54}));
  questionLimitMs=12000*s.time/100;questionMs=questionLimitMs;
  board.dataset.questionId=current.id;board.dataset.level=String(level);
  progressBar.setAttribute('aria-valuemax',String(questionLimitMs/1000));
  updateProgress();syncControlLabel();api.update({level,score,remainingMs:totalMs});
  requestAnimationFrame(render);
}
function updateProgress(){
  if(!progressFill)return;
  progressFill.style.width=`${Math.max(0,questionMs/questionLimitMs)*100}%`;
  progressBar.setAttribute('aria-valuenow',String(Math.ceil(questionMs/1000)));
  progressBar.classList.toggle('urgent',questionMs<=3000);
}
function getResult(){return {totalScore:score,highestLevel,attempts,levels:stats.map(row=>({...row}))}}
function finish(){
  if(!running)return;
  running=false;feedbackPending=false;completion=null;music.pause();api.update({remainingMs:0});api.finish(getResult());
}
function startPublicFeedback({correct,delta,oldLevel}){
  const accepted=api.feedback({correct,score,scoreDelta:delta,level,levelUp:level>oldLevel,
    onComplete:()=>{if(!running)return;feedbackPending=false;music.volume=.18;loadQuestion();}});
  if(!accepted)feedbackPending=false;
}
function resolve(correct,optionIndex=-1){
  if(!running||paused||feedbackPending||!api.isInteractive())return;
  feedbackPending=true;attempts++;
  music.volume=.08;
  const oldLevel=level,entry=stats[oldLevel-1],delta=correct?SCORE[oldLevel-1]:0;
  if(correct){
    score+=delta;entry.score+=delta;entry.clears++;failureStreak=0;
    if(!currentLocked){
      levelProgress++;
      if(levelProgress>=PROMOTE[oldLevel-1]&&level<6){level++;levelProgress=0;}
    }
  }else{
    entry.errors++;failureStreak++;
    if(!currentLocked&&failureStreak>=2){level=Math.max(1,level-1);levelProgress=0;failureStreak=0;}
  }
  highestLevel=Math.max(highestLevel,level);
  const result={correct,delta,oldLevel};
  if(correct){
    area.querySelector(`.choice[data-option="${optionIndex}"]`)?.classList.add('used');
    completion={elapsed:0,result};render();
  }else startPublicFeedback(result);
}
function submit(index){if(index<0||index>3)return;resolve(index===answerIndex,index)}
function start(){
  totalMs=120000;score=0;level=1;levelProgress=0;failureStreak=0;highestLevel=1;
  attempts=0;usedByLevel=Array.from({length:6},()=>new Set());
  stats=LEVELS.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0}));
  current=null;running=true;paused=false;feedbackPending=false;completion=null;showCompleted=false;appliedMode='auto';
  music.pause();music.currentTime=0;music.volume=.18;
  if(musicEnabled&&musicUnlocked)music.play().catch(()=>{});
  makeBoard();loadQuestion();lastFrame=performance.now();lastTopbar=0;
}
const adapter={
  mount({container,api:provided}){area=container;api=provided},
  start,
  pause(){paused=true;music.pause()},
  resume(){paused=false;lastFrame=performance.now();if(musicEnabled&&musicUnlocked)music.play().catch(()=>{})},
  getResult,
  destroy(){running=false;music.pause()},
};
createGameShell({mount:document.querySelector('#app'),config:{title:'积木巧配',clock:'external',feedbackDurationMs:1200,ability:'空间能力',icon:'🧩'},adapter,mode:'playtest'});

document.querySelector('#app').addEventListener('pointerdown',()=>{
  if(!musicUnlocked){musicUnlocked=true;if(musicEnabled&&!paused)music.play().catch(()=>{});}
},{capture:true});

function tick(now){
  const delta=Math.max(0,now-lastFrame);lastFrame=now;
  if(running&&!paused&&completion){
    completion.elapsed=Math.min(1000,completion.elapsed+delta);render();
    if(completion.elapsed>=1000){
      const result=completion.result;completion=null;showCompleted=true;render();startPublicFeedback(result);
    }
  }
  if(running&&!paused&&!feedbackPending){
    totalMs=Math.max(0,totalMs-delta);
    questionMs=Math.max(0,questionMs-delta);
    updateProgress();
    if(now-lastTopbar>=100){api.update({remainingMs:totalMs});lastTopbar=now;}
    if(totalMs<=0)finish();
    else if(questionMs<=0)resolve(false);
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
new ResizeObserver(()=>requestAnimationFrame(render)).observe(document.querySelector('#app'));
