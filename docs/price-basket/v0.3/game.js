import {createGameShell} from './public-template/template.js';
import {LEVELS,LEVEL_NAMES,genQuestion,createProgress,settle,timing} from './engine.js';
const $=id=>document.getElementById(id);
const settings={locked:0,memoPercent:100,answerPercent:100};
const CROPS={carrot:[80,20,360,510],tomato:[566,127,445,385],eggplant:[1075,37,374,478],corn:[97,528,370,450],cucumber:[576,540,391,434],basket:[980,640,536,267]};
let api,market,progress=createProgress(),state={},animation,last=performance.now(),uiElapsed=0,controlPaused=false;
const blankStats=()=>LEVEL_NAMES.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0}));
function sprite(key,width,height,name=''){
 const [x,y,w,h]=CROPS[key],scale=Math.min(width/w,height/h);
 const left=(width-w*scale)/2,top=(height-h*scale)/2;
 return '<span class="sprite" role="img" aria-label="'+name+'" style="width:'+width+'px;height:'+height+'px"><span class="sprite-cut" style="left:'+left+'px;top:'+top+'px;width:'+w*scale+'px;height:'+h*scale+'px"><img src="assets/sprites.png" alt="" draggable="false" style="width:'+1536*scale+'px;height:'+1024*scale+'px;left:'+(-x*scale)+'px;top:'+(-y*scale)+'px"></span></span>';
}
function setPhase(phase){state.phase=phase;market.dataset.phase=phase;}
function paintTop(){api.update({score:progress.score,level:progress.level,remainingMs:state.clock});}
function controlsInfo(){
 const mode=settings.locked?'锁定':'自动';
 $('session-info').textContent='当前：'+mode+' · '+LEVEL_NAMES[progress.level-1]+'　看价 '+settings.memoPercent+'%　作答 '+settings.answerPercent+'%';
 $('memo-value').textContent=settings.memoPercent+'%';$('answer-value').textContent=settings.answerPercent+'%';
 if(state.stats){const n=state.stats.reduce((a,v)=>a+v.clears+v.errors,0);$('session-report').textContent='本局已答 '+n+' 题，得分 '+progress.score+'，最高 '+LEVEL_NAMES[progress.maxLv-1]+'；当前 '+(LEVELS[progress.level-1].up?progress.prog+'/'+LEVELS[progress.level-1].up:'封顶')+'。';}
}
const ICON={check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
 cross:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'};
function mount({container,api:shared}){
 api=shared;container.innerHTML='<section class="market" aria-label="买菜记价游戏"><div class="panel stall-panel"><div class="awning"></div><div class="stall"></div></div><div class="panel checkout-panel"><p class="instruction sr-only" aria-live="polite"></p><div class="col"><div class="basket-slot"></div><div class="act"></div><div class="round-timer"><div class="timer-track"><div class="timer-fill"></div></div><span class="timer-label"></span></div></div></div></section>';market=container.firstElementChild;
}
function reset(){
 progress=createProgress();if(settings.locked){progress.level=settings.locked;progress.maxLv=settings.locked;}
 state={phase:'memo',clock:120000,q:null,stats:blankStats(),log:[],memoUsed:0,paused:false,round:0};
 newQuestion();paintTop();controlsInfo();last=performance.now();
}
// 菜摊几何：2样、3样各一行放大；4样2+2，5样3+2；整组在遮阳棚以下纵向居中。
function stallDim(){
 const n=state.q.stall.length;
 const d=n<=2?{w:210,sh:200,tw:150,th:82,pf:50,gap:64,rg:0}:n===3?{w:164,sh:170,tw:132,th:74,pf:46,gap:24,rg:0}:{w:150,sh:118,tw:120,th:64,pf:40,gap:26,rg:34};
 d.rows=n<=3?[n]:n===4?[2,2]:[3,2];d.block=d.sh+10+d.th+22;
 const total=d.rows.length*d.block+(d.rows.length-1)*d.rg;d.y0=60+Math.round((612-total)/2);
 return d;
}
function stallSlot(slot){
 const d=stallDim();let r=0,j=slot;while(j>=d.rows[r]){j-=d.rows[r];r++;}
 const k=d.rows[r],rowWidth=k*d.w+(k-1)*d.gap;
 return {left:Math.round((566-rowWidth)/2)+j*(d.w+d.gap),top:d.y0+r*(d.block+d.rg)};
}
function renderStall(){
 const q=state.q,d=stallDim();
 const shelves=d.rows.map((_,r)=>'<div class="shelf" style="top:'+(d.y0+r*(d.block+d.rg)+d.sh+10+d.th+6)+'px"></div>').join('');
 market.querySelector('.stall').innerHTML=shelves+q.stall.map((g,i)=>{const pos=stallSlot(i),rot=i%2?1.5:-1.5;
  return '<div class="goods" data-index="'+i+'" style="left:'+pos.left+'px;top:'+pos.top+'px;width:'+d.w+'px">'+sprite(g.e,d.w-24,d.sh,g.n)+'<div class="tag" style="width:'+d.tw+'px;height:'+d.th+'px;transform:rotate('+rot+'deg)"><span class="money" style="font-size:'+d.pf+'px">'+g.price+'<small>元</small></span></div></div>';}).join('');
}
function basketDim(){
 const n=state.q.basket.length,bw=n<=2?440:n<=3?470:490,bh=Math.round(bw*267/536);
 return {n,bw,bh,ih:Math.round(bh*0.6),iw:Math.min(140,Math.round((bw-110)/n))};
}
function basketMarkup(withGoods){
 const q=state.q,b=basketDim();
 const goods=withGoods?q.basket.map(i=>{const g=q.stall[i];return '<div class="basket-item" style="width:'+b.iw+'px">'+sprite(g.e,b.iw,b.ih,g.n)+'</div>';}).join(''):'';
 return '<div class="basket-panel'+(withGoods?'':' ghost')+'" style="width:'+b.bw+'px;height:'+b.bh+'px"><div class="basket-image">'+sprite('basket',b.bw,b.bh,'购物篮')+'</div><div class="basket-goods" style="top:'+Math.round(b.bh*0.06)+'px">'+goods+'</div></div>';
}
function say(text){market.querySelector('.instruction').textContent=text;}
function newQuestion(){
 if(state.clock<=0)return finish();
 state.round++;state.q=genQuestion(progress.level);state.qTimes=timing(progress.level,settings.memoPercent,settings.answerPercent);
 state.phaseLeft=state.qTimes.memoMs;state.memoUsed=0;state.answerUsed=0;state.elapsedPhase=0;setPhase('memo');renderStall();
 market.querySelector('.col').style.gap=(state.q.basket.length>=4?34:40)+'px';
 market.querySelector('.basket-slot').innerHTML=basketMarkup(false);
 const act=market.querySelector('.act');act.innerHTML='<button class="skip">'+ICON.check+'记住了</button>';
 act.querySelector('button').onclick=()=>{if(api.isInteractive()&&!state.paused&&state.phase==='memo')cover();};
 say('先记住左边的价钱');
 paintTimer();paintTop();controlsInfo();
}
function cover(){
 if(state.phase!=='memo')return;
 state.memoUsed=state.qTimes.memoMs-state.phaseLeft;
 setPhase('covering');state.elapsedPhase=0;state.phaseLeft=LEVELS[state.q.lv-1].moveStall?1500:700;state.shuffled=false;
 market.querySelector('.act').innerHTML='';
 say('价钱盖上了');
 market.querySelectorAll('.tag').forEach(tag=>{tag.classList.add('covered','flipping');tag.querySelector('.money').textContent='？';});
}
function shuffleGoods(){
 state.q.order.forEach((index,slot)=>{const node=market.querySelector('.goods[data-index="'+index+'"]'),pos=stallSlot(slot);node.style.left=pos.left+'px';node.style.top=pos.top+'px';});
 say('摊上的东西换了位置');
 state.shuffled=true;
}
function previewBasket(){
 setPhase('preview');state.phaseLeft=1000;
 market.querySelectorAll('.tag').forEach(t=>t.classList.remove('flipping'));
 say('看看篮子里买了什么');
 market.querySelector('.basket-slot').innerHTML=basketMarkup(true);
}
function ask(){
 setPhase('ask');state.phaseLeft=state.qTimes.answerMs;state.elapsedPhase=0;
 market.querySelectorAll('.tag').forEach(t=>t.classList.remove('flipping'));
 say('这一篮多少钱？');
 const act=market.querySelector('.act');
 act.innerHTML='<div class="options">'+state.q.options.map((v,i)=>'<button class="option" data-option="'+i+'" aria-label="'+v+'元">'+v+'<small>元</small></button>').join('')+'</div>';
 act.querySelectorAll('.option').forEach(b=>b.onclick=()=>{if(api.isInteractive()&&!state.paused&&state.phase==='ask')answer(Number(b.dataset.option));});
 paintTimer();
}
function answer(index){
 if(state.phase!=='ask')return;
 const q=state.q,correct=index===q.answerIndex,result=settle(progress,correct,settings.locked);
 state.answerUsed=state.qTimes.answerMs-state.phaseLeft;
 state.stats[q.lv-1].score+=result.gain;state.stats[q.lv-1][correct?'clears':'errors']++;
 state.log.push({level:q.lv,correct,timeout:index===-1,gain:result.gain,memoMs:state.memoUsed,answerMs:state.answerUsed});
 state.result=result;
 // 本题先揭晓，反馈结束后才采用下一题的等级。
 progress.score=result.progress.score;
 setPhase('reveal');state.phaseLeft=correct?2200:3500;state.elapsedPhase=0;
 market.querySelectorAll('.goods').forEach(node=>{const g=q.stall[Number(node.dataset.index)];node.querySelector('.tag').classList.remove('covered','flipping');node.querySelector('.money').innerHTML=g.price+'<small>元</small>';});
 say((correct?'答对了。':index===-1?'时间到了。':'')+'这一篮 '+q.basket.map(i=>q.stall[i].price).join(' 加 ')+'，一共 '+q.total+' 元');
 // 篮子和四个选项留在原位，只把每件价钱贴上、标出对错。
 const b=basketDim();
 market.querySelectorAll('.basket-item').forEach((node,i)=>{const price=document.createElement('span');price.className='basket-price';price.style.top=(b.ih+8)+'px';price.textContent=q.stall[q.basket[i]].price+'元';node.append(price);});
 market.querySelectorAll('.option').forEach(btn=>{btn.disabled=true;btn.style.animation='none';const choice=Number(btn.dataset.option);
  if(choice===q.answerIndex){btn.classList.add('selected-right');btn.insertAdjacentHTML('beforeend','<span class="mark">'+ICON.check+'</span>');}
  else if(choice===index){btn.classList.add('selected-wrong');btn.insertAdjacentHTML('beforeend','<span class="mark">'+ICON.cross+'</span>');}
  else btn.classList.add('dim');});
 paintTop();controlsInfo();
}
function beginFeedback(){
 if(state.phase!=='reveal')return;
 setPhase('feedback');
 const r=state.result;
 api.feedback({correct:state.log.at(-1).correct,score:r.progress.score,scoreDelta:r.gain,level:r.progress.level,levelUp:r.levelUp,onComplete:()=>{
  if(state.phase!=='feedback')return;
  progress=r.progress;newQuestion();
 }});
}
function paintTimer(){
 const memo=state.phase==='memo',den=memo?state.qTimes.memoMs:state.qTimes.answerMs;
 const ratio=Math.max(0,Math.min(1,state.phaseLeft/den)),sec=Math.ceil(state.phaseLeft/1000);
 market.querySelector('.timer-fill').style.width=ratio*100+'%';
 const label=market.querySelector('.timer-label');label.textContent=sec;label.setAttribute('aria-label',(memo?'看价':'作答')+'剩余'+sec+'秒');
}
function finish(){
 if(state.phase==='ended')return;
 setPhase('ended');state.paused=true;
 api.finish({totalScore:progress.score,levels:state.stats.map(s=>({...s}))});controlsInfo();
}
function tick(now){
 const dt=Math.max(0,Math.min(250,now-last));last=now;
 if(api && !state.paused && api.isInteractive() && !['ended','feedback'].includes(state.phase)){
  if(['memo','ask'].includes(state.phase)){
   const remaining=Math.min(dt,state.clock,state.phaseLeft);
   state.clock=Math.max(0,state.clock-remaining);state.phaseLeft=Math.max(0,state.phaseLeft-remaining);
   if(state.clock<=0){finish();}
   else if(state.phaseLeft<=0){if(state.phase==='memo')cover();else answer(-1);}
   else {paintTimer();uiElapsed+=dt;if(uiElapsed>=100){paintTop();uiElapsed=0;}}
  }else if(state.phase==='covering'){
   state.phaseLeft-=dt;state.elapsedPhase+=dt;
   if(LEVELS[state.q.lv-1].moveStall && !state.shuffled && state.elapsedPhase>=700)shuffleGoods();
   if(state.phaseLeft<=0)previewBasket();
  }else if(state.phase==='preview'){
   state.phaseLeft-=dt;if(state.phaseLeft<=0)ask();
  }else if(state.phase==='reveal'){
   state.phaseLeft-=dt;
   // 最后1秒使用公共对错/加分反馈；揭晓与反馈合计仍是2.2/3.5秒。
   if(state.phaseLeft<=1000)beginFeedback();
  }
 }
 animation=requestAnimationFrame(tick);
}
function reopen(){
 api.start(false);
 if($('controls').open){api.pause();controlPaused=true;}
 controlsInfo();
}
$('controls').addEventListener('toggle',()=>{
 if(!api)return;
 if($('controls').open){if(api.isInteractive()){api.pause();controlPaused=true;}}
 else if(controlPaused){controlPaused=false;api.resume();}
});
$('level-mode').onchange=e=>{settings.locked=e.target.value==='auto'?0:Number(e.target.value);reopen();};
for(const [id,key] of [['memo-percent','memoPercent'],['answer-percent','answerPercent']]){
 $(id).oninput=e=>{settings[key]=Number(e.target.value);controlsInfo();};
}
$('restart').onclick=reopen;
$('defaults').onclick=()=>{Object.assign(settings,{locked:0,memoPercent:100,answerPercent:100});$('level-mode').value='auto';$('memo-percent').value='100';$('answer-percent').value='100';reopen();};
$('close-controls').onclick=()=>{$('controls').open=false;};
async function boot(){
 const config=await fetch('config.json').then(r=>{if(!r.ok)throw Error('配置加载失败');return r.json();});
 await Promise.all(['assets/background.png','assets/sprites.png'].map(src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(Error('素材加载失败：'+src));image.src=src;})));
 const shell=createGameShell({mount:$('mount'),config,mode:'playtest',adapter:{mount,start:reset,pause(){state.paused=true;},resume(){state.paused=false;last=performance.now();},getResult(){return {totalScore:progress.score,levels:state.stats};},destroy(){cancelAnimationFrame(animation);}}});
 // 只读检查口；不提供解题、跳时钟或改变游戏状态的调试捷径。
 Object.defineProperty(window,'__gameSnapshot',{value:()=>JSON.parse(JSON.stringify({settings,progress,state:{phase:state.phase,clock:state.clock,phaseLeft:state.phaseLeft,q:state.q,round:state.round,stats:state.stats,log:state.log,qTimes:state.qTimes},shell:shell.getState()}))});
 animation=requestAnimationFrame(tick);
}
boot().catch(error=>{$('mount').innerHTML='<p class="loading" role="alert">加载失败，请重新打开试玩。'+error.message+'</p>';console.error(error);});

