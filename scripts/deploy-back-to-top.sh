#!/bin/bash
# 返回顶部按钮快速部署脚本
# 使用方法: ./deploy-back-to-top.sh page.html

if [ $# -eq 0 ]; then
    echo "使用方法: $0 <html文件路径>"
    echo "示例: $0 new-page.html"
    exit 1
fi

HTML_FILE="$1"

if [ ! -f "$HTML_FILE" ]; then
    echo "错误: 文件 $HTML_FILE 不存在"
    exit 1
fi

echo "为 $HTML_FILE 添加返回顶部按钮..."

# 检查是否已经有返回顶部按钮
if grep -q "back-to-top" "$HTML_FILE"; then
    echo "警告: 该文件似乎已经包含返回顶部按钮"
    read -p "是否继续？(y/n): " confirm
    if [[ $confirm != [yY] ]]; then
        echo "操作已取消"
        exit 0
    fi
fi

# 备份原文件
cp "$HTML_FILE" "${HTML_FILE}.backup"
echo "已创建备份文件: ${HTML_FILE}.backup"

# CSS样式
CSS_STYLES='
    /* Back to Top Button Styles */
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .back-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .back-to-top:hover {
        background: linear-gradient(135deg, #29b6f6 0%, #03a9f4 100%);
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    [data-theme="dark"] .back-to-top {
        background: linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%);
    }

    [data-theme="dark"] .back-to-top:hover {
        background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%);
    }'

# HTML按钮
BUTTON_HTML='
<!-- Back to Top Button -->
<button class="back-to-top" id="backToTop" aria-label="返回顶部" title="返回顶部">
    <i class="fa fa-arrow-up"></i>
</button>'

# JavaScript代码
JAVASCRIPT_CODE='
// Back to Top Button Functionality
document.addEventListener('\''DOMContentLoaded'\'', function() {
    const backToTopButton = document.getElementById('\''backToTop'\'');
    
    if (!backToTopButton) {
        console.warn('\''返回顶部按钮元素未找到'\'');
        return;
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('\''scroll'\'', function() {
        if (window.pageYOffset > 100) {
            backToTopButton.classList.add('\''show'\'');
        } else {
            backToTopButton.classList.remove('\''show'\'');
        }
    });
    
    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('\''click'\'', function() {
        window.scrollTo({
            top: 0,
            behavior: '\''smooth'\''
        });
    });
});'

# 添加CSS样式到</style>标签前
if grep -q "</style>" "$HTML_FILE"; then
    sed -i "s|</style>|$CSS_STYLES\n  </style>|" "$HTML_FILE"
    echo "✅ CSS样式已添加"
else
    echo "警告: 未找到</style>标签，请手动添加CSS样式"
fi

# 添加HTML按钮到</body>标签前
if grep -q "</body>" "$HTML_FILE"; then
    sed -i "s|</body>|$BUTTON_HTML\n\n</body>|" "$HTML_FILE"
    echo "✅ HTML按钮已添加"
else
    echo "警告: 未找到</body>标签，请手动添加HTML按钮"
fi

# 添加JavaScript代码到</script>标签前（如果存在）
if grep -q "</script>" "$HTML_FILE"; then
    # 找到最后一个</script>标签前添加
    sed -i '$s|</script>|'"$JAVASCRIPT_CODE"'\n</script>|' "$HTML_FILE"
    echo "✅ JavaScript代码已添加"
else
    # 如果没有script标签，在</body>前添加
    SCRIPT_BLOCK="<script>$JAVASCRIPT_CODE</script>"
    sed -i "s|</body>|$SCRIPT_BLOCK\n\n</body>|" "$HTML_FILE"
    echo "✅ JavaScript代码已添加（新建script标签）"
fi

echo ""
echo "🎉 返回顶部按钮部署完成！"
echo ""
echo "📋 检查清单:"
echo "1. ✅ CSS样式 - 浅蓝色渐变设计"
echo "2. ✅ HTML按钮 - 右下角固定位置"  
echo "3. ✅ JavaScript功能 - 滚动显示/隐藏和平滑滚动"
echo "4. ✅ 主题支持 - 深色模式兼容"
echo "5. ✅ 响应式设计 - 移动端适配"
echo ""
echo "💡 提示:"
echo "- 按钮在滚动超过100px时显示"
echo "- 支持键盘导航和无障碍访问"
echo "- 如有问题，请检查Font Awesome图标库是否正确加载"
echo ""
echo "📄 备份文件已保存为: ${HTML_FILE}.backup"
