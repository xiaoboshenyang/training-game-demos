// Per-game audio only. Shared success/level sounds remain owned by the public shell.
export function createGameAudio(){
  const music=new Audio('./assets/audio/bgm-053.wav'),step=new Audio('./assets/audio/s01.ogg');
  music.loop=true;music.volume=.2;music.preload='auto';step.volume=.65;step.preload='auto';
  let unlocked=false,wanted=false,disposed=false,stepCount=0,musicStarts=0,lastError=null;
  function playMusic(){
    if(!unlocked||!wanted||disposed||!music.paused)return;
    music.play().then(()=>{if(!wanted||disposed)music.pause();else musicStarts++;}).catch(e=>{if(e.name!=='AbortError')lastError=e.name;});
  }
  function unlock(){if(disposed)return;unlocked=true;playMusic();}
  document.addEventListener('pointerdown',unlock,{capture:true});
  document.addEventListener('keydown',unlock,{capture:true});
  function stopStep(){step.pause();step.currentTime=0;}
  return {
    start(){wanted=true;music.pause();music.currentTime=0;stopStep();stepCount=0;playMusic();},
    resume(){wanted=true;playMusic();},
    pause(){wanted=false;music.pause();stopStep();},
    step(){if(!unlocked||!wanted||disposed)return;stepCount++;step.currentTime=0;step.play().catch(e=>{if(e.name!=='AbortError')lastError=e.name;});},
    diagnostics(){return {unlocked,wanted,musicPaused:music.paused,musicTime:music.currentTime,musicVolume:music.volume,musicLoop:music.loop,musicStarts,stepPaused:step.paused,stepTime:step.currentTime,stepCount,lastError,musicReady:music.readyState,stepReady:step.readyState};},
    destroy(){disposed=true;wanted=false;music.pause();stopStep();document.removeEventListener('pointerdown',unlock,{capture:true});document.removeEventListener('keydown',unlock,{capture:true});music.removeAttribute('src');step.removeAttribute('src');music.load();step.load();}
  };
}
