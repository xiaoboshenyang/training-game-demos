(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_puppy_a');
  if(!source)throw new Error('Missing L2_puppy_a');
  const keep=['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'g1', 'g2', 'g3'];
  const colors={};
  const tapes=source.tapes.filter(t=>keep.includes(t.id)).map(t=>({...t,c:colors[t.id]||t.c,bind:[...t.bind],over:[...(t.over||[])].filter(id=>keep.includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  {const a=tapes.find(t=>t.id==='r5').segs[0];a.a.y=-.65;a.b.y=-.05;} {const b=tapes.find(t=>t.id==='r6').segs[0];b.a.set(.3,-.65,-.88);b.b.set(.3,-.32,-.88);b.n.set(0,0,-1);} {const c=tapes.find(t=>t.id==='g3').segs[0];c.a.z=.2;c.b.z=.2;}
  tapes.push(
    {id:'b1',c:'B',bind:['body'],over:['r6'],segs:line([.03,-.5,-.88],[.56,-.5,-.88],'-z')},
    {id:'b3',c:'B',bind:['body'],segs:line([-.16,-.73,-.55],[-.16,-.73,-.15],'-y')},
    {id:'b4',c:'B',bind:['body'],segs:line([.17,-.73,-.55],[.17,-.73,-.15],'-y')},
  );
  registerQuestion({...source,id:'L3_puppy_cross2',modelId:'puppy',sourceQuestionId:source.id,level:'L3',levelName:'中阶',review:'pending',queue:'BRRG',open:1,yaw:2.4,pitch:0.27,tapes});
})();
