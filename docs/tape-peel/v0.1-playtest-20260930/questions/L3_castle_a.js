// 纸板小城堡：主墙承接左右塔、中央高墙；塔冠与顶盖各坐在所属附件上。
(() => {
  function buildCastle(){
    const p={};
    const add=(id,w,h,d,x,y,z,col,base=false)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),cardMat(col));m.position.set(x,y,z);m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry,20),edgeMat));p[id]={id,mesh:m,base,released:false};return m;};
    const wall=add('wall',1.6,1.1,.7,0,-.15,0,'#c9955c',true);
    const left=add('towerL',.45,1.5,.7,-1.025,0,0,'#d4a168');
    const right=add('towerR',.45,1.5,.7,1.025,0,0,'#d4a168');
    const crownL=add('crownL',.45,.2,.7,-1.025,.85,0,'#c28a50');
    const crownR=add('crownR',.45,.2,.7,1.025,.85,0,'#c28a50');
    const keep=add('keep',.7,.6,.7,0,.7,0,'#dfb17b');
    const cap=add('cap',.8,.15,.7,0,1.075,0,'#c28a50');
    const gate=new THREE.Mesh(new THREE.BoxGeometry(.42,.65,.025),cardMat('#c28a50'));gate.position.set(0,-.2,.365);wall.add(gate);
    for(const crown of [crownL,crownR])for(const x of [-.14,.14]){const tooth=new THREE.Mesh(new THREE.BoxGeometry(.11,.16,.65),cardMat('#c28a50'));tooth.position.set(x,.17,0);crown.add(tooth);}
    return p;
  }
  const line=TapeTools.crossSeam;
  registerQuestion({id:'L3_castle_a',level:'L3',levelName:'中阶',object:'纸板小城堡',review:'pending',build:buildCastle,
    partIds:['wall','towerL','towerR','crownL','crownR','keep','cap'],baseIds:['wall'],supports:{crownL:'towerL',crownR:'towerR',cap:'keep'},yaw:.35,pitch:.18,queue:'RYBR',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['towerL','wall'],segs:line([-1.11,-.25,.355],[-.49,-.25,.355],'+z')},
      {id:'r2',c:'R',bind:['towerR','wall'],segs:line([.49,-.25,.355],[1.11,-.25,.355],'+z')},
      {id:'r3',c:'R',bind:['keep','wall'],segs:line([-.2,.28,.355],[-.2,.85,.355],'+z')},
      {id:'r4',c:'R',bind:['cap','keep'],segs:line([.2,.75,.355],[.2,1.12,.355],'+z')},
      {id:'r5',c:'R',bind:['wall'],over:['r6'],segs:line([-.45,-.25,-.355],[.45,-.25,-.355],'-z')},
      {id:'r6',c:'R',bind:['wall'],segs:line([0,-.45,-.355],[0,.15,-.355],'-z')},
      {id:'y1',c:'Y',bind:['crownL','towerL'],segs:line([-1.025,.54,.355],[-1.025,.88,.355],'+z')},
      {id:'y2',c:'Y',bind:['crownR','towerR'],segs:line([1.025,.54,.355],[1.025,.88,.355],'+z')},
      {id:'y3',c:'Y',bind:['keep'],over:['b3'],segs:line([-.29,.87,-.355],[.29,.87,-.355],'-z')},
      {id:'b1',c:'B',bind:['towerL','wall'],segs:line([-1.11,-.53,-.355],[-.49,-.53,-.355],'-z')},
      {id:'b2',c:'B',bind:['towerR','wall'],segs:line([.49,-.53,-.355],[1.11,-.53,-.355],'-z')},
      {id:'b3',c:'B',bind:['cap','keep'],segs:line([0,.65,-.355],[0,1.12,-.355],'-z')},
    ]});
})();
