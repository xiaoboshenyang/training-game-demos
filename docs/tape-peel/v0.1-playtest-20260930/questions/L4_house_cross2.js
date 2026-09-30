(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_house_a');
  if(!source)throw new Error('Missing L2_house_a');
  const keep=['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'g1', 'g2', 'g3'];
  const colors={};
  const tapes=source.tapes.filter(t=>keep.includes(t.id)).map(t=>({...t,c:colors[t.id]||t.c,bind:[...t.bind],over:[...(t.over||[])].filter(id=>keep.includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  const roofTape=tapes.find(t=>t.id==='r2'); if(roofTape)for(const s of roofTape.segs){s.a.z+=.25;s.b.z+=.25;}
  tapes.push(
    {id:'b1',c:'B',bind:['wall'],over:['r4'],segs:line([-.7,-.3,-.755],[.15,-.3,-.755],'-z')},
    {id:'b2',c:'B',bind:['wall'],over:['g3'],segs:line([.2,.05,-.755],[.7,.05,-.755],'-z')},
    {id:'b5',c:'B',bind:['wall'],segs:line([-.65,-1.08,-.35],[-.2,-1.08,-.35],'-y')},
  );
  registerQuestion({...source,id:'L4_house_cross2',modelId:'house',sourceQuestionId:source.id,level:'L4',levelName:'高阶',review:'pending',queue:'BRRG',open:2,yaw:2.6,pitch:0.25,tapes});
})();
