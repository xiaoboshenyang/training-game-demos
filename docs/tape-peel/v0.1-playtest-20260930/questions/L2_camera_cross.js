// 相机跨级候选：取景器与镜头沿用 A 题，背面增加一处寻找目标。
(() => {
  const source = QUESTION_BANK.find(q => q.id === 'L1_camera_a');
  if (!source) throw new Error('Missing source question L1_camera_a');
  const tapes = source.tapes.map(t => ({
    ...t, bind:[...t.bind], over:[],
    segs:t.segs.map(s => ({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))
  }));
  const rear = tapes.find(t => t.id === 'r2');
  rear.bind = ['body'];
  rear.segs = TapeTools.crossSeam([-.42,-.38,-.43],[-.42,.12,-.43],'-z');
  registerQuestion({
    ...source, id:'L2_camera_cross', modelId:'camera', sourceQuestionId:source.id,
    level:'L2', levelName:'初阶', object:'纸板相机·跨级候选', review:'pending',
    build:source.build, yaw:.16, pitch:.28, queue:'RG', open:1, tapes
  });
})();
