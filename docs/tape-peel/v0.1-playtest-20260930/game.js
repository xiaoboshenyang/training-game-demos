import {createGameShell} from './public-template/template.js';

const byId=id=>document.getElementById(id);
const LEVELS=['基础','初阶','中阶','高阶','超凡','宗师'];
const POINTS=[38,44,50,56,62,68]; // 01a v0.1 候选，供本轮玩法测试校准
const QUESTIONS=QUESTION_BANK;
if(QUESTIONS.length!==151||new Set(QUESTIONS.map(q=>q.id)).size!==151)throw new Error('题库快照不完整');
function spreadObjects(items){const groups=new Map();for(const q of items){const key=q.objectId||q.object.replace('·跨级候选','');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(q);}const pool=[];while([...groups.values()].some(group=>group.length)){for(const group of groups.values())if(group.length)pool.push(group.shift());}return pool;}
const pools=Array.from({length:6},(_,i)=>spreadObjects(QUESTIONS.filter(q=>q.level===`L${i+1}`)));
if(pools.some(p=>!p.length))throw new Error('缺少等级题目');
const tune={mode:'auto',turn:1,hit:1,forced:''};
const V3=(x,y,z)=>new THREE.Vector3(x,y,z);
let api,stage,renderer,scene,camera,pivot,holder,round,run,paused=false,lastFrame=performance.now(),clock=0,lastTimePush=0,lastShellState,modelRadius=1.5;
let tasks=[],motions=[],flying=[],down=null,toastTask=0,helpConfirm=false,resizeObserver;
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
const music=new Audio('assets/music.ogg');music.loop=true;music.volume=.2;
const peel=new Audio('assets/tape.wav');peel.volume=.48;
const config={title:'一撕到底',icon:'assets/icon.png',mode:'playtest',clock:'external',feedbackDurationMs:1500,
  onState({state}){paused=state!=='game';if(state===lastShellState)return;lastShellState=state;
    if(paused)music.pause();else if(run)music.play().catch(()=>{});}};

function schedule(ms,fn){tasks.push({at:clock+ms,fn});}
function animate(ms,fn,done){motions.push({start:clock,duration:ms,fn,done});}
function toast(message){const el=stage?.querySelector('.tape-toast');if(!el)return;el.textContent=message;el.style.opacity=1;const token=++toastTask;schedule(1800,()=>{if(token===toastTask)el.style.opacity=0;});}
function resize(){if(!stage||!renderer)return;const w=stage.clientWidth||1280,h=stage.clientHeight||728;
  renderer.setSize(w,h,false);camera.aspect=w/h;
  // 顶部颜色盒与底部按钮各留空；按旋转包围球适配，所有朝向都留在模型区域。
  const safeTop=148,safeBottom=24,safeHeight=Math.max(180,h-safeTop-safeBottom),safeWidth=Math.max(240,w-320);
  const halfFov=Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*Math.min(safeHeight,safeWidth)/h);
  camera.position.set(0,0,modelRadius/Math.sin(halfFov)*1.04);camera.lookAt(0,0,0);
  camera.setViewOffset(w,h,0,-(safeTop-safeBottom)/2,w,h);camera.updateProjectionMatrix();}

