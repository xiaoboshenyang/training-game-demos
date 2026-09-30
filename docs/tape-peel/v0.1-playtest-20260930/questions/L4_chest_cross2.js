// L4 套娃宝箱：把手、锁、底托作为所属大部件装饰一起移动，保留五块独立外板。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L6_chest_a');
  if(!source)throw new Error('Missing L6_chest_a');
  const groupedFrom={handleL:'left',handleR:'right',lock:'lid',tray:'core'};
  function build(){const parts=source.build();for(const [childId,parentId] of Object.entries(groupedFrom)){const child=parts[childId],parent=parts[parentId];child.mesh.position.sub(parent.mesh.position);parent.mesh.add(child.mesh);delete parts[childId];}return parts;}
  const keep=new Set(["g1","g2","g4","b1","b2","y1","y6","g6","r2","r4","r5","y4"]),colors={'g1':'R','g2':'R','g4':'R','b1':'R','b2':'R','y1':'R','y6':'Y','g6':'Y','r2':'Y','r4':'Y','r5':'Y','y4':'Y'};
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:t.bind.filter(id=>!groupedFrom[id]),over:(t.over||[]).filter(id=>keep.has(id)),hiddenBy:t.hiddenBy?[...t.hiddenBy]:undefined,segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const extra=tapes.find(t=>t.id==='g6');extra.bind=['front'];extra.hiddenBy=[];extra.segs=TapeTools.crossSeam([.2,-.53,.595],[.2,.42,.595],'+z');
  tapes.push({id:'f1',c:'B',bind:['front'],over:[],segs:TapeTools.crossSeam([.52,-.53,.595],[.52,.42,.595],'+z')},{id:'s1',c:'B',bind:['front'],over:[],segs:TapeTools.crossSeam([.8,-.53,.595],[.8,.42,.595],'+z')},{id:'s2',c:'B',bind:['back'],over:[],segs:TapeTools.crossSeam([-.45,-.2,-.595],[-.45,.25,-.595],'-z')});
  registerQuestion({...source,id:'L4_chest_cross2',modelId:'chest',sourceQuestionId:source.id,level:'L4',levelName:'高阶',object:'套娃宝箱·跨级候选',review:'pending',build,groupedFrom,partIds:source.partIds.filter(id=>!groupedFrom[id]),baseIds:['core'],supports:{lid:'back'},queue:'RYBRY',open:2,yaw:2.6,pitch:.24,tapes});
})();
