import {GameAudioSettings} from './public-template/vendor/games/shared/audio/game-audio-settings.js';

export function createMusic(){
 const audio=new Audio(new URL('./assets/bgm-051.mp3',import.meta.url));
 audio.loop=true;audio.preload='metadata';
 let unlocked=false,wanted=false,ducked=false,pending=false,lastError=null;
 function applyVolume(){
  const prefs=GameAudioSettings.getChannel('bgm');
  audio.volume=(ducked?.04:.18)*(prefs.volume/100)**2;
  if(!prefs.enabled||prefs.volume===0){audio.pause();return}
  play();
 }
 function play(){
  if(!unlocked||!wanted||document.hidden||pending||!audio.paused||!GameAudioSettings.isEnabled('bgm')||audio.volume===0)return;
  pending=true;
  audio.play().then(()=>{lastError=null;if(!wanted||document.hidden)audio.pause();})
   .catch(e=>{if(e.name!=='AbortError')lastError=e.name;}).finally(()=>{pending=false});
 }
 function unlock(){unlocked=true;play()}
 document.addEventListener('pointerdown',unlock,{capture:true});
 document.addEventListener('keydown',unlock,{capture:true});
 GameAudioSettings.subscribe(applyVolume);
 audio.addEventListener('playing',()=>{if(!wanted||document.hidden)audio.pause()});
 applyVolume();
 return {
  sync(active,quiet=false){if(active===wanted&&quiet===ducked)return;wanted=active;ducked=quiet;if(!wanted)audio.pause();applyVolume()},
  pause(){wanted=false;audio.pause()},
  restart(){audio.pause();audio.currentTime=0;wanted=false},
  diagnostics(){return{unlocked,wanted,paused:audio.paused,time:audio.currentTime,volume:audio.volume,loop:audio.loop,ready:audio.readyState,lastError}},
 };
}
