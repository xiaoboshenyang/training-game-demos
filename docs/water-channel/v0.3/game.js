// 水到渠成 · 本地试玩 Demo v0.3（候选）· 玩法规则 v0.3 候选（2026-10-09 计分与限时）
// 物理：正式引擎 round014-gates-hold-v1（sim.js / engine.js 原样复制）。画面：按 A3-1 生图的颜色与造型，用程序按真实 20×13 地图逐格绘制。
// 顶栏、暂停、反馈：公共游戏模板 v1.2.1（playtest，计时先不走）。
import {createGameShell} from './public-template/template.js';
const S=window.WaterSim,E=window.WaterEngine,T=S.T,B=S.B,LEVELS=window.DEMO_LEVELS;
const AW=1280,AH=728,C=48,F=C/B,BW=20*C,BH=13*C,BX=(AW-BW)/2,BY=40;
const COL={base:'#fff6e3',rock:'#a08b79',rockDot:'#8e7a69',dirt:'#f6d48b',dirtDot:'#e7bd6c',line:'#6b4a33',water:'#52c3f5',foam:'#eaf8ff',mud:'#8e7eab',mudStripe:'#a99cc4',
 spongeDry:'#bfd1a1',spongeHole:'#6c8450',spongeFull:'#86c0c6',spongeFullHole:'#3f7d88',drain:'#4f443c',drainSlot:'#231d1a',ivory:'#fffdf6',pipe:'#cfdde3',cream:'#fff3df',
 red:'#df4c4a',redDark:'#a3302e',navy:'#4f74a8',navyDark:'#30507e'};
const GROUP={red:{fill:COL.red,dark:COL.redDark,shape:'diamond'},navy:{fill:COL.navy,dark:COL.navyDark,shape:'triangle'}};
const params=new URLSearchParams(location.search);

let api=null,canvas,ctx,tools,idx=0,s=null,lv=null,history=[],drawing=null,paused=false,completed=false,handled=false,score=0,replaying=false,epoch=0;
let geo=null,rockLayer=null,pipeClip=null,dirtLayer=null,dirtDirty=true,lastBath=0,bathFlowUntil=0,pointer=null;
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
const L1=mk(AW,AH),L2=mk(AW,AH),L3=mk(AW,AH);

// ---------- 几何：按原始地图找机关 ----------
function comps(map,test){const H=map.length,W=map[0].length,seen=new Set(),res=[];
 for(let r=0;r<H;r++)for(let c=0;c<W;c++){if(!test(map[r][c])||seen.has(r*W+c))continue;const q=[[c,r]],cells=[];seen.add(r*W+c);
  while(q.length){const [x,y]=q.pop();cells.push([x,y]);for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=W||ny>=H||seen.has(ny*W+nx)||!test(map[ny][nx]))continue;seen.add(ny*W+nx);q.push([nx,ny]);}}
  const xs=cells.map(p=>p[0]),ys=cells.map(p=>p[1]);res.push({cells,x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)});}
 return res;}
function buildGeo(level){const map=level.map,cellGroup={};
 (level.gateGroups||[]).forEach(g=>{const color=level.groupColors[g.id]||'red';for(const [c,r] of g.switches)cellGroup[c+','+r]={id:g.id,color,hold:g.mode==='hold'};for(const [c,r] of g.gates)cellGroup[c+','+r]={id:g.id,color,hold:g.mode==='hold'};});
 const list=ch=>{const out=[];map.forEach((row,r)=>[...row].forEach((t,c)=>{if(t===ch)out.push({c,r,grp:cellGroup[c+','+r]||{id:null,color:'red',hold:false}});}));return out;};
 const outlets=comps(map,t=>t==='B'),bathW=210,bathH=36;
 // 每个出口一根竖管；有多个出口时在最底一行岩石里横向汇合，再接到同一个浴缸
 const legs=outlets.map(o=>({x:BX+(o.x0+o.x1+1)/2*C,y0:BY+(o.y1+1)*C-6}));
 const bx=legs.length?legs.reduce((a,l)=>a+l.x,0)/legs.length:BX+BW/2,joinY=BY+BH-C/2;
 const runs=legs.length>1?[...legs.map(l=>({x:l.x,y0:l.y0,y1:joinY})),{x:bx,y0:joinY,y1:AH}]:legs.map(l=>({x:l.x,y0:l.y0,y1:AH}));
 const flats=legs.length>1?[{x0:Math.min(bx,...legs.map(l=>l.x)),x1:Math.max(bx,...legs.map(l=>l.x)),y:joinY}]:[];
 return {sponges:comps(map,t=>t==='S'),drains:comps(map,t=>t==='X'),outlets,switches:list('k'),gates:list('g'),
  pipe:legs.length?{x:bx,runs,flats}:null,bath:{x:Math.max(BX,Math.min(BX+BW-bathW,bx-bathW/2)),y:BY+BH+10,w:bathW,h:bathH}};}
