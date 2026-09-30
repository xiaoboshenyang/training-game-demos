// 纸板相机 B：镜头盒右侧三条横带，从镜头正面翻过右沿贴到机身。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_camera_a');
  const build = () => {
    const parts = original.build();
    parts.lens.mesh.geometry = new THREE.BoxGeometry(1.4, .85, .32);
    parts.lens.mesh.children[0].geometry = new THREE.EdgesGeometry(parts.lens.mesh.geometry, 20);
    parts.lens.mesh.children[1].position.x = -.38;
    parts.lens.mesh.children[2].position.x = -.38;
    return parts;
  };
  const finderTape = x => TapeTools.foldEdge([x,.975,-.04],[x,.975,.425],[x,.44,.425],'+y','+z');
  const lensTape = y => TapeTools.wrap([[.2,y,.745],[.7,y,.745],[.7,y,.425],[1.03,y,.425]],['+z','+x','+z']);
  registerQuestion({
    id:'L1_camera_b',level:'L1',levelName:'基础',object:'纸板相机',review:'pending',
    build,baseIds:['body'],partIds:['body','lens','finder'],supports:{},
    yaw:.18,pitch:.28,queue:'RG',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['finder','body'],segs:finderTape(-.86)},
      {id:'r2',c:'G',bind:['lens','body'],segs:lensTape(.22)},
      {id:'r3',c:'R',bind:['finder','body'],segs:finderTape(-.2)},
      {id:'g1',c:'R',bind:['finder','body'],segs:finderTape(-.53)},
      {id:'g2',c:'G',bind:['lens','body'],segs:lensTape(-.05)},
      {id:'g3',c:'G',bind:['lens','body'],segs:lensTape(-.32)},
    ],
  });
})();
