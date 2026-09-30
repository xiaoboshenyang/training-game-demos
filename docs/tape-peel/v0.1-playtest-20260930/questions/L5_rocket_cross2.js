(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_rocket_cross');
  if(!source)throw new Error('Missing L4_rocket_cross');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(
    {id:'g1',c:'G',bind:['low'],over:['r7'],segs:line([-.59,-1.005,-.14],[-.22,-1.005,-.14],'-y')},
    {id:'g2',c:'G',bind:['low'],over:['r8'],segs:line([-.16,-1.005,.14],[.16,-1.005,.14],'-y')},
    {id:'g3',c:'G',bind:['low'],over:['r9'],segs:line([.22,-1.005,-.14],[.59,-1.005,-.14],'-y')},
  );
  const chosen={"y1":"B","r1":"Y","r2":"B","r3":"R","b1":"R","y2":"G","y3":"R","b2":"G","b3":"R","r4":"R","r6":"B","r5":"Y","r7":"R","r8":"G","r9":"Y","g1":"R","g2":"R","g3":"R"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L5_rocket_cross2',modelId:'rocket',sourceQuestionId:source.id,level:'L5',levelName:'超凡',review:'pending',queue:'RYGRRB',open:2,yaw:2.4,pitch:0.3,tapes});
})();