function pipeRects(t,half){for(const r of geo.pipe.runs)t.fillRect(r.x-half,r.y0,half*2,r.y1-r.y0);for(const f of geo.pipe.flats)t.fillRect(f.x0-half,f.y-half,f.x1-f.x0+half*2,half*2);}

// ---------- 遮罩与圆润地形 ----------
function mask(test,pad,color){const W=s.W+2*pad,H=s.H+2*pad,c=mk(W,H),x=c.getContext('2d'),img=x.createImageData(W,H),[r,g,b]=hex(color);
 for(let y=0;y<H;y++)for(let X=0;X<W;X++){const fx=X-pad,fy=y-pad,inside=fx>=0&&fy>=0&&fx<s.W&&fy<s.H;if(test(inside?s.g[fy*s.W+fx]:-1,fx,fy)){const i=(y*W+X)*4;img.data[i]=r;img.data[i+1]=g;img.data[i+2]=b;img.data[i+3]=255;}}
 x.putImageData(img,0,0);return c;}
function hex(h){return [1,3,5].map(i=>parseInt(h.slice(i,i+2),16));}
function goo(target,m,pad,filter){const t=target.getContext('2d');t.save();t.imageSmoothingEnabled=false;t.filter=filter;t.drawImage(m,BX-pad*F,BY-pad*F,m.width*F,m.height*F);t.restore();}
function clear(c){c.getContext('2d').clearRect(0,0,AW,AH);}
function clipBoard(t){t.beginPath();rr(t,BX,BY,BW,BH,22);t.clip();}
function speckle(t,color,seed,n,rmin,rmax){t.save();t.globalCompositeOperation='source-atop';t.fillStyle=color;let k=seed;const rnd=()=>((k=(k*16807)%2147483647)/2147483647);
 for(let i=0;i<n;i++){t.globalAlpha=.35+rnd()*.35;t.beginPath();t.ellipse(BX+rnd()*BW,BY+rnd()*BH,rmin+rnd()*(rmax-rmin),rmin+rnd()*(rmax-rmin)*.8,rnd()*3,0,7);t.fill();}t.restore();}
// 一种地形：深色外描边（略放大）+ 填色（带纹理）
function terrain(out,test,color,dot,seed,pad,extra){clear(L1);goo(L1,mask(test,pad,color),pad,'url(#goo)');const t1=L1.getContext('2d');speckle(t1,dot,seed,520,1.6,4.2);extra&&extra(t1);
 const o=out.getContext('2d');o.save();clipBoard(o);o.imageSmoothingEnabled=false;o.filter='url(#gooOut)';const m=mask(test,pad,COL.line);o.drawImage(m,BX-pad*F,BY-pad*F,m.width*F,m.height*F);o.filter='none';o.drawImage(L1,0,0);o.restore();}

function buildRock(){rockLayer=mk(AW,AH);const isRock=t=>t===T.ROCK||t===-1;
 terrain(rockLayer,isRock,COL.rock,COL.rockDot,7,6,t=>{if(!geo.pipe)return;t.save();t.globalCompositeOperation='source-atop';
  t.fillStyle=COL.line;pipeRects(t,12);t.fillStyle=COL.pipe;pipeRects(t,9);t.fillStyle='rgba(255,255,255,.55)';pipeRects(t,3);t.restore();});
 // 管子里水流的可见范围 = 管子内径 ∩ 岩石
 pipeClip=null;if(!geo.pipe)return;clear(L2);goo(L2,mask(isRock,6,'#000000'),6,'url(#goo)');pipeClip=mk(AW,AH);const p=pipeClip.getContext('2d');p.fillStyle='#000';pipeRects(p,5);p.globalCompositeOperation='destination-in';p.drawImage(L2,0,0);}
function buildDirt(){dirtLayer=dirtLayer||mk(AW,AH);clear(dirtLayer);terrain(dirtLayer,t=>t===T.DIRT,COL.dirt,COL.dirtDot,13,2);dirtDirty=false;}

function drawWater(o){clear(L1);goo(L1,mask(t=>t===T.WATER,2,COL.water),2,'url(#goo)');const t=L1.getContext('2d');t.fillStyle=COL.foam;
 for(let y=1;y<s.H;y++)for(let x=0;x<s.W;x++){const i=y*s.W+x;if(s.g[i]===T.WATER&&s.g[i-s.W]===T.EMPTY)t.fillRect(BX+x*F-1,BY+y*F,F+2,3);}
 clear(L3);goo(L3,mask(t=>t===T.MUD,2,COL.mud),2,'url(#goo)');const m=L3.getContext('2d');m.save();m.globalCompositeOperation='source-atop';m.strokeStyle=COL.mudStripe;m.lineWidth=7;
 for(let k=-AH;k<AW;k+=22){m.beginPath();m.moveTo(k,AH);m.lineTo(k+AH,0);m.stroke();}m.restore();
 o.save();clipBoard(o);o.drawImage(L1,0,0);o.drawImage(L3,0,0);o.restore();}

