// 纸板小城堡变体：位置与颜色均相对 A 改动。
(() => {
  const BASE_ID='L3_castle_a';
  const base=QUESTION_BANK.find(q=>q.id===BASE_ID);
  const tapes=base.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const set=(id,changes)=>Object.assign(tapes.find(t=>t.id===id),changes);
  const line=TapeTools.crossSeam;
  set('r1',{segs:line([-1.11,.05,.355],[-.49,.05,.355],'+z')});
  set('r2',{c:'B',segs:line([.49,.05,-.355],[1.11,.05,-.355],'-z')});
  set('r3',{segs:line([-.25,.28,-.355],[-.25,.6,-.355],'-z')});
  set('b2',{c:'R',segs:line([.49,-.37,.355],[1.11,-.37,.355],'+z')});
  registerQuestion({...base,id:'L3_castle_c',review:'pending',yaw:0.55,tapes});
})();
