---
layout: post
title: NVblox Setup
description: Setup tutorials of NVblox
image: /assets/images/blog/simulator.png
tags: [Jetson, Navigation, SLAM]
permalink: /blog/nvblox-setup/
---

* TOC
{:toc}

<!-- * [ ] To do：Jetson上realsense相关本地配置

Kernel-builder:

[GitHub - jetsonhacks/jetson-orin-kernel-builder: Build the Linux kernel and modules on board the Jet](https://github.com/jetsonhacks/jetson-orin-kernel-builder?tab=readme-ov-file)

[GitHub - jetsonhacks/jetson-orin-librealsense: Prebuilt kernel modules for running librealsense on J](https://github.com/jetsonhacks/jetson-orin-librealsense)

[librealsense/doc/installation\_jetson.md at master · IntelRealSense/librealsense](https://github.com/IntelRealSense/librealsense/blob/master/doc/installation_jetson.md) -->



## Prerequisite(Jetson Orin Nano)

### Jetson Setup

### 重启docker

```bash
sudo systemctl daemon-reload && sudo systemctl restart docker

sudo apt-get install git-lfs
git lfs install --skip-repo
```

### 环境变量设置

```bash
mkdir -p  ~/workspaces/isaac_ros-dev/src
echo "export ISAAC_ROS_WS=${HOME}/workspaces/isaac_ros-dev/" >> ~/.bashrc
source ~/.bashrc
```

### 建立环境

```bash
cd ${ISAAC_ROS_WS}/src && \
   git clone -b release-3.2 https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common.git isaac_ros_common
   
sudo apt-get install -y curl jq tar

NGC_ORG="nvidia"
NGC_TEAM="isaac"
PACKAGE_NAME="isaac_ros_nvblox"
NGC_RESOURCE="isaac_ros_nvblox_assets"
NGC_FILENAME="quickstart.tar.gz"
MAJOR_VERSION=3
MINOR_VERSION=2
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



## NVBlox配置

&#x20;     bug1 [ Jetson部署NVBlox](https://c1afcru08q1.feishu.cn/docx/KyOjdFzlRoRmlKxQXC4cbxgNnbe#share-W8zgdsXNmoJy02xR7LhcMu9onTg)



## Realsense Docker 配置

```bash
cd ${ISAAC_ROS_WS}/src && \
   git clone -b release-3.2 https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common.git isaac_ros_common
```

```bash
cd ${ISAAC_ROS_WS}/src/isaac_ros_common/scripts && \
touch .isaac_ros_common-config && \
echo CONFIG_IMAGE_KEY=ros2_humble.realsense > .isaac_ros_common-config
```

```bash
cd ${ISAAC_ROS_WS}/src/isaac_ros_common && \
./scripts/run_dev.sh 
```

运行`realsense-viewer`，看到深度图像



## IsaacROS NVBlox 运行

```bash
cd $ISAAC_ROS_WS && ./src/isaac_ros_common/scripts/run_dev.sh
```

```bash
cd /workspaces/isaac_ros-dev
source install/setup.bash
```

```bash
ros2 launch nvblox_examples_bringup realsense_example.launch.py
```

<img src="/assets/images/blog//2025-04-30-NVblox-Setup.assets/image.png" alt="img" style="zoom:50%;" />

或者录制ROSbag后，从ROSbag运行[ Jetson部署NVBlox](https://c1afcru08q1.feishu.cn/docx/KyOjdFzlRoRmlKxQXC4cbxgNnbe#share-Cb5ydnI67osUbNxsSWUcQUOjnRG)

```bash
ros2 launch nvblox_examples_bringup realsense_example.launch.py \
rosbag:=<YOUR_ROSBAG_PATH>
```



## ROSbag录制



```bash
cd $ISAAC_ROS_WS && ./src/isaac_ros_common/scripts/run_dev.sh
cd /workspaces/isaac_ros-dev
source install/setup.bash
```

```bash
ros2 launch nvblox_examples_bringup record_realsense.launch.py
```

ROSbag-NVBlox如下（待验证）：https://www.jianguoyun.com/p/DddYoskQ7IupDRjN\_v8FIAA







## ⚠️Debug

### bug1： TypeError: canonicalize\_name() got an unexpected keyword argument 'validate'

AttributeError: module 'packaging.utils' has no attribute 'InvalidName'

```bash
    112.4   Installing build dependencies: started
118.0   Installing build dependencies: finished with status 'done'
118.0   Getting requirements to build wheel: started
118.2   Getting requirements to build wheel: finished with status 'done'
118.4   Installing backend dependencies: started
128.1   Installing backend dependencies: finished with status 'done'
128.1   Preparing metadata (pyproject.toml): started
128.4   Preparing metadata (pyproject.toml): finished with status 'error'
128.4   error: subprocess-exited-with-error
128.4   
128.4   × Preparing metadata (pyproject.toml) did not run successfully.
128.4   │ exit code: 1
128.4   ╰─> [30 lines of output]
128.4       Traceback (most recent call last):
128.4         File "/tmp/pip-build-env-60yni415/overlay/local/lib/python3.10/dist-packages/scikit_build_core/_vendor/pyproject_metadata/__init__.py", line 515, in validate
128.4           packaging.utils.canonicalize_name(self.name, validate=True)
128.4       TypeError: canonicalize_name() got an unexpected keyword argument 'validate'
128.4       
128.4       During handling of the above exception, another exception occurred:
128.4       
128.4       Traceback (most recent call last):
128.4         File "/usr/lib/python3/dist-packages/pip/_vendor/pep517/in_process/_in_process.py", line 363, in <module>
128.4           main()
128.4         File "/usr/lib/python3/dist-packages/pip/_vendor/pep517/in_process/_in_process.py", line 345, in main
128.4           json_out['return_val'] = hook(**hook_input['kwargs'])
128.4         File "/usr/lib/python3/dist-packages/pip/_vendor/pep517/in_process/_in_process.py", line 164, in prepare_metadata_for_build_wheel
128.4           return hook(metadata_directory, config_settings)
128.4         File "/tmp/pip-build-env-60yni415/overlay/local/lib/python3.10/dist-packages/scikit_build_core/build/__init__.py", line 96, in prepare_metadata_for_build_wheel
128.4           return _build_wheel_impl(
128.4         File "/tmp/pip-build-env-60yni415/overlay/local/lib/python3.10/dist-packages/scikit_build_core/build/wheel.py", line 174, in _build_wheel_impl
128.4           return _build_wheel_impl_impl(
128.4         File "/tmp/pip-build-env-60yni415/overlay/local/lib/python3.10/dist-packages/scikit_build_core/build/wheel.py", line 231, in _build_wheel_impl_impl
128.4           metadata = get_standard_metadata(pyproject, settings)
128.4         File "/tmp/pip-build-env-60yni415/overlay/local/lib/python3.10/dist-packages/scikit_build_core/build/metadata.py", line 75, in get_standard_metadata
128.4           metadata = StandardMetadata.from_pyproject(
128.4         File "/tmp/pip-build-env-60yni415/overlay/local/lib/python3.10/dist-packages/scikit_build_core/_vendor/pyproject_metadata/__init__.py", line 428, in from_pyproject
128.4           self = cls(
128.4         File "<string>", line 24, in __init__
128.4         File "/tmp/pip-build-env-60yni415/overlay/local/lib/python3.10/dist-packages/scikit_build_core/_vendor/pyproject_metadata/__init__.py", line 293, in __post_init__
128.4           self.validate()
128.4         File "/tmp/pip-build-env-60yni415/overlay/local/lib/python3.10/dist-packages/scikit_build_core/_vendor/pyproject_metadata/__init__.py", line 516, in validate
128.4           except packaging.utils.InvalidName:
128.4       AttributeError: module 'packaging.utils' has no attribute 'InvalidName'
128.4       [end of output]
128.4   
128.4   note: This error originates from a subprocess, and is likely not a problem with pip.
128.4 error: metadata-generation-failed
128.4 
128.4 × Encountered error while generating package metadata.
128.4 ╰─> See above for output.
128.4 
128.4 note: This is an issue with the package mentioned above, not pip.
128.4 hint: See above for details.
------
Dockerfile.aarch64:144
--------------------
 143 |     # Additional Python dependencies
 144 | >>> RUN python3 -m pip install -U \
 145 | >>>     pymongo \
 146 | >>>     scikit-learn \
 147 | >>>     networkx \
 148 | >>>     "numpy>=1.24.4,<2" \
 149 | >>>     numpy-quaternion \
 150 | >>>     pyyaml \
 151 | >>>     "setuptools_scm>=6.2" \
 152 | >>>     trimesh \
 153 | >>>     "yourdfpy>=0.0.53" \
 154 | >>>     "warp-lang>=0.9.0" \
 155 | >>>     "scipy>=1.7.0" \
 156 | >>>     tqdm \
 157 | >>>     importlib_resources\
 158 | >>>     "mapbox_earcut<1.0.2"
 159 |     
--------------------
ERROR: failed to solve: process "/bin/bash -c python3 -m pip install -U     pymongo     scikit-learn     networkx     \"numpy>=1.24.4,<2\"     numpy-quaternion     pyyaml     \"setuptools_scm>=6.2\"     trimesh     \"yourdfpy>=0.0.53\"     \"warp-lang>=0.9.0\"     \"scipy>=1.7.0\"     tqdm     importlib_resources    \"mapbox_earcut<1.0.2\"" did not complete successfully: exit code: 1
```

```dockerfile
# Copyright (c) 2024, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.
#

ARG PLATFORM=amd64
ARG BASE_IMAGE=nvidia/cuda:12.6.1-devel-ubuntu22.04

# --------------------------------------------------------------------------------------------------
# https://docs.nvidia.com/deeplearning/frameworks/user-guide/index.html
# https://docs.nvidia.com/deeplearning/frameworks/support-matrix/index.html
FROM nvcr.io/nvidia/tritonserver:24.08-py3 AS base-amd64

FROM nvcr.io/nvidia/12.6.11-devel:12.6.11-devel-aarch64-ubuntu22.04 AS base-arm64
# --------------------------------------------------------------------------------------------------

FROM base-${PLATFORM} AS common
ARG PLATFORM

# Store list of packages (must be first)
RUN mkdir -p /opt/nvidia/isaac_ros_dev_base && dpkg-query -W | sort > /opt/nvidia/isaac_ros_dev_base/base-start-packages.csv

# disable terminal interaction for apt
ENV DEBIAN_FRONTEND=noninteractive
ENV SHELL=/bin/bash
SHELL ["/bin/bash", "-c"]

# Ensure we have universe
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    software-properties-common \
    && add-apt-repository universe \
    && apt-get update

# Fundamentals
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    apt-transport-https \
    apt-utils \
    bash-completion \
    build-essential \
    ca-certificates \
    clang-format \
    cmake \
    curl \
    git \
    git-lfs \
    gnupg2 \
    iputils-ping \
    libgoogle-glog-dev \
    locales \
    lsb-release \
    mlocate \
    rsync \
    tar \
    unzip \
    vim \
    wget \
    zlib1g-dev

# Python basics
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    python3-dev \
    python3-distutils \
    python3-flake8 \
    python3-pip \
    python3-pybind11 \
    python3-pytest \
    python3-pytest-repeat \
    python3-pytest-rerunfailures \
    python3-pytest-cov \
    python3-venv \
    python3-zmq \
    python3.10 \
    python3.10-venv

# Set Python3 as default
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1

# Add Isaac apt repository
RUN --mount=type=cache,target=/var/cache/apt \
    wget -qO - https://isaac.download.nvidia.com/isaac-ros/repos.key | apt-key add - && \
    grep -qxF "deb https://isaac.download.nvidia.com/isaac-ros/release-3 $(lsb_release -cs) release-3.0" /etc/apt/sources.list || \
    echo "deb https://isaac.download.nvidia.com/isaac-ros/release-3 $(lsb_release -cs) release-3.0" | tee -a /etc/apt/sources.list \
    && apt-get update

# Core dev libraries
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    gfortran \
    graphicsmagick-libmagick-dev-compat \
    jq \
    kmod \
    lcov \
    libasio-dev \
    libassimp-dev \
    libatlas3-base \
    libatlas-base-dev \
    libblas3 \
    libboost-all-dev \
    libboost-dev \
    libbullet-dev \
    libceres-dev \
    libcunit1-dev \
    libffi7 \
    libfreetype6 \
    libgraphicsmagick++1-dev \
    libhidapi-libusb0 \
    libinput10 \
    libjpeg8 \
    liblapack3 \
    libmnl0 \
    libmnl-dev \
    libncurses5-dev \
    libode-dev \
    libopenblas0 \
    libopencv-dev=4.5.4+dfsg-9ubuntu4 \
    libopenmpi3 \
    libpcap-dev \
    libpcl-dev \
    libpython3.10 \
    libsuitesparse-dev \
    libtinyxml2-dev \
    libturbojpeg \
    libunwind8 \
    libv4l-0 \
    libv4l-dev \
    libx264-dev \
    libxaw7-dev \
    libyaml-cpp-dev \
    linuxptp \
    llvm-14 \
    nlohmann-json3-dev \
    patchelf \
    python3-opencv=4.5.4+dfsg-9ubuntu4 \
    python3-scipy

# Downgrade to setuptools < 70.0.0
# https://github.com/pypa/setuptools/issues/4483
RUN python3 -m pip install -U \
    setuptools==65.7.0
    

# Python3 PIP buildtools
RUN python3 -m pip install -U \
    Cython \
    ninja \
    wheel

# Python3 PIP packages
RUN python3 -m pip install -U \
    argcomplete \
    autopep8 \
    flake8 \
    flake8-blind-except \
    flake8-builtins \
    flake8-class-newline \
    flake8-comprehensions \
    flake8-deprecated \
    flake8-docstrings \
    flake8-import-order \
    flake8-quotes \
    gpustat==0.6.0 \
    importlib_resources \
    networkx \
    "numpy>=1.24.4,<2" \
    numpy-quaternion \
    onnx \
    pydocstyle \
    pymongo \
    pyyaml \
    "scipy>=1.7.0" \
    scikit-image \
    scikit-learn \
    "setuptools_scm>=6.2" \
    tqdm \
    trimesh \
    "warp-lang>=0.9.0" \
    "yourdfpy>=0.0.53" \
    opentelemetry-api==1.28.1 \
    opentelemetry-sdk==1.28.1 \
    opentelemetry-exporter-otlp

# Add MQTT binaries and libraries
RUN --mount=type=cache,target=/var/cache/apt \
    apt-add-repository ppa:mosquitto-dev/mosquitto-ppa \
    && apt-get update && apt-get install -y \
    mosquitto \
    mosquitto-clients

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn && \
    corepack enable

# Install CuPy and HDBSCAN
RUN python3 -m pip install -U \
    cupy-cuda12x \
    hdbscan

# Setup Jetson debian repositories
RUN --mount=type=cache,target=/var/cache/apt \
    apt-key adv --fetch-key https://repo.download.nvidia.com/jetson/jetson-ota-public.asc ; \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    echo 'deb https://repo.download.nvidia.com/jetson/common r36.4 main' > /etc/apt/sources.list.d/nvidia-l4t-apt-source.list \
    && echo 'deb https://repo.download.nvidia.com/jetson/t234 r36.4 main' >> /etc/apt/sources.list.d/nvidia-l4t-apt-source.list ; \
    elif [[ ${PLATFORM} == 'amd64' ]]; then \
    add-apt-repository "deb http://repo.download.nvidia.com/jetson/x86_64/$(lsb_release -cs) r36.4 main" ; \
    else \
    echo "Unrecognized platform: ${PLATFORM}" && exit 1 ; \
    fi ; \
    apt-get update

# Setup CUDA repositories
RUN --mount=type=cache,target=/var/cache/apt \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/arm64/cuda-keyring_1.1-1_all.deb ; \
    elif [[ ${PLATFORM} == 'amd64' ]]; then \
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb ; \
    else \
    echo "Unrecognized platform: ${PLATFORM}" && exit 1 ; \
    fi ; \
    dpkg -i cuda-keyring_1.1-1_all.deb && rm -Rf cuda-keyring_1.1-1_all.deb ; \
    apt-get update

# Install VPI
RUN --mount=type=cache,target=/var/cache/apt \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    # This is a temporary workaround required to install pva-allow-2 in docker which will not be necessary next release
    apt-get install pva-allow-2 || true ; \
    rm /var/lib/dpkg/info/pva-allow-2.post* ; \
    dpkg --configure pva-allow-2 ; \
    mkdir -p /etc/pva/allow.d && mkdir -p /tmp/vpi_dev \
    && cd /tmp/vpi_dev \
    && wget https://repo.download.nvidia.com/jetson/common/pool/main/v/vpi3-dev/vpi3-dev_3.2.4_arm64.deb \
    && wget https://repo.download.nvidia.com/jetson/common/pool/main/libn/libnvvpi3/libnvvpi3_3.2.4_arm64.deb \
    && dpkg -i libnvvpi3_3.2.4_arm64.deb \
    && dpkg -i vpi3-dev_3.2.4_arm64.deb \
    && cd /tmp && rm -Rf /tmp/vpi_dev ; \
    fi ; \
    apt-get update && apt-get install -y \
    libnvvpi3 \
    vpi3-dev

# Install cuDSS
RUN --mount=type=cache,target=/var/cache/apt \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    wget https://developer.download.nvidia.com/compute/cudss/redist/libcudss/linux-aarch64/libcudss-linux-aarch64-0.3.0.9_cuda12-archive.tar.xz && \
    tar -xvf libcudss-linux-aarch64-0.3.0.9_cuda12-archive.tar.xz -C /usr/local && \
    rm libcudss-linux-aarch64-0.3.0.9_cuda12-archive.tar.xz && \
    cp -r /usr/local/libcudss-linux-aarch64-0.3.0.9_cuda12-archive /usr/local/libcudss-linux-0.3.0.9_cuda12-archive ; \
    elif [[ ${PLATFORM} == 'amd64' ]]; then \
    wget https://developer.download.nvidia.com/compute/cudss/redist/libcudss/linux-x86_64/libcudss-linux-x86_64-0.3.0.9_cuda12-archive.tar.xz && \
    tar -xvf libcudss-linux-x86_64-0.3.0.9_cuda12-archive.tar.xz -C /usr/local && \
    rm libcudss-linux-x86_64-0.3.0.9_cuda12-archive.tar.xz && \
    cp -r /usr/local/libcudss-linux-x86_64-0.3.0.9_cuda12-archive /usr/local/libcudss-linux-0.3.0.9_cuda12-archive ; \
    else \
    echo "Unrecognized platform: ${PLATFORM}" && exit 1 ; \
    fi

# Based on cuDSS version (0.3.0.9) and architecture which is not expected to change frequently
ENV CUDSS_DIR=/usr/local/libcudss-linux-0.3.0.9_cuda12-archive
ENV CMAKE_PREFIX_PATH=$CUDSS_DIR:$CMAKE_PREFIX_PATH
ENV LD_LIBRARY_PATH=$CUDSS_DIR/lib:$LD_LIBRARY_PATH

# Install CV-CUDA
RUN --mount=type=cache,target=/var/cache/apt \
    cd /tmp ; \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    wget https://github.com/CVCUDA/CV-CUDA/releases/download/v0.5.0-beta/nvcv-lib-0.5.0_beta_DP-cuda12-aarch64-linux.deb && \
    dpkg -i nvcv-lib-0.5.0_beta_DP-cuda12-aarch64-linux.deb && \
    wget https://github.com/CVCUDA/CV-CUDA/releases/download/v0.5.0-beta/nvcv-dev-0.5.0_beta_DP-cuda12-aarch64-linux.deb && \
    dpkg -i nvcv-dev-0.5.0_beta_DP-cuda12-aarch64-linux.deb ; \
    elif [[ ${PLATFORM} == 'amd64' ]]; then \
    wget https://github.com/CVCUDA/CV-CUDA/releases/download/v0.5.0-beta/nvcv-lib-0.5.0_beta-cuda12-x86_64-linux.deb && \
    dpkg -i nvcv-lib-0.5.0_beta-cuda12-x86_64-linux.deb && \
    wget https://github.com/CVCUDA/CV-CUDA/releases/download/v0.5.0-beta/nvcv-dev-0.5.0_beta-cuda12-x86_64-linux.deb && \
    dpkg -i nvcv-dev-0.5.0_beta-cuda12-x86_64-linux.deb ; \
    else \
    echo "Unrecognized platform: ${PLATFORM}" && exit 1 ; \
    fi

# --------------------------------------------------------------------------------------------------

FROM common AS extended-arm64

# Update environment
RUN update-alternatives --install /usr/bin/llvm-config llvm-config /usr/bin/llvm-config-14 14
ENV LD_LIBRARY_PATH="/opt/nvidia/vpi3/lib64:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="/usr/lib/aarch64-linux-gnu/tegra:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="/usr/local/cuda-12.6/targets/aarch64-linux/lib:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="/usr/lib/aarch64-linux-gnu/tegra-egl:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="/usr/lib/aarch64-linux-gnu/tegra/weston:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="${LD_LIBRARY_PATH}:/usr/lib/aarch64-linux-gnu-host"
ENV PATH="/usr/local/nvidia/bin:/usr/local/cuda/bin:/usr/src/tensorrt/bin:${PATH}"

# Install CUDA packages
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y --no-install-recommends --force-yes \
    cuda-cudart-12-6 \
    cuda-libraries-12-6 \
    cuda-nvml-dev-12-6 \
    cuda-sanitizer-12-6 \
    cuda-toolkit-12-6 \
    libcublas-12-6 \
    libcudnn9 \
    libcusparse-12-6 \
    libnpp-12-6

# Install TensorRT
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    libnvinfer10 \
    libnvinfer-plugin10 \
    libnvonnxparsers10 \
    libnvinfer-dispatch10 \
    libnvinfer-bin \
    tensorrt

ENV TRT_LIB_PATH="/usr/lib/aarch64-linux-gnu"
ENV TRT_INCLUDE_PATH="/usr/include/aarch64-linux-gnu"

# Install pva-allow-2 as a workaround
RUN --mount=type=cache,target=/var/cache/apt \
    mkdir -p /tmp/pva && cd /tmp/pva \
    && wget https://repo.download.nvidia.com/jetson/common/pool/main/p/pva-allow-2/pva-allow-2_2.0.0~rc3_all.deb \
    && dpkg -i pva-allow-2_2.0.0~rc3_all.deb || true \
    && rm /var/lib/dpkg/info/pva-allow-2.post* \
    && dpkg --configure pva-allow-2 \
    && cd /tmp && rm -Rf /tmp/pva


# PyTorch (NV CUDA edition)
# https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html
RUN python3 -m pip install --no-cache \
    https://developer.download.nvidia.cn/compute/redist/jp/v61/pytorch/torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y --no-install-recommends \
    libb64-0d \
    libre2-9 \
    rapidjson-dev \
    libopenblas-dev \
    libarchive-dev \
    libcusparselt0 \
    libcusparselt-dev

# Install Triton server from https://github.com/triton-inference-server/server/releases/tag/v2.49.0
RUN  --mount=type=cache,target=/var/cache/apt \
    cd /opt \
    && wget https://github.com/triton-inference-server/server/releases/download/v2.49.0/tritonserver2.49.0-igpu.tar.gz \
    && tar -xzvf tritonserver2.49.0-igpu.tar.gz \
    && chmod 644 /opt/tritonserver/backends/tensorflow/libtensorflow_cc.so.2 \
    && chmod 644 /opt/tritonserver/backends/tensorflow/libtensorflow_framework.so.2 \
    && rm tritonserver2.49.0-igpu.tar.gz

# Remove security vulnerability in Java examples
RUN rm -rf /opt/tritonserver/clients/java/examples

ENV LD_LIBRARY_PATH="${LD_LIBRARY_PATH}:/opt/tritonserver/lib"

# Install boost version >= 1.78 for boost::span
# Current libboost-dev apt packages are < 1.78, so install from tar.gz
RUN --mount=type=cache,target=/var/cache/apt \
    wget -O /tmp/boost.tar.gz \
    https://archives.boost.io/release/1.80.0/source/boost_1_80_0.tar.gz \
    && (cd /tmp && tar xzf boost.tar.gz) \
    && cd /tmp/boost_1_80_0 \
    && ./bootstrap.sh --prefix=/usr \
    && ./b2 install \
    && rm -rf /tmp/boost*


# Install jtop
RUN python3 -m pip install -U \
    jetson-stats

# Compile ffmpeg without gpl and nonfree
RUN apt-get install yasm && wget https://ffmpeg.org/releases/ffmpeg-4.4.2.tar.bz2 && tar xjvf ffmpeg-4.4.2.tar.bz2 && cd ffmpeg-4.4.2 && \
    ./configure --prefix=/usr --toolchain=hardened --enable-shared \
    --libdir=/usr/lib/aarch64-linux-gnu --incdir=/usr/include/aarch64-linux-gnu --arch=arm64 \
    --disable-stripping && make -j 4 && make install

# --------------------------------------------------------------------------------------------------

FROM common AS extended-amd64

# Update environment
ENV TRT_LIB_PATH="/usr/lib/x86_64-linux-gnu"
ENV TRT_INC_PATH="/usr/include/x86_64-linux-gnu"


# Install nvv4l2 for GXF Multimedia h264 codec
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    nvv4l2 \
    && ln -s /usr/lib/x86_64-linux-gnu/libnvcuvid.so.1 /usr/lib/x86_64-linux-gnu/libnvcuvid.so \
    && ln -s /usr/lib/x86_64-linux-gnu/libnvidia-encode.so.1 /usr/lib/x86_64-linux-gnu/libnvidia-encode.so

# Pytorch
RUN python3 -m pip install -U --extra-index-url https://download.pytorch.org/whl/cu121 \
    torch \
    torchvision \
    torchaudio

# Update environment
ENV LD_LIBRARY_PATH="${LD_LIBRARY_PATH}:/opt/tritonserver/lib"

# Compile a ffmpeg without gpl and nonfree
RUN apt-get install -y yasm && wget https://ffmpeg.org/releases/ffmpeg-4.4.2.tar.bz2 && tar xjvf ffmpeg-4.4.2.tar.bz2 && cd ffmpeg-4.4.2 && \
    ./configure --prefix=/usr --toolchain=hardened --enable-shared \
    --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --arch=amd64 \
    --disable-stripping && make -j 4 && make install

# --------------------------------------------------------------------------------------------------

FROM extended-${PLATFORM} AS base

# Install Ceres
RUN git clone https://github.com/ceres-solver/ceres-solver.git && \
    cd ceres-solver && \
    git checkout 6fb3dae4eeef855568e47ebbb29a8ba4f3c9153f && \
    mkdir build && \
    cd build && \
    cmake .. -DBUILD_TESTING=OFF -DBUILD_EXAMPLES=OFF -DBUILD_BENCHMARKS=OFF -DUSE_CUDA=ON -Dcudss_DIR=$CUDSS_DIR && \
    make -j 4 && \
    make install && \
    sed -i 's/find_dependency(cudss 0.3.0)/find_dependency(cudss)/' /usr/local/lib/cmake/Ceres/CeresConfig.cmake

# Install Protobuf
# v5.26.0 is same tag as v26.0
RUN git clone https://github.com/protocolbuffers/protobuf.git -b v5.26.0 && \
    cd protobuf && \
    git submodule update --init --recursive && \
    mkdir build && \
    cd build && \
    cmake .. \
    -Dprotobuf_BUILD_TESTS=OFF \
    -Dprotobuf_MSVC_STATIC_RUNTIME=OFF \
    -DABSL_PROPAGATE_CXX_STD=ON \
    -Dprotobuf_BUILD_SHARED_LIBS=ON \
    -DCMAKE_POSITION_INDEPENDENT_CODE=ON && \
    cmake --build . --config Release && \
    make install

# Specify non-root admin user for container
ARG USERNAME=admin
ENV USERNAME=${USERNAME}

# Install prerequisites
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    gosu \
    sudo \
    udev

# Copy scripts
RUN mkdir -p /usr/local/bin/scripts
COPY scripts/*entrypoint.sh /usr/local/bin/scripts/
RUN chmod +x /usr/local/bin/scripts/*.sh || true

# Copy script additions
RUN mkdir -p /usr/local/bin/scripts/entrypoint_additions
COPY scripts/entrypoint_addition[s]/*.sh /usr/local/bin/scripts/entrypoint_additions/
RUN chmod +x /usr/local/bin/scripts/entrypoint_additions/*.sh || true

# Copy middleware profiles
RUN mkdir -p /usr/local/share/middleware_profiles
COPY middleware_profile[s]/*profile.xml /usr/local/share/middleware_profiles/

# Store list of packages (must be last)
RUN mkdir -p /opt/nvidia/isaac_ros_dev_base && dpkg-query -W | sort > /opt/nvidia/isaac_ros_dev_base/base-end-packages.csv

# Install yq
RUN wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/local/bin/yq \
&& chmod +x /usr/local/bin/yq
```

修改setuptools和buildtools为如下：

```dockerfile
RUN python3 -m pip install -U --force-reinstall \
    pip==24.0 \
    setuptools==67.8.0 \
    wheel==0.43.0 \
    packaging==23.2


# Python3 PIP buildtools(指定scikit版本)
RUN python3 -m pip install -U \
    "scikit-build-core==0.7.0" \
    Cython \
    ninja \
    wheel
```

修改后的完整dockerfile如下：

```bash
# Copyright (c) 2024, NVIDIA CORPORATION.  All rights reserved.
#
# NVIDIA CORPORATION and its licensors retain all intellectual property
# and proprietary rights in and to this software, related documentation
# and any modifications thereto.  Any use, reproduction, disclosure or
# distribution of this software and related documentation without an express
# license agreement from NVIDIA CORPORATION is strictly prohibited.
#

ARG PLATFORM=amd64
ARG BASE_IMAGE=nvidia/cuda:12.6.1-devel-ubuntu22.04

# --------------------------------------------------------------------------------------------------
# https://docs.nvidia.com/deeplearning/frameworks/user-guide/index.html
# https://docs.nvidia.com/deeplearning/frameworks/support-matrix/index.html
FROM nvcr.io/nvidia/tritonserver:24.08-py3 AS base-amd64

FROM nvcr.io/nvidia/12.6.11-devel:12.6.11-devel-aarch64-ubuntu22.04 AS base-arm64
# --------------------------------------------------------------------------------------------------

FROM base-${PLATFORM} AS common
ARG PLATFORM

# Store list of packages (must be first)
RUN mkdir -p /opt/nvidia/isaac_ros_dev_base && dpkg-query -W | sort > /opt/nvidia/isaac_ros_dev_base/base-start-packages.csv

# disable terminal interaction for apt
ENV DEBIAN_FRONTEND=noninteractive
ENV SHELL=/bin/bash
SHELL ["/bin/bash", "-c"]

# Ensure we have universe
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    software-properties-common \
    && add-apt-repository universe \
    && apt-get update

# Fundamentals
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    apt-transport-https \
    apt-utils \
    bash-completion \
    build-essential \
    ca-certificates \
    clang-format \
    cmake \
    curl \
    git \
    git-lfs \
    gnupg2 \
    iputils-ping \
    libgoogle-glog-dev \
    locales \
    lsb-release \
    mlocate \
    rsync \
    tar \
    unzip \
    vim \
    wget \
    zlib1g-dev

# Python basics
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    python3-dev \
    python3-distutils \
    python3-flake8 \
    python3-pip \
    python3-pybind11 \
    python3-pytest \
    python3-pytest-repeat \
    python3-pytest-rerunfailures \
    python3-pytest-cov \
    python3-venv \
    python3-zmq \
    python3.10 \
    python3.10-venv

# Set Python3 as default
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1

# Add Isaac apt repository
RUN --mount=type=cache,target=/var/cache/apt \
    wget -qO - https://isaac.download.nvidia.com/isaac-ros/repos.key | apt-key add - && \
    grep -qxF "deb https://isaac.download.nvidia.com/isaac-ros/release-3 $(lsb_release -cs) release-3.0" /etc/apt/sources.list || \
    echo "deb https://isaac.download.nvidia.com/isaac-ros/release-3 $(lsb_release -cs) release-3.0" | tee -a /etc/apt/sources.list \
    && apt-get update

# Core dev libraries
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    gfortran \
    graphicsmagick-libmagick-dev-compat \
    jq \
    kmod \
    lcov \
    libasio-dev \
    libassimp-dev \
    libatlas3-base \
    libatlas-base-dev \
    libblas3 \
    libboost-all-dev \
    libboost-dev \
    libbullet-dev \
    libceres-dev \
    libcunit1-dev \
    libffi7 \
    libfreetype6 \
    libgraphicsmagick++1-dev \
    libhidapi-libusb0 \
    libinput10 \
    libjpeg8 \
    liblapack3 \
    libmnl0 \
    libmnl-dev \
    libncurses5-dev \
    libode-dev \
    libopenblas0 \
    libopencv-dev=4.5.4+dfsg-9ubuntu4 \
    libopenmpi3 \
    libpcap-dev \
    libpcl-dev \
    libpython3.10 \
    libsuitesparse-dev \
    libtinyxml2-dev \
    libturbojpeg \
    libunwind8 \
    libv4l-0 \
    libv4l-dev \
    libx264-dev \
    libxaw7-dev \
    libyaml-cpp-dev \
    linuxptp \
    llvm-14 \
    nlohmann-json3-dev \
    patchelf \
    python3-opencv=4.5.4+dfsg-9ubuntu4 \
    python3-scipy

RUN python3 -m pip install -U --force-reinstall \
    pip==24.0 \
    setuptools==67.8.0 \
    wheel==0.43.0 \
    packaging==23.2

# Python3 PIP buildtools
RUN python3 -m pip install -U \
    "scikit-build-core==0.7.0" \
    Cython \
    ninja \
    wheel

# Python3 PIP packages
RUN python3 -m pip install -U \
    argcomplete \
    autopep8 \
    flake8 \
    flake8-blind-except \
    flake8-builtins \
    flake8-class-newline \
    flake8-comprehensions \
    flake8-deprecated \
    flake8-docstrings \
    flake8-import-order \
    flake8-quotes \
    gpustat==0.6.0 \
    importlib_resources \
    networkx \
    "numpy>=1.24.4,<2" \
    numpy-quaternion \
    onnx \
    pydocstyle \
    pymongo \
    pyyaml \
    "scipy>=1.7.0" \
    scikit-image \
    scikit-learn \
    "setuptools_scm>=6.2" \
    tqdm \
    trimesh \
    "warp-lang>=0.9.0" \
    "yourdfpy>=0.0.53" \
    opentelemetry-api==1.28.1 \
    opentelemetry-sdk==1.28.1 \
    opentelemetry-exporter-otlp

# Add MQTT binaries and libraries
RUN --mount=type=cache,target=/var/cache/apt \
    apt-add-repository ppa:mosquitto-dev/mosquitto-ppa \
    && apt-get update && apt-get install -y \
    mosquitto \
    mosquitto-clients

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn && \
    corepack enable

# Install CuPy and HDBSCAN
RUN python3 -m pip install -U \
    cupy-cuda12x \
    hdbscan

# Setup Jetson debian repositories
RUN --mount=type=cache,target=/var/cache/apt \
    apt-key adv --fetch-key https://repo.download.nvidia.com/jetson/jetson-ota-public.asc ; \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    echo 'deb https://repo.download.nvidia.com/jetson/common r36.4 main' > /etc/apt/sources.list.d/nvidia-l4t-apt-source.list \
    && echo 'deb https://repo.download.nvidia.com/jetson/t234 r36.4 main' >> /etc/apt/sources.list.d/nvidia-l4t-apt-source.list ; \
    elif [[ ${PLATFORM} == 'amd64' ]]; then \
    add-apt-repository "deb http://repo.download.nvidia.com/jetson/x86_64/$(lsb_release -cs) r36.4 main" ; \
    else \
    echo "Unrecognized platform: ${PLATFORM}" && exit 1 ; \
    fi ; \
    apt-get update

# Setup CUDA repositories
RUN --mount=type=cache,target=/var/cache/apt \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/arm64/cuda-keyring_1.1-1_all.deb ; \
    elif [[ ${PLATFORM} == 'amd64' ]]; then \
    wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb ; \
    else \
    echo "Unrecognized platform: ${PLATFORM}" && exit 1 ; \
    fi ; \
    dpkg -i cuda-keyring_1.1-1_all.deb && rm -Rf cuda-keyring_1.1-1_all.deb ; \
    apt-get update

# Install VPI
RUN --mount=type=cache,target=/var/cache/apt \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    # This is a temporary workaround required to install pva-allow-2 in docker which will not be necessary next release
    apt-get install pva-allow-2 || true ; \
    rm /var/lib/dpkg/info/pva-allow-2.post* ; \
    dpkg --configure pva-allow-2 ; \
    mkdir -p /etc/pva/allow.d && mkdir -p /tmp/vpi_dev \
    && cd /tmp/vpi_dev \
    && wget https://repo.download.nvidia.com/jetson/common/pool/main/v/vpi3-dev/vpi3-dev_3.2.4_arm64.deb \
    && wget https://repo.download.nvidia.com/jetson/common/pool/main/libn/libnvvpi3/libnvvpi3_3.2.4_arm64.deb \
    && dpkg -i libnvvpi3_3.2.4_arm64.deb \
    && dpkg -i vpi3-dev_3.2.4_arm64.deb \
    && cd /tmp && rm -Rf /tmp/vpi_dev ; \
    fi ; \
    apt-get update && apt-get install -y \
    libnvvpi3 \
    vpi3-dev

# Install cuDSS
RUN --mount=type=cache,target=/var/cache/apt \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    wget https://developer.download.nvidia.com/compute/cudss/redist/libcudss/linux-aarch64/libcudss-linux-aarch64-0.3.0.9_cuda12-archive.tar.xz && \
    tar -xvf libcudss-linux-aarch64-0.3.0.9_cuda12-archive.tar.xz -C /usr/local && \
    rm libcudss-linux-aarch64-0.3.0.9_cuda12-archive.tar.xz && \
    cp -r /usr/local/libcudss-linux-aarch64-0.3.0.9_cuda12-archive /usr/local/libcudss-linux-0.3.0.9_cuda12-archive ; \
    elif [[ ${PLATFORM} == 'amd64' ]]; then \
    wget https://developer.download.nvidia.com/compute/cudss/redist/libcudss/linux-x86_64/libcudss-linux-x86_64-0.3.0.9_cuda12-archive.tar.xz && \
    tar -xvf libcudss-linux-x86_64-0.3.0.9_cuda12-archive.tar.xz -C /usr/local && \
    rm libcudss-linux-x86_64-0.3.0.9_cuda12-archive.tar.xz && \
    cp -r /usr/local/libcudss-linux-x86_64-0.3.0.9_cuda12-archive /usr/local/libcudss-linux-0.3.0.9_cuda12-archive ; \
    else \
    echo "Unrecognized platform: ${PLATFORM}" && exit 1 ; \
    fi

# Based on cuDSS version (0.3.0.9) and architecture which is not expected to change frequently
ENV CUDSS_DIR=/usr/local/libcudss-linux-0.3.0.9_cuda12-archive
ENV CMAKE_PREFIX_PATH=$CUDSS_DIR:$CMAKE_PREFIX_PATH
ENV LD_LIBRARY_PATH=$CUDSS_DIR/lib:$LD_LIBRARY_PATH

# Install CV-CUDA
RUN --mount=type=cache,target=/var/cache/apt \
    cd /tmp ; \
    if [[ ${PLATFORM} == 'arm64' ]]; then \
    wget https://github.com/CVCUDA/CV-CUDA/releases/download/v0.5.0-beta/nvcv-lib-0.5.0_beta_DP-cuda12-aarch64-linux.deb && \
    dpkg -i nvcv-lib-0.5.0_beta_DP-cuda12-aarch64-linux.deb && \
    wget https://github.com/CVCUDA/CV-CUDA/releases/download/v0.5.0-beta/nvcv-dev-0.5.0_beta_DP-cuda12-aarch64-linux.deb && \
    dpkg -i nvcv-dev-0.5.0_beta_DP-cuda12-aarch64-linux.deb ; \
    elif [[ ${PLATFORM} == 'amd64' ]]; then \
    wget https://github.com/CVCUDA/CV-CUDA/releases/download/v0.5.0-beta/nvcv-lib-0.5.0_beta-cuda12-x86_64-linux.deb && \
    dpkg -i nvcv-lib-0.5.0_beta-cuda12-x86_64-linux.deb && \
    wget https://github.com/CVCUDA/CV-CUDA/releases/download/v0.5.0-beta/nvcv-dev-0.5.0_beta-cuda12-x86_64-linux.deb && \
    dpkg -i nvcv-dev-0.5.0_beta-cuda12-x86_64-linux.deb ; \
    else \
    echo "Unrecognized platform: ${PLATFORM}" && exit 1 ; \
    fi

# --------------------------------------------------------------------------------------------------

FROM common AS extended-arm64

# Update environment
RUN update-alternatives --install /usr/bin/llvm-config llvm-config /usr/bin/llvm-config-14 14
ENV LD_LIBRARY_PATH="/opt/nvidia/vpi3/lib64:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="/usr/lib/aarch64-linux-gnu/tegra:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="/usr/local/cuda-12.6/targets/aarch64-linux/lib:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="/usr/lib/aarch64-linux-gnu/tegra-egl:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="/usr/lib/aarch64-linux-gnu/tegra/weston:${LD_LIBRARY_PATH}"
ENV LD_LIBRARY_PATH="${LD_LIBRARY_PATH}:/usr/lib/aarch64-linux-gnu-host"
ENV PATH="/usr/local/nvidia/bin:/usr/local/cuda/bin:/usr/src/tensorrt/bin:${PATH}"

# Install CUDA packages
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y --no-install-recommends --force-yes \
    cuda-cudart-12-6 \
    cuda-libraries-12-6 \
    cuda-nvml-dev-12-6 \
    cuda-sanitizer-12-6 \
    cuda-toolkit-12-6 \
    libcublas-12-6 \
    libcudnn9 \
    libcusparse-12-6 \
    libnpp-12-6

# Install TensorRT
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    libnvinfer10 \
    libnvinfer-plugin10 \
    libnvonnxparsers10 \
    libnvinfer-dispatch10 \
    libnvinfer-bin \
    tensorrt

ENV TRT_LIB_PATH="/usr/lib/aarch64-linux-gnu"
ENV TRT_INCLUDE_PATH="/usr/include/aarch64-linux-gnu"

# Install pva-allow-2 as a workaround
RUN --mount=type=cache,target=/var/cache/apt \
    mkdir -p /tmp/pva && cd /tmp/pva \
    && wget https://repo.download.nvidia.com/jetson/common/pool/main/p/pva-allow-2/pva-allow-2_2.0.0~rc3_all.deb \
    && dpkg -i pva-allow-2_2.0.0~rc3_all.deb || true \
    && rm /var/lib/dpkg/info/pva-allow-2.post* \
    && dpkg --configure pva-allow-2 \
    && cd /tmp && rm -Rf /tmp/pva


# PyTorch (NV CUDA edition)
# https://docs.nvidia.com/deeplearning/frameworks/install-pytorch-jetson-platform/index.html
RUN python3 -m pip install --no-cache \
    https://developer.download.nvidia.cn/compute/redist/jp/v61/pytorch/torch-2.5.0a0+872d972e41.nv24.08.17622132-cp310-cp310-linux_aarch64.whl

RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y --no-install-recommends \
    libb64-0d \
    libre2-9 \
    rapidjson-dev \
    libopenblas-dev \
    libarchive-dev \
    libcusparselt0 \
    libcusparselt-dev

# Install Triton server from https://github.com/triton-inference-server/server/releases/tag/v2.49.0
RUN  --mount=type=cache,target=/var/cache/apt \
    cd /opt \
    && wget https://github.com/triton-inference-server/server/releases/download/v2.49.0/tritonserver2.49.0-igpu.tar.gz \
    && tar -xzvf tritonserver2.49.0-igpu.tar.gz \
    && chmod 644 /opt/tritonserver/backends/tensorflow/libtensorflow_cc.so.2 \
    && chmod 644 /opt/tritonserver/backends/tensorflow/libtensorflow_framework.so.2 \
    && rm tritonserver2.49.0-igpu.tar.gz

# Remove security vulnerability in Java examples
RUN rm -rf /opt/tritonserver/clients/java/examples

ENV LD_LIBRARY_PATH="${LD_LIBRARY_PATH}:/opt/tritonserver/lib"

# Install boost version >= 1.78 for boost::span
# Current libboost-dev apt packages are < 1.78, so install from tar.gz
RUN --mount=type=cache,target=/var/cache/apt \
    wget -O /tmp/boost.tar.gz \
    https://archives.boost.io/release/1.80.0/source/boost_1_80_0.tar.gz \
    && (cd /tmp && tar xzf boost.tar.gz) \
    && cd /tmp/boost_1_80_0 \
    && ./bootstrap.sh --prefix=/usr \
    && ./b2 install \
    && rm -rf /tmp/boost*


# Install jtop
RUN python3 -m pip install -U \
    jetson-stats

# Compile ffmpeg without gpl and nonfree
RUN apt-get install yasm && wget https://ffmpeg.org/releases/ffmpeg-4.4.2.tar.bz2 && tar xjvf ffmpeg-4.4.2.tar.bz2 && cd ffmpeg-4.4.2 && \
    ./configure --prefix=/usr --toolchain=hardened --enable-shared \
    --libdir=/usr/lib/aarch64-linux-gnu --incdir=/usr/include/aarch64-linux-gnu --arch=arm64 \
    --disable-stripping && make -j 4 && make install

# --------------------------------------------------------------------------------------------------

FROM common AS extended-amd64

# Update environment
ENV TRT_LIB_PATH="/usr/lib/x86_64-linux-gnu"
ENV TRT_INC_PATH="/usr/include/x86_64-linux-gnu"


# Install nvv4l2 for GXF Multimedia h264 codec
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    nvv4l2 \
    && ln -s /usr/lib/x86_64-linux-gnu/libnvcuvid.so.1 /usr/lib/x86_64-linux-gnu/libnvcuvid.so \
    && ln -s /usr/lib/x86_64-linux-gnu/libnvidia-encode.so.1 /usr/lib/x86_64-linux-gnu/libnvidia-encode.so

# Pytorch
RUN python3 -m pip install -U --extra-index-url https://download.pytorch.org/whl/cu121 \
    torch \
    torchvision \
    torchaudio

# Update environment
ENV LD_LIBRARY_PATH="${LD_LIBRARY_PATH}:/opt/tritonserver/lib"

# Compile a ffmpeg without gpl and nonfree
RUN apt-get install -y yasm && wget https://ffmpeg.org/releases/ffmpeg-4.4.2.tar.bz2 && tar xjvf ffmpeg-4.4.2.tar.bz2 && cd ffmpeg-4.4.2 && \
    ./configure --prefix=/usr --toolchain=hardened --enable-shared \
    --libdir=/usr/lib/x86_64-linux-gnu --incdir=/usr/include/x86_64-linux-gnu --arch=amd64 \
    --disable-stripping && make -j 4 && make install

# --------------------------------------------------------------------------------------------------

FROM extended-${PLATFORM} AS base

# Install Ceres
RUN git clone https://github.com/ceres-solver/ceres-solver.git && \
    cd ceres-solver && \
    git checkout 6fb3dae4eeef855568e47ebbb29a8ba4f3c9153f && \
    mkdir build && \
    cd build && \
    cmake .. -DBUILD_TESTING=OFF -DBUILD_EXAMPLES=OFF -DBUILD_BENCHMARKS=OFF -DUSE_CUDA=ON -Dcudss_DIR=$CUDSS_DIR && \
    make -j 4 && \
    make install && \
    sed -i 's/find_dependency(cudss 0.3.0)/find_dependency(cudss)/' /usr/local/lib/cmake/Ceres/CeresConfig.cmake

# Install Protobuf
# v5.26.0 is same tag as v26.0
RUN git clone https://github.com/protocolbuffers/protobuf.git -b v5.26.0 && \
    cd protobuf && \
    git submodule update --init --recursive && \
    mkdir build && \
    cd build && \
    cmake .. \
    -Dprotobuf_BUILD_TESTS=OFF \
    -Dprotobuf_MSVC_STATIC_RUNTIME=OFF \
    -DABSL_PROPAGATE_CXX_STD=ON \
    -Dprotobuf_BUILD_SHARED_LIBS=ON \
    -DCMAKE_POSITION_INDEPENDENT_CODE=ON && \
    cmake --build . --config Release && \
    make install

# Specify non-root admin user for container
ARG USERNAME=admin
ENV USERNAME=${USERNAME}

# Install prerequisites
RUN --mount=type=cache,target=/var/cache/apt \
    apt-get update && apt-get install -y \
    gosu \
    sudo \
    udev

# Copy scripts
RUN mkdir -p /usr/local/bin/scripts
COPY scripts/*entrypoint.sh /usr/local/bin/scripts/
RUN chmod +x /usr/local/bin/scripts/*.sh || true

# Copy script additions
RUN mkdir -p /usr/local/bin/scripts/entrypoint_additions
COPY scripts/entrypoint_addition[s]/*.sh /usr/local/bin/scripts/entrypoint_additions/
RUN chmod +x /usr/local/bin/scripts/entrypoint_additions/*.sh || true

# Copy middleware profiles
RUN mkdir -p /usr/local/share/middleware_profiles
COPY middleware_profile[s]/*profile.xml /usr/local/share/middleware_profiles/

# Store list of packages (must be last)
RUN mkdir -p /opt/nvidia/isaac_ros_dev_base && dpkg-query -W | sort > /opt/nvidia/isaac_ros_dev_base/base-end-packages.csv

# Install yq
RUN wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/local/bin/yq \
&& chmod +x /usr/local/bin/yq
```

注意修改后可能还会出现运行超时错误，此时再运行一遍即可！



### bug2: NVblox + RealSense: “Lookup transform failed for frame camera0\_link” & Missing Realsense Splitter Node

在`/workspaces/isaac_ros-dev/src/isaac_ros_nvblox/nvblox_ros/nvblox_core/nvblox/include/nvblox/mapper/`下面修改 `multi_mapper.h`，在`CHECK(false) << "Requested mapping type is not implemented.";`后面第89行加入`return “UnknownMappingType”;`


<img src="/assets/images/blog//2025-04-30-NVblox-Setup.assets/image-1.png" alt="img" style="zoom:50%;" />