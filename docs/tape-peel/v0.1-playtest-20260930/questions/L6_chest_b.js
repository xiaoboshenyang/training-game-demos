// 宝箱 B：将压叠交点移到相对的外板和盖边，内芯仍在外壳落下后出现。
(() => {
  const original=QUESTION_BANK.find(q=>q.id==='L6_chest_a');
  const tapes=original.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],hiddenBy:[...(t.hiddenBy||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const set=(id,patch)=>Object.assign(tapes.find(t=>t.id===id),patch);
  const line=TapeTools.crossSeam,wrap=TapeTools.wrap;
  set('r2',{c:'Y',segs:line([.16,-.55,-.595],[.74,-.55,-.595],'-z')});
  set('y2',{c:'R',segs:line([.52,-.985,-.42],[.52,-.985,.42],'-y')});
  set('r4',{segs:line([.12,-.05,.595],[.72,-.05,.595],'+z')});
  set('g1',{segs:line([.42,-.57,.595],[.42,.45,.595],'+z')});
  set('r5',{segs:line([-.72,-.05,-.595],[-.12,-.05,-.595],'-z')});
  set('g2',{segs:line([-.42,-.57,-.595],[-.42,.45,-.595],'-z')});
  set('r3',{segs:line([-.45,-.985,-.37],[-.45,-.985,.37],'-y')});
  set('g5',{segs:line([-.72,-.985,0],[-.18,-.985,0],'-y')});
  set('y4',{segs:wrap([[.78,.825,0],[.26,.825,0],[.26,.825,-.59],[.26,.43,-.59]],['+y','+y','-z'])});
  set('b2',{segs:TapeTools.foldEdge([.55,.825,.43],[.55,.825,-.59],[.55,.43,-.59],'+y','-z')});
  set('y1',{segs:line([-.37,.165,-.26],[.37,.165,-.26],'+y')});
  set('g6',{segs:line([-.39,.165,.03],[.39,.165,.03],'+y')});
  registerQuestion({
    id:'L6_chest_b',level:'L6',levelName:'宗师',object:'套娃宝箱',review:'pending',
    build:original.build,baseIds:[...original.baseIds],partIds:[...original.partIds],supports:{...original.supports},
    yaw:-.35,pitch:.2,queue:'RYGBRGY',open:2,score:55,tapes,
  });
})();
