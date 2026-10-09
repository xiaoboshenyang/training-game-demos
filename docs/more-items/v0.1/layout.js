export const LAYOUT={x:94,y:112,width:1082,height:432,cloth:{x:70,y:88,width:1140,height:502}};
export function fitObject(bbox,cols){
  const ratio=(bbox[2]-bbox[0])/(bbox[3]-bbox[1]),maxWidth=cols===3?190:166,maxHeight=118;
  const height=Math.min(maxHeight,maxWidth/ratio);
  return {width:height*ratio,height};
}
