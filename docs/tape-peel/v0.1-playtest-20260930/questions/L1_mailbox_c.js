// 纸板邮筒 C：先拆翻板红带，后拆上盖绿带；与 B 的横向翻板带不同。
(() => {
  const original = QUESTION_BANK.find(q => q.id === 'L1_mailbox_a');
  const build = () => {
    const parts = original.build();
    parts.flap.mesh.geometry = new THREE.BoxGeometry(1.0, .68, .32);
    parts.flap.mesh.children[0].geometry = new THREE.EdgesGeometry(parts.flap.mesh.geometry, 20);
    parts.flap.mesh.position.z = .71;
    return parts;
  };
  const lidTape = x => TapeTools.foldEdge([x,1.27,.12],[x,1.27,.55],[x,.73,.55],'+y','+z');
  const flapTape = x => TapeTools.wrap([[x,.08,.87],[x,-.46,.87],[x,-.46,.55],[x,-.78,.55]],['+z','-y','+z']);
  registerQuestion({
    id:'L1_mailbox_c',level:'L1',levelName:'基础',object:'纸板邮筒',review:'pending',
    build,baseIds:['body'],partIds:['body','lid','flap'],supports:{},
    yaw:-.18,pitch:.28,queue:'RG',open:1,score:55,
    tapes:[
      {id:'r1',c:'G',bind:['lid','body'],segs:lidTape(-.48)},
      {id:'r2',c:'R',bind:['flap','body'],segs:flapTape(0)},
      {id:'r3',c:'R',bind:['flap','body'],segs:flapTape(.3)},
      {id:'g1',c:'R',bind:['flap','body'],segs:flapTape(-.3)},
      {id:'g2',c:'G',bind:['lid','body'],segs:lidTape(-.05)},
      {id:'g3',c:'G',bind:['lid','body'],segs:lidTape(.38)},
    ],
  });
})();
