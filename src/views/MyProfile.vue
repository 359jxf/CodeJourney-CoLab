<template>
    <StickyNavbar
    textColor=var(--color)
    highlightColor=var(--primary-color)
    />

    <ThemeSelector :initialTheme="currentTheme" />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import ThemeSelector from '../components/BackgroundTheme.vue';
  import StickyNavbar from '../components/Navbar.vue';
  
  // 定义当前主题
  const currentTheme = ref({
    background: '#1A1A2E',
    color: '#FFFFFF',
    primaryColor: '#0F3460'
  });
  
  </script>
  
  <style>
  :root {
    --background: #1a1a2e;
    --color: #ffffff;
    --primary-color: #0f3460;
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

  </style>