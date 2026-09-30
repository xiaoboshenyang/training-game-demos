// 潜水艇 C：红色提前松开潜望镜，船尾带留到黄色轮次。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_submarine_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id),line=TapeTools.crossSeam;
  get('r1').segs=line([-.81,-.27,.455],[-.29,-.27,.455],'+z');
  get('r2').segs=line([-.58,-.62,.455],[-.58,-.11,.455],'+z');
  get('r3').segs=line([-.37,-.05,-.455],[-.37,.35,-.455],'-z');
  get('r4').segs=line([-1.08,.055,.23],[-.72,.055,.23],'+y');
  get('r5').segs=line([.72,-.6,.455],[1.08,-.6,.455],'+z');
  get('r5').c='Y';get('y2').c='R';
  registerQuestion({...source,id:'L3_submarine_c',review:'pending',yaw:.65,pitch:.25,tapes});
})();
