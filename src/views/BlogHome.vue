<template>
    <StickyNavbar
    textColor=var(--color)
    highlightColor=var(--primary-color)
    />
    <ThemeSelector :initialTheme="currentTheme" />
    <div class="blog-home">
      <div class="sidebar-container">
        <el-menu
          class="type-menu"
          :default-active="selectedType"
          @select="filterByType"
        >
          <el-menu-item 
            v-for="type in articleTypes" 
            :key="type.id"
            :index="type.id.toString()"
          >
          <img :src="type.icon" alt="Post Image"  class="type-icon"/>
            <span>{{ type.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      
      <div class="article-list">
        <div class="article-sort">
          <el-radio-group v-model="sortType" size="large">
            <el-radio-button label="recommend">推荐</el-radio-button>
            <el-radio-button label="latest">最新</el-radio-button>
          </el-radio-group>
        </div>
        <el-card 
          v-for="post in sortedPosts" 
          :key="post.id" 
          class="post-card" 
          @click="goToPost(post.id)"
          shadow="never"
        >
          <div class="post-content">
            <div class="post-text" :class="{ 'full-width': !post.image }">
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-summary">{{ post.summary }}</p>
              <div class="post-info">
               <div class="post-detail">
                <span class="post-author">作者: {{ post.author }}</span>
                <div class="post-stats">
                    <el-icon><View /></el-icon>
                    <span class="stat-value">{{ post.viewCount }}</span>
                    <el-icon><Star /></el-icon>
                    <span class="stat-value">{{ post.likeCount }}</span>
                </div>
               </div>
                <div class="post-tags">
                  <el-tag 
                    v-for="(tag, index) in post.tags.slice(0, 3)" 
                    :key="index" 
                    size="small"
                    class="post-tag"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </div>
            <div v-if="post.image" class="post-image">
              <img :src="post.image" alt="Post Image" />
            </div>
          </div>
        </el-card>
      </div>
  
      <div class="right-sidebar-container">
        <div class="right-sidebar">
          <el-card class="user-card">
            <div class="user-info">
              <div class="avatar-container">
                <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
              </div>
              <div class="user-details">
                <h3 class="username">{{ user.username }}</h3>
                <el-button @click="goToMyBlog" type="primary" size="small">我的博客
                  <el-icon><ArrowRight /></el-icon>
                </el-button>
              </div>
              <div class="user-stats">
                  <span>文章数：</span>
                  <span>{{ userPostCount }}</span>
                </div>
            </div>
          </el-card>
          
          <el-card class="hot-posts-card">
            <div class="hot-posts-header">
              <el-icon><TrendCharts /></el-icon>
              <span>文章热榜</span>
            </div>
            <div class="hot-posts-list">
              <div 
                v-for="(post, index) in hotPosts" 
                :key="post.id" 
                class="hot-post-item"
                @click="goToPost(post.id)"
              >
                <span class="post-rank" >{{ index + 1 }}</span>
                <span class="post-title">{{ post.title }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue';
  import ThemeSelector from '../components/BackgroundTheme.vue';
  import StickyNavbar from '../components/Navbar.vue';
  import { useRouter } from 'vue-router';
  import { TrendCharts } from '@element-plus/icons-vue'
  const router = useRouter();
  // 模拟数据
  const articleTypes = ref([
    { id: 0, name: '综合', icon: '/unicorn.png' },
    { id: 1, name: '学习经验', icon: '/unicorn.png' },
    { id: 2, name: '技术交流', icon: '/unicorn.png' },
    { id: 3, name: '竞赛心得', icon: '/unicorn.png' },
    { id: 4, name: '求职面试', icon: '/unicorn.png' },
    { id: 5, name: '人工智能', icon: '/unicorn.png' },
    { id: 6, name: '生活闲谈', icon: '/unicorn.png' },
  ]);

  
  const posts = ref([
    { 
      id: 1,
      title: '从零开始学习Vue3 - Composition API详解',
      summary: 'Vue3的Composition API是一个革命性的特性，它为代码组织提供了更好的方式。本文将深入介绍setup函数、ref、reactive等核心概念，并通过实例讲解如何使用这些特性来优化你的Vue应用...',
      image: '/vite.svg',
      author: '张三',
      viewCount: 2341,
      likeCount: 180,
      typeId: 2,
      publishTime: '2024-01-15T10:00:00Z',
      tags: ['Vue3', 'Composition API', '前端开发']
    },
    { 
      id: 2,
      title: '我的秋招面试总结 - 前端工程师篇',
      summary: '历经两个月的秋招季，拿到了几个大厂offer。分享一下面试经验，包括技术面试常见问题、算法题准备、项目经验展示等，希望能帮助到准备秋招的同学们...',
      image: null,
      author: '李四',
      viewCount: 3150,
      likeCount: 265,
      typeId: 4,
      publishTime: '2024-01-16T14:30:00Z',
      tags: ['面试经验', '校招', '前端开发']
    },
    {
      id: 3,
      title: 'ChatGPT API 实战：构建智能问答系统',
      summary: '本文将介绍如何使用ChatGPT API构建一个智能问答系统。包括API的调用方法、prompt工程技巧、token控制等核心要点，以及一个完整的示例项目...',
      image: '/avatar.png',
      author: '王五',
      viewCount: 1890,
      likeCount: 145,
      typeId: 5,
      publishTime: '2024-01-14T09:15:00Z',
      tags: ['ChatGPT', 'API', '智能系统']
    },
    {
      id: 4,
      title: '大三学生如何规划实习？',
      summary: '作为一名大三学生，如何在课业和实习之间找到平衡？分享我的实习规划经验，包括简历准备、面试技巧、时间管理等方面的建议...',
      image: '/study.png',
      author: '小明',
      viewCount: 2780,
      likeCount: 198,
      typeId: 1,
      publishTime: '2024-01-13T16:45:00Z',
      tags: ['实习规划', '大学生', '职业发展']
    },
    {
      id: 5,
      title: '蓝桥杯比赛经验分享',
      summary: '参加蓝桥杯已经三年，从省赛到国赛，收获了不少经验。本文将分享比赛备赛策略、常见题型分析、以及如何在有限时间内提高竞赛水平...',
      image: '/home.png',
      author: '小红',
      viewCount: 1560,
      likeCount: 132,
      typeId: 3,
      publishTime: '2024-01-12T11:20:00Z',
      tags: ['蓝桥杯', '竞赛经验', '编程']
    },
    {
      id: 6,
      title: '从实习生到正式员工的转正之路',
      summary: '记录我在某互联网公司从实习生转正的经历。分享工作中的收获与挑战，以及如何在实习期间展现自己的价值，成功通过转正评估...',
      image: null,
      author: '小李',
      viewCount: 2100,
      likeCount: 167,
      typeId: 4,
      publishTime: '2024-01-11T13:40:00Z',
      tags: ['转正经历', '职场', '工作']
    },
    {
      id: 7,
      title: '使用TypeScript重构Vue项目的经验总结',
      summary: '最近将一个中型Vue项目从JavaScript迁移到TypeScript，分享一下重构过程中的经验和踩坑记录。包括类型定义、组件改造、状态管理等方面的实践...',
      image: null,
      author: 'Smith',
      viewCount: 1850,
      likeCount: 142,
      typeId: 2,
      publishTime: '2024-01-10T15:20:00Z',
      tags: ['TypeScript', 'Vue', '重构']
    },
    {
      id: 8,
      title: '记一次性能优化实践',
      summary: '项目上线后发现首屏加载时间过长，通过分析性能瓶颈，采用懒加载、代码分割、缓存优化等手段，最终将加载时间缩短了60%...',
      image: '/code.png',
      author: 'Smith',
      viewCount: 2200,
      likeCount: 188,
      typeId: 2,
      publishTime: '2024-01-09T11:30:00Z',
      tags: ['性能优化', '前端开发', 'Vue']
    },
    {
      id: 9,
      title: '前端工程化实践：从0到1搭建开发环境',
      summary: '分享如何搭建一个现代化的前端开发环境，包括Vite配置、ESLint规范、Git Hooks、自动化测试等，助力团队提升开发效率...',
      image: null,
      author: 'WANGXINCHENG',
      viewCount: 1680,
      likeCount: 135,
      typeId: 2,
      publishTime: '2024-01-08T09:45:00Z',
      tags: ['工程化', 'Vite', 'ESLint']
    }
  ]);
  
  const user = ref({ username: 'Smith', avatar: '/avatar.png' });
  
  const filteredPosts = ref(posts.value); // 初始为所有文章
  const selectedType = ref('0'); // 默认选中第一项
  const hoveredType = ref(null);
  
  const sortType = ref('recommend'); // 默认排序方式
  
  const filterByType = (index: string) => {
    selectedType.value = index;
    const typeId = parseInt(index);
    
    if (typeId === 0) {
      // 综合标签：显示所有帖子并按点赞数排序
      filteredPosts.value = [...posts.value].sort((a, b) => b.likeCount - a.likeCount);
    } else {
      // 其他标签：按类型筛选
      filteredPosts.value = posts.value.filter(post => post.typeId === typeId);
    }
  };
  
  const goToPost = (postId: number) => {
    router.push({ path: `/blog/${postId}` });
  };
  
  const goToMyBlog = () => {
    router.push({ path: '/my-blog' });
  };
  
  // 根据选择的排序方式对文章进行排序
  const sortedPosts = computed(() => {
    const postsToSort = [...filteredPosts.value];
    if (sortType.value === 'recommend') {
      return postsToSort.sort((a, b) => b.likeCount - a.likeCount);
    } else {
      return postsToSort.sort((a, b) => 
        new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
      );
    }
  });

  // 计算当前用户的文章数
  const userPostCount = computed(() => {
    return posts.value.filter(post => post.author === user.value.username).length;
  });

  // 计算热门文章（按照浏览量和点赞数的加权计算）
  const hotPosts = computed(() => {
    return [...posts.value]
      .sort((a, b) => {
        const scoreA = a.viewCount * 0.6 + a.likeCount * 0.4;
        const scoreB = b.viewCount * 0.6 + b.likeCount * 0.4;
        return scoreB - scoreA;
      })
      .slice(0, 10); // 只显示前10篇
  });

  </script>
  
  <style scoped>
  .blog-home {
    display: flex;
    margin-top: 80px;
    justify-content: center; 
    background-color: rgb(26,26,46);
  }
  
  .sidebar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    margin-left: 1%;
    margin-right: 1%;
    top: 80px; 
    width: 13%;
    height: calc(100vh - 80px); 
    overflow: hidden; 
    background: transparent;
    border: none;
  }
  .type-menu {
    width: 100%;
    height: auto;
    border-radius: 2px;
    border-right: none;
    background-color: rgb(73, 11, 11);
  }
  .type-icon{
    width: 40px;
    height: auto;
    margin-right: 10px;
  }
  .el-menu-item {
    padding: 0;
    margin: 0;
    border: none;
    color: grey;
    background-color: white;
    width: 100%;
    height: 10vh;
    flex-grow: 1;
    transition: all 0.3s;
    font-size: large;
    border-left: 3px solid transparent;
  }
  .el-icon-edit{
    color: rgb(13, 20, 153);
  }
  .el-menu-item.is-active {
    background-color: rgb(207, 226, 249);
    color: darkblue;
    border-left: 3px solid darkblue; 
  }
  .el-menu-item:hover {
    background-color: rgb(207, 226, 249);
    color: darkblue;
    border-left: 3px solid darkblue; 
  }
  
  .right-sidebar-container {
    margin-left: 1%;
    margin-right: 1%;
    top: 80px; 
    right: 0; 
    width: 20%;
    height: calc(100vh - 80px);
    overflow: hidden; 
    background: transparent;
  }

  
  .article-list {
    background-color: white;
    border: none;
    position: relative;
    width: 60%;
    overflow-y: auto; /* 允许垂直滚动 */
    -ms-overflow-style: none; /* 适用于 Internet Explorer 和旧版 Edge */
    scrollbar-width: none; /* 适用于 Firefox */
    max-height: calc(100vh - 80px); /* 设置最大高度 */
  }
  .article-list::-webkit-scrollbar{
    width: 0; /* 隐藏滚动条 */
    background: transparent; 
  }
  
  .post-card {
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease; 
  }
  
  .post-card:hover {
    background-color:rgb(237, 241, 245); 
  }
  
  .post-content {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .post-text {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .post-text.full-width {
    width: 100%;
  }
  
  .post-title {
    margin: 0 0 10px 0;
    padding:0;
    font-size: 1.2em;
    font-weight:700;
  }
  
  .post-summary {
    margin: 0 0 20px 0;
    color:rgb(158, 158, 171);
    flex-grow: 1;
  }
  
  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: grey;
    font-size: 15px;
  }
  .post-info .post-detail{
    display: flex;
  }
  .post-author {
    margin-right: 20px;
  }
  
  .post-stats {
    left: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  /* 修改图标样式 */
  .post-stats :deep(.el-icon) {
    color: rgb(64, 64, 178);
    font-size: 18px; 
  }
  .post-stats span {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 5px;
  }
  
  .post-tags {
    display: flex;
    gap: 8px;
  }
  
  .post-tag {
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
    color: rgb(94, 94, 103);
    background-color: rgb(219, 229, 242);
  }
  
  .post-image {
    width: 10vw;
    height: 13vh;
    overflow: hidden;
  }
  
  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .post-image {
    width: 10vw;
    height: 13vh;
    overflow: hidden;
  }
  
  .post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .sidebar {
    overflow: auto; /* 启用滚动功能 */
    -ms-overflow-style: none; /* 适用于 Internet Explorer 和旧版 Edge */
    scrollbar-width: none; /* 适用于 Firefox */
}

.article-sort {
  padding: 0px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
}

.el-radio-group {
  display: flex;
  gap: 30px; 
}

/* 增加选择器优先级 */
:deep(.el-radio-group .el-radio-button__inner) {
  display: flex;
  justify-content: center;
  border: none !important;
  border-radius: 1px;
  background: transparent;
  color: grey;
  align-items: center;
  font-size: 2.5vh;
  font-weight: bold;
  height: 7vh;
  width: 140%;
  box-shadow: none !important; /* 移除默认阴影 */
}

:deep(.el-radio-group .el-radio-button__inner:hover) {
  color: darkblue;
  border-bottom: 4px solid darkblue !important;
  background-color: white !important;
  transition: all 0s ease;
}

:deep(.el-radio-group .el-radio-button.is-active .el-radio-button__inner) {
  background-color: white !important;
  color: darkblue !important;
  border-bottom: 4px solid darkblue !important;
  box-shadow: none !important;
}

.user-card {
  height: 15vh;
  margin-bottom: 30px;
  padding: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  margin: 0;
}

.avatar-container {
  width: 30%;
  height: auto;
}

.user-avatar {
  width: 95%;
  height: 95%;
  border-radius: 50%;
  border: 3px solid rgb(14, 50, 134);
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 1.2em;
}
.user-details .el-button{
  width: 100%;
  margin-left: 10%;
  height: 4.5vh;
  border: none;
  border-radius: 0;
  background-color: white;
  color:  rgb(14, 50, 134);

  font-size: 0.8em !important;
}
.user-details .el-button:hover{
  border-bottom: 2px solid rgb(14, 50, 134);
  transform:all 0s ease;
}
:deep(.user-details .el-button .el-icon){
  color: rgb(14, 50, 134);
}
.username {
  margin: 0;
  font-weight: bold;
  font-size: 1.3em;
}

.user-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; 
  color: rgb(142, 146, 150);
  font-size: 1.1em;
  font-weight: medium;
  margin-bottom: 5px;
}

.hot-posts-card {
  margin-top: 20px;
}

.hot-posts-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  font-weight: bold;
}

.hot-posts-header .el-icon {
  color: #f07777;
  font-size: 20px;
}

.hot-posts-list {
  margin-top: 12px;
}

.hot-post-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
}

.hot-post-item:hover .post-title {
  color: rgb(14, 50, 134);
}

.post-rank {
  min-width: 1vw;
  text-align: center;
  color: grey;
  font-weight: bold;
}

/* 使用属性选择器 */
.hot-post-item:nth-of-type(1) .post-rank {
  color: #f56c6c;
}

.hot-post-item:nth-of-type(2) .post-rank {
  color: #e6a23c;
}

.hot-post-item:nth-of-type(3) .post-rank {
  color: #67c23a;
}

.hot-posts-list .post-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #343434;
  font-size: 1em;
  font-weight: 400 !important;
}
</style>