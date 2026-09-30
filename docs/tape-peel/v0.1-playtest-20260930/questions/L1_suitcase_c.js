// 纸板手提箱 C：右侧箱盖顶面增一条横向带，左右两组颜色分明。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_suitcase_a');
  const line = TapeTools.crossSeam;
  const root = TapeTools.rootL;
  registerQuestion({
    id:'L1_suitcase_c', level:'L1', levelName:'基础', object:'纸板手提箱', review:'pending',
    build:original.build, baseIds:['body'], partIds:['body','lid','handle'], supports:{handle:'lid'},
    yaw:.23, pitch:.36, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'G',bind:['handle','lid'],segs:root([-.53,.99,-.16],[-.53,.66,-.16],[-.88,.66,-.16],'-x','+y')},
      {id:'r2',c:'R',bind:['handle','lid'],segs:root([ .53,.99,-.16],[ .53,.66,-.16],[ .88,.66,-.16],'+x','+y')},
      {id:'r3',c:'G',bind:['lid','body'],segs:line([-.72,.59,.35],[-.72,-.40,.35],'+z')},
      {id:'g1',c:'G',bind:['lid','body'],segs:line([-.24,.59,.35],[-.24,-.40,.35],'+z')},
      {id:'g2',c:'R',bind:['lid'],segs:line([.73,.66,-.24],[.73,.66,.24],'+y')},
      {id:'g3',c:'R',bind:['lid','body'],segs:line([.72,.59,.35],[.72,-.40,.35],'+z')},
    ],
  });
})();
