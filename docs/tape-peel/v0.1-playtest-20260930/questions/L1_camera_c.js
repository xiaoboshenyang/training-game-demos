// 纸板相机 C：镜头盒靠左、取景器靠右；先拆镜头红带再拆取景器绿带。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_camera_a');
  const build = () => {
    const parts = original.build();
    parts.lens.mesh.position.x = -.15;
    parts.finder.mesh.position.x = .55;
    return parts;
  };
  const finderTape = x => TapeTools.foldEdge([x,.975,-.04],[x,.975,.425],[x,.44,.425],'+y','+z');
  const lensTape = x => TapeTools.wrap([[x,.25,.745],[x,-.475,.745],[x,-.475,.425],[x,-.79,.425]],['+z','-y','+z']);
  registerQuestion({
    id:'L1_camera_c',level:'L1',levelName:'基础',object:'纸板相机',review:'pending',
    build,baseIds:['body'],partIds:['body','lens','finder'],supports:{},
    yaw:-.16,pitch:.28,queue:'RG',open:1,score:55,
    tapes:[
      {id:'r1',c:'G',bind:['finder','body'],segs:finderTape(.22)},
      {id:'r2',c:'R',bind:['lens','body'],segs:lensTape(.25)},
      {id:'r3',c:'R',bind:['lens','body'],segs:lensTape(.53)},
      {id:'g1',c:'R',bind:['lens','body'],segs:lensTape(-.03)},
      {id:'g2',c:'G',bind:['finder','body'],segs:finderTape(.55)},
      {id:'g3',c:'G',bind:['finder','body'],segs:finderTape(.88)},
    ],
  });
})();
