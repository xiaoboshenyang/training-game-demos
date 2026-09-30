// L1 纸板小帆船：梯形船身是底座，左侧船舱与宽三角帆独立掉落。
(() => {
  const prism = (points, depth) => {
    const shape = new THREE.Shape();
    shape.moveTo(...points[0]);
    points.slice(1).forEach(p => shape.lineTo(...p));
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {depth, bevelEnabled:false});
  };

  function buildSailboat() {
    const parts = {};
    const add = (id, mesh, base = false) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat));
      parts[id] = {id, mesh, base, released:false};
      return mesh;
    };

    const hull = add('hull', new THREE.Mesh(prism([
      [-1.15,-.25],[1.15,-.25],[.75,-.85],[-.75,-.85],
    ], .6), cardMat('#c9955c')), true);
    hull.position.z = -.3; // 船身朝玩家的平面 z=.3

    const cabin = add('cabin', new THREE.Mesh(new THREE.BoxGeometry(.9,.45,.6), cardMat('#dfb17b')));
    cabin.position.set(-.6,-.025,0); // 舱底与船沿同为 y=-.25，正面 z=.3

    const sail = add('sail', new THREE.Mesh(prism([
      [0,-.25],[1.15,-.25],[0,1.35],
    ], .08), cardMat('#d4a168')));
    sail.position.z = .22; // 宽帆正面同样 z=.3，胶带可连续跨过船沿
    const mast = new THREE.Mesh(new THREE.BoxGeometry(.08,1.68,.1), cardMat('#c28a50'));
    mast.position.set(-.04,.56,-.025); // 帆后的装饰桅杆，随船帆一起掉落
    mast.add(new THREE.LineSegments(new THREE.EdgesGeometry(mast.geometry), edgeMat));
    sail.add(mast);

    return parts;
  }

  const line = TapeTools.crossSeam;
  registerQuestion({
    id:'L1_sailboat_a', level:'L1', levelName:'基础', object:'纸板小帆船', review:'pending',
    build:buildSailboat, baseIds:['hull'], partIds:['hull','cabin','sail'], supports:{},
    yaw:.18, pitch:.24, queue:'RG', open:1, score:55,
    tapes:[
      {id:'r1',c:'R',bind:['sail','hull'],segs:line([.18,.85,.3],[.18,-.5,.3],'+z')},
      {id:'r2',c:'R',bind:['sail','hull'],segs:line([.48,.45,.3],[.48,-.5,.3],'+z')},
      {id:'r3',c:'R',bind:['sail','hull'],segs:line([.75,.05,.3],[.75,-.5,.3],'+z')},
      {id:'g1',c:'G',bind:['cabin','hull'],segs:line([-.88,.13,.3],[-.88,-.4,.3],'+z')},
      {id:'g2',c:'G',bind:['cabin','hull'],segs:line([-.60,.13,.3],[-.60,-.4,.3],'+z')},
      {id:'g3',c:'G',bind:['cabin','hull'],segs:line([-.32,.13,.3],[-.32,-.4,.3],'+z')},
    ],
  });
})();
