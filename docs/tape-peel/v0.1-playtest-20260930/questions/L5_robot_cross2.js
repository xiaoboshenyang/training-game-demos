// L5 纸箱机器人跨级候选：沿用原模型与表面胶带，重新安排颜色选择。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_robot_b');
  if(!source)throw new Error('Missing source L4_robot_b');
  let tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],hiddenBy:t.hiddenBy?[...t.hiddenBy]:undefined,segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const get=id=>tapes.find(t=>t.id===id),swap=(a,b)=>{const x=get(a),y=get(b);[x.c,y.c]=[y.c,x.c];};
  swap('r1','b1');swap('r2','y1');swap('r5','r1');swap('r6','y4');
  get('r3').segs=TapeTools.crossSeam([-.22,.38,.405],[-.22,.9,.405],'+z');
  get('r4').segs=TapeTools.crossSeam([.42,-.36,.405],[.42,-.9,.405],'+z');
  get('r6').segs=TapeTools.wrap([[.28,.53,-.405],[.28,.38,-.405],[.28,.38,-.68],[.28,.07,-.68]],['-z','+y','-z']);
  get('b1').segs=TapeTools.crossSeam([-.33,-.12,-.685],[.03,-.12,-.685],'-z');
  get('b2').segs=TapeTools.crossSeam([-.13,-.3,-.685],[-.13,.28,-.685],'-z');
  get('y3').segs=TapeTools.rootL([.13,1.47,0],[.13,1.205,0],[.45,1.205,0],'+x','+y');
  get('y4').segs=TapeTools.rootL([-.13,1.47,0],[-.13,1.205,0],[-.45,1.205,0],'-x','+y');
  registerQuestion({...source,id:'L5_robot_cross2',modelId:'robot',sourceQuestionId:source.id,level:'L5',levelName:'超凡',object:'纸箱机器人·跨级候选',review:'pending',queue:'RYYBR',open:2,yaw:2.7,pitch:.28,tapes});
})();
