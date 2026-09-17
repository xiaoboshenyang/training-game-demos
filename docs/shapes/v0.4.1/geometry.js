const batches=['2026-09-16_B风格七款样图','2026-09-16_四种高难候选','2026-09-16_现实纹样四款'];
const patterns=[['拱桥',0,1,'简单','保留'],['亭子',0,2,'简单','待改'],['宝剑',0,3,'简单','保留'],['钥匙',0,4,'简单','保留'],['盘扣',0,5,'中等','保留'],['莫比乌斯带',0,6,'简单','待改'],['三叶结',0,7,'中等','保留'],['多环编织',1,1,'复杂','候选'],['连续回纹',1,2,'复杂','候选'],['复杂盘长结',1,3,'复杂','候选'],['花窗式曲线',1,4,'复杂','候选'],['缠枝莲',2,1,'中等','保留'],['莲花藻井',2,2,'中等','待改'],['铁艺花窗',2,3,'中等','保留'],['海水祥云',2,4,'中等','保留']].map((p,id)=>({id,name:p[0],grade:p[3],review:p[4],url:'assets/patterns/'+batches[p[1]]+'/'+String(p[2]).padStart(2,'0')+'_'+p[0]+'.png'}));

let imageObj,maskData,state={layout:null};
function makeCells(radius){const size=270/(Math.sqrt(3)*(radius+.5)),cells=[];for(let r=-radius;r<=radius;r++)for(let q=-radius;q<=radius;q++)if(Math.abs(q+r)<=radius)cells.push({x:360+Math.sqrt(3)*size*(q+r/2),y:340+1.5*size*r,size});return cells}
function polygon(c){return Array.from({length:6},(_,k)=>{let a=(60*k-30)*Math.PI/180;return `${c.x+c.size*Math.cos(a)},${c.y+c.size*Math.sin(a)}`}).join(' ')}
function rectFor(layout){let scale=Math.min(600/imageObj.width,580/imageObj.height)*layout.scale,w=imageObj.width*scale,h=imageObj.height*scale;return {x:360-w/2+layout.x,y:340-h/2+layout.y,width:w,height:h}}

function buildMask(){let canvas=document.createElement('canvas');canvas.width=720;canvas.height=680;let ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.fillStyle='#e9e6de';ctx.fillRect(0,0,720,680);let r=rectFor(state.layout);ctx.drawImage(imageObj,r.x,r.y,r.width,r.height);maskData=ctx.getImageData(0,0,720,680).data;}
function foreground(x,y){x=Math.round(x);y=Math.round(y);if(x<0||x>=720||y<0||y>=680)return false;let i=(y*720+x)*4,r=maskData[i],g=maskData[i+1],b=maskData[i+2];return g-r>10&&b-r>6&&r<170;}
// A rotated raster edge may move by a rounded pixel. Match only that small
// neighborhood, keeping the overall mismatch threshold unchanged.
function foregroundNear(x,y){for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(foreground(x+dx,y+dy))return true;return false;}
function detect(c){
 const samples=[];
 for(let y=-c.size*.92;y<=c.size*.92;y+=3)for(let x=-c.size*.8;x<=c.size*.8;x+=3)
  if(Math.abs(y)<=c.size-Math.abs(x)/Math.sqrt(3)-3)samples.push([x,y,foreground(c.x+x,c.y+y)]);
 const area=samples.filter(s=>s[2]).length;
 const coverage=area/samples.length,core=samples.filter(([x,y])=>x*x+y*y<=(c.size*.55)**2),coreForeground=core.filter(v=>v[2]).length;
 const fragment=area>0&&(coverage<.10||coreForeground===0);
 if(!area)return {auto:[0,1,2,3,4,5],allowed:[0,1,2,3,4,5],blank:true,coverage,coreForeground,fragment};
 const allowed=[0];
 for(let k=1;k<6;k++){
  const a=k*Math.PI/3;let mismatches=0,union=0;
  for(const [x,y,v] of samples){
   const rx=c.x+x*Math.cos(a)-y*Math.sin(a),ry=c.y+x*Math.sin(a)+y*Math.cos(a),rotated=foreground(rx,ry);
   if(v||rotated)union++;
   if(v!==rotated && !(v?foregroundNear(rx,ry):foregroundNear(c.x+x,c.y+y)))mismatches++;
  }
  if(union&&1-mismatches/union>=.985)allowed.push(k);
 }
 return {auto:allowed.slice(),allowed,blank:false,coverage,coreForeground,fragment};
}

export {patterns,makeCells,polygon};
export function analyze(image,radius,layout){imageObj=image;state.layout=layout;buildMask();const cells=makeCells(radius);cells.forEach(c=>Object.assign(c,detect(c)));const rect=rectFor(layout);return {radius,layout,rect,cells,eligible:cells.map((c,i)=>({c,i})).filter(({c})=>!c.blank&&!c.fragment&&c.allowed.length<6).map(v=>v.i)};}

