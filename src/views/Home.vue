<template>
  <div>
    <!-- 顶部横幅 -->
    <section class="banner">
      <img src="../assets/a.png" alt="Banner Image" class="banner-image" />
      <div class="banner-text">
        <h1>Make Coding a Shared Wonderful Journey</h1>
        <p>Collaborative Programming for Better Teaching and Collaborative Experiences</p>
        <router-link to="/about" class="learn-more-btn">Learn More  →</router-link> <!-- 使用router-link替换button -->
      </div>
    </section>

     <!-- Recommended Features Section -->
     <FeaturesSection />

    <!-- 底部联系方式和项目简介 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="contact-info">
          <div class="contact-item">
            <div class="icon-circle">
              <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.75 9.625L20.1667 1.75L11.9167 18.375L10.0833 11.375L2.75 9.625Z" stroke="#F3F3F3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p>4800 Caoyang Street<br />Jiading, Shanghai</p>
          </div>
          <div class="contact-item">
            <div class="icon-circle">
              <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.75 9.625L20.1667 1.75L11.9167 18.375L10.0833 11.375L2.75 9.625Z" stroke="#F3F3F3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p>10086</p>
          </div>
          <div class="contact-item">
            <div class="icon-circle">
              <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.75 9.625L20.1667 1.75L11.9167 18.375L10.0833 11.375L2.75 9.625Z" stroke="#F3F3F3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p>123456@qq.com</p>
          </div>
        </div>
        <div class="project-info">
          <h3>About the Project</h3>
          <p>This is a SITP project in CST, Tongji University. However, we need more help to finish it due to the tight schedule and insufficient ability. So come with the more help, more!</p>
          <div class="github-logo">
            <div class="icon-bg">
              <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17.5385C4 18.9231 4 15.2308 2 14.7692M16 20.3077V16.7354C16.0375 16.2952 15.9731 15.8527 15.811 15.4373C15.6489 15.022 15.3929 14.6432 15.06 14.3262C18.2 14.0031 21.5 12.9046 21.5 7.86462C21.4997 6.57584 20.9627 5.33649 20 4.40308C20.4559 3.27555 20.4236 2.02925 19.91 0.923078C19.91 0.923078 18.73 0.600001 16 2.28923C13.708 1.71584 11.292 1.71584 9 2.28923C6.27 0.600001 5.09 0.923078 5.09 0.923078C4.57638 2.02925 4.54414 3.27555 5 4.40308C4.03013 5.34342 3.49252 6.59397 3.5 7.89231C3.5 12.8954 6.8 13.9938 9.94 14.3538C9.611 14.6677 9.35726 15.0419 9.19531 15.4522C9.03335 15.8626 8.96681 16.2998 9 16.7354V20.3077" stroke="#F3F3F3" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import FeaturesSection from '../components/FeaturesSection.vue';

export default {
  name: 'Home',
  components: {
    FeaturesSection
  }
}
</script>

<style scoped>

/* 顶部横幅样式 */
.banner {
  position: relative;
  text-align: center;
}

.banner-image {
  width: 100%;
  height: auto;
  display: block;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.learn-more-btn {
  border-radius: 4px; /* 圆角 */
  padding: 10px 20px;
  text-decoration: none; /* 去掉下划线 */
  border: none;
  cursor: pointer;
}

/* 推荐功能部分样式 */
.features {
  text-align: center;
  padding: 40px 20px;
}

.features-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.feature-card {
  padding: 20px;
  border-radius: 5px;
  width: 150px;
  text-align: center;
  font-weight: bold;
}

/* 底部样式 */
.footer {
  padding: 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info, .project-info {
  width: 45%;
}

.contact-info p, .project-info p {
  margin: 5px 0;
}

.project-info {
  margin-left: 20px;
}

/*github的logo样式*/
.github-logo {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.icon-bg {
  background-color: #2d3034; /* 灰色背景 */
  padding: 4px; /* 添加内边距 */
  border-radius: 4px; /* 圆角 */
  display: flex; /* 用于居中 SVG 图标 */
  align-items: center;
  justify-content: center;
}

.github-logo svg {
  width: 24px;
  height: 23px;
}

.github-logo span {
  color: #ffffff; /* 文字颜色设置为白色 */
  font-weight: bold;
  cursor: pointer;
  margin-left: 8px;
}

/*信息左边的图标*/
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-item {
  display: flex;
  align-items: center;
}

.icon-circle {
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%; /* 圆形背景 */
  align-items: center;
  justify-content: center;
  margin-right: 10px; /* 图标和文字间距 */
}

.contact-info svg {
  width: 16px;
  height: 16px;
}

.contact-item p {
  margin: 0;
  color: white;
}

/* 浅色模式样式 */
@media (prefers-color-scheme: light) {
  :root {/*最上面的无文字的样式，不用管 */
    color: #213547; /* 文字颜色 */
    background-color: #ffffff; /* 背景颜色 */
  }
  
  .banner-text {/*中间的文字 */
    color: #ffffff; /* 调整顶部横幅文字颜色 */
  }
  
  .learn-more-btn {
    background-color: #f9f9f9; /* 按钮背景 */
    color: #007bff; /* 按钮文字颜色 */
  }
  
  .footer {/*下方的背景样式*/
    background-color: #90bae4; /* 底部背景 */
    color: #ffffff; /* 底部文字颜色 */
  }

  .icon-circle {
    background-color: #000000; /* 底部背景 */
    color:#000000;
  }

  .footer-content {/*下方右边的文字*/
    color: #000000; /* 底部内容颜色 */
  }

}

/* 深色模式样式 */
@media (prefers-color-scheme: dark) {
  :root {/*最上面的无文字的样式，不用管 */
    color: #213547; /* 文字颜色 */
    background-color: #ffffff; /* 背景颜色 */
  }
  
  .banner-text {/*中间的文字 */
    color: #000000; /* 调整顶部横幅文字颜色 */
  }
  
  .learn-more-btn {
    background-color: #eae9f0; /* 按钮背景 */
    color: #d9e2eb; /* 按钮文字颜色 */
  }
  
  .footer {/*下方的背景样式*/
    background-color: #000000; /* 底部背景 */
    color: #564f94; /* 底部文字颜色 */
  }

  .icon-circle {
    background-color: #000000; /* 底部背景 */
    color:#000000;
  }

  .footer-content {/*下方右边的文字*/
    color: #9799b1; /* 底部内容颜色 */
  }
  
  /* 添加其他元素的样式调整 */
}

</style>
