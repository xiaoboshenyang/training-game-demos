export const NAMES=['牙膏','牙刷','肥皂','毛巾','洗衣液','卷纸','水杯','饭碗','勺子','水壶','平底锅','雨伞','袜子','帽子','拖鞋','剪刀','梳子','钥匙','手电筒','闹钟'];
export const POINTS=[10,12,15,18,22,26], THRESHOLDS=[2,2,4,4,5,5];
export const LABELS=['基础','初阶','中阶','高阶','超凡','宗师'];
export function shuffle(items,random=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export class Game {
 constructor(random=Math.random){this.random=random;this.reset();}
 reset(){this.pool=shuffle(NAMES.map((_,id)=>id),this.random).slice(0,9);this.level=1;this.highestLevel=1;this.score=0;this.correctRun=0;this.wrongRun=0;this.round=0;this.history=[];this.stats=LABELS.map((label,i)=>({level:i+1,label,score:0,clears:0,errors:0}));this.next(true);}
 next(changed=false){const ids=Array.from({length:this.level+3},(_,i)=>i+1);if(changed||this.level===6)this.reference=shuffle(ids,this.random);if(changed||this.level>=5)this.answers=shuffle(ids,this.random);this.digits=shuffle(ids,this.random);this.highlight=this.level<=2?Math.floor(ids.length/2):Math.floor(this.random()*ids.length);this.target=this.digits[this.highlight];this.round++;}
 answer(number){const oldLevel=this.level,correct=number===this.target,before=this.score,stat=this.stats[oldLevel-1];if(correct){this.score+=POINTS[oldLevel-1];this.correctRun++;this.wrongRun=0;stat.clears++;if(this.correctRun>=THRESHOLDS[oldLevel-1]){this.level=Math.min(6,this.level+1);this.correctRun=0;this.wrongRun=0;}}else{this.wrongRun++;this.correctRun=0;stat.errors++;if(this.wrongRun>=2){this.level=Math.max(1,this.level-1);this.correctRun=0;this.wrongRun=0;}}const delta=this.score-before;stat.score+=delta;this.highestLevel=Math.max(this.highestLevel,this.level);const outcome={correct,oldLevel,level:this.level,changed:this.level!==oldLevel,levelUp:this.level>oldLevel,score:this.score,delta};this.history.push({round:this.round,number,target:this.target,...outcome});return outcome;}
 result(){return {totalScore:this.score,highestLevel:this.highestLevel,levels:this.stats.map(s=>({...s})),answers:this.history.map(s=>({...s}))};}
}


