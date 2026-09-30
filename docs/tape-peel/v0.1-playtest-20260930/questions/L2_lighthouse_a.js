// L2 纸板小灯塔：塔身托平台、灯室、尖顶；正背侧面及底面都要找带。
(() => {
  function buildLighthouse() {
    const parts={};
    const add=(id,mesh,base=false)=>{
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,20),edgeMat));
      parts[id]={id,mesh,base,released:false};
      return mesh;
    };
    const tower=add('tower',new THREE.Mesh(new THREE.BoxGeometry(.9,1.8,.9),cardMat('#c9955c')),true);
    tower.position.y=-.05;
    const door=new THREE.Mesh(new THREE.BoxGeometry(.27,.48,.018),cardMat('#c28a50'));
    door.position.set(0,-.48,.46);
    tower.add(door);

    const deckShape=new THREE.Shape();
    deckShape.moveTo(-.625,-.625);deckShape.lineTo(.625,-.625);
    deckShape.lineTo(.625,.625);deckShape.lineTo(-.625,.625);deckShape.closePath();
    const opening=new THREE.Path();
    opening.moveTo(-.25,-.25);opening.lineTo(-.25,.25);
    opening.lineTo(.25,.25);opening.lineTo(.25,-.25);opening.closePath();
    deckShape.holes.push(opening);
    const deckGeometry=new THREE.ExtrudeGeometry(deckShape,{depth:.13,bevelEnabled:false});
    deckGeometry.rotateX(Math.PI/2);
    const deck=add('deck',new THREE.Mesh(deckGeometry,cardMat('#dfb17b')));
    deck.position.y=.98;
    const lantern=add('lantern',new THREE.Mesh(new THREE.BoxGeometry(.72,.52,.72),cardMat('#e3b981')));
    lantern.position.y=1.24;
    for(const side of [-1,1]) {
      const front=new THREE.Mesh(new THREE.BoxGeometry(.1,.25,.015),cardMat('#c28a50'));
      front.position.set(0,0,side*.369);
      lantern.add(front);
      const lateral=new THREE.Mesh(new THREE.BoxGeometry(.015,.25,.1),cardMat('#c28a50'));
      lateral.position.set(side*.369,0,0);
      lantern.add(lateral);
    }
    const roof=add('roof',new THREE.Mesh(new THREE.BoxGeometry(1.1,.12,1.1),cardMat('#d4a168')));
    roof.position.y=1.56;
    const point=new THREE.Mesh(new THREE.ConeGeometry(.55*Math.SQRT2,.32,4),cardMat('#e0b47c'));
    point.geometry.rotateY(Math.PI/4);
    point.position.y=.22;
    roof.add(point);
    return parts;
  }

  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge,wrap=TapeTools.wrap;
  registerQuestion({
    id:'L2_lighthouse_a',level:'L2',levelName:'初阶',object:'纸板小灯塔',review:'pending',
    build:buildLighthouse,baseIds:['tower'],partIds:['tower','deck','lantern','roof'],
    supports:{lantern:'deck',roof:'lantern'},yaw:.5,pitch:.22,queue:'RGR',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['deck','tower'],segs:fold([.45,.43,-.18],[.45,.85,-.18],[.55,.85,-.18],'+x','-y')},
      {id:'r2',c:'R',bind:['deck','tower'],segs:fold([.18,.43,-.45],[.18,.85,-.45],[.18,.85,-.55],'-z','-y')},
      {id:'r3',c:'R',bind:['lantern','deck'],segs:fold([.2,.98,.55],[.2,.98,.36],[.2,1.39,.36],'+y','+z')},
      {id:'r4',c:'R',bind:['lantern','deck'],segs:fold([-.55,.98,-.2],[-.36,.98,-.2],[-.36,1.39,-.2],'+y','-x')},
      {id:'r5',c:'R',bind:['roof','lantern','deck'],segs:wrap([[.55,.98,.2],[.36,.98,.2],[.36,1.5,.2],[.48,1.5,.2]],['+y','+x','-y'])},
      {id:'r6',c:'R',bind:['tower'],segs:line([0,.2,.455],[0,.6,.455],'+z')},
      {id:'g1',c:'G',bind:['roof','lantern','deck'],segs:wrap([[-.2,.98,-.55],[-.2,.98,-.36],[-.2,1.5,-.36],[-.2,1.5,-.48]],['+y','-z','-y'])},
      {id:'g2',c:'G',bind:['tower'],segs:line([-.22,-.62,-.455],[-.22,-.2,-.455],'-z')},
      {id:'g3',c:'G',bind:['tower'],segs:line([-.22,-.955,.1],[.22,-.955,.1],'-y')},
    ],
  });
})();
