// L2 小灯塔 B：平台、灯室、顶盖改从另一圈寻找，塔身侧带转到左右。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L2_lighthouse_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge,wrap=TapeTools.wrap;
  get('r1').segs=fold([-.45,.43,.18],[-.45,.85,.18],[-.55,.85,.18],'-x','-y');
  get('r2').segs=fold([-.18,.43,.45],[-.18,.85,.45],[-.18,.85,.55],'+z','-y');
  get('r3').segs=fold([-.2,.98,-.55],[-.2,.98,-.36],[-.2,1.39,-.36],'+y','-z');
  get('r4').segs=fold([.55,.98,.2],[.36,.98,.2],[.36,1.39,.2],'+y','+x');
  get('r5').segs=wrap([[-.55,.98,.2],[-.36,.98,.2],[-.36,1.5,.2],[-.48,1.5,.2]],['+y','-x','-y']);
  get('r6').segs=line([.455,-.4,.1],[.455,0,.1],'+x');
  get('g1').segs=wrap([[-.2,.98,.55],[-.2,.98,.36],[-.2,1.5,.36],[-.2,1.5,.48]],['+y','+z','-y']);
  get('g2').segs=line([-.455,.18,-.2],[-.455,.6,-.2],'-x');
  get('g3').segs=line([.1,-.955,-.22],[.1,-.955,.22],'-y');
  get('r1').c='G';get('g2').c='R';
  get('r5').c='G';get('g1').c='R';
  registerQuestion({...source,id:'L2_lighthouse_b',review:'pending',yaw:2.35,pitch:.2,tapes});
})();
