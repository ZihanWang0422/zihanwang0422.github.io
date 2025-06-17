---
layout: home
# name: index
cover: true #!! Add this
title: "Homepage"
description: >
  Homepage of Zihan Wang
hide_description: true
hide_posts: true
no_posts: true
posts_page: /blog/
---
<!-- <script type="text/javascript">
	document.getElementsByClassName("page-title")[0].classList.add("sr-only");
</script>  -->

<!-- <style type="text/css">
	.page-title {
		position: absolute;
		width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    clip: rect(0 0 0 0);
	}
</style> -->
<style>
  h1 {
    color:rgb(1,92,171); /* 更改为你想要的颜色 */
  }
</style>
<style>
  h3 {
    font-family: sans;
    color: rgb(0, 0, 0);
    font-size: 1.2rem;
  }
  span.small-text {
    font-size: 1rem; /* 或其他你想要的大小 */
  }
</style>

<style type="text/css">
  .body-social > ul {
    display: inline-block;
    list-style-type: none;
    margin-bottom: 0;
    overflow: hidden;
    padding: 0;
  }

  .body-social > ul > li {
    float: left;

    /* padding-left: 5px; */
    padding-right: 10px;

    /* display: inline-block; */
  }

  .body-social > ul > li > a {
    display: inline;
    text-align: center;
    font-size: 0.95rem;
    font-weight: 600;
    /*width: 3rem;*/
    /*height: 4rem;*/
    padding: 4px;

    /* line-height: 3rem; */

    text-decoration: none;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    transition: background-color 250ms, color 250ms, text-decoration-color 250ms, border-color 250ms;

    /* border-bottom: none; */
  }

  .body-social > ul > li > a:not(.btn):not(.no-hover) {
    border-color: var(--accent-color);
  }

  .body-social > ul > li > a:hover {
    color: white;
    background-color: var(--accent-color);
    border-radius: 5px;
    padding: 4px;
    transition: background-color 250ms, color 250ms, text-decoration-color 250ms, border-color 250ms;
  }

  .note-sm:before, .note:before {
    font-size: 1.3rem;
    color: rgb(1,92,171);
    line-height: 0.5em;
    /* padding: 1px; */
  }
</style>

<style>
/* Summary title style */
.summary-title {
  font-family: sans;
  font-size: 1.1rem;
  color: rgb(1,92,171);
  line-height: 1.8em;
  font-weight: bold;
  margin: 0.0em 0em;
  cursor: pointer;
}

/* Collapsible content styling */
.collapsible-content {
  display: none; /* Hide by default */
  width: 85%;
  font-size: 15px;
  color: gray;
  margin-top: 0.5em;
}

/* Code paper links styling */
.h3 a {
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
}

.h3 a:not(:last-child)::after {
  content: "|";
  margin-left: 10px;
  color: rgba(0,0,0,0.3);
}

.h3 a:first-child {
  margin-left: 0;
}
</style>

<h2 class="h1" style="color: rgb(1,92,171); font-weight: bold; font-size:30px" id="biography">Biography </h2>

Welcome to my homepage! **I'm a Senior undergraduated student at [Beihang University(BUAA)](https://ev.buaa.edu.cn/)**

🤖 My research interests lie in harnessing the method of **learning** and **control** to enable robots to interact with environments and tackle tasks with robustness and adaptability. Especially, I am interested in using some generative models and sim-to-real methods to improve the performance of robot perception and decision-making.


<hr style="height:2px; background:#ccc; margin:2em 0">

