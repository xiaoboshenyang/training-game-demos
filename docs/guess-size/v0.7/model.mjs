export const LABELS=['基础','初阶','中阶','高阶','超凡','宗师'];
export const FOODS={apple:'苹果',pear:'梨',carrot:'胡萝卜',eggplant:'茄子',corn:'玉米',egg:'鸡蛋'};
export const POINTS=[10,15,20,25,30,35];
export const LEVELS=[
 {plates:1,kinds:[1,1],target:[1,4],other:[0,0]},
 {plates:1,kinds:[3,3],target:[3,6],other:[2,4]},
 {plates:1,kinds:[4,4],target:[4,7],other:[3,5]},
 {plates:1,kinds:[4,4],target:[5,8],other:[4,6]},
 {plates:1,kinds:[5,5],target:[6,10],other:[5,7]},
 {plates:1,kinds:[5,6],target:[8,12],other:[6,8]}
];
export function random(seed){let a=seed>>>0;return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
const int=(r,a,b)=>a+Math.floor(r()*(b-a+1));
export function shuffle(a,r){a=[...a];for(let i=a.length-1;i>0;i--){const j=int(r,0,i);[a[i],a[j]]=[a[j],a[i]]}return a}
export function ranges(level,settings={target:100,other:100}){
 const base=LEVELS[level-1],cap=20;
 const other=base.other.map(n=>Math.round(n*settings.other/100));
 other[0]=Math.max(base.kinds[1]-1,other[0]);other[1]=Math.max(other[0],Math.min(cap-3,other[1]));
 const target=base.target.map(n=>Math.round(n*settings.target/100));
 target[0]=Math.max(1,Math.min(cap-other[1]-(level===1?2:1),target[0]));
 target[1]=Math.min(cap-other[1],Math.max(target[0]+(level===1?2:1),target[1]));
 return {...base,target,other,cap};
}
export function generate(level,seed,settings,previousTarget=null){
 const r=random(seed),cfg=ranges(level,settings),pool=Object.keys(FOODS),target=shuffle(pool.filter(x=>x!==previousTarget),r)[0];
 const kindCount=int(r,...cfg.kinds),others=shuffle(pool.filter(x=>x!==target),r).slice(0,kindCount-1);
 const relation=int(r,0,2),diff=relation===2?0:(level===1?int(r,2,Math.min(3,cfg.target[1]-cfg.target[0])):level<=3?int(r,1,Math.min(2,cfg.target[1]-cfg.target[0])):1);
 const small=int(r,cfg.target[0],cfg.target[1]-diff);
 const totals=relation===0?[small+diff,small]:relation===1?[small,small+diff]:[small,small];
 const sides=totals.map(n=>{const extra=int(r,...cfg.other);const items=shuffle([...Array(n).fill(target),...Array.from({length:extra},(_,i)=>others[i%others.length])],r);
  return [items];});
 const positions=sides.map(([items])=>scatter(items.length,r));
 return {level,seed,target,kinds:[target,...others],sides,positions,totals,answer:relation===0?'left':relation===1?'right':'equal',ranges:cfg};
}

// Fixed-size boxes stay inside a 538 × 446 plate, with room for help outlines.
// Begin with a valid packing, then randomize continuous coordinates without
// allowing collisions. The bounded walk also works at the 20-item capacity.
export function scatter(count,r){
 if(!Number.isInteger(count)||count<0||count>20)throw Error('盘子容量为0—20件');
 const positions=shuffle(Array.from({length:20},(_,i)=>({
  x:16+(i%5)*105.5,y:16+Math.floor(i/5)*110
 })),r).slice(0,count);
 for(let sweep=0;sweep<180;sweep++){
  for(let i=0;i<count;i++){
   const old=positions[i],global=sweep%3===0;
   const x=global?16+r()*422:Math.max(16,Math.min(438,old.x+(r()-.5)*96));
   const y=global?16+r()*330:Math.max(16,Math.min(346,old.y+(r()-.5)*96));
   if(positions.every((p,j)=>j===i||Math.abs(p.x-x)>=94||Math.abs(p.y-y)>=94)){
    positions[i]={x,y};
   }
  }
 }
 return positions;
}
export function settle(state,q,correct,helped,locked=false){
 const delta=correct?(helped?10:POINTS[q.level-1]):0;state.score+=delta;
 const row=state.stats[q.level-1];row.score+=delta;row.attempts++;
 if(correct){if(helped)row.assisted++;else row.clears++}else row.errors++;
 let next=q.level;
 if(helped){next=Math.max(1,next-1);state.good=state.bad=0}
 else if(correct){state.good++;state.bad=0;if(state.good>=2){next=Math.min(6,next+1);state.good=state.bad=0}}
 else{state.bad++;state.good=0;if(state.bad>=2){next=Math.max(1,next-1);state.good=state.bad=0}}
 if(locked){next=q.level;state.good=state.bad=0}
 state.level=next;state.highest=Math.max(state.highest,next);
 return {delta,next,levelUp:next>q.level};
}
export function freshState(){return{score:0,level:1,good:0,bad:0,highest:1,stats:LABELS.map((label,i)=>({level:i+1,label,score:0,clears:0,assisted:0,errors:0,attempts:0}))}}