// ---------- 机关造型 ----------
function rr(t,x,y,w,h,r){r=Math.min(r,w/2,h/2);t.moveTo(x+r,y);t.arcTo(x+w,y,x+w,y+h,r);t.arcTo(x+w,y+h,x,y+h,r);t.arcTo(x,y+h,x,y,r);t.arcTo(x,y,x+w,y,r);t.closePath();}
function symbol(t,shape,cx,cy,sz,fill,stroke){t.beginPath();if(shape==='diamond'){t.moveTo(cx,cy-sz);t.lineTo(cx+sz,cy);t.lineTo(cx,cy+sz);t.lineTo(cx-sz,cy);}else{t.moveTo(cx,cy-sz);t.lineTo(cx+sz*1.05,cy+sz*.8);t.lineTo(cx-sz*1.05,cy+sz*.8);}t.closePath();t.fillStyle=fill;t.fill();if(stroke){t.strokeStyle=stroke;t.lineWidth=2;t.stroke();}}
function check(t,cx,cy,sz){t.save();t.strokeStyle='#fff';t.lineWidth=4;t.lineCap='round';t.lineJoin='round';t.beginPath();t.moveTo(cx-sz*.55,cy);t.lineTo(cx-sz*.1,cy+sz*.45);t.lineTo(cx+sz*.6,cy-sz*.45);t.stroke();t.restore();}
function groupOpen(grp){return grp.id&&s.groupsOpen?!!s.groupsOpen[grp.id]:!!s.gateOpen;}
function drawGates(o){for(const {c,r,grp} of geo.gates){const st=GROUP[grp.color];let n=0;for(let y=r*B;y<r*B+B;y++)for(let x=c*B;x<c*B+B;x++)if(s.g[y*s.W+x]===T.GATE)n++;
  const x=BX+c*C,y=BY+r*C;o.save();
  if(n>=13){o.beginPath();rr(o,x+2,y+3,C-4,C-6,7);o.fillStyle=st.fill;o.fill();o.lineWidth=2.5;o.strokeStyle=COL.line;o.stroke();o.fillStyle='rgba(255,255,255,.18)';o.fillRect(x+6,y+7,C-12,4);symbol(o,st.shape,x+C/2,y+C/2+1,9,'#fde7dc',st.dark);}
  else{o.setLineDash([6,5]);o.lineWidth=2;o.strokeStyle=st.fill;o.globalAlpha=.55;o.beginPath();rr(o,x+4,y+4,C-8,C-8,7);o.stroke();}
  o.restore();}}
function drawSwitches(o){for(const {c,r,grp} of geo.switches){const st=GROUP[grp.color],on=groupOpen(grp),cx=BX+c*C+C/2,cy=BY+r*C+C/2;o.save();
  if(grp.hold){const d=on?3:0;o.beginPath();rr(o,cx-21,cy-21,42,42,8);o.fillStyle='#7b6656';o.fill();o.beginPath();rr(o,cx-18,cy-18+d,36,36-d,7);o.fillStyle=st.dark;o.fill();o.beginPath();rr(o,cx-18,cy-20+d*1.6,36,34-d,7);o.fillStyle=st.fill;o.fill();o.lineWidth=2.5;o.strokeStyle=COL.line;o.stroke();
   symbol(o,st.shape,cx,cy-9+d,6,'#fde7dc');o.fillStyle='#fff6ea';o.font='bold 17px "Microsoft YaHei",sans-serif';o.textAlign='center';o.textBaseline='middle';o.fillText('压',cx,cy+6+d);if(on)check(o,cx+10,cy-9+d,9);}
  else{const d=on?4:0;o.beginPath();o.arc(cx,cy+3,21,0,7);o.fillStyle='#5e4a3c';o.fill();o.beginPath();o.arc(cx,cy+2,19,0,7);o.fillStyle=st.dark;o.fill();o.beginPath();o.arc(cx,cy-3+d,17,0,7);o.fillStyle=st.fill;o.fill();o.lineWidth=2.5;o.strokeStyle=COL.line;o.stroke();
   symbol(o,st.shape,cx,cy-3+d,8,'#fde7dc',st.dark);if(on)check(o,cx,cy-3+d,11);}
  o.restore();}}
function drawSponges(o){const cap=lv.sponge||0,frac=cap?1-s.spongeLeft/cap:0;for(const sp of geo.sponges){const x=BX+sp.x0*C+3,y=BY+sp.y0*C+6,w=(sp.x1-sp.x0+1)*C-6,h=(sp.y1-sp.y0+1)*C-12;o.save();
  o.beginPath();rr(o,x,y,w,h,12);o.fillStyle=mix(COL.spongeDry,COL.spongeFull,frac);o.fill();o.clip();let k=sp.x0*31+sp.y0*7+3;const rnd=()=>((k=(k*16807)%2147483647)/2147483647);
  o.fillStyle=mix(COL.spongeHole,COL.spongeFullHole,frac);for(let i=0;i<w/9;i++){o.beginPath();const rad=(2.5+rnd()*4)*(1-frac*.45);o.ellipse(x+rnd()*w,y+4+rnd()*(h-8),rad,rad*.85,0,0,7);o.fill();}
  if(frac>.34){o.fillStyle='rgba(255,255,255,.75)';for(let i=0;i<w/(frac>=1?16:30);i++){o.beginPath();o.ellipse(x+rnd()*w,y+3+rnd()*(h-6),3,4,0,0,7);o.fill();}}
  o.restore();o.beginPath();rr(o,x,y,w,h,12);o.lineWidth=2.5;o.strokeStyle=COL.line;o.stroke();}}