function buildTape(t,layer){
  const group=new THREE.Group(),mat=new THREE.MeshStandardMaterial({color:COLORS[t.c].hex,roughness:.38});
  const off=.009+layer*.016;t.hits=[];t.mats=[mat];
  t.segs.forEach((s,i)=>{
    const dir=s.b.clone().sub(s.a),len=dir.length();dir.normalize();
    const y=new THREE.Vector3().crossVectors(s.n,dir);
    const q=new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(dir,y,s.n));
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(len+.024,TAPE_W,.012),mat);
    mesh.quaternion.copy(q);mesh.position.copy(s.a).add(s.b).multiplyScalar(.5).addScaledVector(s.n,off);
    const shine=new THREE.Mesh(new THREE.PlaneGeometry(len+.024,.025),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.35}));
    shine.position.set(0,TAPE_W/2-.02,.0065);mesh.add(shine);group.add(mesh);
    const hit=new THREE.Mesh(new THREE.BoxGeometry(len+.12,(TAPE_W+.2)*tune.hit,.05),new THREE.MeshBasicMaterial({visible:false}));
    hit.quaternion.copy(q);hit.position.copy(mesh.position);hit.userData={tape:t,len};group.add(hit);t.hits.push(hit);
    const jag=new THREE.MeshStandardMaterial({map:jagTex(t.c),transparent:true,alphaTest:.5,roughness:.4,side:THREE.DoubleSide});t.mats.push(jag);
    [[0,-1],[t.segs.length-1,1]].forEach(([si,sign])=>{if(si!==i)return;
      const cap=new THREE.Mesh(new THREE.PlaneGeometry(.07,TAPE_W),jag);cap.quaternion.copy(q);
      if(sign<0)cap.rotateZ(Math.PI);
      cap.position.copy(sign<0?s.a:s.b).addScaledVector(dir,sign*.047).addScaledVector(s.n,off+.006);group.add(cap);
    });
    if(i===0)t.normal=s.n.clone();
  });
  return group;
}
function layerOf(t,map){if(t._L!==undefined)return t._L;return t._L=(t.over||[]).reduce((n,id)=>Math.max(n,layerOf(map[id],map)+1),0);}
function updateHits(){if(!round)return;for(const t of round.tapes)for(const h of t.hits){h.geometry.dispose();h.geometry=new THREE.BoxGeometry(h.userData.len+.12,(TAPE_W+.2)*tune.hit,.05);}}

function makeBox(b,small=false){const el=document.createElement('div');el.className='tape-box'+(small?' small':'');el.style.borderTopColor=COLORS[b.c].hex;
  for(let i=0;i<3;i++){const slot=document.createElement('div');slot.className='tape-slot'+(i<b.n?' filled':'');if(i<b.n)slot.style.background=COLORS[b.c].hex;el.append(slot);}b.el=el;return el;}
function renderBoxes(){const el=stage.querySelector('.tape-boxes');el.replaceChildren();for(const b of round.open)if(b)el.append(makeBox(b));
  if(round.queue.length){const label=document.createElement('span');label.className='tape-next';label.textContent='接下来';el.append(label);for(const b of round.queue.slice(0,2))el.append(makeBox(b,true));}}
function renderRound(){stage.querySelector('.tape-progress strong').textContent=round.tapes.filter(t=>!t.dead).length;
  stage.querySelector('.tape-round').textContent=`${round.q.level} ${round.q.levelName}｜${round.q.object.replace('·跨级候选','')}｜第 ${run.number} 题`;
  renderBoxes();}
