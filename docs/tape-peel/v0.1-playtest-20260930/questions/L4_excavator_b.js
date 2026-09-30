// 挖掘机 B：配重与铲板带移到低处，驾驶室压带改为上沿。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_excavator_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id),line=TapeTools.crossSeam;
  get('r5').segs=line([-.99,-.66,-.43],[-.69,-.66,-.43],'-z');
  get('r6').segs=line([.69,-.66,-.43],[.99,-.66,-.43],'-z');
  get('y1').segs=line([-.52,-.35,.43],[-.52,.35,.43],'+z');
  get('b1').segs=line([-.63,.35,.43],[-.4,-.35,.43],'+z');
  get('b2').segs=line([-.99,-.43,.43],[-.69,-.43,.43],'+z');
  get('b3').segs=line([.69,-.43,.43],[.99,-.43,.43],'+z');
  get('r5').c='Y';get('y4').c='R';
  registerQuestion({...source,id:'L4_excavator_b',review:'pending',yaw:-2.4,pitch:.27,tapes});
})();
