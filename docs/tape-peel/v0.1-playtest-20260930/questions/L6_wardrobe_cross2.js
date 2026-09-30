// 衣柜 L6：背板三层顺压，两侧与顶檐增加回查目标。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_wardrobe_a');
  if(!source)throw new Error('Missing source L4_wardrobe_a');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const line=TapeTools.crossSeam;
  tapes.push(
    {id:'g1',c:'G',bind:['body'],over:['y2','y3'],segs:line([-.45,-.15,-.33],[.45,.45,-.33],'-z')},
    {id:'g2',c:'G',bind:['body'],segs:line([.805,-.55,-.2],[.805,.55,-.2],'+x')},
    {id:'g3',c:'G',bind:['body'],segs:line([-.805,-.55,-.2],[-.805,.55,-.2],'-x')}
  );
  const colors={r1:'Y',r2:'R',r3:'Y',r4:'G',r5:'Y',r6:'R',y1:'Y',y2:'B',y3:'G',y4:'Y',y5:'R',y6:'G',b1:'R',b2:'B',b3:'Y',g1:'R',g2:'B',g3:'R'};
  for(const t of tapes)t.c=colors[t.id];
  registerQuestion({...source,id:'L6_wardrobe_cross2',modelId:'wardrobe',sourceQuestionId:source.id,
    level:'L6',levelName:'宗师',object:'纸板衣柜·跨级候选',review:'pending',
    yaw:2.9,pitch:.32,queue:'YYGRBR',open:2,tapes});
})();
