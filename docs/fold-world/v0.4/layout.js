// 平板画面尺寸（公共基建规范 4.1）：整页 1280×800，顶栏 72，游戏区 1280×728
// 游戏区右侧留 120 宽放 撤回／提示／换一道，折纸区 1160×728；狐狸按原图 0.5 倍显示（屏上约 716×417）
// 世界坐标 = 原图像素；折纸区换算成世界坐标后当作台面边框（块转出去会撞边）
(function (root) {
  const SCALE = 0.5, AREA_W = 1160, AREA_H = 728, COL_W = 120, TOP_H = 72;
  const FOX_CX = 764.5, FOX_CY = 493;          // 狐狸外框中心（原图像素）
  const w = AREA_W / SCALE, h = AREA_H / SCALE;
  const BOARD = { x: FOX_CX - w / 2, y: FOX_CY - h / 2, w, h, pad: 12 };
  const api = { SCALE, AREA_W, AREA_H, COL_W, TOP_H, BOARD };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.FoldLayout = api;
})(typeof window !== 'undefined' ? window : globalThis);
