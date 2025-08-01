---
layout: post
title: IsaacSim Setup
description: Some basic IsaacSim Setup and SLAM/Nav2 demo.
image: /assets/images/blog/simulator.png
tags: [Simulator, Navigation, SLAM]
permalink: /blog/isaac-sim-setup/
---

* TOC
{:toc}

## Prerequisite

[Official GeForce Drivers NVIDIA](https://www.nvidia.com/en-us/geforce/drivers/)

[ubuntu22.04安装nvidia驱动/CUDA/cudnn_](https://blog.csdn.net/qq_34972053/article/details/127689332)

### Cuda安装相关

1. Nvidia Driver

   ```bash
   #卸载nvidia driver
   sudo apt-get --purge remove "*nvidia*"
   sudo apt autoremove
   #安装指定版本driver
   sudo add-apt-repository ppa:graphics-drivers/ppa  # 加入官方ppa源
   sudo apt update  # 检查软件包更新列表
   apt list --upgradable  # 查看可更新的软件包列表
   sudo apt upgrade  # 更新所有可更新的软件包
   #下载driver
   ubuntu-drivers devices    # ubuntu检测n卡的可选驱动
   sudo apt install nvidia-driver-5xx  # 根据自己的n卡可选驱动下载显卡驱动
   
   ```

2. 下载cuda

   ```bash
   #下载链接https://developer.nvidia.com/cuda-toolkit-archive
   ```

3. 切换cuda版本：

   ```bash
   #查看已安装的cuda
   ls -l /usr/local | grep cuda
   #打开环境变量
   vim ~/.bashrc
   #按i进入编辑模式，粘贴下方命令。Esc，输入:wq保存并退出
   export PATH=/usr/local/cuda-12.6/bin:$PATH
   export LD_LIBRARY_PATH=/usr/local/cuda-12.6/lib64:$LD_LIBRARY_PATH
   export LIBRARY_PATH=/usr/local/cuda-12.6/lib64:$LIBRARY_PATH
   #保存环境变量
   source ~/.bashrc 
   ```

4. cuda卸载：

   ```bash
   cd /usr/local/cuda-xx.x/bin/
   sudo ./cuda-uninstaller
   sudo rm -rf /usr/local/cuda-xx.x
   ```



### Docker 配置

[Container Installation — Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/installation/install_container.html)

1. Docker卸载

   ```bash
   sudo systemctl stop docker
   sudo apt-get purge docker-ce docker-ce-cli containerd.io
   sudo rm -rf /var/lib/docker
   sudo rm -rf /etc/docker
   sudo rm -rf /var/run/docker.sock
   sudo groupdel docker
   ```

2. Docker 下载

   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   sudo groupadd docker
   sudo usermod -aG docker $USER
   newgrp docker
   
   #设置开机自启动docker
   systemctl enable docker
   sudo systemctl restart docker
   
   #验证docker
   docker run hello-world
   #查看docker里面安装的镜像文件
   docker images
   ```

3. 下载NVIDIA Container Toolkit

   ```bash
   curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
       && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
       sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
       sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list \
       && \
       sudo apt-get update
       
   #Install the NVIDIA Container Toolkit packages
   sudo apt-get install -y nvidia-container-toolkit
   sudo systemctl restart docker
   
   #Configure the container runtime
   sudo nvidia-ctk runtime configure --runtime=docker
   sudo systemctl restart docker
   
   #查看nvidia-smi
   docker run --rm --runtime=nvidia --gpus all ubuntu nvidia-smi
   docker run --rm -it --gpus all ubuntu:22.04 /bin/bash
   #启动docker里面的cuda时，需要对应好本机的ubuntu版本
   #查看对应版本如下：https://gitlab.com/nvidia/container-images/cuda/blob/master/doc/supported-tags.md
   ```



* Docker + Nvidia container toolkit: [使用 NVIDIA Container Toolkit 和 Docker 配置 GPU 深度学习环境 - 溺死在幸福里的猪 - 博客园](https://www.cnblogs.com/li508q/p/18444582)

	   [Ubuntu22.04安装docker、nvidia-docker、NVIDIA Container Toolkit亲自安装必有效_ubuntu22.04安装nvidia-docker-CSDN博 		客](https://blog.csdn.net/guoqingru0311/article/details/145926492)



   * 问题解决记录1：nvidia-container-cli: initialization error: load library failed

		[docker: Error response from daemon: failed to create shim task: OCI runtime create failed: runc create failed · Issue #1648 · 		NVIDIA/nvidia-docker](https://github.com/NVIDIA/nvidia-docker/issues/1648#issuecomment-1785033393)



   * 一些package可以从https://hub.docker.com/search进行pull



### Isaac Ros Workspace Setup

1. Restart docker

   ```bash
   sudo systemctl daemon-reload && sudo systemctl restart docker
   ```

2. Install Git LFS

   ```bash
   sudo apt-get install git-lfs
   git lfs install --skip-repo
   ```

3. Create ROS2 Workspace

   ```bash
   mkdir -p  ~/workspaces/isaac_ros-dev/src
   echo "export ISAAC_ROS_WS=${HOME}/workspaces/isaac_ros-dev/" >> ~/.bashrc
   source ~/.bashrc
   ```

4. Create isaac\_ros\_common

   ```bash
   cd ${ISAAC_ROS_WS}/src && \
      git clone -b release-3.2 https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common.git isaac_ros_common
   ```

5. Quick start assets

   ```bash
   sudo apt-get install -y curl jq tar
   
   NGC_ORG="nvidia"
   NGC_TEAM="isaac"
   PACKAGE_NAME="isaac_ros_visual_slam"
   NGC_RESOURCE="isaac_ros_visual_slam_assets"
   NGC_FILENAME="quickstart.tar.gz"
   MAJOR_VERSION=3
   MINOR_VERSION=1
   VERSION_REQ_URL="https://catalog.ngc.nvidia.com/api/resources/versions?orgName=$NGC_ORG&teamName=$NGC_TEAM&name=$NGC_RESOURCE&isPublic=true&pageNumber=0&pageSize=100&sortOrder=CREATED_DATE_DESC"
   AVAILABLE_VERSIONS=$(curl -s \
       -H "Accept: application/json" "$VERSION_REQ_URL")
   LATEST_VERSION_ID=$(echo $AVAILABLE_VERSIONS | jq -r "
       .recipeVersions[]
       | .versionId as \$v
       | \$v | select(test(\"^\\\\d+\\\\.\\\\d+\\\\.\\\\d+$\"))
       | split(\".\") | {major: .[0]|tonumber, minor: .[1]|tonumber, patch: .[2]|tonumber}
       | select(.major == $MAJOR_VERSION and .minor <= $MINOR_VERSION)
       | \$v
       " | sort -V | tail -n 1
   )
   if [ -z "$LATEST_VERSION_ID" ]; then
       echo "No corresponding version found for Isaac ROS $MAJOR_VERSION.$MINOR_VERSION"
       echo "Found versions:"
       echo $AVAILABLE_VERSIONS | jq -r '.recipeVersions[].versionId'
   else
       mkdir -p ${ISAAC_ROS_WS}/isaac_ros_assets && \
       FILE_REQ_URL="https://api.ngc.nvidia.com/v2/resources/$NGC_ORG/$NGC_TEAM/$NGC_RESOURCE/\
   versions/$LATEST_VERSION_ID/files/$NGC_FILENAME" && \
       curl -LO --request GET "${FILE_REQ_URL}" && \
       tar -xf ${NGC_FILENAME} -C ${ISAAC_ROS_WS}/isaac_ros_assets && \
       rm ${NGC_FILENAME}
   fi
   ```





## Isaac Sim

### Installization（Workstation）

1. Download

[Download Isaac Sim — Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/installation/download.html)

2. Workstation Installiation

   ```bash
   mkdir ~/isaacsim
   cd ~/Downloads
   
   cd ~/isaacsim
   ./post_install.sh
   #运行这个命令会打开app selector，可以选择内置ros环境和ros bridge
   ./isaac-sim.selector.sh
   
   #运行这个命令会直接唤起程序
    ./isaac-sim.sh
   ```



3. ROS2 Installization

* 本地下载：ROS2 humble

	注意source ros2空间！！

	source /opt/ros/humble/setup.bash

* ROS bridge extnesion

	***Window->Extensions*** and search for ROS 2 bridge

* Set up Isaac Sim ROS Workspaces

  下载ws：[isaac-sim/IsaacSim-ros_workspaces: Isaac Sim ROS Workspaces](https://github.com/isaac-sim/IsaacSim-ros_workspaces)

  下载相关包：

  ```bash
  # For rosdep install command
  sudo apt install python3-rosdep python3-rosinstall python3-rosinstall-generator python3-wstool build-essential
  # For colcon build command
  sudo apt install python3-colcon-common-extensions
  
  cd humble_ws
  rosdep install -i --from-path src --rosdistro humble -y
  
  colcon build
  
  #每次启动isaac sim前均需要运行source
  source install/local_setup.bash
  ```





### Nav2

[ROS2 Navigation — Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/ros2_tutorials/tutorial_ros2_navigation.html#ros2-navigation)

1. Installization

   ```bash
   sudo apt install ros-<ros2-distro>-navigation2
   sudo apt install ros-<ros2-distro>-nav2-bringup
   ```

   

2. Occupancy Map

   [ROS2 Navigation — Isaac Sim Documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/ros2_tutorials/tutorial_ros2_navigation.html#occupancy-map)

   

3. Running

* 启动流程

   ```bash
   #Terminal1
   cd ~/isaacsim
   ./isaac-sim.selector.sh
   
   #Terminal2
   cd ~/IsaacSim-ros_workspaces
   cd humble_ws
   source install/local_setup.bash
   ros2 launch carter_navigation carter_navigation.launch.py
   ```

* Load example

   **Window > Examples > Robotics Examples然后打开ROS2 > Navigation > Carter**

   **Play**

* Pose Estimate

* Nav2 Goal





### NVBlox

1. 首先完成前置环境配置

   [ IsaacSim 4.5 Workstation - Nav2/VSlam](https://c1afcru08q1.feishu.cn/docx/GOsVd7UgWoW4HtxKCtWcPhIdnBc#share-IanndP7T0ou8wLxZ014cOsOonud)

   

2. isaac\_ros\_nvblox

   ```bash
   #Launch docker container 
   cd $ISAAC_ROS_WS && ./src/isaac_ros_common/scripts/run_dev.sh
   #Install isaac_ros_nvblox and its dependencies.(重新启动docker时可能需要    再运行下这个进行source)
   sudo apt-get update
   sudo apt update &&
   sudo apt-get install -y ros-humble-isaac-ros-nvblox && \
   rosdep update && \
   rosdep install isaac_ros_nvblox
   ```

   ```bash
   ros2 launch nvblox_examples_bringup isaac_sim_example.launch.py \
   rosbag:=${ISAAC_ROS_WS}/isaac_ros_assets/isaac_ros_nvblox/quickstart \
   navigation:=False
   ```

   

3. Reconstruction + Nav2

* 跑launch之前的source应该运行这个：[ IsaacSim 4.5 Workstation - Nav2/VSlam](https://c1afcru08q1.feishu.cn/docx/GOsVd7UgWoW4HtxKCtWcPhIdnBc#share-DrtGdxZGSoVHnLxUbGecTRFTnab)

   ```bash
   cd $ISAAC_ROS_WS && ./src/isaac_ros_common/scripts/run_dev.sh
   
   cd /workspaces/isaac_ros-dev
   
   export FASTRTPS_DEFAULT_PROFILES_FILE=/usr/local/share/middleware_profiles/rtps_udp_profile.xml
   
   ros2 launch nvblox_examples_bringup isaac_sim_example.launch.py
   ```

   ```bash
   #建议先启动isaac-sim-selector
   ./isaac-sim.selector.sh
   #在selector gui界面内先Clear cache，然后Open in terminal
   ./isaac-sim.sh
   ```

     ⚠️Crash：
   
      点击play后会出现crash提示或者在运行一段Nav2后会出现 llvm: out of memory

      此时需要对Nvidia Driver版本进行降级，根据官方推荐为 >=  **535.129.03**

      如果运行时再出现crash，保留nvblox终端，再次运行isaacsim

     ⚠️Error：
   
   ```Bash
   [Error] [omni.sensors.nv.lidar.lidar_core.plugin] CUDA Driver CALL FAILED at line 522: the provided PTX was compiled with an unsupported toolchain.
   [Error] [omni.sensors.nv.lidar.lidar_core.plugin] CUDA Driver CALL FAILED at line 548: named symbol not found
   #</path/to/isaac_sim_installation>为isaacsim文件的下载路径
   export LD_LIBRARY_PATH=</path/to/isaac_sim_installation>/extscache/omni.sensors.nv.common-2.5.0-coreapi+lx64.r.cp310/bin:$LD_LIBRARY_PATH    
   ```

* RVIZ2:

     	选中3d LiDAR可以感知较大范围的物体，可以辅助Nav时Goal的选择

<img src="/assets/images/blog//2025-06-11-IsaacSim-Setup.assets/1749620079173-1.png" alt="img" style="zoom:33%;" />

4. Reconstruction + Segmantic image

<img src="/assets/images/blog/2025-06-11-IsaacSim-Setup.assets/1749620099261-4.png" alt="img" style="zoom:33%;" />





### Visual Slam

1. 首先完成前置环境配置：

   [ IsaacSim 4.5 Workstation - Nav2/VSlam](https://c1afcru08q1.feishu.cn/docx/GOsVd7UgWoW4HtxKCtWcPhIdnBc#share-IanndP7T0ou8wLxZ014cOsOonud)

   ⚠️Error: [Failed to initialize CUVSLAM tracker: 4](https://forums.developer.nvidia.com/t/failed-to-initialize-cuvslam-tracker-4-x86-64-zed-camera/321998)

   

2. isaac\_ros\_visual\_slam 环境配置

   ```bash
   cd ${ISAAC_ROS_WS}/src/isaac_ros_common && \
   ./scripts/run_dev.sh
   
   sudo apt-get update
   #每次launch前要用这个source一下
   sudo apt-get install -y ros-humble-isaac-ros-visual-slam
   ```

   

3. Run Launch File

   ```bash
   #Terminal 1
   sudo apt-get update
   sudo apt-get install -y ros-humble-isaac-ros-examples
   #使用quickstart
   ros2 launch isaac_ros_examples isaac_ros_examples.launch.py launch_fragments:=visual_slam \
   interface_specs_file:=${ISAAC_ROS_WS}/isaac_ros_assets/isaac_ros_visual_slam/quickstart_interface_specs.json \
   rectified_images:=false
   ```

   ```bash
   #Terminal 2
   cd ${ISAAC_ROS_WS}/src/isaac_ros_common && \
   ./scripts/run_dev.sh
   #这个用来启动摄像头，在运行完Terminal3后运行
   ros2 bag play ${ISAAC_ROS_WS}/isaac_ros_assets/isaac_ros_visual_slam/quickstart_bag --remap  \
   /front_stereo_camera/left/image_raw:=/left/image_rect \
   /front_stereo_camera/left/camera_info:=/left/camera_info_rect \
   /front_stereo_camera/right/image_raw:=/right/image_rect \
   /front_stereo_camera/right/camera_info:=/right/camera_info_rect \
   /back_stereo_camera/left/image_raw:=/rear_left/image_rect \
   /back_stereo_camera/left/camera_info:=/rear_left/camera_info_rect \
   /back_stereo_camera/right/image_raw:=/rear_right/image_rect \
   /back_stereo_camera/right/camera_info:=/rear_right/camera_info_rect
   ```

   ```bash
   #Terminal
   cd ${ISAAC_ROS_WS}/src/isaac_ros_common && \
      ./scripts/run_dev.sh
   #run rviz   
   rviz2 -d $(ros2 pkg prefix isaac_ros_visual_slam --share)/rviz/default.cfg.rviz
   ```

   