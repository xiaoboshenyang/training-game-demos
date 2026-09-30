// L2 玩具飞机 C：机翼根部偏后，尾翼斜向束带，绿带延伸到机身底部。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_airplane_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam,root=TapeTools.rootL;
  get('r1').segs=root([-.98,-.09,-.03],[-.28,-.09,-.03],[-.28,.15,-.03],'+y','-x');
  get('r2').segs=root([.98,-.09,-.03],[.28,-.09,-.03],[.28,.15,-.03],'+y','+x');
  get('r3').segs=TapeTools.wrap([[-.47,.22,-.97],[-.13,.22,-.73],[-.13,.22,-.48]],['+y','+y']);
  get('r4').segs=line([-.285,-.1,-.65],[-.285,-.1,-.25],'-x');
  get('r5').segs=line([.285,-.1,-.65],[.285,-.1,-.25],'+x');
  get('r6').segs=line([.1,-.225,.72],[.1,-.225,1.1],'-y');
  get('g1').segs=line([-.94,-.225,.32],[-.13,-.225,.32],'-y');
  get('g2').segs=line([.94,-.225,.32],[.13,-.225,.32],'-y');
  get('g3').segs=TapeTools.wrap([[.47,.22,-.97],[.13,.22,-.73],[.13,.22,-.48]],['+y','+y']);
  get('r2').c='G';get('g2').c='R';
  get('r6').c='G';get('g3').c='R';
  registerQuestion({...source,id:'L2_airplane_c',review:'pending',yaw:-2.15,pitch:.28,tapes});
})();
