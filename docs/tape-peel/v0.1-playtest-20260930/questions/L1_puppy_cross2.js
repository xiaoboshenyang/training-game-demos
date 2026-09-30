(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_puppy_a');
  if(!source)throw new Error('Missing L2_puppy_a');
  const keep=['r1', 'r2', 'r3', 'g1', 'g2', 'g3'];
  const colors={};
  const tapes=source.tapes.filter(t=>keep.includes(t.id)).map(t=>({...t,c:colors[t.id]||t.c,bind:[...t.bind],over:[...(t.over||[])].filter(id=>keep.includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(

  );
  registerQuestion({...source,id:'L1_puppy_cross2',modelId:'puppy',sourceQuestionId:source.id,level:'L1',levelName:'基础',review:'pending',queue:'RG',open:1,yaw:0.4,pitch:0.24,tapes});
})();