<h3 class="h2" style="color: rgb(1,92,171); font-size: 25px; font-weight: bold;" id="">Education </h3>
<div>
  <!-- <div style="display: flex; align-items: center; margin:0rem 0rem 0.2rem 0rem">
      <div style="width: 15%; display: inline-block;">
          <img src="assets/images/cmu-seal-r.png" style="border-radius: 50%;">
      </div>
      <div style="padding-left: 4%; width: 83%; display: inline-block; height: 100%;">
          <span>
              <b style="font-size: 18px;">Carnegie Mellon University</b>
              <span style="font-size: 15px; float: right">Aug. 2024 - Present</span>
          </span><br>
          <span style="font-size: 15px;">Master Student</span><br>
          <span style="font-size: 15px;">Major:</span> <span style="font-size: 15px; font-weight: bold;">Robotic Systems Development</span><br>
      </div>
  </div> -->
  <!-- <br> -->

  <div style="display: flex; align-items: center; margin:0rem 0rem 0.2rem 0rem">
      <div style="width: 15%; display: inline-block;">
          <img src="assets/images/cuhk.jpg" style="border-radius: 50%;">
      </div>
      <div style="padding-left: 4%; width: 83%; display: inline-block; height: 100%;">
          <span>
              <b style="font-size: 18px;">The Chinese University of Hong Kong</b>
              <span style="font-size: 15px; float: right">Sep. 2025 - Dec. 2026</span>
          </span><br>
          <span style="font-size: 15px;">Master Student</span><br>
          <span style="font-size: 15px;">Major:</span> <span style="font-size: 15px; font-weight: bold;">Robotics</span><br>
      </div>
  </div>
  
  <br>

  <div style="display: flex; align-items: center; margin:0rem 0rem 0.2rem 0rem">
      <div style="width: 15%; display: inline-block;">
          <img src="assets/images/buaa.jpg" style="border-radius: 50%;">
      </div>
      <div style="padding-left: 4%; width: 83%; display: inline-block; height: 100%;">
          <span>
              <b style="font-size: 18px;">Beihang University</b>
              <span style="font-size: 15px; float: right">Sep. 2021 - Jun. 2025</span>
          </span><br>
          <span style="font-size: 15px;">Undergraduate Student</span><br>
          <span style="font-size: 15px;">Major:</span> <span style="font-size: 15px; font-weight: bold;">Automation</span><br>
      </div>
  </div>

<hr style="height:2px; background:#ccc; margin:2em 0">

<h3 class="h2" style="color: rgb(1,92,171); font-size: 25px; font-weight: bold;" id="">Experience </h3>
<div>
    <div style="display: flex; align-items: center;">
        <div style="width: 15%; display: inline-block;">
            <img src="assets/images/THU.jpg" style="border-square: 50%;" width="100%">
        </div>
        <div style="padding-left: 4%; width: 83%; display: inline-block;">
            <span>
                <b style="font-size: 18px;">Research Intern</b>
                <span style="font-size: 15px; float: right">Mar. 2025 - Jul. 2025</span>
            </span><br>
            <span style="font-size: 15px;"><a href="https://brain.tsinghua.edu.cn/en/index.htm" target="_blank">Tsinghua Laboratory of Brain and Intelligence</a></span><br>
            <span style="font-size: 15px;">Advisor: <a href="https://brain.tsinghua.edu.cn/en/info/1010/1010.htm" target="_blank">Prof. Jia Liu </a></span><br>
           <span style="font-size: 15px;">Topic: VLA Navigation Car</span><br>
        </div>
    </div>
    <br>
    <div style="display: flex; align-items: center;">
        <div style="width: 15%; display: inline-block;">
            <img src="assets/images/nus.jpg" style="border-square: 50%;">
        </div>
        <div style="padding-left: 4%; width: 83%; display: inline-block;">
            <span>
                <b style="font-size: 18px;">Research Intern (Remote)</b>
                <span style="font-size: 15px; float: right">Jul. 2023 - Dec. 2023</span>
            </span><br>
            <span style="font-size: 15px;"><a href="https://cde.nus.edu.sg/me/" target="_blank">Department of Mechanical Engineering at NUS</a></span><br>
            <span style="font-size: 15px;">Advisor: <a href="https://ieeexplore.ieee.org/author/37089168198" target="_blank">PhD. Wenshuo Wang</a></span><br>
            <span style="font-size: 15px;">Topic: <a target="_blank">6-Dof Grasp based on VLA model</a></span><br>
        </div>
    </div>
    <br>
