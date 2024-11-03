<template>
    <StickyNavbar
    textColor=var(--color)
    highlightColor=var(--primary-color)
    />
    <ThemeSelector :initialTheme="currentTheme" />
    <div class="user-card-container">
      <UserCard 
      :user="user"
      :activeSection="activeSection"
      @update:activeSection="setActiveSection"
      color=var(--primary-color)
      textColor=var(--color)
    />
    </div>
    <div class="motto-container">
      <Motto :motto="userMotto"
      color=var(--primary-color)
      textColor=var(--color)
      iconColor=var(--color)
      @update:motto="updateUserMotto" />
    </div>

    <div class="content-section">
      <div v-if="activeSection === 'profile'">
      <el-card class="profile-card">
        <!-- 头像和编辑图标 -->
        <div class="profile-avatar">
          <img src="/avatar.png" alt="Avatar" class="avatar" />
          <img src="/edit_icon.svg" alt="Edit Icon" class="edit-icon" @click="toggleEdit" />
        </div>

        <!-- 个人信息输入表单 -->
        <div class="profile-info">
          <div class="info-item">
            <span class="label">Nickname:</span>
            <el-input v-model="user.name" :disabled="!isEditing" placeholder="Enter your nickname" class="input"></el-input>
          </div>
          
          <div class="info-item">
            <span class="label">Gender:</span>
            <el-radio-group v-model="user.gender" size="small" :disabled="!isEditing" class="gender-group">
              <el-radio-button label="male" class="gender-radio male">Male</el-radio-button>
              <el-radio-button label="female" class="gender-radio female">Female</el-radio-button>
            </el-radio-group>
          </div>
          
          <div class="info-item">
            <span class="label">Birthday:</span>
             <!-- 使用 el-date-picker 并添加自定义图标 -->
              <el-date-picker
                v-model="user.birthday"
                type="date"
                :disabled="!isEditing"
                placeholder="Select birthday"
                class="input date-picker"
              ></el-date-picker>
          </div>

          <div class="info-item">
            <span class="label">School:</span>
            <el-input v-model="user.school" :disabled="!isEditing" placeholder="Enter your school" class="input"></el-input>
          </div>

          <div class="info-item">
            <span class="label">Github:</span>
            <el-input v-model="user.github" :disabled="!isEditing" placeholder="Enter your Github URL" class="input"></el-input>
          </div>

          <!-- 保存按钮 -->
          <el-button v-if="isEditing" type="primary" @click="saveChanges" class="save-button">Save</el-button>
        </div>
      </el-card>
    </div>
      <div v-else-if="activeSection === 'activity'">
        <div class="radar-chart-container">
          <RadarChart
          color=var(--primary-color)
           />
        </div>
        <div class="calendar-container">
          <Calendar
          color=var(--primary-color)
          textColor=var(--color)   />
        </div>  
        <div class="activities-container">
          <ActivityCard
            color=var(--primary-color)
            textColor=var(--color)
           />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import ThemeSelector from '../components/BackgroundTheme.vue';
  import StickyNavbar from '../components/Navbar.vue';
  import UserCard from '../components/UserCard.vue';
  import Motto from '../components/Motto.vue';
  import RadarChart from '../components/RadarChart.vue';
  import Calendar from '../components/Calendar.vue';

  import ActivityCard from '../components/Activities.vue';
  import { ElCard, ElTable, ElTableColumn } from 'element-plus';
  
  // 定义当前主题
  const currentTheme = ref({
    background: '#1A1A2E',
    color: '#FFFFFF',
    primaryColor: '#0F3460'
  });
  
  // 定义用户信息
  const user = ref({
    name: 'Smith',
    email: '123456@qq.com',
    nickname: 'Smithy',
    gender: 'male',
    birthday: '2000-01-01',
    school: 'Tongji University',
    github: 'https://github.com/SmithTime'
  });

  // 定义用户格言
  const userMotto = ref('Believe you can and you\'re halfway there.');

  // 更新用户格言
  const updateUserMotto = (newMotto: string) => {
      userMotto.value = newMotto;
      console.log("格言已更新为:", newMotto);
    };

  
  // 定义活动数据
  const activities = ref([
    { date: '2023-01-01', description: 'Completed task A' },
    { date: '2023-01-02', description: 'Started project B' },
    { date: '2023-01-03', description: 'Updated profile' },
  ]);

  // 定义当前激活的展示内容
  const activeSection = ref('profile');

  const isEditing = ref(false); // 控制编辑模式

  // 切换编辑模式
  const toggleEdit = () => {
    isEditing.value = !isEditing.value;
  };

  // 保存更改
  const saveChanges = () => {
    isEditing.value = false;
    console.log("Saved user data:", user.value);
    // 在此处可以调用API将数据发送到服务器
  };

  // 设置当前激活的展示内容
  const setActiveSection = (section: string) => {
    activeSection.value = section;
  };
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
  
  .user-card {
    position: absolute;
    top: 100px; /* 距离顶部 20px，可以根据需要调整 */
    left: 250px; /* 距离左侧 20px，可以根据需要调整 */
  }
  .motto-container {
    position: absolute;
    top: 100px; /* 距离顶部 20px，可以根据需要调整 */
    left: 600px; /* 距离左侧 20px，可以根据需要调整 */
  }
  .content-section{
    position: absolute;
    top:250px;
    left:600px;
    
  }
.profile-card {
  width: 650px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.edit-icon {
  position: absolute;
  bottom: 2px;
  right: calc(50% - 60px);
  width: 30px;
  height: 30px;
  background-color: #3f51b5;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
}

.label {
  font-size: 14px;
  color: #6D6D6D;
  width: 100px;
  text-align: left;
  margin-right:10px;
}

.input {
  width: 80%;
}

/* 性别选择器的样式 */
.gender-group {
  
  display: flex;
  align-items: center;
}

.gender-radio {
  margin-right: 50px; /* male 和 female 之间的间隔 */
}

.gender-radio.male.is-active .el-radio-button__inner {
  background-color: #DAEDF6; /* Male 选中时的蓝色 */
  color: #3E7FBF;
  border:none;
}

.gender-radio.female.is-active .el-radio-button__inner {
  background-color: #FBE8F1; /* Female 选中时的粉色 */
  color: #B23A7E;
  border:none;
}

.el-input__inner,
.el-date-editor .el-input__inner {
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  color: #787676;
  width: 100%;
  padding-right: 30px; /* 右边留空给日历图标 */
}

.el-radio-button__inner {
  background-color: #ececec;
  color: #626262;
  border-radius: 5px;
}

.el-radio-button__inner.is-active {
  background-color: #9299c2;
  color: #fff;
}


.save-button {
  margin-top: 20px;
  align-self: flex-end;
}
.radar-chart-container {
  position: relative;
    top: -10px;
    left: -95px;  
}
.calendar-container {
  position: relative;
    top: -140px;
    left: 180px;
}
.activities-container {
  position: relative;
    top: -250px;
    left: -9px;
}


  </style>