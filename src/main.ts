import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

// 使用 Element Plus
app.use(ElementPlus);

app.use(router); // 使用路由
app.mount('#app');

