import {GEOMETRY as G} from './config.mjs';
export async function loadAssets(){
  const names=['background.png','player_stone.png','obstacle_rock.png','finger.png'];
  const images=await Promise.all(names.map(name=>new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve([name,image]);image.onerror=()=>reject(new Error(`素材加载失败：${name}`));image.src=new URL(`./assets/${name}`,import.meta.url).href;})));
  const response=await fetch(new URL('./assets/metrics.json',import.meta.url));if(!response.ok)throw new Error('素材尺寸清单加载失败');
  return {images:Object.fromEntries(images),metrics:await response.json()};
}
export class Renderer{
  constructor(canvas,assets){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.assets=assets;}
  sprite(name,x,y,width,anchor){
    const image=this.assets.images[name],metric=this.assets.metrics[name];
    const b=metric.visible_bbox;const scale=width/(b[2]-b[0]);
    const center=metric.source_anchor??anchor??[(b[0]+b[2])/2,(b[1]+b[3])/2];
    this.ctx.drawImage(image,b[0],b[1],b[2]-b[0],b[3]-b[1],x+(b[0]-center[0])*scale,y+(b[1]-center[1])*scale,width,(b[3]-b[1])*scale);
  }
  draw(state){
    const ctx=this.ctx;ctx.clearRect(0,0,G.width,G.height);ctx.drawImage(this.assets.images['background.png'],0,0,G.width,G.height);
    // Small location rings distinguish stopping positions without adding more tracks.
    for(const side of ['left','right'])for(const position of ['inner','outer']){
      ctx.beginPath();ctx.arc(G[side][position],G.playerY,43,0,Math.PI*2);ctx.strokeStyle='#8d774d26';ctx.lineWidth=2;ctx.setLineDash([3,7]);ctx.stroke();ctx.setLineDash([]);
    }
    for(const row of state.rows)for(const rock of row.obstacles){
      ctx.save();if(row.settled)ctx.globalAlpha=.7;this.sprite('obstacle_rock.png',rock.x,row.y,104,[652,636]);ctx.restore();
    }
    for(const side of ['left','right']){
      const x=state.players[side];this.sprite('player_stone.png',x,G.playerY,80,[644,600]);
      if(state.feedback[side]>0){ctx.beginPath();ctx.arc(x,G.playerY,45,0,Math.PI*2);ctx.strokeStyle='#a6563a';ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#8b412b';ctx.font='bold 23px sans-serif';ctx.textAlign='center';ctx.fillText('碰到',x,G.playerY-61);}
      const controlX=side==='left'?422:858;
      // Fingers stay below the play line and do not follow the controlled stones.
      const finger=this.assets.metrics['finger.png'],b=finger.visible_bbox;
      const fingerWidth=94;const fingerHeight=(b[3]-b[1])/(b[2]-b[0])*fingerWidth;
      ctx.save();
      if(state.input[side])ctx.filter='brightness(.8)';
      this.sprite('finger.png',controlX,572+fingerHeight/2,fingerWidth);
      ctx.restore();
      ctx.strokeStyle=state.input[side]?'#74551e':'#746852';ctx.lineWidth=5;ctx.lineCap='round';ctx.lineJoin='round';
      const direction=side==='left'?-1:1,start=controlX-direction*18,end=controlX+direction*20,nailY=572+fingerHeight*.224;
      ctx.beginPath();ctx.moveTo(start,nailY);ctx.lineTo(end,nailY);ctx.lineTo(end-direction*11,nailY-10);ctx.moveTo(end,nailY);ctx.lineTo(end-direction*11,nailY+10);ctx.stroke();
    }
  }
}
