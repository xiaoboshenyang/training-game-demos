// suitcase L5 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_suitcase_a');
  if(!source)throw new Error('Missing source question L1_suitcase_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['body'],segs:line([-.77,-.23,-.35],[.77,-.23,-.35],'-z')},
    {id:'x2',c:'R',bind:['body'],over:['x1'],segs:line([-.34,-.6,-.35],[.34,.15,-.35],'-z')},
    {id:'x3',c:'R',bind:['body'],over:['x1'],segs:line([-.5,-.4,-.35],[-.5,.22,-.35],'-z')},
    {id:'x4',c:'R',bind:['body'],segs:line([1,-.63,-.15],[1,.16,-.15],'+x')},
    {id:'x5',c:'R',bind:['body'],segs:line([-1,-.63,.15],[-1,.16,.15],'-x')},
    {id:'x6',c:'R',bind:['body'],segs:line([.58,-.9,-.23],[.58,-.9,.23],'-y')},
    {id:'x7',c:'R',bind:['body'],segs:line([-.58,-.9,-.23],[-.58,-.9,.23],'-y')},
    {id:'x8',c:'R',bind:['lid'],segs:line([.69,.66,-.25],[.69,.66,.25],'+y')},
    {id:'x9',c:'R',bind:['body'],over:['x4'],segs:line([1,-.23,-.33],[1,-.23,.33],'+x')},
  ];
  const colors=['G','G','R','B','Y','R','G','R','R','B','Y','B','R','Y','R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L5_suitcase_cross2',modelId:'suitcase',sourceQuestionId:source.id,
    level:'L5',levelName:'超凡',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:2.48,pitch:0.36,queue:'GRBYR',open:2,tapes});
})();
