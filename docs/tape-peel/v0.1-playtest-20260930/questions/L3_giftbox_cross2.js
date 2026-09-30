// giftbox L3 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_giftbox_b');
  if(!source)throw new Error('Missing source question L1_giftbox_b');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['body'],segs:line([-.57,-.31,-.7],[.57,-.31,-.7],'-z')},
    {id:'x2',c:'R',bind:['body'],over:['x1'],segs:line([-.28,-.66,-.7],[.28,.04,-.7],'-z')},
    {id:'x3',c:'R',bind:['body'],over:['x1', 'x2'],segs:line([.15,-.7,-.7],[.15,.08,-.7],'-z')},
  ];
  const colors=['R', 'R', 'R', 'G', 'G', 'G', 'R', 'R', 'R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L3_giftbox_cross2',modelId:'giftbox',sourceQuestionId:source.id,
    level:'L3',levelName:'中阶',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:1.95,pitch:0.31,queue:'RGR',open:1,tapes});
})();
