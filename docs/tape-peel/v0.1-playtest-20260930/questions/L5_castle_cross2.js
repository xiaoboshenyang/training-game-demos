(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_castle_a');
  if(!source)throw new Error('Missing L3_castle_a');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(
    {id:'g1',c:'G',bind:['wall'],segs:line([-.55,-.705,-.16],[.55,-.705,-.16],'-y')},
    {id:'g2',c:'G',bind:['wall'],segs:line([-.55,-.705,.16],[.55,-.705,.16],'-y')},
    {id:'g3',c:'G',bind:['towerL'],segs:line([-1.025,-.755,-.25],[-1.025,-.755,.25],'-y')},
  );
  const chosen={"r1":"Y","r2":"R","r3":"G","r4":"R","r5":"G","r6":"B","y1":"B","y2":"R","y3":"R","b1":"G","b2":"R","b3":"Y","g1":"Y","g2":"R","g3":"B"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L5_castle_cross2',modelId:'castle',sourceQuestionId:source.id,level:'L5',levelName:'超凡',review:'pending',queue:'BRYRG',open:2,yaw:2.6,pitch:0.25,tapes});
})();
