// 业务时钟只在翻窝、思考、飞蛋阶段推进。公共壳负责显示和反馈。
export function makeEggPlan(nests, ratio, random = Math.random) {
  const plan = Array.from({length:nests}, (_,i) => Math.max(1, Math.min(nests-i, Math.round(ratio*(nests-i)))));
  // 在两轮间转移一次，保持全天总量与每轮合法范围；最后一轮固定1。
  for (let attempt=0; attempt<nests*8; attempt++) {
    const donor=Math.min(nests-2,Math.floor(random()*(nests-1)));
    const receiver=Math.min(nests-2,Math.floor(random()*(nests-1)));
    if (donor!==receiver && plan[donor]>1 && plan[receiver]<nests-receiver) {
      plan[donor]--; plan[receiver]++;
    }
  }
  return plan;
}

export class HenSession {
  constructor(config, random=Math.random) {
    this.config=config; this.random=random;
    this.settings={mode:'auto',nestPercent:100,marginPercent:100,ratioPercent:100};
    this.reset();
  }
  setSettings(settings) { this.settings={...settings}; }
  reset() {
    this.remainingMs=this.config.sessionMs; this.totalScore=0; this.level=1;
    this.highestLevel=1; this.winStreak=0; this.lossStreak=0; this.paused=false;
    this.phase='play'; this.roundNo=0; this.history=[]; this.active=null;
    this.stats=this.config.levels.map((p,i)=>({level:i+1,label:p.label,score:0,clears:0,errors:0}));
    this.beginRound();
  }
  beginRound() {
    const prevMode=this.active?.mode;
    if (this.settings.mode!=='auto') this.level=Number(this.settings.mode);
    if (prevMode!==this.settings.mode) { this.winStreak=0; this.lossStreak=0; }
    this.active={...this.settings};
    const p=this.config.levels[this.level-1];
    this.nests=Math.max(4,Math.min(12,Math.round(p.nests*this.active.nestPercent/100)));
    this.ratio=this.config.eggRatio*this.active.ratioPercent/100;
    this.margin=Math.max(0,Math.round(p.margin*this.active.marginPercent/100));
    this.eggPlan=makeEggPlan(this.nests,this.ratio,this.random);
    this.requiredClicks=this.eggPlan.reduce((sum,k)=>sum+k,0);
    this.clickLimit=this.requiredClicks+this.margin; this.clicksRemaining=this.clickLimit;
    this.roundLevel=this.level; this.highestLevel=Math.max(this.highestLevel,this.level);
    this.egged=new Set(); this.seen=new Set(); this.collected=0; this.clicked=false;
    this.whitePoints=0; this.clicks=0; this.phase='play'; this.roundNo++; this.newEgg();
  }
  newEgg() { this.seen.clear(); this.target=this.eggPlan[this.collected]; }
  click(index) {
    // 飞蛋、反馈、暂停期间不接收翻窝，也不消耗次数。
    if (this.phase!=='play'||this.paused||!Number.isInteger(index)||index<0||index>=this.nests) return {type:'ignored'};
    this.clicked=true; this.clicks++; this.clicksRemaining--;
    let event;
    if (this.egged.has(index)||this.seen.has(index)) {
      this.whitePoints++;
      event={type:'white',reason:this.egged.has(index)?'used':'repeat',index};
    } else {
      this.seen.add(index);
      if (this.seen.size>=this.target) {
        this.phase='flight'; this.flightIndex=index;
        return {type:'egg',index};
      }
      event={type:'empty',index};
    }
    if (this.clicksRemaining===0) return {...this.settle(false),lastClick:event};
    return event;
  }
  finishFlight() {
    if (this.phase!=='flight') return null;
    this.egged.add(this.flightIndex); this.collected=this.egged.size;
    if (this.collected===this.nests) return this.settle(true);
    if (this.clicksRemaining===0) return this.settle(false);
    this.newEgg(); this.phase='play'; return {type:'collected'};
  }
  settle(correct) {
    if (this.phase==='feedback'||this.phase==='ended') return null;
    const oldLevel=this.roundLevel, award=correct?this.config.levels[oldLevel-1].award:0;
    this.totalScore+=award;
    const row=this.stats[oldLevel-1]; row.score+=award; row[correct?'clears':'errors']++;
    if (correct) { this.winStreak++; this.lossStreak=0; }
    else { this.lossStreak++; this.winStreak=0; }
    let nextLevel=oldLevel;
    if (this.active.mode==='auto') {
      if (correct && (oldLevel===6||this.winStreak>=this.config.successesToUpgrade[oldLevel-1])) {
        nextLevel=Math.min(6,oldLevel+1); this.winStreak=0;
      }
      if (!correct && this.lossStreak>=this.config.failuresToDowngrade) {
        nextLevel=Math.max(1,oldLevel-1); this.lossStreak=0;
      }
      if (nextLevel!==oldLevel) { this.winStreak=0; this.lossStreak=0; }
    }
    this.level=nextLevel; this.phase='feedback';
    this.history.push({round:this.roundNo,level:oldLevel,outcome:correct?'success':'exhausted',award,nests:this.nests,clickLimit:this.clickLimit,requiredClicks:this.requiredClicks,clicks:this.clicks,whitePoints:this.whitePoints});
    return {type:'result',correct,award,totalScore:this.totalScore,roundLevel:oldLevel,nextLevel,levelUp:nextLevel>oldLevel};
  }
  advance(ms) {
    if (this.paused||!['play','flight'].includes(this.phase)||ms<=0) return null;
    this.remainingMs=Math.max(0,this.remainingMs-ms);
    if (this.remainingMs===0) {
      if (this.clicked) this.history.push({round:this.roundNo,level:this.roundLevel,outcome:'unfinished',award:0,clicks:this.clicks,whitePoints:this.whitePoints});
      this.phase='ended'; return {type:'ended'};
    }
    return null;
  }
  getResult() { return {totalScore:this.totalScore,levels:this.stats.map(s=>({...s})),highestLevel:this.highestLevel,history:this.history.map(s=>({...s}))}; }
  snapshot() {
    return {phase:this.phase,paused:this.paused,level:this.level,roundLevel:this.roundLevel,roundNo:this.roundNo,nests:this.nests,collected:this.collected,remainingMs:this.remainingMs,clickLimit:this.clickLimit,clicksRemaining:this.clicksRemaining,requiredClicks:this.requiredClicks,margin:this.margin,ratio:this.ratio,clicks:this.clicks,score:this.totalScore,active:{...this.active},settings:{...this.settings},whitePoints:this.whitePoints};
  }
}

