// 候选试题：原 L3 城堡模型，不复制也不修改 buildCastle。验证同一模型能否承载 L4。
(() => {
  const source = QUESTION_BANK.find(q => q.id === 'L3_castle_a');
  if (!source) throw new Error('Missing source question L3_castle_a');
  const tapes = source.tapes.map(t => ({
    ...t, bind:[...t.bind], over:[...(t.over || [])],
    segs:t.segs.map(s => ({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))
  }));
  const line = TapeTools.crossSeam;
  // 两条黄带在右塔外侧交叉，第三处顺压；左塔外侧还有一条。
  tapes.push(
    {id:'y4',c:'Y',bind:['towerR'],over:['y5'],segs:line([1.255,.08,-.25],[1.255,.08,.25],'+x')},
    {id:'y5',c:'Y',bind:['towerR'],segs:line([1.255,-.38,0],[1.255,.43,0],'+x')},
    {id:'y6',c:'Y',bind:['towerL'],segs:line([-1.255,-.38,0],[-1.255,.38,0],'-x')}
  );
  registerQuestion({
    ...source, id:'L4_castle_trial', modelId:'castle', sourceQuestionId:source.id,
    level:'L4', levelName:'高阶', object:'纸板小城堡·跨级候选', review:'pending',
    build:source.build, yaw:1.1, pitch:.24, queue:'RYBRY', open:2, tapes
  });
})();
