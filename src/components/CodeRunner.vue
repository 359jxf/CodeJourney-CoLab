<template>
    <div>
      <!-- 参数输入 -->
      <label for="parameters">输入参数：</label>
      <input id="parameters" v-model="parameters" placeholder="parameters..." />
  
      <!-- 运行按钮 -->
      <button @click="runCode">运行代码</button>
  
      <!-- 显示结果 -->
      <div>
        <h3>运行结果：</h3>
        <pre>{{ result }}</pre>
      </div>
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
        result.value = output || "无输出";
      } else {
        result.value = `该语言 ${props.selectedLanguage} 暂时不支持运行`;
      }
    } catch (err) {
      result.value = `运行出错: ${err}`;
    }
  };
  </script>
  