<template>
    <StickyNavbar/>
    <div class="blog-home">
      <div class="sidebar-container">
        <el-card class="user-card">
          <div class="user-info">
            <div class="avatar-container">
              <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
            </div>
            <div class="user-details">
              <h3 class="username">{{ user.username }}</h3>
              <div class="user-stats">POSTs: 2</div>
            </div>
            <el-button @click="goToMyBlog" type="text" size="small">My Blog >
            </el-button>
          </div>
        </el-card>

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
            <el-icon class="type-icon">
              <component :is="type.icon" />
            </el-icon>
            <span>{{ type.name }}</span>
          </el-menu-item>
        </el-menu>
      </div>
      
      <div class="article-list">
        <div class="article-sort">
          <el-select
          v-model="selectedTags"
          multiple
          collapse-tags
          placeholder="Select tags"
          class="tag-select"
        >
          <el-option
            v-for="tag in availableTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
        <el-input placeholder="Type to search" />
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
                <span class="post-author">{{ post.author }}</span>
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
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref, computed } from 'vue';
  import StickyNavbar from '../components/Navbar.vue';
  import { useRouter } from 'vue-router';
  import { Help, Notebook, } from '@element-plus/icons-vue'
  const router = useRouter();
  // 模拟数据
  const articleTypes = ref([
    { id: 0, name: 'Share Notes', icon: Notebook },
    { id: 1, name: ' Question Hub', icon: Help },
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
      typeId: 0,
      publishTime: '2024-01-15T10:00:00Z',
      tags: ['Vue3', 'Composition API', 'Frontend']
    },
    { 
      id: 2,
      title: '我的秋招面试总结 - 前端工程师篇',
      summary: '历经两个月的秋招季，拿到了几个大厂offer。分享一下面试经验，包括技术面试常见问题、算法题准备、项目经验展示等，希望能帮助到准备秋招的同学们...',
      image: null,
      author: '李四',
      viewCount: 3150,
      likeCount: 265,
      typeId: 0,
      publishTime: '2024-01-16T14:30:00Z',
      tags: ['Experience sharing', 'Campus Recruitment', 'Frontend']
    },
    {
      id: 3,
      title: 'Building an AI Q&A System with ChatGPT API',
      summary: 'A comprehensive guide on building an intelligent Q&A system using ChatGPT API. We\'ll cover API integration, prompt engineering techniques, token management, and walk through a complete example project...',
      image: '/avatar.png',
      author: 'Mike',
      viewCount: 1890,
      likeCount: 145,
      typeId: 0,
      publishTime: '2024-01-14T09:15:00Z',
      tags: ['ChatGPT', 'API', 'Intelligent System']
    },
    {
      id: 4,
      title: 'How to balance academics and internships as a junior student',
      summary: 'How to balance academics and internships as a junior student? Sharing my internship planning experience, including resume preparation, interview tips, time management, and more...',
      image: '/study.png',
      author: 'Sarah',
      viewCount: 2780,
      likeCount: 198,
      typeId: 1,
      publishTime: '2024-01-13T16:45:00Z',
      tags: ['Internship', 'Career', 'Planning']
    },
  ]);

  const selectedTags = ref([])
  const availableTags = ref([
  'Vue', 'React', 'TypeScript', 'JavaScript', 
  'Node.js', 'Python', 'Java', 'Algorithm',
  'Frontend', 'Backend', 'Fullstack', 'Interview'
])
  
  const user = ref({ username: 'Smith', avatar: '/avatar.png' });
  
  const selectedType = ref('0'); // 默认选中第一项  
  const filteredPosts = ref(posts.value.filter(post => post.typeId === 0)); // 初始为第一种文章
  
  const filterByType = (index: string) => {
    selectedType.value = index;
    const typeId = parseInt(index);

    filteredPosts.value = posts.value.filter(post => post.typeId === typeId);
  };
  
  const goToPost = (postId: number) => {
    const filteredPost = posts.value.filter(post => post.id === postId);

    if (filteredPost.length > 0) {
        const post = filteredPost[0];  
        if (post.typeId === 0) {
          router.push({ path: `/blog/${postId}` });
        } else {
          router.push({ path: `/blogqa/${postId}` });
        }
    }
    
  };
  
  const goToMyBlog = () => {
    router.push({ path: '/my-blog' });
  };
  
  // 根据选择的标签搜索文章
  const sortedPosts = computed(() => {
    const postsToSort = [...filteredPosts.value];
    return postsToSort.filter(post => 
        selectedTags.value.every(tag => post.tags.includes(tag))
    );
  });
  </script>
  
  <style scoped>
  .blog-home {
    display: flex;
    padding: 80px 100px 40px 100px;
    justify-content: center; 
    gap: 10px;
  }
  
  .sidebar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    gap:20px;
  }
  .type-menu {
    width: 100%;
    height: auto;
    border-radius: 2px;
    border-right: none;
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
  .el-menu-item.is-active {
    background-color: #e3f1ff;
    color: #409EFF;
    border-left: 3px solid #409EFF; 
  }
  .el-menu-item:hover {
    background-color: #e3f1ff;
    color: #409EFF;
    border-left: 3px solid #409EFF; 
  }
  
  .article-list {
    background-color: white;
    border: none;
    width: 80%;
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
    color: #409EFF;
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
    color: #409EFF;
    background-color: #e2f0ff;
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
  
.article-sort {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
}

.tag-select {
  width: 40%;
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
  color: #409EFF;
  border-bottom: 4px solid #409EFF !important;
  background-color: white !important;
  transition: all 0s ease;
}

:deep(.el-radio-group .el-radio-button.is-active .el-radio-button__inner) {
  background-color: white !important;
  color: #409EFF !important;
  border-bottom: 4px solid #409EFF !important;
  box-shadow: none !important;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 5px;
}

.avatar-container {
  width: 30%;
  height: auto;
}

.user-avatar {
  width: 95%;
  height: 95%;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.username {
  margin: 0;
  font-weight: bold;
  font-size: 1.3em;
}

.user-stats {
  color: rgb(142, 146, 150);
}

</style>