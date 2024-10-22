<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于我们</router-link>
    </nav>
    <router-view /> <!-- 路由视图 -->
  </div>
</template>

<script lang="ts">

export default {
  name: 'App'
}
</script>

<style>
nav {
  margin-bottom: 20px;
}
</style>
