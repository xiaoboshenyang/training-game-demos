// camera L5 cross-level candidate; reuses the formal model and part metadata.
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_camera_a');
  if(!source)throw new Error('Missing source question L1_camera_a');
  const clone=t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const line=TapeTools.crossSeam;
  const tapes=[...source.tapes.map(clone),
    {id:'x1',c:'R',bind:['body'],segs:line([-.8,-.18,-.425],[.7,-.18,-.425],'-z')},
    {id:'x2',c:'R',bind:['body'],over:['x1'],segs:line([-.38,-.52,-.425],[.38,.2,-.425],'-z')},
    {id:'x3',c:'R',bind:['body'],over:['x1'],segs:line([-.59,-.4,-.425],[-.59,.3,-.425],'-z')},
    {id:'x4',c:'R',bind:['body'],segs:line([1.1,-.62,-.24],[1.1,.15,-.24],'+x')},
    {id:'x5',c:'R',bind:['body'],segs:line([-1.1,-.62,-.24],[-1.1,.15,-.24],'-x')},
    {id:'x6',c:'R',bind:['body'],segs:line([.5,-.875,-.22],[.5,-.875,.22],'-y')},
    {id:'x7',c:'R',bind:['body'],segs:line([-.5,-.875,-.22],[-.5,-.875,.22],'-y')},
    {id:'x8',c:'R',bind:['body'],segs:line([.72,.575,-.18],[.72,.575,.18],'+y')},
    {id:'x9',c:'R',bind:['body'],over:['x4'],segs:line([1.1,-.25,-.35],[1.1,-.25,.35],'+x')},
  ];
  const colors=['R','G','Y','R','R','Y','Y','R','R','G','B','B','G','B','R'];
  tapes.forEach((t,i)=>{t.c=colors[i];});
  registerQuestion({...source,id:'L5_camera_cross2',modelId:'camera',sourceQuestionId:source.id,
    level:'L5',levelName:'超凡',object:source.object+'·跨级候选',review:'pending',
    build:source.build,yaw:2.48,pitch:0.36,queue:'BYRGR',open:2,tapes});
})();
