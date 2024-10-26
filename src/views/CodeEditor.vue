<template>
  <div class="wrapper">
    <StickyNavbar
      textColor=var(--color)
      highlightColor=var(--primary-color)
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
  <ThemeSelector :initialTheme="currentTheme" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LanguageAndThemeSelector from '../components/LanguageAndThemeSelector.vue'; // 导入 LanguageAndThemeSelector 组件
import CodeRunner from '../components/CodeRunner.vue'; // 导入 CodeRunner 组件
import ThemeSelector from '../components/BackgroundTheme.vue';
import StickyNavbar from '../components/Navbar.vue';

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
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
</style>