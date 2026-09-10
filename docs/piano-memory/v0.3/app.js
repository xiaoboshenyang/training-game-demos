'use strict';
const $=id=>document.getElementById(id);
class PianoSound{
 constructor(){this.context=null;}
 unlock(){if(!this.context)this.context=new (window.AudioContext||window.webkitAudioContext)();if(this.context.state==='suspended')this.context.resume();}
 note(key,duration){if(!this.context)this.unlock();const c=this.context,t=c.currentTime,f=440*Math.pow(2,(PIANO_BANK.mapping.midi[key]-69)/12);const length=Math.max(.18,duration/1000);[1,2,3,4].forEach((harmonic,i)=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f*harmonic;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.17/[1,3,6,12][i],t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+length+.12);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+length+.15);});}
 pause(){this.context?.suspend();}
 resume(){this.context?.resume();}
 stop(){if(this.context){this.context.close();this.context=null;}}
}
const sound=new PianoSound();
const game=new PianoCore.Game(PIANO_BANK,event=>{if(event.type==='note')sound.note(event.key,event.duration);if(event.type==='pause')sound.pause();if(event.type==='resume')sound.resume();if(event.type==='end'||event.type==='reset')sound.stop();});
// The in-memory game is intentionally inspectable by local acceptance tests; no answers appear in the player UI.
window.pianoGame=game;
let last=performance.now(),pointer=null,overlayState='';
const keyButtons=Array.from({length:9},(_,i)=>{const b=document.createElement('button');b.className='key';b.dataset.key=i;b.setAttribute('aria-label',`第 ${i+1} 个琴键`);b.innerHTML='<img class="white" src="assets/key-white.png" alt="" draggable="false"><img class="gold" src="assets/key-gold.png" alt="" draggable="false">';b.addEventListener('pointerdown',e=>{e.preventDefault();if(pointer!==null)return;sync();if(game.phase!=='input'||game.paused)return;pointer=e.pointerId;b.setPointerCapture(e.pointerId);sound.unlock();game.input(i);render();});b.addEventListener('pointerup',e=>{if(pointer===e.pointerId)pointer=null;});b.addEventListener('pointercancel',()=>pointer=null);b.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.repeat){e.preventDefault();sync();game.input(i);render();}});$('keys').append(b);return b;});
function sync(){const now=performance.now();game.advance(now-last);last=now;}
function command(fn){sync();fn();last=performance.now();render();}
function start(){command(()=>{game.start();sound.unlock();});}
function formal(){command(()=>{game.formal();sound.unlock();});}
function showCard(state,html){if(overlayState===state)return;overlayState=state;$('card').className='card'+(state==='end'?' result':'');$('card').innerHTML=html;const actions={start,formal,resume:()=>command(()=>game.resume()),intro:()=>command(()=>game.reset())};$('card').querySelectorAll('[data-action]').forEach(b=>b.onclick=actions[b.dataset.action]);}
function render(){
 const q=game.question,n=q?.keys.length||3,phase=game.phase;
 $('time').textContent=`${String(Math.floor(Math.ceil(game.remaining/1000)/60)).padStart(2,'0')}:${String(Math.ceil(game.remaining/1000)%60).padStart(2,'0')}`;
 $('score').textContent=game.score;$('level').textContent='L'+game.level;
 $('mode').textContent=`${Number(game.applied?.mode??game.settings.mode)?'锁定':'自动'} · L${game.level}`;
 $('pause').disabled=['intro','ready','end'].includes(phase);$('pause').style.visibility=$('pause').disabled?'hidden':'visible';
 $('replay').disabled=phase!=='input'||game.assisted||game.paused;
 $('hint').textContent=game.assisted?'这次慢慢来':'记住位置，慢慢弹';
 let title='弹出一小段旋律',subtitle='先看琴键怎么弹，再照着顺序弹一遍',progress='只记顺序，不用赶节奏';
 if(phase==='demo'){title=game.assisted?'再看一遍':'先看一看';subtitle='记住琴键弹奏的顺序';progress=`这一句 ${n} 个音`;}
 if(phase==='gap'){title='准备好了吗';subtitle='接下来，照刚才的顺序弹';progress=`这一句 ${n} 个音`;}
 if(phase==='input'){title='轮到您了';subtitle='按刚才的顺序，慢慢弹';progress=`已弹 ${game.index} / ${n} 个音`;}
 if(phase==='wrong'){title='打错了';subtitle='没关系';progress='已有得分会保留';}
 if(phase==='retry'){title=game.reason==='wrong'?'再试一次':'我们再看一次';subtitle='看完整句，再从第一个音开始';progress='每句有一次重看机会';}
 if(phase==='skip'){title='换一句试试';subtitle='没关系，我们接着来';progress='已有得分会保留';}
 if(phase==='success'){title='答对了';subtitle=game.tutorial?'练习完成了':'准备下一题';progress=game.tutorial?'练习不计分':`+${game.lastPoints} 分`;}
 if(phase==='countdown'){title=String(Math.ceil(game.wait/1000));subtitle='先来练习一句';progress='练习不计时、不计分';}
 $('eyebrow').textContent=game.tutorial?'先练习一下 · 不计时':phase==='intro'?'琴键记忆':'';
 $('title').textContent=title;$('subtitle').textContent=subtitle;$('progress').textContent=progress;
 keyButtons.forEach((b,i)=>{b.classList.toggle('pressed',game.active===i&&!game.paused);b.classList.toggle('error',game.errorKey===i);b.setAttribute('aria-disabled',String(phase!=='input'||game.paused));});
 const feedback=phase==='success'||phase==='wrong';
 $('answer-feedback').hidden=!feedback||game.paused;
 $('answer-feedback').classList.toggle('incorrect',phase==='wrong');
 $('answer-feedback').querySelector('.answer-symbol').textContent=phase==='wrong'?'✕':'✓';
 $('answer-label').textContent=phase==='wrong'?'打错了':'答对了';
 $('answer-next').textContent=phase==='wrong'?(game.afterWrong==='retry'?'再试一次':'换一道题试试'):(game.tutorial?'练习完成了':'准备下一题');
 const show=game.paused||['intro','ready','end'].includes(phase);$('overlay').hidden=!show;
 if(game.paused)showCard('paused','<h2>休息一下</h2><p>时间已暂停，回来后接着弹。</p><button class="primary" data-action="resume">继续游戏</button><button class="secondary" data-action="intro">退出本局</button>');
 else if(phase==='intro')showCard('intro','<h2>琴键记忆</h2><p>先看琴键依次弹奏，<br>再按相同顺序，弹出一小段旋律。</p><button class="primary" data-action="start">开始练习</button><small>只记顺序，不比快慢 · 正式游戏 120 秒<br>建议横屏，打开声音</small>');
 else if(phase==='ready')showCard('ready','<h2>准备好了</h2><p>接下来开始正式游戏。<br>记不清时，可以点“再看一次”。</p><button class="primary" data-action="formal">开始游戏 · 120 秒</button>');
 else if(phase==='end'){
 const totals=game.stats.reduce((a,s)=>({correct:a.correct+s.correct,mistakes:a.mistakes+s.mistakes,assisted:a.assisted+s.assisted}),{correct:0,mistakes:0,assisted:0});
 showCard('end',`<h2>今天的演奏完成了</h2><div class="total">${game.score} <span style="font-size:20px">分</span></div><p>最高 L${game.highest} · 独立完成 ${totals.correct} 题 · 辅助完成 ${totals.assisted} 题</p><table><thead><tr><th>等级</th><th>得分</th><th>独立</th><th>辅助</th><th>失误</th></tr></thead><tbody>${game.stats.map((s,i)=>`<tr><td>L${i+1}</td><td>${s.score}</td><td>${s.correct}</td><td>${s.assisted}</td><td>${s.mistakes}</td></tr>`).join('')}</tbody></table><p>失误共 ${totals.mistakes} 题（含辅助完成），截止未完成的题不计失误。</p><button class="primary" data-action="start">再来一局</button><button class="secondary" data-action="intro">返回介绍</button>`);
 }else overlayState='';
 const mode=Number(game.applied?.mode??game.settings.mode);
 $('difficulty-current').textContent=game.tutorial?'当前：教学 · 3个音':game.applied?`当前：${mode?'锁定':'自动'} L${game.level} · 每题${PianoCore.LENGTHS[game.level-1]}个音`:'当前：等待开始';
 $('difficulty-streak').textContent=game.tutorial?'教学不计分，不影响升降级':mode?'锁定模式：保持所选等级':`连续独立完成 ${game.good}/${game.level<=3?2:3}${game.level===6?'（已到最高级）':' 题升级'} · 连续未独立完成 ${Math.min(game.hard,2)}/2 题降级${game.level===1?'（L1不再降低）':''}`;
 const pending=game.applied&&['mode','demo','idle'].some(k=>game.applied[k]!==game.settings[k]);
 $('difficulty-pending').textContent=pending?`待下一题采用：${game.settings.mode?'锁定 L'+game.settings.mode:'自动升降'} · 演示${game.settings.demo}% · 等待${game.settings.idle}%`:'设置已同步';
 $('effective').textContent=game.applied?`当前生效：${Number(game.applied.mode)?'锁定':'自动'} L${game.level}；演示 ${game.applied.demo}%，等待 ${game.applied.idle}%`:'当前生效：等待开始';
}
$('pause').onclick=()=>command(()=>game.pause());$('replay').onclick=()=>command(()=>game.help('manual'));
$('restart').onclick=()=>command(()=>{game.reset();});
document.querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{game.configure({mode:Number(b.dataset.level)});controls();render();});
function controls(){document.querySelectorAll('[data-level]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.level)===Number(game.settings.mode))));['mode','demo','idle'].forEach(k=>{$('set-'+k).value=game.settings[k];if(k!=='mode')$('value-'+k).textContent=game.settings[k]+'%';});$('settings-badge').textContent=`${game.settings.mode?'锁定 L'+game.settings.mode:'自动'} · ${game.settings.demo}% / ${game.settings.idle}%`;}
['mode','demo','idle'].forEach(k=>$('set-'+k).addEventListener('input',e=>{game.configure({[k]:Number(e.target.value)});controls();}));
$('defaults').onclick=()=>{game.configure(PianoCore.DEFAULTS);controls();};
document.addEventListener('visibilitychange',()=>{if(document.hidden)command(()=>game.pause());});
window.addEventListener('blur',()=>{pointer=null;});
function frame(){sync();render();requestAnimationFrame(frame);}controls();render();requestAnimationFrame(frame);
