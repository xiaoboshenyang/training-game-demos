(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_rocket_a');
  if(!source)throw new Error('Missing L3_rocket_a');
  const keep=['y1', 'r3', 'y3', 'b2', 'b3', 'r4'];
  const colors={'b2':'Y','b3':'R'};
  const tapes=source.tapes.filter(t=>keep.includes(t.id)).map(t=>({...t,c:colors[t.id]||t.c,bind:[...t.bind],over:[...(t.over||[])].filter(id=>keep.includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(

  );
  registerQuestion({...source,id:'L1_rocket_cross2',modelId:'rocket',sourceQuestionId:source.id,level:'L1',levelName:'基础',review:'pending',queue:'RY',open:1,yaw:0.5,pitch:0.2,tapes});
})();
