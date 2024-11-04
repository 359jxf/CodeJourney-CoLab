<template>
    <section class="container">
      <div class="register-container">
        <div class="circle circle-one"></div>
        <div class="form-container">
          <div style="display: flex;justify-content: space-between;">
            <h1 class="opacity" style="font-size: 30px;">REGISTER</h1>
            <ModelViewer />
          </div>
          <form @submit.prevent="handleRegister">
            <input
              type="text"
              v-model="username"
              placeholder="USERNAME"
              class="register-container form-input"
            />
            <input
              type="password"
              v-model="password"
              placeholder="PASSWORD"
              class="register-container form-input"
            />
            <input
              type="password"
              v-model="password"
              placeholder="VERIFY PASSWORD"
              class="register-container form-input"
            />
            <input
              type="email"
              v-model="password"
              placeholder="EMAIL"
              class="register-container form-input"
            />
            <input
              type="text"
              v-model="password"
              placeholder="OTP"
              class="register-container form-input"
            />
            <button class="register-container form-button opacity" @click="handleRegister">SUBMIT</button>
          </form>
          <div class="register-forget opacity">
            <router-link to="/login" @click.prevent="$emit('login')">LOGIN</router-link>
            <a href="#" @click.prevent="$emit('forgot-password')">FORGOT PASSWORD</a>
          </div>
        </div>
        <div class="circle circle-two"></div>
      </div>
      <!-- 引入 ThemeSelector 组件并传入初始主题 -->
      <ThemeSelector :initialTheme="currentTheme" />
    </section>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import ThemeSelector from '../components/BackgroundTheme.vue';
  import ModelViewer from '../components/ModelViewer.vue';
  import { useRouter } from 'vue-router';
  
  // 定义当前主题
  const currentTheme = ref({
    background: '#1A1A2E',
    color: '#FFFFFF',
    primaryColor: '#0F3460'
  });
  
  const username = ref('');
  const password = ref('');
  
  const router = useRouter(); // 获取路由实例
  const handleRegister = () => {
    console.log('Logging in with:', username.value, password.value);
    router.push('/');
  };
  </script>
  
  <style>
  :root {
    --background: #1a1a2e;
    --color: #ffffff;
    --primary-color: #0f3460;
  }
  
  * {
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    margin: 0;
    box-sizing: border-box;
    font-family: "poppins", sans-serif;
    background: var(--background);
    color: var(--color);
    letter-spacing: 1px;
    transition: background 0.2s ease;
  }
  
  a {
    text-decoration: none;
    color: var(--color);
  }
  
  h1 {
    font-size: 2.5rem;
  }
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .register-container {
    position: relative;
    width: 22.2rem;
  }
  
  .form-container {
    border: 1px solid hsla(0, 0%, 65%, 0.158);
    box-shadow: 0 0 36px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    backdrop-filter: blur(20px);
    z-index: 99;
    padding: 2rem;
  }
  
  .register-container .form-input {
    display: block;
    padding: 14.5px;
    width: 100%;
    margin: 2rem 0;
    color: var(--color);
    outline: none;
    background-color: #9191911f;
    border: none;
    border-radius: 5px;
    font-weight: 500;
    letter-spacing: 0.8px;
    font-size: 15px;
    backdrop-filter: blur(15px);
  }
  
  .register-container .form-input:focus {
    box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.2);
    animation: wobble 0.3s ease-in;
  }
  
  .register-container .form-button {
    background-color: var(--primary-color);
    color: var(--color);
    display: block;
    padding: 13px;
    border-radius: 5px;
    outline: none;
    font-size: 18px;
    letter-spacing: 1.5px;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    margin-bottom: 2rem;
    transition: all 0.1s ease-in-out;
    border: none;
  }
  
  .register-container .form-button:hover {
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.15);
    transform: scale(1.02);
  }
  
  .circle {
    width: 8rem;
    height: 8rem;
    background: var(--primary-color);
    border-radius: 50%;
    position: absolute;
  }
  
  .illustration {
    position: absolute;
    top: -14%;
    right: -2px;
    width: 90%;
  }
  
  .circle-one {
    top: 0;
    left: 0;
    z-index: -1;
    transform: translate(-45%, -45%);
  }
  
  .circle-two {
    bottom: 0;
    right: 0;
    z-index: -1;
    transform: translate(45%, 45%);
  }
  
  .register-forget {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
  }
  
  .opacity {
    opacity: 0.6;
  }
  
  @keyframes wobble {
    0% {
      transform: scale(1.025);
    }
    25% {
      transform: scale(1);
    }
    75% {
      transform: scale(1.025);
    }
    100% {
      transform: scale(1);
    }
  }
  
  </style>