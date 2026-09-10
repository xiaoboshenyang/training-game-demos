(function(root){
'use strict';
const DEFAULTS={mode:0,demo:100,idle:100};
const POINTS=[10,15,20,25,30,40], LENGTHS=[3,4,5,6,8,10];
class Game{
 constructor(bank,emit=()=>{},seed=Date.now()){this.bank=bank;this.emit=emit;this.settings={...DEFAULTS};this.seed=seed>>>0;this.reset();}
 reset(){this.phase='intro';this.paused=false;this.tutorial=false;this.remaining=120000;this.level=Number(this.settings.mode)||1;this.highest=this.level;this.score=0;this.good=0;this.hard=0;this.history=[];this.log=[];this.stats=Array.from({length:6},()=>({score:0,correct:0,assisted:0,mistakes:0,interrupted:0}));this.question=null;this.applied=null;this.active=-1;this.errorKey=-1;this.lastPoints=0;this.wait=0;this.nextLevel=this.level;this.emit({type:'reset'});}
 random(){this.seed=(1664525*this.seed+1013904223)>>>0;return this.seed/4294967296;}
 configure(values){this.settings={...this.settings,...values};}
 start(){this.reset();this.phase='countdown';this.wait=3000;this.tutorial=true;}
 formal(){this.reset();this.phase='starting';this.newQuestion();}
 pick(){const recent=this.history.slice(-3).map(q=>q.family_id);let pool=this.bank.questions.filter(q=>q.level===this.level&&!recent.includes(q.family_id));const unused=pool.filter(q=>!this.history.some(h=>h.id===q.id));if(unused.length)pool=unused;if(!pool.length)throw Error('题库不足');return pool[Math.floor(this.random()*pool.length)];}
 newQuestion(){
  this.applied={...this.settings};const level=Number(this.applied.mode)||this.nextLevel;
  if(level!==this.level){this.good=0;this.hard=0;}this.level=level;this.highest=Math.max(this.highest,level);
  this.question=this.tutorial?{id:'tutorial',level:1,keys:[3,4,3],reward_slots_ms:[500,500,750],family_id:'tutorial'}:this.pick();
  if(!this.tutorial){this.history.push(this.question);this.log.push({id:this.question.id,level,seed:this.seed,result:'active'});}
  this.assisted=false;this.settled=false;this.index=0;this.nextLevel=this.level;this.play('demo');
 }
 play(kind){this.phase=kind;this.playIndex=0;this.index=0;this.startNote();}
 startNote(){const slot=900*this.applied.demo/100;this.wait=slot;this.active=this.question.keys[this.playIndex];this.litFor=slot*2/3;this.emit({type:'note',key:this.active,duration:this.litFor});}
 input(key){
  if(this.paused||this.phase!=='input'||key<0||key>8||!Number.isInteger(key))return false;
  this.active=key;this.litFor=220;this.emit({type:'note',key,duration:350});
  if(key!==this.question.keys[this.index]){this.errorKey=key;this.litFor=400;this.emit({type:'wrong'});this.help('wrong');return true;}
  this.index++;this.wait=10000*this.applied.idle/100;
  if(this.index===this.question.keys.length){this.settle(true);this.phase='success';this.wait=1000;this.emit({type:'success'});}
  return true;
 }
 help(reason='manual'){
  if(this.paused||this.phase!=='input')return false;
  if(this.assisted){this.settle(false);this.phase='skip';this.wait=1000;}
  else{this.assisted=true;this.phase='retry';this.wait=900;}
  if(reason==='wrong'){this.afterWrong=this.phase;this.phase='wrong';this.wait=1000;}
  this.reason=reason;return true;
 }
 settle(success){
  if(this.settled)return;this.settled=true;
  if(this.tutorial)return;
  const s=this.stats[this.level-1];const independent=success&&!this.assisted;
  const points=success?(independent?POINTS[this.level-1]:5):0;this.lastPoints=points;this.score+=points;s.score+=points;
  if(independent){s.correct++;this.good++;this.hard=0;}else{s.mistakes++;if(success)s.assisted++;this.good=0;this.hard++;}
  this.log[this.log.length-1].result=independent?'independent':success?'assisted':'unfinished';
  if(!Number(this.applied.mode)){
   if(this.good>=(this.level<=3?2:3)&&this.level<6)this.nextLevel=this.level+1;
   else if(this.hard>=2&&this.level>1)this.nextLevel=this.level-1;
  }
 }
 pause(){if(['intro','end','ready'].includes(this.phase)||this.paused)return;this.paused=true;this.emit({type:'pause'});}
 resume(){if(!this.paused)return;this.paused=false;this.emit({type:'resume'});}
 end(){if(this.phase==='end')return;if(this.question&&!this.settled&&!this.tutorial){this.stats[this.level-1].interrupted++;this.log[this.log.length-1].result='interrupted';}this.phase='end';this.active=-1;this.paused=false;this.remaining=0;this.emit({type:'end'});}
 advance(ms){
  if(this.paused||['intro','end','ready'].includes(this.phase))return;
  // Event time advances only through the current phase; reaching the session boundary ends first.
  while(ms>0&&!this.paused&&!['intro','end','ready'].includes(this.phase)){
   const timed=!this.tutorial&&this.phase!=='countdown';
   const step=Math.min(ms,this.wait,timed?this.remaining:Infinity);
   this.wait-=step;ms-=step;if(timed)this.remaining-=step;
   if(this.litFor>0){this.litFor-=step;if(this.litFor<=0){this.active=-1;this.errorKey=-1;}}
   if(timed&&this.remaining<=0){this.end();break;}
   if(this.wait>0)break;
   switch(this.phase){
    case 'countdown':this.newQuestion();break;
    case 'demo':
     this.playIndex++;if(this.playIndex<this.question.keys.length)this.startNote();
     else{this.active=-1;this.phase='gap';this.wait=500;}break;
    case 'gap':this.phase='input';this.index=0;this.wait=10000*this.applied.idle/100;break;
    case 'input':this.help('idle');break;
    case 'retry':this.errorKey=-1;this.play('demo');break;
    case 'wrong':this.errorKey=-1;if(this.afterWrong==='retry')this.play('demo');else this.newQuestion();break;
    case 'success':if(this.tutorial){this.phase='ready';this.active=-1;}else this.newQuestion();break;
    case 'skip':this.newQuestion();break;
    default:throw Error('未知阶段 '+this.phase);
   }
  }
 }
}
root.PianoCore={Game,DEFAULTS,POINTS,LENGTHS};if(typeof module!=='undefined')module.exports=root.PianoCore;
})(globalThis);
