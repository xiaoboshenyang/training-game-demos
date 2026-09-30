// L2 房子 C：屋面、墙面和底面另排一套；无压叠。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_house_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const angle=Math.atan2(.6,.85),L=V(-Math.sin(angle),Math.cos(angle),0),R=V(Math.sin(angle),Math.cos(angle),0);
  get('r1').segs=TapeTools.slopeFold([-.52,.78,-.42],[-.8,.575,-.42],[-.8,-.13,-.42],L,'-x');
  get('r2').segs=TapeTools.slopeFold([.52,.78,.12],[.8,.575,.12],[.8,-.13,.12],R,'+x');
  get('r4').segs=TapeTools.crossSeam([-.4,.27,-.755],[-.4,-.78,-.755],'-z');
  get('r5').segs=TapeTools.crossSeam([-.805,-.65,-.52],[-.805,-.65,.19],'-x');
  get('r6').segs=TapeTools.crossSeam([-.51,-1.08,.42],[.51,-1.08,.42],'-y');
  get('g1').segs=TapeTools.crossSeam([-.5,.3,.755],[-.5,-.74,.755],'+z');
  get('g2').segs=TapeTools.crossSeam([.805,-.18,-.4],[.805,-.18,.35],'+x');
  get('g3').segs=TapeTools.crossSeam([.29,.27,-.755],[.29,-.78,-.755],'-z');
  get('r2').c='G';get('g2').c='R';
  get('r4').c='G';get('g3').c='R';
  registerQuestion({...source,id:'L2_house_c',review:'pending',yaw:-2.25,pitch:.3,tapes});
})();

