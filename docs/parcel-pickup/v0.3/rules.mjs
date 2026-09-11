export const LEVELS=[null,...[3,4,5,6,7,8].map((length,i)=>({length,points:[10,15,20,25,30,40][i],up:i<3?2:3}))];
export const defaults=()=>({mode:0,up:100,down:100,feedback:100});
export const splitAt=n=>n<=4?0:n<=6?3:4;
export function formatCode(code){const at=splitAt(code.length);return at?code.slice(0,at)+' '+code.slice(at):code;}
export function validCode(code){
 if(!/^\d{3,8}$/.test(code))return false;
 if([...new Set(code)].some(d=>code.split(d).length-1>2))return false;
 const ds=[...code].map(Number);
 if(ds.slice(1).every((d,i)=>d-ds[i]===1)||ds.slice(1).every((d,i)=>d-ds[i]===-1))return false;
 for(let p=1;p<=code.length/2;p++)if(code.length%p===0&&code===code.slice(0,p).repeat(code.length/p))return false;
 return true;
}
export function createGenerator(seed){
 let state=seed>>>0;const used=new Set(),previous=new Map();
 const random=()=>{state+=0x6D2B79F5;let t=state;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};
 const allowed=c=>validCode(c)&&!used.has(c)&&(!previous.has(c.length)||[...c].filter((d,i)=>d!==previous.get(c.length)[i]).length>=2);
 return {seed,used,next(length){
 let code;
 for(let attempt=0;attempt<4096;attempt++){code=Array.from({length},()=>Math.floor(random()*10)).join('');if(allowed(code))break;code=null;}
 if(!code){for(let n=0;n<10**length;n++){const c=String(n).padStart(length,'0');if(allowed(c)){code=c;break;}}}
 if(!code)throw new Error('该位数号码池已用完，请重新开始。');
 used.add(code);previous.set(length,code);return code;
 }};
}
export function newSession(seed){return {seed,generator:createGenerator(seed),level:1,highest:1,score:0,correctStreak:0,wrongStreak:0,questionId:0,rows:LEVELS.slice(1).map(()=>({score:0,correct:0,wrong:0}))};}
export function nextQuestion(s,settings){const old=s.level;if(settings.mode)s.level=Number(settings.mode);if(old!==s.level)s.correctStreak=s.wrongStreak=0;s.highest=Math.max(s.highest,s.level);return {id:++s.questionId,level:s.level,code:s.generator.next(LEVELS[s.level].length),submitted:false,settings:{...settings}};}
export function judge(s,q,input){
 if(q.submitted||input.length!==q.code.length)return null;q.submitted=true;
 const correct=input===q.code,row=s.rows[q.level-1],cfg=q.settings;
 if(correct){row.correct++;row.score+=LEVELS[q.level].points;s.score+=LEVELS[q.level].points;s.correctStreak++;s.wrongStreak=0;}
 else {row.wrong++;s.wrongStreak++;s.correctStreak=0;}
 const before=s.level;
 if(!cfg.mode){
 if(correct&&s.level<6&&s.correctStreak>=Math.max(1,Math.round(LEVELS[s.level].up*cfg.up/100)))s.level++;
 if(!correct&&s.level>1&&s.wrongStreak>=Math.max(1,Math.round(2*cfg.down/100)))s.level--;
 }
 if(before!==s.level)s.correctStreak=s.wrongStreak=0;
 return {correct,points:correct?LEVELS[q.level].points:0,changed:s.level-before};
}

