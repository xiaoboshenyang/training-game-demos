// 纸板小火车变体：位置与颜色均相对 A 改动。
(() => {
  const BASE_ID='L3_train_a';
  const base=QUESTION_BANK.find(q=>q.id===BASE_ID);
  const tapes=base.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const set=(id,changes)=>Object.assign(tapes.find(t=>t.id===id),changes);
  const line=TapeTools.crossSeam;
  set('r1',{c:'Y',segs:line([-.16,.03,.455],[-.16,.44,.455],'+z')});
  set('r2',{segs:line([-.86,-.32,.455],[-.07,-.32,.455],'+z')});
  set('r3',{segs:line([.65,-.34,.455],[.96,-.34,.455],'+z')});
  set('y2',{c:'R'});
  registerQuestion({...base,id:'L3_train_b',review:'pending',yaw:-0.43,tapes});
})();
