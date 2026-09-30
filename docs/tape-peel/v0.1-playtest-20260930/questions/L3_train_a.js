// 纸板小火车：车身为唯一底座，车轮和窗户是所属纸板的装饰。
(() => {
  function buildTrain(){
    const p={};
    const add=(id,w,h,d,x,y,z,col,base=false)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),cardMat(col));m.position.set(x,y,z);m.add(new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry,20),edgeMat));p[id]={id,mesh:m,base,released:false};return m;};
    const body=add('body',1.1,.65,.9,.25,-.15,0,'#c9955c',true);
    const carriage=add('carriage',.62,.65,.9,-.61,-.15,0,'#d4a168');
    const cab=add('cab',.65,.5,.9,-.05,.425,0,'#dfb17b');
    add('roof',.75,.14,.9,-.05,.745,0,'#c28a50');
    add('chimney',.36,.6,.18,.52,.475,0,'#d9a86f');
    add('bumper',.18,.65,.9,.89,-.15,0,'#c28a50');
    add('cargo',.48,.42,.9,-.61,.385,0,'#e3b981');
    const dark=cardMat('#c28a50');
    for(const [owner,x] of [[carriage,0],[body,0],[body,.48]])for(const z of [-.49,.49]){const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.08,16),dark);wheel.rotation.x=Math.PI/2;wheel.position.set(x,-.51,z);owner.add(wheel);}
    const window=new THREE.Mesh(new THREE.BoxGeometry(.018,.16,.17),cardMat('#c28a50'));window.position.set(.338,.02,.08);cab.add(window);
    return p;
  }
  const line=TapeTools.crossSeam,fold=TapeTools.foldEdge;
  registerQuestion({id:'L3_train_a',level:'L3',levelName:'中阶',object:'纸板小火车',review:'pending',build:buildTrain,
    partIds:['body','carriage','cab','roof','chimney','bumper','cargo'],baseIds:['body'],supports:{roof:'cab',cargo:'carriage'},yaw:.4,pitch:.18,queue:'RYBR',open:1,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['cab','body'],segs:line([-.16,.03,.455],[-.16,.59,.455],'+z')},
      {id:'r2',c:'R',bind:['carriage','body'],segs:line([-.73,-.32,.455],[-.07,-.32,.455],'+z')},
      {id:'r3',c:'R',bind:['bumper','body'],segs:line([.65,-.12,.455],[.96,-.12,.455],'+z')},
      {id:'r4',c:'R',bind:['roof','cab'],segs:line([.14,.44,.455],[.14,.79,.455],'+z')},
      {id:'r5',c:'R',bind:['body'],over:['r6'],segs:line([.21,-.25,-.455],[.7,-.25,-.455],'-z')},
      {id:'r6',c:'R',bind:['body'],segs:line([.4,-.42,-.455],[.4,.12,-.455],'-z')},
      {id:'y1',c:'Y',bind:['chimney','body'],segs:fold([.52,.68,.095],[.52,.175,.095],[.52,.175,.4],'+z','+y')},
      {id:'y2',c:'Y',bind:['cargo','carriage'],segs:line([-.62,-.04,.455],[-.62,.55,.455],'+z')},
      {id:'y3',c:'Y',bind:['carriage','body'],over:['b2'],segs:line([-.75,-.24,-.455],[-.05,-.24,-.455],'-z')},
      {id:'b1',c:'B',bind:['cab','body'],segs:line([-.19,.04,-.455],[-.19,.6,-.455],'-z')},
      {id:'b2',c:'B',bind:['cargo','carriage'],segs:line([-.6,-.43,-.455],[-.6,.55,-.455],'-z')},
      {id:'b3',c:'B',bind:['roof','cab'],segs:line([.14,.43,-.455],[.14,.79,-.455],'-z')},
    ]});
})();
