(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_lighthouse_a');
  if(!source)throw new Error('Missing L2_lighthouse_a');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam;
  for(const id of ['r4','r5','r6'])get(id).c='G';
  tapes.push(
    {id:'r7',c:'R',bind:['tower'],over:['g2'],segs:line([-.43,-.4,-.455],[0,-.4,-.455],'-z')},
    {id:'r8',c:'R',bind:['tower'],over:['g3'],segs:line([0,-.955,-.15],[0,-.955,.35],'-y')},
    {id:'r9',c:'R',bind:['tower'],segs:line([.455,-.35,.08],[.455,.1,.08],'+x')}
  );
  registerQuestion({...source,id:'L3_lighthouse_cross',modelId:'lighthouse',sourceQuestionId:source.id,level:'L3',levelName:'中阶',review:'pending',queue:'RGRG',open:1,yaw:2.3,pitch:.32,tapes});
})();
