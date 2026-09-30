// L1 纸板相机：机身是底座，镜头盒和上方取景器分别掉落。
(() => {
  function buildCamera() {
    const parts = {};
    const add = (id, mesh, base = false) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat));
      parts[id] = { id, mesh, base, released:false };
      return mesh;
    };
    const body = add('body', new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.45, .85), cardMat('#c9955c')), true);
    body.position.y = -.15;

    const lens = add('lens', new THREE.Mesh(new THREE.BoxGeometry(1.7, .85, .32), cardMat('#dfb17b')));
    lens.position.set(0, -.05, .585);
    // 圆形镜片是镜头盒的子装饰，和右侧宽平面的胶带保持距离。
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(.25, .25, .025, 24), cardMat('#c28a50'));
    rim.rotation.x = Math.PI / 2;
    rim.position.set(-.42, 0, .177);
    lens.add(rim);
    const glass = new THREE.Mesh(new THREE.CylinderGeometry(.15, .15, .028, 24), cardMat('#d4a168'));
    glass.rotation.x = Math.PI / 2;
    glass.position.set(-.42, 0, .2);
    lens.add(glass);

    const finder = add('finder', new THREE.Mesh(new THREE.BoxGeometry(1.0, .4, .55), cardMat('#d7a66d')));
    finder.position.set(-.55, .775, .15);
    return parts;
  }

  const finderTape = x => TapeTools.foldEdge([x,.975,-.04],[x,.975,.425],[x,.44,.425],'+y','+z');
  const lensTape = x => TapeTools.wrap([[x,.25,.745],[x,-.475,.745],[x,-.475,.425],[x,-.79,.425]],['+z','-y','+z']);
  registerQuestion({
    id:'L1_camera_a',level:'L1',levelName:'基础',object:'纸板相机',review:'pending',
    build:buildCamera,baseIds:['body'],partIds:['body','lens','finder'],supports:{},
    yaw:.16,pitch:.28,queue:'RG',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['finder','body'],segs:finderTape(-.88)},
      {id:'r2',c:'R',bind:['finder','body'],segs:finderTape(-.55)},
      {id:'r3',c:'R',bind:['finder','body'],segs:finderTape(-.22)},
      {id:'g1',c:'G',bind:['lens','body'],segs:lensTape(.12)},
      {id:'g2',c:'G',bind:['lens','body'],segs:lensTape(.4)},
      {id:'g3',c:'G',bind:['lens','body'],segs:lensTape(.68)},
    ],
  });
})();