function mix(a,b,f){const A=hex(a),Bv=hex(b);return 'rgb('+A.map((v,i)=>Math.round(v+(Bv[i]-v)*Math.max(0,Math.min(1,f)))).join(',')+')';}
function drawDrains(o){for(const d of geo.drains){const x=BX+d.x0*C+3,y=BY+d.y0*C+4,w=(d.x1-d.x0+1)*C-6,h=(d.y1-d.y0+1)*C-8;o.save();o.beginPath();rr(o,x,y,w,h,8);o.fillStyle=COL.drain;o.fill();o.lineWidth=2.5;o.strokeStyle=COL.line;o.stroke();
  o.fillStyle=COL.drainSlot;const n=Math.max(3,Math.round(w/14));for(let i=0;i<n;i++){const sx=x+8+i*(w-16)/n+((w-16)/n-6)/2;o.beginPath();rr(o,sx,y+8,6,h-16,3);o.fill();}o.restore();}}
function drawOutlets(o){for(const b of geo.outlets){const x=BX+b.x0*C,y=BY+b.y0*C,w=(b.x1-b.x0+1)*C,h=(b.y1-b.y0+1)*C,cx=x+w/2;o.save();
  o.beginPath();o.moveTo(x+3,y+5);o.lineTo(x+w-3,y+5);o.lineTo(cx+10,y+h-8);o.lineTo(cx+10,y+h);o.lineTo(cx-10,y+h);o.lineTo(cx-10,y+h-8);o.closePath();o.fillStyle=COL.ivory;o.fill();o.lineWidth=2.5;o.strokeStyle=COL.line;o.stroke();
  o.fillStyle='#e8e0cf';o.beginPath();o.moveTo(x+8,y+9);o.lineTo(x+w-8,y+9);o.lineTo(x+w-12,y+14);o.lineTo(x+12,y+14);o.fill();
  o.fillStyle='#3d9be0';const ay=y+h*.42;o.fillRect(cx-4,ay-9,8,10);o.beginPath();o.moveTo(cx-10,ay);o.lineTo(cx+10,ay);o.lineTo(cx,ay+11);o.closePath();o.fill();o.restore();}}
function drawPipeFlow(o,now){if(!geo.pipe||now>bathFlowUntil)return;clear(L2);const t=L2.getContext('2d');t.fillStyle=S.muddy(s)?COL.mud:COL.water;
 const off=(now/40)%14;for(const r of geo.pipe.runs)for(let y=r.y0-14+off;y<r.y1;y+=14)t.fillRect(r.x-4,y,8,9);
 for(const f of geo.pipe.flats)for(let x=f.x0-14+off;x<f.x1;x+=14)t.fillRect(x,f.y-4,9,8);
 t.globalCompositeOperation='destination-in';t.drawImage(pipeClip,0,0);t.globalCompositeOperation='source-over';o.drawImage(L2,0,0);}
function drawBath(o){const {x,y,w,h}=geo.bath;o.save();
 if(geo.pipe){o.fillStyle=COL.line;o.fillRect(geo.pipe.x-12,BY+BH-2,24,y-BY-BH+8);o.fillStyle=COL.pipe;o.fillRect(geo.pipe.x-9,BY+BH-2,18,y-BY-BH+8);}
 o.fillStyle='rgba(150,110,60,.18)';o.beginPath();o.ellipse(x+w/2,y+h+1,w/2+8,5,0,0,7);o.fill();
 o.beginPath();o.moveTo(x,y+4);o.lineTo(x+w,y+4);o.quadraticCurveTo(x+w-4,y+h,x+w-26,y+h);o.lineTo(x+26,y+h);o.quadraticCurveTo(x+4,y+h,x,y+4);o.closePath();o.fillStyle=COL.ivory;o.fill();o.lineWidth=2.5;o.strokeStyle=COL.line;o.stroke();
 const ix=x+12,iw=w-24,iy=y+9,ih=h-14,frac=Math.min(1,s.bath/Math.max(1,s.target)),dirty=S.muddy(s);
 o.save();o.beginPath();rr(o,ix,iy,iw,ih,8);o.clip();o.fillStyle='#f3ecdc';o.fillRect(ix,iy,iw,ih);const lvl=Math.min(ih,ih*.78*frac+(dirty?ih*.5:0));o.fillStyle=dirty?COL.mud:COL.water;o.fillRect(ix,iy+ih-lvl,iw,lvl);o.restore();
 o.setLineDash([7,5]);o.strokeStyle='#4a87b8';o.lineWidth=2;o.beginPath();o.moveTo(ix+4,iy+ih*.22);o.lineTo(ix+iw-4,iy+ih*.22);o.stroke();o.setLineDash([]);
 o.beginPath();rr(o,x-4,y,w+8,7,3.5);o.fillStyle=COL.ivory;o.fill();o.stroke();o.restore();}


