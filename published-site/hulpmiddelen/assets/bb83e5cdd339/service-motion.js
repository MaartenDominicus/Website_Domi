export function motionPlans(before, after, reduced) {
  if (!before || reduced || before.length !== after.length) return [];
  return after.flatMap((rect,index)=>{
    if(!rect.width || !before[index].width)return [];
    const dx=before[index].x-rect.x,dy=before[index].y-rect.y,scale=before[index].width/rect.width;
    if(Math.abs(dx)<.5 && Math.abs(dy)<.5 && Math.abs(scale-1)<.005)return [];
    return [{index,dx,dy,scale}];
  });
}
