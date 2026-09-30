// 候选试题：原 L4 小熊模型，不复制也不修改 buildBear。验证同一模型能否承载 L3。
(() => {
  const source = QUESTION_BANK.find(q => q.id === 'L4_bear_a');
  if (!source) throw new Error('Missing source question L4_bear_a');
  const keep = new Set(['r3','r4','r5','r6','y1','y3','y4','y5','y6','b1','b2','b3']);
  const tapes = source.tapes.filter(t => keep.has(t.id)).map(t => ({
    ...t, bind:[...t.bind], over:[],
    segs:t.segs.map(s => ({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))
  }));
  const get = id => tapes.find(t => t.id === id);
  const line = TapeTools.crossSeam;
  // 两腿跨缝红带盖住躯干上的红带：同色顺压不会因第一盒红色的随机选择卡住。
  get('r3').c='Y';
  get('y1').bind=['torso'];
  get('y1').c='R';
  get('y1').segs=line([-.45,-.45,.33],[.45,-.45,.33],'+z');
  for(const id of ['y5','y6']){
    get(id).c='R';
    get(id).over=['y1'];
    get(id).segs=line(id==='y5'?[-.27,-.96,.33]:[.27,-.96,.33],id==='y5'?[-.27,-.25,.33]:[.27,-.25,.33],'+z');
  }
  get('b1').segs=line([-.4,-.1,-.33],[.4,-.1,-.33],'-z');
  get('b2').segs=line([-.4,-.43,-.33],[.4,-.43,-.33],'-z');
  registerQuestion({
    ...source, id:'L3_bear_trial', modelId:'bear', sourceQuestionId:source.id,
    level:'L3', levelName:'中阶', object:'纸板小熊·跨级候选', review:'pending',
    build:source.build, yaw:.42, pitch:.2, queue:'RYBR', open:1, tapes
  });
})();
