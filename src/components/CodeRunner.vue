<template>
  <div class="container">
    <div class="btn">
      <el-button @click="runCode" type="success">Run</el-button>
    </div>
    <el-tabs type="border-card" style="width: 800px;height: 180px;">
      <!-- 参数输入 -->
      <el-tab-pane label="input">
        <el-input
          id="parameters"
          v-model="parameters"
          placeholder="parameters..."
          style="margin-top: 10px; width: 100%; height: 100px;"
        />
      </el-tab-pane>

      <!-- 显示结果 -->
      <el-tab-pane label="output">
        <div>
          <pre>{{ result }}</pre>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';

// 接收从父组件传递的 props
const props = defineProps<{
  code: string;
  selectedLanguage: string;
}>();

// 本地状态
const parameters = ref<string>("");
const result = ref<string>("");

// Pyodide 实例
let pyodide: any = null;

// 加载 Pyodide
onMounted(async () => {
  const pyodideScript = document.createElement("script");
  pyodideScript.src = "https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js";
  pyodideScript.onload = async () => {
    pyodide = await (window as any).loadPyodide();
    console.log("Pyodide 已加载");
  };
  document.body.appendChild(pyodideScript);
});

// 运行代码
const runCode = async () => {
  try {
    const parsedArgs = eval(parameters.value) as any[];
    if (props.selectedLanguage === "javascript") {
      result.value = new Function('arr', props.code)(parsedArgs);
    } else if (props.selectedLanguage === "python" && pyodide) {
      pyodide.globals.set("args", parsedArgs);

      await pyodide.runPythonAsync(`
        import sys
        from io import StringIO
        sys.stdout = StringIO()
      `);

      await pyodide.runPythonAsync(props.code);

      const output = pyodide.runPython(`sys.stdout.getvalue()`);
      result.value = output || "no output";
    } else {
      result.value = `The language ${props.selectedLanguage} is not supported by now`;
    }
  } catch (err) {
    result.value = `There was an error running: ${err}`;
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}

.btn {
  display: flex;
  margin: 10px;
}
</style>
