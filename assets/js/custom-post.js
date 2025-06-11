document.addEventListener('DOMContentLoaded', function() {
  // 查找并隐藏DESCRIPTION标题和内容
  const elements = document.querySelectorAll('*');
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.textContent && el.textContent.trim() === 'DESCRIPTION') {
      // 隐藏DESCRIPTION标题
      el.style.display = 'none';
      
      // 隐藏下一个元素（可能是描述内容）
      let next = el.nextElementSibling;
      if (next) {
        next.style.display = 'none';
      }
    }
  }
}); 