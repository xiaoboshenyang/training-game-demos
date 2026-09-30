// L2 纸板玩具飞机：左右机翼、尾翼围绕唯一机身，带子分布在上、侧、背和底。
(() => {
  function buildAirplane() {
    const parts = {};
    const add = (id, mesh, base = false) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat));
      parts[id] = { id, mesh, base, released:false };
      return mesh;
    };

    // 飞行方向为 +z。两片低置机翼与机身底面齐平，便于底面胶带真实跨缝。
    const body = add('body', new THREE.Mesh(new THREE.BoxGeometry(.56,.44,2.4),cardMat('#c9955c')),true);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(.27,.42,4),cardMat('#e0b47c'));
    nose.rotation.x = Math.PI / 2;
    nose.rotation.y = Math.PI / 4;
    nose.position.z = 1.38;
    body.add(nose);
    for (const z of [.62,.84,1.06]) {
      const window = new THREE.Mesh(new THREE.BoxGeometry(.018,.105,.105),cardMat('#c28a50'));
      window.position.set(.289,.055,z);
      body.add(window);
    }

    for (const side of [-1,1]) {
      const id = side < 0 ? 'wingL' : 'wingR';
      const wing = add(id,new THREE.Mesh(new THREE.BoxGeometry(1.04,.13,.72),cardMat(side < 0 ? '#dfb17b' : '#d4a168')));
      wing.position.set(side*.8,-.155,.18);
    }
    const tail = add('tail',new THREE.Mesh(new THREE.BoxGeometry(1.3,.1,.38),cardMat('#e3b981')));
    tail.position.set(0,.17,-.9);
    const fin = new THREE.Mesh(new THREE.BoxGeometry(.04,.4,.34),cardMat('#d4a168'));
    fin.position.set(0,.245,0);
    tail.add(fin);
    return parts;
  }

  const line = TapeTools.crossSeam, root = TapeTools.rootL;
  registerQuestion({
    id:'L2_airplane_a',level:'L2',levelName:'初阶',object:'纸板玩具飞机',review:'pending',
    build:buildAirplane,baseIds:['body'],partIds:['body','wingL','wingR','tail'],supports:{},
    yaw:.55,pitch:.3,queue:'RGR',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['wingL','body'],segs:root([-.98,-.09,.1],[-.28,-.09,.1],[-.28,.15,.1],'+y','-x')},
      {id:'r2',c:'R',bind:['wingR','body'],segs:root([.98,-.09,.1],[.28,-.09,.1],[.28,.15,.1],'+y','+x')},
      {id:'r3',c:'R',bind:['tail','body'],segs:line([-.13,.22,-1.04],[-.13,.22,-.5],'+y')},
      {id:'r4',c:'R',bind:['body'],segs:line([-.285,-.06,-.98],[-.285,-.06,-.58],'-x')},
      {id:'r5',c:'R',bind:['body'],segs:line([.285,-.06,-.98],[.285,-.06,-.58],'+x')},
      {id:'r6',c:'R',bind:['body'],segs:line([-.1,-.225,.65],[-.1,-.225,1.03],'-y')},
      {id:'g1',c:'G',bind:['wingL','body'],segs:line([-.94,-.225,.35],[-.13,-.225,.35],'-y')},
      {id:'g2',c:'G',bind:['wingR','body'],segs:line([.94,-.225,.35],[.13,-.225,.35],'-y')},
      {id:'g3',c:'G',bind:['tail','body'],segs:line([.13,.22,-1.04],[.13,.22,-.5],'+y')},
    ],
  });
})();
