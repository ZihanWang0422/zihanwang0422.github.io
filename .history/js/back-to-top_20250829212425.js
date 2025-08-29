/**
 * Back to Top Button Functionality
 * 返回顶部按钮功能
 * 
 * 使用方法：
 * 1. 在HTML中添加按钮: <button class="back-to-top" id="backToTop"><i class="fa fa-arrow-up"></i></button>
 * 2. 引入此JS文件: <script src="js/back-to-top.js"></script>
 * 3. 调用初始化函数: initBackToTop();
 */

function initBackToTop(options = {}) {
    // 默认配置
    const config = {
        buttonId: options.buttonId || 'backToTop',
        showOffset: options.showOffset || 100,
        scrollDuration: options.scrollDuration || 500,
        easing: options.easing || 'easeInOutQuad'
    };

    const backToTopButton = document.getElementById(config.buttonId);
    
    if (!backToTopButton) {
        console.warn('返回顶部按钮未找到，请检查buttonId是否正确');
        return;
    }

    // 缓动函数
    const easingFunctions = {
        easeInOutQuad: function(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeOutCubic: function(t) {
            return 1 - Math.pow(1 - t, 3);
        },
        linear: function(t) {
            return t;
        }
    };

    // 平滑滚动到顶部
    function smoothScrollToTop() {
        const startPosition = window.pageYOffset;
        const startTime = performance.now();

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / config.scrollDuration, 1);
            
            const easingFunction = easingFunctions[config.easing] || easingFunctions.easeInOutQuad;
            const ease = easingFunction(progress);
            
            window.scrollTo(0, startPosition * (1 - ease));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // 显示/隐藏按钮
    function toggleButton() {
        if (window.pageYOffset > config.showOffset) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }

    // 事件监听器
    window.addEventListener('scroll', toggleButton);
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollToTop();
    });

    // 键盘支持
    backToTopButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            smoothScrollToTop();
        }
    });

    // 初始检查
    toggleButton();

    // 返回销毁函数
    return function destroy() {
        window.removeEventListener('scroll', toggleButton);
        backToTopButton.removeEventListener('click', smoothScrollToTop);
        backToTopButton.removeEventListener('keydown', smoothScrollToTop);
    };
}

// 页面加载后自动初始化
document.addEventListener('DOMContentLoaded', function() {
    // 基础初始化
    initBackToTop();
    
    // 如果需要自定义配置，可以这样调用：
    // initBackToTop({
    //     buttonId: 'backToTop',
    //     showOffset: 200,
    //     scrollDuration: 800,
    //     easing: 'easeOutCubic'
    // });
});

// 导出函数以供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initBackToTop };
}

// 全局变量（可选）
window.BackToTop = { initBackToTop };
