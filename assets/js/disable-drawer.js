// 禁用侧边栏的拖动功能并确保其可见性
document.addEventListener('DOMContentLoaded', function() {
  // 获取侧边栏元素
  const drawer = document.querySelector('hy-drawer');
  if (drawer) {
    // 移除所有与拖动相关的属性
    drawer.removeAttribute('threshold');
    drawer.removeAttribute('noscroll');
    
    // 添加opened属性，使侧边栏始终保持打开状态
    drawer.setAttribute('opened', '');
    drawer.style.opacity = '1';
    drawer.style.visibility = 'visible';
    drawer.style.transform = 'none';
    
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
    
    // 确保侧边栏和其背景可见
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.style.opacity = '1';
      sidebar.style.visibility = 'visible';
      sidebar.style.display = 'flex';
    }
    
    const sidebarBg = document.querySelector('.sidebar-bg');
    if (sidebarBg) {
      sidebarBg.style.opacity = '1';
      sidebarBg.style.visibility = 'visible';
    }
  }
  
  // 强制处理样式
  setTimeout(function() {
    const drawer = document.querySelector('hy-drawer');
    const sidebar = document.querySelector('.sidebar');
    const sidebarBg = document.querySelector('.sidebar-bg');
    
    if (drawer) {
      drawer.style.opacity = '1';
      drawer.style.visibility = 'visible';
    }
    
    if (sidebar) {
      sidebar.style.opacity = '1';
      sidebar.style.visibility = 'visible';
      sidebar.style.display = 'flex';
    }
    
    if (sidebarBg) {
      sidebarBg.style.opacity = '1';
      sidebarBg.style.visibility = 'visible';
    }
  }, 100);
}); 