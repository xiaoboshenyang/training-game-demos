export const LABELS=['基础','初阶','中阶','高阶','超凡','宗师'];
export const POINTS=[30,40,50,60,70,80],GATES=[1,1,2,3,3],DURATIONS=[3,3,2.85,2.85,2.55,2.4].map(seconds=>seconds/1.3);
export function initialState(level=1){return {level,score:0,correctAtLevel:0,consecutiveWrong:0,highestLevel:level,answered:0,levels:LABELS.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0}))};}
export function settle(state,correct,locked=false){
 const s=structuredClone(state),answeredLevel=s.level,award=correct?POINTS[answeredLevel-1]:0;
 s.answered++;s.score+=award;const stats=s.levels[answeredLevel-1];
 if(correct){stats.clears++;stats.score+=award;s.correctAtLevel++;s.consecutiveWrong=0;}
 else{stats.errors++;s.consecutiveWrong++;}
 if(!locked){if(correct&&s.level<6&&s.correctAtLevel>=GATES[s.level-1]){s.level++;s.correctAtLevel=0;s.consecutiveWrong=0;}
 else if(!correct&&s.consecutiveWrong>=2){s.level=Math.max(1,s.level-1);s.correctAtLevel=0;s.consecutiveWrong=0;}}
 s.highestLevel=Math.max(s.highestLevel,s.level);
 return {state:s,award,levelUp:s.level>answeredLevel};
}
export function timelineScale(level,speed){return DURATIONS[level-1]/2/(speed/100);}
