$url = "https://placehold.co/120x120/4fb1ba/ffffff.png?text=Blog+Post"
$output = "assets/images/blog/default.png"

# 创建目录（如果不存在）
$directory = Split-Path -Path $output -Parent
if (-not (Test-Path -Path $directory)) {
    New-Item -ItemType Directory -Path $directory -Force
}

# 下载图片
Invoke-WebRequest -Uri $url -OutFile $output

Write-Host "图片已下载到 $output" 