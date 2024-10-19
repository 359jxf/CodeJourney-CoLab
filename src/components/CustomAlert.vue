<template>
    <el-alert
      v-if="visible"
      :title="title"
      :type="type"
      :description="description"
      show-icon
      @close="handleClose"
    />
  </template>
  
  <script setup lang="ts">
  import { defineProps, ref } from 'vue';
  
  const props = defineProps<{
    title: string;
    type: 'success' | 'info' | 'warning' | 'error'; // 限制警告类型
    description?: string; // 描述可以为可选
    showClose?: boolean; // 是否显示关闭按钮
  }>();
  
  const visible = ref(true); // 控制警告框的显示状态
  
  // 处理关闭事件
  const handleClose = () => {
    visible.value = false;
  };
  </script>
  
  <style scoped>
  .el-alert {
    margin: 20px 0 0;
  }
  .el-alert:first-child {
    margin: 0;
  }
  </style>
  