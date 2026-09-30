// 纸板邮筒 B：上盖红带向左错位，绿带横穿加长的翻板并绕右沿贴回筒身。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_mailbox_a');
  const build = () => {
    const parts = original.build();
    parts.flap.mesh.geometry = new THREE.BoxGeometry(.8, .9, .32);
    parts.flap.mesh.children[0].geometry = new THREE.EdgesGeometry(parts.flap.mesh.geometry, 20);
    parts.flap.mesh.position.z = .71;
    return parts;
  };
  const lidTape = x => TapeTools.foldEdge([x,1.27,.12],[x,1.27,.55],[x,.73,.55],'+y','+z');
  const flapTape = y => TapeTools.wrap([[-.25,y,.87],[.4,y,.87],[.4,y,.55],[.72,y,.55]],['+z','+x','+z']);
  registerQuestion({
    id:'L1_mailbox_b',level:'L1',levelName:'基础',object:'纸板邮筒',review:'pending',
    build,baseIds:['body'],partIds:['body','lid','flap'],supports:{},
    yaw:.18,pitch:.32,queue:'RG',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['lid','body'],segs:lidTape(-.5)},
      {id:'r2',c:'G',bind:['flap','body'],segs:flapTape(.18)},
      {id:'r3',c:'R',bind:['lid','body'],segs:lidTape(-.1)},
      {id:'g1',c:'R',bind:['lid','body'],segs:lidTape(.3)},
      {id:'g2',c:'G',bind:['flap','body'],segs:flapTape(-.12)},
      {id:'g3',c:'G',bind:['flap','body'],segs:flapTape(-.42)},
    ],
  });
})();
