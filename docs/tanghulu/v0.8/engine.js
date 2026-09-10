(function(root){
'use strict';
const FRUITS=[['hawthorn','山楂'],['orange_segment','橘子瓣'],['banana_piece','香蕉段'],['green_grape','青提'],['blueberry','蓝莓'],['purple_grape','葡萄'],['strawberry','草莓'],['pineapple_cube','菠萝块'],['kiwi_slice','猕猴桃片'],['watermelon_piece','西瓜块'],['cherry','樱桃'],['cantaloupe_cube','哈密瓜块']].map(([id,name])=>({id,name}));
const LEVELS=[[[2,2],4,3,5,3,.7,.15,1],[[1,1,2],5,3,5,2.8,.65,.15,.9],[[2,2,2],6,4,5,2.6,.6,.2,.8],[[2,2,3],8,4,6,2.4,.55,.25,.75],[[2,2,2,2],10,5,6,2.2,.5,.3,.65],[[2,2,2,2,2],12,5,6,2,.5,.35,.6]].map(([counts,pool,lanes,k,fallSec,p,q,interval],i)=>({level:i+1,counts,pool,lanes,k,fallSec,p,q,interval,capacity:counts.reduce((a,b)=>a+b,0)}));
function rng(seed){let t=Number(seed)>>>0;return()=>{t+=0x6D2B79F5;let a=t;a=Math.imul(a^a>>>15,a|1);a^=a+Math.imul(a^a>>>7,a|61);return((a^a>>>14)>>>0)/4294967296}}
function shuffle(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function createOrder(level=1,seed=1){const cfg=LEVELS[Math.max(0,Math.min(5,level-1))],r=rng(seed);const pool=shuffle(FRUITS.map(f=>f.id),r).slice(0,cfg.pool);const variants=cfg.level===1?[[2,2],[3,1]]:cfg.level===2?[[1,1,2]]:cfg.level===3?[[2,2,2],[3,2,1]]:null;const counts=variants?shuffle(variants[Math.floor(r()*variants.length)],r):cfg.counts;const items=counts.map((count,i)=>({id:pool[i],name:FRUITS.find(f=>f.id===pool[i]).name,count}));return{level:cfg.level,seed,pool,items,need:Object.fromEntries(items.map(f=>[f.id,f.count])),capacity:cfg.capacity}}
function catchBoundary(x,y0,y1,tipX,tipY,size){return y0<=tipY&&y1>=tipY&&Math.abs(x-tipX)<=size*.42+4}
function createRound({level=1,seed=1,order=createOrder(level,seed),settings={},onCatch=()=>{},onFull=()=>{}}={}){
 const cfg=LEVELS[order.level-1],r=rng(Number(seed)^0x9e3779b9);let w=1000,h=728,t=0,spawnWait=0,full=false,serial=0,pairs=0;
 const speed=Math.max(.2,Number(settings.speed)||1)*.9*([1.05,1.08,1.10,1,1,1][cfg.level-1]),sizeScale=Math.max(.4,Number(settings.size)||1),density=Math.max(.3,Number(settings.density)||1);
 const got=Object.fromEntries(order.items.map(f=>[f.id,0])),hunger=Object.fromEntries(order.items.map(f=>[f.id,0])),stack=[],falling=[],log=[{type:'start',seed,order,settings:{speed,size:sizeScale,density}}];
 const pick=a=>a[Math.floor(r()*a.length)];
 function needed(){return order.items.filter(f=>got[f.id]<f.count).map(f=>f.id)}
 function choose(forced){let needs=needed(),starving=needs.filter(id=>hunger[id]>=6).sort((a,b)=>hunger[b]-hunger[a]);let id=starving[0];if(!id){let completed=order.items.filter(f=>got[f.id]>=f.count).map(f=>f.id),other=order.pool.filter(id=>!order.need[id]);if(forced==='other')id=pick(other);else if(forced==='need')id=pick(needs);else if(needs.length&&r()<cfg.p)id=pick(needs);else if(completed.length&&r()<cfg.q)id=pick(completed);else id=pick(other.length?other:order.pool)}needs.forEach(n=>hunger[n]=n===id?0:hunger[n]+1);return id}
 let pairStart=null;
 function spawnOne(){
 const size=86*sizeScale;
 const lanes=shuffle(Array.from({length:cfg.lanes},(_,i)=>i),r).filter(l=>falling.every(f=>f.lane!==l||f.y+size/2>=Math.max(f.size,size)*1.35));
 if(!lanes.length||falling.length>=cfg.k)return false;
 if(pairStart&&t-pairStart.time>1)pairStart=null;
 const adjacent=pairStart?lanes.filter(l=>Math.abs(l-pairStart.lane)===1):[];
 const completing=adjacent.length>0;
 const id=choose(completing?'other':cfg.level>=3&&pairs<2?'need':undefined);
 const lane=pick(completing?adjacent:lanes);
 if(completing&&!order.need[id]){pairs++;log.push({type:'choice-pair',time:t,lanes:[pairStart.lane,lane],ids:[pairStart.id,id],arrivalDelta:t-pairStart.time});pairStart=null}
 else if(cfg.level>=3&&pairs<2&&order.need[id]&&got[id]<order.need[id])pairStart={id,lane,time:t};
 falling.push({serial:++serial,id,lane,x:18+(lane+.5)*(w-36)/cfg.lanes,y:-size/2,size,delay:0});
 log.push({type:'spawn',time:t,id,lane,serial,hunger:{...hunger}});return true;
 }
 function snapshot(){return{level:order.level,seed,order,count:stack.length,capacity:order.capacity,score:full&&stack.every(f=>f.correct)?order.capacity*5:0,wrong:stack.filter(f=>!f.correct).length,got:{...got},stack:stack.map(f=>({...f})),falling:falling.map(f=>({...f})),elapsed:t,full,pairs,log:log.map(f=>({...f}))}}
 function catchFruit(id){if(full)return;const correct=!!order.need[id]&&got[id]<order.need[id];if(correct)got[id]++;const event={id,correct,index:stack.length,score:0,time:t};stack.push(event);log.push({type:'catch',...event});const snap=snapshot();onCatch(snap,event);if(stack.length>=order.capacity){full=true;falling.length=0;log.push({type:'full',time:t});onFull(snapshot())}}
 function tick(dt,skewerX=w/2){if(full)return;dt=Math.max(0,Math.min(dt,.1));t+=dt;const tipY=h*3/4;for(let i=falling.length-1;i>=0;i--){const f=falling[i],old=f.y+f.size*.36,step=Math.max(0,dt-f.delay);f.delay=Math.max(0,f.delay-dt);f.y+=(h*2/3+f.size)/(cfg.fallSec/speed)*step;const next=f.y+f.size*.36;if(catchBoundary(f.x,old,next,skewerX,tipY,f.size)){falling.splice(i,1);catchFruit(f.id);if(full)return}else if(f.y-f.size/2>h){falling.splice(i,1);log.push({type:'miss',time:t,id:f.id})}}
 spawnWait-=dt;if(spawnWait<=0&&spawnOne())spawnWait=cfg.interval/density;}
 return{order,cfg,tick,catchFruit,snapshot,setSize(width,height){w=width;h=height},get elapsed(){return t},get geometry(){return{w,h,tipY:h*3/4}},get falling(){return falling},get stack(){return stack}};
}
const api={FRUITS,LEVELS,createOrder,createRound,catchBoundary};root.GameEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

