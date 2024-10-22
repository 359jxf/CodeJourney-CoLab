<template>
  <div>
    <!-- 语言选择器 -->
    <label for="language">选择语言：</label>
    <select id="language" v-model="localSelectedLanguage" @change="updateCM">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
    </select>

    <!-- 主题选择器 -->
    <label for="theme">选择主题：</label>
    <select id="theme" v-model="selectedTheme" @change="updateCM">
      <option value="oneDark">One Dark</option>
      <option value="customLight">Custom Light</option>
    </select>

    <!-- CodeMirror 编辑器 -->
    <codemirror
      :key="editorKey"
      v-model="localCode"
      placeholder="Code goes here..."
      :style="{ width: '1000px', height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Codemirror } from "vue-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";

// Props 接收从父组件传递过来的数据
const props = defineProps<{ 
  code: string;
  selectedLanguage: string;
}>();

// Emit 用于向父组件发送更新事件
const emit = defineEmits<{
  (e: 'update:code', value: string): void;
  (e: 'update:selectedLanguage', value: string): void;
}>();

// 使用 ref 作为局部变量，以防止直接修改 props
const localCode = ref(props.code);  // 代码
const localSelectedLanguage = ref(props.selectedLanguage);  // 选择的语言
const selectedTheme = ref<string>("oneDark");  // 默认主题
const editorKey = ref(0);  // 用于强制重新渲染编辑器

let extensions = [javascript(), oneDark];

const languageExtensions: Record<string, any> = {
  javascript: javascript(),
  python: python(),
};

const themeExtensions: Record<string, any> = {
  oneDark: oneDark,
  customLight: EditorView.theme({
    "&": {
      color: "#000000",
      backgroundColor: "#ffffff"
    },
    ".cm-content": {
      caretColor: "#000000",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#000000",
    },
    ".cm-activeLine": {
      backgroundColor: "#f0f0f0",
    },
    ".cm-gutters": {
      backgroundColor: "#ffffff",
      color: "#999999",
      borderRight: "1px solid #ddd"
    }
  }),
};

// 更新 CodeMirror 的扩展
const updateCM = () => {
  extensions = [
    languageExtensions[localSelectedLanguage.value],
    themeExtensions[selectedTheme.value],
  ];
  editorKey.value++;  // 强制重新渲染
};

// 监听局部变量的变化，并通过 emit 事件将更新传递回父组件
watch(localSelectedLanguage, () => {
  emit('update:selectedLanguage', localSelectedLanguage.value);
});

watch(localCode, () => {
  emit('update:code', localCode.value);
});
</script>
