/* Programmatic SVG reconstruction, no dependencies. */
class TanghuluProgress extends HTMLElement {
  static observedAttributes = ['current','total'];
  constructor(){
    super(); this.attachShadow({mode:'open'}); this.wasFull=false;
    this.shadowRoot.innerHTML=`
      <style>
      :host{display:inline-block;width:240px;color:var(--progress-ink,#112c62);font-family:"Microsoft YaHei","PingFang SC",sans-serif; text-align:center}
      .ring{position:relative;width:100%;aspect-ratio:1}
      svg{display:block;width:100%;height:100%;overflow:visible}
      .center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;pointer-events:none}
      .label{font-size:clamp(18px,2.1vw,26px);font-weight:600;line-height:1.3}
      .value{font-size:58px;line-height:1.15;font-weight:750;font-variant-numeric:tabular-nums;margin-top:4px}
      .total{font-size:24px;font-weight:600;margin-top:10px;line-height:1.4}
      .arc{transition:stroke-dasharray .28s ease}
      @media(prefers-reduced-motion:reduce){.arc{transition:none}}
      </style>
      <div class="ring" role="progressbar" aria-label="已串水果">
      <svg viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <linearGradient id="track" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffffff"/><stop offset=".48" stop-color="#e8f2ff"/><stop offset="1" stop-color="#b3d3f7"/></linearGradient>
        <linearGradient id="blue" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="#a4dcff"/><stop offset=".26" stop-color="#73b7ff"/><stop offset=".65" stop-color="#4d91f4"/><stop offset="1" stop-color="#3975d7"/></linearGradient>
        <filter id="shadow" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#396caa" flood-opacity=".23"/></filter>
      </defs>
      <g filter="url(#shadow)" fill="none">
        <circle cx="120" cy="120" r="96" stroke="url(#track)" stroke-width="22"/>
        <circle class="arc" cx="120" cy="120" r="96" pathLength="100" transform="rotate(-90 120 120)" stroke="url(#blue)" stroke-width="22" stroke-linecap="butt"/>
      </g>
      <circle cx="120" cy="120" r="104" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>
      <circle cx="120" cy="120" r="86" fill="none" stroke="#4e8ddb" stroke-opacity=".16" stroke-width="1.5"/>
      </svg>
      <div class="center"><span class="label">已串</span><span class="value">0</span></div>
      </div><div class="total">共 <span>10</span> 个</div>`;
  }
  connectedCallback(){this.render()}
  attributeChangedCallback(){if(this.isConnected&&!this.updating)this.render()}
  get current(){return Number(this.getAttribute('current')||0)}
  set current(v){this.setAttribute('current',v)}
  get total(){return Number(this.getAttribute('total')||10)}
  set total(v){this.setAttribute('total',v)}
  setProgress(current,total=this.total){
    this.updating=true;this.setAttribute('total',total);this.setAttribute('current',current);this.updating=false;if(this.isConnected)this.render();
  }
  render(){
    const total=Math.max(1,Math.floor(Number.isFinite(this.total)?this.total:10));
    const current=Math.max(0,Math.min(total,Math.floor(Number.isFinite(this.current)?this.current:0)));
    const percent=current/total*100;
    const root=this.shadowRoot;
    root.querySelector('.arc').setAttribute('stroke-dasharray',percent+' '+(100-percent));
    root.querySelector('.arc').style.visibility=current===0?'hidden':'visible';
    root.querySelector('.value').textContent=current;
    root.querySelector('.total span').textContent=total;
    const progress=root.querySelector('[role=progressbar]');
    progress.setAttribute('aria-valuemin','0');progress.setAttribute('aria-valuemax',total);
    progress.setAttribute('aria-valuenow',current);progress.setAttribute('aria-valuetext','已串 '+current+' 个，共 '+total+' 个');
    const full=current===total;
    if(full&&!this.wasFull){this.dispatchEvent(new CustomEvent('串满',{bubbles:true,composed:true,detail:{current,total}}))}
    this.wasFull=full;
  }
}
customElements.define('tanghulu-progress',TanghuluProgress);
