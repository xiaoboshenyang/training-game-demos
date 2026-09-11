import {createGameShell,LEVELS as LABELS} from './public-template/template.js';
import {LEVELS,defaults,splitAt,newSession,nextQuestion,judge} from './rules.mjs';
let api,container,board,dev,settings=defaults(),session,question,phase='memory',input='',halted=true,unlocked=false;
const music=new Audio('assets/bgm-018.mp3');music.loop=true;music.preload='auto';
const keySounds=Object.fromEntries([['input','assets/input-02.wav'],['delete','assets/delete-09.ogg']].map(([name,src])=>[name,Array.from({length:6},()=>{const a=new Audio(src);a.preload='auto';a.volume=.65;return a;})]));
function playKeySound(name){const pool=keySounds[name];const a=pool.find(a=>a.paused||a.ended)||pool[0];a.currentTime=0;a.play().catch(()=>{});}
function stopKeySounds(){Object.values(keySounds).flat().forEach(a=>{a.pause();a.currentTime=0;});}
function musicSync(){music.volume=phase==='memory'?.10:.18;if(unlocked&&!halted&&!document.hidden){music.play().catch(()=>{});}else music.pause();}
const cabinet=success=>'<div class="cabinet '+(success?'success':'')+'" aria-label="'+(success?'柜门打开，拿到包裹':'快递柜，柜门关闭')+'"><div class="cabinet-grid">'+Array.from({length:9},(_,i)=>'<div class="cell '+(i===4?'target':'')+'"><div class="parcel"></div><div class="door"><i></i></div></div>').join('')+'</div></div>';
const digits=(value,length)=>Array.from({length},(_,i)=>'<span class="digit '+(splitAt(length)===i?'group-start':'')+'">'+(value[i]??'＿')+'</span>').join('');
function render(){
 const memory=phase==='memory',done=phase==='feedback',success=done&&question.result.correct;
 board.className=memory?'parcel-board memory-layout':'parcel-board input-layout';
 board.dataset.phase=phase;board.dataset.question=question.id;board.dataset.level=question.level;
 if(memory){board.innerHTML='<div class="person-wrap"><img class="person" src="assets/person.png" alt="微笑着托你取快递的邻居"></div><section class="memory-card"><h1>帮我取个快递吧！</h1><div id="memory-code" class="memory-code" aria-label="取件码 '+question.code.split('').join(' ')+'">'+digits(question.code,question.code.length)+'</div><button id="remember" class="primary remember">去取件</button></section>';board.querySelector('#remember').onclick=()=>{if(!interactive()||phase!=='memory')return;phase='input';render();};}
 else {board.innerHTML=cabinet(success)+'<section class="keypad-panel"><h1>请输入取件码</h1><div id="entered-code" class="entered-code" role="status" aria-label="已输入 '+input.split('').join(' ')+'">'+digits(input,question.code.length)+'</div><div class="keypad">'+[1,2,3,4,5,6,7,8,9,'删除',0,'确认'].map(k=>'<button class="key '+(k==='确认'?'confirm':'')+'" data-key="'+k+'" '+(done?'disabled':'')+'>'+k+'</button>').join('')+'</div><p class="input-hint" id="input-hint" role="status"></p></section>';board.querySelectorAll('[data-key]').forEach(b=>b.onclick=()=>press(b.dataset.key));}
 musicSync();renderDev();
}
function interactive(){return !halted&&api.isInteractive()&&api.getState().remainingMs>0;}
function next(){question=nextQuestion(session,settings);input='';phase='memory';api.update({score:session.score,level:session.level});render();}
function press(key){if(!interactive()||phase!=='input')return;
 if(key==='确认'){const previousScore=session.score;const result=judge(session,question,input);if(!result){board.querySelector('#input-hint').textContent='请输满取件码';return;}question.result=result;phase='feedback';render();api.feedback({scoreDelta:session.score-previousScore,correct:result.correct,score:session.score,level:session.level,levelUp:result.changed>0,onComplete:next});return;}
 if(key==='删除'){if(!input.length)return;input=input.slice(0,-1);playKeySound('delete');}else if(/^\d$/.test(key)&&input.length<question.code.length){input+=key;playKeySound('input');}else return;
 const box=board.querySelector('#entered-code');box.innerHTML=digits(input,question.code.length);box.setAttribute('aria-label','已输入 '+input.split('').join(' '));board.querySelector('#input-hint').textContent='';
}
function renderDev(){if(!session)return;const active=question?.settings||settings;const totals=session.rows.reduce((a,r)=>({correct:a.correct+r.correct,wrong:a.wrong+r.wrong}),{correct:0,wrong:0});
 dev.querySelector('#active-settings').textContent=(active.mode?'锁定':'自动')+' L'+(question?.level||session.level)+' · 升级 '+active.up+'% · 降级 '+active.down+'%';
 dev.querySelector('#stats').textContent='总分 '+session.score+' · 正确 '+totals.correct+' · 失误 '+totals.wrong+' · 最高 L'+session.highest+'\n'+session.rows.map((r,i)=>'L'+(i+1)+'：'+r.score+' 分 / 对 '+r.correct+' / 错 '+r.wrong).join('\n');
 dev.dataset.score=session.score;dev.dataset.correct=totals.correct;dev.dataset.wrong=totals.wrong;dev.dataset.highest=session.highest;
 dev.querySelector('#mode-select').value=settings.mode;dev.querySelectorAll('[data-setting]').forEach(e=>e.value=settings[e.dataset.setting]);
}
function keydown(e){if(e.target.closest('#parcel-dev'))return;if(/^\d$/.test(e.key)||['Backspace','Enter'].includes(e.key)){if(phase==='input'&&interactive()){e.preventDefault();press(e.key==='Backspace'?'删除':e.key==='Enter'?'确认':e.key);}}}
function unlock(e){if(e.target.closest('#btnPause,#parcel-dev'))return;unlocked=true;musicSync();}
function visibility(){if(document.hidden){api.pause();music.pause();}}
const adapter={
 mount(ctx){api=ctx.api;container=ctx.container;container.id='parcel-game';board=document.createElement('div');container.append(board);dev=document.createElement('aside');dev.id='parcel-dev';dev.innerHTML='<details><summary>试玩设置</summary><div class="dev-content"><p id="active-settings"></p><p>下一题生效；切回自动沿用当前等级。再试保留设置，刷新复位。</p><label>等级模式<select id="mode-select"><option value="0">自动</option>'+LEVELS.slice(1).map((l,i)=>'<option value="'+(i+1)+'">锁定 L'+(i+1)+' · '+l.length+' 位</option>').join('')+'</select></label>'+[['up','升级门槛'],['down','降级门槛']].map(([k,n])=>'<label>'+n+'<select data-setting="'+k+'">'+[50,75,100,125,150,200].map(v=>'<option value="'+v+'">'+v+'%</option>').join('')+'</select></label>').join('')+'<button id="reset-dev">恢复默认</button><p>100%：L1–3 连对2题，L4–5 连对3题；连错2题降级。公共反馈固定1.2秒。背景音乐018，首次操作后播放。</p><pre id="stats"></pre></div></details>';container.parentElement.parentElement.append(dev);dev.querySelector('#mode-select').onchange=e=>settings.mode=Number(e.target.value);dev.querySelectorAll('[data-setting]').forEach(e=>e.onchange=()=>settings[e.dataset.setting]=Number(e.value));dev.querySelector('#reset-dev').onclick=()=>{settings=defaults();renderDev();};document.addEventListener('keydown',keydown);document.addEventListener('pointerdown',unlock);document.addEventListener('keydown',unlock);document.addEventListener('visibilitychange',visibility);},
 start(){session=newSession(crypto.getRandomValues(new Uint32Array(1))[0]);halted=false;music.pause();music.currentTime=0;next();},
 pause(){halted=true;musicSync();stopKeySounds();},resume(){halted=false;musicSync();},
 getResult(){renderDev();return{totalScore:session.score,levels:session.rows.map((r,i)=>({level:i+1,label:LABELS[i],score:r.score,clears:r.correct,errors:r.wrong}))};},
 destroy(){stopKeySounds();music.pause();music.src='';dev.remove();document.removeEventListener('keydown',keydown);document.removeEventListener('pointerdown',unlock);document.removeEventListener('keydown',unlock);document.removeEventListener('visibilitychange',visibility);}
};
createGameShell({mount:document.querySelector('#mount'),mode:'playtest',config:{title:'取件达人',icon:'assets/icon.png',background:'assets/background.svg',clock:'internal',feedbackDurationMs:1200},adapter});
