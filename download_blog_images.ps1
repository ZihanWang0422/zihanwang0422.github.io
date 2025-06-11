# 定义图片URL和输出路径
$images = @(
    @{
        Url = "https://placehold.co/120x120/4fb1ba/ffffff.png?text=Simulator"
        Output = "assets/images/blog/simulator.png"
    },
    @{
        Url = "https://placehold.co/120x120/4fb1ba/ffffff.png?text=Robot+Learning"
        Output = "assets/images/blog/robot-learning.png"
    }
)

# 下载所有图片
foreach ($image in $images) {
    # 创建目录（如果不存在）
    $directory = Split-Path -Path $image.Output -Parent
    if (-not (Test-Path -Path $directory)) {
        New-Item -ItemType Directory -Path $directory -Force
    }

    # 下载图片
    Invoke-WebRequest -Uri $image.Url -OutFile $image.Output
    Write-Host "图片已下载到 $($image.Output)"
} 