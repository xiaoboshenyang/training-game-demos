// 灯塔跨级候选：平台、灯室和顶盖各有固定带，需绕到侧面寻找。
(() => {
  const source = QUESTION_BANK.find(q => q.id === 'L2_lighthouse_a');
  if (!source) throw new Error('Missing source question L2_lighthouse_a');
  const keep = new Set(['r1','r2','r3','r4','r5','g1']);
  const tapes = source.tapes.filter(t => keep.has(t.id)).map(t => ({
    ...t, bind:[...t.bind], over:[],
    segs:t.segs.map(s => ({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))
  }));
  for (const id of ['r2','r4']) tapes.find(t => t.id === id).c = 'G';
  tapes.find(t => t.id === 'r5').segs = TapeTools.wrap(
    [[.55,.98,-.2],[.36,.98,-.2],[.36,1.5,-.2],[.48,1.5,-.2]],
    ['+y','+x','-y']
  );
  tapes.find(t => t.id === 'r4').segs = TapeTools.foldEdge(
    [-.55,.98,.2],[-.36,.98,.2],[-.36,1.39,.2],'+y','-x'
  );
  registerQuestion({
    ...source, id:'L1_lighthouse_cross', modelId:'lighthouse', sourceQuestionId:source.id,
    level:'L1', levelName:'基础', object:'纸板小灯塔·跨级候选', review:'pending',
    build:source.build, yaw:.5, pitch:.22, queue:'RG', open:1, tapes
  });
})();