</div>

<!-- Research -->
<hr style="height:2px; background:#ccc; margin:2em 0">

<h2 class="h1" style="color: rgb(1,92,171); font-weight: bold; font-size:30px" id="research">Research </h2>

<style>
  /* 论文条目布局 */
  .pub-item {
    display: flex;
    gap: 25px;
    align-items: flex-start;
    margin: 2em 0;
    padding: 15px;
    border-radius: 8px;
    transition: background 0.3s ease;
  }

  .pub-item:hover {
    background: rgba(1, 92, 171, 0.03);
  }

  /* 图片容器（始终左侧） */
  .pub-image {
    flex: 0 0 220px;
    min-width: 220px;
    border: 1px solid rgba(1,92,171,0.1);
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .pub-image img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .pub-image:hover img {
    transform: scale(1.05);
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .pub-item {
      flex-direction: column;
    }
    .pub-image {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
    }
  }

  /* 文本内容样式 */
  .pub-title {
    font-family: sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #222;
    margin-bottom: 8px;
  }

  .pub-authors {
    font-size: 0.95rem;
    color: #444;
    line-height: 1.4;
  }

  .pub-venue {
    font-size: 0.9rem;
    color: rgb(1,92,171);
    font-weight: 500;
    margin: 8px 0;
  }

  .pub-links a {
    color: rgb(1,92,171);
    text-decoration: none;
    margin-right: -0.2em;
    padding-left: 0;
    border: none;
    display: inline-block;
  }

  .pub-links a:hover {
    text-decoration: underline;
  }

  .pub-links a:not(:last-child)::after {
    content: "|";
    margin: 0;
    color: rgba(0,0,0,0.3);
  }
</style>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const pubItems = Array.from(document.querySelectorAll('.pub-item'));

  // 初始化年份数据
  pubItems.forEach(item => {
    const venue = item.querySelector('.pub-venue').textContent;
    const yearMatch = venue.match(/(20\d{2})/);
    item.dataset.year = yearMatch ? yearMatch[0] : '2023';
  });

  // 按年份降序排序
  pubItems.sort((a, b) => parseInt(b.dataset.year) - parseInt(a.dataset.year));

  // 应用排序
  const researchContent = document.querySelector('.research-content');
  researchContent.replaceChildren(...pubItems);
});
</script>

<!-- 研究内容 -->
<div class="research-content">
  <!-- 论文条目1 -->
  <div class="pub-item">
    <div class="pub-image">
        <img src="assets/research/aircraft.jpg" alt="等离子飞行器">
    </div>
    <div class="pub-content">
      <div class="pub-title">Plasma-propelled ultra-quiet flying robot system and power combination control method</div>
      <div class="pub-authors">Yixing Zhang, Zihan Wang et al.</div>
      <div class="pub-venue"></div>
      <div class="pub-links">         
      <a href="https://patents.google.com/patent/CN118220461A/en?oq=+CN118220461A">[Patent]</a>
        <a href="https://github.com/ZihanWang0422/Plasma-propelled-ultra-quiet-flying-robot">[Demo]</a>
      </div>
    </div>
  </div>

  <!-- 论文条目2
  <div class="pub-item">
    <div class="pub-image">
      <a href="#" target="_blank">
        <img src="assets/research/hyper_dt.jpg" alt="超决策变换器架构">
      </a>
    </div>
    <div class="pub-content">
      <div class="pub-title">Hyper-Decision Transformer for Efficient Online Policy Adaptation</div>
      <div class="pub-authors">Mengdi Xu, Yuchen Lu, Yikang Shen, Shun Zhang, Ding Zhao, Chuang Gan</div>
      <div class="pub-venue">ICLR 2023</div>
      <div class="pub-links">
        <a href="#">[PDF]</a>
        <a href="#">[Video]</a>
      </div>
    </div>
  </div> -->



