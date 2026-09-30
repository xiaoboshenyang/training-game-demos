// 纸板小火车变体：位置与颜色均相对 A 改动。
(() => {
  const BASE_ID='L3_train_a';
  const base=QUESTION_BANK.find(q=>q.id===BASE_ID);
  const tapes=base.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const set=(id,changes)=>Object.assign(tapes.find(t=>t.id===id),changes);
  const line=TapeTools.crossSeam;
  set('r1',{segs:line([-.16,.03,-.455],[-.16,.59,-.455],'-z')});
  set('r3',{c:'B',segs:line([.65,.07,-.455],[.96,.07,-.455],'-z')});
  set('b1',{c:'R',segs:line([-.19,.04,.455],[-.19,.6,.455],'+z')});
  registerQuestion({...base,id:'L3_train_c',review:'pending',yaw:-0.58,tapes});
})();
