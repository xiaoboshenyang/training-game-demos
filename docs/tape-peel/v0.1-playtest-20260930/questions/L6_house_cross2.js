(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_house_a');
  if(!source)throw new Error('Missing L2_house_a');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  const roofTape=tapes.find(t=>t.id==='r2'); if(roofTape)for(const s of roofTape.segs){s.a.z+=.25;s.b.z+=.25;}
  tapes.push(
    {id:'b1',c:'B',bind:['wall'],over:['r4'],segs:line([-.7,-.3,-.755],[.15,-.3,-.755],'-z')},
    {id:'b2',c:'B',bind:['wall'],over:['g3'],segs:line([.2,.05,-.755],[.7,.05,-.755],'-z')},
    {id:'b3',c:'B',bind:['wall'],over:['r5'],segs:line([-.805,-.7,-.18],[-.805,.05,-.18],'-x')},
    {id:'b4',c:'B',bind:['wall'],over:['g2'],segs:line([.805,-.7,-.05],[.805,.05,-.05],'+x')},
    {id:'b5',c:'B',bind:['wall'],segs:line([-.65,-1.08,-.35],[-.2,-1.08,-.35],'-y')},
    {id:'b6',c:'B',bind:['wall'],segs:line([.2,-1.08,.42],[.65,-1.08,.42],'-y')},
    {id:'y1',c:'Y',bind:['wall'],over:['b1'],segs:line([-.05,-.68,-.755],[-.05,.1,-.755],'-z')},
    {id:'y2',c:'Y',bind:['wall'],segs:line([-.55,-1.08,.48],[-.15,-1.08,.48],'-y')},
    {id:'y3',c:'Y',bind:['wall'],segs:line([.15,-1.08,-.42],[.55,-1.08,-.42],'-y')},
  );
  const chosen={"r1":"G","r2":"R","r3":"B","r4":"B","r5":"B","r6":"Y","g1":"G","g2":"R","g3":"B","b1":"B","b2":"Y","b3":"B","b4":"Y","b5":"R","b6":"G","y1":"R","y2":"R","y3":"R"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L6_house_cross2',modelId:'house',sourceQuestionId:source.id,level:'L6',levelName:'宗师',review:'pending',queue:'GBBYRR',open:2,yaw:3.2,pitch:0.38,tapes});
})();
