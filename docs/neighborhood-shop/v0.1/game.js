import {createGameShell} from './shared/template.js';
import {Game,NAMES} from './engine.mjs';
import {createMusic} from './music.js';
const music=createMusic();
await Promise.all([1,2,3,4,5].map(n=>new Promise((resolve,reject)=>{const img=new Image();img.onload=resolve;img.onerror=()=>reject(new Error('商品素材加载失败'));img.src='./assets/'+String(n).padStart(2,'0')+'-alpha.png';}))).catch(error=>{document.querySelector('#mount').textContent='商品图片加载失败，请刷新页面重试。';throw error;});
const game=new Game();let api,container,hintElapsed=0,lastTick=performance.now(),stopped=false;
const bounds=[[10,100,500,350],[535,60,460,465],[30,590,455,315],[500,550,490,390],[75,15,365,480],[525,85,465,410],[35,535,460,410],[530,595,450,350],[40,40,445,415],[530,25,440,430],[25,530,470,380],[520,510,465,425],[30,35,425,450],[480,85,505,370],[10,550,490,380],[505,530,485,415],[15,65,500,365],[535,50,445,390],[20,590,495,325],[570,495,370,450]];
const sprite=id=>{const [x,y,w,h]=bounds[id];return `<svg class="product" viewBox="${x-12} ${y-12} ${w+24} ${h+24}" aria-hidden="true"><defs><clipPath id="crop-${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs><image clip-path="url(#crop-${id})" href="./assets/${String(Math.floor(id/4)+1).padStart(2,'0')}-alpha.png" width="1000" height="1000"/></svg>`;};
function render(){hintElapsed=0;container.innerHTML=`<div class="shop"><section class="order" aria-label="本次货号"><img class="shop-icon" src="./assets/icon.png" alt="街坊小卖部"><strong class="order-caption" role="status">请找亮着的货号</strong><div class="digits">${game.digits.map((n,i)=>`<div class="digit ${i===game.highlight?'active':''}" ${i===game.highlight?'aria-current="true"':''}>${n}</div>`).join('')}</div></section><div class="panels"><section class="choices panel"><header><h1>选商品</h1></header><div class="grid count-${game.answers.length}">${game.answers.map(n=>`<button class="tile" data-number="${n}" aria-label="${NAMES[game.pool[n-1]]}">${sprite(game.pool[n-1])}</button>`).join('')}</div></section><section class="reference panel"><header><h2>货号表</h2></header><div class="grid count-${game.reference.length}">${game.reference.map(n=>`<div class="ref-tile" aria-label="${n}号，${NAMES[game.pool[n-1]]}"><b>${n}</b>${sprite(game.pool[n-1])}</div>`).join('')}</div></section></div></div>`;
 container.querySelectorAll('.tile').forEach(button=>button.addEventListener('click',()=>{if(!api.isInteractive())return;const outcome=game.answer(Number(button.dataset.number));api.feedback({correct:outcome.correct,score:outcome.score,scoreDelta:outcome.delta,level:outcome.level,levelUp:outcome.levelUp,onComplete:()=>{game.next(outcome.changed);render();}});}));
}
const config={title:'街坊小卖部',clock:'internal',feedbackDurationMs:1000,icon:'./assets/icon.png',onState:({state})=>music.state(state)};
api=createGameShell({mount:document.querySelector('#mount'),config,mode:'playtest',adapter:{
 mount(ctx){container=ctx.container;api=ctx.api;},
 start(){music.reset();game.reset();render();api.update({score:0,level:1});},
 pause(){},resume(){lastTick=performance.now();},
 getResult(){const result=game.result();window.lastGameResult=result;return result;},
 destroy(){stopped=true;music.destroy();}
}});
function tick(now){const dt=now-lastTick;lastTick=now;if(api.isInteractive()){hintElapsed+=dt;if(hintElapsed>=10000){const hint=container.querySelector('.order-caption');hint.textContent='看看亮着的货号';hint.classList.add('reminder');}}if(!stopped)requestAnimationFrame(tick);}requestAnimationFrame(tick);
document.addEventListener('visibilitychange',()=>{if(document.hidden)api.pause();});
window.addEventListener('keydown',e=>{if(e.key==='Escape'){const s=api.getState().state;if(s==='paused')api.resume();else api.pause();}});
window.shopDebug={snapshot:()=>({shell:api.getState(),level:game.level,score:game.score,round:game.round,target:game.target,pool:[...game.pool],digits:[...game.digits],highlight:game.highlight,answers:[...game.answers],reference:[...game.reference],result:game.result()})};







