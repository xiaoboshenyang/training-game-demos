// Asset anchor positions are measured in source PNG pixels.
export function makePort(p,label,y,left,input,flowing){
 const cy=y,edge=left?350:360,join=edge,scaleX=.32,scaleY=.23;
 const asset=input?{file:'supply-tank-left-r02.png',w:1254,h:1254,ax:1218,ay:680}:flowing?{file:'receiving-pool-left-r02.png',w:1679,h:937,ax:1263,ay:427}:{file:'receiving-pool-idle-left-r02.png',w:1678,h:937,ax:1262,ay:427};
 // The container's own pipe mouth meets the grid at the exact row center.
 const ix=join-asset.ax*scaleX,iy=cy-asset.ay*scaleY;
 const captionY=cy+(input?494:421)*scaleY+32;
 return '<g class="water-port" pointer-events="none" data-port="'+label+'" data-cell="'+p.cell+'" data-side="'+p.side+'" aria-label="'+(input?'进水水箱':'出水水池')+'"><g transform="'+(left?'translate(0 0)':'translate(1280 0) scale(-1 1)')+'"><image href="assets/ports/'+asset.file+'" x="'+ix+'" y="'+iy+'" width="'+asset.w*scaleX+'" height="'+asset.h*scaleY+'" preserveAspectRatio="none"/></g><text x="'+(left?135:1145)+'" y="'+captionY+'" text-anchor="middle" fill="#655c4c" font-size="26" font-weight="600">'+(input?'进水':'出水')+'</text></g>';
}


