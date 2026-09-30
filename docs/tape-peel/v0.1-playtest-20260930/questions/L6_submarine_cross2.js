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
    {id:'y4',c:'Y',bind:['hull'],over:['g3'],segs:line([-.19,-.755,0],[.19,-.755,0],'-y')},
    {id:'y5',c:'Y',bind:['bow','hull'],segs:line([-1.1,.055,.3],[-.7,.055,.3],'+y')},
    {id:'y6',c:'Y',bind:['stern','hull'],segs:line([.72,-.62,-.455],[1.08,-.62,-.455],'-z')},
  );
  const chosen={"r1":"Y","r2":"R","r3":"R","r4":"Y","r5":"R","r6":"R","y1":"B","y2":"G","y3":"B","b1":"Y","b2":"Y","b3":"G","r7":"R","r8":"R","r9":"Y","g1":"R","g2":"R","g3":"B","y4":"G","y5":"Y","y6":"R"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L6_submarine_cross2',modelId:'submarine',sourceQuestionId:source.id,level:'L6',levelName:'宗师',review:'pending',queue:'BRRYRYG',open:2,yaw:3.35,pitch:0.4,tapes});
})();
