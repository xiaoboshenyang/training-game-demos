export const LEVEL_NAMES=['基础','初阶','中阶','高阶','超凡','宗师'];
export const RULE_VERSION='0.2';
export const LIMITS=[18,24,24,28,28,32];
export const AWARDS=[20,25,30,40,50,60];
export const LEVEL_SEQUENCES=[['weekday','zodiac'],...Array.from({length:5},()=>['weekday','zodiac','tiangan'])];
export const BOARD={width:1120,height:560,diameter:96,left:80,top:62};
export class GameEngine {
 constructor(boards){this.boards=boards;this.settings={level:'auto',timePercent:100,gatePercent:100};this.reset();}
 setSettings(patch){this.settings={...this.settings,...patch};}
 reset(){
  this.remainingMs=120000;this.score=0;this.level=this.settings.level==='auto'?1:Number(this.settings.level);
  this.used=new Set();this.lastStart={};this.sequenceCursors={};this.lastSequence=null;this.progress=0;this.correctRun=0;this.failRun=0;this.rounds=[];this.clickErrors=0;this.ended=false;this.busy=false;
  this.stats=LEVEL_NAMES.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0,clickErrors:0}));
  this.next();
 }
 next(){
  if(this.ended)return;
  const sequences=LEVEL_SEQUENCES[this.level-1];
  let cursor=this.sequenceCursors[this.level]??0;
  if(sequences[cursor%sequences.length]===this.lastSequence)cursor++;
  const seq=sequences[cursor%sequences.length];
  const pool=this.boards.filter(b=>b.level===this.level && b.sequence===seq && !this.used.has(b.id));
  const board=pool.find(b=>this.level<5 || b.start!==this.lastStart[seq]);
  if(!board)throw Error('本级固定题库不足，请重开本局');
  this.board=board;this.used.add(board.id);this.lastStart[seq]=board.start;
  this.lastSequence=seq;this.sequenceCursors[this.level]=(cursor+1)%sequences.length;
  this.progress=0;this.clickErrors=0;this.questionLevel=this.level;this.questionLimitMs=LIMITS[this.level-1]*1000*this.settings.timePercent/100;
  this.questionMs=this.questionLimitMs;this.busy=false;this.questionGate=Math.max(1,Math.round(2*this.settings.gatePercent/100));
 }
 step(delta){
  if(this.ended||this.busy)return null;
  this.remainingMs=Math.max(0,this.remainingMs-delta);
  this.questionMs=Math.max(0,this.questionMs-delta);
  if(this.remainingMs===0){this.ended=true;this.busy=true;this.rounds.push({id:this.board.id,level:this.questionLevel,result:'到时未完成',score:0,clickErrors:this.clickErrors,progress:this.progress,stations:this.board.route.length});return 'end';}
  if(this.questionMs===0)return 'timeout';
  return null;
 }
 click(id){
  if(this.ended||this.busy)return {type:'blocked'};
  if(this.board.route.slice(0,this.progress).includes(id))return {type:'visited'};
  if(id!==this.board.route[this.progress]){this.clickErrors++;return {type:'wrong'};}
  this.progress++;
  return {type:this.progress===this.board.route.length?'complete':'correct'};
 }
 settle(correct){
  if(this.busy||this.ended)return null;
  this.busy=true;
  const oldLevel=this.questionLevel,award=correct?AWARDS[oldLevel-1]:0,stat=this.stats[oldLevel-1];
  this.score+=award;stat.score+=award;stat.clickErrors+=this.clickErrors;if(correct)stat.clears++;else stat.errors++;
  if(correct){this.correctRun++;this.failRun=0;}else{this.failRun++;this.correctRun=0;}
  if(this.settings.level==='auto'){
   if(this.correctRun>=this.questionGate && this.level<6)this.level++;
   else if(this.failRun>=this.questionGate && this.level>1)this.level--;
  }
  const changed=this.level!==oldLevel;
  if(changed){this.correctRun=0;this.failRun=0;}
  this.rounds.push({id:this.board.id,level:oldLevel,result:correct?'成功':'超时',score:award,clickErrors:this.clickErrors,progress:this.progress,stations:this.board.route.length,usedMs:Math.round(this.questionLimitMs-this.questionMs)});
  return {correct,score:this.score,scoreDelta:award,level:this.level,levelUp:this.level>oldLevel};
 }
 result(){return {totalScore:this.score,levels:this.stats.map(s=>({...s}))};}
 snapshot(){return {rulesVersion:RULE_VERSION,remainingMs:this.remainingMs,questionMs:this.questionMs,questionLimitMs:this.questionLimitMs,questionGate:this.questionGate,score:this.score,level:this.level,questionLevel:this.questionLevel,boardId:this.board.id,progress:this.progress,clickErrors:this.clickErrors,correctRun:this.correctRun,failRun:this.failRun,ended:this.ended,busy:this.busy,settings:{...this.settings},usedCount:this.used.size,rounds:this.rounds.map(r=>({...r})),stats:this.stats.map(s=>({...s}))};}
}

