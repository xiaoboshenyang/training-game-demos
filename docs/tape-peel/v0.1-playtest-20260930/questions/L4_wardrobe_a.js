// 纸板衣柜：双门、顶檐和两只承重脚；门上的把手仅作子装饰。
(() => {
  function buildWardrobe(){
    const parts={};
    const add=(id,w,h,d,x,y,z,color,base=false)=>{
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),cardMat(color));mesh.position.set(x,y,z);
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,20),edgeMat));
      parts[id]={id,mesh,base,released:false};return mesh;
    };
    const body=add('body',1.6,2,.65,0,0,0,'#c9955c',true);
    const header=new THREE.Mesh(new THREE.BoxGeometry(1.6,.325,.12),cardMat('#c9955c'));
    header.position.set(0,.8375,.385);body.add(header);
    const rail=new THREE.Mesh(new THREE.BoxGeometry(1.6,.125,.12),cardMat('#c9955c'));
    rail.position.set(0,-.9375,.385);body.add(rail);
    const left=add('doorL',.72,1.55,.12,-.39,-.1,.385,'#d9a86f');
    const right=add('doorR',.72,1.55,.12,.39,-.1,.385,'#d4a168');
    add('crown',1.75,.25,.89,0,1.125,0,'#dfb17b');
    add('footL',.45,.35,.89,-.55,-1.175,0,'#c28a50');
    add('footR',.45,.35,.89,.55,-1.175,0,'#c28a50');
    const handleMat=new THREE.MeshStandardMaterial({color:0x8a5a30,roughness:.7});
    for(const [door,x] of [[left,.24],[right,-.24]]){
      const h=new THREE.Mesh(new THREE.BoxGeometry(.055,.22,.035),handleMat);
      h.position.set(x,-.2,.08);door.add(h);
    }
    return parts;
  }
  const line=TapeTools.crossSeam;
  registerQuestion({
    id:'L4_wardrobe_a',level:'L4',levelName:'高阶',object:'纸板衣柜',review:'pending',
    build:buildWardrobe,partIds:['body','doorL','doorR','crown','footL','footR'],baseIds:['body'],
    supports:{crown:'body'},yaw:2.55,pitch:.18,queue:'RYBRY',open:2,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['doorL'],over:['r2'],segs:line([-.66,.25,.45],[-.1,.25,.45],'+z')},
      {id:'r2',c:'R',bind:['doorL'],segs:line([-.27,-.12,.45],[-.27,.54,.45],'+z')},
      {id:'r3',c:'R',bind:['doorL','body'],segs:line([-.6,.42,.45],[-.6,.9,.45],'+z')},
      {id:'r4',c:'R',bind:['doorR','body'],segs:line([.55,.42,.45],[.55,.9,.45],'+z')},
      {id:'r5',c:'R',bind:['crown','body'],segs:line([0,.84,.45],[0,1.18,.45],'+z')},
      {id:'r6',c:'R',bind:['footL','body'],segs:line([-.6,-.93,.45],[-.6,-1.27,.45],'+z')},
      {id:'y1',c:'Y',bind:['doorR'],over:['b1'],segs:line([.1,.2,.45],[.66,.2,.45],'+z')},
      {id:'y2',c:'Y',bind:['body'],over:['y3'],segs:line([-.6,.2,-.33],[.6,.2,-.33],'-z')},
      {id:'y3',c:'Y',bind:['body'],segs:line([0,-.1,-.33],[0,.5,-.33],'-z')},
      {id:'y4',c:'Y',bind:['crown','body'],segs:line([-.3,.84,.45],[-.3,1.18,.45],'+z')},
      {id:'y5',c:'Y',bind:['footR','body'],segs:line([.6,-.93,.45],[.6,-1.27,.45],'+z')},
      {id:'y6',c:'Y',bind:['doorL','body'],segs:line([-.3,-.95,.45],[-.3,-.5,.45],'+z')},
      {id:'b1',c:'B',bind:['doorR'],segs:line([.25,-.1,.45],[.25,.5,.45],'+z')},
      {id:'b2',c:'B',bind:['doorR','body'],segs:line([.3,-.95,.45],[.3,-.5,.45],'+z')},
      {id:'b3',c:'B',bind:['body'],segs:line([-.5,-.55,-.33],[.5,-.55,-.33],'-z')},
    ],
  });
})();
