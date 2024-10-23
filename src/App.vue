<template>
  <div id="app">
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect">
      <el-menu-item index="0">
        <img
          style="width: 50px"
          src="/vite.svg"
          alt="logo"
        />
      </el-menu-item>
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/basecode">Online Coding</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/normalOJ">Practices</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/about">About Us</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/profile">Me</router-link>
      </el-menu-item>
    </el-menu>

    <router-view /> <!-- 路由视图 -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
