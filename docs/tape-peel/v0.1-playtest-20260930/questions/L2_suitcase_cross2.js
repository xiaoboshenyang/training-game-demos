// suitcase L2 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_suitcase_a');
  if(!source)throw new Error('Missing source question L1_suitcase_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['body'],segs:line([-.77,-.23,-.35],[.77,-.23,-.35],'-z')},
    {id:'x2',c:'R',bind:['body'],segs:line([1,-.63,-.15],[1,.16,-.15],'+x')},
    {id:'x3',c:'R',bind:['body'],segs:line([-1,-.63,.15],[-1,.16,.15],'-x')},
  ];
  const colors=['R', 'R', 'R', 'G', 'G', 'G', 'R', 'R', 'R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L2_suitcase_cross2',modelId:'suitcase',sourceQuestionId:source.id,
    level:'L2',levelName:'初阶',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:1.95,pitch:0.31,queue:'RGR',open:1,tapes});
})();
