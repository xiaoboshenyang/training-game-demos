// 小熊 L6：躯干背面三层链，侧面和另一背面目标需要回查。
(()=>{
  const source=QUESTION_BANK.find(q=>q.id==='L4_bear_a');
  if(!source)throw new Error('Missing bear source');
  const tapes=source.tapes.map(t=>({...t,bind:[...t.bind],over:[...(t.over||[])],segs:t.segs.map(s=>({a:s.a.clone(),b:s.b.clone(),n:s.n.clone()}))}));
  const get=id=>tapes.find(t=>t.id===id),swap=(a,b)=>{[get(a).c,get(b).c]=[get(b).c,get(a).c];};
  swap('r1','b1');swap('r2','y1');swap('r5','r1');swap('r6','y4');
  get('b3').bind=['legR'];
  get('b3').segs=TapeTools.crossSeam([.475,-.835,-.2],[.475,-.835,.2],'+x');
  const line=TapeTools.crossSeam;
  tapes.push(
    {id:'g1',c:'G',bind:['torso'],over:['b1','b2'],segs:line([-.36,-.45,-.33],[.25,-.05,-.33],'-z')},
    {id:'g2',c:'G',bind:['torso'],segs:line([-.18,.32,-.33],[.18,.32,-.33],'-z')},
    {id:'g3',c:'G',bind:['head'],segs:line([-.405,.65,0],[-.405,1.2,0],'-x')}
  );
  const colors={r1:'Y',r2:'R',r3:'Y',r4:'R',r5:'B',r6:'R',y1:'R',y2:'G',y3:'Y',y4:'G',y5:'B',y6:'B',b1:'R',b2:'G',b3:'Y',g1:'Y',g2:'Y',g3:'R'};
  for(const t of tapes)t.c=colors[t.id];
  registerQuestion({...source,id:'L6_bear_cross2',modelId:'bear',sourceQuestionId:source.id,
    level:'L6',levelName:'宗师',object:'纸板小熊·跨级候选',review:'pending',
    yaw:2.8,pitch:.32,queue:'RRYGYB',open:2,tapes});
})();
