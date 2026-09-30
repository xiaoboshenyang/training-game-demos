// L3 小卡车：车头、四轮和保险杠并入车架；车厢与篷盖仍独立掉落。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L5_truck_a');
  if(!source)throw new Error('Missing L5_truck_a');
  const groupedFrom={"cab":"chassis","wheelFL":"chassis","wheelFR":"chassis","wheelBL":"chassis","wheelBR":"chassis","bumper":"chassis"};
  function build(){const parts=source.build();for(const [childId,parentId] of Object.entries(groupedFrom)){const child=parts[childId],parent=parts[parentId];child.mesh.position.sub(parent.mesh.position);parent.mesh.add(child.mesh);delete parts[childId];}return parts;}
  const keep=new Set(["r4","r5","y2","y6","b3","g1","g2"]),colors={"r4":"R","r5":"Y","y2":"R","y6":"Y","b3":"R","g1":"R","g2":"Y"},line=TapeTools.crossSeam;
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:t.bind.map(id=>groupedFrom[id]||id).filter((id,i,a)=>a.indexOf(id)===i),over:(t.over||[]).filter(id=>keep.has(id)),segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  tapes.push(
    {id:'c1',c:'R',over:[],bind:['chassis'],segs:line([0,-.985,-.35],[0,-.985,.35],'-y')},
    {id:'c2',c:'Y',over:[],bind:['chassis'],segs:line([-.4,-.985,-.35],[-.4,-.985,.35],'-y')},
    {id:'c3',c:'Y',over:[],bind:['chassis'],segs:line([.4,-.985,-.35],[.4,-.985,.35],'-y')},
    {id:'d1',c:'Y',over:[],bind:['bed'],segs:line([-.25,-.45,-.505],[-.25,.05,-.505],'-z')},
    {id:'c4',c:'R',over:[],bind:['chassis'],segs:line([.8,-.985,-.35],[.8,-.985,.35],'-y')}
  );
  registerQuestion({...source,id:'L3_truck_cross2',modelId:'truck',sourceQuestionId:source.id,level:'L3',levelName:'中阶',object:'纸箱小卡车·跨级候选',review:'pending',build,groupedFrom,partIds:source.partIds.filter(id=>!groupedFrom[id]),baseIds:['chassis'],supports:{cover:'bed'},queue:'RYRY',open:1,yaw:2.6,pitch:.24,tapes});
})();
