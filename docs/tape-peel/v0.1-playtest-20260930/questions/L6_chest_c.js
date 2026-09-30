// 宝箱 C：前后板交点重排，盖边交点移到左侧，底托两带不再交叉。
(() => {
  const original=QUESTION_BANK.find(q=>q.id==='L6_chest_a');
  const tapes=original.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],hiddenBy:[...(t.hiddenBy||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const set=(id,patch)=>Object.assign(tapes.find(t=>t.id===id),patch);
  const line=TapeTools.crossSeam,wrap=TapeTools.wrap;
  set('r2',{c:'Y'});
  set('y2',{c:'R'});
  set('r4',{segs:line([-.54,-.05,.595],[.06,-.05,.595],'+z')});
  set('g1',{segs:line([-.24,-.57,.595],[-.24,.45,.595],'+z')});
  set('r5',{segs:line([-.06,-.05,-.595],[.54,-.05,-.595],'-z')});
  set('g2',{segs:line([.24,-.57,-.595],[.24,.45,-.595],'-z')});
  // 两侧把手挡住后半块侧板，三层交叉保留在前半面。
  set('r3',{over:[],segs:line([.1,-.985,-.37],[.1,-.985,.37],'-y')});
  set('g5',{segs:line([-.65,-.985,.49],[-.2,-.985,.49],'-y')});
  set('y4',{segs:wrap([[-.89,.825,0],[-.39,.825,0],[-.39,.825,-.59],[-.39,.43,-.59]],['+y','+y','-z'])});
  set('b2',{segs:TapeTools.foldEdge([-.7,.825,.43],[-.7,.825,-.59],[-.7,.43,-.59],'+y','-z')});
  set('y1',{segs:line([-.37,.165,.3],[.37,.165,.3],'+y')});
  set('g6',{segs:line([-.39,.165,-.1],[.39,.165,-.1],'+y')});
  registerQuestion({
    id:'L6_chest_c',level:'L6',levelName:'宗师',object:'套娃宝箱',review:'pending',
    build:original.build,baseIds:[...original.baseIds],partIds:[...original.partIds],supports:{...original.supports},
    yaw:.75,pitch:.2,queue:'RYGBRGY',open:2,score:55,tapes,
  });
})();
