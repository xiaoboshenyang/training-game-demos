(()=>{'use strict';
const music=new Audio('assets/audio/bgm-015.mp3');music.loop=true;music.preload='auto';music.volume=.18;
const voices=Array.from({length:4},()=>{const a=new Audio('assets/audio/catch-sfx09.wav');a.preload='auto';a.volume=1;return a});
let active=false,index=0;
function pause(){active=false;music.pause();voices.forEach(a=>{a.pause();a.currentTime=0})}
function stop(){pause();music.currentTime=0}
function start(){active=true;if(music.paused)music.play().then(()=>{if(!active)music.pause()}).catch(()=>{})}
function catchFruit(){if(!active)return;const a=voices[index++%voices.length];a.pause();a.currentTime=0;a.play().then(()=>{if(!active)a.pause()}).catch(()=>{})}
function setVolume(kind,value){value=Math.max(0,Math.min(1,value));if(kind==='music')music.volume=value;else voices.forEach(a=>a.volume=value)}
addEventListener('pagehide',stop);
window.DemoAudio={start,pause,stop,catchFruit,setVolume,get state(){return{active,musicPaused:music.paused,musicTime:music.currentTime,musicVolume:music.volume,sfxVolume:voices[0].volume,voicesPlaying:voices.filter(a=>!a.paused).length}}};
})();

