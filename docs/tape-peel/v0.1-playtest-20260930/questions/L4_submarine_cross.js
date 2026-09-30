(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_submarine_a');
  if(!source)throw new Error('Missing L3_submarine_a');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  tapes.push(
    {id:'r7',c:'R',bind:['hull'],segs:line([-.78,-.755,-.22],[-.23,-.755,-.22],'-y')},
    {id:'r8',c:'R',bind:['hull'],segs:line([.22,-.755,-.22],[.76,-.755,-.22],'-y')},
    {id:'r9',c:'R',bind:['hull'],segs:line([-.78,-.755,.22],[-.23,-.755,.22],'-y')}
  );
  registerQuestion({...source,id:'L4_submarine_cross',modelId:'submarine',sourceQuestionId:source.id,level:'L4',levelName:'高阶',review:'pending',queue:'RYBRR',open:2,yaw:.55,pitch:.24,tapes});
})();
