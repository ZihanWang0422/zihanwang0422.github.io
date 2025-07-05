// 禁用侧边栏的拖动功能
document.addEventListener('DOMContentLoaded', function() {
  // 获取侧边栏元素
  const drawer = document.querySelector('hy-drawer');
  if (drawer) {
    // 移除所有与拖动相关的属性
    drawer.removeAttribute('threshold');
    drawer.removeAttribute('noscroll');
    
    // 添加opened属性，使侧边栏始终保持打开状态
    drawer.setAttribute('opened', '');
    
    // 移除可能影响侧边栏固定的class
    drawer.classList.remove('cover');
    
    // 禁用事件监听器
    const disableEvent = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    
    // 禁用侧边栏的触摸和鼠标事件
    drawer.addEventListener('touchstart', disableEvent, true);
    drawer.addEventListener('touchmove', disableEvent, true);
    drawer.addEventListener('touchend', disableEvent, true);
    drawer.addEventListener('mousedown', disableEvent, true);
    drawer.addEventListener('mousemove', disableEvent, true);
    drawer.addEventListener('mouseup', disableEvent, true);
    
    // 隐藏汉堡菜单按钮
    const navBtn = document.querySelector('.nav-btn');
    if (navBtn) {
      navBtn.style.display = 'none';
    }
  }
}); 