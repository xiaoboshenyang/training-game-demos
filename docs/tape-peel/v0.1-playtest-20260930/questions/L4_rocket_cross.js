(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_rocket_a');
  if(!source)throw new Error('Missing L3_rocket_a');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  tapes.push(
    {id:'r7',c:'R',bind:['low'],segs:line([-.38,-1.005,-.32],[-.38,-1.005,.32],'-y')},
    {id:'r8',c:'R',bind:['low'],segs:line([0,-1.005,-.32],[0,-1.005,.32],'-y')},
    {id:'r9',c:'R',bind:['low'],segs:line([.38,-1.005,-.32],[.38,-1.005,.32],'-y')}
  );
  registerQuestion({...source,id:'L4_rocket_cross',modelId:'rocket',sourceQuestionId:source.id,level:'L4',levelName:'高阶',review:'pending',queue:'RYBRR',open:2,yaw:2.2,pitch:.3,tapes});
})();
