(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_airplane_a');
  if(!source)throw new Error('Missing L2_airplane_a');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam;
  for(const id of ['r4','r5','r6'])get(id).c='G';
  tapes.push(
    {id:'r7',c:'R',bind:['wingL'],over:['r1'],segs:line([-.65,-.09,-.15],[-.65,-.09,.4],'+y')},
    {id:'r8',c:'R',bind:['wingR'],over:['r2'],segs:line([.65,-.09,-.15],[.65,-.09,.4],'+y')},
    {id:'r9',c:'R',bind:['body'],segs:line([-.285,-.06,.3],[-.285,-.06,.72],'-x')}
  );
  registerQuestion({...source,id:'L3_airplane_cross',modelId:'airplane',sourceQuestionId:source.id,level:'L3',levelName:'中阶',review:'pending',queue:'RGRG',open:1,yaw:2.45,pitch:.32,tapes});
})();
