import {LEVELS,defaults,splitAt,newSession,nextQuestion,judge} from './rules.mjs';
const $=s=>document.querySelector(s),game=$('#game'),top=$('#top'),overlay=$('#overlay');
let settings=defaults(),session=null,question=null,phase='demo',mode='demo',input='',remaining=120000,feedbackRemaining=0,paused=false,last=performance.now(),countdownRemaining=0,countdownTarget='tutorial',demoElapsed=0,demoReturn='intro',endedRemaining=0,lastCountdown=0;
const seed=()=>crypto.getRandomValues(new Uint32Array(1))[0];
const totals=()=>session?session.rows.reduce((a,r)=>({correct:a.correct+r.correct,wrong:a.wrong+r.wrong}),{correct:0,wrong:0}):{correct:0,wrong:0};
const cabinet=success=>'<div class="cabinet '+(success?'success':'')+'" aria-label="'+(success?'柜门打开，拿到包裹':'快递柜，柜门关闭')+'"><div class="cabinet-grid">'+Array.from({length:9},(_,i)=>'<div class="cell '+(i===4?'target':'')+'"><div class="parcel"><span></span></div><div class="door"><i></i></div></div>').join('')+'</div></div>';
function codeMarkup(value,length){const at=splitAt(length);return Array.from({length},(_,i)=>'<span class="digit '+(at===i?'group-start':'')+'">'+(value[i]??'＿')+'</span>').join('');}
function renderTop(){
 top.innerHTML='<button id="pause" class="pill">'+(mode==='demo'?'取快递':'帮助 / 暂停')+'</button><div class="top-stats"><span class="pill">'+(mode==='tutorial'?'教学 · 不计时':mode==='demo'?'玩法演示':('剩余 <b id="seconds">'+Math.ceil(remaining/1000)+'</b> 秒'))+'</span><span class="pill">'+(mode==='play'?(question?.settings.mode?'锁定':'自动'):'等级')+' L'+(question?.level??1)+'</span><span class="pill">得分 <b>'+((mode==='play')?session?.score??0:0)+'</b></span></div>';
 $('#pause').disabled=!['memory','input','feedback'].includes(phase)||mode==='demo';
 $('#pause').onclick=pause;
}
function renderPlay(message=''){
 renderTop();const memory=phase==='memory',feedback=phase==='feedback',success=feedback&&question.result?.correct;
 game.className=memory?'memory-layout':'input-layout';
 if(memory){
 game.innerHTML='<div class="person-wrap"><img class="person" src="assets/person.png" alt="微笑着托你取快递的邻居"></div><section class="memory-card"><h1>帮我取个快递吧！</h1><p class="label">取件码是</p><div id="memory-code" class="memory-code" aria-label="取件码 '+question.code.split('').join(' ')+'">'+codeMarkup(question.code,question.code.length)+'</div><p class="hint">记住这 '+question.code.length+' 位数字</p><button id="remember" class="primary remember">记好了，去取件 →</button></section>';
 $('#remember').onclick=remember;
 }else{
 game.innerHTML=cabinet(success)+'<section class="keypad-panel '+(feedback?(success?'correct':'incorrect'):'')+'"><h1 id="input-title">'+(feedback?(success?'✓ 取件成功！':'× 取件码不对'):'请输入取件码')+'</h1><div id="entered-code" class="entered-code" role="status" aria-label="已输入 '+input.split('').join(' ')+'">'+codeMarkup(input,question.code.length)+'</div><div class="keypad">'+[1,2,3,4,5,6,7,8,9,'删除',0,'确认'].map(k=>'<button class="key '+(k==='确认'?'confirm':'')+'" data-key="'+k+'" '+(feedback?'disabled':'')+'>'+k+'</button>').join('')+'</div><p class="input-hint" id="input-hint" role="status">'+(feedback?(success?(mode==='play'?'拿到包裹，+'+question.result.points+' 分':'做得好，包裹取到了！'):'本题结束，准备下一件'):message||'输入后，点击确认')+'</p></section>';
 game.querySelectorAll('[data-key]').forEach(b=>b.onclick=()=>press(b.dataset.key));
 }
 if(mode==='tutorial')game.insertAdjacentHTML('beforeend','<div class="tutorial-note">'+(memory?'先练一次：记住取件码，再点“记好了”':feedback?(success?'教学完成，马上开始正式取件':'没关系，换一个码再练一次'):'按数字键输入刚才的码，再点“确认”')+'</div>');
 if(mode==='demo')game.insertAdjacentHTML('beforeend','<div class="demo-note">自动演示：记住取件码 → 输入 → 开柜取件</div><button id="close-demo" class="close-demo">关闭演示 ×</button>');
 if($('#close-demo'))$('#close-demo').onclick=()=>endDemo(false);
 renderDev();
}
function startQuestion(){question=nextQuestion(session,settings);input='';phase='memory';renderPlay();}
function remember(){if(paused||phase!=='memory')return;phase='input';input='';renderPlay();}
function guardTime(){if(mode==='play'&&!paused)advance(performance.now());return mode!=='play'||remaining>0;}
function press(key){
 if(paused||phase!=='input'||mode==='demo'||!guardTime())return;
 if(key==='确认'){submit();return;}
 if(key==='删除')input=input.slice(0,-1);else if(/^\d$/.test(key)&&input.length<question.code.length)input+=key;
 const box=$('#entered-code');if(box){box.innerHTML=codeMarkup(input,question.code.length);box.setAttribute('aria-label','已输入 '+input.split('').join(' '));}if($('#input-hint'))$('#input-hint').textContent='输入后，点击确认';
}
function submit(){
 if(paused||phase!=='input'||!guardTime())return;
 const result=judge(session,question,input);
 if(!result){$('#input-hint').textContent='请输满取件码';return;}
 question.result=result;phase='feedback';feedbackRemaining=1200*question.settings.feedback/100;renderPlay();
}
function startPlay(){mode='play';session=newSession(seed());remaining=120000;feedbackRemaining=0;last=performance.now();startQuestion();}
function startTutorial(){mode='tutorial';session=newSession(seed());question=nextQuestion(session,defaults());input='';phase='memory';renderPlay();}
function countdown(target){paused=false;overlay.innerHTML='';phase='countdown';mode='ready';countdownRemaining=3000;countdownTarget=target;lastCountdown=3;game.className='center';game.innerHTML='<div class="countdown" id="countdown">3</div>';renderTop();last=performance.now();}
function intro(resuming=false){
 top.innerHTML='';game.className='intro';game.innerHTML='<div class="intro-heading"><span class="eyebrow">记住号码 · 帮忙取件</span><h1>取快递</h1></div><div class="intro-grid"><div class="intro-preview">'+cabinet(true)+'<button id="watch" class="secondary">全屏播放演示</button></div><div class="intro-copy"><h2>'+(resuming?'已暂停':'帮邻居把快递带回来')+'</h2><p>先记住取件码，再到快递柜输入。<br>输入正确，柜门就会打开。</p><p>每局 120 秒，从 3 位逐渐挑战到 8 位。<br>答错不扣分，连续答对可以升级。</p><p class="small">训练能力：工作记忆 · 数字保持</p><button id="start" class="primary">'+(resuming?'继续训练':'开始游戏')+'</button><button id="home" class="text-button">返回主页</button></div></div>';
 $('#start').onclick=resuming?resume:()=>countdown('tutorial');$('#home').onclick=resuming?confirmExit:home;$('#watch').onclick=()=>startDemo(resuming?'pause':'intro');
 if(!resuming)phase='intro';
}
function pause(){if(paused||mode==='demo'||!['memory','input','feedback'].includes(phase))return;advance(performance.now());if(phase==='ended'||phase==='results')return;paused=true;intro(true);}
function resume(){paused=false;last=performance.now();overlay.innerHTML='';renderPlay();}
function confirmExit(){overlay.innerHTML='<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true"><h2>退出训练？</h2><p>退出后，本次训练进度不会保存，确定退出吗？</p><button id="cancel-exit" class="secondary">取消</button><button id="confirm-exit" class="primary">确定退出</button></section></div>';$('#cancel-exit').onclick=()=>overlay.innerHTML='';$('#confirm-exit').onclick=home;}
function home(){paused=false;session=null;question=null;input='';overlay.innerHTML='';phase='home';mode='home';top.innerHTML='';game.className='center';game.innerHTML='<section class="home-card"><span class="eyebrow">本地训练试玩</span><h1>取快递</h1><p>记住取件码，帮忙拿回包裹。</p><button id="enter" class="primary">进入游戏</button></section>';$('#enter').onclick=()=>startDemo('intro');}
let demoSaved=null;
function startDemo(destination='intro'){
 demoReturn=destination;
 demoSaved=destination==='pause'?{session,question,phase,mode,input,feedbackRemaining}:null;
 mode='demo';phase='memory';demoElapsed=0;session=newSession(58261937);question=nextQuestion(session,defaults());question.code='582';input='';paused=false;renderPlay();last=performance.now();
}
function endDemo(completed){
 if(demoSaved){({session,question,phase,mode,input,feedbackRemaining}=demoSaved);demoSaved=null;paused=true;intro(true);}
 else {mode='intro';session=null;question=null;intro();}
}
function endTime(){remaining=0;phase='ended';endedRemaining=1400;game.className='center';game.innerHTML='<section class="home-card"><h1>时间到，训练完成</h1><p>正在整理这次的取件成绩</p></section>';renderTop();}
function results(){
 phase='results';top.innerHTML='';const t=totals();game.className='results';
 game.innerHTML='<span class="eyebrow">取快递 · 工作记忆</span><h1>本次训练完成</h1><div class="result-summary"><strong>'+session.score+'<small>总分</small></strong><span>取到 <b>'+t.correct+'</b> 件包裹</span><span>最高 <b>L'+session.highest+'</b></span><span>正确 '+t.correct+' 题 · 失误 '+t.wrong+' 题</span></div><table><thead><tr><th>等级</th><th>码长</th><th>得分</th><th>正确</th><th>失误</th></tr></thead><tbody>'+session.rows.map((r,i)=>'<tr><td>L'+(i+1)+'</td><td>'+(i+3)+' 位</td><td>'+r.score+'</td><td>'+r.correct+'</td><td>'+r.wrong+'</td></tr>').join('')+'</tbody></table><div class="result-actions"><button id="again" class="primary">继续训练</button><button id="result-home" class="secondary">返回主页</button></div>';
 $('#again').onclick=()=>countdown('play');$('#result-home').onclick=home;
}
function advance(now){
 const dt=Math.max(0,now-last);last=now;if(paused)return;
 if(phase==='countdown'){countdownRemaining-=dt;const n=Math.max(1,Math.ceil(countdownRemaining/1000));if(n!==lastCountdown){lastCountdown=n;$('#countdown').textContent=n;}if(countdownRemaining<=0)(countdownTarget==='play'?startPlay:startTutorial)();return;}
 if(phase==='ended'){endedRemaining-=dt;if(endedRemaining<=0)results();return;}
 if(!['memory','input','feedback'].includes(phase))return;
 if(mode==='demo'){
 demoElapsed+=dt;
 if(demoElapsed>=6500){endDemo(true);return;}
 if(demoElapsed>=4500&&phase==='input'){input=question.code;question.result=judge(session,question,input);phase='feedback';renderPlay();}
 else if(demoElapsed>=2200&&phase==='memory'){phase='input';renderPlay();}
 if(phase==='input'){const count=Math.min(3,Math.floor((demoElapsed-2200)/600));input=question.code.slice(0,count);$('#entered-code').innerHTML=codeMarkup(input,3);}
 return;
 }
 if(mode==='play'){remaining=Math.max(0,remaining-dt);if($('#seconds'))$('#seconds').textContent=Math.ceil(remaining/1000);if(remaining<=0){endTime();return;}}
 if(phase==='feedback'){feedbackRemaining-=dt;if(feedbackRemaining<=0){if(mode==='tutorial'&&question.result.correct)startPlay();else if(mode==='tutorial')startTutorial();else startQuestion();}}
}
function renderDev(){
 const el=$('#dev');if(el.hidden)return;
 const active=question?.settings??settings;
 el.innerHTML='<h2>试玩设置</h2><p>修改从下一题生效；切回自动沿用当前等级。重开保留设置，自动模式从 L1 开始；刷新全部复位。</p><label>等级模式<select id="mode-select"><option value="0">自动</option>'+LEVELS.slice(1).map((l,i)=>'<option value="'+(i+1)+'">锁定 L'+(i+1)+' · '+l.length+' 位</option>').join('')+'</select></label>'+[['up','升级门槛'],['down','降级门槛'],['feedback','反馈时长']].map(([k,n])=>'<label>'+n+'<select data-setting="'+k+'">'+[50,75,100,125,150,200].map(v=>'<option value="'+v+'">'+v+'%</option>').join('')+'</select></label>').join('')+'<p id="active-settings">当前生效：'+(active.mode?'锁定':'自动')+' L'+(question?.level??1)+'<br>升级 '+active.up+'% · 降级 '+active.down+'%<br>反馈 '+active.feedback+'%（'+(1.2*active.feedback/100).toFixed(1)+' 秒）</p><button id="reset-dev" class="secondary">恢复默认</button>';
 $('#mode-select').value=settings.mode;$('#mode-select').onchange=e=>{settings.mode=Number(e.target.value);};
 el.querySelectorAll('[data-setting]').forEach(s=>{s.value=settings[s.dataset.setting];s.onchange=e=>settings[s.dataset.setting]=Number(e.target.value);});
 $('#reset-dev').onclick=()=>{settings=defaults();renderDev();};
}
$('#dev-toggle').onclick=()=>{$('#dev').hidden=!$('#dev').hidden;renderDev();};
document.addEventListener('keydown',e=>{if(e.target.closest('aside'))return;if(mode!=='demo'&&phase==='input'&&!paused&&(/^\d$/.test(e.key)||['Backspace','Enter'].includes(e.key))){e.preventDefault();press(e.key==='Backspace'?'删除':e.key==='Enter'?'确认':e.key);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
function resize(){const s=Math.min(innerWidth/1280,innerHeight/800);$('#stage').style.transform='scale('+s+')';$('#viewport').style.width=1280*s+'px';$('#viewport').style.height=800*s+'px';}
addEventListener('resize',resize);resize();startDemo();
setInterval(()=>advance(performance.now()),40);

