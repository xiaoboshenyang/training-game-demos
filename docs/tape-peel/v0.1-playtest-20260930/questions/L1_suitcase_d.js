// 纸板手提箱 D：三条平行斜带跨正面接缝，红带集中在提手和箱盖顶面。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_suitcase_a');
  const line = TapeTools.crossSeam;
  const root = TapeTools.rootL;
  registerQuestion({
    id:'L1_suitcase_d', level:'L1', levelName:'基础', object:'纸板手提箱', review:'pending',
    build:original.build, baseIds:['body'], partIds:['body','lid','handle'], supports:{handle:'lid'},
    yaw:.23, pitch:.36, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'R',bind:['handle','lid'],segs:root([-.53,.99,-.16],[-.53,.66,-.16],[-.88,.66,-.16],'-x','+y')},
      {id:'r2',c:'G',bind:['lid','body'],segs:line([-.75,.59,.35],[-.60,-.40,.35],'+z')},
      {id:'r3',c:'G',bind:['lid','body'],segs:line([-.25,.59,.35],[-.10,-.40,.35],'+z')},
      {id:'g1',c:'G',bind:['lid','body'],segs:line([ .25,.59,.35],[ .40,-.40,.35],'+z')},
      {id:'g2',c:'R',bind:['handle','lid'],segs:root([ .53,.99,-.16],[ .53,.66,-.16],[ .88,.66,-.16],'+x','+y')},
      {id:'g3',c:'R',bind:['lid'],segs:line([.73,.66,-.24],[.73,.66,.24],'+y')},
    ],
  });
})();
