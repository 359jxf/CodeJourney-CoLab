import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 定义路由组件
const Home = () => import('../views/Home.vue');
const About = () => import('../views/About.vue');
const Login = () => import('../views/Login.vue');
const Register = () => import('../views/Register.vue');
const BaseCode = () => import('../views/CodeEditor.vue');
const NormalOJ = () => import('../views/NormalOJ.vue');
const MyProfile = () => import('../views/MyProfile.vue');

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
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/basecode',
    name: 'BaseCode',
    component: BaseCode
  },
  {
    path: '/normalOJ',
    name: 'NormalOJ',
    component: NormalOJ
  },
  {
    path: '/profile',
    name: 'MyProfile',
    component: MyProfile
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
