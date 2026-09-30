// 机器人 C：头缝改黄带、左臂改红带；交叉点与隐藏带换到另一侧。
(() => {
  const original=QUESTION_BANK.find(q=>q.id==='L4_robot_a');
  function build(){
    const parts=original.build();
    parts.armL.mesh.position.z=.12;parts.armR.mesh.position.z=.12;
    parts.footL.mesh.position.z=.13;parts.footR.mesh.position.z=.13;
    parts.antenna.mesh.geometry=new THREE.BoxGeometry(.25,.32,.25);
    const innerFlap=new THREE.Mesh(new THREE.BoxGeometry(.08,.55,.28),cardMat('#d4a168'));
    innerFlap.position.set(-.23,0,.45);parts.armR.mesh.add(innerFlap);
    return parts;
  }
  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge,root=TapeTools.rootL;
  registerQuestion({
    id:'L4_robot_c',level:'L4',levelName:'高阶',object:'纸箱机器人',review:'pending',
    build,partIds:original.partIds,baseIds:original.baseIds,supports:original.supports,
    yaw:.85,pitch:.18,queue:'RYBRY',open:2,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['torso'],over:['r2'],segs:line([-.43,.2,.405],[.43,.2,.405],'+z')},
      {id:'r2',c:'R',bind:['torso'],segs:line([-.13,-.4,.405],[-.13,.43,.405],'+z')},
      {id:'r3',c:'Y',bind:['head','torso'],segs:line([.25,.37,.405],[.25,1.07,.405],'+z')},
      {id:'r4',c:'R',bind:['footL','torso'],segs:line([-.34,-.37,.405],[-.34,-.91,.405],'+z')},
      {id:'r5',c:'R',bind:['footR','torso'],segs:line([.34,-.37,.405],[.34,-.91,.405],'+z')},
      {id:'r6',c:'R',bind:['pack','torso'],segs:fold([-.24,.54,-.405],[-.24,.38,-.405],[-.24,.38,-.68],'-z','+y')},
      {id:'y1',c:'Y',bind:['head'],over:['y2'],segs:line([.455,.94,-.29],[.455,.94,.29],'+x')},
      {id:'y2',c:'Y',bind:['head'],segs:line([.455,.65,-.07],[.455,1.14,-.07],'+x')},
      {id:'y3',c:'Y',bind:['antenna','head'],segs:root([.13,1.47,0],[.13,1.205,0],[.4,1.205,0],'+x','+y')},
      {id:'y4',c:'Y',bind:['antenna','head'],segs:root([-.13,1.47,0],[-.13,1.205,0],[-.4,1.205,0],'-x','+y')},
      {id:'y5',c:'R',bind:['armL','torso'],segs:line([-.96,-.22,.405],[-.31,-.22,.405],'+z')},
      {id:'y6',c:'Y',bind:['armR','torso'],segs:line([.96,.11,.405],[.31,.11,.405],'+z')},
      {id:'b1',c:'B',bind:['pack'],over:['b2'],segs:line([-.32,.13,-.685],[.32,.13,-.685],'-z')},
      {id:'b2',c:'B',bind:['pack'],segs:line([-.13,-.3,-.685],[-.13,.28,-.685],'-z')},
      {id:'b3',c:'B',bind:['armR'],segs:line([.535,-.28,.57],[.535,.22,.57],'-x')},
    ],
  });
})();
