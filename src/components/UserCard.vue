<template>
    <el-card class="user-card" :style="{ backgroundColor: color }">
      <!-- 头像、名字、邮箱 -->
      <div class="user-brief-info">
        <div class="avatar">
          <img src="/avatar.png" alt="Avatar" />
        </div>
        <div class="info-item">
          <span class="name" :style="{ color: textColor } " >{{ name }}</span>
        </div>
        <div class="info-item email-container">
          <span class="email" :style="{ color: textColor }">Email:{{ email }}</span>
          <el-icon
          :style="{ cursor: 'pointer', marginLeft: '5px', color: textColor }"
          @click="openEditDialog"
        >
        <Edit />
        </el-icon>
        </div>
      </div>
  
      <!-- 我的个人资料 -->
      <div class="profile-section">
        <el-button
          type="text"
          :class="{ active: activeSection === 'profile', 'el-button-custom': true }"
          @click="setActiveSection('profile')"
        >
          <el-icon><User /></el-icon>
          My Profile
        </el-button>
      </div>
  
      <!-- 最近活动 -->
      <div class="activity-section">
        <el-button
          type="text"
          :class="{ active: activeSection === 'activity', 'el-button-custom': true }"
          @click="setActiveSection('activity')"
        >
          <el-icon><Clock /></el-icon>
          Recent Activity
        </el-button>
      </div>

       <!-- 编辑邮箱弹窗 -->
       <el-dialog title="Change email" v-model="isDialogVisible">
        <el-input v-model="email" placeholder="Please input new email address"></el-input>
        <!-- 底部按钮区域 -->
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="isDialogVisible = false">cancel</el-button>
            <el-button type="primary" @click="updateEmail">save</el-button>
        </div>
        </template>
        </el-dialog>
    </el-card>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits,ref } from 'vue';
  import { ElCard, ElButton, ElDialog, ElInput } from 'element-plus';
  import { User, Clock,Edit } from '@element-plus/icons-vue';
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  
  const props = defineProps<{
    user: {
      name: string | null;
      email: string | null;
    };
    activeSection: string;
    color: string; // 卡片颜色
    textColor: string; // 普通文字颜色
  }>();
  
  const emit = defineEmits(['update:activeSection']);
  
  const name = ref(props.user.name);
  const email = ref(props.user.email);
  const isDialogVisible = ref(false);

  const setActiveSection = (section: string) => {
    emit('update:activeSection', section);
  };
  
    const openEditDialog = () => {
        isDialogVisible.value = true;
        console.log("isDialogVisible:", isDialogVisible.value); // 调试输出
    };

    const updateEmail = async () => {
    try {
      isDialogVisible.value = false;
      
      const response = await axios.post(
        'http://localhost:8048/account/editinfo',
        {
          // 请求体的内容
          username: localStorage.getItem('username'),
          email: email.value
        },
        {
          // 请求头部分
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json', 
          }
        }
      );

      if (response.status === 200) {
        const token = response.data;

        localStorage.setItem('useremail', email.value?? ''); 
        ElMessage({
          message: 'your change is reserved.',
          type: 'success',
          duration: 3000, 
        })

      } else {
        console.error('Edit failed:', response.data);
        ElMessage({
          message: 'Edit failed!',
          type: 'error',
          duration: 3000, 
        })
      }
    } catch (error:any) {
      if (error.response) {
        // 这是 Axios 处理的响应错误
        console.log('Response error:', error.response);
        ElMessage({
          message: error.response.data|| 'An error occurred during edit.',
          type: 'error',
          duration: 3000, 
        })
      } else if (error.request) {
        // 请求已发送，但没有收到响应
        console.log('Request error:', error.request);
        ElMessage({
          message: 'No response from server.',
          type: 'error',
          duration: 3000, 
        })
      } else {
        // 其他错误
        console.log('Other error:', error.message);
        ElMessage({
          message: 'An unknown error occurred.',
          type: 'error',
          duration: 3000, 
        })
      }
    }
  };

  </script>
  
  <style scoped>
  .user-card {
    width: 305px;
    height: 348px;
    padding: 0;
    margin: 5px auto;
    border-radius: 5px;
    border-width: 0;
  }
  
  .user-brief-info {
    display: flex;
    flex-direction: column;
    align-items: center; /* 水平居中 */
    justify-content: center; /* 垂直居中 */
    margin-bottom: 10px;
  }
  
  .avatar img {
    width: 100px;
    height: 100px;
    border-radius: 10%;
  }
  
  .info-item {
    margin-bottom: 30px;
    width: auto;
  }
  
  .email-container {
    margin-top: -20px; /* 减小顶部间距 */
  display: flex;
  align-items: center;
 }

  .name {
    text-align: center;
    font-size: 23px;
    font-weight: bold;
    padding-bottom: 2px;
  }
  
  .email {
    font-size: 15px;

  }
  
  .el-button-custom {
    margin-left: -20px;
    width: 115%;
    text-align: left;
    border-radius: 0;
    transition: background-color 0.3s, color 0.3s;
    background-color: #fff; /* 默认背景 */
    color: #757575; /* 默认文字颜色 */
    font-weight: 400;
    font-size: 14px;
    line-height:16.94px;
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    padding: 25px 0px; 
    position: relative;
  }
  
  .el-button-custom.active {
    background-color: #EBEBEB; /* 选中时的背景颜色 */
    color: #757575; /* 选中时的文字颜色 */
  }
  
  .el-button-custom.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: var(--primary-color); /* 选中时的竖栏颜色 */
    border-radius: 2px 0 0 2px;
  }
  
  .el-icon {
    margin-right: 8px;
    color: #757575;
  }

  .dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
  border-top: 1px solid #ebeef5;
  margin-top: 20px;
}

.dialog-footer .el-button {
  margin-left: 10px;
}
  </style>
  