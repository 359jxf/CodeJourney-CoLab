<template>
    <div>
      <!-- 运行测试按钮 -->
      <div class="btn">
        <el-button @click="runTests" type="primary">Submit</el-button>
      </div>
      <!-- 弹窗 -->
      <el-dialog v-model="dialogVisible" title="result" width="600">
        <div v-if="testResults.length">
          <ul>
            <li v-for="(result, index) in testResults" :key="index">
              {{ result.message }}
            </li>
          </ul>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">close</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, defineProps } from 'vue';
  
  // 接收从父组件传递的 props
  const props = defineProps<{
    code: string;
    selectedLanguage: string;
    problemId: number;  // 接收题号
  }>();
  
  // 本地状态
  const dialogVisible = ref(false);  // 控制弹窗的显示
  const testResults = ref<{ message: string }[]>([]);  // 存储测试结果
  
  // 当前题目信息
  interface TestCase {
    input: any[];
    expectedOutput: any;
  }
  
  interface Problem {
    id: number;
    title: string;
    description: string;
    testCases: TestCase[];
  }
  
  const currentProblem = ref<Problem | null>(null);
  
  // 从 JSON 文件加载题目
  const loadProblem = async (problemId: number) => {
    const response = await fetch('/problems.json');
    const problems: Problem[] = await response.json();
    currentProblem.value = problems.find(p => p.id === problemId) || null;
  };
  
  // Pyodide 实例
  let pyodide: any = null;
  
  // 加载 Pyodide 用于运行 Python 代码
  onMounted(async () => {
    const pyodideScript = document.createElement("script");
    pyodideScript.src = "https://cdn.jsdelivr.net/pyodide/v0.23.0/full/pyodide.js";
    pyodideScript.onload = async () => {
      pyodide = await (window as any).loadPyodide();
      console.log("Pyodide 已加载");
    };
    document.body.appendChild(pyodideScript);
  
    // 首次加载题目
    await loadProblem(props.problemId);
  });
  
  // 运行用户代码并与测试用例进行比较
  const runTests = async () => {
    if (!currentProblem.value || !pyodide) return;
  
    testResults.value = [];  // 重置测试结果
  
    try {
      // 将用户输入的代码和测试用例一起执行
      for (const [index, testCase] of currentProblem.value.testCases.entries()) {
        try {
          // 将测试用例的输入设置为全局变量 `args`
          pyodide.globals.set("args", testCase.input);
  
          // 捕获用户代码的标准输出
          await pyodide.runPythonAsync(`
            import sys
            from io import StringIO
            sys.stdout = StringIO()
          `);
  
          // 运行用户的代码
          await pyodide.runPythonAsync(props.code);
  
          // 获取用户代码的输出
          const result = await pyodide.runPythonAsync(`
            sys.stdout.getvalue()
          `);
  
          // 比较结果 (去除换行符，确保格式一致)
          const trimmedResult = result.trim();
          const expectedOutput = String(testCase.expectedOutput).trim();
  
          if (trimmedResult === expectedOutput) {
            testResults.value.push({ message: `testcase ${index + 1}: pass ✅` });
          } else {
            testResults.value.push({ message: `testcase ${index + 1}: not passed ❌（excepted: ${expectedOutput}, received: ${trimmedResult}）` });
          }
        } catch (err) {
          testResults.value.push({ message: `testcase ${index + 1}: There was an error running ❌（error: ${err}）` });
        }
      }
      // 显示弹窗
      dialogVisible.value = true;
    } catch (error) {
      testResults.value.push({ message: `There was an error running: ${error}` });
      dialogVisible.value = true;  // 显示错误信息的弹窗
    }
  };
  </script>
  
  <style scoped>
  .btn {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
  }

  .dialog-footer {
    text-align: right;
  }
  </style>
  