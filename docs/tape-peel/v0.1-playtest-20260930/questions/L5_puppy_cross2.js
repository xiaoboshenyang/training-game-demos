(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_puppy_a');
  if(!source)throw new Error('Missing L2_puppy_a');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  {const a=tapes.find(t=>t.id==='r5').segs[0];a.a.y=-.65;a.b.y=-.05;} {const b=tapes.find(t=>t.id==='r6').segs[0];b.a.set(.3,-.65,-.88);b.b.set(.3,-.32,-.88);b.n.set(0,0,-1);} {const c=tapes.find(t=>t.id==='g3').segs[0];c.a.z=.2;c.b.z=.2;}
  tapes.push(
    {id:'b1',c:'B',bind:['body'],over:['r6'],segs:line([.03,-.5,-.88],[.56,-.5,-.88],'-z')},
    {id:'b2',c:'B',bind:['body'],over:['r5'],segs:line([-.58,-.2,-.88],[0,-.2,-.88],'-z')},
    {id:'b3',c:'B',bind:['body'],segs:line([-.16,-.73,-.55],[-.16,-.73,-.15],'-y')},
    {id:'b4',c:'B',bind:['body'],segs:line([.17,-.73,-.55],[.17,-.73,-.15],'-y')},
    {id:'b5',c:'B',bind:['body'],segs:line([-.29,.03,-.72],[-.29,.03,-.22],'+y')},
    {id:'b6',c:'B',bind:['body'],segs:line([.07,.03,-.72],[.07,.03,-.22],'+y')},
  );
  const chosen={"r1":"R","r2":"B","r3":"B","r4":"B","r5":"R","r6":"R","g1":"G","g2":"R","g3":"B","b1":"G","b2":"G","b3":"R","b4":"R","b5":"B","b6":"B"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L5_puppy_cross2',modelId:'puppy',sourceQuestionId:source.id,level:'L5',levelName:'超凡',review:'pending',queue:'BRRBG',open:2,yaw:2.5,pitch:0.26,tapes});
})();
