// L1 纸板衣柜：复用原模型，按本级选取真实连接带。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_wardrobe_a');
  if(!source)throw new Error('Missing L4_wardrobe_a');
  const keep=new Set(["r3","r4","r5","r6","y5","y3"]),colors={'r3':'R','r4':'R','r5':'R','r6':'Y','y5':'Y','y3':'Y'};
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:[...t.bind],over:(t.over||[]).filter(id=>keep.has(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  
  registerQuestion({...source,id:'L1_wardrobe_cross2',modelId:'wardrobe',sourceQuestionId:source.id,level:'L1',levelName:'基础',object:'纸板衣柜·跨级候选',review:'pending',queue:'RY',open:1,yaw:2.6,pitch:.24,tapes});
})();
