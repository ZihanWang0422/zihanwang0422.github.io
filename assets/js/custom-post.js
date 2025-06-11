document.addEventListener('DOMContentLoaded', function() {
  // 查找DESCRIPTION标题和内容
  const elements = document.querySelectorAll('*');
  let descriptionTitle = null;
  let descriptionContent = null;
  
  // 查找DESCRIPTION标题和内容
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    if (el.textContent && el.textContent.trim() === 'DESCRIPTION') {
      descriptionTitle = el;
      
      // 获取下一个元素（描述内容）
      let next = el.nextElementSibling;
      if (next) {
        descriptionContent = next;
      }
      break;
    }
  }
  
  // 如果找到了DESCRIPTION标题和内容
  if (descriptionTitle && descriptionContent) {
    // 查找文章标题
    const postTitle = document.querySelector('.post-title');
    
    if (postTitle) {
      // 将描述标题和内容移动到文章标题后面
      const parent = postTitle.parentNode;
      const postDate = document.querySelector('.post-date');
      
      // 添加样式
      descriptionTitle.classList.add('description-title');
      descriptionContent.classList.add('description-content');
      
      // 将描述内容插入到标题和日期之间
      if (postDate) {
        parent.insertBefore(descriptionContent, postDate);
        parent.insertBefore(descriptionTitle, descriptionContent);
      } else {
        parent.appendChild(descriptionTitle);
        parent.appendChild(descriptionContent);
      }
    }
  }
}); 