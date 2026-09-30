// L5 卡车 C：后轮换色，车头、车厢及盖板交叉点另排一套。
(() => {
  const source=QUESTION_BANK.find(q=>q.id==='L5_truck_a');
  const tapes=source.tapes.map(t=>({...t,segs:t.segs.slice(),over:(t.over||[]).slice()}));
  const get=id=>tapes.find(t=>t.id===id);
  const line=TapeTools.crossSeam;
  get('r1').segs=line([-1.105,.06,-.3],[-1.105,-.715,-.3],'-x');
  get('r4').segs=line([-.55,-.6,.455],[-.55,.05,.455],'+z');
  get('r5').segs=line([.93,-.58,.505],[.93,.08,.505],'+z');
  get('y4').segs=line([-.18,.335,-.16],[.88,.335,-.16],'+y');
  get('b1').segs=line([.12,.335,-.42],[.12,.335,.42],'+y');
  get('b3').segs=line([1.34,-.735,-.4],[1.34,-.735,.4],'-y');
  get('y6').segs=line([1.04,.325,-.525],[1.04,-.18,-.505],'-z');
  get('r3').c='Y';get('y3').c='R';
  registerQuestion({...source,id:'L5_truck_c',review:'pending',yaw:-2.55,pitch:.3,tapes});
})();


