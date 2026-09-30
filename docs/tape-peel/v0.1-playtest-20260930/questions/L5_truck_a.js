// L5 小卡车：沿用规则 5.3 的三处选择性压叠，轮内侧和车厢底部要转着找。
(() => {
  function buildTruck() {
    const parts={};
    const add=(id,mesh,base=false)=>{
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,20),edgeMat));
      parts[id]={id,mesh,base,released:false};return mesh;
    };
    const chassis=add('chassis',new THREE.Mesh(new THREE.BoxGeometry(2.3,.32,1.02),cardMat('#c28a50')),true);
    chassis.position.y=-.82;
    const cab=add('cab',new THREE.Mesh(new THREE.BoxGeometry(.8,.9,.9),cardMat('#d4a168')));
    cab.position.set(-.7,-.28,0);
    const windowMat=new THREE.MeshStandardMaterial({color:0xb6814e,roughness:.95});
    const windscreen=new THREE.Mesh(new THREE.BoxGeometry(.025,.32,.31),windowMat);
    windscreen.position.set(-.415,.17,0);cab.add(windscreen);
    const bed=add('bed',new THREE.Mesh(new THREE.BoxGeometry(1.8,.9,1.0),cardMat('#c9955c')));
    bed.position.set(.55,-.28,0);
    const cover=add('cover',new THREE.Mesh(new THREE.BoxGeometry(1.83,.16,1.04),cardMat('#dfb17b')));
    cover.position.set(.55,.25,0);
    for(const [id,x,side] of [
      ['wheelFL',-.62,1],['wheelFR',-.62,-1],['wheelBL',.75,1],['wheelBR',.75,-1]
    ]) {
      const wheel=add(id,new THREE.Mesh(new THREE.CylinderGeometry(.26,.26,.16,18),cardMat('#c28a50')));
      wheel.rotation.x=Math.PI/2;wheel.position.set(x,-.92,side*.72);
      // 纸板轮轴随轮子一起掉，连接轮内面和底盘侧面。
      const axle=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.24,12),cardMat('#d4a168'));
      axle.position.y=-side*.17;wheel.add(axle);
      const wheelTab=new THREE.Mesh(new THREE.BoxGeometry(.38,.36,.06),cardMat('#d4a168'));
      wheelTab.position.set(0,-side*.09,-.23);wheel.add(wheelTab);
    }
    const bumper=add('bumper',new THREE.Mesh(new THREE.BoxGeometry(.16,.21,1.14),cardMat('#dfb17b')));
    bumper.position.set(-1.23,-.83,0);
    return parts;
  }

  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge;
  const wheelRoot=(x,side)=>TapeTools.rootL([x,-.82,side*.805],[x,-.655,side*.805],[x,-.655,side*.45],side>0?'+z':'-z','+y');
  registerQuestion({
    id:'L5_truck_a',level:'L5',levelName:'超凡',object:'纸箱小卡车',review:'pending',
    build:buildTruck,baseIds:['chassis'],
    partIds:['chassis','cab','bed','cover','wheelFL','wheelFR','wheelBL','wheelBR','bumper'],
    supports:{cover:'bed'},yaw:-.4,pitch:.3,queue:'RYGBRY',open:2,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['cab','chassis'],segs:line([-1.105,.06,.29],[-1.105,-.715,.29],'-x')},
      {id:'r2',c:'R',bind:['wheelFL','chassis'],segs:wheelRoot(-.62,1)},
      {id:'r3',c:'R',bind:['wheelBL','chassis'],segs:wheelRoot(.75,1)},
      {id:'r4',c:'R',bind:['cab'],over:['g1'],segs:line([-.7,-.6,.455],[-.7,.05,.455],'+z')},
      {id:'r5',c:'R',bind:['bed'],over:['g2'],segs:line([.42,-.58,.505],[.42,.08,.505],'+z')},
      {id:'r6',c:'R',bind:['bumper','chassis'],segs:TapeTools.wrap([[-1.3,-.81,.565],[-1.15,-.81,.565],[-1.15,-.81,.505],[-1.01,-.81,.505]],['+z','+x','+z'])},
      {id:'y1',c:'Y',bind:['cab','chassis'],segs:TapeTools.wrap([[-1.01,.08,-.455],[-1.01,-.665,-.455],[-1.01,-.665,-.505],[-1.01,-.85,-.505]],['-z','+y','-z'])},
      {id:'y2',c:'Y',bind:['bed','chassis'],segs:line([.03,.09,-.505],[.03,-.85,-.515],'-z')},
      {id:'y3',c:'Y',bind:['wheelFR','chassis'],segs:wheelRoot(-.62,-1)},
      {id:'y4',c:'Y',bind:['cover','bed'],over:['b1'],segs:line([-.18,.335,0],[.88,.335,0],'+y')},
      {id:'y5',c:'Y',bind:['bed','chassis'],segs:line([.25,-.48,-.505],[.25,-.86,-.515],'-z')},
      {id:'y6',c:'Y',bind:['cover','bed'],segs:line([.74,.325,-.525],[.74,-.18,-.505],'-z')},
      {id:'g1',c:'G',bind:['cab'],segs:line([-1.035,-.28,.455],[-.365,-.28,.455],'+z')},
      {id:'g2',c:'G',bind:['bed'],segs:line([-.23,-.27,.505],[1.01,-.27,.505],'+z')},
      {id:'g3',c:'G',bind:['wheelBR'],segs:line([.6,-1.045,-.635],[.9,-1.045,-.635],'+z')},
      {id:'b1',c:'B',bind:['cover','bed'],segs:line([.35,.335,-.42],[.35,.335,.42],'+y')},
      {id:'b2',c:'B',bind:['wheelBR','chassis'],segs:wheelRoot(.75,-1)},
      {id:'b3',c:'B',bind:['bed'],segs:line([1.3,-.735,-.4],[1.3,-.735,.4],'-y')},
    ],
  });
})();
