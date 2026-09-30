// L5 小熊跨级候选：保留原模型，以跨面寻找及三处可读压带增加选择。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_bear_a');
  if(!source)throw new Error('Missing source question L4_bear_a');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  // 三个交叉点使用跨色顺压，改变错误先撕后的换盒选择。
  const byId=id=>tapes.find(t=>t.id===id);
  [byId('r1').c,byId('b1').c]=[byId('b1').c,byId('r1').c];
  [byId('r2').c,byId('y1').c]=[byId('y1').c,byId('r2').c];
  [byId('r5').c,byId('r1').c]=[byId('r1').c,byId('r5').c];
  [byId('r6').c,byId('y4').c]=[byId('y4').c,byId('r6').c];
  // 把无压的蓝带移到右腿外侧，增加一次明确的侧面寻找；原头部仍由其他带固定。
  byId('b3').bind=['legR'];
  byId('b3').segs=TapeTools.crossSeam([.475,-.835,-.2],[.475,-.835,.2],'+x');
  registerQuestion({...source,id:'L5_bear_cross',modelId:'bear',sourceQuestionId:source.id,
    level:'L5',levelName:'超凡',object:'纸板小熊·跨级候选',review:'pending',
    build:source.build,yaw:2.8,pitch:.3,queue:'RYYBR',open:2,tapes});
})();
