// L6 小卡车：车头、四轮和保险杠并入车架；车厢与篷盖仍独立掉落。
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
    {id:'c4',c:'R',over:[],bind:['chassis'],segs:line([.8,-.985,-.35],[.8,-.985,.35],'-y')},
    {id:'c5',c:'B',over:[],bind:['chassis'],segs:line([-.8,-.985,-.35],[-.8,-.985,.35],'-y')},
    {id:'e1',c:'B',over:[],bind:['chassis'],segs:line([1.155,-.85,-.35],[1.155,-.85,.35],'+x')},
    {id:'d3',c:'B',over:[],bind:['bed'],segs:line([1.455,-.52,-.25],[1.455,.03,-.25],'+x')}
  );
  tapes.push(
    {id:'h1',c:'G',bind:['bed'],over:['r5','g2'],segs:line([-.2,-.5,.505],[.8,0,.505],'+z')},
    {id:'h2',c:'G',bind:['chassis'],over:[],segs:line([-.7,.175,-.3],[-.7,.175,.3],'+y')},
    {id:'h3',c:'G',bind:['bed'],over:[],segs:line([1.455,-.45,.25],[1.455,.08,.25],'+x')}
  );
  const tuned={r4:'R',r5:'B',y2:'G',y6:'B',g1:'G',g2:'Y',b3:'G',c1:'R',c2:'Y',c3:'Y',d1:'R',c4:'R',c5:'Y',e1:'Y',d3:'Y',h1:'B',h2:'R',h3:'R'};
  for(const tape of tapes)tape.c=tuned[tape.id];
  registerQuestion({...source,id:'L6_truck_cross2',modelId:'truck',sourceQuestionId:source.id,level:'L6',levelName:'宗师',object:'纸箱小卡车·跨级候选',review:'pending',build,groupedFrom,partIds:source.partIds.filter(id=>!groupedFrom[id]),baseIds:['chassis'],supports:{cover:'bed'},queue:'RYGYRB',open:2,yaw:2.6,pitch:.24,tapes});
})();

