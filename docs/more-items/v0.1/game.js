import {createGameShell,VERSION} from './public-template/template.js';
import {MemorySession,makeItems,LEVELS,seededRandom} from './engine.js';
import {LAYOUT,fitObject} from './layout.js';
import {getSharedFeedbackAudioUrl} from './public-template/vendor/games/shared/utils/shared-assets.js';
let container,api,shell,destroyed=false,last=performance.now(),lastSync=0,endAudio=null;
let pendingResult=null,pendingResultMs=0;
let deferredEvents=[];
const eventLog=[],nodes=[];
const assetUrls=new Map();
window.addEventListener('pagehide',event=>{
  if(!event.persisted)assetUrls.forEach(url=>URL.revokeObjectURL(url));
});
const readJSON=async url=>{const response=await fetch(url);if(!response.ok)throw Error('无法读取 '+url);return response.json();};
try{
  const [config,source]=await Promise.all([readJSON('config.json'),readJSON('assets/objects-source.json')]);
  const items=makeItems(source),lookup=new Map(items.map(item=>[item.id,item]));
  const images=['assets/shelf-three.png','assets/shelf-four.png',...items.map(item=>'assets/'+item.file)];
  await Promise.all(images.map(async file=>{
    const response=await fetch(file);
    if(!response.ok)throw Error('无法读取 '+file);
    const url=URL.createObjectURL(await response.blob());
    assetUrls.set(file,url);
    const img=new Image();img.src=url;await img.decode();
  }));
  const seed=new URLSearchParams(location.search).get('seed');
  const session=new MemorySession(config,items,seed?seededRandom(Number(seed)):Math.random);
  const mode=document.querySelector('#level-mode'),controls=document.querySelector('#controls');
  const log=(type,detail={})=>eventLog.push({type,...detail,at:performance.now()});
  function sync(){api.update({score:session.score,level:session.roundLevel,remainingMs:session.remainingMs});}
  function background(){
    const path=session.q.cols===3?'assets/shelf-three.png':'assets/shelf-four.png';
    document.querySelector('.game-background').style.backgroundImage='url("'+assetUrls.get(path)+'")';
  }
  function objectView(item,cols){
    const visual=document.createElement('span'),img=new Image(),box=item.bbox,size=fitObject(box,cols);
    visual.className='item-visual';Object.assign(visual.style,{width:size.width+'px',height:size.height+'px'});
    img.src=assetUrls.get('assets/'+item.file);img.alt='';img.draggable=false;
    Object.assign(img.style,{width:1024/(box[2]-box[0])*100+'%',height:1024/(box[3]-box[1])*100+'%',left:-box[0]/(box[2]-box[0])*100+'%',top:-box[1]/(box[3]-box[1])*100+'%'});
    visual.append(img);return visual;
  }
  function renderObjects(arr,interactive){
    const grid=container.querySelector('.shelf-grid');grid.replaceChildren();nodes.length=0;
    arr.forEach((id,index)=>{
      const slot=document.createElement(id?'button':'div');slot.className='slot';slot.dataset.index=index;
      if(id){
        const item=lookup.get(id);slot.type='button';slot.setAttribute('aria-label',item.name);
        slot.disabled=!interactive;slot.append(objectView(item,session.q.cols));
        const marker=document.createElement('span');marker.className='item-marker';marker.textContent='✓';marker.setAttribute('aria-hidden','true');slot.append(marker);
        slot.onclick=()=>click(index);
      }
      nodes.push(slot);grid.append(slot);
    });
  }
  function controlsView(){
    container.querySelector('.question-controls').hidden=false;
    const watch=session.phase==='watch',cover=session.phase==='cover';
    const secs=container.querySelector('.seconds'),bar=container.querySelector('.question-bar');
    const maximum=watch?config.watchMs:config.answerMs;
    secs.textContent=cover?'稍等一下':(watch?'看题 ':'剩余 ')+Math.ceil(session.phaseRemainingMs/1000)+' 秒';
    bar.classList.toggle('watch',watch);bar.classList.toggle('urgent',!watch&&session.phaseRemainingMs<=3000);
    bar.style.visibility=cover?'hidden':'visible';
    const ratio=Math.max(0,Math.min(1,session.phaseRemainingMs/maximum));
    bar.querySelector('.question-fill').style.width=ratio*100+'%';
    bar.setAttribute('aria-label',watch?'看题剩余时间':'作答剩余时间');bar.setAttribute('aria-valuenow',Math.round(ratio*100));
    container.querySelector('.ready-button').hidden=!watch;
    const counter=container.querySelector('.found-counter');counter.hidden=watch||cover;
    counter.textContent='已找到 '+session.found.size+'/'+session.q.k;
    const done=session.stats.reduce((a,row)=>a+row.clears,0),failed=session.stats.reduce((a,row)=>a+row.errors,0);
    document.querySelector('#session-info').textContent=(session.lockedLevel?'锁定'+LEVELS[session.lockedLevel-1].label:'自动升降级')+' · 本局 '+session.score+' 分 · 完成 '+done+' 题';
    document.querySelector('#session-report').textContent='本局完成 '+done+' 题，没过 '+failed+' 题；最高到 '+LEVELS[session.highestLevel-1].label+'。';
  }
  function renderQuestion(){
    background();container.replaceChildren();
    const grid=document.createElement('div');grid.className='shelf-grid';
    Object.assign(grid.style,{left:LAYOUT.x+'px',top:LAYOUT.y+'px',width:LAYOUT.width+'px',height:LAYOUT.height+'px',gridTemplateColumns:'repeat('+session.q.cols+',1fr)'});
    container.append(grid);
    const cloth=document.createElement('div');cloth.className='cloth';cloth.setAttribute('aria-hidden','true');
    Object.assign(cloth.style,{left:LAYOUT.cloth.x+'px',top:LAYOUT.cloth.y+'px',width:LAYOUT.cloth.width+'px',height:LAYOUT.cloth.height+'px'});
    container.append(cloth);
    const footer=document.createElement('div');footer.className='question-controls';
    footer.innerHTML='<span class="seconds"></span><div class="question-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"><div class="question-fill"></div></div><button class="ready-button">看好了</button><span class="found-counter"></span>';
    container.append(footer);
    footer.querySelector('.ready-button').onclick=()=>{if(!api.isInteractive()||session.paused||session.phase!=='watch')return;account();if(session.phase==='watch')handleAll(session.finishWatch());};
    renderObjects(session.q.before,false);controlsView();sync();
    log('questionStarted',{round:session.roundNo,level:session.roundLevel,cols:session.q.cols,n:session.q.n,k:session.q.k});
  }
  function showCover(){
    // 先整屏遮住，遮挡期间换画面；下一状态整屏同时揭开。
    container.querySelector('.cloth').classList.add('visible');
    container.querySelector('.shelf-grid').style.visibility='hidden';
    renderObjects(session.q.after,false);controlsView();log('covered',{round:session.roundNo});
  }
  function reveal(){
    nodes.forEach(node=>{if(node.tagName==='BUTTON')node.disabled=false;});
    container.querySelector('.shelf-grid').style.visibility='visible';
    container.querySelector('.cloth').classList.remove('visible');controlsView();log('revealed',{round:session.roundNo});
  }
  function handle(event){
    if(!event)return;
    if(event.type==='cover')showCover();
    if(event.type==='revealed')reveal();
    if(event.type==='hit'){nodes[event.index].classList.add('found');controlsView();log('found',{round:session.roundNo,index:event.index});}
    if(event.type==='result'){
      session.q.after.forEach((id,index)=>{
        if(session.found.has(id))nodes[index].classList.add('found');
        else if(session.q.added.includes(id)){nodes[index].classList.add('answer');nodes[index].querySelector('.item-marker').textContent='✓';}
      });
      if(Number.isInteger(event.index)){nodes[event.index].classList.add('miss');nodes[event.index].querySelector('.item-marker').textContent='×';}
      container.querySelector('.ready-button').hidden=true;
      controlsView();sync();log('result',event);
      if(event.correct)publicResult(event);
      else{pendingResult=event;pendingResultMs=config.answerRevealMs;}
    }
    if(event.type==='ended'){
      sync();api.finish(session.getResult());endAudio=new Audio(getSharedFeedbackAudioUrl('timeUp'));endAudio.play().catch(()=>{});
      log('ended',{result:session.getResult()});
    }
  }
  function handleAll(events){events.forEach(handle);}
  function publicResult(event){
    api.feedback({correct:event.correct,score:event.score,scoreDelta:event.award,level:event.levelUp?event.nextLevel:event.roundLevel,levelUp:event.levelUp,onComplete:()=>{
      if(session.phase==='ended')return;
      session.beginQuestion();last=performance.now();renderQuestion();
    }});
  }
  function account(){const now=performance.now(),delta=Math.max(0,now-last);last=now;handleAll(session.advance(delta));}
  function click(index){
    if(!api.isInteractive()||session.paused||session.phase!=='find')return;
    account();if(session.phase!=='find')return;
    const event=session.click(index);handle(event);
  }
  shell=createGameShell({mount:document.querySelector('#mount'),mode:'playtest',config:{title:config.title,background:assetUrls.get('assets/shelf-three.png'),clock:'external',feedbackDurationMs:config.feedbackMs},adapter:{
    mount(context){container=context.container;api=context.api;},
    start(){endAudio?.pause();endAudio=null;pendingResult=null;pendingResultMs=0;deferredEvents=[];session.reset(mode.value==='auto'?null:Number(mode.value));eventLog.length=0;last=performance.now();lastSync=0;renderQuestion();},
    pause(){const now=performance.now();if(api.getState().state==='paused')deferredEvents=session.advance(Math.max(0,now-last));last=now;session.paused=true;log('paused');},
    resume(){session.paused=false;last=performance.now();log('resumed');const events=deferredEvents;deferredEvents=[];handleAll(events);},
    getResult(){return session.getResult();},
    destroy(){destroyed=true;}
  }});
  function tick(now){
    if(destroyed)return;
    const delta=Math.max(0,now-last);last=now;
    if(!session.paused&&api.isInteractive()){
      if(pendingResult){
        pendingResultMs-=delta;
        if(pendingResultMs<=0){const event=pendingResult;pendingResult=null;publicResult(event);}
      }
      handleAll(session.advance(delta));
      if(['watch','find','cover'].includes(session.phase))controlsView();
      if(now-lastSync>80){sync();lastSync=now;}
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  document.querySelector('#restart').onclick=()=>{shell.start(true);controls.open=false;};
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&api.getState().state==='game')shell.pause();});
  window.memoryDemo={version:config.ruleVersion,templateVersion:VERSION,getSnapshot:()=>session.snapshot(),getResult:()=>session.getResult(),getPublicState:()=>shell.getState(),getEvents:()=>structuredClone(eventLog)};
  window.gameReady=true;
}catch(error){
  console.error(error);assetUrls.forEach(url=>URL.revokeObjectURL(url));assetUrls.clear();
  const note=document.createElement('p');note.className='loading';note.textContent='素材未准备完整，游戏尚未开始。请启动“启动试玩.cmd”，再刷新页面。';document.querySelector('#mount').replaceChildren(note);
}
