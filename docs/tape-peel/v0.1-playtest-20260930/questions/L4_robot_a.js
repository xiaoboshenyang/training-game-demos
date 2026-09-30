// L4 纸箱机器人：三处同色十字压带；手臂内侧与背包背面须转动物体寻找。
(() => {
  function buildRobot() {
    const parts = {};
    const add = (id, mesh, base = false) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat));
      parts[id] = { id, mesh, base, released:false };
      return mesh;
    };
    const torso = add('torso',new THREE.Mesh(new THREE.BoxGeometry(1.2,1.2,.8),cardMat('#c9955c')),true);
    const head = add('head',new THREE.Mesh(new THREE.BoxGeometry(.9,.6,.8),cardMat('#d9a86f')));
    head.position.y = .9;
    const eyeMat = new THREE.MeshStandardMaterial({color:0x8d5b35,roughness:.8});
    for(const x of [-.11,.11]){
      const eye = new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,.025,16),eyeMat);
      eye.rotation.x=Math.PI/2;eye.position.set(x,.04,.416);head.add(eye);
    }
    const antenna = add('antenna',new THREE.Mesh(new THREE.BoxGeometry(.16,.32,.16),cardMat('#c28a50')));
    antenna.position.y = 1.36;
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(.13,.13,.08,16),cardMat('#dfb17b'));
    tip.position.y=.2;antenna.add(tip);
    for(const sign of [-1,1]){
      const id=sign<0?'armL':'armR';
      const arm=add(id,new THREE.Mesh(new THREE.BoxGeometry(.42,.95,.56),cardMat(sign<0?'#c28a50':'#d4a168')));
      arm.position.set(sign*.81,-.04,.22);
      const hand=new THREE.Mesh(new THREE.BoxGeometry(.3,.14,.5),cardMat('#dfb17b'));
      hand.position.y=-.51;arm.add(hand);
    }
    const pack = add('pack',new THREE.Mesh(new THREE.BoxGeometry(.78,.75,.28),cardMat('#d4a168')));
    pack.position.set(0,.005,-.54);
    for(const sign of [-1,1]){
      const foot=add(sign<0?'footL':'footR',new THREE.Mesh(new THREE.BoxGeometry(.38,.4,.55),cardMat('#c28a50')));
      foot.position.set(sign*.34,-.8,.06);
    }
    return parts;
  }
  const line=TapeTools.crossSeam, fold=TapeTools.foldEdge, root=TapeTools.rootL;
  registerQuestion({
    id:'L4_robot_a',level:'L4',levelName:'高阶',object:'纸箱机器人',
    build:buildRobot,baseIds:['torso'],partIds:['torso','head','antenna','armL','armR','pack','footL','footR'],supports:{antenna:'head'},
    yaw:.5,pitch:.22,queue:'RYBRY',open:2,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['torso'],over:['r2'],segs:line([-.4,0,.405],[.4,0,.405],'+z')},
      {id:'r2',c:'R',bind:['torso'],segs:line([0,-.44,.405],[0,.44,.405],'+z')},
      {id:'r3',c:'R',bind:['head','torso'],segs:line([-.29,.34,.405],[-.29,.96,.405],'+z')},
      {id:'r4',c:'R',bind:['head','torso'],segs:line([.29,.34,.405],[.29,.96,.405],'+z')},
      {id:'r5',c:'R',bind:['footL','torso'],segs:fold([-.34,-.38,.405],[-.34,-.6,.405],[-.34,-.98,.34],'+z','+z')},
      {id:'r6',c:'R',bind:['pack','torso'],segs:fold([-.27,.54,-.405],[-.27,.38,-.405],[-.27,.38,-.68],'-z','+y')},
      {id:'y1',c:'Y',bind:['head'],over:['y2'],segs:line([.455,.92,-.27],[.455,.92,.27],'+x')},
      {id:'y2',c:'Y',bind:['head'],segs:line([.455,.68,0],[.455,1.15,0],'+x')},
      {id:'y3',c:'Y',bind:['antenna','head'],segs:root([0,1.48,.085],[0,1.2,.085],[0,1.2,.34],'+z','+y')},
      {id:'y4',c:'Y',bind:['antenna','head'],segs:root([0,1.48,-.085],[0,1.2,-.085],[0,1.2,-.34],'-z','+y')},
      {id:'y5',c:'Y',bind:['armL','torso'],segs:root([-.595,.22,.46],[-.595,-.2,.46],[-.38,-.2,.405],'+x','+z')},
      {id:'y6',c:'Y',bind:['armR','torso'],segs:fold([1.0,.21,.505],[.605,.21,.505],[.38,.21,.405],'+z','+z')},
      {id:'b1',c:'B',bind:['pack'],over:['b2'],segs:line([-.29,.02,-.685],[.29,.02,-.685],'-z')},
      {id:'b2',c:'B',bind:['pack'],segs:line([0,-.28,-.685],[0,.3,-.685],'-z')},
      {id:'b3',c:'B',bind:['footR','torso'],segs:fold([.34,-.38,.405],[.34,-.6,.405],[.34,-.98,.34],'+z','+z')},
    ],
  });
})();
