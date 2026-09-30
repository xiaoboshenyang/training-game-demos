// 纸板小熊：宽耳、宽四肢；眼睛和鼻子是头部装饰。
(() => {
  function buildBear(){
    const p={};
    const add=(id,w,h,d,x,y,z,col,base=false)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),cardMat(col));m.position.set(x,y,z);m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry,20),edgeMat));p[id]={id,mesh:m,base,released:false};return m;};
    add('torso',1,1.25,.65,0,0,0,'#c9955c',true);
    const head=add('head',.8,.65,.65,0,.95,0,'#dfb17b');
    add('earL',.32,.35,.65,-.24,1.45,0,'#c28a50');
    add('earR',.32,.35,.65,.24,1.45,0,'#c28a50');
    add('armL',.35,.8,.65,-.675,.06,0,'#d4a168');
    add('armR',.35,.8,.65,.675,.06,0,'#d4a168');
    add('legL',.4,.42,.65,-.27,-.835,0,'#c28a50');
    add('legR',.4,.42,.65,.27,-.835,0,'#c28a50');
    const face=cardMat('#c28a50');
    for(const x of [-.14,.14]){const eye=new THREE.Mesh(new THREE.BoxGeometry(.065,.065,.018),face);eye.position.set(x,.07,.336);head.add(eye);}
    const muzzle=new THREE.Mesh(new THREE.BoxGeometry(.25,.13,.025),cardMat('#e3b981'));muzzle.position.set(0,-.15,.34);head.add(muzzle);
    const nose=new THREE.Mesh(new THREE.BoxGeometry(.07,.05,.015),face);nose.position.set(0,-.11,.355);head.add(nose);
    return p;
  }
  const line=TapeTools.crossSeam;
  registerQuestion({id:'L4_bear_a',level:'L4',levelName:'高阶',object:'纸板小熊',review:'pending',build:buildBear,
    partIds:['torso','head','earL','earR','armL','armR','legL','legR'],baseIds:['torso'],supports:{earL:'head',earR:'head'},yaw:.48,pitch:.2,queue:'RYBRY',open:2,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['torso'],over:['r2'],segs:line([-.38,0,.33],[.38,0,.33],'+z')},
      {id:'r2',c:'R',bind:['torso'],segs:line([0,-.48,.33],[0,.48,.33],'+z')},
      {id:'r3',c:'R',bind:['head','torso'],segs:line([-.25,.5,-.33],[-.25,1.12,-.33],'-z')},
      {id:'r4',c:'R',bind:['head','torso'],segs:line([.25,.5,-.33],[.25,1.12,-.33],'-z')},
      {id:'r5',c:'R',bind:['armL','torso'],segs:line([-.74,.22,-.33],[-.29,.22,-.33],'-z')},
      {id:'r6',c:'R',bind:['armR','torso'],segs:line([.29,.22,-.33],[.74,.22,-.33],'-z')},
      {id:'y1',c:'Y',bind:['head'],over:['y2'],segs:line([.405,.95,-.23],[.405,.95,.23],'+x')},
      {id:'y2',c:'Y',bind:['head'],segs:line([.405,.72,0],[.405,1.18,0],'+x')},
      {id:'y3',c:'Y',bind:['earL','head'],segs:line([-.24,1.06,.33],[-.24,1.52,.33],'+z')},
      {id:'y4',c:'Y',bind:['earR','head'],segs:line([.24,1.06,.33],[.24,1.52,.33],'+z')},
      {id:'y5',c:'Y',bind:['legL','torso'],segs:line([-.27,-.96,.33],[-.27,-.35,.33],'+z')},
      {id:'y6',c:'Y',bind:['legR','torso'],segs:line([.27,-.96,.33],[.27,-.35,.33],'+z')},
      {id:'b1',c:'B',bind:['torso'],over:['b2'],segs:line([-.4,-.23,-.33],[.4,-.23,-.33],'-z')},
      {id:'b2',c:'B',bind:['torso'],segs:line([0,-.5,-.33],[0,.1,-.33],'-z')},
      {id:'b3',c:'B',bind:['head'],segs:line([-.405,.9,-.23],[-.405,.9,.23],'-x')},
    ]});
})();
