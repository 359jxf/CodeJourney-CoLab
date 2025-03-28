<template>
  <StickyNavbar/>
  <div class="my-blog">
    <!-- 左侧文章分类 -->
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
          <el-icon class="type-icon">
            <component :is="type.icon" />
          </el-icon>
          <span>{{ type.name }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 中间文章列表 -->
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

    <!-- 右侧用户信息 -->
    <div class="info-sidebar">
      <el-card class="author-card">
        <div class="author-info">
          <img :src="user.avatar" class="author-avatar" />
          <h3 class="author-name">{{ user.username }}</h3>
          <p class="author-bio">{{ user.bio }}</p>
          <div class="author-stats">
            <div class="stat-item">
              <span class="stat-label">Posts</span>
              <span class="stat-value">{{ filteredPosts.length }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Views</span>
              <span class="stat-value">{{ totalViews }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Likes</span>
              <span class="stat-value">{{ totalLikes }}</span>
            </div>
          </div>
        </div>
      </el-card>
      
      <!-- 添加创建文章按钮 -->
      <div class="create-post-button" @click="goToEditor">
        <el-button 
          type="primary" 
          circle
          class="plus-button"
        >
          <span class="plus-icon">＋</span>
        </el-button>
        <span class="button-text">New Post</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import StickyNavbar from '../components/Navbar.vue';
import { Help, Notebook, } from '@element-plus/icons-vue'

const router = useRouter();
const selectedType = ref('0');

// 文章分类
const articleTypes = ref([
  { id: 0, name: 'Share Notes', icon: Notebook },
  { id: 1, name: ' Question Hub', icon: Help },
]);

const selectedTags = ref([])
const availableTags = ref([
  'Vue', 'React', 'TypeScript', 'JavaScript', 
  'Node.js', 'Python', 'Java', 'Algorithm',
  'Frontend', 'Backend', 'Fullstack', 'Interview'
])

// 用户信息
const user = ref({
  username: 'Smith',
  avatar: '/avatar.png',
  bio: '从问题中探索答案'
});

// 文章数据
const posts = ref([
  {
    id: 7,
    title: '使用TypeScript重构Vue项目的经验总结',
    summary: '最近将一个中型Vue项目从JavaScript迁移到TypeScript，分享一下重构过程中的经验和踩坑记录。包括类型定义、组件改造、状态管理等方面的实践...',
    image: null,
    author: 'Smith',
    viewCount: 1850,
    likeCount: 142,
    typeId: 0,
    publishTime: '2024-01-10T15:20:00Z',
    tags: ['TypeScript', 'Vue', '重构']
  },
]);

// 获取所有属于当前用户的文章
const filteredPosts = ref(posts.value);

// 统计数据使用所有文章计算
const totalViews = computed(() => {
  return filteredPosts.value.reduce((sum, post) => sum + post.viewCount, 0);
});

const totalLikes = computed(() => {
  return filteredPosts.value.reduce((sum, post) => sum + post.likeCount, 0);
});

const filterByType = (index: string) => {
  selectedType.value = index;
  const typeId = parseInt(index);

  filteredPosts.value = posts.value.filter(post => post.typeId === typeId);
};

// 根据选择的标签搜索文章
const sortedPosts = computed(() => {
  const postsToSort = [...filteredPosts.value];
  return postsToSort.filter(post => 
      selectedTags.value.every(tag => post.tags.includes(tag))
  );
});

const goToPost = (postId: number) => {
  router.push(`/blog/${postId}`);
};

// 添加跳转到编辑器的方法
const goToEditor = () => {
  router.push('/editor');
};
</script>

<style scoped>
.my-blog {
  display: flex;
  margin: 80px 0 40px 0;
  padding: 0 20px;
  gap: 20px;
  justify-content: space-between;
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

.info-sidebar {
  width: 20%;
  position: sticky;
  top: 80px;
  height: fit-content;
}

.author-card {
  margin-bottom: 20px;
}

.author-info {
  text-align: center;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
}

.author-name {
  font-size: 18px;
  margin-bottom: 10px;
}

.author-bio {
  color: #666;
  margin-bottom: 20px;
}

.author-stats {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.stat-value {
  font-size: 16px;
  font-weight: bold;
}

.sidebar-container {
  width: 15%;
  position: sticky;
  top: 80px;
  height: fit-content;
}

.type-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

/* 文章列表样式 */
.article-list {
  background-color: white;
  border: none;
  width: 60%;
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

.post-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-content {
  display: flex;
  gap: 20px;
}

.post-text {
  flex: 1;
}

.post-text.full-width {
  width: 100%;
}

.post-title {
  margin: 0 0 10px 0;
  padding: 0;
  font-size: 1.2em;
  font-weight: 700;
}

.post-summary {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
}

.post-meta {
  font-size: 0.9em;
}

.post-stats {
    display: flex;
    gap: 15px;
  }

.post-stats :deep(.el-icon) {
color: #409EFF;
font-size: 18px; 
}

.post-tags {
  display: flex;
  gap: 8px;
}

.post-tag {
  border-radius: 4px;
}

.post-image {
  width: 200px;
  height: 120px;
  overflow: hidden;
  border-radius: 4px;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.create-post-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  cursor: pointer;
}

.plus-button {
  width: 60px;
  height: 60px;
  background-color: white;
  border: 2px solid #409EFF;
  transition: all 0.3s ease;
}

.plus-button:hover {
  transform: scale(1.1);
  background-color: #409EFF;
}

.plus-icon {
  font-size: 30px;
  color: #409EFF;
}

.plus-button:hover .plus-icon {
  color: white;
}

.button-text {
  font-size: 14px;
  color: #666;
}
</style>
