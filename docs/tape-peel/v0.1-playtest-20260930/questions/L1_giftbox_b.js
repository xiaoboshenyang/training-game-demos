// 礼盒 B：蝴蝶结正面折边，盒盖两侧纵带，正面跨缝带有两种颜色。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_giftbox_a');
  const build = () => {
    const parts = original.build();
    parts.bow.mesh.position.y -= .06; // 让结心接触盖面，胶带可贴着两块连续跨过。
    return parts;
  };
  const line = TapeTools.crossSeam;
  registerQuestion({
    id:'L1_giftbox_b',level:'L1',levelName:'基础',object:'礼盒',review:'pending',
    build,baseIds:['body'],partIds:['body','lid','bow'],supports:{bow:'lid'},
    yaw:.25,pitch:.35,queue:'RG',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['bow','lid'],segs:TapeTools.rootL([0,.55,.09],[0,.38,.09],[0,.38,.45],'+z','+y')},
      {id:'r2',c:'G',bind:['lid'],segs:line([-.65,.38,-.43],[-.65,.38,.39],'+y')},
      {id:'r3',c:'R',bind:['lid'],segs:line([.65,.38,-.43],[.65,.38,.39],'+y')},
      {id:'g1',c:'R',bind:['lid','body'],segs:line([-.49,.33,.705],[-.49,-.45,.705],'+z')},
      {id:'g2',c:'G',bind:['lid','body'],segs:line([0,.33,.705],[0,-.45,.705],'+z')},
      {id:'g3',c:'G',bind:['lid','body'],segs:line([.49,.33,.705],[.49,-.45,.705],'+z')},
    ],
  });
})();
