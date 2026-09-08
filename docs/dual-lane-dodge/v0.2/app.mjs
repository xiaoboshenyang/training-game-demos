import {GameEngine} from './engine.mjs';
import {loadAssets,Renderer} from './renderer.mjs';
import {GameInput} from './input.mjs';
import {GameShell} from './shell.mjs';
const engine=new GameEngine();
const input=new GameInput(engine);
const shell=new GameShell(engine,input);
// Snapshot returns a detached copy. There are no state-writing shortcuts in the page.
window.gameSnapshot=()=>({...engine.snapshot(),shellPhase:shell.displayPhase});
try{
  const renderer=new Renderer(document.getElementById('canvas'),await loadAssets());
  shell.ready();
  function frame(now){shell.tick(now);renderer.draw(engine.snapshot());requestAnimationFrame(frame);}
  requestAnimationFrame(frame);
}catch(error){console.error(error);shell.fail(error);}
