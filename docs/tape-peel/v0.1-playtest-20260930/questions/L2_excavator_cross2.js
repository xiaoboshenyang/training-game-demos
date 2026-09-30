// L2 纸板挖掘机：复用原模型，按本级选取真实连接带。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_excavator_a');
  if(!source)throw new Error('Missing L4_excavator_a');
  const keep=new Set(["r3","r4","r5","r6","y4","y5","y6","b2","b3"]),colors={'r3':'R','r4':'R','r5':'R','r6':'R','y4':'R','y5':'R','y6':'Y','b2':'Y','b3':'Y'};
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:[...t.bind],over:(t.over||[]).filter(id=>keep.has(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  
  registerQuestion({...source,id:'L2_excavator_cross2',modelId:'excavator',sourceQuestionId:source.id,level:'L2',levelName:'初阶',object:'纸板挖掘机·跨级候选',review:'pending',queue:'RYR',open:1,yaw:2.6,pitch:.24,tapes});
})();
