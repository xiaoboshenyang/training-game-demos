// 机器人 B：肩带改为前面跨缝；背包背面和手臂背面须转动寻找。
(() => {
  const original=QUESTION_BANK.find(q=>q.id==='L4_robot_a');
  function build(){
    const parts=original.build();
    // 让臂/脚的前表面与躯干齐平，跨缝带可以完整贴在纸板上。
    parts.armL.mesh.position.z=.12;parts.armR.mesh.position.z=.12;
    parts.footL.mesh.position.z=.13;parts.footR.mesh.position.z=.13;
    parts.antenna.mesh.geometry=new THREE.BoxGeometry(.25,.32,.25);
    const innerFlap=new THREE.Mesh(new THREE.BoxGeometry(.08,.55,.28),cardMat('#c28a50'));
    innerFlap.position.set(.23,0,.45);parts.armL.mesh.add(innerFlap);
    return parts;
  }
  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge,root=TapeTools.rootL;
  registerQuestion({
    id:'L4_robot_b',level:'L4',levelName:'高阶',object:'纸箱机器人',review:'pending',
    build,partIds:original.partIds,baseIds:original.baseIds,supports:original.supports,
    yaw:-.7,pitch:.22,queue:'RYBRY',open:2,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['torso'],over:['r2'],segs:line([-.46,-.18,.405],[.46,-.18,.405],'+z')},
      {id:'r2',c:'R',bind:['torso'],segs:line([.12,-.48,.405],[.12,.35,.405],'+z')},
      {id:'r3',c:'R',bind:['head','torso'],segs:line([-.22,.38,.405],[-.22,1.02,.405],'+z')},
      {id:'r4',c:'Y',bind:['footR','torso'],segs:line([.34,-.36,.405],[.34,-.9,.405],'+z')},
      {id:'r5',c:'R',bind:['footL','torso'],segs:line([-.34,-.36,.405],[-.34,-.9,.405],'+z')},
      {id:'r6',c:'R',bind:['pack','torso'],segs:fold([.25,.53,-.405],[.25,.38,-.405],[.25,.38,-.68],'-z','+y')},
      {id:'y1',c:'Y',bind:['head'],over:['y2'],segs:line([-.455,.87,-.29],[-.455,.87,.29],'-x')},
      {id:'y2',c:'Y',bind:['head'],segs:line([-.455,.65,.03],[-.455,1.13,.03],'-x')},
      {id:'y3',c:'Y',bind:['antenna','head'],segs:root([.13,1.47,0],[.13,1.205,0],[.4,1.205,0],'+x','+y')},
      {id:'y4',c:'Y',bind:['antenna','head'],segs:root([-.13,1.47,0],[-.13,1.205,0],[-.4,1.205,0],'-x','+y')},
      {id:'y5',c:'R',bind:['armL','torso'],segs:line([-.96,.12,.405],[-.31,.12,.405],'+z')},
      {id:'y6',c:'Y',bind:['armR','torso'],segs:line([.96,.26,.405],[.31,.26,.405],'+z')},
      {id:'b1',c:'B',bind:['pack'],over:['b2'],segs:line([-.32,-.08,-.685],[.32,-.08,-.685],'-z')},
      {id:'b2',c:'B',bind:['pack'],segs:line([.13,-.3,-.685],[.13,.28,-.685],'-z')},
      {id:'b3',c:'B',bind:['armL'],segs:line([-.535,-.28,.57],[-.535,.22,.57],'+x')},
    ],
  });
})();
