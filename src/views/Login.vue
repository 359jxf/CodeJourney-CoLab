<template>
  <section class="container">
    <div class="login-container">
      <div class="circle circle-one"></div>
      <div class="form-container">
        <div style="display: flex;justify-content: space-between;">
          <h1 class="opacity">LOGIN</h1>
          <ModelViewer />
        </div>
        <form @submit.prevent="handleLogin">
          <input
            type="text"
            v-model="identity"
            placeholder="USERNAME OR EMAIL"
            class="login-container form-input"
          />
          <input
            type="password"
            v-model="password"
            placeholder="PASSWORD"
            class="login-container form-input"
          />
          <button class="login-container form-button opacity">SUBMIT</button>
        </form>
        <div class="register-forget opacity">
          <router-link to="/register" @click.prevent="$emit('register')">REGISTER</router-link>
          <a href="#" @click.prevent="$emit('forgot-password')">FORGOT PASSWORD</a>
        </div>
      </div>
      <div class="circle circle-two"></div>
    </div>
    <router-link to="/">
      <el-button
        type="primary"
        link
      >
        Continue as Guest
      </el-button>
    </router-link>
    <!-- 引入 ThemeSelector 组件并传入初始主题 -->
    <ThemeSelector :initialTheme="currentTheme" />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ThemeSelector from '../components/BackgroundTheme.vue';
import ModelViewer from '../components/ModelViewer.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
  }
}


// 定义当前主题
const currentTheme = ref({
  background: '#1A1A2E',
  color: '#FFFFFF',
  primaryColor: '#0F3460'
});

const identity = ref('');
const password = ref('');

const router = useRouter(); // 获取路由实例

// const handleLogin = async () => {
//   try {
//     // 发送登录请求
//     const response = await axios.post('http://localhost:8048/account/login', {
//       identity: identity.value,
//       password: password.value,
//     });

//     if (response.status === 200) {
//       // 登录成功，获取 token
//       const token = response.data.token;
//       localStorage.setItem('token', token); 
//       const role = response.data.role;
//       localStorage.setItem('role', role); 
//       ElMessage({
//         message: 'Login Successful!',
//         type: 'success',
//         duration: 3000, 
//       })

//       // 使用 token 进行 getInfo 请求
//       const response2 = await axios.get('http://localhost:8048/account/getinfo', {
//         headers: {
//           'Authorization': `Bearer ${token}`  // 添加 token 到请求头
//         }
//       });
//       let username = response2.data.username; 
//       let useremail = response2.data.email; 
//       localStorage.setItem('username', username); 
//       localStorage.setItem('useremail', useremail); 
//       console.log('GetInfo successful:', response2.data);

//       // 跳转到首页
//       router.push('/');
//     } else {
//       console.error('Login failed:', response.data);
//       ElMessage({
//         message: 'Login failed!',
//         type: 'error',
//         duration: 3000, 
//       })
//     }
//   } catch (error:any) {
//     if (error.response) {
//       // 这是 Axios 处理的响应错误
//       console.log('Response error:', error.response);
//       ElMessage({
//         message: error.response.data|| 'An error occurred during login.',
//         type: 'error',
//         duration: 3000, 
//       })
//     } else if (error.request) {
//       // 请求已发送，但没有收到响应
//       console.log('Request error:', error.request);
//       ElMessage({
//         message: 'No response from server.',
//         type: 'error',
//         duration: 3000, 
//       })
//     } else {
//       // 其他错误
//       console.log('Other error:', error.message);
//       ElMessage({
//         message: 'An unknown error occurred.',
//         type: 'error',
//         duration: 3000, 
//       })
//     }
//   }
// };

// 测试用的简单登录逻辑
const handleLogin = async () => {
  const testUsername = 'testuser';
  const testPassword = 'testpassword';
  const useremail = "test@test.com"; 

  if (identity.value === testUsername && password.value === testPassword) {
    // 登录成功
    ElMessage({
      message: 'Login Successful!',
      type: 'success',
      duration: 3000,
    });
    localStorage.setItem('username', testUsername); 
    localStorage.setItem('useremail', useremail); 
    // 模拟跳转到首页
    router.push('/');
  } else {
    // 登录失败
    ElMessage({
      message: 'Invalid username or password!',
      type: 'error',
      duration: 3000,
    });
  }
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 5px;
}

.login-container {
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

.login-container .form-input {
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

.login-container .form-input:focus {
  box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.2);
  animation: wobble 0.3s ease-in;
}

.login-container .form-button {
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

.login-container .form-button:hover {
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