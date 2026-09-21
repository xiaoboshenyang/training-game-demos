import {createGameShell} from './public-template/template.js';
import {LABELS,FOODS,generate,ranges,freshState,settle} from './model.mjs';
import {createMusic} from './audio.mjs';

const $=s=>document.querySelector(s);
let api,area,state=freshState(),question,remaining=120000,phase='loading',paused=false;
let settings={mode:'auto',target:100,other:100},applied={...settings},elapsed=0,helped=false;
let helpQueue=[],helpIndex=0,helpElapsed=0,activePress=null,qid=0,last=performance.now(),panelPaused=false;
let seed=crypto.getRandomValues(new Uint32Array(1))[0];
const sessionLog=[];
const music=createMusic();
await Promise.all(Object.keys(FOODS).map(t=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=()=>reject(Error('图片加载失败：'+t));img.src=`assets/${t}.png`})));

function update(){api.update({score:state.score,level:question?.level??state.level,remainingMs:remaining});settingsStatus();}
function settingsStatus(){
 const range=question?.ranges;if(!range)return;
 $('#active-settings').textContent=`当前：${applied.mode==='auto'?'自动':'锁定'} · L${question.level} ${LABELS[question.level-1]}\n目标 ${applied.target}%（每侧${range.target.join('—')}个）\n干扰 ${applied.other}%（每侧${range.other.join('—')}个）`;
 $('#active-settings').style.whiteSpace='pre-line';
}
function answerButton(value,label,cls){const el=document.createElement('button');el.type='button';el.className='answer '+cls;el.dataset.answer=value;el.textContent=label;bindAnswer(el,value);return el;}
function bindAnswer(el,value){
 el.addEventListener('pointerdown',e=>{if(e.button!==0)return;advance(performance.now());if(!canAnswer()||activePress)return;e.preventDefault();activePress={id:e.pointerId,qid,value,el};el.setPointerCapture(e.pointerId);el.classList.add('pressed')});
 el.addEventListener('pointerup',e=>{if(!activePress||activePress.id!==e.pointerId)return;const held=activePress;activePress=null;held.el.classList.remove('pressed');const rect=held.el.getBoundingClientRect();const inside=e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom;
  if(inside&&held.qid===qid&&!paused&&phase==='playing'&&api.isInteractive())submit(held.value,remaining<=0);else if(remaining<=0)finish();});
 el.addEventListener('pointercancel',()=>{cancelPress();if(remaining<=0)finish()});
 el.addEventListener('click',e=>{if(e.detail===0&&canAnswer())submit(value)});
}
function cancelPress(){activePress?.el.classList.remove('pressed');activePress=null;}
function canAnswer(){return phase==='playing'&&!paused&&remaining>0&&api.isInteractive();}
function render(){
 area.innerHTML=`<div class="question">哪边的<img src="assets/${question.target}.png" alt="${FOODS[question.target]}">${FOODS[question.target]}多？</div><span class="help-status" aria-live="polite"></span><button class="help" hidden>帮我数数</button>`;
 question.sides.forEach((plates,s)=>{
  const side=document.createElement('div');side.className=`side ${s?'right':'left'}${plates.length===1?' single':''}`;side.dataset.side=s;side.setAttribute('aria-label',s?'右边物品':'左边物品');bindAnswer(side,s?'right':'left');
  const count=document.createElement('span');count.className='count-total';count.hidden=true;count.textContent='共 0 个';side.append(count);
  plates.forEach((items,g)=>{const plate=document.createElement('div');plate.className='plate';plate.dataset.group=g;
   items.forEach((t,i)=>{const img=document.createElement('img');img.className='item';img.src=`assets/${t}.png`;img.alt=FOODS[t];img.dataset.type=t;img.dataset.side=s;
    img.style.left=`${question.positions[s][i].x}px`;img.style.top=`${question.positions[s][i].y}px`;plate.append(img)});side.append(plate)});area.append(side);
 });
 area.append(answerButton('left','左边多','left-answer'),answerButton('equal','一样多','equal'),answerButton('right','右边多','right-answer'));
 area.querySelector('.help').onclick=startHelp;area.dataset.locked='false';
}
function nextQuestion(){
 if(remaining<=0){finish();return}
 applied={...settings};const level=applied.mode==='auto'?state.level:Number(applied.mode);state.level=level;state.highest=Math.max(state.highest,level);
 question=generate(level,++seed,applied,question?.target);qid++;elapsed=0;helped=false;helpQueue=[];helpIndex=0;helpElapsed=0;phase='playing';cancelPress();render();update();
}
function submit(value,atDeadline=false){
 if(phase!=='playing'||paused||!api.isInteractive()||(!atDeadline&&remaining<=0))return;
 phase='feedback';cancelPress();area.dataset.locked='true';area.querySelector('.help').hidden=true;
 const correct=value===question.answer;const outcome=settle(state,question,correct,helped,applied.mode!=='auto');
 sessionLog.push({qid,seed:question.seed,level:question.level,target:question.target,totals:question.totals,value,correct,helped,delta:outcome.delta,score:state.score,nextLevel:outcome.next,elapsedMs:elapsed,remainingMs:remaining});
 api.feedback({correct,score:state.score,scoreDelta:outcome.delta,level:question.level,levelUp:outcome.levelUp,onComplete(){if(remaining<=0){finish();return}nextQuestion()}});
}
function startHelp(){
 if(!canAnswer()||helped||elapsed<10000)return;
 cancelPress();helped=true;state.good=state.bad=0;phase='help';area.dataset.locked='true';area.querySelector('.help').hidden=true;
 helpQueue=[...area.querySelectorAll('.item')].filter(img=>img.dataset.type===question.target).sort((a,b)=>Number(a.dataset.side)-Number(b.dataset.side)||parseFloat(a.style.top)-parseFloat(b.style.top)||parseFloat(a.style.left)-parseFloat(b.style.left));helpIndex=0;helpElapsed=0;
 area.querySelectorAll('.count-total').forEach(e=>{e.hidden=false;e.dataset.count='0';e.textContent='共 0 个'});
 area.querySelector('.help-status').textContent='我们一起数一数';
}
function animateHelp(dt){
 helpElapsed+=dt;
 while(helpIndex<helpQueue.length&&helpElapsed>=(helpIndex+1)*300){const item=helpQueue[helpIndex++];item.classList.add('counted');const total=item.closest('.side').querySelector('.count-total');total.dataset.count=Number(total.dataset.count)+1;total.textContent=`共 ${total.dataset.count} 个`;}
 if(helpIndex===helpQueue.length){phase='playing';area.dataset.locked='false';area.querySelector('.help-status').textContent='比一比，哪边多？';}
}
function result(){return{totalScore:state.score,levels:state.stats.map(x=>({...x})),highest:state.highest};}
function finish(){if(phase==='ended')return;phase='ended';music.pause();remaining=0;cancelPress();api.update({score:state.score,level:state.level,remainingMs:0});api.finish(result());}
function advance(now){
 const dt=Math.max(0,now-last);last=now;if(!api||paused)return;
 if(phase==='help'&&api.getState().state==='game'){animateHelp(dt);return}
 if(phase!=='playing'||api.getState().state!=='game')return;
 remaining=Math.max(0,remaining-dt);elapsed+=dt;
 if(!helped&&elapsed>=10000&&remaining>0)area.querySelector('.help').hidden=false;
 api.update({remainingMs:remaining,score:state.score,level:question.level});
 if(remaining===0&&!activePress)finish();
}
function resetSession(){music.restart();state=freshState();remaining=120000;paused=false;phase='playing';sessionLog.length=0;question=null;last=performance.now();nextQuestion();}
const shell=createGameShell({mount:$('#mount'),mode:'playtest',config:{title:'猜大小',clock:'external',feedbackDurationMs:1500},adapter:{
 mount({container,api:gameApi}){api=gameApi;area=container},start:resetSession,
 pause(){paused=true;music.pause();cancelPress()},resume(){paused=false;last=performance.now();if(remaining<=0&&phase==='playing')finish()},getResult:result
}});
function frame(now){advance(now);music.sync(!paused&&!document.hidden&&['playing','help','feedback'].includes(phase),phase==='feedback');requestAnimationFrame(frame)}requestAnimationFrame(frame);
document.addEventListener('visibilitychange',()=>{if(document.hidden)api.pause()});

