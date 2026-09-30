// 火箭：从 v0.2 样张迁入。部件与胶带数据不变。

const DIRS = { '+z':V(0,0,1), '-z':V(0,0,-1), '+x':V(1,0,0), '-x':V(-1,0,0) };
const tangent = D => V(D.z, 0, -D.x);
const nosePt = (D, t) => D.clone().multiplyScalar(A * (1 - t)).add(V(0, 1 + NOSE_H * t, 0));
const noseN = D => D.clone().multiplyScalar(NOSE_H).add(V(0, A, 0)).normalize();

function buildRocket() {
  const parts = {};
  const add = (id, mesh, base) => { mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat)); parts[id] = { id, mesh, base, released:false }; return mesh; };
  const low = add('low', new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 1.2), cardMat('#c9955c')), true); low.position.y = -0.5;
  const up = add('up', new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 1.2), cardMat('#d4a168')), false); up.position.y = 0.5;
  // 舷窗
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.23, 0.05, 12, 36), new THREE.MeshStandardMaterial({ color:0xf1efe9, roughness:.4 }));
  ring.position.set(0, 0.05, A + 0.03); up.add(ring);
  const glass = new THREE.Mesh(new THREE.CircleGeometry(0.21, 36), new THREE.MeshStandardMaterial({ color:0xa3221c, roughness:.25, metalness:.1 }));
  glass.position.set(0, 0.05, A + 0.012); up.add(glass);
  // 箭头：四棱锥，面朝 ±x ±z
  const noseGeo = new THREE.ConeGeometry(A * Math.SQRT2, NOSE_H, 4, 1); noseGeo.rotateY(Math.PI / 4);
  const nose = add('nose', new THREE.Mesh(noseGeo, cardMat('#d9a86f')), false); nose.position.y = 1 + NOSE_H / 2;
  // 四片尾翼
  const sh = new THREE.Shape(); sh.moveTo(0, -0.1); sh.lineTo(0, -1.4); sh.lineTo(0.78, -1.4); sh.closePath();
  const finGeo0 = new THREE.ExtrudeGeometry(sh, { depth:0.06, bevelEnabled:false });
  Object.entries({ finF:'+z', finR:'+x', finB:'-z', finL:'-x' }).forEach(([id, k]) => {
    const D = DIRS[k], W = new THREE.Vector3().crossVectors(D, V(0,1,0));
    const g = finGeo0.clone().applyMatrix4(new THREE.Matrix4().makeBasis(D, V(0,1,0), W));
    const center = D.clone().multiplyScalar(A).addScaledVector(W, -0.03);
    g.translate(center.x, center.y, center.z);
    g.computeBoundingBox(); const c = g.boundingBox.getCenter(new THREE.Vector3());
    g.translate(-c.x, -c.y, -c.z);
    const m = add(id, new THREE.Mesh(g, cardMat('#c28a50')), false); m.position.copy(c);
  });
  return parts;
}


function noseDown(k, t0, yEnd) {
  const D = DIRS[k];
  return TapeTools.slopeFold(nosePt(D, t0), nosePt(D, 0), D.clone().multiplyScalar(A).add(V(0,yEnd,0)), noseN(D), D);
}
function finTape(k, y) {
  const D = DIRS[k], T = tangent(D), root = D.clone().multiplyScalar(A).add(V(0,y,0));
  return TapeTools.rootL(root.clone().addScaledVector(D,.36).addScaledVector(T,.03), root.clone().addScaledVector(T,.03), root.clone().addScaledVector(T,.42), T, D);
}
const LEVEL = {
  queue:'RYBR', open:1, score:55,
  tapes:[
    { id:'y1', c:'Y', bind:['nose','up'], segs:noseDown('+z', .82, 0.86) },
    { id:'r1', c:'R', bind:['nose','up'], segs:noseDown('-x', .82, 0.35) },
    { id:'r2', c:'R', bind:['nose','up'], segs:noseDown('+x', .82, 0.4) },
    { id:'r3', c:'R', bind:['up','low'],  segs:[ seg([A,.62,-.3], [A,-.6,-.3], '+x') ] },
    { id:'b1', c:'B', bind:['up','low'],  segs:[ seg([.3,.62,-A], [.3,-.6,-A], '-z') ] },
    { id:'y2', c:'Y', bind:['up'], over:['b1'], segs:[ seg([.48,.12,-A], [-A,.12,-A], '-z'), seg([-A,.12,-A], [-A,.12,.32], '-x') ] },
    { id:'y3', c:'Y', bind:['finL','low'], segs:finTape('-x', -0.85) },
    { id:'b2', c:'B', bind:['finB','low'], segs:finTape('-z', -0.85) },
    { id:'b3', c:'B', bind:['finR','low'], segs:finTape('+x', -0.85) },
    { id:'r4', c:'R', bind:['finF','low'], segs:finTape('+z', -0.85) },
    { id:'r6', c:'R', bind:['low'], segs:[ seg([-.54,-.55,A], [-.16,-.55,A], '+z') ] },
    { id:'r5', c:'R', bind:['low'], over:['r6'], segs:[ seg([-.35,-.2,A], [-.35,-.92,A], '+z') ] },
  ],
};


registerQuestion({ ...LEVEL, id:'L3_rocket_a', level:'L3', levelName:'中阶', object:'火箭', build:buildRocket, yaw:.55, pitch:.18,
  partIds:['low','up','nose','finF','finR','finB','finL'], baseIds:['low'], supports:{nose:'up'} });
