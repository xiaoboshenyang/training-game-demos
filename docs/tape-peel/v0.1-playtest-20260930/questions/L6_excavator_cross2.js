// 挖掘机 L6：前履带板三层顺压，顶面和底面各增一条回查目标。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_excavator_a');
  if(!source)throw new Error('Missing source L4_excavator_a');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  tapes.push(
    {id:'g1',c:'G',bind:['chassis'],over:['y2','y3'],segs:line([-.25,-.37,-.43],[.25,-.72,-.43],'-z')},
    {id:'g2',c:'G',bind:['chassis'],segs:line([-.7,-.83,-.25],[-.3,-.83,-.25],'-y')},
    {id:'g3',c:'G',bind:['chassis'],segs:line([0,-.83,-.25],[0,-.83,.25],'-y')}
  );
  tapes.find(t=>t.id==='r3').segs=line([-.55,-.35,-.43],[-.55,.12,-.43],'-z');
  const colors={r1:'R',r2:'B',r3:'Y',r4:'R',r5:'Y',r6:'R',y1:'Y',y2:'B',y3:'R',y4:'G',y5:'G',y6:'B',b1:'G',b2:'Y',b3:'R',g1:'Y',g2:'R',g3:'Y'};
  for(const t of tapes)t.c=colors[t.id];
  registerQuestion({...source,id:'L6_excavator_cross2',modelId:'excavator',sourceQuestionId:source.id,
    level:'L6',levelName:'宗师',object:'纸板挖掘机·跨级候选',review:'pending',
    yaw:2.8,pitch:.32,queue:'BYGYRR',open:2,tapes});
})();
