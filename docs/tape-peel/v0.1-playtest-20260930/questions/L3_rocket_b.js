// 火箭 B：背面箭头带、正面折边压带与右侧尾翼。
(() => {
  const original=QUESTION_BANK.find(q=>q.id==='L3_rocket_a');
  const line=TapeTools.crossSeam,wrap=TapeTools.wrap;
  registerQuestion({
    id:'L3_rocket_b',level:'L3',levelName:'中阶',object:'火箭',review:'pending',
    build:original.build,partIds:original.partIds,baseIds:original.baseIds,supports:original.supports,
    yaw:-.5,pitch:.18,queue:'RYBR',open:1,score:55,
    tapes:[
      {id:'y1',c:'Y',bind:['nose','up'],segs:noseDown('-z',.82,.65)},
      {id:'r1',c:'R',bind:['nose','up'],segs:noseDown('+x',.82,.8)},
      {id:'r2',c:'R',bind:['nose','up'],segs:noseDown('-x',.82,.72)},
      {id:'r3',c:'R',bind:['up','low'],segs:line([-.6,.55,.2],[-.6,-.58,.2],'-x')},
      {id:'b1',c:'B',bind:['up','low'],segs:line([.35,.55,.6],[.35,-.58,.6],'+z')},
      {id:'y2',c:'Y',bind:['up'],over:['b1'],segs:wrap([[.08,.14,.6],[.6,.14,.6],[.6,.14,.16]],['+z','+x'])},
      {id:'y3',c:'B',bind:['finR','low'],segs:finTape('+x',-.78)},
      {id:'b2',c:'Y',bind:['finF','low'],segs:finTape('+z',-.82)},
      {id:'b3',c:'B',bind:['finL','low'],segs:finTape('-x',-.86)},
      {id:'r4',c:'R',bind:['finB','low'],segs:finTape('-z',-.8)},
      {id:'r6',c:'R',bind:['low'],segs:line([.08,-.62,-.6],[.52,-.62,-.6],'-z')},
      {id:'r5',c:'R',bind:['low'],over:['r6'],segs:line([.3,-.38,-.6],[.3,-.9,-.6],'-z')},
    ],
  });
})();
