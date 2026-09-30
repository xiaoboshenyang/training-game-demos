// giftbox L5 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_giftbox_b');
  if(!source)throw new Error('Missing source question L1_giftbox_b');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['body'],segs:line([-.75,-.31,-.7],[.57,-.31,-.7],'-z')},
    {id:'x2',c:'R',bind:['body'],over:['x1'],segs:line([-.28,-.66,-.7],[.28,.04,-.7],'-z')},
    {id:'x3',c:'R',bind:['body'],over:['x1'],segs:line([-.55,-.55,-.7],[-.55,.1,-.7],'-z')},
    {id:'x4',c:'R',bind:['body'],segs:line([.775,-.68,-.3],[.775,-.02,-.3],'+x')},
    {id:'x5',c:'R',bind:['body'],segs:line([-.775,-.68,.29],[-.775,-.02,.29],'-x')},
    {id:'x6',c:'R',bind:['body'],segs:line([.48,-.9,-.43],[.48,-.9,.37],'-y')},
    {id:'x7',c:'R',bind:['body'],segs:line([-.49,-.9,-.43],[-.49,-.9,.37],'-y')},
    {id:'x8',c:'R',bind:['body'],segs:line([0,-.9,-.4],[0,-.9,.4],'-y')},
    {id:'x9',c:'R',bind:['body'],over:['x4'],segs:line([.775,-.35,-.55],[.775,-.35,.55],'+x')},
  ];
  const colors=['Y','R','B','B','Y','Y','G','R','R','B','R','R','G','G','R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L5_giftbox_cross2',modelId:'giftbox',sourceQuestionId:source.id,
    level:'L5',levelName:'超凡',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:2.48,pitch:0.36,queue:'GYRBR',open:2,tapes});
})();