function isBlocked(t){return round.tapes.some(o=>!o.dead&&(o.over||[]).includes(t.id))||(t.hiddenBy||[]).some(id=>!round.parts[id].released);}
function checkStuck(){if(round.complete)return;const alive=round.tapes.filter(t=>!t.dead),can=c=>alive.some(t=>t.c===c&&!isBlocked(t));
  if(round.open.some(b=>b&&b.n<3&&can(b.c)))return;
  for(let i=0;i<round.open.length;i++){const b=round.open[i];if(!b)continue;const j=round.queue.findIndex(x=>can(x.c));
    if(j>=0){round.queue.push(b);round.open[i]=round.queue.splice(j,1)[0];round.helped=true;toast('卡住啦，先换个盒子');renderBoxes();return;}}
}
function releaseParts(all=false){if(!round)return;const center=new THREE.Vector3();holder.getWorldPosition(center);
  for(const part of Object.values(round.parts)){
    if(part.released||(part.base&&!all))continue;
    if(!all&&round.tapes.some(t=>!t.dead&&t.bind.includes(part.id)))continue;
    part.released=true;round.releaseLog.push(part.id);
    const wp=part.mesh.getWorldPosition(new THREE.Vector3()),dir=wp.sub(center);dir.y=Math.max(dir.y,0);if(dir.lengthSq()<.01)dir.set(.3,1,.2);dir.normalize();
    scene.attach(part.mesh);part.vel=dir.multiplyScalar(3.4).add(V3((Math.random()-.5)*.8,1.6,(Math.random()-.5)*.8));
    part.spin=V3((Math.random()-.5)*5,(Math.random()-.5)*5,(Math.random()-.5)*5);part.age=0;
    part.mesh.traverse(o=>{if(o.material){o.material=o.material.clone();o.material.transparent=true;}});flying.push(part);
  }
}
function flyTape(t,b){scene.attach(t.group);const from=t.group.position.clone(),normal=t.normal.clone().transformDirection(holder.matrixWorld);
  const lift=from.clone().addScaledVector(normal,.6),rect=b.el.getBoundingClientRect(),canvas=renderer.domElement.getBoundingClientRect();
  const dest=V3(((rect.left+rect.width/2-canvas.left)/canvas.width)*2-1,-((rect.top+rect.height/2-canvas.top)/canvas.height)*2+1,.6).unproject(camera);
  animate(500,p=>{if(p<.3)t.group.position.lerpVectors(from,lift,p/.3);else t.group.position.lerpVectors(lift,dest,(p-.3)/.7);t.group.scale.setScalar(1-.8*p);},()=>scene.remove(t.group));
}
function tapTape(t){if(!api.isInteractive()||round.complete||t.dead)return;
  if(isBlocked(t)){toast('上面还压着一条，先拆上面的');return;}
  const box=round.open.find(b=>b&&b.c===t.c&&b.n<3);
  if(!box){toast('现在要'+[...new Set(round.open.filter(Boolean).map(b=>COLORS[b.c].name))].join('、')+'色的');return;}
  t.dead=true;const last=round.tapes.every(x=>x.dead);if(last)round.complete=true;
  for(const hit of t.hits)hit.removeFromParent();flyTape(t,box);
  try{peel.currentTime=0;peel.play().catch(()=>{});}catch{}
  schedule(250,()=>releaseParts(false));
  schedule(520,()=>{box.n++;renderRound();
    if(last){schedule(500,completeQuestion);return;}
    if(box.n===3)schedule(350,()=>{const i=round.open.indexOf(box);if(i>=0)round.open[i]=round.queue.shift()||null;renderBoxes();checkStuck();});
    else checkStuck();
  });
}
function nextQuestion(){const level=tune.mode==='auto'?run.level:Number(tune.mode);run.level=level;const pool=pools[level-1];
  const offset=run.cursor[level-1]++%pool.length;const q=pool[offset];enterQuestion(q);api.update({score:run.score,level});}
