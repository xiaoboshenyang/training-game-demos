(() => {
'use strict';
const ASSETS='assets/elements/';
const FILES=['','item_cup.png','item_cake_square.png','item_cake_diamond.png','item_cake_green.png'];
const NAMES=['空位置','蓝色茶杯','黄色方糕','粉色菱形糕','绿色花糕'];
const $=id=>document.getElementById(id);
class TeaUI {
 static async preload(){
  const urls=[...FILES.slice(1),'teapot.png','slot_empty.png'].map(file=>ASSETS+file);
  urls.push(ASSETS+'../scene/table_background.png',ASSETS+'../scene/tray_base.png');
  TeaUI.loadedImages=await Promise.all(urls.map(src=>new Promise((resolve,reject)=>{
   const img=new Image();const timeout=setTimeout(()=>reject(new Error('Image load timed out')),20000);
   img.onload=async()=>{try{await img.decode();clearTimeout(timeout);resolve(img);}catch(error){clearTimeout(timeout);reject(error);}};
   img.onerror=()=>{clearTimeout(timeout);reject(new Error('Image load failed'));};img.src=src;
  })));
 }
 constructor(onCell){this.onCell=onCell;this.motion=null;}
 box(i,n){const gap=5;const s=(428-gap*(n-1))/n;return {x:(i%n)*(s+gap),y:Math.floor(i/n)*(s+gap),s};}
 rectBox(rect,n){const first=this.box(rect[0]*n+rect[1],n),last=this.box(rect[2]*n+rect[3],n);return{x:first.x-3,y:first.y-3,w:last.x+last.s-first.x+6,h:last.y+last.s-first.y+6};}
 position(el,b){Object.assign(el.style,{left:b.x+'px',top:b.y+'px',width:(b.w||b.s)+'px',height:(b.h||b.s)+'px'});}
 image(value,pin=false){const img=document.createElement('img');img.className='piece';img.src=ASSETS+(pin?'teapot.png':FILES[value]);img.alt='';img.draggable=false;return img;}
 draw(el,game,interactive){el.replaceChildren();for(let i=0;i<game.n*game.n;i++){const cell=document.createElement(interactive?'button':'div');cell.className='cell';cell.dataset.cell=i;const box=this.box(i,game.n);this.position(cell,box);const pin=game.pins.includes(i);const val=interactive?game.state[i]:game.target[i];cell.setAttribute('aria-label',`${Math.floor(i/game.n)+1}行${i%game.n+1}列，${pin?'固定茶壶':NAMES[val]}`);if(val||pin){const img=this.image(val,pin);if(interactive&&!pin)img.style.transform=`rotate(${game.rotations[i]}deg)`;cell.append(img);}if(pin){const tag=document.createElement('span');tag.className='pin-tag';tag.textContent='固定';cell.append(tag);}if(interactive){cell.disabled=!game.canAct();cell.onclick=()=>this.onCell(i);if(game.pick===i)cell.classList.add('pick');if(game.hint){const hint=game.hint;const order=i===hint[0]*game.n+hint[1]?1:i===hint[2]*game.n+hint[3]?2:0;if(order){cell.dataset.hint=order;cell.classList.add('hint');}}}el.append(cell);}
 if(interactive&&game.pending){const frame=document.createElement('div');frame.className='selection';this.position(frame,this.rectBox(game.pending,game.n));el.append(frame);const after=game.flip(game.state,game.pending);after.forEach((v,i)=>{if(v&&v!==game.state[i]){const ghost=this.image(v);ghost.style.transform=`rotate(${game.flip(game.rotations,game.pending)[i]}deg)`;ghost.classList.add('ghost');this.position(ghost,this.box(i,game.n));el.append(ghost);}});}}
 render(game,phase,settings){this.draw($('target'),game,false);this.draw($('board'),game,true);this.motion=null;$('score').textContent=game.score;$('modeLabel').textContent=(game.tutorial?'教学':settings.mode==='auto'?'自动':'锁定')+' · L'+game.level;$('roundLabel').textContent=game.tutorial?'教学 '+(game.tutorialStep+1)+' / 3':`第 ${game.round} 题 · ${game.n} × ${game.n}`;$('budget').textContent=game.tutorial||game.peeked?'—':Math.max(0,game.budget-game.moves);$('instruction').textContent=game.tutorial?['① 点这两格，让它们换位置','② 点两头，两头换位置，中间原地转半圈','③ 点对角，框里的都换到对面'][game.tutorialStep]:game.peeked?'跟着 ① 和 ②，完成这一盘':game.cfg.preview?'点两个位置，想好了再点「换一下」':'点两个位置，框里的一起换到对面';$('message').textContent=game.message;$('message').classList.toggle('bad',game.bad);$('confirmbtn').hidden=!game.pending;$('cancelbtn').hidden=!game.pending;$('answerbtn').hidden=game.tutorial;$('answerbtn').disabled=!game.canAct()||phase!=='playing';$('retrybtn').hidden=!game.tutorial;$('retrybtn').disabled=!game.canAct();$('teapotNote').textContent=game.pins.length?'茶壶固定不动，框里不能有茶壶':'空位置也可以点';$('progress').textContent=game.tutorial?'教学不计时、不计分。完成动作后进入下一步。':game.peeked?(settings.mode==='auto'?`下一题 L${game.level} · 当前按原题演示`:`手动锁定 L${game.level} · 本题不计分`):settings.mode==='auto'?(game.level===6?'已到最高等级 L6':`连续干净摆好 ${game.cleanStreak} / ${game.level<3?1:2} 题后升级`):`手动锁定 L${game.level} · 不自动升降级`;if(game.animation)this.animate(game);}
 animate(game){const a=game.animation;if(!a)return;if(!this.motion){const b=this.rectBox(a.rect,game.n);const group=document.createElement('div');group.className='movegroup';this.position(group,b);const children=[];const [r1,c1,r2,c2]=a.rect;for(let r=r1;r<=r2;r++)for(let c=c1;c<=c2;c++){const i=r*game.n+c;if(!game.state[i])continue;const original=$('board').querySelector(`[data-cell="${i}"] .piece`);if(original)original.style.visibility='hidden';const img=this.image(game.state[i]);const p=this.box(i,game.n);this.position(img,{x:p.x-b.x,y:p.y-b.y,s:p.s});group.append(img);children.push({img,rotation:game.rotations[i],center:r*2===r1+r2&&c*2===c1+c2});}const frame=document.createElement('div');frame.className='selection';this.position(frame,b);$('board').append(frame,group);this.motion={group,children};}const progress=Math.min(1,a.elapsed/a.duration);const easing=progress*progress*(3-2*progress);const angle=180*easing;this.motion.group.style.transform=`rotate(${angle}deg)`;this.motion.children.forEach(({img,rotation,center})=>img.style.transform=`rotate(${rotation-(center?0:angle)}deg)`);}
}
window.TeaUI=TeaUI;
})();
