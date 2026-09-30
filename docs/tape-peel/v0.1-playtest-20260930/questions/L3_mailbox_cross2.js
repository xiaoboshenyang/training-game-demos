// mailbox L3 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_mailbox_a');
  if(!source)throw new Error('Missing source question L1_mailbox_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['body'],segs:line([-.58,-.12,-.55],[.58,-.12,-.55],'-z')},
    {id:'x2',c:'R',bind:['body'],over:['x1'],segs:line([-.3,-.48,-.55],[.3,.24,-.55],'-z')},
    {id:'x3',c:'R',bind:['body'],over:['x1', 'x2'],segs:line([.14,-.55,-.55],[.14,.31,-.55],'-z')},
  ];
  const colors=['R', 'R', 'R', 'G', 'G', 'G', 'R', 'R', 'R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L3_mailbox_cross2',modelId:'mailbox',sourceQuestionId:source.id,
    level:'L3',levelName:'中阶',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:1.95,pitch:0.31,queue:'RGR',open:1,tapes});
})();
