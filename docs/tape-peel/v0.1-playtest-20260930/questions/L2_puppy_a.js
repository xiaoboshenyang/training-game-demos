// L2 纸板小狗：躯干托着头，头托两只宽耳；背、侧、底面都藏有胶带。
(() => {
  function buildPuppy() {
    const parts={};
    const add=(id,mesh,base=false)=>{
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,20),edgeMat));
      parts[id]={id,mesh,base,released:false};
      return mesh;
    };
    const body=add('body',new THREE.Mesh(new THREE.BoxGeometry(1.15,.75,1.35),cardMat('#c9955c')),true);
    body.position.set(0,-.35,-.2);
    for(const x of [-.4,.4])for(const z of [-.45,.45]){
      const paw=new THREE.Mesh(new THREE.BoxGeometry(.24,.4,.27),cardMat('#c28a50'));
      paw.position.set(x,-.5,z);
      body.add(paw);
    }
    const tail=new THREE.Mesh(new THREE.BoxGeometry(.17,.17,.43),cardMat('#dfb17b'));
    tail.position.set(.37,.25,-.83);
    tail.rotation.x=-.38;
    body.add(tail);

    const head=add('head',new THREE.Mesh(new THREE.BoxGeometry(.85,.7,.6),cardMat('#e3b981')));
    head.position.set(0,.375,.42);
    for(const x of [-.16,.16]){
      const eye=new THREE.Mesh(new THREE.BoxGeometry(.085,.085,.018),cardMat('#c28a50'));
      eye.position.set(x,.26,.309);
      head.add(eye);
    }
    const nose=new THREE.Mesh(new THREE.BoxGeometry(.15,.11,.055),cardMat('#c28a50'));
    nose.position.set(0,-.13,.34);
    head.add(nose);

    for(const side of [-1,1]){
      const id=side<0?'earL':'earR';
      const ear=add(id,new THREE.Mesh(new THREE.BoxGeometry(.38,.5,.3),cardMat(side<0?'#d4a168':'#dfb17b')));
      ear.position.set(side*.57,.55,.57);
    }
    return parts;
  }

  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge,wrap=TapeTools.wrap;
  registerQuestion({
    id:'L2_puppy_a',level:'L2',levelName:'初阶',object:'纸板小狗',review:'pending',
    build:buildPuppy,baseIds:['body'],partIds:['body','head','earL','earR'],
    supports:{head:'body',earL:'head',earR:'head'},yaw:.4,pitch:.25,queue:'RGR',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['earL','head','body'],segs:wrap([[-.7,.45,.72],[-.2,.45,.72],[-.2,.025,.72],[-.2,.025,.475],[-.2,-.08,.475]],['+z','+z','-y','+z'])},
      {id:'r2',c:'R',bind:['earR','head','body'],segs:wrap([[.7,.45,.72],[.2,.45,.72],[.2,.025,.72],[.2,.025,.475],[.2,-.08,.475]],['+z','+z','-y','+z'])},
      {id:'r3',c:'R',bind:['head','body'],segs:fold([.425,.48,.25],[.425,.025,.25],[.525,.025,.25],'+x','+y')},
      {id:'r4',c:'R',bind:['head','body'],segs:fold([-.425,.48,.25],[-.425,.025,.25],[-.525,.025,.25],'-x','+y')},
      {id:'r5',c:'R',bind:['body'],segs:line([-.3,-.55,-.88],[-.3,-.15,-.88],'-z')},
      {id:'r6',c:'R',bind:['body'],segs:line([.2,-.55,.48],[.2,-.15,.48],'+z')},
      {id:'g1',c:'G',bind:['body'],segs:line([-.58,-.3,-.55],[-.58,-.3,-.1],'-x')},
      {id:'g2',c:'G',bind:['body'],segs:line([.58,-.3,-.55],[.58,-.3,-.1],'+x')},
      {id:'g3',c:'G',bind:['body'],segs:line([-.28,-.73,-.15],[.28,-.73,-.15],'-y')},
    ],
  });
})();
