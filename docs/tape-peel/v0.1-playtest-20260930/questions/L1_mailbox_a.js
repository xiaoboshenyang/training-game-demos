// L1 纸板邮筒：筒身是唯一底座，上盖和正面取信翻板分别掉落。
(() => {
  function buildMailbox() {
    const parts = {};
    const add = (id, mesh, base = false) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat));
      parts[id] = { id, mesh, base, released:false };
      return mesh;
    };
    const detail = (parent, size, color, position) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), cardMat(color));
      mesh.position.set(...position);
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edgeMat));
      parent.add(mesh);
      return mesh;
    };

    const body = add('body', new THREE.Mesh(new THREE.BoxGeometry(1.55, 2.1, 1.1), cardMat('#c9955c')), true);
    // 筒身子物体：矮底脚、投信口和口沿都随筒身一起散落。
    detail(body, [1.7, .14, 1.2], '#c28a50', [0, -1.1, 0]);
    detail(body, [.82, .085, .035], '#a77140', [0, .5, .573]);
    detail(body, [1.04, .045, .055], '#dfb17b', [0, .415, .585]);

    const lid = add('lid', new THREE.Mesh(new THREE.BoxGeometry(1.76, .22, 1.1), cardMat('#dfb17b')));
    lid.position.y = 1.16;

    // 翻板贴在筒身正面，胶带从正面折过翻板下沿，再贴回筒身。
    const flap = add('flap', new THREE.Mesh(new THREE.BoxGeometry(1.0, .68, .08), cardMat('#d7a66d')));
    flap.position.set(0, -.12, .59);
    return parts;
  }

  const fold = TapeTools.foldEdge;
  const wrap = TapeTools.wrap;
  const flapTape = x => wrap([[x,.08,.63],[x,-.46,.63],[x,-.46,.55],[x,-.78,.55]], ['+z','-y','+z']);
  registerQuestion({
    id:'L1_mailbox_a', level:'L1', levelName:'基础', object:'纸板邮筒', review:'pending',
    build:buildMailbox, baseIds:['body'], partIds:['body','lid','flap'], supports:{},
    yaw:.22, pitch:.28, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'R',bind:['lid','body'],segs:fold([-.43,1.27,.12],[-.43,1.27,.55],[-.43,.73,.55],'+y','+z')},
      {id:'r2',c:'R',bind:['lid','body'],segs:fold([0,1.27,.12],[0,1.27,.55],[0,.73,.55],'+y','+z')},
      {id:'r3',c:'R',bind:['lid','body'],segs:fold([.43,1.27,.12],[.43,1.27,.55],[.43,.73,.55],'+y','+z')},
      {id:'g1',c:'G',bind:['flap','body'],segs:flapTape(-.3)},
      {id:'g2',c:'G',bind:['flap','body'],segs:flapTape(0)},
      {id:'g3',c:'G',bind:['flap','body'],segs:flapTape(.3)},
    ],
  });
})();
