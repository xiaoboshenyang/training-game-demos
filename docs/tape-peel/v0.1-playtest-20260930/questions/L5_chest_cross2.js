// L5 套娃宝箱：把手、锁、底托作为所属大部件装饰一起移动，保留五块独立外板。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L6_chest_a');
  if(!source)throw new Error('Missing L6_chest_a');
  const groupedFrom={handleL:'left',handleR:'right',lock:'lid',tray:'core'};
  function build(){const parts=source.build();for(const [childId,parentId] of Object.entries(groupedFrom)){const child=parts[childId],parent=parts[parentId];child.mesh.position.sub(parent.mesh.position);parent.mesh.add(child.mesh);delete parts[childId];}return parts;}
  const keep=new Set(["g1","g2","g4","b1","b2","y1","y6","g6","r2","r4","r5","y4"]),colors={'g1':'R','g2':'R','g4':'R','b1':'R','b2':'R','y1':'R','y6':'Y','g6':'Y','r2':'Y','r4':'Y','r5':'Y','y4':'Y'};
  const tapes=source.tapes.filter(t=>keep.has(t.id)).map(t=>({...t,c:colors[t.id],bind:t.bind.filter(id=>!groupedFrom[id]),over:(t.over||[]).filter(id=>keep.has(id)),hiddenBy:t.hiddenBy?[...t.hiddenBy]:undefined,segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const extra=tapes.find(t=>t.id==='g6');extra.bind=['front'];extra.hiddenBy=[];extra.segs=TapeTools.crossSeam([.2,-.53,.595],[.2,.42,.595],'+z');
  tapes.push({id:'f1',c:'B',bind:['front'],over:[],segs:TapeTools.crossSeam([.52,-.53,.595],[.52,.42,.595],'+z')},{id:'s1',c:'B',bind:['front'],over:[],segs:TapeTools.crossSeam([.8,-.53,.595],[.8,.42,.595],'+z')},{id:'s2',c:'B',bind:['back'],over:[],segs:TapeTools.crossSeam([-.45,-.2,-.595],[-.45,.25,-.595],'-z')});
  tapes.push(
    {id:'h1',c:'G',bind:['back'],over:[],segs:TapeTools.crossSeam([-.15,-.2,-.595],[-.15,.25,-.595],'-z')},
    {id:'h2',c:'G',bind:['right'],over:[],segs:TapeTools.crossSeam([.935,.28,-.3],[.935,.62,-.3],'+x')},
    {id:'h3',c:'G',bind:['core'],over:[],hiddenBy:['lid'],segs:TapeTools.crossSeam([-.37,.165,-.26],[.37,.165,-.26],'+y')}
  );
  const tuned={r2:'R',r4:'Y',r5:'Y',y1:'B',y4:'R',y6:'G',g1:'R',g2:'Y',g4:'R',g6:'Y',b1:'G',b2:'Y',f1:'R',s1:'B',s2:'Y',h1:'B',h2:'R',h3:'G'};
  for(const tape of tapes)tape.c=tuned[tape.id];
  registerQuestion({...source,id:'L5_chest_cross2',modelId:'chest',sourceQuestionId:source.id,level:'L5',levelName:'超凡',object:'套娃宝箱·跨级候选',review:'pending',build,groupedFrom,partIds:source.partIds.filter(id=>!groupedFrom[id]),baseIds:['core'],supports:{lid:'back'},queue:'YRBYGR',open:2,yaw:2.6,pitch:.24,tapes});
})();

