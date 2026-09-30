// 潜水艇 B：改变船身与尾部贴点，并把船首带移入黄色轮次。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L3_submarine_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id),line=TapeTools.crossSeam;
  get('r1').segs=line([-.83,-.3,.455],[-.42,-.3,.455],'+z');
  get('r2').segs=line([-.58,-.6,.455],[-.58,-.06,.455],'+z');
  get('r3').segs=line([-.37,-.05,-.455],[-.37,.35,-.455],'-z');
  get('r4').segs=line([-1.08,.055,-.23],[-.72,.055,-.23],'+y');
  get('r4').c='Y';get('y3').c='R';
  registerQuestion({...source,id:'L3_submarine_b',review:'pending',yaw:-2.25,pitch:.28,tapes});
})();
