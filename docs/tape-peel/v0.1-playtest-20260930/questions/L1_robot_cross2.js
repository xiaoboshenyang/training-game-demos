// L1 机器人：复用 B 版真实连接结构。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_robot_b');
  if(!source)throw new Error('Missing L4_robot_b');
  const keep=new Set(["r3","r4","r5","r6","y3"]),colors={'r3':'R','r4':'R','r5':'Y','r6':'Y','y3':'Y'};
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:[...t.bind],over:(t.over||[]).filter(id=>keep.has(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const get=id=>tapes.find(t=>t.id===id);
  get('r3').segs=TapeTools.crossSeam([-.22,.38,.405],[-.22,.9,.405],'+z');
  get('r6').segs=TapeTools.wrap([[.28,.53,-.405],[.28,.38,-.405],[.28,.38,-.68],[.28,.07,-.68]],['-z','+y','-z']);
  get('y3').segs=TapeTools.rootL([.13,1.47,0],[.13,1.205,0],[.45,1.205,0],'+x','+y');
  tapes.push({id:'a1',c:'R',bind:['armL','armR','torso'],over:[],segs:TapeTools.crossSeam([-.96,.12,.405],[.96,.12,.405],'+z')});
  registerQuestion({...source,id:'L1_robot_cross2',modelId:'robot',sourceQuestionId:source.id,level:'L1',levelName:'基础',object:'纸箱机器人·跨级候选',review:'pending',queue:'RY',open:1,yaw:2.6,pitch:.24,tapes});
})();
