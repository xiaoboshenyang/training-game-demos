const COLORS = {
  R: { hex:'#ec3f4f', name:'红' },
  Y: { hex:'#f7c534', name:'黄' },
  B: { hex:'#2aa7c9', name:'蓝' },
  G: { hex:'#4cb050', name:'绿' },
};
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const A = 0.6;          // 箭身半宽
const NOSE_H = 1.1;     // 箭头高
const TAPE_W = 0.2;

// ───── 纸板贴图（程序生成） ─────
function cardboardTex(base) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const v = Math.random() < .5 ? 0 : 255;
    g.fillStyle = `rgba(${v},${v * .85},${v * .6},${Math.random() * .06})`;
    g.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  g.strokeStyle = 'rgba(120,80,40,.07)'; g.lineWidth = 2;
  for (let y = 0; y < 256; y += 9) { g.beginPath(); g.moveTo(0, y + Math.random() * 2); g.lineTo(256, y + Math.random() * 2); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
const cardMat = col => new THREE.MeshStandardMaterial({ color:0xffffff, map:cardboardTex(col), roughness:.95 });
const edgeMat = new THREE.LineBasicMaterial({ color:0x8a5a30, transparent:true, opacity:.55 });

// 撕口端头贴图
const jagCache = {};
function jagTex(k) {
  if (jagCache[k]) return jagCache[k];
  const c = document.createElement('canvas'); c.width = 32; c.height = 64;
  const g = c.getContext('2d'); g.fillStyle = COLORS[k].hex;
  g.beginPath(); g.moveTo(0, 0);
  for (let y = 0; y <= 64; y += 8) { g.lineTo(y % 16 ? 20 : 30, y); }
  g.lineTo(0, 64); g.closePath(); g.fill();
  const t = new THREE.CanvasTexture(c);
  return (jagCache[k] = t);
}


// ───── 通用贴法工具。坐标由各题的模型边界给出 ─────
const TapeTools = (() => {
  const vec = p => p.isVector3 ? p.clone() : V(...p);
  const normal = n => typeof n === 'string' ? ({'+x':V(1,0,0),'-x':V(-1,0,0),'+z':V(0,0,1),'-z':V(0,0,-1),'+y':V(0,1,0),'-y':V(0,-1,0)})[n] : vec(n);
  const line = (a,b,n) => ({a:vec(a),b:vec(b),n:normal(n)});
  const crossSeam = (a,b,n) => [line(a,b,n)];
  const foldEdge = (a,corner,b,n1,n2) => [line(a,corner,n1),line(corner,b,n2)];
  const wrap = (points,normals) => points.slice(1).map((p,i) => line(points[i],p,normals[i]));
  const rootL = (a,corner,b,n1,n2) => foldEdge(a,corner,b,n1,n2);
  const slopeFold = (a,corner,b,slopeNormal,bodyNormal) => foldEdge(a,corner,b,slopeNormal,bodyNormal);
  return {line,crossSeam,foldEdge,wrap,rootL,slopeFold};
})();
const seg = (a,b,n) => TapeTools.line(a,b,n);

// 自检用：沿胶带长向与宽向取样，检查贴面带身。撕口端头本来向外悬出，另作目视检查。
function tapeSurfaceCheck(q) {
  const parts=q.build(),root=new THREE.Group(),meshes=[],owner=new Map(),issues=[];
  for(const [id,part] of Object.entries(parts)){
    root.add(part.mesh);
    part.mesh.traverse(o=>{if(o.isMesh){meshes.push(o);owner.set(o,id);}});
  }
  root.updateMatrixWorld(true);
  const inspect=(tape,i,step,side,point,n,kind='surface')=>{
    const origin=point.clone().addScaledVector(n,.4);
    const hit=new THREE.Raycaster(origin,n.clone().negate()).intersectObjects(meshes,false)[0];
    const part=hit?owner.get(hit.object):null,gap=hit?hit.distance-.4:null;
    if(gap===null||Math.abs(gap)>.018||(part&&!tape.bind.includes(part)))
      issues.push({id:tape.id,segment:i,step,side:+side.toFixed(3),gap:gap===null?null:+gap.toFixed(3),part,kind});
    else return part;
  };
  for(const tape of q.tapes){
    const touched=new Set();
    for(let i=0;i<tape.segs.length;i++){
      const s=tape.segs[i],n=s.n.clone().normalize(),dir=s.b.clone().sub(s.a).normalize();
      const across=new THREE.Vector3().crossVectors(n,dir).normalize();
      for(const step of [.02,.08,.25,.5,.75,.92,.98])for(const side of [-TAPE_W*.48,-TAPE_W*.25,0,TAPE_W*.25,TAPE_W*.48]){
        const point=s.a.clone().lerp(s.b,step).addScaledVector(across,side);
        const part=inspect(tape,i,step,side,point,n);
        if(part)touched.add(part);
      }
    }
    for(const id of tape.bind)if(!touched.has(id))issues.push({id:tape.id,part:id,kind:'bind-no-contact'});
  }
  return issues;
}

// file:// 可运行的普通脚本注册表。
const QUESTION_BANK = [];
function registerQuestion(q) { QUESTION_BANK.push(q); }
let ACTIVE = null;
