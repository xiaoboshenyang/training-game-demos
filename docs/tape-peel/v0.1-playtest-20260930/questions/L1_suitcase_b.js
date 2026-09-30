// 纸板手提箱 B：红带沿提手与左侧，绿带集中在箱盖和箱身右侧接缝。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_suitcase_a');
  const line = TapeTools.crossSeam;
  const root = TapeTools.rootL;
  registerQuestion({
    id:'L1_suitcase_b', level:'L1', levelName:'基础', object:'纸板手提箱', review:'pending',
    build:original.build, baseIds:['body'], partIds:['body','lid','handle'], supports:{handle:'lid'},
    yaw:.23, pitch:.31, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'R',bind:['handle','lid'],segs:root([-.53,.99,-.16],[-.53,.66,-.16],[-.88,.66,-.16],'-x','+y')},
      {id:'r2',c:'G',bind:['lid','body'],segs:line([-.24,.59,.35],[-.24,-.40,.35],'+z')},
      {id:'r3',c:'G',bind:['lid','body'],segs:line([ .24,.59,.35],[ .24,-.40,.35],'+z')},
      {id:'g1',c:'R',bind:['handle','lid'],segs:root([ .53,.99,-.16],[ .53,.66,-.16],[ .88,.66,-.16],'+x','+y')},
      {id:'g2',c:'R',bind:['lid','body'],segs:line([-.72,.59,.35],[-.72,-.40,.35],'+z')},
      {id:'g3',c:'G',bind:['lid','body'],segs:line([ .72,.59,.35],[ .72,-.40,.35],'+z')},
    ],
  });
})();
