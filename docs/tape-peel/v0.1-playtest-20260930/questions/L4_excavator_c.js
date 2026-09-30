// 挖掘机 C：配重与铲板带靠上，背侧蓝带改到高位。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_excavator_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id),line=TapeTools.crossSeam;
  get('r5').segs=line([-.99,-.43,.43],[-.69,-.43,.43],'+z');
  get('r6').segs=line([.69,-.43,.43],[.99,-.43,.43],'+z');
  get('b2').segs=line([-.99,-.43,-.43],[-.69,-.43,-.43],'-z');
  get('r6').c='Y';get('y5').c='R';
  registerQuestion({...source,id:'L4_excavator_c',review:'pending',yaw:.8,pitch:.24,tapes});
})();
