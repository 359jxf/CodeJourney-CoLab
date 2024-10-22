import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     // 添加 Codemirror 5 的路径别名，确保 Vite 可以正确解析模块
  //     'codemirror': 'codemirror/lib/codemirror.js',
  //   },
  // },
});
