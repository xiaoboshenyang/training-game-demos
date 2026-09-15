export const LEVELS=[null,{n:4,cols:2,rows:2,points:50,name:'规整'},{n:9,cols:3,rows:3,points:60,name:'规整'},{n:12,cols:4,rows:3,points:70,name:'轻微错缝'},{n:12,cols:4,rows:3,points:80,name:'不规则曲线'},{n:16,cols:4,rows:4,points:90,name:'不规则曲线'},{n:20,cols:5,rows:4,points:100,name:'复杂曲线'}];
export function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const fmt=n=>Number(n.toFixed(3));
export function makePuzzle(level,seed=1,w=900,h=675){
 const {cols,rows}=LEVELS[level],random=rng(seed),nodes=[];
 for(let r=0;r<=rows;r++){nodes[r]=[];for(let c=0;c<=cols;c++){
 let x=c*w/cols,y=r*h/rows;
 if(c>0&&c<cols&&level>=3)x+=(r%2?1:-1)*w/cols*(level===3?.06:level===6?.13:.12);
 if(c>0&&c<cols&&level>=4)x+=(random()-.5)*w/cols*(level===6?.20:.2);
 if(r>0&&r<rows&&level>=4)y+=(random()-.5)*h/rows*(level===6?.28:.26);
 nodes[r][c]=[fmt(x),fmt(y)];
 }}
 const edges=new Map();
 function edge(a,b,boundary,key){
 if(edges.has(key))return edges.get(key);
 const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),nx=-dy/len,ny=dx/len;
 const amplitude=boundary?0:Math.min(w/cols,h/rows)*(level===6?.12:level>=4?.12:.105)*(random()<.5?-1:1);
 let segments;
 const p=(t,o)=>[fmt(a[0]+dx*t+nx*o),fmt(a[1]+dy*t+ny*o)];
 if(boundary)segments=[[a,p(1/3,0),p(2/3,0),b]];
 else if(level>=4){const waist=level===6?.44+random()*.12:.5;segments=[[a,p(waist*.4,amplitude),p(waist*.6,amplitude*1.6),p(waist,0)],[p(waist,0),p(waist+(1-waist)*.4,-amplitude*1.6),p(waist+(1-waist)*.6,-amplitude),b]];}
 else segments=[[a,p(.16,0),p(.3,0),p(.37,0)],[p(.37,0),p(.30,amplitude),p(.40,amplitude*1.3),p(.5,amplitude*1.3)],[p(.5,amplitude*1.3),p(.60,amplitude*1.3),p(.70,amplitude),p(.63,0)],[p(.63,0),p(.7,0),p(.84,0),b]];
 edges.set(key,{key,segments,uses:[]});return edges.get(key);
 }
 const pieces=[];
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
 const id=r*cols+c,parts=[
 [edge(nodes[r][c],nodes[r][c+1],r===0,'h'+r+'-'+c),false],
 [edge(nodes[r][c+1],nodes[r+1][c+1],c===cols-1,'v'+r+'-'+(c+1)),false],
 [edge(nodes[r+1][c],nodes[r+1][c+1],r===rows-1,'h'+(r+1)+'-'+c),true],
 [edge(nodes[r][c],nodes[r+1][c],c===0,'v'+r+'-'+c),true]];
 const segments=parts.flatMap(([e,rev])=>{e.uses.push({id,reverse:rev});return rev?[...e.segments].reverse().map(s=>[...s].reverse()):e.segments;});
 const sampled=[];for(const [a,b,c,d]of segments)for(let i=0;i<16;i++){const t=i/16,u=1-t;sampled.push([u*u*u*a[0]+3*u*u*t*b[0]+3*u*t*t*c[0]+t*t*t*d[0],u*u*u*a[1]+3*u*u*t*b[1]+3*u*t*t*c[1]+t*t*t*d[1]]);}
 const xs=sampled.map(p=>p[0]),ys=sampled.map(p=>p[1]);const x=Math.min(...xs)-3,y=Math.min(...ys)-3,bw=Math.max(...xs)-x+3,bh=Math.max(...ys)-y+3;
 const path='M'+segments[0][0].join(',')+segments.map(s=>' C'+s.slice(1).map(p=>p.join(',')).join(' ')).join('')+' Z';
 pieces.push({id,row:r,col:c,path,polygon:sampled,bounds:{x,y,w:bw,h:bh},corner:(r===0||r===rows-1)&&(c===0||c===cols-1),neighbors:[r>0?id-cols:null,r<rows-1?id+cols:null,c>0?id-1:null,c<cols-1?id+1:null].filter(x=>x!==null)});
 }
 return {pieces,edges:[...edges.values()],w,h};
}
export function connectable(p,placed){return placed.size?p.neighbors.some(id=>placed.has(id)):p.corner;}
export function refill(pieces,placed,slots,random=Math.random){
 const visible=new Set(slots.filter(x=>x!==null)),pool=pieces.filter(p=>!placed.has(p.id)&&!visible.has(p.id));
 for(let i=0;i<slots.length;i++)if(slots[i]===null&&pool.length){const need=!slots.some(id=>id!==null&&connectable(pieces[id],placed));let options=pool.filter(p=>!need||connectable(p,placed));if(!options.length)options=pool;const p=options[Math.floor(random()*options.length)];slots[i]=p.id;pool.splice(pool.indexOf(p),1);}
 return slots;
}
export function nextLevel(level,{peekCount=0},locked=0){return locked||Math.max(1,Math.min(6,level+(peekCount>=3?-1:peekCount===2?0:1)));}
export function inside(poly,x,y){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
