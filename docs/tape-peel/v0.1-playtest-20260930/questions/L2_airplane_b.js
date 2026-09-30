// L2 玩具飞机 B：机翼根部偏前，尾翼改横向束带，机身顶面留一条。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_airplane_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam,root=TapeTools.rootL;
  get('r1').segs=root([-.98,-.09,.32],[-.28,-.09,.32],[-.28,.15,.32],'+y','-x');
  get('r2').segs=root([.98,-.09,.32],[.28,-.09,.32],[.28,.15,.32],'+y','+x');
  get('r3').segs=TapeTools.wrap([[-.55,.22,-.91],[-.13,.22,-.91],[-.13,.22,-.5]],['+y','+y']);
  get('r4').segs=line([-.285,.09,-.7],[-.285,.09,-.28],'-x');
  get('r5').segs=line([.285,.09,-.7],[.285,.09,-.28],'+x');
  get('r6').segs=line([0,.225,.67],[0,.225,1.06],'+y');
  get('g1').segs=line([-.94,-.225,-.03],[-.13,-.225,-.03],'-y');
  get('g2').segs=line([.94,-.225,-.03],[.13,-.225,-.03],'-y');
  get('g3').segs=TapeTools.wrap([[.55,.22,-.91],[.13,.22,-.91],[.13,.22,-.5]],['+y','+y']);
  get('r1').c='G';get('g1').c='R';
  get('r3').c='G';get('g3').c='R';
  registerQuestion({...source,id:'L2_airplane_b',review:'pending',yaw:2.45,pitch:.32,tapes});
})();
