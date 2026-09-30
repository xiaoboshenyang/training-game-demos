(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_train_cross');
  if(!source)throw new Error('Missing L4_train_cross');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(
    {id:'g1',c:'G',bind:['body'],segs:line([-.2,-.48,-.28],[.15,-.48,-.28],'-y')},
    {id:'g2',c:'G',bind:['body'],segs:line([.32,-.48,-.28],[.72,-.48,-.28],'-y')},
    {id:'g3',c:'G',bind:['body'],over:['g1'],segs:line([-.05,-.48,-.35],[-.05,-.48,.35],'-y')},
    {id:'y4',c:'Y',bind:['carriage'],over:['r7','r9'],segs:line([-.6,-.48,-.36],[-.6,-.48,.36],'-y')},
    {id:'y5',c:'Y',bind:['body'],over:['r8','g2'],segs:line([.52,-.48,-.36],[.52,-.48,.36],'-y')},
    {id:'y6',c:'Y',bind:['bumper'],segs:line([.985,-.43,-.28],[.985,.02,-.28],'+x')},
  );
  const chosen={"r1":"R","r2":"Y","r3":"B","r4":"R","r5":"Y","r6":"Y","y1":"Y","y2":"B","y3":"R","b1":"R","b2":"R","b3":"G","r7":"B","r8":"G","r9":"G","g1":"R","g2":"R","g3":"Y","y4":"R","y5":"Y","y6":"R"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L6_train_cross2',modelId:'train',sourceQuestionId:source.id,level:'L6',levelName:'宗师',review:'pending',queue:'YRBGYRR',open:2,yaw:3.35,pitch:0.4,tapes});
})();
