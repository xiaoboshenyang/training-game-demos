// 帆船跨级候选：帆和船舱保留固定带，船身背面增加一处寻找目标。
(() => {
  const source = QUESTION_BANK.find(q => q.id === 'L1_sailboat_a');
  if (!source) throw new Error('Missing source question L1_sailboat_a');
  const tapes = source.tapes.map(t => ({
    ...t, bind:[...t.bind], over:[],
    segs:t.segs.map(s => ({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))
  }));
  const rear = tapes.find(t => t.id === 'r2');
  rear.bind = ['hull'];
  rear.segs = TapeTools.crossSeam([-.4,-.58,-.3],[.4,-.58,-.3],'-z');
  registerQuestion({
    ...source, id:'L2_sailboat_cross', modelId:'sailboat', sourceQuestionId:source.id,
    level:'L2', levelName:'初阶', object:'纸板小帆船·跨级候选', review:'pending',
    build:source.build, yaw:.18, pitch:.24, queue:'RG', open:1, tapes
  });
})();
