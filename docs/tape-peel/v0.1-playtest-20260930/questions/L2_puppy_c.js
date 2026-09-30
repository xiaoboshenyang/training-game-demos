// L2 小狗 C：一侧头带绕到后脑，身侧与后腹底面重新分布。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_puppy_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge;
  get('r4').segs=fold([-.2,.56,.12],[-.2,.025,.12],[-.2,.025,-.02],'-z','+y');
  get('r5').segs=line([.05,-.55,-.88],[.05,-.15,-.88],'-z');
  get('r6').segs=line([.38,-.55,.48],[.38,-.15,.48],'+z');
  get('g1').segs=line([-.58,-.25,-.05],[-.58,-.25,.35],'-x');
  get('g2').segs=line([.58,-.45,-.7],[.58,-.45,-.25],'+x');
  get('g3').segs=line([-.22,-.73,-.6],[.22,-.73,-.6],'-y');
  get('r2').c='G';get('g2').c='R';
  get('r4').c='G';get('g3').c='R';
  registerQuestion({...source,id:'L2_puppy_c',review:'pending',yaw:-2.4,pitch:.29,tapes});
})();
