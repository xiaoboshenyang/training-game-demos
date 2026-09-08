export const GEOMETRY = Object.freeze({ width:1280, height:728, playerY:512, spawnY:-40, exitY:768, settleY:574, playerRadius:30, rockRadius:32, moveSpeed:600, left:{inner:480,outer:336}, right:{inner:800,outer:944} });
export const LEVELS = Object.freeze([
  {duration:4.2,interval:2.2,weights:[.4,.4,.2],targetSuccess:null},
  {duration:3.6,interval:1.85,weights:[.3,.35,.35],targetSuccess:null},
  {duration:3,interval:1.5,weights:[.2,.3,.5],targetSuccess:null},
  {duration:2.4,interval:1.2,weights:[.1,.3,.6],targetSuccess:.8},
  {duration:1.9,interval:.95,weights:[.1,.25,.65],targetSuccess:.5},
  {duration:1.5,interval:.75,weights:[.1,.2,.7],targetSuccess:.3},
]);
// Bit 0..3 are II, OI, IO, OO (left position first).
export const ENDPOINT_STANCES = Object.freeze([
  {left:'inner',right:'inner'}, {left:'outer',right:'inner'},
  {left:'inner',right:'outer'}, {left:'outer',right:'outer'},
]);
export function safeMaskFor(obstacles){
  return ENDPOINT_STANCES.reduce((mask,stance,index)=>obstacles.every(([side,position])=>stance[side]!==position)?mask|(1<<index):mask,0);
}
export const TEMPLATES = Object.freeze([
  {id:'S_LI',kind:0,obstacles:[['left','inner']]},
  {id:'S_LO',kind:0,obstacles:[['left','outer']]},
  {id:'S_RI',kind:0,obstacles:[['right','inner']]},
  {id:'S_RO',kind:0,obstacles:[['right','outer']]},
  {id:'D_II',kind:1,obstacles:[['left','inner'],['right','inner']]},
  {id:'D_OO',kind:1,obstacles:[['left','outer'],['right','outer']]},
  {id:'D_IO',kind:2,obstacles:[['left','inner'],['right','outer']]},
  {id:'D_OI',kind:2,obstacles:[['left','outer'],['right','inner']]},
].map(template=>Object.freeze({...template,safeMask:safeMaskFor(template.obstacles)})));
export const DEFAULT_SETTINGS = Object.freeze({mode:'auto',speed:100,frequency:100,movement:100});
export const SETTING_RANGES = Object.freeze({
  speed:{min:50,max:200,step:5},
  frequency:{min:50,max:160,step:5},
  movement:{min:80,max:140,step:5},
});
export function parameters(level,settings=DEFAULT_SETTINGS) {
  const base=LEVELS[level-1];
  return {speed:808/base.duration*settings.speed/100,interval:base.interval/(settings.frequency/100),movement:GEOMETRY.moveSpeed*settings.movement/100};
}
export function validateSettings(settings) {
  if (!(settings.mode==='auto'||Number.isInteger(settings.mode)&&settings.mode>=1&&settings.mode<=6)) return '请选择自动或 L1—L6。';
  const labels={speed:'障碍速度',frequency:'出行频率',movement:'横移速度'};
  for(const [key,range] of Object.entries(SETTING_RANGES)) if(!Number.isFinite(settings[key])||settings[key]<range.min||settings[key]>range.max) return `${labels[key]}范围为 ${range.min}%—${range.max}%。`;
  const levels=settings.mode==='auto'?[1,2,3,4,5,6]:[settings.mode];
  for(const level of levels) {
    const p=parameters(level,settings);
    if(p.interval-124/p.speed-144/p.movement<-1e-9) return `L${level} 安全空档不足以完成换位，请降低出行频率或提高移动速度。`;
  }
  if(settings.mode==='auto')for(let from=1;from<6;from++){
    const old=parameters(from,settings),next=parameters(from+1,settings);
    const window=old.interval+490/next.speed-614/old.speed;
    if(window-144/next.movement<-1e-9)return `L${from}→L${from+1} 连续出题时换位时间不足，请降低出题频率，或提高障碍／横移速度。`;
  }
  return '';
}
