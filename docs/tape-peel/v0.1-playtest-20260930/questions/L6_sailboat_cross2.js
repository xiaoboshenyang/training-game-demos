// sailboat L6 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_sailboat_a');
  if(!source)throw new Error('Missing source question L1_sailboat_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['sail'],segs:line([.12,.18,.22],[.75,.18,.22],'-z')},
    {id:'x2',c:'R',bind:['sail'],over:['x1'],segs:line([.3,-.15,.22],[.3,.6,.22],'-z')},
    {id:'x3',c:'R',bind:['sail'],over:['x1', 'x2'],segs:line([.18,-.05,.22],[.6,.48,.22],'-z')},
    {id:'x4',c:'R',bind:['cabin'],segs:line([-.91,-.05,-.3],[-.39,-.05,-.3],'-z')},
    {id:'x5',c:'R',bind:['cabin'],over:['x4'],segs:line([-.6,-.23,-.3],[-.6,.17,-.3],'-z')},
    {id:'x6',c:'R',bind:['hull'],segs:line([-.5,-.69,-.3],[.5,-.69,-.3],'-z')},
    {id:'x7',c:'R',bind:['cabin'],segs:line([-.74,.2,-.18],[-.25,.2,-.18],'+y')},
    {id:'x8',c:'R',bind:['hull'],segs:line([.55,-.25,-.2],[.95,-.25,-.2],'+y')},
    {id:'x9',c:'R',bind:['hull'],segs:line([0,-.85,-.22],[0,-.85,.22],'-y')},
  ];
  const colors=['R','G','G','Y','Y','B','B','G','R','R','B','R','R','Y','R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L6_sailboat_cross2',modelId:'sailboat',sourceQuestionId:source.id,
    level:'L6',levelName:'宗师',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:2.48,pitch:0.36,queue:'BRGYR',open:2,tapes});
})();
