// 飞机跨级候选：机翼与尾翼仍独立固定，底面两带引导玩家转动。
(() => {
  const source = QUESTION_BANK.find(q => q.id === 'L2_airplane_a');
  if (!source) throw new Error('Missing source question L2_airplane_a');
  const keep = new Set(['r1','r2','r3','g1','g2','g3']);
  const tapes = source.tapes.filter(t => keep.has(t.id)).map(t => ({
    ...t, bind:[...t.bind], over:[],
    segs:t.segs.map(s => ({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))
  }));
  registerQuestion({
    ...source, id:'L1_airplane_cross', modelId:'airplane', sourceQuestionId:source.id,
    level:'L1', levelName:'基础', object:'纸板玩具飞机·跨级候选', review:'pending',
    build:source.build, yaw:.55, pitch:.3, queue:'RG', open:1, tapes
  });
})();
