// giftbox L2 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_giftbox_b');
  if(!source)throw new Error('Missing source question L1_giftbox_b');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['body'],segs:line([-.57,-.31,-.7],[.57,-.31,-.7],'-z')},
    {id:'x2',c:'R',bind:['body'],segs:line([.775,-.68,-.3],[.775,-.02,-.3],'+x')},
    {id:'x3',c:'R',bind:['body'],segs:line([-.775,-.68,.29],[-.775,-.02,.29],'-x')},
  ];
  const colors=['R', 'R', 'R', 'G', 'G', 'G', 'R', 'R', 'R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L2_giftbox_cross2',modelId:'giftbox',sourceQuestionId:source.id,
    level:'L2',levelName:'初阶',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:1.95,pitch:0.31,queue:'RGR',open:1,tapes});
})();
