<template>
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="title">用户登录</h2>
        <el-form :model="form" @submit.native.prevent="handleLogin">
          <el-form-item label="用户名" :rules="usernameRules">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              required
            />
          </el-form-item>
          <el-form-item label="密码" :rules="passwordRules">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              required
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleLogin">登录</el-button>
          </el-form-item>
        </el-form>
        <el-alert
          v-if="alert.visible"
          :title="alert.message"
          :type="alert.type"
          show-icon
          @close="alert.visible = false"
        />
      </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const form = ref({
    username: '',
    password: '',
  });
  
  const alert = ref({
    visible: false,
    message: '',
    type: '',
  });
  
  const usernameRules = [{ required: true, message: '用户名不能为空', trigger: 'blur' }];
  const passwordRules = [{ required: true, message: '密码不能为空', trigger: 'blur' }];
  
  const handleLogin = async () => {
    // 模拟后端登录逻辑
    const { username, password } = form.value;
  
    if (username === 'admin' && password === 'password') {
      alert.value = {
        visible: true,
        message: '登录成功!',
        type: 'success',
      };
      // 这里可以执行成功后的操作，例如跳转到首页
      console.log('登录成功');
    } else {
      alert.value = {
        visible: true,
        message: '用户名或密码错误',
        type: 'error',
      };
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-card {
    width: 400px;
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  