// ---------- 计分、限时与升降级（2026-10-09 博书确认） ----------
// 独立过关得本级分；用了提示得一半（向上取整）。失败 0 分：脏水进缸、清水不够、本题时间到、主动换题。
// 每题限时 L1–L3 15 秒、L4 20、L5 25、L6 30；水在流的时候本题和整局都停表。整局 120 秒（公共模板）。
// 升级：L1 连续独立过关 1 题，其余 2 题；连续 2 题需要帮助（提示后过关或失败）降一级。
const FREE=params.get('mode')==='free';
const RULE={score:[20,25,30,35,45,55],limit:[15,15,15,20,25,30],up:[1,2,2,2,2,2]};
const G={level:1,okRun:0,helpRun:0,used:{},done:0,ok:0,hint:0,fail:0,remainingMs:120000,finished:false,maxLevel:1,byLevel:[]};
// 试玩面板（只在本次页面内存里，刷新回默认）：lock=0 为自动升降级，1–6 为锁定等级；timePct 每题限时百分比（下一题起生效）；brushPct 笔刷粗细百分比（立即生效）
const PANEL={lock:0,timePct:100,brushPct:100};
const limitMs=k=>Math.round(RULE.limit[k-1]*PANEL.timePct/100)*1000;
const brush=()=>S.BRUSH*PANEL.brushPct/100;
let puzzleMs=0,hinted=false,hintStroke=null,hintUntil=0,timeUp=false,failReason='',lastUpdate=0,lastNow=0;

function message(){if(!s)return'';if(failReason)return failReason;
 if(S.muddy(s))return FREE?'脏水流进浴缸了，点“撤销”或“重来”':'脏水流进浴缸了';if(completed)return'清水够了，洗澡啦！';
 if(s.flow.done&&S.hopeless(s))return FREE?'清水不够了，点“撤销”或“重来”':'清水不够了';
 if(!s.flow.done&&!drawing)return'水在流……';return'挖开泥土，把清水引进浴缸';}
function drawTimer(o){if(FREE||!lv)return;const total=Math.max(1000,puzzleMs>limitMs(lv.demoLevel)?puzzleMs:limitMs(lv.demoLevel)),f=Math.max(0,puzzleMs)/total,cx=80,cy=300,r=46,flowing=!s.flow.done&&!drawing;
 o.save();o.beginPath();o.arc(cx,cy,r+8,0,7);o.fillStyle='#fffaf0';o.fill();o.lineWidth=3;o.strokeStyle=COL.line;o.stroke();
 o.beginPath();o.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+Math.PI*2*f);o.lineWidth=10;o.lineCap='round';o.strokeStyle=flowing?'#c9bfae':(puzzleMs<=5000?'#e0773a':'#5aa86b');o.stroke();
 o.fillStyle=puzzleMs<=5000&&!flowing?'#c0561f':'#5a3a22';o.font='bold 34px "Microsoft YaHei",sans-serif';o.textAlign='center';o.textBaseline='middle';o.fillText(String(Math.ceil(Math.max(0,puzzleMs)/1000)),cx,cy-2);
 o.font='bold 16px "Microsoft YaHei",sans-serif';o.fillStyle='#7a5a3e';o.fillText(flowing?'水在流':'本题',cx,cy+r+26);o.restore();}
function drawHint(o,now){if(!hintStroke||now>hintUntil)return;o.save();o.setLineDash([14,10]);o.lineDashOffset=-now/30;o.lineCap='round';o.lineJoin='round';
 o.lineWidth=14;o.strokeStyle='rgba(255,255,255,.85)';o.beginPath();hintStroke.forEach(([x,y],k)=>k?o.lineTo(BX+x*C,BY+y*C):o.moveTo(BX+x*C,BY+y*C));o.stroke();
 o.lineWidth=7;o.strokeStyle='#e0773a';o.stroke();o.restore();}
// 提示：参考解里第一笔还有土没挖开的那一笔（局部提示，不揭示整条解法）
function pickHint(){for(const st of lv.solution||[]){const seen=new Set();
  for(let k=0;k<st.length;k++){const [ax,ay]=st[k],[bx,by]=st[Math.min(k+1,st.length-1)],n=Math.max(1,Math.ceil(Math.hypot(bx-ax,by-ay)*5));
   for(let j=0;j<=n;j++){const px=(ax+(bx-ax)*j/n)*B,py=(ay+(by-ay)*j/n)*B;
    for(let y=Math.floor(py-3);y<=py+3;y++)for(let x=Math.floor(px-3);x<=px+3;x++){if(x<0||y<0||x>=s.W||y>=s.H)continue;if(s.g[y*s.W+x]===T.DIRT&&(x+.5-px)**2+(y+.5-py)**2<=10)seen.add(y*s.W+x);}}}
  if(seen.size>=6)return st;}
 return null;}
