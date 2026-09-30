// L5 纸板衣柜跨级候选：沿用原模型与表面胶带，重新安排颜色选择。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_wardrobe_a');
  if(!source)throw new Error('Missing source L4_wardrobe_a');
  let tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],hiddenBy:t.hiddenBy?[...t.hiddenBy]:undefined,segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const get=id=>tapes.find(t=>t.id===id),swap=(a,b)=>{const x=get(a),y=get(b);[x.c,y.c]=[y.c,x.c];};
  const colors={r1:'R',r2:'B',r3:'Y',r4:'Y',r5:'R',r6:'R',y1:'R',y2:'R',y3:'Y',y4:'B',y5:'B',y6:'Y',b1:'Y',b2:'R',b3:'Y'};
  for(const t of tapes)t.c=colors[t.id];
  registerQuestion({...source,id:'L5_wardrobe_cross2',modelId:'wardrobe',sourceQuestionId:source.id,level:'L5',levelName:'超凡',object:'纸板衣柜·跨级候选',review:'pending',queue:'RYYBR',open:2,yaw:2.7,pitch:.28,tapes});
})();
