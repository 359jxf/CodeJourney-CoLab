<template>
    <div class="card-container">
      <!-- 上部：标题部分 -->
      <div class="card-header">
        <h2>Latest Works</h2>
      </div>
      
      <!-- 中部：按钮部分 -->
      <div class="tab-buttons">
        <button 
          v-for="tab in tabs" 
          :key="tab" 
          @click="activeTab = tab"
          :class="{ active: activeTab === tab }"
          :style="getButtonStyle(tab)"
        >
          {{ tab }}
        </button>
      </div>
      
      <!-- 下部：表格部分 -->
      <div class="table-container">
        <el-table :data="filteredActivities" style="width: 100%">
          <el-table-column label="#" width="50">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="description" label="Description"></el-table-column>
          <el-table-column prop="date" label="Date" width="120"></el-table-column>
        </el-table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { defineProps } from 'vue';
  const props = defineProps<{
    color: string; // 卡片颜色
    textColor: string; // 普通文字颜色
  }>();

  // 定义标签和活动数据
  const tabs = ['Practices', 'Projects', 'Competitions'];
  const activeTab = ref(tabs[0]);

  // 获取按钮样式的方法
    const getButtonStyle = (tab) => {
    if (activeTab.value === tab) {
        // 如果按钮被选中，使用 Props 中的颜色和文字颜色
        return {
        backgroundColor: props.color,
        color: props.textColor,
        };
    }
    // 如果按钮未被选中，返回默认样式
    return {};
    };
  
  // 活动数据，假设包含了各个标签的数据
  const activities = ref([
    { tab: 'Practices', description: 'Add two numbers', date: '2024/10/31' },
    { tab: 'Practices', description: 'Add two matrix', date: '2024/10/31' },
    { tab: 'Projects', description: 'Build a calculator', date: '2024/11/01' },
    { tab: 'Projects', description: 'Build a calculator', date: '2024/11/01' },
    { tab: 'Projects', description: 'Build a calculator', date: '2024/11/01' },
    { tab: 'Projects', description: 'Build a calculator', date: '2024/11/01' },
    { tab: 'Projects', description: 'Build a calculator', date: '2024/11/01' },
    { tab: 'Projects', description: 'Build a calculator', date: '2024/11/01' },
    { tab: 'Projects', description: 'Build a calculator', date: '2024/11/01' },
    { tab: 'Projects', description: 'Build a calculator', date: '2024/11/01' },
    { tab: 'Competitions', description: 'Hackathon', date: '2024/11/02' },
    { tab: 'Competitions', description: 'Hackathon', date: '2024/11/02' },
    { tab: 'Competitions', description: 'Hackathon', date: '2024/11/02' },
    { tab: 'Competitions', description: 'Hackathon', date: '2024/11/02' },
    { tab: 'Competitions', description: 'Hackathon', date: '2024/11/02' },
    { tab: 'Competitions', description: 'Hackathon', date: '2024/11/02' },
    { tab: 'Competitions', description: 'Hackathon', date: '2024/11/02' },
    { tab: 'Competitions', description: 'Hackathon', date: '2024/11/02' },
  ]);
  
  // 过滤活动数据，基于当前选中的标签
  const filteredActivities = computed(() =>
    activities.value.filter(activity => activity.tab === activeTab.value)
  );
  </script>
  
  <style scoped>
  .card-container {
    width: 700px;
    margin: 20px auto;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .card-header {
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  
  .card-header h2 {
    font-size: 18px;
    color: #BABABA;
    font-weight: bold;
    margin: 0;
  }
  
  .tab-buttons {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
  }
  
  .tab-buttons button {
    background: none;
    border: none;
    font-size: 16px;
    padding: 8px 15px;
    cursor: pointer;
    color: #888888;
    transition: color 0.3s, background-color 0.3s;
  }
  
  .tab-buttons button.active {
    color: #ffffff;
    background-color: #3f51b5;
    border-radius: 5px;
  }
  
  .tab-buttons button:not(.active):hover {
    color: #3f51b5;
  }
  
  .table-container {
    max-width: 100%;
  }
  </style>
  