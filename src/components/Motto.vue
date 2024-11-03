<template>
    <!-- 卡片结构 -->
    <el-card class="motto-card" >
      <!-- Head 区域 -->
      <div class="head" :style="{ backgroundColor: color }"></div>
  
      <!-- Content 区域 -->
      <div class="content">
        <span class="motto-text" >{{ motto }}</span>
        <img 
        src="/edit_motto.svg" 
        alt="Edit" 
        class="edit-icon"
        @click="openEditDialog"
      />
      </div>
  
      <!-- 编辑弹窗 -->
      <el-dialog
        title="编辑格言"
        v-model="isDialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-input v-model="newMotto" placeholder="请输入新的格言"></el-input>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="isDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="updateMotto">保存</el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, ref } from 'vue';
  import { ElMessageBox } from 'element-plus';
  import { Edit } from '@element-plus/icons-vue';
  
  const props = defineProps<{
    motto: string; // 格言内容
    color: string; // 头部颜色
    textColor: string; // 文字颜色
    iconColor: string; // 编辑图标颜色
  }>();
  
  const emit = defineEmits(['update:motto']);
  
  const isDialogVisible = ref(false); // 控制弹窗显示
  const newMotto = ref(props.motto); // 用于编辑的新格言
  
  // 打开编辑弹窗
  const openEditDialog = () => {
    isDialogVisible.value = true;
  };
  
  // 更新格言并关闭弹窗
  const updateMotto = () => {
    emit('update:motto', newMotto.value); // 触发更新事件
    isDialogVisible.value = false;
  };
  
  // 弹窗关闭前的确认逻辑
  const handleClose = (done: () => void) => {
    ElMessageBox.confirm('确认关闭吗？')
      .then(() => {
        done(); // 用户确认关闭
      })
      .catch(() => {
        // 用户取消关闭
      });
  };
  </script>
  
  <style scoped>
  .motto-card {
    display:flexbox;
    width: 700px;
    height: 110px; /* 父元素固定高度 */
    border-radius: 5px;
    overflow: hidden;
    border: none;
    padding: 0;
    margin: 5px auto;
    background-color:#818181;
    
  }
  .head {
    position:relative;
    top:-20px;
    left:-20px;
    margin-bottom: 7px;
    width: 110%;
    height: 50px;
    border:none;
  }
  
  .content {
    top:-20px;
    left:-20px;
    width: 102%;
    height: 25px;
    margin:0;
    display: flex;
    align-items: center;
    padding: 15px;
    position: relative;
    background-color: #ffffff;
  }
  
  .motto-text {
    margin: 0;
    flex: 1;
    font-size: 16px;
    color:#818181
  }
  
  .edit-icon {
    cursor: pointer;
    position: relative;
    margin-left: 0px;
    width: 15px; 
    height: 15px; /* 设置图标大小 */
  }
  
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
  }
  </style>
  