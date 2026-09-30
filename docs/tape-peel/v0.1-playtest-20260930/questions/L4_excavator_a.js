// 纸板挖掘机：履带、驾驶室、前铲与一体式纸板机械臂。
(() => {
  function buildExcavator(){
    const parts={};
    const add=(id,w,h,d,x,y,z,color,base=false)=>{
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),cardMat(color));mesh.position.set(x,y,z);
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,20),edgeMat));
      parts[id]={id,mesh,base,released:false};return mesh;
    };
    const chassis=add('chassis',1.6,.55,.85,0,-.55,0,'#c9955c',true);
    const cab=add('cab',.87,.7,.85,-.34,.075,0,'#d9a86f');
    const boom=add('boom',.62,.32,.85,.47,-.115,0,'#d4a168');
    const raised=new THREE.Mesh(new THREE.BoxGeometry(.25,.73,.3),cardMat('#c28a50'));
    raised.position.set(.48,.42,-.15);raised.rotation.z=-.62;boom.add(raised);
    const bucket=new THREE.Mesh(new THREE.BoxGeometry(.38,.36,.45),cardMat('#dfb17b'));
    bucket.position.set(.83,.43,-.12);bucket.rotation.z=-.2;boom.add(bucket);
    add('counter',.24,.55,.85,-.92,-.55,0,'#c28a50');
    add('blade',.24,.55,.85,.92,-.55,0,'#dfb17b');
    add('trackL',.52,.34,.3,-.46,-.89,.275,'#c28a50');
    add('trackR',.52,.34,.3,.46,-.89,.275,'#c28a50');
    const glass=new THREE.Mesh(new THREE.BoxGeometry(.35,.1,.025),new THREE.MeshStandardMaterial({color:0x776b56,roughness:.45}));
    glass.position.set(.16,.29,.44);cab.add(glass);
    for(const x of [-.5,.5]){
      const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.025,12),new THREE.MeshStandardMaterial({color:0x8a5a30,roughness:.8}));
      wheel.rotation.x=Math.PI/2;wheel.position.set(x,-.31,-.44);chassis.add(wheel);
    }
    return parts;
  }
  const line=TapeTools.crossSeam;
  registerQuestion({
    id:'L4_excavator_a',level:'L4',levelName:'高阶',object:'纸板挖掘机',review:'pending',
    build:buildExcavator,partIds:['chassis','cab','boom','counter','blade','trackL','trackR'],baseIds:['chassis'],
    supports:{cab:'chassis',boom:'chassis'},yaw:2.5,pitch:.22,queue:'RYBRY',open:2,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['chassis'],over:['r2'],segs:line([-.2,-.53,.43],[.2,-.53,.43],'+z')},
      {id:'r2',c:'R',bind:['chassis'],segs:line([0,-.75,.43],[0,-.34,.43],'+z')},
      {id:'r3',c:'R',bind:['cab','chassis'],segs:line([-.45,-.35,-.43],[-.45,.12,-.43],'-z')},
      {id:'r4',c:'R',bind:['boom','chassis'],segs:line([.32,-.35,.43],[.32,.02,.43],'+z')},
      {id:'r5',c:'R',bind:['counter','chassis'],segs:line([-.99,-.55,.43],[-.69,-.55,.43],'+z')},
      {id:'r6',c:'R',bind:['blade','chassis'],segs:line([.69,-.55,.43],[.99,-.55,.43],'+z')},
      {id:'y1',c:'Y',bind:['cab','chassis'],over:['b1'],segs:line([-.52,-.35,.43],[-.52,.25,.43],'+z')},
      {id:'y2',c:'Y',bind:['chassis'],over:['y3'],segs:line([-.58,-.62,-.43],[.58,-.62,-.43],'-z')},
      {id:'y3',c:'Y',bind:['chassis'],segs:line([0,-.77,-.43],[0,-.35,-.43],'-z')},
      {id:'y4',c:'Y',bind:['trackL','chassis'],segs:line([-.46,-.66,.43],[-.46,-1.01,.43],'+z')},
      {id:'y5',c:'Y',bind:['trackR','chassis'],segs:line([.46,-.66,.43],[.46,-1.01,.43],'+z')},
      {id:'y6',c:'Y',bind:['boom','chassis'],segs:line([.62,-.4,-.43],[.62,-.01,-.43],'-z')},
      {id:'b1',c:'B',bind:['cab','chassis'],segs:line([-.63,.2,.43],[-.4,-.42,.43],'+z')},
      {id:'b2',c:'B',bind:['counter','chassis'],segs:line([-.99,-.58,-.43],[-.69,-.58,-.43],'-z')},
      {id:'b3',c:'B',bind:['blade','chassis'],segs:line([.69,-.58,-.43],[.99,-.58,-.43],'-z')},
    ],
  });
})();
