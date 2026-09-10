(function(){
'use strict';
class CatchGame{
 constructor(container,options={}){
  this.container=container;this.options=options;this.images={};this.crops={};this.running=false;this.destroyed=false;this.x=500;this.keys=new Set();this.canvas=document.createElement('canvas');this.canvas.style.cssText='display:block;width:100%;height:100%;touch-action:none;outline:none';this.canvas.tabIndex=0;this.canvas.setAttribute('aria-label','左右移动竹签接水果');container.appendChild(this.canvas);this.ctx=this.canvas.getContext('2d');
  this.visualTime=0;this.pendingFull=null;this.fullDelay=0;this.fullDelivered=false;this.dragging=false;
  this.round=GameEngine.createRound({...options,onCatch:(s,e)=>{options.onCatch?.(s,e)},onFull:s=>{this.pendingFull=s;this.fullDelay=.35}});
  this.pointer=e=>{if(!this.dragging)return;const rect=this.canvas.getBoundingClientRect();this.x=Math.max(20,Math.min(this.w-20,(e.clientX-rect.left)*this.w/rect.width));};
  this.down=e=>{this.dragging=true;this.canvas.focus();this.canvas.setPointerCapture?.(e.pointerId);this.pointer(e)};this.up=()=>{this.dragging=false};this.canvas.addEventListener('pointerup',this.up);this.canvas.addEventListener('pointercancel',this.up);this.canvas.addEventListener('lostpointercapture',this.up);this.keydown=e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();this.keys.add(e.key)}};this.keyup=e=>this.keys.delete(e.key);
  this.canvas.addEventListener('pointermove',this.pointer);this.canvas.addEventListener('pointerdown',this.down);this.canvas.addEventListener('keydown',this.keydown);this.canvas.addEventListener('keyup',this.keyup);this.blur=()=>this.keys.clear();this.canvas.addEventListener('blur',this.blur);
  this.resizeObserver=new ResizeObserver(()=>this.resize());this.resizeObserver.observe(container);this.resize();
  for(const [id,value] of Object.entries(options.assets||{})){const im=new Image();const record=typeof value==='string'?{src:value}:value;im.onload=()=>{this.images[id]=im;this.crops[id]=record.bbox||this.findCrop(im);this.draw()};im.src=record.src||record.url||record.file;}
  this.draw();
 }
 findCrop(im){try{const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(im,0,0);const d=ctx.getImageData(0,0,c.width,c.height).data;let x0=c.width,y0=c.height,x1=0,y1=0;for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++)if(d[(y*c.width+x)*4+3]>16){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y)}return[x0,y0,x1+1,y1+1]}catch{return[0,0,im.naturalWidth,im.naturalHeight]}}
 resize(){this.w=Math.max(200,this.container.clientWidth||1000);this.h=Math.max(200,this.container.clientHeight||728);const dpr=Math.min(2,devicePixelRatio||1);this.canvas.width=this.w*dpr;this.canvas.height=this.h*dpr;this.ctx.setTransform(dpr,0,0,dpr,0,0);this.round.setSize(this.w,this.h);this.x=Math.min(this.w-20,this.x);this.draw()}
 start(){if(this.destroyed||this.running||this.fullDelivered)return;this.running=true;this.last=performance.now();this.frame=requestAnimationFrame(t=>this.loop(t))}
 pause(){this.running=false;cancelAnimationFrame(this.frame);this.keys.clear();this.dragging=false}
 resume(){this.start()}
 loop(now){if(!this.running||this.destroyed)return;const dt=Math.min(.05,(now-this.last)/1000);this.last=now;this.tick(dt);if(this.running&&!this.destroyed)this.frame=requestAnimationFrame(t=>this.loop(t))}
 tick(dt){if(this.destroyed||this.fullDelivered)return;dt=Math.max(0,Math.min(.1,dt));const finishing=!!this.pendingFull;if(!finishing){if(this.keys.has('ArrowLeft'))this.x-=600*dt;if(this.keys.has('ArrowRight'))this.x+=600*dt;this.x=Math.max(20,Math.min(this.w-20,this.x));this.round.tick(dt,this.x);this.visualTime=this.round.elapsed}else{this.visualTime+=dt;this.fullDelay-=dt}if(this.destroyed)return;this.draw();if(finishing&&this.fullDelay<=0){this.fullDelivered=true;this.running=false;this.options.onFull?.(this.pendingFull)}}
 snapshot(){return this.round.snapshot()}
 destroy(){this.pause();this.destroyed=true;this.resizeObserver.disconnect();this.canvas.remove();this.images={}}
 fruit(id,x,y,size){const c=this.ctx,im=this.images[id];if(im){const [x0,y0,x1,y1]=this.crops[id]||[0,0,im.width,im.height];const scale=size/Math.max(x1-x0,y1-y0);c.drawImage(im,x0,y0,x1-x0,y1-y0,x-(x1-x0)*scale/2,y-(y1-y0)*scale/2,(x1-x0)*scale,(y1-y0)*scale)}else{c.fillStyle='#e96861';c.beginPath();c.arc(x,y,size*.35,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.font='14px sans-serif';c.textAlign='center';c.fillText(GameEngine.FRUITS.find(f=>f.id===id)?.name||id,x,y+4)}}
 draw(){if(this.destroyed)return;const c=this.ctx,w=this.w,h=this.h,tip=this.round.geometry.tipY;c.clearRect(0,0,w,h);const bg=c.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#fffdf5');bg.addColorStop(1,'#f6f0e3');c.fillStyle=bg;c.fillRect(0,0,w,h);
 c.strokeStyle='#a5e4f5';c.lineWidth=3;for(let i=0;i<=this.round.cfg.lanes;i++){const x=18+(w-36)*i/this.round.cfg.lanes;c.beginPath();c.moveTo(x,12);c.lineTo(x,h-24);c.stroke()}
 const shaft=c.createLinearGradient(this.x-6,0,this.x+6,0);shaft.addColorStop(0,'#b78343');shaft.addColorStop(.45,'#f9d89c');shaft.addColorStop(1,'#b98346');c.fillStyle=shaft;c.beginPath();c.moveTo(this.x,tip);c.lineTo(this.x+5,tip+23);c.lineTo(this.x+5,h+10);c.lineTo(this.x-5,h+10);c.lineTo(this.x-5,tip+23);c.closePath();c.fill();
 const elapsed=this.visualTime,stack=this.round.stack;for(let i=0;i<stack.length;i++){const f=stack[i],age=elapsed-f.time,t=Math.min(1,age/.25),ease=1-(1-t)**3;const pitch=Math.min(18,(h-tip-62)/9);const endY=h-27-i*pitch;const y=(tip+25)+(endY-tip-25)*ease;const targetSize=50;const size=(86*(this.options.settings?.size||1))*(1-ease)+targetSize*ease;this.fruit(f.id,this.x,y,size);}
 for(const f of this.round.falling)this.fruit(f.id,f.x,f.y,f.size);
 }
}
window.CatchGame=CatchGame;
})();

