// airplane L6 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_airplane_a');
  if(!source)throw new Error('Missing source question L2_airplane_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['wingL'],segs:line([-.97,-.225,.05],[-.39,-.225,.05],'-y')},
    {id:'x2',c:'R',bind:['wingL'],over:['x1', 'g1'],segs:line([-.69,-.225,-.09],[-.69,-.225,.48],'-y')},
    {id:'x3',c:'R',bind:['wingR'],segs:line([.97,-.225,.05],[.39,-.225,.05],'-y')},
    {id:'x4',c:'R',bind:['wingR'],over:['x3', 'g2'],segs:line([.69,-.225,-.09],[.69,-.225,.48],'-y')},
    {id:'x5',c:'R',bind:['body'],segs:line([-.13,.225,.61],[-.13,.225,1.02],'+y')},
    {id:'x6',c:'R',bind:['body'],over:['x5'],segs:line([-.2,.225,.85],[.2,.225,.85],'+y')},
  ];
  const colors=['B','R','R','R','R','G','Y','G','G','R','B','Y','R','Y','B'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L6_airplane_cross2',modelId:'airplane',sourceQuestionId:source.id,
    level:'L6',levelName:'宗师',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:2.48,pitch:0.36,queue:'YBRGR',open:2,tapes});
})();
