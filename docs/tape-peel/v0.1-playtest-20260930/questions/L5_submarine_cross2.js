(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_submarine_cross');
  if(!source)throw new Error('Missing L4_submarine_cross');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  for(const id of ['r7','r9']){const s=tapes.find(t=>t.id===id).segs[0];s.b.x=-.32;s.a.z+=(id==='r9'?.08:-.08);s.b.z+=(id==='r9'?.08:-.08);} {const s=tapes.find(t=>t.id==='r8').segs[0];s.a.x=.32;s.a.z-=.08;s.b.z-=.08;}
  tapes.push(
    {id:'g1',c:'G',bind:['hull'],segs:line([.42,.055,-.33],[.42,.055,.33],'+y')},
    {id:'g2',c:'G',bind:['bow'],segs:line([-1.155,-.65,0],[-1.155,-.05,0],'-x')},
    {id:'g3',c:'G',bind:['hull'],segs:line([0,-.755,-.4],[0,-.755,.4],'-y')},
  );
  const chosen={"r1":"R","r2":"Y","r3":"R","r4":"G","r5":"R","r6":"G","y1":"R","y2":"G","y3":"Y","b1":"B","b2":"R","b3":"B","r7":"R","r8":"B","r9":"R","g1":"Y","g2":"R","g3":"R"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L5_submarine_cross2',modelId:'submarine',sourceQuestionId:source.id,level:'L5',levelName:'超凡',review:'pending',queue:'GRBYRR',open:2,yaw:2.5,pitch:0.3,tapes});
})();
