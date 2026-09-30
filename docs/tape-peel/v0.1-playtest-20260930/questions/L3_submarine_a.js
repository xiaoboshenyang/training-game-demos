// 纸板潜水艇：宽船身、指挥塔、潜望镜和尾部螺旋桨。
(() => {
  function buildSubmarine(){
    const parts={};
    const add=(id,w,h,d,x,y,z,color,base=false)=>{
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),cardMat(color));
      mesh.position.set(x,y,z);
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,20),edgeMat));
      parts[id]={id,mesh,base,released:false};return mesh;
    };
    const hull=add('hull',1.8,.8,.9,0,-.35,0,'#c9955c',true);
    const tower=add('tower',.78,.6,.9,-.12,.35,0,'#d9a86f');
    const mast=add('mast',.38,.35,.9,-.12,.825,0,'#c28a50');
    add('bow',.25,.8,.9,-1.025,-.35,0,'#d4a168');
    add('stern',.25,.8,.9,1.025,-.35,0,'#d4a168');
    const prop=add('prop',.36,.42,.9,1.33,-.35,0,'#c28a50');
    add('rudder',.38,.4,.9,1.025,.25,0,'#c28a50');
    const dark=new THREE.MeshStandardMaterial({color:0x8b5936,roughness:.75});
    for(const x of [0,.55]){
      const ring=new THREE.Mesh(new THREE.TorusGeometry(.105,.026,8,22),dark);
      ring.position.set(x,0,-.468);hull.add(ring);
    }
    const elbow=new THREE.Mesh(new THREE.BoxGeometry(.34,.12,.24),cardMat('#dfb17b'));
    elbow.position.set(.13,.22,0);mast.add(elbow);
    const blade=new THREE.Mesh(new THREE.BoxGeometry(.1,.62,.16),cardMat('#dfb17b'));
    blade.position.set(.12,0,.08);prop.add(blade);
    return parts;
  }
  const line=TapeTools.crossSeam;
  registerQuestion({
    id:'L3_submarine_a',level:'L3',levelName:'中阶',object:'纸板潜水艇',review:'pending',
    build:buildSubmarine,partIds:['hull','tower','mast','bow','stern','prop','rudder'],baseIds:['hull'],
    supports:{tower:'hull',mast:'tower',rudder:'stern',prop:'stern'},
    yaw:2.45,pitch:.2,queue:'RYBR',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['hull'],over:['r2'],segs:line([-.78,-.5,.455],[-.24,-.5,.455],'+z')},
      {id:'r2',c:'R',bind:['hull'],segs:line([-.5,-.69,.455],[-.5,-.2,.455],'+z')},
      {id:'r3',c:'R',bind:['tower','hull'],segs:line([-.37,-.18,-.455],[-.37,.35,-.455],'-z')},
      {id:'r4',c:'R',bind:['bow','hull'],segs:line([-1.08,.055,0],[-.72,.055,0],'+y')},
      {id:'r5',c:'R',bind:['stern','hull'],segs:line([.72,-.46,.455],[1.08,-.46,.455],'+z')},
      {id:'r6',c:'R',bind:['prop','stern'],segs:line([1.04,-.35,-.455],[1.38,-.35,-.455],'-z')},
      {id:'y1',c:'Y',bind:['hull'],over:['b1'],segs:line([.04,-.42,.455],[.47,-.42,.455],'+z')},
      {id:'y2',c:'Y',bind:['mast','tower','hull'],segs:line([-.12,-.2,.455],[-.12,.88,.455],'+z')},
      {id:'y3',c:'Y',bind:['rudder','stern'],segs:line([1.025,-.15,.455],[1.025,.34,.455],'+z')},
      {id:'b1',c:'B',bind:['hull'],segs:line([.32,-.65,.455],[.32,-.2,.455],'+z')},
      {id:'b2',c:'B',bind:['hull'],segs:line([-.72,-.57,-.455],[-.31,-.57,-.455],'-z')},
      {id:'b3',c:'B',bind:['bow','hull'],segs:line([-1.08,-.12,-.455],[-.7,-.12,-.455],'-z')},
    ],
  });
})();
