// airplane L4 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_airplane_a');
  if(!source)throw new Error('Missing source question L2_airplane_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['wingL'],segs:line([-.97,-.225,.05],[-.39,-.225,.05],'-y')},
    {id:'x2',c:'R',bind:['wingL'],over:['x1', 'g1'],segs:line([-.69,-.225,-.09],[-.69,-.225,.48],'-y')},
    {id:'x3',c:'R',bind:['wingR'],segs:line([.97,-.225,.05],[.39,-.225,.05],'-y')},
  ];
  const colors=['R', 'R', 'R', 'Y', 'Y', 'Y', 'B', 'B', 'B', 'R', 'R', 'R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L4_airplane_cross2',modelId:'airplane',sourceQuestionId:source.id,
    level:'L4',levelName:'高阶',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:2.48,pitch:0.31,queue:'RYBR',open:2,tapes});
})();
