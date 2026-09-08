import {DEFAULT_SETTINGS,LEVELS,SETTING_RANGES} from './config.mjs';
const get=id=>document.getElementById(id);
export class GameShell{
  constructor(engine,input){
    this.engine=engine;this.input=input;this.countdown=0;this.lastFrame=performance.now();this.displayPhase='loading';
    get('start').addEventListener('click',()=>this.action());
    get('pause').addEventListener('click',()=>this.pause());
    window.addEventListener('blur',()=>this.pause());
    document.addEventListener('visibilitychange',()=>{this.lastFrame=performance.now();if(document.hidden)this.pause();});
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&engine.phase==='running'){event.preventDefault();this.pause();}
    });
    // This is a non-modal game overlay: ready/pause must not trap panel focus.
    this.settingsDirty=false;this.settingsError='';
    const breakpoint=window.matchMedia('(min-width: 1100px)');
    this.setPanelOpen(breakpoint.matches);
    breakpoint.addEventListener('change',event=>this.setPanelOpen(event.matches));
    get('panel-toggle').addEventListener('click',()=>this.setPanelOpen(get('trial-panel').hidden));
    const dirty=()=>{this.settingsDirty=true;this.settingsError='';this.updateSettingsLabels();};
    get('setting-mode').addEventListener('change',dirty);
    for(const key of ['speed','frequency','movement']){
      const control=get(`setting-${key}`);Object.assign(control,SETTING_RANGES[key]);
      control.addEventListener('input',()=>{get(`${key}-value`).textContent=`${control.value}%`;dirty();});
    }
    get('settings-form').addEventListener('submit',event=>{event.preventDefault();this.applySettings(this.readSettings());});
    get('defaults').addEventListener('click',()=>{this.fillSettings(DEFAULT_SETTINGS);this.applySettings({...DEFAULT_SETTINGS});});
  }
  readSettings(){const mode=get('setting-mode').value;return {mode:mode==='auto'?'auto':Number(mode),...Object.fromEntries(['speed','frequency','movement'].map(key=>[key,Number(get(`setting-${key}`).value)]))};}
  fillSettings(settings){get('setting-mode').value=String(settings.mode);for(const key of ['speed','frequency','movement']){get(`setting-${key}`).value=settings[key];get(`${key}-value`).textContent=`${settings[key]}%`;}}
  setPanelOpen(open){get('trial-panel').hidden=!open;get('panel-toggle').setAttribute('aria-expanded',String(open));get('panel-toggle').textContent=open?'收起调试看板':'展开调试看板';get('demo-layout').classList.toggle('sidebar-collapsed',!open);}
  applySettings(settings){const result=this.engine.requestSettings(settings);this.settingsError=result.ok?'':result.error;if(result.ok)this.settingsDirty=false;this.updateSettingsLabels();}
  ready(){this.displayPhase='ready';this.show('巧手避石','鼠标左键控制左侧，右键控制右侧，可同时按住；按住外移，松开回内。每过一行，观察下一行并换位。','开始 120 秒','<div class="rule-line">躲开整行：单障碍 +5 分，双障碍 +10 分。<br>失误不扣分。连续成功 6 行升级，连续失败 3 行降级。</div>');}
  show(title,text,button,extra=''){
    get('overlay').hidden=false;get('dialog-title').textContent=title;get('dialog-text').textContent=text;get('dialog-extra').innerHTML=extra;get('start').textContent=button;get('start').disabled=false;get('start').hidden=!button;
    document.querySelector('.dialog').classList.toggle('countdown',this.displayPhase==='countdown');
    get('pause').disabled=true;get('controls').inert=true;if(button)get('start').focus({preventScroll:true});
  }
  action(){
    if(this.engine.phase==='paused'){this.engine.resume();this.input.clear();this.displayPhase='running';get('overlay').hidden=true;get('controls').inert=false;get('pause').disabled=false;this.lastFrame=performance.now();return;}
    if(['ready','ended'].includes(this.displayPhase)){
      if(this.engine.pending)this.engine.settings={...this.engine.pending.settings};
      this.engine.reset();this.input.clear();this.countdown=3;this.displayPhase='countdown';this.show('3','双手准备好，按住外移，松开回内。','');this.lastFrame=performance.now();
    }
  }
  pause(){if(this.engine.phase!=='running')return;this.engine.pause();this.input.clear();this.displayPhase='paused';this.show('休息一下','时间已暂停。准备好后继续，松开的圆石会回到内侧。','继续游戏');}
  tick(now){
    const delta=Math.max(0,(now-this.lastFrame)/1000);this.lastFrame=now;
    if(document.hidden)return;
    if(this.displayPhase==='countdown'){
      this.countdown-=delta;get('dialog-title').textContent=String(Math.max(1,Math.ceil(this.countdown)));
      if(this.countdown<=0){this.engine.start();this.displayPhase='running';get('overlay').hidden=true;get('controls').inert=false;get('pause').disabled=false;}
    }else this.engine.update(delta);
    if(this.engine.phase==='ended'&&this.displayPhase!=='ended')this.result();
    this.updateLabels();
  }
  result(){
    this.input.clear();this.displayPhase='ended';const e=this.engine;
    this.show('这一轮完成了','谢谢你，双手配合得越来越熟悉了。','再来一次',`<div class="result-grid"><div><strong>${e.score}</strong><span>本轮得分</span></div><div><strong>${e.successes}</strong><span>成功行数</span></div><div><strong>${e.failures}</strong><span>失误行数</span></div></div><div class="rule-line">本轮最高难度 L${e.highestLevel} · 失误不扣分</div>`);
  }
  updateLabels(){
    const e=this.engine;const seconds=Math.max(0,Math.ceil(120-e.elapsed));get('time').textContent=`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
    get('level').textContent=`L${e.level}`;get('score').textContent=e.score;
    get('mode-label').textContent=`${e.settings.mode==='auto'?'自动':'手动锁定'} · L${e.level}`;
    get('progress').textContent=e.pending?`${e.pending.reason==='settings'?'清场后进入':'下一段进入'} L${e.pending.level}`:e.streak.failure?`连续失误 ${e.streak.failure} / 3`:`连续成功 ${e.streak.success} / 6`;
    const last=e.events.findLast(event=>event.type==='row');
    const text=e.pending?(e.pending.reason==='settings'?'正在清场，即将应用试玩设置':`这一段结束后，${e.pending.reason==='up'?'升至':'调整到'} L${e.pending.level}`):last&&e.elapsed-last.time<1.2?(last.success?`通过一行  +${last.points}`:'这一行碰到了，继续下一行'):'';
    if(get('feedback').textContent!==text)get('feedback').textContent=text;
    this.updateSettingsLabels();
  }
  updateSettingsLabels(){
    const e=this.engine;
    const describe=(settings,level)=>`${settings.mode==='auto'?'自动':'锁定'} · L${level} · 障碍 ${settings.speed}% · 频率 ${settings.frequency}% · 横移 ${settings.movement}%`;
    get('applied-settings').textContent=describe(e.settings,e.level);
    get('pending-settings').hidden=!e.pending;
    if(e.pending)get('pending-settings').textContent=`${e.pending.reason==='settings'?'待清场':'即将衔接'}：${describe(e.pending.settings,e.pending.level)}`;
    get('settings-status').textContent=this.settingsError||(this.settingsDirty?'已修改，尚未应用。点击“应用设置”提交。':e.pending?.reason==='settings'?(e.phase==='paused'?'已接收；继续游戏、清场后生效。':'已接收；旧行离场后，从下一行生效。'):'设置已应用；修改后请点击“应用设置”。');
    const target=LEVELS[e.level-1].targetSuccess;
    get('target-rate').textContent=target===null?'基础可完成':`约 ${Math.round(target*100)}%（待验证）`;
    const c=e.calibration;
    const successes=c?.successes??0,failures=c?.failures??0,total=successes+failures;
    get('calibration-settings').textContent=c?`样本来自：${describe(c.settings,c.level)}`:'尚未开始采样';
    get('actual-rate').textContent=total?`${Math.round(successes/total*100)}%`:'—';
    get('sample-count').textContent=`已结算 ${total} 行：成功 ${successes} / 失误 ${failures}`;
    get('sample-note').textContent=total<20?'样本较少，仅供观察':'仅为当前这组设置的样本，需继续试玩观察';
  }
  fail(error){this.displayPhase='error';this.show('画面没有准备好',`${error.message}。请通过本地 HTTP 服务打开，并检查 assets 文件。`,'');}
}
