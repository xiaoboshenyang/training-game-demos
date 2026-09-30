// sailboat L3 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_sailboat_a');
  if(!source)throw new Error('Missing source question L1_sailboat_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['sail'],segs:line([.12,.18,.22],[.75,.18,.22],'-z')},
    {id:'x2',c:'R',bind:['sail'],over:['x1'],segs:line([.3,-.15,.22],[.3,.6,.22],'-z')},
    {id:'x3',c:'R',bind:['sail'],over:['x1'],segs:line([.58,-.1,.22],[.58,.34,.22],'-z')},
  ];
  const colors=['R', 'R', 'R', 'G', 'G', 'G', 'R', 'R', 'R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L3_sailboat_cross2',modelId:'sailboat',sourceQuestionId:source.id,
    level:'L3',levelName:'中阶',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:1.95,pitch:0.31,queue:'RGR',open:1,tapes});
})();
