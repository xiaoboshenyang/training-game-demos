export class GameInput {
  constructor(engine){
    this.engine=engine;this.sources={left:new Set(),right:new Set()};this.buttons={left:document.querySelector('#left-control'),right:document.querySelector('#right-control')};
    for(const [side,button] of Object.entries(this.buttons)){
      button.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse')return;event.preventDefault();if(engine.phase!=='running')return;button.setPointerCapture(event.pointerId);this.set(side,`p${event.pointerId}`,true);});
      for(const type of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(type,event=>this.set(side,`p${event.pointerId}`,false));
      button.addEventListener('contextmenu',event=>event.preventDefault());
      button.addEventListener('keydown',event=>{if([' ','Enter'].includes(event.key)){event.preventDefault();this.set(side,'button',true);}});
      button.addEventListener('keyup',event=>{if([' ','Enter'].includes(event.key)){event.preventDefault();this.set(side,'button',false);}});
      button.addEventListener('blur',()=>this.set(side,'button',false));
    }
    // Mouse chords need mousedown/up: a second held button does not emit pointerdown.
    // Each button has its own source, independent of cursor location, touch and keys.
    const field=document.querySelector('#field');
    field.addEventListener('mousedown',event=>{
      if(event.sourceCapabilities?.firesTouchEvents||engine.phase!=='running'||![0,2].includes(event.button))return;
      event.preventDefault();this.set(event.button===0?'left':'right','mouse',true);
    });
    window.addEventListener('mouseup',event=>{
      if(event.button===0||event.button===2)this.set(event.button===0?'left':'right','mouse',false);
    });
    window.addEventListener('mousemove',event=>{
      for(const [side,mask] of [['left',1],['right',2]]){
        if(this.sources[side].has('mouse')&&!(event.buttons&mask))this.set(side,'mouse',false);
      }
    });
    field.addEventListener('contextmenu',event=>event.preventDefault());
    const sideFor=key=>['a','A','ArrowLeft'].includes(key)?'left':['d','D','ArrowRight'].includes(key)?'right':null;
    window.addEventListener('keydown',event=>{const side=sideFor(event.key);if(!side||event.target.closest('form'))return;event.preventDefault();this.set(side,event.code,true);});
    window.addEventListener('keyup',event=>{const side=sideFor(event.key);if(side){this.set(side,event.code,false);}});
  }
  set(side,source,pressed){
    if(pressed&&this.engine.phase==='running')this.sources[side].add(source);else this.sources[side].delete(source);
    this.engine.setInput(side,this.sources[side].size>0);this.buttons[side].classList.toggle('is-pressed',this.engine.input[side]);
  }
  clear(){for(const side of ['left','right']){this.sources[side].clear();this.buttons[side].classList.remove('is-pressed');}this.engine.clearInput();}
}