<!-- Projects -->
<hr style="height:2px; background:#ccc; margin:2em 0">

<h2 class="h1" style="color: rgb(1,92,171); font-weight: bold; font-size:30px" id="projects">Projects </h2>

<style>
.stretch-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5em;
}

.stretch-table td {
  vertical-align: top;
  padding: 10px;
}

.project-title {
  font-family: 'Helvetica Neue Thin';
  font-size: 1.15rem;
  line-height: 1.3;
  font-weight: bold;
  margin-bottom: 8px;
}

.project-links {
  margin: 12px 0;
}

/* Project links */
.project-links a {
  color: rgb(1,92,171);
  text-decoration: none;
  margin-right: 0;
}

.project-links a {
  color: rgb(1,92,171);
  text-decoration: none;
  margin-right: -0.2em;
  padding-left: 0;
  border: none;
  display: inline-block;
  }

.project-links a:hover {
  text-decoration: underline;
  }

.project-description {
  color: gray;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>

<style>
@media (max-width: 768px) {
  .stretch-table td {
    display: block;
    width: 100%;
  }

  .stretch-table td:first-child {
    padding-bottom: 0;
  }

  .stretch-table img {
    max-width: 100%;
    margin: 0 auto;
    display: block;
  }
}
</style>

<table class="stretch-table" style="margin: -0.2em 0em 0.5em -0.5em; width: 100%">
  <tbody>
      <tr>
        <td style="width: 30%; vertical-align: top; padding-right: 20px;">
          <img src="assets/competition/legged-wheel.jpg"
              style="width: 100%; max-width: 280px; height: auto; object-fit: contain"/>
        </td>
        <td style="vertical-align: top;">
          <div style="padding-left: 15px;">
            <div style="margin-bottom: 8px;">
              <span style="font-family: 'Helvetica Neue Thin'; font-size: 1.15rem; line-height: 1.3; font-weight: bold;">
                Wheel-legged Robot
              </span>
              <div style="margin-top: 4px;">
                <span class="icon-star-full" aria-hidden="true"></span>
                <span style="font-family: 'Comic Sans MS'; color: #6495ED; font-weight:bold; font-size:1.0rem">
                  LQR Control
                </span>
              </div>
            </div>
            <!-- 修改后的链接 -->
            <div class="project-links">
              <a href="https://github.com/ZihanWang0422/wheel-legged-master">[Code]</a>
            </div>
            <div style="color: gray; font-size: 0.9rem; line-height: 1.5;">
                Developed a wheel-legged robot control system utilizing STM32H7 microcontroller with integrated PID and LQR algorithms for precise motion control and attitude stabilization across complex terrain.
            </div>
          </div>
        </td>
      </tr>
  </tbody>
</table>

<table class="stretch-table" style="margin: -0.2em 0em 0.5em -0.5em; width: 100%">
  <tbody>
      <tr>
        <td style="width: 30%; vertical-align: top; padding-right: 20px;">
          <img src="assets/competition/vla_car.jpg"
              style="width: 100%; max-width: 280px; height: auto; object-fit: contain"/>
        </td>
        <td style="vertical-align: top;">
          <div style="padding-left: 15px;">
            <div style="margin-bottom: 8px;">
              <span style="font-family: 'Helvetica Neue Thin'; font-size: 1.15rem; line-height: 1.3; font-weight: bold;">
                VLA Navigation Car
              </span>
              <div style="margin-top: 4px;">
                <span class="icon-star-full" aria-hidden="true"></span>
                <span style="font-family: 'Comic Sans MS'; color: #6495ED; font-weight:bold; font-size:1.0rem">
                  ESDF Mapping ＆ Navigantion
                </span>
              </div>
            </div>
            <!-- 修改后的链接 -->
            <div class="project-links">
              <a href="https://github.com/EmbodiedLLM/roadRunner">[Code]</a>
            </div>
            <div style="color: gray; font-size: 0.9rem; line-height: 1.5;">
                Implemented 2D SLAM with Cartographer, enabling high-accuracy localization and mapping for improved Nav2 autonomous navigation capabilities on NVIDIA Jetson®.
                Leveraged ESDF (Euclidean Signed Distance Field) mapping for 3D SLAM, achieving precise environmental reconstruction and optimized path planning.
            </div>
          </div>
        </td>
      </tr>
  </tbody>
</table>

<table class="stretch-table" style="margin: -0.2em 0em 0.5em -0.5em; width: 100%">
  <tbody>
      <tr>
        <td style="width: 30%; vertical-align: top; padding-right: 20px;">
          <img src="assets/competition/yuyuan.jpg"
              style="width: 100%; max-width: 280px; height: auto; object-fit: contain"/>
        </td>
        <td style="vertical-align: top;">
          <div style="padding-left: 15px;">
            <div style="margin-bottom: 8px;">
              <span style="font-family: 'Helvetica Neue Thin'; font-size: 1.15rem; line-height: 1.3; font-weight: bold;">
                Auto-tracking Car
              </span>
              <div style="margin-top: 4px;">
                <span class="icon-star-full" aria-hidden="true"></span>
                <span style="font-family: 'Comic Sans MS'; color: #6495ED; font-weight:bold; font-size:1.0rem">
                  A* Search Algorithm
                </span>
              </div>
            </div>
            <!-- 修改后的链接 -->
            <div class="project-links">
              <a href="https://github.com/ZihanWang0422/Treasure_Hunting_Car">[Code]</a>
            </div>
            <div style="color: gray; font-size: 0.9rem; line-height: 1.5;">
                I was responsible for designing an efficient motion planning algorithm using PID and A* search algorithms that enables car to avoid randomly positioned obstacles.
            </div>
          </div>
        </td>
      </tr>
  </tbody>
</table>

<table class="stretch-table" style="margin: -0.2em 0em 0.5em -0.5em; width: 100%">
  <tbody>
      <tr>
        <td style="width: 30%; vertical-align: top; padding-right: 20px;">
          <img src="assets/competition/zhixing_video.gif"
              style="width: 100%; max-width: 280px; height: auto; object-fit: contain"/>
        </td>
        <td style="vertical-align: top;">
          <div style="padding-left: 15px;">
            <div style="margin-bottom: 8px;">
              <span style="font-family: 'Helvetica Neue Thin'; font-size: 1.15rem; line-height: 1.3; font-weight: bold;">
                Zhi Xing Robot
              </span>
              <div style="margin-top: 4px;">
                <span class="icon-star-full" aria-hidden="true"></span>
                <span style="font-family: 'Comic Sans MS'; color: #6495ED; font-weight:bold; font-size:1.0rem">
                 2D-Slam Mapping ＆ Navigation
                </span>
              </div>
            </div>
            <!-- 修改后的链接 -->
            <div class="project-links">
              <a href="https://github.com/ZihanWang0422/YuyuanCup">[Code]</a>
            </div>
            <div style="color: gray; font-size: 0.9rem; line-height: 1.5;">
              In this project we designed and developed an autonomous navigation robot system based on ROS, supporting real-time LiDAR obstacle avoidance, SLAM mapping, and path planning.
            </div>
          </div>
        </td>
      </tr>
  </tbody>
</table>

<hr style="height:2px; background:#ccc; margin:2em 0">

<!-- <h2 class="h1" style="color: rgb(1,92,171); font-weight: bold; font-size:30px" id="awards">Awards </h2>
  <span class="icon-award" aria-hidden="true"></span> College Students' Innovation and Entrepreneurship Training Project(National Level Award), 2024

<br>

  <span class="icon-award" aria-hidden="true"></span> Academic Excellence Award, 2024

<br>

  <span class="icon-award" aria-hidden="true"></span> Academic Excellence Award, 2023

<hr style="height:2px; background:#ccc; margin:2em 0"> -->

<h2 class="h1" style="color: rgb(1,92,171); font-weight: bold; font-size:30px" id="skills">Skills </h2>

- <font size=4 face="微软雅黑" >Programming Languages<br></font>
  <font size=3 face="微软雅黑" color=gray>Python, C/C++, Pytorch, Matlab.</font>

<br>

- <font size=4 face="微软雅黑" >Robotics Tools<br></font>
  <font size=3 face="微软雅黑" color=gray>OpenCV, PCL, ROS/ROS2, IsaacSim, Gazebo.</font>

<hr style="height:2px; background:#ccc; margin:2em 0">

<h2 class="h1" style="color: rgb(1,92,171); font-weight: bold; font-size:30px" id="awards">Misc. </h2>
  <span class="icon-award" aria-hidden="true"></span> During my spare time, I greatly enjoy palying basketball🏀, swimming🏊 and playing guitar🎸.

<hr style="height:2px; background:#ccc; margin:2em 0">
<!-- map -->
<!--
<script type='text/javascript' id='clustrmaps' src='//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=380&t=tt&d=w5Q40Mcc2glzXD3S396H2X_VPVmmSjd_AlGD-dtYM2o&co=2d78ad&cmo=3acc3a&cmn=ff5353&ct=ffffff'></script> -->



<style>
    /* table {
        width: 100%;
        border-collapse: collapse;
    }
      */
    th, td {
        /* max-width: 150px;
        padding: 8px;
        border: 1px solid #ccc;
        text-align: left; */
        word-wrap: break-word;/* 允许文字自动换行 */
    }
</style>

<style>
/* research */
hr:nth-of-type(1) {
  border-width: 3px 0 0 0 !important;
}
hr:nth-of-type(2) {
  border-width: 0.5px 0 0 0 !important;
}
hr:nth-of-type(3) {
  border-width: 0.5px 0 0 0 !important;
}
hr:nth-of-type(4) {
  border-width: 0.5px 0 0 0 !important;
}
/* competition */
hr:nth-of-type(5) {
  border-width: 0.5px 0 0 0 !important;
}
hr:nth-of-type(6) {
  border-width: 3px 0 0 0 !important;
}
hr:nth-of-type(7) {
  border-width: 0.5px 0 0 0 !important;
}
/* awards */
hr:nth-of-type(8) {
  border-width: 0.5px 0 0 0 !important;
}
/* Leadership */
hr:nth-of-type(9) {
  border-width: 3px 0 0 0 !important;
}
/* service */
hr:nth-of-type(10) {
  border-width: 3px 0 0 0 !important;
}
hr:nth-of-type(11) {
  border-width: 3px 0 0 0 !important;
}
hr:nth-of-type(12) {
  border-width: 3px 0 0 0 !important;
}
</style>

<hr style="height:2px; background:#ccc; margin:2em 0">

<h2 class="h1" style="color: rgb(1,92,171); font-weight: bold; font-size:30px" id="visitor-stats">访问统计 </h2>

<div class="visitor-stats-container" style="text-align: center; margin: 20px 0;">
  <!-- Revolvermaps 3D世界地图访问统计 -->
  <script type="text/javascript" src="//rf.revolvermaps.com/0/0/8.js?i=59v4vwn4f5u&amp;m=0&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=33" async="async"></script>
  
  <!-- 访问计数器 -->
  <div style="margin-top: 20px; padding: 15px; border-radius: 5px; background-color: #f8f9fa; display: inline-block;">
    <div>
      <!-- 不蒜子访问统计 -->
      <span style="font-size: 1rem;">总访问量：<span id="busuanzi_value_site_pv" style="font-weight: bold;"></span> 次</span><br>
      <span style="font-size: 1rem;">访客数：<span id="busuanzi_value_site_uv" style="font-weight: bold;"></span> 人</span><br>
      <span style="font-size: 1rem;">本页访问量：<span id="busuanzi_value_page_pv" style="font-weight: bold;"></span> 次</span>
    </div>
  </div>
</div>

<!-- 不蒜子访问统计脚本 -->
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
