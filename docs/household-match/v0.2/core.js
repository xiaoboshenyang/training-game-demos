(function(root){
'use strict';
const LEVELS=[{rows:2,cols:3,score:10,limit:6},{rows:2,cols:4,score:20,limit:8},{rows:3,cols:4,score:30,limit:12},{rows:3,cols:6,score:40,limit:18},{rows:4,cols:5,score:50,limit:20},{rows:4,cols:6,score:60,limit:24}];
const ITEMS=[['cup','杯子'],['bowl','饭碗'],['teapot','茶壶'],['spoon','勺子'],['toothbrush','牙刷'],['toothpaste','牙膏'],['soap','肥皂'],['towel','毛巾'],['key','钥匙'],['glasses','眼镜'],['wallet','钱包'],['umbrella','雨伞'],['hat','帽子'],['slipper','拖鞋'],['glove','手套'],['scarf','围巾'],['clock','闹钟'],['lamp','台灯'],['fan','扇子'],['hanger','衣架'],['scissors','剪刀'],['comb','梳子'],['brush','刷子'],['bucket','水桶']];
const DEFAULTS={mode:0,tolerance:100,hold:100,upgrade:100};
class Game {
 constructor(seed=Date.now()){this.seed=seed>>>0;this.settings={...DEFAULTS};this.reset();}
 random(){this.seed=(Math.imul(1664525,this.seed)+1013904223)>>>0;return this.seed/4294967296;}
 shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 configure(s){for(const k of Object.keys(DEFAULTS)){if(k in s){let n=Number(s[k]);if(Number.isFinite(n))this.settings[k]=k==='mode'?Math.max(0,Math.min(6,Math.round(n))):Math.max(k==='upgrade'?100:50,Math.min(k==='upgrade'?300:200,n));}}}
 reset(){this.phase='intro';this.paused=false;this.tutorial=false;this.remaining=120000;this.score=0;this.level=1;this.highest=1;this.streak=0;this.wait=0;this.elapsed=0;this.cards=[];this.selected=[];this.history=[];this.stats=LEVELS.map(()=>({score:0,success:0,failed:0,assisted:0,mismatches:0,unfinished:0}));this.boardNumber=0;}
 start(teaching=true){this.reset();this.afterCountdown=teaching?'tutorial':'formal';this.phase='countdown';this.wait=3000;}
 formal(){this.reset();this.phase='playing';this.level=this.settings.mode||1;this.newBoard();}
 teach(){this.tutorial=true;this.level=1;this.newBoard();this.cards=['cup','bowl','cup','bowl'].map(id=>({id,matched:false}));this.phase='playing';}
 newBoard(){
  this.applied={...this.settings};if(!this.tutorial&&this.applied.mode)this.level=this.applied.mode;
  this.highest=Math.max(this.highest,this.level);this.spec=LEVELS[this.level-1];this.limit=Math.max(1,Math.round(this.spec.limit*this.applied.tolerance/100));this.need=Math.max(1,Math.round(this.applied.upgrade/100));
  const pool=this.shuffle(ITEMS.map(x=>x[0]));let chosen=pool.slice(0,this.spec.rows*this.spec.cols/2);
  // Distinct everyday silhouettes at low levels; recognizable category pairs higher up.
  if(this.level<=3){const groups=[['cup','bowl','teapot'],['toothbrush','toothpaste','soap','towel'],['key','glasses','wallet','umbrella'],['hat','slipper','glove','scarf'],['clock','lamp','fan','bucket'],['hanger','scissors','comb','brush']];chosen=this.shuffle(groups).slice(0,this.spec.rows*this.spec.cols/2).map(g=>g[Math.floor(this.random()*g.length)]);}
  if(this.level>=5){const fixed=this.level===5?['cup','bowl','toothbrush','toothpaste']:['cup','bowl','toothbrush','toothpaste','hat','glove'];chosen=[...fixed,...pool.filter(x=>!fixed.includes(x)).slice(0,chosen.length-fixed.length)];}
  this.cards=this.shuffle([...chosen,...chosen]).map(id=>({id,matched:false}));
  this.selected=[];this.mistakes=0;this.assisted=false;this.hintCards=[];this.idle=0;this.wait=0;this.boardElapsed=0;this.recorded=false;this.phase='playing';this.outcome=null;this.boardNumber++;
  this.boardSeed=this.seed;this.initialCards=this.cards.map(x=>x.id);
 }
 get target(){if(!this.tutorial)return -1;return this.cards.findIndex((c,i)=>!c.matched&&!this.selected.includes(i)&&(this.selected.length===0||c.id===this.cards[this.selected[0]].id));}
 get canHelp(){return !this.tutorial&&this.phase==='playing'&&!this.paused&&this.selected.length===0&&!this.assisted&&this.idle>=10000;}
 flip(index){
  if(this.paused||this.phase!=='playing'||(!this.tutorial&&this.remaining<=0)||!Number.isInteger(index))return false;
  const card=this.cards[index];if(!card||card.matched||this.selected.includes(index)||(this.tutorial&&index!==this.target))return false;
  this.selected.push(index);if(this.selected.length<2)return true;
  const same=this.cards[this.selected[0]].id===card.id;
  if(same){this.selected.forEach(i=>this.cards[i].matched=true);this.idle=0;this.phase='match';this.wait=500;
   if(this.cards.every(c=>c.matched))this.finishBoard(true);
  }else{this.mistakes++;this.phase='mismatch';this.wait=1200*this.applied.hold/100;if(this.mistakes>=this.limit)this.finishBoard(false);}
  return true;
 }
 finishBoard(success){
  if(this.recorded)return;this.recorded=true;this.outcome=success?'success':'failed';this.phase='board';this.wait=success?800:1200;
  if(this.tutorial)return;
  const s=this.stats[this.level-1];s.mismatches+=this.mistakes;
  if(success){s.success++;s.score+=this.spec.score;this.score+=this.spec.score;if(this.assisted){s.assisted++;this.streak=0;}else this.streak++;}
  else{s.failed++;this.streak=0;}
  this.nextLevel=this.level;
  if(!this.applied.mode){if(!success)this.nextLevel=Math.max(1,this.level-1);else if(!this.assisted&&this.streak>=this.need){this.nextLevel=Math.min(6,this.level+1);this.streak=0;}}
  this.record(''+this.outcome);
 }
 record(outcome){this.history.push({level:this.level,seed:this.boardSeed,cards:this.initialCards,outcome,mistakes:this.mistakes,assisted:this.assisted,elapsedMs:this.boardElapsed,remainingPairs:this.cards.filter(c=>!c.matched).length/2,settings:{...this.applied}});}
 help(){if(!this.canHelp)return false;const i=this.cards.findIndex(c=>!c.matched);const j=this.cards.findIndex((c,n)=>n!==i&&!c.matched&&c.id===this.cards[i].id);this.hintCards=[i,j];this.assisted=true;this.phase='hint';this.wait=2000;return true;}
 pause(){if(['playing','match','mismatch','hint','board','countdown'].includes(this.phase))this.paused=true;}
 resume(){this.paused=false;}
 end(){if(this.phase==='end')return;if(!this.recorded&&this.cards.length){const s=this.stats[this.level-1];s.unfinished++;s.mismatches+=this.mistakes;this.record('unfinished');}this.remaining=0;this.phase='end';this.paused=false;this.wait=0;this.selected=[];this.hintCards=[];}
 advance(ms){
  if(this.paused||ms<=0||['intro','end'].includes(this.phase))return;
  if(this.phase==='countdown'){this.wait-=ms;if(this.wait<=0){if(this.afterCountdown==='tutorial')this.teach();else this.formal();}return;}
  if(!this.tutorial){ms=Math.min(ms,this.remaining);this.remaining-=ms;this.elapsed+=ms;this.boardElapsed+=ms;this.idle+=ms;}
  if(!this.tutorial&&this.remaining<=0){this.end();return;}
  if(this.wait>0&&!(this.externalFeedback&&this.phase==='board')){this.wait-=ms;if(this.wait<=0){
   if(this.phase==='board'){if(this.tutorial){this.formal();return;}this.level=this.nextLevel;this.newBoard();}
   else{this.selected=[];this.hintCards=[];this.phase='playing';}
  }}
 }
}
const api={Game,ITEMS,LEVELS,DEFAULTS};root.MatchGame=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
