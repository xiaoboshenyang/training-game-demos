import {createGameShell} from './public/v1.2/template.js';
import {GameEngine,BOARD,LEVEL_NAMES} from './engine.mjs';
import {getGameAudioContext,ensureGameAudioMaster,unlockGameAudio,installGameAudioUnlockListeners} from './public/v1.2/vendor/games/shared/audio/game-audio-context.js';
const $=id=>document.getElementById(id);
const NS='http://www.w3.org/2000/svg';
const engine=new GameEngine(window.BOARDS);
let api,svg,rope,nodes,progressFill,progressText,lastTick=performance.now(),audioContext=null,stopped=false;
function elem(tag,attrs={},parent){const el=document.createElementNS(NS,tag);for(const [k,v]of Object.entries(attrs))el.setAttribute(k,v);parent?.append(el);return el;}
function beep(correct){try{audioContext??=getGameAudioContext();if(!audioContext)return;void unlockGameAudio({source:'station-click'});const o=audioContext.createOscillator(),g=audioContext.createGain();o.frequency.value=correct?650:190;o.type='sine';g.gain.setValueAtTime(.05,audioContext.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+.11);o.connect(g).connect(ensureGameAudioMaster(audioContext));o.start();o.stop(audioContext.currentTime+.12);}catch{}}
function mount({container,api:publicApi}){
 api=publicApi;svg=elem('svg',{viewBox:'0 0 '+BOARD.width+' '+BOARD.height,class:'board','aria-label':'按两条顺序轮流点圆牌'},container);
 rope=elem('g',{},svg);nodes=elem('g',{},svg);
 const timer=document.createElement('div');timer.className='question-time';timer.innerHTML='<span>本题剩余</span><div class="time-track"><div class="time-fill"></div></div><span class="time-count"></span>';container.append(timer);progressFill=timer.querySelector('.time-fill');progressText=timer.querySelector('.time-count');
 svg.addEventListener('click',event=>{const target=event.target.closest('[data-station]');if(!target)return;const pt=svg.createSVGPoint();pt.x=event.clientX;pt.y=event.clientY;const at=pt.matrixTransform(svg.getScreenCTM().inverse());const station=engine.board.stations.find(s=>s.id===target.dataset.station);if(Math.hypot(at.x-station.x*BOARD.width,at.y-station.y*BOARD.height)>BOARD.diameter/2)return;clickStation(station.id);});
 svg.addEventListener('keydown',event=>{const target=event.target.closest('[data-station]');if(target&&(event.key==='Enter'||event.key===' ')){event.preventDefault();clickStation(target.dataset.station);}});
}
function drawBoard(){
 nodes.replaceChildren();rope.replaceChildren();
 const b=engine.board;
 for(const s of b.stations){
  const wood=b.sameColor||s.kind==='seq';
  const group=elem('g',{transform:'translate('+s.x*BOARD.width+' '+s.y*BOARD.height+')',class:'station '+(wood?'wood':'blue'),'data-station':s.id,tabindex:0,role:'button','aria-label':s.label},nodes);
  const visual=elem('g',{class:'node-visual'},group);
  const size=wood?118:123;
  elem('image',{href:'assets/station-'+(wood?'wood':'blue')+'.png',x:-size/2,y:-size/2,width:size,height:size,class:'sprite'},visual);
  elem('circle',{r:BOARD.diameter/2,class:'hit'},visual);
  const label=elem('text',{y:0,class:s.label.length>1?'weekday':''},visual);label.textContent=s.label;
  const checked=elem('g',{class:'checked',transform:'translate(35 -35)'},visual);elem('circle',{r:14,fill:'#4b9857',stroke:'#fff2ca','stroke-width':2},checked);elem('path',{d:'M-7 0 -2 5 8 -6',fill:'none',stroke:'#fff','stroke-width':3,'stroke-linecap':'round'},checked);
  if(s.id===b.route[0]){
   const flag=elem('g',{class:'start-flag',transform:'translate(-43 -44)'},visual);
   elem('path',{d:'M0 8 V-18',stroke:'#fff2c0','stroke-width':3},flag);elem('path',{d:'M2 -18 L25 -13 L2 -7 Z',fill:'#f4d26c',stroke:'#77552a','stroke-width':1},flag);
  }
 }
 paintProgress();updateControls();recordLog();
}
function paintProgress(){
 const b=engine.board,seen=b.route.slice(0,engine.progress);
 for(const n of nodes.children)n.classList.toggle('done',seen.includes(n.dataset.station));
 const points=seen.map(id=>{const s=b.stations.find(s=>s.id===id);return s.x*BOARD.width+','+s.y*BOARD.height;}).join(' ');
 rope.replaceChildren();
 if(seen.length>1){
  elem('polyline',{points,class:'rope',stroke:'#182d1d80','stroke-width':10,transform:'translate(0 2)'},rope);
  elem('polyline',{points,class:'rope',stroke:'#b6935e','stroke-width':8},rope);
  elem('polyline',{points,class:'rope',stroke:'#efdfb6','stroke-width':5},rope);
  elem('polyline',{points,class:'rope',stroke:'#baa077','stroke-width':2,'stroke-dasharray':'2 5'},rope);
 }
 progressFill.style.width=(engine.questionMs/engine.questionLimitMs*100)+'%';progressFill.classList.toggle('low',engine.questionMs/engine.questionLimitMs<.25);progressText.textContent=Math.ceil(engine.questionMs/1000)+'秒';
}
function clickStation(id){
 advanceTo(performance.now());
 if(!api.isInteractive())return;
 const result=engine.click(id);
 if(result.type==='wrong'){beep(false);const visual=nodes.querySelector('[data-station="'+id+'"] .node-visual');visual.classList.remove('shake');void visual.getBoundingClientRect();visual.classList.add('shake');return;}
 if(result.type==='correct'||result.type==='complete'){beep(true);paintProgress();if(result.type==='complete')settle(true);}
}
function settle(correct){
 const event=engine.settle(correct);if(!event)return;
 recordLog();api.feedback({...event,onComplete:()=>{if(engine.ended)return;engine.next();api.update({score:engine.score,level:engine.level,remainingMs:engine.remainingMs});drawBoard();lastTick=performance.now();}});
}
function advanceTo(now){
 const delta=Math.max(0,now-lastTick);lastTick=now;
 if(!api||!api.isInteractive()||engine.busy||engine.ended)return;
 const event=engine.step(delta);
 api.update({remainingMs:engine.remainingMs});paintProgress();
 if(event==='end'){recordLog();api.finish(engine.result());}
 else if(event==='timeout')settle(false);
}
function updateControls(){
 const mode=engine.settings.level==='auto'?'自动':'锁定';
 $('effective').textContent='当前：'+mode+' · L'+engine.level+' '+LEVEL_NAMES[engine.level-1]+'｜本题 '+Math.round(engine.questionLimitMs/1000)+' 秒｜升降门槛 '+engine.questionGate+' 题';
}
function recordLog(){
 $('sessionLog').replaceChildren();
 const total=document.createElement('p');total.textContent='本局 '+engine.score+' 分，已完成 '+engine.rounds.filter(r=>r.result==='成功').length+' 题，超时 '+engine.rounds.filter(r=>r.result==='超时').length+' 题。';$('sessionLog').append(total);
 for(const r of engine.rounds){const row=document.createElement('div');row.className='log-row';row.textContent='L'+r.level+' · '+r.result+' · +'+r.score+'分 · 连到'+r.progress+'/'+r.stations+' · 点错'+r.clickErrors+'次';$('sessionLog').append(row);}
}
async function ready(){
 installGameAudioUnlockListeners();
 await Promise.all(['background','station-blue','station-wood'].map(name=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=()=>reject(Error('素材加载失败：'+name));img.src='assets/'+name+'.png';})));
 api=createGameShell({mount:$('app'),config:{title:'双线接龙',mode:'playtest',background:'assets/background.png',clock:'external',feedbackDurationMs:1500},mode:'playtest',adapter:{
 mount,start(){engine.reset();drawBoard();api.update({score:0,level:engine.level,remainingMs:engine.remainingMs});lastTick=performance.now();},
 pause(){advanceTo(performance.now());lastTick=performance.now();},resume(){lastTick=performance.now();},getResult(){return engine.result();},destroy(){stopped=true;}
 }});
 $('loading').remove();
 $('levelMode').addEventListener('change',()=>{engine.setSettings({level:$('levelMode').value});api.start(true);});
 for(const [id,key,output]of [['timeScale','timePercent','timePercent'],['gateScale','gatePercent','gatePercent']]){
  $(id).addEventListener('input',()=>{const value=Number($(id).value);$(output).textContent=value+'%';engine.setSettings({[key]:value});});
 }
 $('restart').onclick=()=>api.start(true);
 $('resetSettings').onclick=()=>{$('levelMode').value='auto';$('timeScale').value=100;$('gateScale').value=100;$('timePercent').textContent='100%';$('gatePercent').textContent='100%';engine.setSettings({level:'auto',timePercent:100,gatePercent:100});api.start(true);};
 window.__GAME_REVIEW__=Object.freeze({snapshot:()=>engine.snapshot(),shellState:()=>api.getState()});
 function tick(now){if(stopped)return;advanceTo(now);requestAnimationFrame(tick);}requestAnimationFrame(tick);
}
ready().catch(error=>{$('loading').textContent=error.message;console.error(error);});

