<template>
    <section class="wrapper">
      <StickyNavbar
        textColor=var(--color)
        highlightColor=var(--primary-color)
      />
      <div  class="container">
        <!-- 侧边导航栏 -->
        <Sidebar
          :currentProblemId="currentProblemId"
          @updateProblem="handleSelectProblem"
        />
    
        <!-- 主内容区 -->
        <div class="main-section">
          <!-- 显示题目信息 -->
          <div class="problem" v-if="currentProblem">
            <h2>{{ currentProblem.title }}</h2>
            <p>{{ currentProblem.description }}</p>
          </div>
    
          <div class="coding">
            <!-- 代码结果判题器 -->
            <CodeReviewer
              :code="code"
              :selectedLanguage="selectedLanguage"
              :problemId="currentProblemId"
            />
    
            <!-- 语言选择器和主题选择器以及代码编辑器 -->
            <LanguageAndThemeSelector
              v-model:code="code"
              v-model:selectedLanguage="selectedLanguage"
              height= "400px"
              width="780px"
              color=var(--primary-color)
              textColor=var(--color)
            />
    
            <!-- 代码运行器 -->
            <CodeRunner
              :code="code"
              :selectedLanguage="selectedLanguage"
              height= "150px"
              width="730px"
            />
          </div>
        </div>
      </div>
      <ThemeSelector :initialTheme="currentTheme" />
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import LanguageAndThemeSelector from '../components/LanguageAndThemeSelector.vue'; 
  import CodeRunner from '../components/CodeRunner.vue'; 
  import CodeReviewer from '../components/CodeReviewer.vue'; 
  import ThemeSelector from '../components/BackgroundTheme.vue';
  import StickyNavbar from '../components/Navbar.vue';
  import Sidebar from '../components/Sidebar.vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  // 定义当前主题
  const currentTheme = ref({
    background: '#1A1A2E',
    color: '#FFFFFF',
    primaryColor: '#0F3460'
  });
  
  // 管理在 Main 组件中共享的状态
  const route = useRoute();
  const code = ref<string>("");  // 保存编辑器中的代码
  const selectedLanguage = ref<string>("python");  // 保存用户选择的语言
  const currentProblemId = ref<number>(Number(route.query.currentProblemId));  // 当前选中的题目 ID
  const currentProblem = ref<{ title: string; description: string } | null>(null);  // 当前题目信息

  // 请求具体题目的数据
  const loadProblem = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:8048/question/get`, {
        params: { questionId: id },  // 使用params传递查询参数
      });
      currentProblem.value = response.data;
    } catch (error) {
      console.error('Error loading problem:', error);
    }
  };

  // 当用户选择某个题目时，更新 currentProblemId 并加载对应的题目
  const handleSelectProblem = (id: number) => {
    currentProblemId.value = id;
    console.log(id);
  };

  // 监听 currentProblemId 变化，自动加载对应题目
  watch(currentProblemId, (newId) => {
    if (newId) {
      loadProblem(newId);
    }
  });

  // 页面加载时调用
  onMounted(() => {
    loadProblem(currentProblemId.value);  // 初始加载时获取默认题目
  });
  
  </script>
  
  <style>  
  :root {
    --background: #1a1a2e;
    --color: #ffffff;
    --primary-color: #0f3460;
  }

  body {
    margin: 0;
    box-sizing: border-box;
    font-family: "poppins", sans-serif;
    background: var(--background);
    color: var(--color);
    letter-spacing: 1px;
    transition: background 0.2s ease;
  }

  .wrapper {
    margin-top: 50px;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-menu-vertical-demo {
    margin: 10px;
    border-radius: 10px;
    height: 98%;
  }

  .main-section {
    flex-grow: 1; 
    padding: 30px;
    display: flex;
    justify-content: space-around;
  }
  
  .problem {
    width: 45%;
  }

  .coding {
    width: 55%;
  }
  </style>
  