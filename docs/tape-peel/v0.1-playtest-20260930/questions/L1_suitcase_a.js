// L1 纸板手提箱：箱身、箱盖、坐在箱盖上的拱形宽提手。
(() => {
  function buildSuitcase() {
    const parts = {};
    const add = (id, mesh, base = false) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat));
      parts[id] = { id, mesh, base, released:false };
      return mesh;
    };

    const body = add('body', new THREE.Mesh(new THREE.BoxGeometry(2, 1.3, .7), cardMat('#c9955c')), true);
    body.position.y = -.25; // 上沿 y=.4
    const lid = add('lid', new THREE.Mesh(new THREE.BoxGeometry(2, .26, .7), cardMat('#dfb17b')));
    lid.position.y = .53; // 下沿 y=.4，上沿 y=.66

    // 中空的门形提手。横梁是部件本体，两根宽立柱是其子物体，一起掉落。
    const handle = add('handle', new THREE.Mesh(new THREE.BoxGeometry(1.06, .14, .32), cardMat('#c28a50')));
    handle.position.set(0, 1.075, -.16); // 横梁下沿 y=1.005、上沿 y=1.145，正面 z=0
    for (const x of [-.37, .37]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(.32, .37, .32), cardMat('#c28a50'));
      post.position.set(x, -.235, 0); // 柱脚 y=.655，坐在箱盖上
      post.add(new THREE.LineSegments(new THREE.EdgesGeometry(post.geometry), edgeMat));
      handle.add(post);
    }

    // 箱身四角的纸板护角只作装饰，远离正面的胶带。
    for (const x of [-.88, .88]) {
      const corner = new THREE.Mesh(new THREE.BoxGeometry(.16, .18, .018), cardMat('#d4a168'));
      corner.position.set(x, -.76, .36);
      body.add(corner);
    }
    return parts;
  }

  const line = TapeTools.crossSeam;
  const root = TapeTools.rootL;
  registerQuestion({
    id:'L1_suitcase_a', level:'L1', levelName:'基础', object:'纸板手提箱', review:'pending',
    build:buildSuitcase, baseIds:['body'], partIds:['body','lid','handle'], supports:{handle:'lid'},
    yaw:.23, pitch:.31, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'R',bind:['handle','lid'],segs:root([-.37,1.09,0],[-.37,.66,0],[-.37,.66,.30],'+z','+y')},
      {id:'r2',c:'R',bind:['handle','lid'],segs:root([ .37,1.09,0],[ .37,.66,0],[ .37,.66,.30],'+z','+y')},
      {id:'r3',c:'R',bind:['lid','body'],segs:line([.72,.59,.35],[.72,-.40,.35],'+z')},
      {id:'g1',c:'G',bind:['lid','body'],segs:line([-.72,.59,.35],[-.72,-.40,.35],'+z')},
      {id:'g2',c:'G',bind:['lid','body'],segs:line([-.24,.59,.35],[-.24,-.40,.35],'+z')},
      {id:'g3',c:'G',bind:['lid','body'],segs:line([ .24,.59,.35],[ .24,-.40,.35],'+z')},
    ],
  });
})();
