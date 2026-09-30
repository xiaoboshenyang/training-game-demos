// 礼盒 C：盒身背面三条跨缝带，蝴蝶结与其中一条背带交换颜色。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_giftbox_a');
  const build = () => {
    const parts = original.build();
    parts.bow.mesh.position.y -= .06;
    return parts;
  };
  const line = TapeTools.crossSeam;
  registerQuestion({
    id:'L1_giftbox_c',level:'L1',levelName:'基础',object:'礼盒',review:'pending',
    build,baseIds:['body'],partIds:['body','lid','bow'],supports:{bow:'lid'},
    yaw:2.85,pitch:.35,queue:'RG',open:1,score:55,
    tapes:[
      {id:'g1',c:'R',bind:['bow','lid'],segs:TapeTools.rootL([0,.55,.09],[0,.38,.09],[0,.38,.43],'+z','+y')},
      {id:'g2',c:'G',bind:['lid'],segs:line([-.53,.38,-.49],[-.53,.38,.37],'+y')},
      {id:'g3',c:'G',bind:['lid'],segs:line([.53,.38,-.49],[.53,.38,.37],'+y')},
      {id:'r1',c:'G',bind:['lid','body'],segs:line([-.46,.33,-.705],[-.46,-.45,-.705],'-z')},
      {id:'r2',c:'R',bind:['lid','body'],segs:line([0,.33,-.705],[0,-.45,-.705],'-z')},
      {id:'r3',c:'R',bind:['lid','body'],segs:line([.46,.33,-.705],[.46,-.45,-.705],'-z')},
    ],
  });
})();