function closeSettings(){if($('#settings').hidden)return;$('#settings').hidden=true;$('#settings-toggle').setAttribute('aria-expanded','false');if(panelPaused&&api.getState().state==='paused')api.resume();panelPaused=false;}
$('#settings-toggle').onclick=()=>{if(!$('#settings').hidden){closeSettings();return}panelPaused=api.getState().state!=='paused'&&phase!=='ended';if(panelPaused)api.pause();$('#settings').hidden=false;$('#settings-toggle').setAttribute('aria-expanded','true');settingsStatus()};
function readSettings(){settings={mode:$('#mode').value,target:Number($('#target-range').value),other:Number($('#other-range').value)};$('#target-value').textContent=settings.target+'%';$('#other-value').textContent=settings.other+'%';$('#pending-settings').textContent='已调整：下一题生效，或点“应用并换题”。';}
['#mode','#target-range','#other-range'].forEach(id=>$(id).addEventListener('input',readSettings));
$('#apply').onclick=()=>{closeSettings();if(phase==='playing'&&!paused&&remaining>0){state.good=state.bad=0;nextQuestion()}else $('#pending-settings').textContent='本题系统演示／反馈结束后，下一题生效。';};
$('#reset-settings').onclick=()=>{$('#mode').value='auto';$('#target-range').value=100;$('#other-range').value=100;readSettings();};
$('#restart').onclick=()=>{closeSettings();api.start(true)};
$('#fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>{})};
Object.defineProperty(window,'guessSize',{get:()=>structuredClone({version:'0.7',phase,paused,remaining,elapsed,helped,qid,question,state,settings,applied,sessionLog,music:music.diagnostics(),shell:api.getState()})});
