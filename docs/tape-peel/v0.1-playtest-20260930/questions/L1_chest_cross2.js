// L1 套娃宝箱：把手、锁、底托作为所属大部件装饰一起移动，保留五块独立外板。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L6_chest_a');
  if(!source)throw new Error('Missing L6_chest_a');
  const groupedFrom={handleL:'left',handleR:'right',lock:'lid',tray:'core'};
  function build(){const parts=source.build();for(const [childId,parentId] of Object.entries(groupedFrom)){const child=parts[childId],parent=parts[parentId];child.mesh.position.sub(parent.mesh.position);parent.mesh.add(child.mesh);delete parts[childId];}return parts;}
  const keep=new Set(["g1","g2","g4","b1","b2","y1"]),colors={'g1':'R','g2':'R','g4':'R','b1':'Y','b2':'Y','y1':'Y'};
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:t.bind.filter(id=>!groupedFrom[id]),over:(t.over||[]).filter(id=>keep.has(id)),hiddenBy:t.hiddenBy?[...t.hiddenBy]:undefined,segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  
  registerQuestion({...source,id:'L1_chest_cross2',modelId:'chest',sourceQuestionId:source.id,level:'L1',levelName:'基础',object:'套娃宝箱·跨级候选',review:'pending',build,groupedFrom,partIds:source.partIds.filter(id=>!groupedFrom[id]),baseIds:['core'],supports:{lid:'back'},queue:'RY',open:1,yaw:2.6,pitch:.24,tapes});
})();
