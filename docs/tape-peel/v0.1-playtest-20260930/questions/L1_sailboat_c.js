// 纸板小帆船 C：横带落在宽帆中段和左船身，红带移到舱顶与接缝。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_sailboat_a');
  const line = TapeTools.crossSeam;
  registerQuestion({
    id:'L1_sailboat_c', level:'L1', levelName:'基础', object:'纸板小帆船', review:'pending',
    build:original.build, baseIds:['hull'], partIds:['hull','cabin','sail'], supports:{},
    yaw:.18, pitch:.28, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'G',bind:['sail'],segs:line([.12,.55,.3],[.42,.55,.3],'+z')},
      {id:'r2',c:'R',bind:['sail','hull'],segs:line([.42,.30,.3],[.42,-.45,.3],'+z')},
      {id:'r3',c:'G',bind:['sail','hull'],segs:line([.72,.06,.3],[.72,-.45,.3],'+z')},
      {id:'g1',c:'G',bind:['hull'],segs:line([-.70,-.69,.3],[-.25,-.69,.3],'+z')},
      {id:'g2',c:'R',bind:['cabin'],segs:line([-.90,.2,0],[-.40,.2,0],'+y')},
      {id:'g3',c:'R',bind:['cabin','hull'],segs:line([-.40,.12,.3],[-.40,-.45,.3],'+z')},
    ],
  });
})();
