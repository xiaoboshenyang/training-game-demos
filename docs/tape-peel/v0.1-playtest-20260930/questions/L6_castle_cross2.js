(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_castle_a');
  if(!source)throw new Error('Missing L3_castle_a');
  const tapes=source.tapes.filter(t=>![].includes(t.id)).map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])].filter(id=>![].includes(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;

  tapes.push(
    {id:'g1',c:'G',bind:['wall'],segs:line([-.55,-.705,-.16],[.55,-.705,-.16],'-y')},
    {id:'g2',c:'G',bind:['wall'],segs:line([-.55,-.705,.16],[.55,-.705,.16],'-y')},
    {id:'g3',c:'G',bind:['towerL'],segs:line([-1.025,-.755,-.25],[-1.025,-.755,.25],'-y')},
    {id:'r7',c:'R',bind:['wall'],over:['g1','g2'],segs:line([0,-.705,-.28],[0,-.705,.28],'-y')},
    {id:'r8',c:'R',bind:['towerR'],segs:line([1.255,-.52,-.18],[1.255,.2,-.18],'+x')},
    {id:'r9',c:'R',bind:['towerL'],segs:line([-1.255,-.52,.18],[-1.255,.2,.18],'-x')},
  );
  const chosen={"r1":"R","r2":"R","r3":"B","r4":"G","r5":"G","r6":"R","y1":"Y","y2":"R","y3":"Y","b1":"R","b2":"R","b3":"R","g1":"B","g2":"Y","g3":"R","r7":"R","r8":"B","r9":"G"};
  for(const t of tapes)t.c=chosen[t.id];
  registerQuestion({...source,id:'L6_castle_cross2',modelId:'castle',sourceQuestionId:source.id,level:'L6',levelName:'宗师',review:'pending',queue:'YRBRGR',open:2,yaw:3.25,pitch:0.38,tapes});
})();
