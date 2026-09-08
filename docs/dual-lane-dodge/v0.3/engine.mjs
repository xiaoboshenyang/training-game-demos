import {GEOMETRY as G,LEVELS,TEMPLATES,DEFAULT_SETTINGS,parameters,validateSettings} from './config.mjs';

export class RowGenerator {
  constructor(random=Math.random) {this.random=random;this.reset();}
  reset({preservePrevious=false}={}) {this.previousSafeMask=preservePrevious?(this.previousSafeMask??1):1;this.last={left:null,right:null};this.runs={left:0,right:0};this.singleSide=null;this.singleRun=0;}
  allowed(template) {
    if(template.safeMask&this.previousSafeMask)return false;
    if(template.obstacles.length===1&&this.singleSide===template.obstacles[0][0]&&this.singleRun>=2)return false;
    return template.obstacles.every(([side,position])=>this.last[side]!==position||this.runs[side]<2);
  }
  next(level) {
    const candidates=TEMPLATES.filter(t=>this.allowed(t));
    const weight=t=>LEVELS[level-1].weights[t.kind]/(t.kind===0?4:2);
    let choice=this.random()*candidates.reduce((sum,t)=>sum+weight(t),0);
    const template=candidates.find(t=>(choice-=weight(t))<0)||candidates.at(-1);
    if(!template)throw new Error('没有合法行模板');
    for(const [side,position] of template.obstacles){this.runs[side]=this.last[side]===position?this.runs[side]+1:1;this.last[side]=position;}
    if(template.obstacles.length===1){const side=template.obstacles[0][0];this.singleRun=side===this.singleSide?this.singleRun+1:1;this.singleSide=side;}else{this.singleRun=0;this.singleSide=null;}
    this.previousSafeMask=template.safeMask;
    return template;
  }
}

function moveToward(value,target,distance){return value+Math.sign(target-value)*Math.min(Math.abs(target-value),distance);}
function segmentTouches(ax,ay,bx,by,radius){const dx=bx-ax,dy=by-ay;const t=Math.max(0,Math.min(1,-(ax*dx+ay*dy)/(dx*dx+dy*dy||1)));return (ax+t*dx)**2+(ay+t*dy)**2<=radius**2;}

