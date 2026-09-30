// L6 相机跨级候选：相机形状不变，背面设置三层交叉选择链。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L1_camera_a');
  if(!source)throw new Error('Missing source question L1_camera_a');
  const old=source.tapes;
  const copy=t=>({...t,bind:[...t.bind],over:[],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))});
  const tapes=[copy(old[0]),copy(old[1]),copy(old[3]),copy(old[4])];
  for(const tape of tapes.filter(t=>t.c==='G'))tape.c='B';
  const line=TapeTools.crossSeam;
  tapes.push(
    {id:'r3',c:'R',bind:['body'],segs:line([-.78,-.16,-.425],[.78,-.16,-.425],'-z')},
    {id:'b3',c:'B',bind:['body'],over:['r3'],segs:line([-.32,-.54,-.425],[.32,.22,-.425],'-z')},
    {id:'y1',c:'Y',bind:['body'],over:['b3','r3'],segs:line([0,-.57,-.425],[0,.29,-.425],'-z')},
    {id:'y2',c:'Y',bind:['body'],segs:line([1.1,-.69,-.28],[1.1,.21,-.28],'+x')},
    {id:'y3',c:'Y',bind:['body'],segs:line([-1.1,-.69,-.28],[-1.1,.21,-.28],'-x')},
    {id:'y4',c:'Y',bind:['body'],segs:line([.46,-.875,-.25],[.46,-.875,.25],'-y')},
    {id:'y5',c:'Y',bind:['body'],segs:line([-.46,-.875,-.25],[-.46,-.875,.25],'-y')},
    {id:'y6',c:'Y',bind:['body'],segs:line([.83,.575,-.2],[.83,.575,.2],'+y')}
  );
  registerQuestion({...source,id:'L6_camera_cross',modelId:'camera',sourceQuestionId:source.id,
    level:'L6',levelName:'宗师',object:'纸板相机·跨级候选',review:'pending',
    build:source.build,yaw:2.75,pitch:.27,queue:'RYBY',open:2,tapes});
})();
