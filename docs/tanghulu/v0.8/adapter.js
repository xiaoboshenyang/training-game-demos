import {createGameShell,LEVELS} from './public-template/template.js';
const $=s=>document.querySelector(s);
let api,host,game=null,order=null,mode='idle',score=0,level=1,remaining=120000,started=false,streak=0,serial=0,seed=0,finished=false;
let stats=[],settings={lock:0,speed:1,size:1,density:1},active={...settings};
function destroyGame(){game?.destroy();game=null}
function update(){api.update({score,level,remainingMs:remaining});$('#status').textContent=(active.lock?'锁定':'自动')+' · L'+level}
function showOrder(){destroyGame();mode='order';active={...settings};if(active.lock)level=active.lock;order=GameEngine.createOrder(level,(seed+ ++serial*7919)>>>0);OrderUI.render(host,{mode:'order',order:order.items,customer:(serial%6)+1,assets:FRUIT_ASSETS,onStart:()=>{if(api.isInteractive())startCatch()}});update()}
function startCatch(){mode='catch';started=true;host.innerHTML='<div class="catch-layout"><div class="playfield"></div><aside class="progress-side"><tanghulu-progress current="0" total="'+order.capacity+'"></tanghulu-progress><div class="auto-hint">串满自动交单</div></aside></div>';
game=new CatchGame(host.querySelector('.playfield'),{level:order.level,seed:order.seed,order,assets:FRUIT_ASSETS,settings:active,onCatch:(snap,event)=>{DemoAudio.catchFruit();stats[order.level-1].correct+=event.correct?1:0;stats[order.level-1].wrong+=event.correct?0:1;host.querySelector('tanghulu-progress')?.setProgress(snap.count,snap.capacity)},onFull:complete});game.start()}
function complete(snap,{feedback=true}={}){if(mode!=='catch')return;destroyGame();mode='result';const success=snap.wrong===0&&Object.entries(order.need).every(([id,n])=>snap.got[id]===n);const award=success?order.capacity*5:0;score+=award;const st=stats[order.level-1];st.attempts++;st.success+=success?1:0;st.score+=award;const old=level;if(!active.lock){streak=success?Math.max(0,streak)+1:Math.min(0,streak)-1;if(streak>=2){level=Math.min(6,level+1);streak=0}else if(streak<=-2){level=Math.max(1,level-1);streak=0}}
const got={};snap.stack.forEach(f=>got[f.id]=(got[f.id]||0)+1);
OrderUI.render(host,{mode:'result',order:order.items,customer:(serial%6)+1,assets:FRUIT_ASSETS,result:{success,got,stack:snap.stack,wrong:snap.stack.filter(f=>!f.correct).map(f=>({id:f.id,name:FRUIT_ASSETS[f.id].name})),score:award,levelMessage:level!==old?'下一单进入等级 '+level:''},onNext:()=>{if(api.isInteractive()&&!finished)showOrder()}});
if(feedback)api.feedback({correct:success,score,level,levelUp:level>old});else update()}
function result(){return{totalScore:score,levels:stats.map((s,i)=>({level:i+1,label:LEVELS[i],score:s.score,clears:s.correct,errors:s.wrong}))}}
function reset(){destroyGame();DemoAudio.stop();score=0;level=settings.lock||1;remaining=120000;started=false;streak=0;serial=0;seed=Date.now()>>>0;finished=false;stats=LEVELS.map(()=>({attempts:0,success:0,correct:0,wrong:0,score:0}));DemoAudio.start();showOrder()}
function end(){if(finished)return;if(game?.snapshot().full)complete(game.snapshot(),{feedback:false});finished=true;mode='summary';remaining=0;destroyGame();DemoAudio.stop();api.finish(result())}
api=createGameShell({mount:$('#mount'),config:{templateVersion:'1.0.0',title:'冰糖葫芦',icon:'assets/icon.png',background:'assets/background.svg',ability:'工作记忆',oneLine:'记住水果和数量，移动竹签接住水果。',principles:['本轮仅试玩订单与接果，介绍内容暂不评审。','已选图标C、背景音乐015和接果音效09。','教学视频、介绍配音及手把手教学不在本轮范围。'],introAudio:'',demo:{video:'',poster:'assets/icon.png',caption:'本轮不含教学演示',color:'#b9dbee'},clock:'external',feedbackDurationMs:1500},
adapter:{mount({container,api:shell}){host=document.createElement('div');host.className='th-content';container.append(host)},tutorial({onComplete}){onComplete()},start:reset,pause(){game?.pause();DemoAudio.pause()},resume(){if(mode==='catch')game?.resume();if(!finished)DemoAudio.start()},getResult:result,onExit(){destroyGame();DemoAudio.stop();$('#gate').hidden=false},destroy(){destroyGame();DemoAudio.stop()}}});
$('#launch').onclick=()=>{$('#gate').hidden=true;api.start(true)};
$('#restart').onclick=()=>{DemoAudio.stop();destroyGame();api.start(true)};
let last=performance.now();function tick(now){const dt=now-last;last=now;const s=api.getState().state;if(started&&!finished&&['game','feedback','levelup'].includes(s)){remaining=Math.max(0,remaining-dt);if(remaining===0)end();else update()}requestAnimationFrame(tick)}requestAnimationFrame(tick);
document.addEventListener('visibilitychange',()=>{if(document.hidden)api.pause()});
for(const k of ['speed','size','density'])$('#'+k).oninput=()=>{settings[k]=+$('#'+k).value/100;$('#'+k+'Value').textContent=$('#'+k).value+'%'};
$('#lock').onchange=()=>settings.lock=+$('#lock').value;
for(const k of ['music','sfx'])$('#'+k).oninput=()=>{DemoAudio.setVolume(k,+$('#'+k).value/100);$('#'+k+'Value').textContent=$('#'+k).value+'%'};
$('#defaults').onclick=()=>{settings={lock:0,speed:1,size:1,density:1};$('#lock').value=0;for(const k of ['speed','size','density']){$('#'+k).value=100;$('#'+k+'Value').textContent='100%'}};
window.TanghuluTemplateDemo={api,get game(){return game},get state(){return{mode,score,level,remaining,started,stats,settings,active}}};

