// 机器人 L6：背包三层顺压，头背与躯干底面增加回查目标。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_robot_b');
  if(!source)throw new Error('Missing source L4_robot_b');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const get=id=>tapes.find(t=>t.id===id),line=TapeTools.crossSeam;
  get('r3').segs=line([-.22,.38,.405],[-.22,.9,.405],'+z');
  get('r4').segs=line([.42,-.36,.405],[.42,-.9,.405],'+z');
  get('r6').segs=TapeTools.wrap([[.28,.53,-.405],[.28,.38,-.405],[.28,.38,-.68],[.28,.07,-.68]],['-z','+y','-z']);
  get('b1').segs=line([-.35,-.12,-.685],[.03,-.12,-.685],'-z');
  get('b2').segs=line([-.13,-.3,-.685],[-.13,.28,-.685],'-z');
  get('y3').segs=TapeTools.rootL([.13,1.47,0],[.13,1.205,0],[.45,1.205,0],'+x','+y');
  get('y4').segs=TapeTools.rootL([-.13,1.47,0],[-.13,1.205,0],[-.45,1.205,0],'-x','+y');
  tapes.push(
    {id:'g1',c:'G',bind:['pack'],over:['b1','b2'],segs:line([-.295,-.32,-.685],[-.02,.23,-.685],'-z')},
    {id:'g2',c:'G',bind:['head'],segs:line([0,.68,-.405],[0,1.15,-.405],'-z')},
    {id:'g3',c:'G',bind:['torso'],segs:line([0,-.605,-.25],[0,-.605,.25],'-y')}
  );
  const colors={r1:'Y',r2:'R',r3:'Y',r4:'R',r5:'B',r6:'R',y1:'R',y2:'G',y3:'Y',y4:'G',y5:'B',y6:'B',b1:'R',b2:'G',b3:'Y',g1:'Y',g2:'Y',g3:'R'};
  for(const t of tapes)t.c=colors[t.id];
  registerQuestion({...source,id:'L6_robot_cross2',modelId:'robot',sourceQuestionId:source.id,
    level:'L6',levelName:'宗师',object:'纸箱机器人·跨级候选',review:'pending',
    yaw:2.8,pitch:.32,queue:'RRYGYB',open:2,tapes});
})();
