export const LEVELS=['基础','初阶','中阶','高阶','超凡','宗师'];
export const POINTS=[5,6,8,10,12,14],COUNTS=[3,4,6,8,10,12],THRESHOLDS=[2,2,3,5,5,Infinity],CONFLICT=[.35,.55,.55,.7,.7,.85];
export const directions=l=>l<3?['left','right']:l<5?['up','left','right']:['up','down','left','right'];
export function rng(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
export class BoatGame{
 constructor(seed,settings={}){this.seed=seed>>>0;this.random=rng(seed);this.settings={lock:0,conflict:100,hint:100,...settings};this.level=this.settings.lock||1;this.highest=this.level;this.scene=Math.floor((this.level-1)/2);this.score=0;this.streak=0;this.errors=0;this.cover=new Set;this.recovery=false;this.serial=0;this.pair=[];this.pairLevel=0;this.log=[];this.stats=LEVELS.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0,assisted:0}));this.ended=false;this.ask(0)}
 event(type,at,more={}){this.log.push({type,at,level:this.level,...more})}

 ask(at){if(this.ended||at>=120000)return null;
 const ds=directions(this.level),pick=a=>a[Math.floor(this.random()*a.length)],n=COUNTS[this.level-1];
 if(this.pairLevel!==this.level){this.pair=[];this.pairLevel=this.level}
 if(this.level<=2&&!this.pair.length)this.pair=this.random()<.5?['left','right']:['right','left'];
 const target=this.level<=2?this.pair.shift():pick(ds),wrong=pick(ds.filter(d=>d!==target));
 const targetIndex=this.level<=2?1:this.level===3?pick([1,4]):Math.floor(this.random()*n);
 const columns=this.level<=2?n:this.level===6?6:n/2,rows=this.level<=2?1:2;
 const probability=Math.min(.95,CONFLICT[this.level-1]*this.settings.conflict/100),conflict=this.random()<probability;
 const flank=Array.from({length:n},()=>conflict&&this.level!==6?wrong:(this.random()<.6?target:pick(ds)));
 if(this.level===6&&conflict){const tr=Math.floor(targetIndex/columns),tc=targetIndex%columns;for(let i=0;i<n;i++){const distance=Math.abs(Math.floor(i/columns)-tr)+Math.abs(i%columns-tc);flank[i]=distance===1?wrong:pick(ds)}}
 flank[targetIndex]=target;
 const answerOrder=[...ds];if(this.level>=3){for(let i=answerOrder.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[answerOrder[i],answerOrder[j]]=[answerOrder[j],answerOrder[i]]}}
 this.question={id:++this.serial,target,targetIndex,columns,rows,answerOrder,boats:flank,directions:ds,started:at,hinted:this.recovery,submitted:false,help:this.recovery,conflictProbability:probability};
 this.recovery=false;this.event('question',at,{question:structuredClone(this.question),scene:this.scene});return this.question}

 hint(at){const q=this.question;if(this.ended||!q||q.submitted||q.hinted||at>=120000)return false;if(at-q.started<10000*this.settings.hint/100)return false;q.hinted=true;q.help=true;this.streak=0;this.cover.clear();this.event('hint',at,{id:q.id});return true}
 submit(direction,at){const q=this.question;if(this.ended||at>=120000||!q||q.submitted||!q.directions.includes(direction))return null;q.submitted=true;const previous=this.level,correct=direction===q.target,delta=correct?(q.hinted?5:POINTS[previous-1]):-Math.min(2,this.score);this.score+=delta;const stat=this.stats[previous-1];stat.score+=delta;correct?stat.clears++:stat.errors++;if(q.hinted)stat.assisted++;if(correct){this.errors=0;if(!q.hinted){this.streak++;this.cover.add(q.target)}}else{this.streak=0;this.cover.clear();this.errors++}
 let next=previous;if(q.hinted)next=Math.max(1,previous-1);else if(correct&&this.streak>=THRESHOLDS[previous-1]&&this.cover.size>=2)next=Math.min(6,previous+1);else if(this.errors>=3){next=Math.max(1,previous-1);if(previous===1)this.recovery=true}
 if(this.settings.lock)next=this.settings.lock;
 if(next!==previous){this.level=next;this.streak=0;this.errors=0;this.cover.clear()}else if(this.errors>=3){this.errors=0}
 this.highest=Math.max(this.highest,this.level);this.scene=Math.max(this.scene,Math.floor((this.level-1)/2));
 const event={correct,delta,previous,level:this.level,levelUp:this.level>previous,hinted:q.hinted,score:this.score,id:q.id,direction,target:q.target,scene:this.scene,streak:this.streak};this.event('answer',at,event);return event}
 finish(at=120000){if(!this.ended){this.ended=true;this.event('finish',at,{score:this.score})}return this.result()}
 result(){return{totalScore:this.score,levels:structuredClone(this.stats),highestLevel:this.highest,seed:this.seed,scene:this.scene,settings:{...this.settings},attempts:this.stats.reduce((a,b)=>a+b.clears+b.errors,0)}}
}
