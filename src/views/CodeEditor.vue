<template>
  <StickyNavbar
    textColor=var(--color)
    highlightColor=var(--primary-color)
  />
  <UserList />
  <div class="wrapper">
    <h1 class="title">Ready for Code Exploration!</h1>
    <div class="inner-wrapper">
      <div class="code-section">
        <!-- 语言选择器和主题选择器以及代码编辑器 -->
        <LanguageAndThemeSelector
          v-model:code="code"
          v-model:selectedLanguage="selectedLanguage"
          height= "500px"
          width="900px"
          color=var(--primary-color)
          textColor=var(--color)
        />

        <!-- 代码运行器 -->
        <CodeRunner
          :code="code"
          :selectedLanguage="selectedLanguage"
          height= "180px"
          width="900px"
          color=var(--primary-color)
          textColor=var(--color)
        />
      </div>
      <div class="chat-section">
        <ChatApp
          height= "770px"
          width="300px"
          color=var(--primary-color)
          textColor=var(--color)
        />
      </div>
    </div>
  </div>
  <ThemeSelector :initialTheme="currentTheme" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LanguageAndThemeSelector from '../components/LanguageAndThemeSelector.vue'; // 导入 LanguageAndThemeSelector 组件
import CodeRunner from '../components/CodeRunner.vue'; // 导入 CodeRunner 组件
import ThemeSelector from '../components/BackgroundTheme.vue';
import StickyNavbar from '../components/Navbar.vue';
import UserList from '../components/PeopleList.vue';
import ChatApp from '../components/ChatApp.vue';

// 定义当前主题
const currentTheme = ref({
  background: '#1A1A2E',
  color: '#FFFFFF',
  primaryColor: '#0F3460'
});

// 管理在 Main 组件中共享的状态
const code = ref<string>("");  // 保存编辑器中的代码
const selectedLanguage = ref<string>("python");  // 保存用户选择的语言
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
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}

.inner-wrapper {
  display: flex;
  justify-content: center; 
  align-items: center;   
  border-radius: 10px; 
  padding: 10px;
  gap: 10px;
}

.code-section {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;  
}

.chat-section {

}

.title {
  color: var(--color);
}
</style>