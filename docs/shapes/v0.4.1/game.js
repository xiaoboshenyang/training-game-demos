import {createGameShell,LEVELS} from './public-v1.2/template.js';
import {patterns,analyze,polygon} from './geometry.js';
const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const rules=[null,{grade:'简单',min:2,max:4,award:50,need:1},{grade:'简单',min:4,max:6,award:70,need:1},{grade:'中等',min:5,max:8,award:90,need:1},{grade:'中等',min:8,max:11,award:110,need:2},{grade:'复杂',min:10,max:12,award:130,need:2},{grade:'复杂',min:12,max:15,award:150,need:Infinity}];
const pending={mode:'auto',amount:100,observe:100};let active={...pending},api,shell,board,groups=[],last=performance.now(),destroyed=false;
let highestLevel=1,summary=null;
let level=1,progress=0,score=0,phase='loading',phaseMs=0,paused=false,current=null,serial=0,history=[],stats=[],easierNext=false,lastPattern=-1;
const assets=[],qualification=[];
function el(tag,attrs={}){const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));return e}
function snapshot(){return JSON.parse(JSON.stringify({version:'0.4.1_mock',shell:api?.getState(),phase,phaseMs,paused,level,highestLevel,summary,progress,score,pending,active,qualification,stats,history,current:current&&{id:current.id,pattern:current.asset.pattern.name,patternId:current.asset.pattern.id,level:current.level,radius:current.layout.radius,layout:current.layout.layout,rect:current.layout.rect,cells:current.layout.cells.map(c=>({x:c.x,y:c.y,size:c.size,coverage:c.coverage,fragment:c.fragment,allowed:c.allowed})),eligible:current.layout.eligible,movable:current.movable,angles:current.angles,helped:current.helped,hints:current.hints,moves:current.moves,amount:current.movable.length,observationMs:current.observationMs,settled:current.settled}}))}
Object.defineProperty(window,'demoDebug',{get:snapshot});
async function preload(){
 const layouts=[{scale:1,x:0,y:0},{scale:1.15,x:0,y:0},{scale:1.3,x:0,y:0},{scale:1.5,x:0,y:0},{scale:1.3,x:50,y:0},{scale:1.3,x:-50,y:0},{scale:1.3,x:0,y:50},{scale:1.3,x:0,y:-50}];
 for(const pattern of patterns){
  const image=new Image();await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(Error(pattern.name+'原图加载失败'));image.src=pattern.url});
  const candidates=[];for(const radius of [1,2])for(const layout of layouts)candidates.push(analyze(image,radius,layout));
  const asset={pattern,image,candidates};assets.push(asset);
  qualification.push({id:pattern.id,name:pattern.name,grade:pattern.grade,maxEffective7:Math.max(...candidates.filter(c=>c.radius===1).map(c=>c.eligible.length)),maxEffective19:Math.max(...candidates.filter(c=>c.radius===2).map(c=>c.eligible.length)),levels:[1,2,3,4,5,6].filter(l=>rules[l].grade===pattern.grade&&candidates.some(c=>(l===1||c.radius===2)&&c.eligible.length>=rules[l].min+1)),candidates:candidates.map(c=>({radius:c.radius,layout:c.layout,effective:c.eligible.length,fragments:c.cells.filter(v=>v.fragment).length}))});
  $('loading').textContent=`正在准备真实图案与有效块资格… ${assets.length}/15`;await new Promise(r=>setTimeout(r,0));
 }
}
function selection(){const r=rules[level],pool=[];for(const asset of assets)if(asset.pattern.grade===r.grade)for(const layout of asset.candidates)if((level===1||layout.radius===2)&&layout.eligible.length>=r.min+1)pool.push({asset,layout});if(!pool.length)return null;const fresh=pool.filter(v=>v.asset.pattern.id!==lastPattern),options=fresh.length?fresh:pool;return options[Math.floor(Math.random()*options.length)]}
function record(result,award=0){if(!current)return;history.push({id:current.id,pattern:current.asset.pattern.name,level:current.level,movable:current.movable.length,helped:current.helped,hints:current.hints,moves:current.moves,result,award,remainingMs:api.getState().remainingMs});}
function nextQuestion({skip=false}={}){
 if(!api.isInteractive()||api.getState().remainingMs<=0)return;
 if(skip&&current&&!current.settled)record('换题');
 const wasMode=active.mode;active={...pending};if(active.mode!=='auto'){const next=+active.mode;if(level!==next)progress=0;level=next}else if(wasMode!=='auto')progress=0;
 highestLevel=Math.max(highestLevel,level);const selected=selection();if(!selected){phase='unavailable';current=null;$('message').textContent=`L${level} 暂无足够有效块的图案，不能凑碎片。请在面板选择其他等级。`;board.replaceChildren();api.update({level,score});controls();return}
 const {asset,layout}=selected,r=rules[level],cap=Math.min(r.max,layout.eligible.length-1),base=r.min+Math.floor(Math.random()*(cap-r.min+1));
 let count=Math.min(cap,Math.max(1,Math.round(base*active.amount/100)));
 if(easierNext){count=Math.max(1,Math.min(count,(current?.movable.length||count)-1));easierNext=false}
 const eligible=layout.eligible.slice();for(let i=eligible.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[eligible[i],eligible[j]]=[eligible[j],eligible[i]]}
 current={id:++serial,asset,layout,level,movable:eligible.slice(0,count),angles:layout.cells.map(()=>0),helped:false,hints:0,moves:0,settled:false,observationMs:5000*active.observe/100};
 lastPattern=asset.pattern.id;phase='observe';phaseMs=current.observationMs;api.update({level,score});render();controls();
}
function begin(){if(phase!=='observe'||!api.isInteractive()||paused)return;for(const i of current.movable){const wrong=[0,1,2,3,4,5].filter(a=>!current.layout.cells[i].allowed.includes(a));current.angles[i]=wrong[Math.floor(Math.random()*wrong.length)]}phase='play';phaseMs=0;renderAngles();controls()}
function rotate(i){if(phase!=='play'||!api.isInteractive()||paused||current.settled||!current.movable.includes(i))return;current.angles[i]=(current.angles[i]+1)%6;current.moves++;renderAngles();if(current.movable.every(j=>current.layout.cells[j].allowed.includes(current.angles[j])))complete()}
function complete(){
 if(current.settled||!api.isInteractive()||api.getState().remainingMs<=0)return;current.settled=true;const oldLevel=level,r=rules[oldLevel],award=current.helped?Math.round(r.award*.8):r.award;score+=award;stats[oldLevel-1].score+=award;stats[oldLevel-1].clears++;record('完成',award);
 let levelUp=false;if(active.mode==='auto'&&!current.helped){progress++;if(level<6&&progress>=r.need){level++;progress=0;levelUp=true}}
 highestLevel=Math.max(highestLevel,level);phase='feedback';renderAngles();controls();api.feedback({correct:true,score,scoreDelta:award,level,levelUp,onComplete:()=>{if(api.isInteractive()&&api.getState().remainingMs>0)nextQuestion()}});
}
function help(){if(!api.isInteractive()||paused||!['play','hint'].includes(phase))return;current.helped=true;current.hints++;phase='hint';phaseMs=3000;renderAngles();controls()}
function easier(){if(!api.isInteractive()||paused||!['observe','play','hint'].includes(phase))return;record('主动变简单');current.settled=true;progress=0;if(active.mode==='auto'&&level>1){level--;easierNext=false}else easierNext=true;nextQuestion()}
function answer(){if(!api.isInteractive()||paused||!['play','hint'].includes(phase))return;record('查看答案');current.settled=true;phase='answer';phaseMs=1500;renderAngles();controls()}
function imageNode(){return el('image',{href:current.asset.pattern.url,...current.layout.rect,preserveAspectRatio:'none'})}
function render(){
 board.replaceChildren();groups=[];const r=current.layout.rect,x=Math.min(0,r.x-16),y=Math.min(0,r.y-16),right=Math.max(720,r.x+r.width+16),bottom=Math.max(680,r.y+r.height+16);board.setAttribute('viewBox',`${x} ${y} ${right-x} ${bottom-y}`);
 const full=imageNode();full.setAttribute('class','full-image');board.append(full);const defs=el('defs');board.append(defs);
 for(const i of current.movable){const c=current.layout.cells[i],clip=el('clipPath',{id:'clip-'+i,clipPathUnits:'userSpaceOnUse'});clip.append(el('polygon',{points:polygon(c)}));defs.append(clip);const tile=el('g',{class:'tile','data-cell':i,role:'button',tabindex:0,'aria-label':`第${i+1}个区域，旋转60度`}),cut=el('g',{'clip-path':`url(#clip-${i})`}),turn=el('g');cut.append(el('polygon',{class:'opaque-backing',points:polygon(c),fill:'#e9e6de'}));turn.append(el('rect',{x:c.x-2*c.size,y:c.y-2*c.size,width:4*c.size,height:4*c.size,fill:'#e9e6de'}),imageNode());cut.append(turn);tile.append(cut,el('polygon',{class:'edge',points:polygon(c),fill:'transparent'}));tile.onclick=()=>rotate(i);tile.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();rotate(i)}};board.append(tile);groups.push({i,tile,turn})}
 $('patternName').textContent=current.asset.pattern.name;renderAngles();
}
function renderAngles(){const playing=phase==='play';for(const {i,tile,turn} of groups){const c=current.layout.cells[i];turn.setAttribute('transform',`rotate(${current.angles[i]*60} ${c.x} ${c.y})`);tile.style.display=playing?'':'none';tile.setAttribute('tabindex',playing?'0':'-1')}}
function controls(){
 if(!api)return;const interactive=api.isInteractive()&&!paused;$('begin').hidden=phase!=='observe';$('begin').disabled=!interactive;$('help').disabled=!interactive||!['play','hint'].includes(phase);$('easier').disabled=!interactive||!['play','hint','observe'].includes(phase);$('answer').disabled=!interactive||!['play','hint'].includes(phase);$('skip').disabled=!interactive||!['play','hint','observe','answer'].includes(phase);$('applyNext').disabled=!interactive;
 if(phase!=='unavailable')$('message').textContent=phase==='observe'?`先看完整图 · ${Math.ceil(phaseMs/1000)}秒后开始，也可以提前开始`:phase==='hint'?`查看完整图 · ${Math.ceil(phaseMs/1000)}秒后继续`:phase==='play'?'点击虚线区域旋转，连接完整图案':phase==='feedback'?'拼好了':phase==='answer'?'完整图 · 下一题准备中':phase==='ended'?'本轮已结束':'';
 $('progress').textContent=`L${level} ${LEVELS[level-1]} · ${level===6?'最高等级':`升级进度 ${progress}/${rules[level].need}`}`;
 $('settings').textContent=`当前生效：${active.mode==='auto'?'自动':'锁定L'+active.mode} / L${level}，可转${active.amount}%、观察${active.observe}%${current?`（本题${current.movable.length}块、${current.observationMs/1000}秒）`:''}。待下题：${pending.mode==='auto'?'自动':'锁定L'+pending.mode}，可转${pending.amount}%、观察${pending.observe}%。`;
}
function tick(now){if(destroyed)return;const delta=now-last;last=now;if(api&&!paused&&api.isInteractive()&&api.getState().remainingMs>0&&['observe','hint','answer'].includes(phase)){phaseMs=Math.max(0,phaseMs-delta);if(phaseMs===0){if(phase==='observe')begin();else if(phase==='hint'){phase='play';renderAngles()}else nextQuestion()}controls()}requestAnimationFrame(tick)}
const adapter={
 mount({container,api:provided}){api=provided;container.innerHTML='<section class="shapes-game"><div class="shape-head"><h1 id="patternName">形状拼图</h1><span id="progress"></span></div><svg id="board" viewBox="0 0 720 680" aria-label="旋转拼图"></svg><p id="message" role="status"></p><div class="shape-actions"><button id="begin" class="primary">开始拼图</button><button id="help">查看完整图</button><button id="easier">换一道简单的</button><button id="skip">换一题</button><button id="answer">查看答案</button></div></section>';board=$('board');$('begin').onclick=begin;$('help').onclick=help;$('easier').onclick=easier;$('skip').onclick=()=>nextQuestion({skip:true});$('answer').onclick=answer;},
 start(){level=pending.mode==='auto'?1:+pending.mode;highestLevel=level;summary=null;progress=0;score=0;history=[];stats=LEVELS.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0}));current=null;easierNext=false;lastPattern=-1;active={...pending};paused=false;last=performance.now();nextQuestion();},
 pause(){paused=true;controls();},resume(){paused=false;last=performance.now();controls();},getResult(){phase='ended';if(current&&!current.settled){record('时间到未完成');current.settled=true}renderAngles();summary={totalScore:score,highestLevel,levels:stats.map(s=>({...s}))};return summary;},destroy(){destroyed=true},onExit(){}
};
function updatePending(){pending.mode=$('levelMode').value;pending.amount=+$('amount').value;pending.observe=+$('observe').value;$('amountText').textContent=pending.amount+'%';$('observeText').textContent=pending.observe+'%';controls()}
['levelMode','amount','observe'].forEach(id=>$(id).addEventListener('input',updatePending));$('applyNext').onclick=()=>nextQuestion({skip:true});$('defaults').onclick=()=>{$('levelMode').value='auto';$('amount').value=100;$('observe').value=100;updatePending()};
try{await preload();$('loading').hidden=true;$('qualification').textContent='有效图形资格已检查：'+[1,2,3,4,5,6].map(l=>`L${l} ${qualification.filter(q=>q.levels.includes(l)).length}张`).join(' / ');shell=createGameShell({mount:$('mount'),config:{title:'转角成画',background:'background.svg',clock:'internal',feedbackDurationMs:1500},mode:'playtest',adapter});requestAnimationFrame(tick)}catch(e){$('loading').textContent='准备失败：'+e.message+'。请刷新重试，或检查本地素材路径。';console.error(e)}

