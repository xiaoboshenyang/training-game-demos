// 火箭 C：正面箭头带、左面折边压带，底部压带移至右面。
(() => {
  const original=QUESTION_BANK.find(q=>q.id==='L3_rocket_a');
  const line=TapeTools.crossSeam,wrap=TapeTools.wrap;
  registerQuestion({
    id:'L3_rocket_c',level:'L3',levelName:'中阶',object:'火箭',review:'pending',
    build:original.build,partIds:original.partIds,baseIds:original.baseIds,supports:original.supports,
    yaw:2.5,pitch:.2,queue:'RYBR',open:1,score:55,
    tapes:[
      {id:'y1',c:'Y',bind:['nose','up'],segs:noseDown('+x',.85,.68)},
      {id:'r1',c:'R',bind:['nose','up'],segs:noseDown('+z',.85,.88)},
      {id:'r2',c:'R',bind:['nose','up'],segs:noseDown('-z',.85,.78)},
      {id:'r3',c:'R',bind:['up','low'],segs:line([-.25,.56,-.6],[-.25,-.58,-.6],'-z')},
      {id:'b1',c:'B',bind:['up','low'],segs:line([-.6,.55,.22],[-.6,-.58,.22],'-x')},
      {id:'y2',c:'Y',bind:['up'],over:['b1'],segs:wrap([[-.6,.18,-.08],[-.6,.18,.6],[-.2,.18,.6]],['-x','+z'])},
      {id:'y3',c:'B',bind:['finF','low'],segs:finTape('+z',-.82)},
      {id:'b2',c:'B',bind:['finL','low'],segs:finTape('-x',-.8)},
      {id:'b3',c:'Y',bind:['finB','low'],segs:finTape('-z',-.86)},
      {id:'r4',c:'R',bind:['finR','low'],segs:finTape('+x',-.78)},
      {id:'r6',c:'R',bind:['low'],segs:line([.6,-.61,-.52],[.6,-.61,-.08],'+x')},
      {id:'r5',c:'R',bind:['low'],over:['r6'],segs:line([.6,-.37,-.3],[.6,-.89,-.3],'+x')},
    ],
  });
})();