export class GameEngine {
  constructor({random=Math.random,settings=DEFAULT_SETTINGS}={}) {
    this.generator=new RowGenerator(random);
    this.settings={...settings};this.restartSettings={...settings};
    if(validateSettings(this.settings))throw new Error(validateSettings(this.settings));
    this.reset();
  }
  reset(){
    this.settings={...this.restartSettings};
    this.phase='ready';this.elapsed=0;this.score=0;this.successes=0;this.failures=0;this.streak={success:0,failure:0};
    this.level=this.settings.mode==='auto'?1:this.settings.mode;this.highestLevel=this.level;
    this.rows=[];this.nextRow=0;this.sequence=0;this.pending=null;this.events=[];this.feedback={left:0,right:0};
    this.players={left:G.left.inner,right:G.right.inner};this.input={left:false,right:false};
    this.stats=Array.from({length:6},()=>({successes:0,failures:0,score:0}));this.generator.reset();this.resetCalibration();
  }
  resetCalibration(){this.calibration={level:this.level,settings:{...this.settings},successes:0,failures:0};}
  start(){if(this.phase==='ready'){this.highestLevel=this.level;this.resetCalibration();this.phase='running';this.spawn();}}
  setInput(side,pressed){if(side in this.input)this.input[side]=this.phase==='running'&&Boolean(pressed);}
  clearInput(){this.input.left=false;this.input.right=false;}
  pause(){if(this.phase==='running'){this.phase='paused';this.clearInput();}}
  resume(){if(this.phase==='paused'){this.phase='running';this.clearInput();}}
  requestSettings(value){
    const settings={...value};const error=validateSettings(settings);if(error)return {ok:false,error};this.restartSettings={...settings};
    const hasAutomaticTransition=this.pending?.reason==='up'||this.pending?.reason==='down';
    const target=settings.mode==='auto'?(hasAutomaticTransition?this.pending.level:this.level):settings.mode;
    if(this.phase==='ready'||this.phase==='ended'){
      this.settings=settings;this.level=target;this.pending=null;this.streak={success:0,failure:0};this.generator.reset();
      if(this.phase==='ready')this.resetCalibration();
    }else{
      this.pending={level:target,settings,reason:'settings'};
      if(!this.rows.length)this.applyPending();
    }
    return {ok:true};
  }
  spawn(){
    const template=this.generator.next(this.level);const p=parameters(this.level,this.settings);
    this.rows.push({id:++this.sequence,template:template.id,safeMask:template.safeMask,level:this.level,y:G.spawnY,speed:p.speed,obstacles:template.obstacles.map(([side,position])=>({side,position,x:G[side][position]})),collided:false,settled:false});
    this.nextRow=p.interval;
  }
  settle(row,countStreak=true){
    if(row.settled)return;row.settled=true;
    const success=!row.collided,points=success?row.obstacles.length*5:0;
    this.score+=points;this[success?'successes':'failures']++;
    const stats=this.stats[row.level-1];stats[success?'successes':'failures']++;stats.score+=points;
    if(row.level===this.calibration.level)this.calibration[success?'successes':'failures']++;
    this.events.push({type:'row',success,points,row:row.id,level:row.level,time:this.elapsed});
    if(!countStreak||this.pending||row.level!==this.level)return;
    this.streak[success?'success':'failure']++;this.streak[success?'failure':'success']=0;
    if(this.streak.success<6&&this.streak.failure<3)return;
    if(this.settings.mode!=='auto'){this.streak={success:0,failure:0};return;}
    const target=Math.max(1,Math.min(6,this.level+(success?1:-1)));
    if(target===this.level){this.streak={success:0,failure:0};return;}
    this.pending={level:target,settings:{...this.settings},reason:success?'up':'down'};
    this.events.push({type:'transition',level:target,time:this.elapsed});
  }
  applyPending(){
    if(!this.pending)return;const pending=this.pending;
    this.level=pending.level;this.settings={...pending.settings};this.highestLevel=Math.max(this.highestLevel,this.level);
    this.streak={success:0,failure:0};this.generator.reset({preservePrevious:true});this.pending=null;this.nextRow=0;this.resetCalibration();
    this.events.push({type:'level',level:this.level,time:this.elapsed});
  }
  transitionReady(){
    if(!this.pending)return false;
    if(this.pending.reason==='settings')return !this.rows.length;
    // Keep the already scheduled spawn. Only that next row uses the new level;
    // existing rows retain their own frozen level and speed.
    return this.nextRow<=1e-8;
  }
  finish(){
    for(const row of this.rows)if(row.collided&&!row.settled)this.settle(row,false);
    this.phase='ended';this.pending=null;this.clearInput();this.events.push({type:'end',time:this.elapsed});
  }
  update(seconds){
    if(this.phase!=='running'||!Number.isFinite(seconds)||seconds<=0)return;
    let remaining=Math.min(seconds,120-this.elapsed);
    while(remaining>1e-10&&this.phase==='running'){
      const dt=Math.min(1/120,remaining,120-this.elapsed);this.step(dt);remaining-=dt;
    }
  }
  step(dt){
    const oldPlayers={...this.players};const p=parameters(this.level,this.settings);
    for(const side of ['left','right']){this.players[side]=moveToward(this.players[side],G[side][this.input[side]?'outer':'inner'],p.movement*dt);this.feedback[side]=Math.max(0,this.feedback[side]-dt);}
    this.elapsed=Math.min(120,this.elapsed+dt);this.nextRow-=dt;
    for(const row of this.rows){
      const oldY=row.y;row.y+=row.speed*dt;
      if(!row.settled){
        for(const rock of row.obstacles){
          if(segmentTouches(oldPlayers[rock.side]-rock.x,G.playerY-oldY,this.players[rock.side]-rock.x,G.playerY-row.y,G.playerRadius+G.rockRadius)){
            if(!row.collided)this.events.push({type:'collision',row:row.id,time:this.elapsed});
            row.collided=true;this.feedback[rock.side]=.24;
          }
        }
        if(row.y>G.settleY)this.settle(row);
      }
    }
    this.rows=this.rows.filter(row=>row.y<G.exitY-1e-8);
    if(this.elapsed>=120-1e-8){this.elapsed=120;this.finish();return;}
    if(this.transitionReady())this.applyPending();
    if(!this.pending&&this.nextRow<=1e-8)this.spawn();
    if(this.events.length>80)this.events.splice(0,this.events.length-80);
  }
  snapshot(){return structuredClone({phase:this.phase,elapsed:this.elapsed,remaining:120-this.elapsed,level:this.level,highestLevel:this.highestLevel,score:this.score,successes:this.successes,failures:this.failures,streak:this.streak,players:this.players,input:this.input,rows:this.rows,pending:this.pending,settings:this.settings,parameters:parameters(this.level,this.settings),calibration:this.calibration,stats:this.stats,events:this.events,feedback:this.feedback});}
}
