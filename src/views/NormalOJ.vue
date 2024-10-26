<template>
    <section class="wrapper">
      <StickyNavbar
        textColor=var(--color)
        highlightColor=var(--primary-color)
      />
      <div  class="container">
        <!-- 侧边导航栏 -->
        <Sidebar
          :problems="problems"
          :currentProblemId="currentProblemId"
          @updateProblem="handleSelectProblem"
        />
    
        <!-- 主内容区 -->
        <div class="main-section">
          <!-- 显示题目信息 -->
          <div class="problem" v-if="currentProblem">
            <h2>{{ currentProblem.title }}</h2>
            <p>{{ currentProblem.description }}</p>
            <div style="display: flex; gap:5px">
              <el-tag type="primary">Tag 1</el-tag>
              <el-tag type="success">Tag 2</el-tag>
              <el-tag type="warning">Tag 4</el-tag>
              <el-tag type="danger">Tag 5</el-tag>
          </div>
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
            />
    
            <!-- 代码运行器 -->
            <CodeRunner
              :code="code"
              :selectedLanguage="selectedLanguage"
            />
          </div>
        </div>
      </div>
      <ThemeSelector :initialTheme="currentTheme" />
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import LanguageAndThemeSelector from '../components/LanguageAndThemeSelector.vue'; 
  import CodeRunner from '../components/CodeRunner.vue'; 
  import CodeReviewer from '../components/CodeReviewer.vue'; 
  import ThemeSelector from '../components/BackgroundTheme.vue';
  import StickyNavbar from '../components/Navbar.vue';
  import Sidebar from '../components/Sidebar.vue';

  // 定义当前主题
  const currentTheme = ref({
    background: '#1A1A2E',
    color: '#FFFFFF',
    primaryColor: '#0F3460'
  });
  
  // 管理在 Main 组件中共享的状态
  const code = ref<string>("");  // 保存编辑器中的代码
  const selectedLanguage = ref<string>("python");  // 保存用户选择的语言
  const currentProblemId = ref<number>(3);  // 当前选中的题目 ID
  const currentProblem = ref<{ title: string; description: string } | null>(null);  // 当前题目信息
  const problems = ref<{ id: number; title: string; description: string }[]>([]);  // 所有题目信息列表
  
  // 从 JSON 文件加载题目信息
  const loadProblems = async () => {
    const response = await fetch('/problems.json');
    const data = await response.json();
    problems.value = data;
    currentProblem.value =
      problems.value.find((problem) => problem.id === currentProblemId.value) || null;
  };

  // 当用户选择某个题目时，更新 currentProblemId 并加载对应的题目
  const handleSelectProblem = (id: number) => {
    currentProblemId.value = id;
    currentProblem.value =
      problems.value.find((problem) => problem.id === currentProblemId.value) || null;
  };
  
  // 页面加载时调用
  onMounted(() => {
      loadProblems();
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
    width: 500px;
  }

  .coding {

  }
  </style>
  