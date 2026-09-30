(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_train_cross');
  if(!source)throw new Error('Missing L4_train_cross');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(
    {id:'g1',c:'G',bind:['body'],segs:line([-.2,-.48,-.28],[.15,-.48,-.28],'-y')},
    {id:'g2',c:'G',bind:['body'],segs:line([.32,-.48,-.28],[.72,-.48,-.28],'-y')},
    {id:'g3',c:'G',bind:['body'],over:['g1'],segs:line([-.05,-.48,-.35],[-.05,-.48,.35],'-y')},
  );
  const chosen={"r1":"R","r2":"Y","r3":"R","r4":"G","r5":"R","r6":"G","y1":"R","y2":"G","y3":"Y","b1":"B","b2":"R","b3":"B","r7":"R","r8":"B","r9":"R","g1":"Y","g2":"R","g3":"R"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L5_train_cross2',modelId:'train',sourceQuestionId:source.id,level:'L5',levelName:'超凡',review:'pending',queue:'GRBYRR',open:2,yaw:2.5,pitch:0.3,tapes});
})();
