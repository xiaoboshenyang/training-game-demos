// L2 纸箱小房子：四周、屋顶和底面都有胶带；没有压叠。
(() => {
  const roofAngle = Math.atan2(.6, .85);
  const leftNormal = V(-Math.sin(roofAngle), Math.cos(roofAngle), 0);
  const rightNormal = V(Math.sin(roofAngle), Math.cos(roofAngle), 0);

  function buildHouse() {
    const parts = {};
    const add = (id, mesh, base = false) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 20), edgeMat));
      parts[id] = { id, mesh, base, released:false };
      return mesh;
    };
    const wall = add('wall', new THREE.Mesh(new THREE.BoxGeometry(1.6,1.65,1.5),cardMat('#c9955c')),true);
    wall.position.y = -.25;
    const door = new THREE.Mesh(new THREE.BoxGeometry(.36,.66,.025),cardMat('#c28a50'));
    door.position.set(0,-.495,.765);
    wall.add(door);
    for(const side of [-1,1]) {
      const id=side<0?'roofL':'roofR';
      const roof=add(id,new THREE.Mesh(new THREE.BoxGeometry(.98,.14,1.7),cardMat(side<0?'#dfb17b':'#d4a168')));
      roof.position.set(side*.36,.8,0);
      roof.rotation.z=-side*roofAngle;
    }
    const chimney=add('chimney',new THREE.Mesh(new THREE.BoxGeometry(.34,.54,.32),cardMat('#c28a50')));
    chimney.position.set(.4,1.11,-.32);
    return parts;
  }

  const line=TapeTools.crossSeam, slope=TapeTools.slopeFold;
  registerQuestion({
    id:'L2_house_a',level:'L2',levelName:'初阶',object:'纸箱小房子',review:'pending',
    build:buildHouse,baseIds:['wall'],partIds:['wall','roofL','roofR','chimney'],supports:{chimney:'roofR'},
    yaw:.35,pitch:.25,queue:'RGR',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['roofL','wall'],segs:slope([-.52,.78,.3],[-.8,.575,.3],[-.8,-.13,.3],leftNormal,'-x')},
      {id:'r2',c:'R',bind:['roofR','wall'],segs:slope([.52,.78,.35],[.8,.575,.35],[.8,-.13,.35],rightNormal,'+x')},
      {id:'r3',c:'R',bind:['chimney','roofR'],segs:TapeTools.foldEdge([.4,1.29,-.155],[.4,.865,-.155],[.4,.865,.27],'+z',rightNormal)},
      {id:'r4',c:'R',bind:['wall'],segs:line([-.43,.27,-.755],[-.43,-.78,-.755],'-z')},
      {id:'r5',c:'R',bind:['wall'],segs:line([-.805,-.43,-.52],[-.805,-.43,.19],'-x')},
      {id:'r6',c:'R',bind:['wall'],segs:line([-.51,-1.08,.1],[.51,-1.08,.1],'-y')},
      {id:'g1',c:'G',bind:['wall'],segs:line([.48,.3,.755],[.48,-.74,.755],'+z')},
      {id:'g2',c:'G',bind:['wall'],segs:line([.805,-.43,-.4],[.805,-.43,.35],'+x')},
      {id:'g3',c:'G',bind:['wall'],segs:line([.43,.27,-.755],[.43,-.78,-.755],'-z')},
    ],
  });
})();
