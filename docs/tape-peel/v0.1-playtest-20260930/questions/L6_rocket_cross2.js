(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_rocket_cross');
  if(!source)throw new Error('Missing L4_rocket_cross');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(
    {id:'g1',c:'G',bind:['low'],over:['r7'],segs:line([-.59,-1.005,-.14],[-.22,-1.005,-.14],'-y')},
    {id:'g2',c:'G',bind:['low'],over:['r8'],segs:line([-.16,-1.005,.14],[.16,-1.005,.14],'-y')},
    {id:'g3',c:'G',bind:['low'],over:['r9'],segs:line([.22,-1.005,-.14],[.59,-1.005,-.14],'-y')},
    {id:'y4',c:'Y',bind:['up','low'],over:['y2'],segs:line([-.6,.55,-.25],[-.6,-.55,-.25],'-x')},
    {id:'y5',c:'Y',bind:['low'],segs:line([-.6,-.72,-.48],[-.6,-.72,-.1],'-x')},
    {id:'y6',c:'Y',bind:['low'],segs:line([.6,-.72,.1],[.6,-.72,.48],'+x')},
  );
  const chosen={"y1":"R","r1":"Y","r2":"R","r3":"G","b1":"Y","y2":"Y","y3":"R","b2":"Y","b3":"R","r4":"G","r6":"Y","r5":"Y","r7":"B","r8":"B","r9":"B","g1":"G","g2":"R","g3":"R","y4":"R","y5":"R","y6":"R"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L6_rocket_cross2',modelId:'rocket',sourceQuestionId:source.id,level:'L6',levelName:'宗师',review:'pending',queue:'RYBGYRR',open:2,yaw:3.3,pitch:0.4,tapes});
})();
