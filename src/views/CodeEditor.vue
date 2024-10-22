<template>
  <div>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LanguageAndThemeSelector from '../components/LanguageAndThemeSelector.vue'; // 导入 LanguageAndThemeSelector 组件
import CodeRunner from '../components/CodeRunner.vue'; // 导入 CodeRunner 组件

// 管理在 Main 组件中共享的状态
const code = ref<string>("");  // 保存编辑器中的代码
const selectedLanguage = ref<string>("javascript");  // 保存用户选择的语言
</script>
