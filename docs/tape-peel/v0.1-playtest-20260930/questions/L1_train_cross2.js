(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_train_a');
  if(!source)throw new Error('Missing L3_train_a');
  const keep=['r1', 'r2', 'r3', 'r4', 'y1', 'y2'];
  const colors={'r4':'Y'};
  const tapes=source.tapes.filter(t=>keep.includes(t.id)).map(t=>({...t,c:colors[t.id]||t.c,bind:[...t.bind],over:[...(t.over||[])].filter(id=>keep.includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(

  );
  registerQuestion({...source,id:'L1_train_cross2',modelId:'train',sourceQuestionId:source.id,level:'L1',levelName:'基础',review:'pending',queue:'RY',open:1,yaw:0.42,pitch:0.18,tapes});
})();
