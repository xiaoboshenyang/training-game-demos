import {createGameAudio} from './audio.mjs';
import {createGameShell} from './public-template/template.js';
import {Puzzle,solve,moves,settle,LABELS,layout} from './engine.mjs';

const $=s=>document.querySelector(s);
const gameAudio=createGameAudio();
const settings={level:0,size:100,snap:100};
let api,area,svg,puzzle,positions,activeNodes,level=1,streak=0,viewStreak=0,total=0,remainingMs=120000;
let elapsed=0,viewed=false,viewing=false,settled=false,drag=false,expired=false;
let viewRoute=null,viewElapsed=0,dead=false,history=[],used=new Set(),round=0,travelTo=null;
let stats=[],last=performance.now(),raf,completionHold=0,pendingFeedback=null,bag={},highestLevel=1;
const pool=await fetch('./pool.json').then(r=>{if(!r.ok)throw Error('题库读取失败');return r.json();}).catch(fail);
function fail(error){$('#load-error').textContent='无法启动：'+error.message+'。请通过本地服务器打开。';throw error;}
for(let l=1;l<=6;l++)pool['L'+l]=pool['L'+l].filter(q=>
  (l<2||q.edges.some(e=>e[2]===2))&&(l<3||q.edges.some(e=>e[3]===1))&&(l<6||q.edges.filter(e=>e[3]===1).length>=2));
