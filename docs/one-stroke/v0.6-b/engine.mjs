export const BENCHMARK_SCORE=350;
export const LABELS=['基础','初阶','中阶','高阶','超凡','宗师'];
export const POINTS=[36,44,52,60,66,72];
export function moves(q,v,r){
  const result=[];
  q.edges.forEach(([a,b,,d],i)=>{if(r[i]>0){if(a===v)result.push([b,i]);else if(b===v&&!d)result.push([a,i]);}});
  return result;
}
function necessary(q,v,r){
  const deg={},bal={},und={},adj={};
  q.edges.forEach(([a,b,,d],i)=>{const n=r[i];if(!n)return;deg[a]=(deg[a]||0)+n;deg[b]=(deg[b]||0)+n;
    (adj[a]??=[]).push(b);(adj[b]??=[]).push(a);
    if(d){bal[a]=(bal[a]||0)+n;bal[b]=(bal[b]||0)-n;}else{und[a]=(und[a]||0)+n;und[b]=(und[b]||0)+n;}});
  if(!Object.keys(deg).length)return true;
  if(!deg[v])return false;
  const seen=new Set([v]),queue=[v];
  while(queue.length)for(const w of adj[queue.pop()]||[])if(!seen.has(w)){seen.add(w);queue.push(w);}
  if(Object.keys(deg).some(x=>!seen.has(+x)))return false;
  const odd=Object.keys(deg).map(Number).filter(x=>deg[x]%2);
  if(odd.length&&!(odd.length===2&&odd.includes(v)))return false;
  return !Object.keys(deg).some(x=>Math.abs(bal[x]||0)>(und[x]||0)+(odd.includes(+x)?1:0));
}
// Returns an exact valid continuation, or null. Never treats search exhaustion as a dead end.
export function solve(q,v,r,memo=new Map()){
  if(r.every(n=>n===0))return [];
  if(v===null){for(const start of q.starts){const route=solve(q,start,r,memo);if(route)return {start,route};}return null;}
  const key=v+':'+r.join('');
  if(memo.has(key))return memo.get(key);
  if(!necessary(q,v,r)){memo.set(key,null);return null;}
  for(const [to,e] of moves(q,v,r)){const next=r.slice();next[e]--;const tail=solve(q,to,next,memo);
    if(tail){const route=[[to,e],...tail];memo.set(key,route);return route;}}
  memo.set(key,null);return null;
}
export class Puzzle {
  constructor(q){this.q=q;this.remaining=q.edges.map(e=>e[2]);this.path=[];this.current=null;this.memo=new Map();}
  get complete(){return this.remaining.every(n=>n===0);}
  continuation(){return solve(this.q,this.current,this.remaining,this.memo);}
  get dead(){return this.current!==null&&!this.complete&&this.continuation()===null;}
  start(v){if(this.path.length||!this.q.edges.some(e=>e[0]===v||e[1]===v))return false;this.current=v;return true;}
  go(v){const choice=moves(this.q,this.current,this.remaining).find(m=>m[0]===v);if(!choice)return false;
    this.path.push([choice[1],this.current]);this.remaining[choice[1]]--;this.current=v;return true;}
  undo(){if(!this.path.length){this.current=null;return false;}const [e,v]=this.path.pop();this.remaining[e]++;this.current=v;return true;}
  reset(){this.remaining=this.q.edges.map(e=>e[2]);this.path=[];this.current=null;}
}
export function settle(level,viewed,streak,viewStreak,locked){
  const nextStreak=viewed?0:streak+1;
  const nextViewStreak=0;
  const nextLevel=locked||Math.max(1,Math.min(6,level+(nextStreak>=2?1:0)-(viewed?1:0)));
  return {award:viewed?0:POINTS[level-1],nextLevel,
    streak:nextStreak>=2?0:nextStreak,viewStreak:nextViewStreak>=2?0:nextViewStreak};
}
export function layout(q){
  const active=[...new Set(q.edges.flatMap(e=>e.slice(0,2)))];
  const xs=active.map(v=>q.nodes[v][0]),ys=active.map(v=>q.nodes[v][1]);
  const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
  const sx=850/(maxX-minX||1),sy=430/(maxY-minY||1);
  return {active,points:q.nodes.map(([x,y])=>[640+(x-(maxX+minX)/2)*sx,302+(y-(maxY+minY)/2)*sy])};
}
