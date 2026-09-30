// 衣柜 B：背板压带移到高处，蓝色背带上移，两只柜脚交换拆带颜色。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L4_wardrobe_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id),line=TapeTools.crossSeam;
  get('y2').segs=line([-.6,.55,-.33],[.6,.55,-.33],'-z');
  get('y3').segs=line([0,.25,-.33],[0,.85,-.33],'-z');
  get('b3').segs=line([-.5,-.2,-.33],[.5,-.2,-.33],'-z');
  get('r6').c='Y';get('y5').c='R';
  registerQuestion({...source,id:'L4_wardrobe_b',review:'pending',yaw:-2.35,pitch:.24,tapes});
})();