function enterQuestion(q){
  if(round)for(const tape of round.tapes)if(tape.group.parent===scene)scene.remove(tape.group);
  if(pivot)scene.remove(pivot);for(const part of flying)scene.remove(part.mesh);flying=[];tasks=[];motions=[];clock=0;helpConfirm=false;
  lastTimePush=0;
  stage.querySelector('.tape-help-menu').hidden=true;stage.querySelector('.tape-toast').style.opacity=0;
  stage.querySelector('[data-action="skip"]').textContent='换一题';
  pivot=new THREE.Group();scene.add(pivot);holder=new THREE.Group();pivot.add(holder);
  const parts=q.build();for(const part of Object.values(parts))holder.add(part.mesh);
  const map={};const tapes=q.tapes.map(d=>map[d.id]={...d,over:d.over||[],dead:false});
  for(const t of tapes){t.group=buildTape(t,layerOf(t,map));holder.add(t.group);}
  pivot.updateMatrixWorld(true);const bounds=new THREE.Box3().setFromObject(holder),center=bounds.getCenter(new THREE.Vector3()),vertex=new THREE.Vector3();
  let radiusSq=0;holder.traverse(o=>{if(!o.isMesh)return;const positions=o.geometry.getAttribute('position');
    for(let i=0;i<positions.count;i++){vertex.fromBufferAttribute(positions,i).applyMatrix4(o.matrixWorld).sub(center);radiusSq=Math.max(radiusSq,vertex.lengthSq());}});
  holder.position.sub(center);modelRadius=Math.max(.5,Math.sqrt(radiusSq));
  pivot.quaternion.setFromEuler(new THREE.Euler(q.pitch,q.yaw,0,'XYZ'));resize();
  const queue=[...q.queue].map(c=>({c,n:0}));const open=[];for(let i=0;i<q.open;i++)open.push(queue.shift()||null);
  round={q,parts,tapes,queue,open,helped:false,complete:false,elapsedMs:0,releaseLog:[]};run.number++;renderRound();effective();
}
function recordQuestion(outcome){run.history.push({question:round.q.id,level:round.q.level,outcome,elapsedMs:Math.round(round.elapsedMs)});}
function completeQuestion(){if(!round||!round.complete||round.settled)return;round.settled=true;releaseParts(true);
  const level=Number(round.q.level.slice(1)),award=round.helped?Math.round(POINTS[level-1]/2):POINTS[level-1];
  recordQuestion(round.helped?'assisted':'independent');
  run.score+=award;run.stats[level-1].score+=award;run.stats[level-1].clears++;run.maxLevel=Math.max(run.maxLevel,level);
  if(round.helped){run.independent=0;run.needsHelp++;if(tune.mode==='auto'&&run.needsHelp>=2){run.level=Math.max(1,level-1);run.needsHelp=0;}}
  else{run.needsHelp=0;run.independent++;if(tune.mode==='auto'&&run.independent>=2&&level<6){run.level=level+1;run.independent=0;}}
  const promoted=tune.mode==='auto'&&run.level>level;
  api.feedback({correct:true,score:run.score,scoreDelta:award,level:promoted?run.level:level,levelUp:promoted,onComplete:nextQuestion});
}
function skipQuestion(){if(!api.isInteractive()||!round||round.complete)return;round.complete=true;
  recordQuestion('skipped');const level=Number(round.q.level.slice(1));run.stats[level-1].errors++;run.independent=0;run.needsHelp++;
  if(tune.mode==='auto'&&run.needsHelp>=2){run.level=Math.max(1,level-1);run.needsHelp=0;}
  stage.querySelector('.tape-help-menu').hidden=true;
  api.feedback({correct:false,score:run.score,level,onComplete:nextQuestion});
}
function hint(){if(!api.isInteractive()||!round||round.complete)return;round.helped=true;
  const t=round.tapes.find(x=>!x.dead&&!isBlocked(x)&&round.open.some(b=>b&&b.c===x.c&&b.n<3));
  if(!t){toast('先看看下一个颜色盒');return;}
  const n=t.segs[0].n,axis=Math.abs(n.x)>Math.abs(n.y)&&Math.abs(n.x)>Math.abs(n.z)?'x':Math.abs(n.y)>Math.abs(n.z)?'y':'z';
  const dir=axis==='x'?(n.x>0?'右侧':'左侧'):axis==='y'?(n.y>0?'上面':'底面'):(n.z>0?'正面':'背面');
  toast(`试试转到物体的${dir}`);stage.querySelector('.tape-help-menu').hidden=true;
}
function result(){return{totalScore:run?.score||0,highestLevel:run?.maxLevel||1,levels:LEVELS.map((label,i)=>({level:i+1,label,...(run?.stats[i]||{score:0,clears:0,errors:0})}))};}