function render(now){if(!s)return;if(dirtDirty)buildDirt();ctx.clearRect(0,0,AW,AH);
 ctx.fillStyle=(S.muddy(s)||failReason)?'#8b3b2d':'#5a3a22';ctx.font='bold 26px "Microsoft YaHei",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(message(),AW/2,18);
 ctx.save();ctx.beginPath();rr(ctx,BX,BY,BW,BH,22);ctx.fillStyle=COL.base;ctx.fill();ctx.restore();
 drawWater(ctx);ctx.drawImage(rockLayer,0,0);drawPipeFlow(ctx,now);ctx.drawImage(dirtLayer,0,0);
 drawSponges(ctx);drawDrains(ctx);drawOutlets(ctx);drawGates(ctx);drawSwitches(ctx);
 ctx.save();ctx.beginPath();rr(ctx,BX,BY,BW,BH,22);ctx.lineWidth=4;ctx.strokeStyle=COL.line;ctx.stroke();ctx.restore();
 drawBath(ctx);drawHint(ctx,now);drawTimer(ctx);
 if(drawing&&pointer){ctx.save();ctx.beginPath();ctx.arc(pointer[0],pointer[1],brush()*F,0,7);ctx.strokeStyle='rgba(107,74,51,.6)';ctx.lineWidth=2;ctx.stroke();ctx.restore();}}

// ---------- 出题与结算 ----------
function setPuzzle(i,keepClock){epoch++;idx=(i+LEVELS.length)%LEVELS.length;lv=LEVELS[idx];s=E.create(lv);history=[];drawing=null;completed=false;replaying=false;lastBath=0;bathFlowUntil=0;failReason='';hintStroke=null;
 if(!keepClock){puzzleMs=limitMs(lv.demoLevel);hinted=false;timeUp=false;handled=false;}
 geo=buildGeo(lv);buildRock();dirtDirty=true;devbar();}
function load(i){setPuzzle(i,false);if(FREE)api?.update({level:lv.demoLevel,score,remainingMs:120000});}
function restart(){if(drawing||replaying||handled)return;setPuzzle(idx,!FREE);}
function nextPuzzle(){if(PANEL.lock)G.level=PANEL.lock;const pool=LEVELS.map((l,i)=>i).filter(i=>LEVELS[i].demoLevel===G.level);const used=G.used[G.level]||(G.used[G.level]=new Set());
 if(pool.every(i=>used.has(i)))used.clear();const left=pool.filter(i=>!used.has(i));const pick=left[Math.floor(Math.random()*left.length)];used.add(pick);setPuzzle(pick,false);}
function newGame(){const start=PANEL.lock||1;Object.assign(G,{level:start,okRun:0,helpRun:0,used:{},done:0,ok:0,hint:0,fail:0,remainingMs:120000,finished:false,maxLevel:start,byLevel:[1,2,3,4,5,6].map(()=>({score:0,clears:0,errors:0}))});score=0;nextPuzzle();api?.update({score,level:G.level,remainingMs:G.remainingMs});}
function settle(result,reason){if(handled)return;handled=true;onUp();
 if(FREE){if(result!=='fail'){completed=true;api.feedback({correct:true,score,level:lv.demoLevel,onComplete:()=>load(idx+1)});}return;}
 const lvAt=lv.demoLevel,full=RULE.score[lvAt-1],delta=result==='ok'?full:result==='hint'?Math.ceil(full/2):0,before=G.level;
 score+=delta;G.done++;G[result]++;const bl=G.byLevel[lvAt-1];bl.score+=delta;if(result==='fail')bl.errors++;else bl.clears++;
 if(result==='ok'){G.okRun++;G.helpRun=0;if(G.okRun>=RULE.up[G.level-1]){if(G.level<6&&!PANEL.lock)G.level++;G.okRun=0;G.helpRun=0;}}
 else{G.helpRun++;G.okRun=0;if(G.helpRun>=2){if(G.level>1&&!PANEL.lock)G.level--;G.okRun=0;G.helpRun=0;}}
 G.maxLevel=Math.max(G.maxLevel,G.level);
 if(result==='fail')failReason=reason;else completed=true;
 api.feedback({correct:result!=='fail',score,scoreDelta:delta>0?delta:undefined,level:G.level,levelUp:G.level>before,onComplete:()=>{if(!G.finished)nextPuzzle();}});devbar();}
function skip(){if(FREE||handled||drawing||replaying||!api?.isInteractive())return;settle('fail','换了一题');}
function showHint(){if(FREE||handled||replaying||!api?.isInteractive())return;const st=pickHint();hintStroke=st;hintUntil=performance.now()+6000;if(st&&!hinted){hinted=true;devbar();}}

