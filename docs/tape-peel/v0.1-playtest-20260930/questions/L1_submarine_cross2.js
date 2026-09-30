(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_submarine_a');
  if(!source)throw new Error('Missing L3_submarine_a');
  const keep=['r3', 'r4', 'r5', 'r6', 'y2', 'y3'];
  const colors={'r6':'Y'};
  const tapes=source.tapes.filter(t=>keep.includes(t.id)).map(t=>({...t,c:colors[t.id]||t.c,bind:[...t.bind],over:[...(t.over||[])].filter(id=>keep.includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(

  );
  registerQuestion({...source,id:'L1_submarine_cross2',modelId:'submarine',sourceQuestionId:source.id,level:'L1',levelName:'基础',review:'pending',queue:'RY',open:1,yaw:0.45,pitch:0.2,tapes});
})();
