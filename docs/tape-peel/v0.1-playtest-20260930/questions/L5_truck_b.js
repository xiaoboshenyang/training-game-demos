// L5 卡车 B：前轮两侧换色，车头与车厢压带及底部藏带移位。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L5_truck_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice(),over:(t.over||[]).slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam;
  get('r1').segs=line([-1.105,.06,-.32],[-1.105,-.715,-.32],'-x');
  get('r4').segs=line([-.85,-.6,.455],[-.85,.05,.455],'+z');
  get('r5').segs=line([.78,-.58,.505],[.78,.08,.505],'+z');
  get('y4').segs=line([-.18,.335,.19],[.88,.335,.19],'+y');
  get('b1').segs=line([.65,.335,-.42],[.65,.335,.42],'+y');
  get('b3').segs=line([1.33,-.735,-.4],[1.33,-.735,.4],'-y');
  get('g3').segs=line([.6,-1.045,-.635],[.9,-1.045,-.635],'+z');
  get('r2').c='Y';get('y3').c='R';
  registerQuestion({...source,id:'L5_truck_b',review:'pending',yaw:2.25,pitch:.25,tapes});
})();



