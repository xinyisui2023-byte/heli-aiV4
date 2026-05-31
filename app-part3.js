/* =============================================
   app-part3.js - 初始化 + 启动逻辑
   合力生态 HarmonyLink v4.0 — 流量摆渡升级版
   ============================================= */

// ========== 应用初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
  Store.init();

  // v4.0: 检测链接中的邀请参数
  if (typeof detectReferral === 'function') detectReferral();

  initApp();
});

async function initApp() {
  // 显示启动屏
  const splash = document.getElementById('page-splash');
  if (splash) splash.classList.add('active');

  // 初始化动画
  await sleep(2200);

  // 隐藏启动屏，进入首页
  if (splash) splash.classList.remove('active');
  navigate('page-home');
}

// ========== 全局键盘事件 ==========
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ========== 触摸手势 ==========
let touchStartX = 0;
let touchStartY = 0;

document.getElementById('app').addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.getElementById('app').addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
  if (dx > 80 && dy < 60 && pageStack.length > 1) {
    goBack();
  }
}, { passive: true });
