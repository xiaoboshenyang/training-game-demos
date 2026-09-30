// L2 小狗 B：头部固定带转到后脑，躯干胶带换到另一圈和前腹底面。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_puppy_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge;
  get('r3').segs=fold([.2,.56,.12],[.2,.025,.12],[.2,.025,-.02],'-z','+y');
  get('r4').segs=fold([-.2,.56,.12],[-.2,.025,.12],[-.2,.025,-.02],'-z','+y');
  get('r5').segs=line([.1,-.55,-.88],[.1,-.15,-.88],'-z');
  get('r6').segs=line([-.28,-.55,.48],[-.28,-.15,.48],'+z');
  get('g1').segs=line([-.58,-.5,-.55],[-.58,-.5,-.1],'-x');
  get('g2').segs=line([.58,-.1,-.55],[.58,-.1,-.1],'+x');
  get('g3').segs=line([-.22,-.73,.23],[.22,-.73,.23],'-y');
  get('r1').c='G';get('g1').c='R';
  get('r6').c='G';get('g2').c='R';
  registerQuestion({...source,id:'L2_puppy_b',review:'pending',yaw:2.55,pitch:.23,tapes});
})();
