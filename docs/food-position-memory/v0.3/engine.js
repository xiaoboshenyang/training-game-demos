(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FoodGame = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const FOODS = Object.freeze([
    ['banana','香蕉'], ['apple','苹果'], ['bun','包子'], ['carrot','胡萝卜'],
    ['corn','玉米'], ['broccoli','西兰花'], ['fish','鱼'], ['eggplant','茄子'],
    ['egg','鸡蛋'], ['grapes','葡萄'], ['watermelon','西瓜'], ['pear','梨']
  ].map(([id,label]) => Object.freeze({id,label})));
  const LEVELS = Object.freeze({
    1:{P:3,cols:3,M:3,C:6}, 2:{P:4,cols:2,M:4,C:8},
    3:{P:6,cols:3,M:5,C:9}, 4:{P:6,cols:3,M:6,C:10},
    5:{P:9,cols:3,M:7,C:12}, 6:{P:9,cols:3,M:8,C:12}
  });
  Object.values(LEVELS).forEach(Object.freeze);
  const counter = () => ({rounds:0,points:0,success:0,errors:0,helped:0,incomplete:0});
  class Engine {
    constructor({seed=Date.now(),level=1,locked=false,durationMs=120000,tutorial=false,memoryScale=100,choiceScale=100}={}) {
      this.memoryScale=memoryScale; this.choiceScale=choiceScale;
      this.locked = Boolean(locked);
      this.tutorial = Boolean(tutorial);
      this._rng = 2166136261;
      for (const char of String(seed)) this._rng = Math.imul(this._rng ^ char.charCodeAt(0),16777619) >>> 0;
      this._previous = '';
      this._feedbackMs = 0;
      this._l6Streak = 0;
      this.state = {
        phase:'memory',paused:false,remainingMs:Number.isFinite(durationMs)?Math.max(0,durationMs):120000,
        level:Math.min(6,Math.max(1,Math.trunc(Number(level))||1)),score:0,roundId:0,
        P:0,M:0,C:0,cols:0,answer:[],board:[],candidates:[],assisted:false,
        roundResult:null,stats:{...counter(),levels:{}},progress:0,failStreak:0,l6Nine:false,history:[]
      };
      this._newRound();
    }
    _random() {
      this._rng = (this._rng + 0x6D2B79F5) >>> 0;
      let n = this._rng;
      n = Math.imul(n ^ n >>> 15,n | 1);
      n ^= n + Math.imul(n ^ n >>> 7,n | 61);
      return ((n ^ n >>> 14) >>> 0) / 4294967296;
    }
    _shuffle(values) {
      const a = [...values];
      for (let i=a.length-1;i>0;i--) {
        const j=Math.floor(this._random()*(i+1));
        [a[i],a[j]]=[a[j],a[i]];
      }
      return a;
    }
    _newRound() {
      const s=this.state;
      Object.assign(s,LEVELS[s.level]);
      if (s.level===6 && s.l6Nine) s.M=9;
      s.M=Math.max(1,Math.min(s.P,Math.round(s.M*this.memoryScale/100)));
      s.C=Math.max(s.M,Math.min(12,Math.round(s.C*this.choiceScale/100)));
      const ids=this._shuffle(FOODS.map(f=>f.id));
      const slots=this._shuffle(Array.from({length:s.P},(_,i)=>i));
      s.answer=Array(s.P).fill(null);
      ids.slice(0,s.M).forEach((id,i)=>{s.answer[slots[i]]=id;});
      if (JSON.stringify(s.answer)===this._previous) {
        [s.answer[slots[0]],s.answer[slots[1]]]=[s.answer[slots[1]],s.answer[slots[0]]];
      }
      this._previous=JSON.stringify(s.answer);
      s.candidates=this._shuffle(ids.slice(0,s.C));
      s.board=Array(s.P).fill(null);
      s.phase='memory'; s.assisted=false; s.roundResult=null; s.roundId++;
    }
    _active(phase) {return !this.state.paused && this.state.phase===phase;}
    remember() {
      if (!this._active('memory')) return false;
      this.state.phase='play'; return true;
    }
    place(itemId,slotIndex) {
      const s=this.state;
      if (!this._active('play') || !Number.isInteger(slotIndex) || slotIndex<0 || slotIndex>=s.P || !s.candidates.includes(itemId)) return false;
      const from=s.board.indexOf(itemId);
      if (from===slotIndex) return false;
      if (from<0 && s.board[slotIndex]===null && s.board.filter(Boolean).length>=s.M) return false;
      if (from>=0) s.board[from]=s.board[slotIndex];
      s.board[slotIndex]=itemId;
      return true;
    }
    remove(slotIndex) {
      const s=this.state;
      if (!this._active('play') || !Number.isInteger(slotIndex) || slotIndex<0 || slotIndex>=s.P || s.board[slotIndex]===null) return false;
      s.board[slotIndex]=null; return true;
    }
    help() {
      if (!this._active('play') || this.state.assisted) return false;
      this.state.assisted=true; return true;
    }
    submit() {
      if (!this._active('play') || this.state.board.filter(Boolean).length!==this.state.M) return false;
      this._settle(false,false); return true;
    }
    _changeLevel(level) {
      const s=this.state;
      s.level=level; s.progress=0; s.failStreak=0; s.l6Nine=false; this._l6Streak=0;
    }
    _adapt(perfect,assisted) {
      const s=this.state;
      if (assisted) {
        this._l6Streak=0; s.progress=0; s.failStreak=0;
        if (!this.locked) this._changeLevel(Math.max(1,s.level-1));
      } else if (perfect) {
        s.failStreak=0;
        if (s.level===6) {
          this._l6Streak=Math.min(2,this._l6Streak+1); s.progress=this._l6Streak;
          if (this._l6Streak>=2) s.l6Nine=true;
        } else if (!this.locked) {
          s.progress++;
          if (s.progress>=(s.level<=2?1:2)) this._changeLevel(s.level+1);
        }
      } else {
        s.failStreak++; this._l6Streak=0;
        if (s.level===6) s.progress=0;
        if (s.failStreak>=2 && !this.locked) this._changeLevel(Math.max(1,s.level-1));
      }
    }
    _settle(expired,incomplete) {
      const s=this.state;
      if (s.phase!=='play' || s.roundResult) return;
      const roundLevel=s.level;
      const correct=s.answer.reduce((n,id,i)=>n+(id!==null && id===s.board[i]?1:0),0);
      const perfect=!incomplete && correct===s.M;
      const points=!this.tutorial && perfect && !s.assisted ? [25,35,45,55,65,s.M===9?80:75][roundLevel-1] : 0;
      s.roundResult={correct,total:s.M,points,perfect,assisted:s.assisted,incomplete,expired,level:roundLevel,
        message:incomplete?'时间到了，已保存本桌表现':s.assisted?'已参考提示完成':perfect?'全部摆对了！':'再试一次，慢慢来'};
      if (!this.tutorial) {
        s.score+=points;
        const row=s.stats.levels[roundLevel] || (s.stats.levels[roundLevel]=counter());
        const kind=s.assisted?'helped':incomplete?'incomplete':perfect?'success':'errors';
        for (const stats of [s.stats,row]) {stats.rounds++;stats.points+=points;stats[kind]++;}
        s.history.push({...s.roundResult,roundId:s.roundId});
        if (!expired) this._adapt(perfect,s.assisted);
      }
      s.phase=expired?'ended':'feedback'; this._feedbackMs=2000;
    }
    nextRound() { if(this.state.phase==='feedback'&&!this.state.paused)this._newRound(); }
    tick(deltaMs,holdRound=false) {
      const s=this.state;
      if (s.paused || s.phase==='ended' || !Number.isFinite(deltaMs) || deltaMs<0) return false;
      const elapsed=this.tutorial?deltaMs:Math.min(deltaMs,s.remainingMs);
      if (!this.tutorial) s.remainingMs=Math.max(0,s.remainingMs-deltaMs);
      if (!this.tutorial && s.remainingMs===0) {
        if (s.phase==='play') this._settle(true,s.board.filter(Boolean).length<s.M);
        s.phase='ended'; return true;
      }
      if (s.phase==='feedback') {
        this._feedbackMs-=elapsed;
        if (this._feedbackMs<=0 && !holdRound) this._newRound();
      }
      return true;
    }
    pause() {
      if (this.state.paused || this.state.phase==='ended') return false;
      this.state.paused=true; return true;
    }
    resume() {
      if (!this.state.paused || this.state.phase==='ended') return false;
      this.state.paused=false; return true;
    }
  }
  return {Engine,LEVELS,FOODS};
});


