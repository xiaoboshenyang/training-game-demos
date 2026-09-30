// mailbox L6 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_mailbox_a');
  if(!source)throw new Error('Missing source question L1_mailbox_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['body'],segs:line([-.58,-.12,-.55],[.58,-.12,-.55],'-z')},
    {id:'x2',c:'R',bind:['body'],over:['x1'],segs:line([-.3,-.48,-.55],[.3,.24,-.55],'-z')},
    {id:'x3',c:'R',bind:['body'],over:['x1', 'x2'],segs:line([0,-.55,-.55],[0,.31,-.55],'-z')},
    {id:'x4',c:'R',bind:['body'],segs:line([.775,-.72,-.18],[.775,-.12,-.18],'+x')},
    {id:'x5',c:'R',bind:['body'],segs:line([-.775,-.72,.18],[-.775,-.12,.18],'-x')},
    {id:'x6',c:'R',bind:['body'],segs:line([.775,.16,-.25],[.775,.78,-.25],'+x')},
    {id:'x7',c:'R',bind:['body'],segs:line([-.775,.16,.25],[-.775,.78,.25],'-x')},
    {id:'x8',c:'R',bind:['body'],segs:line([.48,.43,-.55],[.48,.9,-.55],'-z')},
    {id:'x9',c:'R',bind:['body'],segs:line([.775,-.72,.24],[.775,-.12,.24],'+x')},
  ];
  const colors=['R','G','G','Y','Y','B','B','G','R','R','B','R','R','Y','R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L6_mailbox_cross2',modelId:'mailbox',sourceQuestionId:source.id,
    level:'L6',levelName:'宗师',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:2.48,pitch:0.36,queue:'BRGYR',open:2,tapes});
})();
