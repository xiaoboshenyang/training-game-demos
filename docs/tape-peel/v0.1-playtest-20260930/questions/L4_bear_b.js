// 纸板小熊变体：位置与颜色均相对 A 改动。
(() => {
  const BASE_ID='L4_bear_a';
  const base=QUESTION_BANK.find(q=>q.id===BASE_ID);
  const tapes=base.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const set=(id,changes)=>Object.assign(tapes.find(t=>t.id===id),changes);
  const line=TapeTools.crossSeam;
  set('r3',{c:'Y',segs:line([-.25,.5,-.33],[-.25,.81,-.33],'-z')});
  set('y3',{c:'R',segs:line([-.24,1.06,-.33],[-.24,1.52,-.33],'-z')});
  set('b3',{segs:line([-.405,1.04,-.23],[-.405,1.04,.23],'-x')});
  registerQuestion({...base,id:'L4_bear_b',review:'pending',yaw:-0.48,tapes});
})();
