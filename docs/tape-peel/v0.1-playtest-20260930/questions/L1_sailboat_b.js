// 纸板小帆船 B：船舱顶面与船身下缘加入横带，帆带缩短成两条。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_sailboat_a');
  const line = TapeTools.crossSeam;
  registerQuestion({
    id:'L1_sailboat_b', level:'L1', levelName:'基础', object:'纸板小帆船', review:'pending',
    build:original.build, baseIds:['hull'], partIds:['hull','cabin','sail'], supports:{},
    yaw:.18, pitch:.28, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'R',bind:['sail','hull'],segs:line([.18,.70,.3],[.18,-.5,.3],'+z')},
      {id:'r2',c:'G',bind:['sail','hull'],segs:line([.48,.28,.3],[.48,-.5,.3],'+z')},
      {id:'r3',c:'G',bind:['hull'],segs:line([-.45,-.72,.3],[.45,-.72,.3],'+z')},
      {id:'g1',c:'R',bind:['cabin'],segs:line([-.88,.2,0],[-.33,.2,0],'+y')},
      {id:'g2',c:'R',bind:['cabin','hull'],segs:line([-.65,.13,.3],[-.65,-.55,.3],'+z')},
      {id:'g3',c:'G',bind:['cabin','hull'],segs:line([-.32,.13,.3],[-.32,-.4,.3],'+z')},
    ],
  });
})();
