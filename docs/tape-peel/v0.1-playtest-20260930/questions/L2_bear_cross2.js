// L2 纸板小熊：复用原模型，按本级选取真实连接带。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_bear_a');
  if(!source)throw new Error('Missing L4_bear_a');
  const keep=new Set(["r3","r4","y2","y3","y4","y5","y6","b3"]),colors={'r3':'R','r4':'R','y2':'R','y3':'R','y4':'R','y5':'Y','y6':'Y','b3':'Y'};
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:[...t.bind],over:(t.over||[]).filter(id=>keep.has(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  tapes.push({id:'a1',c:'R',bind:['armL','armR','torso'],over:[],segs:TapeTools.crossSeam([-.74,.22,.33],[.74,.22,.33],'+z')});
  registerQuestion({...source,id:'L2_bear_cross2',modelId:'bear',sourceQuestionId:source.id,level:'L2',levelName:'初阶',object:'纸板小熊·跨级候选',review:'pending',queue:'RYR',open:1,yaw:2.6,pitch:.24,tapes});
})();
