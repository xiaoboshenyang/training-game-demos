import {getGameAudioContext,ensureGameAudioMaster,unlockGameAudio,rampGainTo} from './public-template-v1.2/vendor/games/shared/audio/game-audio-context.js';
import {readGameAudioPrefs,subscribeGameAudioPrefs} from './public-template-v1.2/vendor/games/shared/audio/game-audio-prefs.js';

// Game adapter only: shared context, limiter, preference channel and gain ramps.
export function createBgm(url, deps={}) {
 const context=deps.context||getGameAudioContext, master=deps.master||ensureGameAudioMaster;
 const unlock=deps.unlock||unlockGameAudio, ramp=deps.ramp||rampGainTo;
 const read=deps.read||readGameAudioPrefs, subscribe=deps.subscribe||subscribeGameAudioPrefs;
 const target=deps.target||document, load=deps.load||(async ctx=>{const r=await fetch(url);if(!r.ok)throw Error('BGM '+r.status);return ctx.decodeAudioData(await r.arrayBuffer());});
 let ctx,bus,source,buffer,pending,active=false,unlocked=false,disposed=false,offset=0,startedAt=0,generation=0,error=null;
 const volume=()=>{const p=read().bgm;return p.enabled?.18*(p.volume/100)**2:0;};
 function stop(){generation++;if(source){offset=(offset+ctx.currentTime-startedAt)%buffer.duration;ramp(bus.gain,0,ctx.currentTime,.025);source.stop(ctx.currentTime+.03);source=null;}}
 async function play(){
  if(!active||!unlocked||disposed||source)return;
  const ticket=++generation;
  try{ctx ||= context();if(!ctx)return;await unlock({source:'color-trap-bgm'});if(!buffer){pending ||= load(ctx);buffer=await pending;}
   if(ticket!==generation||!active||disposed||ctx.state!=='running')return;
   if(!bus){bus=ctx.createGain();bus.connect(master(ctx));}bus.gain.value=0;
   source=ctx.createBufferSource();source.buffer=buffer;source.loop=true;source.connect(bus);const node=source;node.onended=()=>node.disconnect();startedAt=ctx.currentTime;source.start(0,offset);ramp(bus.gain,volume(),ctx.currentTime,.08);
  }catch(e){error=String(e);pending=null;}
 }
 function gesture(){unlocked=true;void play();}
 for(const event of ['pointerdown','keydown'])target.addEventListener(event,gesture,true);
 const unsubscribe=subscribe(()=>{if(bus&&source)ramp(bus.gain,volume(),ctx.currentTime,.08);});
 return {
  start(restart=false){if(restart){stop();offset=0;}active=true;void play();},
  pause(){active=false;stop();},
  destroy(){active=false;disposed=true;stop();unsubscribe();for(const event of ['pointerdown','keydown'])target.removeEventListener(event,gesture,true);bus?.disconnect();},
  snapshot:()=>({active,unlocked,playing:!!source,loop:source?.loop??false,volume:volume(),offset,error})
 };
}
