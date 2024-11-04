<template>
<nav :class="['navbar', navbarClass]">
  <div class="navbar-content">
    <!-- Logo区域 -->
    <div class="logo-container">
      <img src="/unicorn.png" alt="logo" class="logo" />
      <img src="/name.png" alt="name" class="name" />
    </div>

    <!-- 导航菜单 -->
    <ul class="nav-links">
      <li v-for="(link, index) in links" :key="index">
        <router-link
          :to="link.path"
          class="nav-link"
          :class="{ active: activeIndex === index }"
          @click="setActiveIndex(index)"
          :style="{ color: activeIndex === index ? highlightColor : textColor }"
        >
          {{ link.label }}
        </router-link>
      </li>
    </ul>
  </div>
</nav>
</template>
  
  <script lang="ts" setup>
  import { ref, defineProps, onMounted, watch, onBeforeUnmount, computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const props = defineProps<{
    textColor: string; // 普通文字颜色
    highlightColor: string; // 高亮文字颜色
  }>();
  
  const route = useRoute(); // 获取当前路由
  
  // 导航链接数据
  const links = [
    { label: 'Home', path: '/' },
    { label: 'Online-Coding', path: '/basecode' },
    { label: 'Practices', path: '/normalOJ' },
    { label: 'About-Us', path: '/about' },
    { label: 'Me', path: '/profile' }
  ];
  
  // 当前激活的导航项索引
  const activeIndex = ref(0);
  const lastScrollY = ref(0); // 记录上一次滚动的位置
  const isNavbarVisible = ref(true); // 控制导航栏的可见性
  
  // 根据当前路由设置 `activeIndex`
  const setActiveIndexByRoute = () => {
    const index = links.findIndex(link => link.path === route.path);
    activeIndex.value = index !== -1 ? index : 0; // 若未找到匹配路径，则默认为第一个导航项
  };
  
  // 处理滚动事件
  const handleScroll = () => {
    if (window.scrollY > lastScrollY.value) {
      isNavbarVisible.value = false; // 下滑时隐藏导航栏
    } else {
      isNavbarVisible.value = true; // 上滑时显示导航栏
    }
    lastScrollY.value = window.scrollY; // 更新上一次滚动的位置
  };

  // 添加滚动事件监听
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    setActiveIndexByRoute(); // 初始化激活项
  });

  // 组件卸载时移除事件监听
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  // 计算类名
  const navbarClass = computed(() => {
    return isNavbarVisible.value ? '' : 'navbar-hidden';
  });

  
  // 点击时设置 `activeIndex`
  const setActiveIndex = (index: number) => {
    activeIndex.value = index;
  };
  </script>
  
  
  <style scoped>
  .navbar {
    position: fixed;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease; /* 更快的过渡时间 */
    transform: translateY(0); /* 默认显示 */
  }

  .navbar-hidden {
    transform: translateY(-100%); /* 隐藏时向上移动 */
  }


  .navbar-content {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1300px;
  }
  
  .logo-container {
    margin-right: auto;
    display: flex;
    align-items: center;  
  }
  
  .logo {
    width: 50px;
    height: auto;
  }

  .name {
    width: 100%;
    height: 25px;
    margin-bottom: -5px;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin: 0;
  }
  
  .nav-link {
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }
  
  .nav-link.active {
    font-weight: bold;
  }
  </style>
  