function onPointerDown(e){if(!api.isInteractive()||!round||round.complete)return;music.play().catch(()=>{});down={x:e.clientX,y:e.clientY,lx:e.clientX,ly:e.clientY,drag:false};renderer.domElement.setPointerCapture(e.pointerId);}
function onPointerMove(e){if(!down||!api.isInteractive()||round.complete)return;
  if(!down.drag&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>10)down.drag=true;
  if(down.drag){const k=.009*tune.turn;
    const q=new THREE.Quaternion().setFromAxisAngle(V3(0,1,0),(e.clientX-down.lx)*k).multiply(new THREE.Quaternion().setFromAxisAngle(V3(1,0,0),(e.clientY-down.ly)*k));
    pivot.quaternion.premultiply(q);
  }down.lx=e.clientX;down.ly=e.clientY;
}
function onPointerUp(e){if(down&&!down.drag&&api.isInteractive()&&!round.complete){const rect=renderer.domElement.getBoundingClientRect();
    pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);
    const targets=[];for(const part of Object.values(round.parts))if(!part.released)part.mesh.traverse(o=>{if(o.isMesh)targets.push(o);});
    for(const t of round.tapes)if(!t.dead)targets.push(...t.hits);
    const hit=ray.intersectObjects(targets,false)[0];if(hit?.object.userData.tape)tapTape(hit.object.userData.tape);
  }down=null;
}
function frame(now){const elapsed=Math.max(0,now-lastFrame),dt=Math.min(.05,elapsed/1000);lastFrame=now;
  if(!paused&&round){clock+=elapsed;
    if(!round.complete&&run.remainingMs>0){const activeMs=Math.min(elapsed,run.remainingMs);run.remainingMs=Math.max(0,run.remainingMs-elapsed);round.elapsedMs+=activeMs;
      if(clock-lastTimePush>=100||run.remainingMs===0){lastTimePush=clock;api.update({remainingMs:run.remainingMs});}
      if(run.remainingMs===0){round.complete=true;recordQuestion('timeup');down=null;api.finish(result());}}
    for(let i=tasks.length-1;i>=0;i--)if(tasks[i].at<=clock){const task=tasks.splice(i,1)[0];task.fn();}
    for(let i=motions.length-1;i>=0;i--){const m=motions[i],p=Math.min(1,(clock-m.start)/m.duration);m.fn(p);if(p>=1){motions.splice(i,1);m.done?.();}}
    for(let i=flying.length-1;i>=0;i--){const part=flying[i];part.age+=dt;
      if(part.age>1.7){scene.remove(part.mesh);flying.splice(i,1);continue;}
      if(part.age>1)part.mesh.traverse(o=>{if(o.material)o.material.opacity=1-(part.age-1)/.7;});
      part.vel.y-=12*dt;part.mesh.position.addScaledVector(part.vel,dt);
      part.mesh.rotation.x+=part.spin.x*dt;part.mesh.rotation.y+=part.spin.y*dt;part.mesh.rotation.z+=part.spin.z*dt;
    }
  }
  renderer?.render(scene,camera);requestAnimationFrame(frame);
}
function mount({container,api:publicApi}){api=publicApi;stage=document.createElement('div');stage.className='tape-stage';stage.innerHTML=`<div class="tape-progress">还剩 <strong>0</strong> 处</div><div class="tape-round"></div><div class="tape-boxes"></div><button class="tape-help" type="button">需要帮助</button><div class="tape-help-menu" hidden><p>提示方向：完成后本题半分。换一题：本题 0 分。</p><button type="button" data-action="hint">提示方向</button><button type="button" data-action="skip">换一题</button></div><div class="tape-toast" role="status"></div>`;
  container.append(stage);renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0,0);stage.prepend(renderer.domElement);
  scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(36,1280/728,.1,100);scene.add(new THREE.HemisphereLight(0xfff6e8,0x9a8570,.8));
  const sun=new THREE.DirectionalLight(0xfff1dc,.8);sun.position.set(4,7,8);scene.add(sun);
  const fill=new THREE.DirectionalLight(0xffffff,.28);fill.position.set(-6,-2,-3);scene.add(fill);
  resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);resize();
  renderer.domElement.addEventListener('pointerdown',onPointerDown);renderer.domElement.addEventListener('pointermove',onPointerMove);
  renderer.domElement.addEventListener('pointerup',onPointerUp);renderer.domElement.addEventListener('pointercancel',()=>down=null);
  stage.querySelector('.tape-help').onclick=()=>{if(api.isInteractive())stage.querySelector('.tape-help-menu').hidden=!stage.querySelector('.tape-help-menu').hidden;};
  stage.querySelector('[data-action="hint"]').onclick=hint;
  stage.querySelector('[data-action="skip"]').onclick=e=>{if(!helpConfirm){helpConfirm=true;e.currentTarget.textContent='确认换题（本题 0 分）';return;}e.currentTarget.textContent='换一题';skipQuestion();};
  requestAnimationFrame(frame);
}
function start(){music.pause();music.currentTime=0;const first=tune.forced?QUESTIONS.find(q=>q.id===tune.forced):null;
  const level=first?Number(first.level.slice(1)):(tune.mode==='auto'?1:Number(tune.mode));
  run={score:0,level,number:0,maxLevel:level,independent:0,needsHelp:0,remainingMs:120000,history:[],
    stats:LEVELS.map(()=>({score:0,clears:0,errors:0})),cursor:pools.map(()=>0)};
  if(first)run.cursor[level-1]=pools[level-1].findIndex(q=>q.id===first.id)+1;
  paused=false;lastFrame=performance.now();lastTimePush=0;if(first)enterQuestion(first);else nextQuestion();api.update({score:0,level,remainingMs:120000});music.play().catch(()=>{});
}
const shell=createGameShell({mount:byId('app'),config,mode:'playtest',adapter:{mount,start,
  pause(){paused=true;down=null;music.pause();peel.pause();},resume(){paused=false;lastFrame=performance.now();music.play().catch(()=>{});},
  getResult:result,onExit(){music.pause();},destroy(){resizeObserver?.disconnect();music.pause();renderer?.dispose();}}});
