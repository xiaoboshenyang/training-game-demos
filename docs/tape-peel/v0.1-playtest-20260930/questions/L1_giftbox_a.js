// L1 礼盒：盒身是底座，蝴蝶结坐在盒盖上。
(() => {
  function buildGiftbox() {
    const parts = {};
    const add = (id, mesh, base = false) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat));
      parts[id] = { id, mesh, base, released:false };
      return mesh;
    };
    const body = add('body', new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.1, 1.4), cardMat('#c9955c')), true);
    body.position.y = -0.35;
    const lid = add('lid', new THREE.Mesh(new THREE.BoxGeometry(1.72, .18, 1.42), cardMat('#dfb17b')));
    lid.position.y = .29;
    const bow = add('bow', new THREE.Mesh(new THREE.BoxGeometry(.22,.19,.18),cardMat('#c28a50')));
    bow.position.y = .53;
    for (const sign of [-1, 1]) {
      const wing = new THREE.Mesh(new THREE.BoxGeometry(.43,.21,.12),cardMat('#d4a168'));
      wing.position.set(sign*.3,.035,0);
      wing.rotation.z = sign*.18;
      wing.add(new THREE.LineSegments(new THREE.EdgesGeometry(wing.geometry),edgeMat));
      bow.add(wing);
    }
    return parts;
  }
  const line = TapeTools.crossSeam;
  const root = TapeTools.rootL;
  registerQuestion({
    id:'L1_giftbox_a', level:'L1', levelName:'基础', object:'礼盒',
    build:buildGiftbox, baseIds:['body'], partIds:['body','lid','bow'], supports:{bow:'lid'},
    yaw:.3, pitch:.35, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'R',bind:['bow','lid'],segs:root([-.31,.65,.07],[-.31,.38,.07],[-.31,.38,.52],'+z','+y')},
      {id:'r2',c:'R',bind:['bow','lid'],segs:root([ .31,.65,.07],[ .31,.38,.07],[ .31,.38,.52],'+z','+y')},
      {id:'r3',c:'R',bind:['lid'],segs:line([-.48,.38,-.43],[.48,.38,-.43],'+y')},
      {id:'g1',c:'G',bind:['lid','body'],segs:line([-.5,.34,.705],[-.5,-.42,.705],'+z')},
      {id:'g2',c:'G',bind:['lid','body'],segs:line([0,.34,.705],[0,-.42,.705],'+z')},
      {id:'g3',c:'G',bind:['body'],segs:line([.5,-.03,.705],[.5,-.58,.705],'+z')},
    ],
  });
})();
