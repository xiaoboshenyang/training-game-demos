import {createGameShell} from './public-template/template.js';
const {Game,ITEMS,LEVELS,DEFAULTS}=MatchGame;
const game=new Game();game.externalFeedback=true;
let host,board,boardKey='',last=performance.now(),feedbackSent=false,wasPaused=false;
const $=s=>document.querySelector(s);
const names=Object.fromEntries(ITEMS);
function sync(){const now=performance.now();game.advance(now-last);last=now;if(game.phase==='end'){host.finish(result());return;}host.update({score:game.score,level:game.phase==='board'?game.nextLevel:game.level,remainingMs:game.remaining});}
function result(){return {totalScore:game.score,levels:game.stats.map((s,i)=>({level:i+1,score:s.score,clears:s.success,errors:s.failed}))};}
function paint(){
 const key=game.boardNumber+':'+game.cards.map(c=>c.id).join(',');
 if(key!==boardKey){boardKey=key;board.innerHTML=game.cards.map((c,i)=>'<button class="tile" data-index="'+i+'"><span class="arch"></span><img alt="" src="assets/objects/'+c.id+'.png"></button>').join('');}
 const s=game.spec;const size=Math.floor(Math.min(210,(1150-16*(s.cols-1))/s.cols,(566-16*(s.rows-1))/s.rows));
 board.style.setProperty('--cols',s.cols);board.style.setProperty('--rows',s.rows);board.style.setProperty('--card',size+'px');
 [...board.children].forEach((el,i)=>{const c=game.cards[i],face=game.selected.includes(i)||game.hintCards.includes(i);
 el.className='tile'+(face?' face':'')+(c.matched&&!face?' done':'')+(face&&game.phase==='mismatch'?' mismatch':'');
 el.disabled=!host.isInteractive()||game.paused||game.phase!=='playing'||c.matched||game.selected.includes(i);
 el.setAttribute('aria-label','第'+(i+1)+'张，'+(c.matched?'已配对':face?names[c.id]:'未翻开'));});
 $('#pairs').textContent='找到 '+game.cards.filter(c=>c.matched).length/2+' / '+game.cards.length/2+' 对';
 $('#mistakes').textContent='还可以错配 '+Math.max(0,game.limit-game.mistakes)+' 次';
 $('#message').textContent=game.phase==='mismatch'?'不一样，记住它们的位置':game.phase==='match'?'配成一对了，继续找':game.phase==='hint'?'记住这一对的位置':game.phase==='board'?(game.outcome==='success'?'这一盘 +'+game.spec.score+' 分':'换一组，再试试'):game.selected.length?'找一找，另一张在哪里？':'翻开两张，找到一样的';
 $('#hint').hidden=!game.canHelp;
 const a=game.applied;$('#applied').textContent=(a.mode?'锁定':'自动升降')+' · L'+game.level+' · 宽容 '+a.tolerance+'% · 停留 '+a.hold+'% · 升级 '+a.upgrade+'%';
 if(game.phase==='board'&&!feedbackSent){feedbackSent=true;host.feedback({correct:game.outcome==='success',score:game.score,level:game.nextLevel,levelUp:game.nextLevel>game.level,onComplete:()=>{
  if(game.phase==='end')return;game.level=game.nextLevel;game.newBoard();feedbackSent=false;host.update({score:game.score,level:game.level});paint();
 }});}
}
const adapter={
 mount({container,api}){host=api;container.innerHTML='<section id="play-area"><div class="board-heading"><span id="pairs"></span><span id="mistakes"></span></div><div id="board-space"><div id="board" aria-label="配对卡牌"></div></div><div class="guidance"><strong id="message" role="status"></strong><button id="hint" hidden>给我一个提示</button></div></section>';board=$('#board');
 board.onclick=e=>{const t=e.target.closest('[data-index]');if(!t||!host.isInteractive())return;sync();if(game.phase==='end')return;game.flip(Number(t.dataset.index));paint();};
 $('#hint').onclick=()=>{sync();if(host.isInteractive())game.help();paint();};},
 start(){game.formal();feedbackSent=false;last=performance.now();host.update({score:0,level:game.level,remainingMs:120000});paint();},
 pause(){game.pause();last=performance.now();},resume(){game.resume();last=performance.now();},getResult:result
};
await Promise.all(ITEMS.map(([id])=>new Promise((resolve,reject)=>{const im=new Image();im.onload=resolve;im.onerror=()=>reject(Error('素材缺失：'+id));im.src='assets/objects/'+id+'.png';})));
const shell=createGameShell({mount:$('#mount'),mode:'playtest',config:{templateVersion:'1.1.0',title:'好物成双',background:'assets/wood.jpg',clock:'external',feedbackDurationMs:1500},adapter});
function frame(){sync();paint();requestAnimationFrame(frame);}requestAnimationFrame(frame);
function controls(){
 document.querySelectorAll('[data-mode]').forEach(b=>b.classList.toggle('active',Number(b.dataset.mode)===game.settings.mode));
 for(const k of ['tolerance','hold','upgrade']){$('#'+k).value=game.settings[k];$('#v-'+k).textContent=game.settings[k]+'%';}
 const l=game.settings.mode||game.level,s=LEVELS[l-1];$('#effective').textContent='下一盘：'+(game.settings.mode?'锁定 L'+l:'自动升降')+'；错配 '+Math.round(s.limit*game.settings.tolerance/100)+' 次失败，停留 '+(1.2*game.settings.hold/100).toFixed(1)+' 秒，连续 '+Math.round(game.settings.upgrade/100)+' 盘升级。';
}
$('#settings-open').onclick=()=>{sync();wasPaused=host.getState().state==='paused';host.pause();controls();$('#settings').showModal();};
$('#settings').onclose=()=>{if(!wasPaused)host.resume();last=performance.now();};
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{game.configure({mode:b.dataset.mode});controls();});
for(const k of ['tolerance','hold','upgrade'])$('#'+k).oninput=e=>{game.configure({[k]:e.target.value});controls();};
$('#defaults').onclick=()=>{game.configure(DEFAULTS);controls();};
$('#apply').onclick=()=>{$('#settings').close();host.start(true);};
document.addEventListener('visibilitychange',()=>{if(document.hidden){sync();host.pause();}last=performance.now();});

