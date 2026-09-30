// 邮筒跨级候选：顶盖与翻板仍独立固定，筒身背面增加寻找目标。
(() => {
  const source = QUESTION_BANK.find(q => q.id === 'L1_mailbox_a');
  if (!source) throw new Error('Missing source question L1_mailbox_a');
  const tapes = source.tapes.map(t => ({
    ...t, bind:[...t.bind], over:[],
    segs:t.segs.map(s => ({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))
  }));
  const rear = tapes.find(t => t.id === 'r2');
  rear.bind = ['body'];
  rear.segs = TapeTools.crossSeam([0,-.42,-.555],[0,.16,-.555],'-z');
  registerQuestion({
    ...source, id:'L2_mailbox_cross', modelId:'mailbox', sourceQuestionId:source.id,
    level:'L2', levelName:'初阶', object:'纸板邮筒·跨级候选', review:'pending',
    build:source.build, yaw:.22, pitch:.28, queue:'RG', open:1, tapes
  });
})();