document.querySelector('.game-stage').append(byId('playtest-tools'));

function effective(){const level=round?.q?.level||'L1',mode=tune.mode==='auto'?'自动':`锁定 L${tune.mode}`;
  byId('effective').textContent=`当前：${mode}｜生效 ${level} ${LEVELS[Number(level.slice(1))-1]}｜旋转 ${Math.round(tune.turn*100)}%｜点按 ${Math.round(tune.hit*100)}%`;}
byId('tool-toggle').onclick=()=>{const body=byId('tool-body');body.hidden=!body.hidden;byId('tool-toggle').setAttribute('aria-expanded',String(!body.hidden));effective();};
byId('level-mode').onchange=e=>{tune.mode=e.target.value;effective();};
byId('turn-percent').oninput=e=>{tune.turn=Number(e.target.value)/100;byId('turn-value').textContent=e.target.value+'%';effective();};
byId('hit-percent').oninput=e=>{tune.hit=Number(e.target.value)/100;byId('hit-value').textContent=e.target.value+'%';updateHits();effective();};
byId('restore').onclick=()=>{tune.mode='auto';tune.turn=tune.hit=1;tune.forced='';byId('level-mode').value='auto';byId('turn-percent').value=byId('hit-percent').value=100;byId('turn-value').textContent=byId('hit-value').textContent='100%';byId('pick-question').value='';updateHits();effective();};
for(let level=1;level<=6;level++){const group=document.createElement('optgroup');group.label=`L${level} ${LEVELS[level-1]}`;
  for(const q of pools[level-1]){const opt=document.createElement('option');opt.value=q.id;opt.textContent=`${q.object}｜${q.id}`;group.append(opt);}byId('pick-question').append(group);}
byId('load-question').onclick=()=>{tune.forced=byId('pick-question').value;shell.start(true);effective();};
setInterval(effective,500);
window.tapePlaytest={getState:()=>({shell:shell.getState(),question:round?.q.id,questionElapsedMs:round?.elapsedMs,remaining:round?.tapes.filter(t=>!t.dead).length,score:run?.score,level:run?.level,history:run?.history,stats:result()}),pick:id=>{if(QUESTIONS.some(q=>q.id===id)){tune.forced=id;shell.start(true);}},
  inspectTargets:()=>round?.tapes.filter(t=>!t.dead).flatMap(t=>t.hits.map(h=>{const p=h.getWorldPosition(new THREE.Vector3()).project(camera),rect=renderer.domElement.getBoundingClientRect();return{id:t.id,color:t.c,blocked:isBlocked(t),box:round.open.some(b=>b&&b.c===t.c&&b.n<3),x:rect.left+(p.x+1)*rect.width/2,y:rect.top+(1-p.y)*rect.height/2};}))};
