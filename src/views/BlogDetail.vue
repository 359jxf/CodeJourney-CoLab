<template>
   <StickyNavbar
    textColor=var(--color)
    highlightColor=var(--primary-color)
    />
    <ThemeSelector :initialTheme="currentTheme" />
  <div class="blog-detail">
    <!-- 添加返回按钮 -->
    <el-button 
      class="back-button" 
      circle 
      @click="goBack"
    >
      <el-icon><ArrowLeft /></el-icon>
    </el-button>

    <!-- 左侧操作栏 -->
    <div class="action-bar">
      <div class="action-buttons">
        <el-button 
          circle 
          class="action-button"
          :class="{ 'is-liked': isLiked }"
          @click="toggleLike"
        >
          <el-icon><Star /></el-icon>
          <span class="action-count">{{ post.likeCount }}</span>
        </el-button>
        <el-button 
          circle 
          class="action-button"
          @click="showComments = true"
        >
          <el-icon><ChatDotRound /></el-icon>
          <span class="action-count">{{ post.commentCount }}</span>
        </el-button>
        <el-button circle class="action-button">
          <el-icon><Share /></el-icon>
        </el-button>
        <el-button circle class="action-button">
          <el-icon><Warning /></el-icon>
        </el-button>
      </div>
    </div>

    <!-- 中间文章内容 -->
    <div class="content-container">
      <el-card class="content-card">
        <div class="article-header">
          <h1 class="article-title">{{ post.title }}</h1>
          <div class="article-meta">
            <span class="author">Author: {{ post.author }}</span>
            <span class="date">{{ formatDate(post.publishTime) }}</span>
            <span class="views"><el-icon><View /></el-icon> {{ post.viewCount }}</span>
          </div>
          <div class="article-tags">
            <el-tag 
              v-for="tag in post.tags" 
              :key="tag" 
              size="small"
              class="article-tag"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>
        <div class="article-content" v-html="renderedContent"></div>
      </el-card>
    </div>

    <!-- 右侧信息栏 -->
    <div class="info-sidebar">
      <el-card class="author-card">
        <div class="author-info">
          <img :src="authorInfo.avatar" class="author-avatar" />
          <h3 class="author-name">{{ authorInfo.username }}</h3>
          <p class="author-bio">{{ authorInfo.bio }}</p>
          <div class="author-stats">
            <div class="stat-item">
              <span class="stat-label">Posts</span>
              <span class="stat-value">{{ authorInfo.postCount }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Views</span>
              <span class="stat-value">{{ authorInfo.totalViews }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Likes</span>
              <span class="stat-value">{{ authorInfo.totalLikes }}</span>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="toc-card">
        <div class="toc-title">Contents</div>
        <div class="toc-content" v-html="toc"></div>
      </el-card>
    </div>

    <!-- 评论抽屉 -->
    <el-drawer
      v-model="showComments"
      title="Comments"
      direction="rtl"
      size="30%"
      :modal-class="'comment-drawer-modal'"
    >
      <div class="comment-input-container">
        <el-input
          v-model="newComment"
          type="textarea"
          :rows="4"
          :maxlength="1000"
          placeholder="Write your comment..."
          show-word-limit
        />
        <el-button 
          type="primary" 
          @click="submitComment"
          :disabled="!newComment.trim()"
        >
          Send
        </el-button>
      </div>
      <div class="comments-container">
        <div 
          v-for="comment in comments" 
          :key="comment.id" 
          class="comment-item"
        >
          <div class="comment-header">
            <img :src="comment.avatar" class="comment-avatar" />
            <div class="comment-info">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-time">{{ formatDate(comment.time) }}</span>
            </div>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ThemeSelector from '../components/BackgroundTheme.vue';
import StickyNavbar from '../components/Navbar.vue';
import { useRoute, useRouter } from 'vue-router';
import MarkdownIt from 'markdown-it';
import { ArrowLeft } from '@element-plus/icons-vue';

const md = new MarkdownIt();
const route = useRoute();
const router = useRouter();

// 模拟文章数据
const post = ref({
  id: 1,
  title: '从零开始学习Vue3 - Composition API详解',
  content: `
# 从零开始学习Vue3 🚀

## 1. Composition API 简介 ✨

Composition API 是 Vue 3 中新增的特性，它为代码组织提供了更好的方式。相比于 Options API，它能够更好地处理复杂组件的逻辑组织。

![Composition API示意图](/compositionAPI.png)

## 2. 核心概念 🎯

### 2.1 setup 函数 

setup 函数是 Composition API 的入口。它在组件创建之前执行，一旦 props 被解析就会调用该函数。

\`\`\`js
export default {
  setup(props, context) {
    // 组件逻辑写在这里
  }
}
\`\`\`

### 2.2 响应式系统 💡

Vue 3 的响应式系统基于 Proxy，提供了更好的性能和更直观的使用方式：

- ref：用于基本类型的响应式
- reactive：用于对象的响应式

![响应式系统](/reactive-system.png)

### 2.3 生命周期钩子 🔄

在 Composition API 中，生命周期钩子需要手动导入：

\`\`\`js
import { onMounted, onUpdated, onUnmounted } from 'vue'

export default {
  setup() {
    onMounted(() => {
      console.log('组件已挂载')
    })
  }
}
\`\`\`

## 3. 实践案例 🌟

让我们通过一个计数器的例子来展示 Composition API 的优势：

\`\`\`js
import { ref, computed } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)

    function increment() {
      count.value++
    }

    return {
      count,
      doubleCount,
      increment
    }
  }
}
\`\`\`

## 4. 总结 📝

Composition API 为 Vue 开发带来了更多的灵活性和可维护性。通过合理组织代码，我们可以构建出更易于维护和扩展的应用。

> 💡 提示：在实际开发中，建议根据功能模块来组织代码，这样可以让代码结构更清晰。

### 相关资源 🔗

- [Vue 3 官方文档](https://v3.vuejs.org/)
- [Composition API RFC](https://composition-api.vuejs.org/)
  `,
  author: 'Smith',
  publishTime: '2025-01-15T10:00:00Z',
  viewCount: 2341,
  likeCount: 180,
  commentCount: 3,
  tags: ['Vue3', 'Composition API', '前端开发']
});

// 作者信息
const authorInfo = ref({
  username: 'Rosaria',
  avatar: '/avatar1.png',
  bio: '前端开发工程师，热爱技术分享',
  postCount: 3,
  totalViews: 8900,
  totalLikes: 240
});

// 渲染Markdown内容
const renderedContent = computed(() => {
  return md.render(post.value.content);
});

// 生成目录
const toc = computed(() => {
  return '<div>1. Composition API 简介</div><div>2. 核心概念</div>';
});

// 格式化日期
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const isLiked = ref(false);
const showComments = ref(false);

// 模拟评论数据
const comments = ref([
  {
    id: 1,
    author: 'Alice',
    avatar: '/unicorn.png',
    content: '写得很好，对Vue3的Composition API讲解得很清晰！',
    time: '2025-01-16T08:30:00Z'
  },
  {
    id: 2,
    author: 'Bob',
    avatar: '/avatar2.png',
    content: '这篇文章帮我解决了很多困惑，特别是关于setup函数的部分。',
    time: '2025-01-20T09:15:00Z'
  },
  {
    id: 3,
    author: 'Carol',
    avatar: '/avatar3.png',
    content: '示例代码很实用，希望能有更多这样的文章！',
    time: '2025-03-16T10:20:00Z'
  }
]);

// 点赞功能
const toggleLike = () => {
  if (isLiked.value) {
    post.value.likeCount--;
  } else {
    post.value.likeCount++;
  }
  isLiked.value = !isLiked.value;
};

const newComment = ref('');

// 提交评论
const submitComment = () => {
  if (!newComment.value.trim()) return;
  
  const comment = {
    id: comments.value.length + 1,
    author: 'Smith', 
    avatar: '/avatar.png', 
    content: newComment.value,
    time: new Date().toISOString()
  };
  
  comments.value.unshift(comment); // 将新评论添加到列表开头
  post.value.commentCount++; // 更新评论数
  newComment.value = ''; // 清空输入框
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  // 这里可以根据路由参数获取文章详情
  const postId = route.params.id;
  // fetchPostDetail(postId);
});
</script>

<style scoped>
.blog-detail {
  display: flex;
  margin-top: 80px;
  padding: 0 20px;
  gap: 20px;
  justify-content: space-between;
}

.back-button {
  position: fixed;
  top: 80px;
  left: 20px;
  z-index: 100;
  background-color: white;
  border: 2px solid var(--primary-color);
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: var(--primary-color);
}

.back-button:hover :deep(.el-icon) {
  color: white;
}

.back-button :deep(.el-icon) {
  font-size: 20px;
  color: var(--primary-color);
}

.action-bar {
  width: 6%;
  position: sticky;
  top: 30vh;
  height: fit-content;
  margin-right: 3vw;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.action-button {
  display: flex;
  flex-direction: row;
  
  align-items: center;
  width: 5vw;
  height: 10vh;
  position: relative;
  padding: 0;
}
.action-button:hover{
  background-color: #a8c1ec;
}
.action-button .el-icon{
  width: 100%;
  height: auto;
  color: #494949;
}
.action-count {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
  color: rgb(202, 202, 202);
  margin-left: 8px;
}

.content-container {
  flex: 1;
  max-width: 65%;
}

.content-card {
  padding: 30px;
}

.article-header {
  margin-bottom: 30px;
}

.article-title {
  font-size: 2.0em;
  margin-bottom: 20px;
}

.article-meta {
  display: flex;
  gap: 20px;
  color: grey;
  margin-bottom: 15px;
}
.views .el-icon{
  color:#494949;
}
.article-tags {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.article-content {
  line-height: 1.8;
  font-size: 16px;
}

/* 添加图片样式 */
.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
}

.info-sidebar {
  width: 20%;

  position: sticky;
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

.toc-card {
  padding: 20px;
}

.toc-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
}

.toc-content {
  font-size: 14px;
  line-height: 1.8;
}

.action-button.is-liked {
  background-color: #a8c1ec;
}

.action-button.is-liked .el-icon {
  color: #0066ff;
}

/* 评论样式 */
.el-drawer{
  display: flex;
  flex-direction: column;
  gap:10px;
}
.comments-container {
  margin-top: 20px;
  height: calc(100% - 200px);
  overflow-y: auto;
}

.comment-item {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
}

.comment-info {
  display: flex;
  flex-direction: column;
}

.comment-author {
  font-weight: bold;
  font-size: 14px;
  color:#333;
}

.comment-time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.comment-content {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

/* 抽屉蒙层样式 */
:deep(.comment-drawer-modal) {
  background-color: rgba(0, 0, 0, 0.4);
}

.comment-input-container {
  border-bottom: 1px solid #eee;
}

.comment-input-container .el-button {
  margin-top: 10px;
  float: right;
  background-color: #0066ff;
}
</style>