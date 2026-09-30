// L3 机器人：复用 B 版真实连接结构。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_robot_b');
  if(!source)throw new Error('Missing L4_robot_b');
  const keep=new Set(["r1","r2","r3","r4","r5","r6","y1","y2","y3","y5","y6","b3"]),colors={'r1':'R','r2':'R','r3':'R','r4':'R','r5':'R','r6':'R','y1':'Y','y2':'Y','y3':'Y','y5':'Y','y6':'Y','b3':'Y'};
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:[...t.bind],over:(t.over||[]).filter(id=>keep.has(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const get=id=>tapes.find(t=>t.id===id);
  get('r3').segs=TapeTools.crossSeam([-.22,.38,.405],[-.22,.9,.405],'+z');
  get('r6').segs=TapeTools.wrap([[.28,.53,-.405],[.28,.38,-.405],[.28,.38,-.68],[.28,.07,-.68]],['-z','+y','-z']);
  get('y3').segs=TapeTools.rootL([.13,1.47,0],[.13,1.205,0],[.45,1.205,0],'+x','+y');
  get('r4').segs=TapeTools.crossSeam([.42,-.36,.405],[.42,-.9,.405],'+z');
  registerQuestion({...source,id:'L3_robot_cross2',modelId:'robot',sourceQuestionId:source.id,level:'L3',levelName:'中阶',object:'纸箱机器人·跨级候选',review:'pending',queue:'RYRY',open:1,yaw:2.6,pitch:.24,tapes});
})();
