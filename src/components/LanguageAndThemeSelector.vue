<template>
  <div class="flex">
    <div class="selector">
      <!-- 语言选择器 -->
      <div>
        <label for="language">language：</label>
        <el-select v-model="localSelectedLanguage" placeholder="language" size="large" style="width: 240px" @change="updateCM">
          <el-option
            v-for="item in languageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <!-- 主题选择器 -->
      <div>
        <label for="theme">theme：</label>
        <el-select v-model="selectedTheme" placeholder="theme" size="large" style="width: 240px" @change="updateCM">
          <el-option
            v-for="item in themeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <!-- CodeMirror 编辑器 -->
    <codemirror
      :key="editorKey"
      v-model="localCode"
      placeholder="Code goes here..."
      :style="{ width: '800px', height: '400px' }"
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

// 语言和主题的选择项
const languageOptions = [
  { value: 'python', label: 'Python' },
  // 你可以在这里加入更多的语言
];

const themeOptions = [
  { value: 'oneDark', label: 'One Dark' },
  { value: 'customLight', label: 'Custom Light' },
];

// CodeMirror 扩展配置
let extensions = [python(), oneDark];

const languageExtensions: Record<string, any> = {
  python: python(),
  // 可以添加其他语言扩展
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
  updateCM(); // 当语言发生变化时，更新编辑器
});

watch(localCode, () => {
  emit('update:code', localCode.value);
});
</script>

<style scoped>
.flex {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}

.selector {
  display: flex;
  text-align: center;
  justify-content: space-around;
  gap:10px;
}

</style>
