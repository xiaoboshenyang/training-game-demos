(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_train_a');
  if(!source)throw new Error('Missing L3_train_a');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  tapes.push(
    {id:'r7',c:'R',bind:['carriage'],segs:line([-.83,-.48,.2],[-.4,-.48,.2],'-y')},
    {id:'r8',c:'R',bind:['body'],segs:line([.25,-.48,.2],[.72,-.48,.2],'-y')},
    {id:'r9',c:'R',bind:['carriage'],segs:line([-.83,-.48,-.2],[-.4,-.48,-.2],'-y')}
  );
  registerQuestion({...source,id:'L4_train_cross',modelId:'train',sourceQuestionId:source.id,level:'L4',levelName:'高阶',review:'pending',queue:'RYBRR',open:2,yaw:2.55,pitch:.28,tapes});
})();
