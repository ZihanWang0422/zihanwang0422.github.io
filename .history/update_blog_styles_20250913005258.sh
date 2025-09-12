#!/bin/bash

# 批量更新博客页面样式的脚本

# 定义要更新的文件
FILES=(
  "blog/isaac-sim-setup.html"
  "blog/urdf.html"
)

echo "开始批量更新博客样式..."

for file in "${FILES[@]}"; do
  echo "处理文件: $file"
  
  # 1. 更新深色模式下的主题切换按钮样式
  if grep -q "\[data-theme=\"dark\"\] \.theme-toggle {" "$file"; then
    echo "  - 更新深色模式主题切换按钮样式"
    # 这里可以添加sed命令来替换样式
  fi
  
  # 2. 更新back按钮样式
  if grep -q "\.back-to-home {" "$file"; then
    echo "  - 更新返回按钮样式"
    # 这里可以添加sed命令来替换样式
  fi
  
  # 3. 更新头部样式
  if grep -q "\.blog-header {" "$file"; then
    echo "  - 更新头部背景样式"
    # 这里可以添加sed命令来替换样式
  fi
  
done

echo "批量更新完成！"
