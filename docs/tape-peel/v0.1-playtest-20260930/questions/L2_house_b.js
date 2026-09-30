// L2 房子 B：屋顶带移到背侧，墙面与底面重新分布；无压叠。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_house_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const angle=Math.atan2(.6,.85),L=V(-Math.sin(angle),Math.cos(angle),0),R=V(Math.sin(angle),Math.cos(angle),0);
  get('r1').segs=TapeTools.slopeFold([-.52,.78,-.35],[-.8,.575,-.35],[-.8,-.13,-.35],L,'-x');
  get('r2').segs=TapeTools.slopeFold([.52,.78,.55],[.8,.575,.55],[.8,-.13,.55],R,'+x');
  get('r4').segs=TapeTools.crossSeam([-.33,.27,-.755],[-.33,-.78,-.755],'-z');
  get('r5').segs=TapeTools.crossSeam([-.805,-.14,-.52],[-.805,-.14,.19],'-x');
  get('r6').segs=TapeTools.crossSeam([-.51,-1.08,-.3],[.51,-1.08,-.3],'-y');
  get('g1').segs=TapeTools.crossSeam([-.46,.3,.755],[-.46,-.74,.755],'+z');
  get('g2').segs=TapeTools.crossSeam([.805,-.63,-.4],[.805,-.63,.35],'+x');
  get('g3').segs=TapeTools.crossSeam([.47,.27,-.755],[.47,-.78,-.755],'-z');
  get('r1').c='G';get('g1').c='R';
  registerQuestion({...source,id:'L2_house_b',review:'pending',yaw:2.7,pitch:.24,tapes});
})();