// Keep the chosen board geometry within the documented 120px node spacing.
for(let l=1;l<=6;l++)pool['L'+l]=pool['L'+l].filter(q=>{
  const {points,active}=layout(q);
  return active.every((a,i)=>active.slice(i+1).every(b=>Math.hypot(points[a][0]-points[b][0],points[a][1]-points[b][1])>=120));
});
function shuffled(items){return items.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);}
function makeBags(){
  bag={};
  for(let l=1;l<=6;l++){
    const groups={};for(const q of pool['L'+l])(groups[q.edges.length]??=[]).push(q);
    const lists=Object.keys(groups).sort((a,b)=>a-b).map(k=>shuffled(groups[k]));
    bag[l]=[];while(lists.some(x=>x.length))for(const list of lists)if(list.length)bag[l].push(list.pop());
  }
}
function message(text){$('#status').textContent=text;}
function speak(text){
  if(!('speechSynthesis' in window))return;
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='zh-CN';utterance.rate=.85;speechSynthesis.speak(utterance);
}
function snapshot(){
  return {totalScore:total,levels:stats.map(s=>({...s})),highestLevel,history:history.map(h=>({...h}))};
}
function finishSession(){
  gameAudio.pause();
  api.finish(snapshot());
  const panel=$('.playtest-panel section');
  if(!panel||panel.querySelector('.session-summary'))return;
  const summary=document.createElement('div');summary.className='session-summary';
  summary.innerHTML='<p>总分 <strong>'+total+'</strong> 分</p><table aria-label="各等级成功失败统计"><thead><tr><th>难度</th><th>成功</th><th>失败</th><th>得分</th></tr></thead><tbody>'+stats.map(s=>'<tr><td>L'+s.level+' '+s.label+'</td><td>'+s.successes+'</td><td>'+s.failures+'</td><td>'+s.score+'</td></tr>').join('')+'</tbody></table>';
  panel.insertBefore(summary,panel.querySelector('button'));
}
function syncPanel(){
  $('#settings-summary').textContent=(settings.level?'锁定L'+settings.level:'自动')+' · 当前L'+level+' · '+settings.size+'% / '+settings.snap+'%';
  for(const key of ['size','snap'])$('#'+key+'-out').textContent=settings[key]+'%';
  $('#metrics').textContent='当前题 '+(puzzle?.q.id||'—')+' · '+(expired?'收尾中':'作答')+
    '\n本题作答 '+(elapsed/1000).toFixed(1)+' 秒'+
    '\n独立完成 '+stats.reduce((n,s)=>n+s.independent,0)+' · 看后完成 '+stats.reduce((n,s)=>n+s.viewed,0)+
    '\n各级得分 '+stats.map(s=>s.score).join(' / ')+
    '\n总分 '+total+' · 连续独立 '+streak+' · 失败 '+stats.reduce((n,s)=>n+s.failures,0);
}
function newRound(){
  if(expired){finishSession();return;}
  if(settings.level&&settings.level!==level)streak=viewStreak=0;
  level=settings.level||level;
  highestLevel=Math.max(highestLevel,level);
  const q=bag[level].find(q=>!used.has(q.id));
  if(!q){message('本级题目已体验完，本轮结束。');finishSession();return;}
  used.add(q.id);puzzle=new Puzzle(q);({points:positions,active:activeNodes}=layout(q));
  elapsed=0;viewed=viewing=settled=drag=dead=false;completionHold=0;pendingFeedback=null;
  viewRoute=null;round++;
  $('#instruction').textContent=level===1?'把所有灰线都走一遍':level===2?'双线走两遍，每次亮一条':'双线走两遍，箭头顺着走';
  message('按住一个白点开始，松手后可以接着画。');
  api.update({score:total,level,remainingMs});draw();syncPanel();
}
function start(){
  gameAudio.start();
  level=settings.level||1;streak=viewStreak=total=0;remainingMs=120000;expired=false;used=new Set();history=[];round=0;
  highestLevel=level;
  stats=LABELS.map((label,i)=>({level:i+1,label,score:0,successes:0,failures:0,clears:0,errors:0,deadEnds:0,independent:0,viewed:0}));
  makeBags();last=performance.now();newRound();
}
function crossed(i){
  const [a,b]=puzzle.q.edges[i],A=positions[a],B=positions[b],out=[];
  puzzle.q.edges.forEach(([c,d],j)=>{if(i===j)return;const C=positions[c],D=positions[d];
    const rx=B[0]-A[0],ry=B[1]-A[1],sx=D[0]-C[0],sy=D[1]-C[1],den=rx*sy-ry*sx;
    if(Math.abs(den)<.0001)return;const t=((C[0]-A[0])*sy-(C[1]-A[1])*sx)/den;
    const u=((C[0]-A[0])*ry-(C[1]-A[1])*rx)/den;if(t>0&&t<1&&u>=0&&u<=1)out.push(t);});
  return out;
}
function arrowLocation(i){
  const [a,b]=puzzle.q.edges[i],A=positions[a],B=positions[b],len=Math.hypot(B[0]-A[0],B[1]-A[1]);
  const intersections=crossed(i),pad=46/len;
  return [.5,.38,.62,.3,.7,.26,.74].filter(t=>t>=pad&&t<=1-pad).sort((a,b)=>
    Math.min(1,...intersections.map(t=>Math.abs(t-b)))-Math.min(1,...intersections.map(t=>Math.abs(t-a))))[0]??.5;
}
function draw(){
  if(!puzzle)return;
  let lines='',arrows='';
  puzzle.q.edges.forEach(([a,b,m,d],i)=>{
    const A=positions[a],B=positions[b],length=Math.hypot(B[0]-A[0],B[1]-A[1])||1;
    for(let k=0;k<m;k++){
      const offset=m===2?(k===0?8:-8):0,ox=-(B[1]-A[1])/length*offset,oy=(B[0]-A[0])/length*offset;
      const walked=m-puzzle.remaining[i]>k;
      lines+='<line data-edge="'+i+'" class="edge'+(m===2?' thin':'')+(walked?' walked':'')+
        '" x1="'+(A[0]+ox)+'" y1="'+(A[1]+oy)+'" x2="'+(B[0]+ox)+'" y2="'+(B[1]+oy)+'"/>';
    }
    if(d){const t=arrowLocation(i),x=A[0]+(B[0]-A[0])*t,y=A[1]+(B[1]-A[1])*t,angle=Math.atan2(B[1]-A[1],B[0]-A[0])*180/Math.PI;
      arrows+='<polygon class="arrow'+(puzzle.remaining[i]===0?' walked':'')+'" points="13,0 -9,10 -9,-10" transform="translate('+x+','+y+') rotate('+angle+')"/>';}
  });
  const radius=24*settings.size/100;
  const nodes=activeNodes.map(v=>{const [x,y]=positions[v];return '<g data-node="'+v+'">'+
    (puzzle.current===v?'<circle class="tip-ring" cx="'+x+'" cy="'+y+'" r="'+(radius+7)+'"/>':'')+
    '<circle class="pearl" cx="'+x+'" cy="'+y+'" r="'+radius+'"/></g>';}).join('');
  svg.innerHTML='<defs><radialGradient id="pearl" cx="35%" cy="25%" r="80%"><stop stop-color="#fff"/><stop offset=".6" stop-color="#f8faf9"/><stop offset="1" stop-color="#d4e0e5"/></radialGradient>'+
    '<filter id="pearlShadow" x="-60%" y="-60%" width="230%" height="230%"><feDropShadow dx="2" dy="6" stdDeviation="4" flood-color="#617d8c" flood-opacity=".2"/></filter>'+
    '<filter id="lineShadow" filterUnits="userSpaceOnUse" x="0" y="0" width="1280" height="575"><feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#7d9cb0" flood-opacity=".2"/></filter></defs>'+lines+arrows+nodes;
  $('#undo').disabled=settled||viewing||(!puzzle.path.length&&puzzle.current===null);
  $('#reset').disabled=settled||viewing;
  $('#view-answer').disabled=settled||viewing;
  $('#undo').classList.toggle('pulse',dead&&!viewing);
  $('#progress').textContent=puzzle.path.length+' / '+puzzle.q.edges.reduce((n,e)=>n+e[2],0)+' 步';
}
function canInput(){return api?.isInteractive()&&!settled&&!viewing;}
function updateDead(){const was=dead;dead=puzzle.dead;if(dead&&!was)stats[level-1].deadEnds++;draw();}
function moved(to){
  if(!puzzle.go(to))return false;
  gameAudio.step();
  message(expired?'把这一幅画完，就完成本轮。':'松手也没关系，按住蓝圈里的白点接着画。');
  if(puzzle.complete){draw();complete();}else updateDead();return true;
}
function point(event){const matrix=svg.getScreenCTM();return new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse());}
function nearNode(p){
  let best=null,distance=Infinity;
  for(const v of activeNodes){const n=positions[v],d=Math.hypot(n[0]-p.x,n[1]-p.y);if(d<distance){distance=d;best=v;}}
  return distance<=48*settings.size/100*settings.snap/100?best:null;
}
function pointerDown(event){
  if(!canInput())return;const v=nearNode(point(event));if(v===null)return;
  if(puzzle.current===null||puzzle.path.length===0){puzzle.start(v);updateDead();}
  if(v!==puzzle.current)return;
  drag=true;travelTo=null;svg.setPointerCapture(event.pointerId);event.preventDefault();
}
function pointerMove(event){
  if(!drag||!canInput())return;const p=point(event),from=positions[puzzle.current];
  const dx=p.x-from[0],dy=p.y-from[1],dist=Math.hypot(dx,dy);
  if(travelTo!==null){if(dist<=48*settings.size/100*settings.snap/100)travelTo=null;return;}
  if(dist<40)return;
  const options=moves(puzzle.q,puzzle.current,puzzle.remaining).map(([v])=>{
    const target=positions[v],tx=target[0]-from[0],ty=target[1]-from[1],len=Math.hypot(tx,ty);
    return {v,len,angle:Math.acos(Math.max(-1,Math.min(1,(dx*tx+dy*ty)/(dist*len))))};
  }).filter(o=>o.angle<=Math.PI/6*settings.snap/100&&dist>=Math.min(o.len*.55,80));
  options.sort((a,b)=>a.angle-b.angle);
  if(options.length){const target=positions[options[0].v];if(moved(options[0].v)&&Math.hypot(p.x-target[0],p.y-target[1])>48*settings.size/100*settings.snap/100)travelTo=options[0].v;}
}
function beginView(){
  if(!canInput())return;
  const solution=solve(puzzle.q,null,puzzle.q.edges.map(e=>e[2]));
  if(!solution){message('本题走法暂不可用，请重开一轮。');return;}
  if(!viewed){stats[level-1].failures++;stats[level-1].errors++;}
  viewing=true;viewed=true;streak=0;drag=false;travelTo=null;puzzle.reset();dead=false;
  puzzle.start(solution.start);viewElapsed=0;viewRoute=[...solution.route.map(([to])=>({to})),{done:true}];
  message('看，是这样走的。看完后，请自己画一遍。');speak('看，是这样走的');draw();
}
function finishView(){
  viewing=false;viewRoute=null;viewElapsed=0;puzzle.reset();dead=false;
  message(expired?'请自己画完这一幅，完成本轮。':'现在请自己画一遍。本题不计分。');draw();
}
function complete(){
  if(settled)return;settled=true;drag=false;
  const originalLevel=level,outcome=settle(level,viewed,streak,viewStreak,settings.level);
  const row=stats[originalLevel-1];row.score=row.score+outcome.award;if(!viewed){row.clears++;row.successes++;}
  row[viewed?'viewed':'independent']++;
  total=total+outcome.award;streak=outcome.streak;viewStreak=outcome.viewStreak;
  history.push({id:puzzle.q.id,level:originalLevel,viewed,result:viewed?'failure':'success',award:outcome.award,elapsedMs:Math.round(elapsed)});
  const nextLevel=outcome.nextLevel;
  highestLevel=Math.max(highestLevel,nextLevel);
  completionHold=800;
  pendingFeedback=()=>api.feedback({correct:true,score:total,scoreDelta:viewed?undefined:outcome.award,
    level:originalLevel,levelUp:nextLevel>originalLevel,
    onComplete:()=>{level=nextLevel;if(expired)finishSession();else newRound();}});
  draw();
  syncPanel();
}
function tick(now){
  const delta=now-last;last=now;
  if(api?.getState().state==='game'){
    if(settled){
      if(pendingFeedback){completionHold-=delta;if(completionHold<=0){const feedback=pendingFeedback;pendingFeedback=null;feedback();}}
    }else if(viewing){
      viewElapsed+=delta;
      if(viewElapsed>=(viewRoute[0]?.done?1500:1000)){viewElapsed=0;const step=viewRoute.shift();
        if(step?.done){finishView();}
        else if(step&&'start' in step)puzzle.start(step.start);
        else if(step&&puzzle.go(step.to))gameAudio.step();
        draw();}
    }else{
      elapsed+=delta;
      remainingMs=Math.max(0,remainingMs-delta);
      if(remainingMs===0&&!expired){expired=true;message('把这一幅画完，就完成本轮。');}
      api.update({remainingMs});

    }
    syncPanel();
  }
  raf=requestAnimationFrame(tick);
}
api=createGameShell({
  mount:$('#mount'),mode:'playtest',
  config:{title:'一笔通关',icon:'./assets/icon-f03.png',background:'./assets/background.png',clock:'external',feedbackDurationMs:1500},
  adapter:{
    mount({container,api:gameApi}){
      api=gameApi;area=container;area.innerHTML='<div class="stroke-game"><div class="game-brand"><img src="./assets/icon-f03.png" alt=""><span>一笔通关</span></div>'+
        '<h1 class="instruction" id="instruction"></h1><span class="progress-label" id="progress"></span>'+
        '<svg id="board" viewBox="0 0 1280 575" aria-label="一笔通关操作区域"></svg>'+
        '<div class="actions"><button id="undo">↶ 退一步</button><button id="reset">↻ 重新画</button><button id="view-answer">看看走法</button></div>'+
        '<p class="status" id="status" role="status"></p></div>';
      svg=$('#board');svg.addEventListener('pointerdown',pointerDown);svg.addEventListener('pointermove',pointerMove);
      for(const name of ['pointerup','pointercancel','lostpointercapture'])svg.addEventListener(name,()=>{drag=false;});
      $('#view-answer').onclick=beginView;
      $('#undo').onclick=()=>{if(!canInput())return;puzzle.undo();updateDead();message('按住蓝圈里的白点继续；也可以重新画。');};
      $('#reset').onclick=()=>{if(!canInput())return;puzzle.reset();dead=false;draw();message('从一个白点重新开始。');};
    },
    start,
    pause(){gameAudio.pause();drag=false;window.speechSynthesis?.cancel();},
    resume(){gameAudio.resume();last=performance.now();},
    getResult:snapshot,
    destroy(){gameAudio.destroy();cancelAnimationFrame(raf);window.speechSynthesis?.cancel();}
  }
});
$('#level').onchange=event=>{settings.level=+event.target.value;syncPanel();};
for(const key of ['size','snap'])$('#'+key).oninput=event=>{settings[key]=+event.target.value;draw();syncPanel();};
$('#defaults').onclick=()=>{Object.assign(settings,{level:0,size:100,snap:100});$('#level').value='0';for(const key of ['size','snap'])$('#'+key).value='100';draw();syncPanel();};
$('#restart-session').onclick=()=>api.start(true);
document.addEventListener('visibilitychange',()=>{if(document.hidden)api.pause();});
// Read-only diagnostics for reproducible local acceptance. No setters, shortcuts, or persistence.
window.oneStrokeDiagnostics=()=>({shell:api.getState(),audio:gameAudio.diagnostics(),settings:{...settings},question:puzzle.q.id,level,remainingMs,elapsedMs:elapsed,streak,viewStreak,dead,viewed,viewing,completionHold,expired,settled,current:puzzle.current,path:puzzle.path.map(x=>x.slice()),remaining:puzzle.remaining.slice(),nodes:positions.map(x=>x.slice()),activeNodes:activeNodes.slice(),summary:snapshot(),poolSizes:Object.values(pool).map(q=>q.length)});
raf=requestAnimationFrame(tick);
