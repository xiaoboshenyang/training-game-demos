// lighthouse L4 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_lighthouse_a');
  if(!source)throw new Error('Missing source question L2_lighthouse_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['tower'],segs:line([-.37,.3,-.45],[.37,.3,-.45],'-z')},
    {id:'x2',c:'R',bind:['tower'],over:['x1'],segs:line([-.22,-.02,-.45],[.22,.66,-.45],'-z')},
    {id:'x3',c:'R',bind:['tower'],over:['x1', 'x2'],segs:line([.11,-.09,-.45],[.11,.73,-.45],'-z')},
  ];
  tapes.find(t=>t.id==='r2').segs=TapeTools.foldEdge([-.45,.43,.18],[-.45,.85,.18],[-.55,.85,.18],'-x','-y');
  const colors=['R', 'R', 'R', 'Y', 'Y', 'Y', 'B', 'B', 'B', 'R', 'R', 'R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L4_lighthouse_cross2',modelId:'lighthouse',sourceQuestionId:source.id,
    level:'L4',levelName:'高阶',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:2.48,pitch:0.31,queue:'RYBR',open:2,tapes});
})();
