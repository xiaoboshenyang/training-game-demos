export const LEVELS = [
  {level:1,label:'基础',cols:3,rows:3,n:3,k:1,shuffle:false,similar:'none'},
  {level:2,label:'初阶',cols:3,rows:3,n:4,k:1,shuffle:false,similar:'none'},
  {level:3,label:'中阶',cols:4,rows:3,n:5,k:2,shuffle:false,similar:'none'},
  {level:4,label:'高阶',cols:4,rows:3,n:5,k:1,shuffle:true,similar:'none'},
  {level:5,label:'超凡',cols:4,rows:3,n:6,k:2,shuffle:true,similar:'one'},
  {level:6,label:'宗师',cols:4,rows:3,n:7,k:2,shuffle:true,similar:'two'}
];
const GROUPS={
  dining:['cup','bowl','teapot','spoon'],
  wash:['toothbrush','toothpaste','soap','towel'],
  carry:['key','glasses','wallet','umbrella','hat','slipper','glove','scarf'],
  home:['clock','lamp','fan','hanger','scissors','comb','brush','bucket']
};
export function makeItems(source){
  return source.objects.map(object=>{
    const cat=Object.keys(GROUPS).find(key=>GROUPS[key].includes(object.id));
    if(!cat)throw Error('物品未分类：'+object.id);
    return {id:object.id,name:object.label,cat,file:object.file,bbox:object.bbox};
  });
}
export function seededRandom(seed){
  return ()=>{let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
}
function shuffled(input,random){
  const a=input.slice();
  for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function pick(input,random){return input[Math.floor(random()*input.length)];}
function chooseObjects(spec,items,random){
  const cats=[...new Set(items.map(item=>item.cat))];
  if(spec.similar==='two'){
    const pairs=[];
    for(let a=0;a<cats.length;a++)for(let b=a+1;b<cats.length;b++){
      const pool=items.filter(item=>[cats[a],cats[b]].includes(item.cat));
      if(pool.length>=spec.n+spec.k)pairs.push({cats:[cats[a],cats[b]],pool});
    }
    if(!pairs.length)throw Error('最高级缺少两类至少9件物品');
    const pair=pick(pairs,random);
    const first=pair.cats.map(cat=>pick(pair.pool.filter(item=>item.cat===cat),random));
    const rest=shuffled(pair.pool.filter(item=>!first.includes(item)),random);
    const before=shuffled(first.concat(rest.slice(0,spec.n-2)),random);
    const used=new Set(before.map(item=>item.id));
    const added=shuffled(pair.pool.filter(item=>!used.has(item.id)),random).slice(0,spec.k);
    return {before,added};
  }
  const excluded=pick(cats.filter(cat=>items.filter(item=>item.cat!==cat).length>=spec.n+1),random);
  const different=shuffled(items.filter(item=>item.cat===excluded),random);
  const available=items.filter(item=>item.cat!==excluded);
  if(spec.similar==='none')return {before:shuffled(available,random).slice(0,spec.n),added:different.slice(0,spec.k)};
  const sameCat=pick(cats.filter(cat=>cat!==excluded&&available.filter(item=>item.cat===cat).length>=2),random);
  const same=shuffled(available.filter(item=>item.cat===sameCat),random);
  const before=shuffled([same[0],...shuffled(available.filter(item=>item!==same[0]&&item!==same[1]),random).slice(0,spec.n-1)],random);
  return {before,added:shuffled([same[1],different[0]],random)};
}
export function generateQuestion(level,items,random=Math.random){
  const spec=LEVELS[level-1],chosen=chooseObjects(spec,items,random);
  const count=spec.cols*spec.rows,slots=shuffled(Array.from({length:count},(_,i)=>i),random);
  const before=Array(count).fill(null);
  chosen.before.forEach((item,i)=>before[slots[i]]=item.id);
  let after=before.slice();
  if(!spec.shuffle)chosen.added.forEach((item,i)=>after[slots[spec.n+i]]=item.id);
  else{
    const all=chosen.before.concat(chosen.added);
    let attempt=0;
    do{
      after=Array(count).fill(null);
      const positions=shuffled(slots,random);
      all.forEach((item,i)=>after[positions[i]]=item.id);
      attempt++;
    }while(chosen.before.some(item=>after[before.indexOf(item.id)]===item.id)&&attempt<200);
  }
  return {...spec,before,after,added:chosen.added.map(item=>item.id)};
}
export function validateQuestion(question,items){
  const errors=[],lookup=new Map(items.map(item=>[item.id,item]));
  const before=question.before.filter(Boolean),after=question.after.filter(Boolean);
  if(before.length!==question.n||after.length!==question.n+question.k)errors.push('件数');
  if(new Set(after).size!==after.length)errors.push('同屏重复');
  if(after.some(id=>!lookup.has(id)))errors.push('未知物品');
  const diff=after.filter(id=>!before.includes(id));
  if(diff.slice().sort().join()!==question.added.slice().sort().join())errors.push('新增不唯一');
  if(before.some(id=>!after.includes(id)))errors.push('原有物丢失');
  if(!question.shuffle&&before.some(id=>question.before.indexOf(id)!==question.after.indexOf(id)))errors.push('原位改变');
  if(question.shuffle&&before.some(id=>question.before.indexOf(id)===question.after.indexOf(id)))errors.push('打乱后留在原位');
  const originalCats=new Set(before.map(id=>lookup.get(id)?.cat));
  const same=question.added.filter(id=>originalCats.has(lookup.get(id)?.cat)).length;
  if(question.similar==='none'&&same!==0)errors.push('不同类');
  if(question.similar==='one'&&same!==1)errors.push('一件同类');
  if(question.similar==='two'&&new Set(after.map(id=>lookup.get(id)?.cat)).size!==2)errors.push('整屏两类');
  return errors;
}
export class MemorySession{
  constructor(config,items,random=Math.random){this.config=config;this.items=items;this.random=random;this.reset();}
  reset(lockedLevel=null){
    this.lockedLevel=lockedLevel;this.level=lockedLevel||1;this.highestLevel=this.level;
    this.score=0;this.remainingMs=this.config.sessionMs;this.progress=0;this.badStreak=0;
    this.roundNo=0;this.paused=false;this.phase='idle';this.history=[];
    this.stats=LEVELS.map(spec=>({level:spec.level,label:spec.label,score:0,clears:0,errors:0}));
    this.beginQuestion();
  }
  beginQuestion(){
    if(this.remainingMs<=0)return;
    this.roundNo++;this.roundLevel=this.level;this.q=generateQuestion(this.level,this.items,this.random);
    this.found=new Set();this.phase='watch';this.phaseRemainingMs=this.config.watchMs;
    this.watchUsedMs=0;this.answerUsedMs=0;this.highestLevel=Math.max(this.highestLevel,this.level);
  }
  finishWatch(){
    if(this.phase!=='watch'||this.paused)return [];
    this.phase='cover';this.phaseRemainingMs=this.config.coverMs;return [{type:'cover'}];
  }
  advance(delta){
    const events=[];if(this.paused||['feedback','ended','idle'].includes(this.phase))return events;
    let left=Math.max(0,delta);
    while(left>0&&['watch','cover','find'].includes(this.phase)){
      const phase=this.phase,timed=phase!=='cover';
      const step=Math.min(left,this.phaseRemainingMs,timed?this.remainingMs:Infinity);
      this.phaseRemainingMs=Math.max(0,this.phaseRemainingMs-step);left-=step;
      if(timed){this.remainingMs=Math.max(0,this.remainingMs-step);if(phase==='watch')this.watchUsedMs+=step;else this.answerUsedMs+=step;}
      if(timed&&this.remainingMs===0){this.end();events.push({type:'ended'});break;}
      if(this.phaseRemainingMs===0){
        if(phase==='watch')events.push(...this.finishWatch());
        else if(phase==='cover'){this.phase='find';this.phaseRemainingMs=this.config.answerMs;events.push({type:'revealed'});}
        else events.push(this.finishQuestion(false,'timeout'));
      }
      if(step===0&&this.phase===phase)break;
    }
    return events;
  }
  click(index){
    if(this.paused||this.phase!=='find')return null;
    const id=this.q.after[index];if(!id||this.found.has(id))return {type:'ignored'};
    if(!this.q.added.includes(id))return {...this.finishQuestion(false,'wrong'),index};
    this.found.add(id);
    if(this.found.size===this.q.k)return this.finishQuestion(true,'correct');
    return {type:'hit',index};
  }
  finishQuestion(correct,reason){
    if(this.phase==='feedback'||this.phase==='ended')return null;
    const spec=LEVELS[this.roundLevel-1],row=this.stats[this.roundLevel-1];
    const award=correct?this.config.award[this.roundLevel-1]:0;
    this.score+=award;row.score+=award;if(correct)row.clears++;else row.errors++;
    this.history.push({round:this.roundNo,level:this.roundLevel,outcome:reason,award,found:[...this.found],added:this.q.added.slice(),before:this.q.before.slice(),after:this.q.after.slice(),watchMs:this.watchUsedMs,answerMs:this.answerUsedMs});
    const previous=this.level;
    if(correct){
      this.badStreak=0;this.progress++;
      if(!this.lockedLevel&&this.level<6&&this.progress>=this.config.upgrade[this.level-1]){this.level++;this.progress=0;}
      if(this.level===6)this.progress=0;
    }else{
      this.badStreak++;
      if(this.badStreak>=this.config.downgrade){if(!this.lockedLevel)this.level=Math.max(1,this.level-1);this.badStreak=0;this.progress=0;}
    }
    this.phase='feedback';
    return {type:'result',correct,reason,award,score:this.score,roundLevel:this.roundLevel,nextLevel:this.level,levelUp:this.level>previous};
  }
  end(){
    if(this.phase==='ended')return;
    if(['watch','cover','find'].includes(this.phase))this.history.push({round:this.roundNo,level:this.roundLevel,outcome:'unfinished',award:0,found:[...this.found],added:this.q.added.slice(),watchMs:this.watchUsedMs,answerMs:this.answerUsedMs});
    this.phase='ended';this.remainingMs=0;
  }
  snapshot(){return {phase:this.phase,paused:this.paused,level:this.level,roundLevel:this.roundLevel,roundNo:this.roundNo,score:this.score,remainingMs:this.remainingMs,phaseRemainingMs:this.phaseRemainingMs,found:[...this.found],q:structuredClone(this.q),progress:this.progress,badStreak:this.badStreak,lockedLevel:this.lockedLevel};}
  getResult(){return {totalScore:this.score,highestLevel:this.highestLevel,levels:this.stats.map(row=>({...row})),history:structuredClone(this.history)};}
}
