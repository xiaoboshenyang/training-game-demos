// 纸板小城堡变体：位置与颜色均相对 A 改动。
(() => {
  const BASE_ID='L3_castle_a';
  const base=QUESTION_BANK.find(q=>q.id===BASE_ID);
  const tapes=base.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const set=(id,changes)=>Object.assign(tapes.find(t=>t.id===id),changes);
  const line=TapeTools.crossSeam;
  set('r1',{c:'Y',segs:line([-1.11,0,-.355],[-.49,0,-.355],'-z')});
  set('r2',{segs:line([.49,.02,.355],[1.11,.02,.355],'+z')});
  set('r3',{segs:line([-.2,.28,.355],[-.2,.62,.355],'+z')});
  set('y1',{c:'R'});
  registerQuestion({...base,id:'L3_castle_b',review:'pending',yaw:-0.45,tapes});
})();
