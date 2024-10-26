import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 导入路由
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// 将所需的 FontAwesome 图标添加到库中
library.add(faUserSecret);

const app = createApp(App);

// 注册 FontAwesomeIcon 组件
app.component('font-awesome-icon', FontAwesomeIcon);

// 使用 Element Plus
app.use(ElementPlus);
app.use(router); // 使用路由

app.mount('#app');
