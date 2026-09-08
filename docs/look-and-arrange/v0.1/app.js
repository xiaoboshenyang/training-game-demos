(async () => {
'use strict';
const $=id=>document.getElementById(id);const settings={mode:'auto',budget:100,animation:100};
if(!window.BANK||!window.TEA_SOLUTIONS){$('overlayTitle').textContent='本地文件没有加载完整';$('overlayText').textContent='请保持整个“看图摆盘”文件夹结构，再打开本页。需要题库 bank.js 和答案 solutions.js。';document.querySelector('.modal-actions').hidden=true;return;}
// Decode every game image before enabling play, including the teapot first used in L4.
const startControls=['startbtn','tutbtn','devtoggle'];
startControls.forEach(id=>$(id).disabled=true);
$('overlayTitle').textContent='茶点正在准备';
$('overlayText').textContent='图片加载中，请稍候。';
try { await TeaUI.preload(); }
catch {
 $('overlayTitle').textContent='图片还没加载好';
 $('overlayText').textContent='请检查网络，然后重新加载。';
 $('tutbtn').hidden=true;$('startbtn').disabled=false;
 $('startbtn').textContent='重新加载';$('startbtn').onclick=()=>location.reload();
 return;
}
startControls.forEach(id=>$(id).disabled=false);
let shell;const ui=new TeaUI(i=>{if(['playing','tutorial'].includes(shell.phase))game.cell(i);});const game=new TeaGame(BANK,TEA_SOLUTIONS,settings,()=>shell&&shell.render());shell=new TeaShell(game,ui,settings);
$('startbtn').onclick=()=>shell.start();$('tutbtn').onclick=()=>shell.start(true);$('pausebtn').onclick=()=>shell.pause();$('resumebtn').onclick=()=>shell.resume();$('againbtn').onclick=()=>shell.start();$('restartbtn').onclick=()=>shell.start();$('answerbtn').onclick=()=>{if(shell.phase==='playing')game.answer();};$('confirmbtn').onclick=()=>game.confirm();$('cancelbtn').onclick=()=>game.cancel();$('retrybtn').onclick=()=>game.retry();
function panel(open){$('devpanel').hidden=!open;$('devtoggle').setAttribute('aria-expanded',String(open));if(open&&['playing','tutorial','countdown'].includes(shell.phase))shell.pause();}
$('devtoggle').onclick=()=>panel($('devpanel').hidden);$('devclose').onclick=()=>panel(false);
$('modeSelect').onchange=e=>{game.changeMode(e.target.value);shell.render();};$('budgetRange').oninput=e=>{settings.budget=+e.target.value;$('budgetValue').textContent=settings.budget+'%';};$('speedRange').oninput=e=>{settings.animation=+e.target.value;$('speedValue').textContent=settings.animation+'%';};$('defaultsbtn').onclick=()=>{settings.budget=100;settings.animation=100;$('budgetRange').value=100;$('speedRange').value=100;$('budgetValue').textContent='100%';$('speedValue').textContent='100%';$('modeSelect').value='auto';game.changeMode('auto');shell.render();};
document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!$('devpanel').hidden)panel(false);else if(shell.phase==='paused')shell.resume();else shell.pause();}if(event.key==='Tab'&&!$('overlay').hidden&&$('devpanel').hidden){const buttons=[...$('overlay').querySelectorAll('button:not([hidden])')];if(!buttons.length){event.preventDefault();return;}const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
function resize(){const scale=Math.min(innerWidth/1280,innerHeight/800);$('app').style.transform=`scale(${scale})`;}
addEventListener('resize',resize);resize();Object.defineProperty(window,'TeaDemo',{value:Object.freeze({snapshot:()=>shell.snapshot()}),writable:false});
})();