function canDig(){return s&&!paused&&!replaying&&api?.isInteractive()&&s.flow.done&&s.flow.ok&&!S.muddy(s)&&!completed&&!handled;}
function toFine(e){const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*AW/r.width,y=(e.clientY-r.top)*AH/r.height;return {x,y,fx:(x-BX)/F,fy:(y-BY)/F};}
function onDown(e){if(!canDig())return;const p=toFine(e);if(p.fx<0||p.fy<0||p.fx>s.W||p.fy>s.H)return;canvas.setPointerCapture(e.pointerId);history.push(E.clone(s));drawing={last:[p.fx,p.fy]};pointer=[p.x,p.y];hintStroke=null;S.digAt(s,p.fx,p.fy,brush());dirtDirty=true;}
function onMove(e){if(!drawing)return;const p=toFine(e);pointer=[p.x,p.y];S.digLine(s,drawing.last[0],drawing.last[1],p.fx,p.fy,brush());drawing.last=[p.fx,p.fy];dirtDirty=true;}
function onUp(){if(!drawing)return;drawing=null;pointer=null;E.begin(s);}
function undo(){if(!history.length||drawing||replaying||handled)return;epoch++;s=E.clone(history.pop());completed=false;dirtDirty=true;lastBath=s.bath;}
function frame(now){const dt=lastNow?Math.min(100,now-lastNow):0;lastNow=now;
 if(s&&!paused&&!drawing&&!s.flow.done)E.advance(s,64);
 if(s){if(s.bath>lastBath){bathFlowUntil=now+700;lastBath=s.bath;}
  const st=api?.getState().state,flowing=!s.flow.done&&!drawing;
  if(!FREE&&!G.finished){
   // 停表：水在流、回放中、暂停时都不走；反馈期间整局继续走（公共规则），本题不走
   if(!flowing&&!replaying&&(st==='game'||st==='feedback'||st==='levelup'))G.remainingMs=Math.max(0,G.remainingMs-dt);
   if(st==='game'&&!handled&&!flowing&&!replaying){puzzleMs-=dt;if(puzzleMs<=0&&!timeUp){timeUp=true;onUp();}}
   if(now-lastUpdate>200||G.remainingMs===0){lastUpdate=now;api.update({remainingMs:G.remainingMs});}
   if(G.remainingMs===0&&!G.finished){G.finished=true;onUp();api.finish();devbar();}}
  if(!handled&&s.flow.done&&!drawing&&st==='game'){
   if(s.flow.ok&&S.won(s)&&!S.muddy(s))settle(hinted?'hint':'ok');
   else if(!FREE&&S.muddy(s))settle('fail','脏水流进浴缸了');
   else if(!FREE&&S.hopeless(s))settle('fail','清水不够了');
   else if(!FREE&&timeUp)settle('fail','这题时间到了');}
  render(now);const busy=!!drawing||replaying||handled;tools.undo.disabled=!history.length||busy;tools.reset.disabled=busy;
  if(tools.hint){tools.hint.disabled=busy||!api?.isInteractive();tools.skip.disabled=busy||!api?.isInteractive();}}
 requestAnimationFrame(frame);}
async function waitStable(token){while(token===epoch&&!(s.flow.done))await new Promise(r=>requestAnimationFrame(r));}
async function replay(keep){if(!lv.solution||replaying||drawing)return;setPuzzle(idx,keep===true);const token=epoch;replaying=true;await waitStable(token);
 for(const st of lv.solution){if(token!==epoch||completed||S.muddy(s))break;history.push(E.clone(s));for(let k=0;k<st.length;k++){const a=st[k],b=st[Math.min(k+1,st.length-1)];S.digLine(s,a[0]*B,a[1]*B,b[0]*B,b[1]*B);}dirtDirty=true;E.begin(s);await waitStable(token);}
 if(token===epoch)replaying=false;}

