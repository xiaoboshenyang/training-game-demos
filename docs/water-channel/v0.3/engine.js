/* round-001: shared browser/Node operation semantics; original physics unchanged. */
(function(root,factory){
 if(typeof module==='object'&&module.exports) module.exports=factory(require('./sim.js'));
 else root.WaterEngine=factory(root.WaterSim);
})(this,function(S){
 'use strict';
 const VERSION='round014-gates-hold-v1';
 const LIMIT=20000, STILL=160, TAIL=1200;
 function outcome(s){return {bath:s.bath,lost:s.lost,absorbed:s.absorbed,spoiled:s.spoiled,dirty:s.dirty,gateOpen:s.gateOpen,spongeLeft:s.spongeLeft,target:s.target,total:s.total,won:S.won(s),ducks:s.ducks.map(d=>d.got),...(s.groupsOpen?{groupsOpen:{...s.groupsOpen}}:{})};}
 function key(s){return JSON.stringify(outcome(s));}
 function begin(s){s.still=0;s.flow={ticks:0,tail:0,before:null,done:false,ok:false,reason:null};return s.flow;}
 function create(level){const s=S.create(level);begin(s);return s;}
 function advance(s,budget=1){
  const f=s.flow;if(!f||f.done)return true;
  for(let i=0;i<budget&&!f.done;i++){
   S.step(s);f.ticks++;
   if(f.before!==null){
    f.tail++;
    if(f.tail>=TAIL){f.done=true;f.ok=key(s)===f.before;f.reason=f.ok?'outcome-stable-after-extra-wait':'outcome-changed-after-extra-wait';}
   }else if(s.still>=STILL){f.before=key(s);}
   if(!f.done&&f.ticks>=LIMIT){f.done=true;f.ok=false;f.reason='tick-limit';}
  }
  return f.done;
 }
 function finish(s){while(!advance(s,256)){} return {...s.flow,outcome:outcome(s)};}
 function run(level,strokes){
  const s=create(level),phases=[finish(s)];
  if(!s.flow.ok)return {state:s,phases,ok:false};
  if(S.won(s)||S.muddy(s))return {state:s,phases,ok:true};
  for(const stroke of strokes){
   S.digStroke(s,stroke);begin(s);phases.push(finish(s));
   if(!s.flow.ok||S.won(s)||S.muddy(s))break;
  }
  return {state:s,phases,ok:phases.every(p=>p.ok)};
 }
 function clone(s){
  return {...s,g:s.g.slice(),dir:s.dir.slice(),moved:s.moved.slice(),ducks:s.ducks.map(d=>({...d})),flow:s.flow?{...s.flow}:null,...(s.groupsOpen?{groupsOpen:{...s.groupsOpen},groupIds:s.groupIds.slice(),switchGroup:s.switchGroup.slice(),groupGates:s.groupGates.map(indices=>indices.slice()),touched:s.touched.slice(),idle:s.idle.slice()}:{})};
 }
 return {S,VERSION,LIMIT,STILL,TAIL,create,begin,advance,finish,run,clone,outcome,digStroke:S.digStroke};
});

