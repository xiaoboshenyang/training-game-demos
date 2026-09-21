export const POINTS=[20,30,50,70,100,140],NAMES=['基础','初阶','中阶','高阶','超凡','宗师'];
export const rotate=m=>((m<<1)&15)|(m>>3);
export function neighbor(c,s){const x=c%6,y=Math.floor(c/6);return s===0?(y?c-6:-1):s===1?(x<5?c+1:-1):s===2?(y<5?c+6:-1):(x?c-1:-1);}
export function trace(m,start,end){const seen=new Set(),path=[];let c=start.cell,entry=start.side;
while(c>=0&&!seen.has(c)&&(m[c]&(1<<entry))){seen.add(c);path.push(c);const exit=[0,1,2,3].find(s=>s!==entry&&(m[c]&(1<<s)));if(exit===undefined)break;if(c===end.cell&&exit===end.side)return{seen,path,won:true};c=neighbor(c,exit);entry=(exit+2)%4;}return{seen,path,won:false};}
export function settle(state,kind,settings={lock:0,up:100,down:100}){const level=state.level,row=state.rows[level-1];let delta=0;if(kind==='independent'||kind==='assisted'){delta=POINTS[level-1]*(kind==='assisted'?.5:1);row.clears++;row[kind]++;}else row.errors++;
row.score+=delta;state.score+=delta;if(kind==='independent'){state.good++;state.help=0;}else{state.help++;state.good=0;}
let next=level;const up=Math.max(1,Math.round((level<=2?1:2)*settings.up/100)),down=Math.max(1,Math.round(2*settings.down/100));if(state.good>=up){next=Math.min(6,level+1);state.good=0;state.help=0;}else if(state.help>=down){next=Math.max(1,level-1);state.good=0;state.help=0;}if(settings.lock)next=settings.lock;state.level=next;state.highest=Math.max(state.highest,next);return{delta,next,levelUp:next>level};}
export function fresh(level=1){return{level,score:0,good:0,help:0,highest:level,rows:NAMES.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0,independent:0,assisted:0,unfinished:0}))};}

