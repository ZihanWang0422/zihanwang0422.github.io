// 处理重复的标题
document.addEventListener('DOMContentLoaded', function() {
  // 获取所有标题元素
  const titles = document.querySelectorAll('h1.page-title, h1.post-title');
  
  // 如果有多个标题，只保留第一个
  if (titles.length > 1) {
    for (let i = 1; i < titles.length; i++) {
      titles[i].style.display = 'none';
    }
  }
}); 