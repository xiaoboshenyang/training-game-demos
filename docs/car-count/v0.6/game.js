import {createGameShell} from './public-template/template.js';
import {LABELS,POINTS,GATES,DURATIONS,initialState,settle,timelineScale} from './rules.js';
const $=id=>document.getElementById(id);
const settings={level:'auto',speed:100,size:100};
let active={...settings},api,ctx,canvas,prompt,answers,car,roof,pool;
let state=initialState(),phase='loading',question=null,elapsed=0,remaining=120000,paused=false,last=0,serial=0,answerElapsed=0;
const history=[],events=[];
function record(type,extra={}){events.push({type,at:performance.now(),...extra});if(events.length>250)events.shift();}
function loadImage(src){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(Error('素材加载失败：'+src));im.src=src;});}
function bounds(im){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d',{willReadFrequently:true});g.drawImage(im,0,0);const {data}=g.getImageData(0,0,c.width,c.height);let x0=c.width,y0=c.height,x1=0,y1=0;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(data[(y*c.width+x)*4+3]>20){x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);}return {im,x:x0,y:y0,w:x1-x0+1,h:y1-y0+1};}
function paintAsset(a,x,y,w,h){ctx.drawImage(a.im,a.x,a.y,a.w,a.h,x,y,w,h);}
function positions(n){return n===2?[420,860]:n===3?[340,640,940]:[280,520,760,1000];}
function applySettings(){
 active={...settings};if(active.level!=='auto'&&state.level!==Number(active.level)){state.level=Number(active.level);state.correctAtLevel=0;state.consecutiveWrong=0;state.highestLevel=Math.max(state.highestLevel,state.level);}
 $('effective').textContent=(active.level==='auto'?'自动':'锁定')+' · '+LABELS[state.level-1]+' · 车速'+active.speed+'% · 大小'+active.size+'%';
 $('activeSettings').textContent='当前生效：'+LABELS[state.level-1]+'，单车动作'+(DURATIONS[state.level-1]/(active.speed/100)).toFixed(2)+'秒；车速'+active.speed+'%，大小'+active.size+'%。';
}
function newQuestion(){
 if(phase==='done'||remaining<=0)return;
 applySettings();const candidates=pool.filter(q=>q.level===state.level);
 question=candidates[(serial++*37+Math.floor(Math.random()*candidates.length))%candidates.length];
 last=performance.now();elapsed=0;answerElapsed=0;phase='watch';answers.hidden=true;prompt.textContent='停车场从0辆开始，看看汽车进进出出';
 api.update({score:state.score,level:state.level,remainingMs:remaining});record('watch',{level:state.level,seed:question.seed});draw();
}
function start(){
 state=initialState(settings.level==='auto'?1:Number(settings.level));history.length=0;remaining=120000;paused=false;phase='ready';newQuestion();record('start');
}
function result(){return {totalScore:state.score,levels:structuredClone(state.levels),highestLevel:state.highestLevel};}
function finish(){
 if(phase==='done')return;phase='done';answers.hidden=true;prompt.textContent='本轮结束';record('finish');
 $('roundSummary').textContent='本轮 '+state.score+'分，完成'+state.answered+'题，最高'+LABELS[state.highestLevel-1]+'。';
 api.update({score:state.score,level:state.level,remainingMs:0});api.finish(result());
}
function answer(value){
 if(phase!=='answer'||paused||!api.isInteractive()||remaining<=0)return;
 phase='feedback';answers.hidden=true;
 const answeredLevel=state.level,correct=value===question.answer;
 const outcome=settle(state,correct,active.level!=='auto');state=outcome.state;
 history.push({level:answeredLevel,seed:question.seed,selected:value,answer:question.answer,correct,award:outcome.award,answerSeconds:answerElapsed,watchSeconds:question.duration*timelineScale(answeredLevel,active.speed)});
 record('answered',{correct,score:state.score,level:state.level});
 api.feedback({correct,score:state.score,scoreDelta:outcome.award,level:state.level,levelUp:outcome.levelUp,onComplete:()=>{record('feedbackComplete');newQuestion();}});
}
function draw(){
 if(!ctx)return;ctx.clearRect(0,0,1280,728);
 const xs=positions(question?.doors||2);
 for(const x of xs){
 ctx.fillStyle='#334751';ctx.strokeStyle='#172d34';ctx.lineWidth=5;ctx.beginPath();ctx.roundRect(x-65,160,130,610,10);ctx.fill();ctx.stroke();
 ctx.strokeStyle='#e9eee4';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-57,165);ctx.lineTo(x-57,730);ctx.moveTo(x+57,165);ctx.lineTo(x+57,730);ctx.stroke();
 ctx.strokeStyle='#edf0e4';ctx.lineWidth=5;ctx.setLineDash([28,29]);ctx.beginPath();ctx.moveTo(x,210);ctx.lineTo(x,740);ctx.stroke();ctx.setLineDash([]);
 }
 if(question&&phase==='watch'){
 ctx.save();ctx.beginPath();ctx.rect(0,214,1280,514);ctx.clip();
 const t=elapsed/timelineScale(state.level,active.speed);
 for(const e of question.events){if(t<e.start||t>=e.end)continue;
 const p=(t-e.start)/(e.end-e.start),x=xs[e.door],y=e.direction===1?820-700*p:120+700*p;
 const h=123.5*active.size/100,w=h*car.w/car.h;
 ctx.save();ctx.translate(x,y);if(e.direction!==1)ctx.rotate(Math.PI);paintAsset(car,-w/2,-h/2,w,h);ctx.restore();
 }ctx.restore();}
 ctx.fillStyle='#233e5f';ctx.beginPath();ctx.roundRect(168,50,944,161,70);ctx.fill();
 paintAsset(roof,165,48,950,166);
 for(const x of xs){ctx.fillStyle='#172c36';ctx.fillRect(x-62,208,124,12);ctx.fillStyle='#ffd562';for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(x-60+i*21,208);ctx.lineTo(x-49+i*21,208);ctx.lineTo(x-57+i*21,220);ctx.lineTo(x-68+i*21,220);ctx.fill();}}
}
function tick(now){
 const dt=last?(now-last)/1000:0;last=now;
 if(!paused&&api?.isInteractive()&&(phase==='watch'||phase==='answer')){
 remaining=Math.max(0,remaining-dt*1000);
 if(remaining<=0){finish();draw();requestAnimationFrame(tick);return;}
 if(phase==='watch'){elapsed+=dt;if(elapsed>=question.duration*timelineScale(state.level,active.speed)){phase='answer';answers.hidden=false;prompt.textContent='汽车走完了，请选一个数字';record('answerReady');}}
 else{answerElapsed+=dt;if(answerElapsed>=10)prompt.textContent='想一想：开进去的加上，开出来的减掉';}
 api.update({score:state.score,level:state.level,remainingMs:remaining});
 }
 draw();requestAnimationFrame(tick);
}
async function boot(){
 const loaded=await Promise.all([loadImage('./assets/car.png'),loadImage('./assets/roof.png'),loadImage('./assets/ground.png'),fetch('./pool.json').then(r=>{if(!r.ok)throw Error('题库加载失败');return r.json();})]);
 car=bounds(loaded[0]);roof=bounds(loaded[1]);pool=loaded[3];
 createGameShell({mount:$('mount'),mode:'playtest',config:{title:'车来车往',icon:'./assets/car.png',background:'./assets/ground.png',clock:'external',feedbackDurationMs:1500,onState(s){if(events.at(-1)?.shellState!==s.state&&s.state!==window.__lastShellState){record('shell',{shellState:s.state});window.__lastShellState=s.state;}}},
 adapter:{mount({container,api:a}){api=a;container.innerHTML='<canvas class="scene" width="1280" height="728" aria-label="停车场与进出汽车"></canvas><div class="prompt" role="status"></div><section class="answers" hidden><h2>停车场里还剩几辆车？</h2><div class="digits"></div></section>';
 canvas=container.querySelector('canvas');ctx=canvas.getContext('2d');prompt=container.querySelector('.prompt');answers=container.querySelector('.answers');
 for(let n=0;n<=9;n++){const b=document.createElement('button');b.textContent=n;b.setAttribute('aria-label',n+'辆');b.onclick=()=>answer(n);container.querySelector('.digits').append(b);}},
 start,pause(){paused=true;record('pause');},resume(){last=performance.now();paused=false;record('resume');},getResult:result,destroy(){phase='done';paused=true;}}});
 $('level').onchange=e=>{settings.level=e.target.value;};
 let controlPaused=false;
 $('controls').ontoggle=()=>{if($('controls').open){controlPaused=!paused&&phase!=='done';if(controlPaused)api.pause();}else if(controlPaused){controlPaused=false;api.resume();}};
 for(const key of ['speed','size'])$(key).oninput=e=>{settings[key]=Number(e.target.value);$(key+'Value').textContent=settings[key]+'%';};
 $('restart').onclick=()=>{api.start(true);$('controls').open=false;};
 $('reset').onclick=()=>{Object.assign(settings,{level:'auto',speed:100,size:100});$('level').value='auto';for(const key of ['speed','size']){$(key).value=100;$(key+'Value').textContent='100%';}api.start(true);$('controls').open=false;};
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&api.getState().state!=='ended')api.pause();});
 window.inspectCarGame=()=>({phase,paused,elapsed,remaining,settings:{...settings},active:{...active},state:structuredClone(state),question:structuredClone(question),history:structuredClone(history),events:structuredClone(events),shell:api.getState(),carBounds:{w:car.w,h:car.h},roofBounds:{w:roof.w,h:roof.h}});
 requestAnimationFrame(tick);
}
boot().catch(err=>{$('mount').textContent='加载失败，请刷新重试。'+err.message;console.error(err);});
