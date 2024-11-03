import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 定义路由组件
const Home = () => import('../views/Home.vue');
const About = () => import('../views/About.vue');
const Login = () => import('../views/Login.vue');

// 定义路由
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
     path: '/basecode',
    name: 'Basecode',
    component: About 
  }, // 替换为实际组件
  {
     path: '/normalOJ',
    name: 'NormalOj',
     component: About 
  } // 替换为实际组件
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
