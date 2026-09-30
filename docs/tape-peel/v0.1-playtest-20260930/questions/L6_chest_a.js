// L6 套娃宝箱：内芯为唯一底座；外壳、盖、锁、底托和两个把手会逐步掉落。
(() => {
  function buildChest() {
    const parts={};
    const add=(id,mesh,base=false)=>{
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,20),edgeMat));
      parts[id]={id,mesh,base,released:false};return mesh;
    };
    const core=add('core',new THREE.Mesh(new THREE.BoxGeometry(1.12,1,.82),cardMat('#dfb17b')),true);
    core.position.y=-.34;
    // 内芯上的纸板卡榫承住四块外板；底托掉落后外板也不会悬空。
    for(const side of [-1,1]) {
      const sideTab=new THREE.Mesh(new THREE.BoxGeometry(.31,.17,.2),cardMat('#c9955c'));
      sideTab.position.set(side*.68,-.2,0);core.add(sideTab);
      const endTab=new THREE.Mesh(new THREE.BoxGeometry(.25,.17,.13),cardMat('#c9955c'));
      endTab.position.set(0,-.2,side*.43);core.add(endTab);
    }
    for(const [id,x,z,w,d,col] of [
      ['front',0,.53,1.86,.12,'#c9955c'],
      ['back',0,-.53,1.86,.12,'#d4a168'],
      ['left',-.87,0,.12,.94,'#c28a50'],
      ['right',.87,0,.12,.94,'#d4a168']
    ]) {
      const panel=add(id,new THREE.Mesh(new THREE.BoxGeometry(w,1.45,d),cardMat(col)));
      panel.position.set(x,-.075,z);
    }
    const lid=add('lid',new THREE.Mesh(new THREE.BoxGeometry(2.03,.17,1.18),cardMat('#dfb17b')));
    lid.position.y=.735;
    const lock=add('lock',new THREE.Mesh(new THREE.BoxGeometry(.25,.22,.16),cardMat('#c28a50')));
    lock.position.set(0,.93,.5);
    const tray=add('tray',new THREE.Mesh(new THREE.BoxGeometry(2.02,.18,1.2),cardMat('#c28a50')));
    tray.position.y=-.89;
    for(const side of [-1,1]) {
      const handle=add(side<0?'handleL':'handleR',new THREE.Mesh(new THREE.BoxGeometry(.23,.56,.5),cardMat('#d4a168')));
      handle.position.set(side*1.13,-.07,-.2);
      const tab=new THREE.Mesh(new THREE.BoxGeometry(.18,.19,.3),cardMat('#c9955c'));
      tab.position.x=-side*.17;handle.add(tab);
    }
    return parts;
  }

  const line=TapeTools.crossSeam,wrap=TapeTools.wrap;
  const lidToBack=x=>TapeTools.foldEdge([x,.825,.43],[x,.825,-.59],[x,.43,-.59],'+y','-z');
  registerQuestion({
    id:'L6_chest_a',level:'L6',levelName:'宗师',object:'套娃宝箱',review:'pending',
    build:buildChest,baseIds:['core'],
    partIds:['core','front','back','left','right','lid','lock','tray','handleL','handleR'],
    supports:{lid:'back',lock:'lid',handleL:'left',handleR:'right'},
    yaw:.35,pitch:.2,queue:'RYGBRGY',open:2,score:55,
    tapes:[
      {id:'r1',c:'R',bind:['handleR','right'],over:['b3'],segs:line([1.25,-.07,-.38],[1.25,-.07,-.02],'+x')},
      {id:'r2',c:'R',bind:['back'],segs:line([-.76,-.55,-.595],[-.18,-.55,-.595],'-z')},
      {id:'r3',c:'R',bind:['tray'],over:['g5'],segs:line([-.28,-.985,-.37],[-.28,-.985,.37],'-y')},
      {id:'r4',c:'R',bind:['front'],over:['g1'],segs:line([-.72,-.05,.595],[-.12,-.05,.595],'+z')},
      {id:'r5',c:'R',bind:['back'],over:['g2'],segs:line([.12,-.05,-.595],[.72,-.05,-.595],'-z')},
      {id:'r6',c:'R',bind:['right'],over:['g3'],segs:line([.935,-.35,.1],[.935,.25,.4],'+x')},
      {id:'y1',c:'Y',bind:['core'],hiddenBy:['lid'],segs:line([-.37,.165,.26],[.37,.165,.26],'+y')},
      {id:'y2',c:'Y',bind:['tray'],segs:line([.5,-.985,-.42],[.5,-.985,.42],'-y')},
      {id:'y3',c:'Y',bind:['handleL','left'],segs:line([-1.25,-.27,-.2],[-1.25,.13,-.2],'-x')},
      {id:'y4',c:'Y',bind:['lid','back'],over:['b2'],segs:wrap([[-.78,.825,0],[-.26,.825,0],[-.26,.825,-.59],[-.26,.43,-.59]],['+y','+y','-z'])},
      {id:'y5',c:'Y',bind:['left'],over:['g4'],segs:line([-.935,-.05,.1],[-.935,-.05,.4],'-x')},
      {id:'y6',c:'Y',bind:['lock','lid','back'],segs:wrap([[0,1.035,.415],[0,.825,.415],[0,.825,-.59],[0,.43,-.59]],['-z','+y','-z'])},
      {id:'g1',c:'G',bind:['front'],segs:line([-.42,-.57,.595],[-.42,.45,.595],'+z')},
      {id:'g2',c:'G',bind:['back'],segs:line([.42,-.57,-.595],[.42,.45,-.595],'-z')},
      {id:'g3',c:'G',bind:['right'],over:['b1'],segs:line([.935,-.05,.1],[.935,-.05,.4],'+x')},
      {id:'g4',c:'G',bind:['left'],segs:line([-.935,-.57,.25],[-.935,.45,.25],'-x')},
      {id:'g5',c:'G',bind:['tray'],segs:line([-.59,-.985,0],[.03,-.985,0],'-y')},
      {id:'g6',c:'G',bind:['core'],hiddenBy:['lid'],segs:line([-.39,.165,0],[.39,.165,0],'+y')},
      {id:'b1',c:'B',bind:['right'],segs:line([.935,-.56,.25],[.935,.45,.25],'+x')},
      {id:'b2',c:'B',bind:['lid','back'],segs:lidToBack(-.55)},
      {id:'b3',c:'B',bind:['handleR','right'],segs:line([1.25,-.27,-.2],[1.25,.13,-.2],'+x')},
    ],
  });
})();