const LABELS=['基础','初阶','中阶','高阶','超凡','宗师'];
function result(){return {totalScore:score,levels:LABELS.map((label,i)=>({level:i+1,label,score:G.byLevel[i]?.score||0,clears:G.byLevel[i]?.clears||0,errors:G.byLevel[i]?.errors||0})),correct:G.ok+G.hint,mistakes:G.fail,maxLevel:G.maxLevel};}
// ---------- 页面下方栏 ----------
function link(text,href){const a=document.createElement('a');a.textContent=text;a.href=href;a.className='mode';return a;}
function btn(text,on,f,title){const b=document.createElement('button');b.textContent=text;if(on)b.className='on';if(title)b.title=title;b.onclick=f;return b;}
function row(label,...kids){const r=document.createElement('div');r.className='devrow';const t=document.createElement('span');t.className='lab';t.textContent=label;r.append(t,...kids);return r;}
function txt(t){const e=document.createElement('span');e.textContent=t;return e;}
// 试玩面板：不是玩家界面；放在游戏区外，可收起；设置只在本次页面内存里，刷新回默认
function devbar(){const bar=document.getElementById('devbar');bar.replaceChildren();const box=document.createElement('details');box.open=bar.dataset.open!=='0';box.ontoggle=()=>{bar.dataset.open=box.open?'1':'0';};
 const sum=document.createElement('summary');box.append(sum);bar.append(box);
 if(!FREE){sum.textContent='试玩面板 · '+(PANEL.lock?'锁定 L'+PANEL.lock:'自动升降级')+' · 当前 L'+G.level+' · 限时 '+PANEL.timePct+'% · 笔刷 '+PANEL.brushPct+'%';
  const lvBtns=[btn('自动',!PANEL.lock,()=>{PANEL.lock=0;devbar();},'按规则升降级')];for(let k=1;k<=6;k++)lvBtns.push(btn('L'+k,PANEL.lock===k,()=>{PANEL.lock=k;devbar();}));
  box.append(row('等级',...lvBtns,txt('（下一题起生效；点“按设置重开本局”立即生效）')));
  const step=(key,d,min,max)=>()=>{PANEL[key]=Math.max(min,Math.min(max,PANEL[key]+d));devbar();};
  box.append(row('每题限时',btn('−',false,step('timePct',-25,50,200)),txt(PANEL.timePct+'%（L1–L6：'+[1,2,3,4,5,6].map(k=>limitMs(k)/1000).join('／')+' 秒）'),btn('＋',false,step('timePct',25,50,200)),txt('下一题起生效')));
  box.append(row('笔刷粗细',btn('−',false,step('brushPct',-10,60,160)),txt(PANEL.brushPct+'%'),btn('＋',false,step('brushPct',10,60,160)),txt('立即生效')));
  box.append(row('操作',btn('按设置重开本局',false,()=>api.start(true)),btn('恢复默认',false,()=>{Object.assign(PANEL,{lock:0,timePct:100,brushPct:100});devbar();}),link('切到自由选题（不计分、可看参考解）','?mode=free')));
  const r=result();box.append(row('本局',txt('已做 '+G.done+' 题：过关 '+G.ok+'、提示后过关 '+G.hint+'、失败 '+G.fail+' · 连续过关 '+G.okRun+'/'+RULE.up[G.level-1]+'（升级）· 连续求助 '+G.helpRun+'/2（降级）· 最高 L'+G.maxLevel+' · 总分 '+score+' · 各级得分 '+r.levels.map(x=>x.score).join('／')+(lv?' · 本题 '+lv.id+(hinted?'（已用提示）':''):''))));
  return;}
 sum.textContent='自由选题（不计分、不限时）· 第 '+(idx+1)+' / '+LEVELS.length+' 题 · L'+lv.demoLevel+' · '+lv.id+(lv.mother?' · '+lv.mother:'');
 box.append(row('操作',btn('看参考解',false,replay),link('回到正式一局','?')));
 for(let k=1;k<=6;k++){const bs=[];LEVELS.forEach((l,i)=>{if(l.demoLevel===k)bs.push(btn(l.id,i===idx,()=>load(i),l.mother||''));});box.append(row('L'+k,...bs));}}

createGameShell({mount:document.getElementById('mount'),mode:'playtest',config:{title:'水到渠成',clock:'external'},adapter:{
 mount({container,api:a}){api=a;const root=document.createElement('div');root.className='water-root';canvas=document.createElement('canvas');canvas.width=AW;canvas.height=AH;ctx=canvas.getContext('2d');
  canvas.addEventListener('pointerdown',onDown);canvas.addEventListener('pointermove',e=>{if(drawing)onMove(e);});canvas.addEventListener('pointerup',onUp);canvas.addEventListener('pointercancel',onUp);
  const box=document.createElement('div');box.className='water-tools';const mkb=(t,f)=>{const b=document.createElement('button');b.textContent=t;b.onclick=f;box.append(b);return b;};
  tools={undo:mkb('撤销',undo),reset:mkb('重来',restart)};if(!FREE){tools.hint=mkb('提示',showHint);tools.skip=mkb('换一题',skip);tools.hint.className='soft';tools.skip.className='soft';}
  root.append(canvas,box);container.append(root);requestAnimationFrame(frame);},
 start(){paused=false;lastNow=0;if(FREE){score=0;load(Number(params.get('q')||1)-1);}else newGame();},pause(){paused=true;onUp();},resume(){paused=false;lastNow=0;},
 getResult(){return result();},destroy(){}}});
window.__demo={get panel(){return {...PANEL};},get result(){return result();},dig(st){history.push(E.clone(s));S.digStroke(s,st);dirtDirty=true;E.begin(s);},find(id){return LEVELS.findIndex(l=>l.id===id);},get state(){return s&&{id:lv.id,level:lv.demoLevel,bath:s.bath,target:s.target,muddy:S.muddy(s),won:S.won(s),flowDone:s.flow.done,completed,handled,puzzleMs,dirt:s.g.reduce((n,t)=>n+(t===T.DIRT),0),shell:api?.getState(),game:{...G,used:undefined},score};},load,replay,settle,setPuzzle,showHint,skip};
