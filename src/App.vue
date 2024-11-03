<template>
  <div id="app">
    <nav>
      <router-link to="/"></router-link>
      <router-link to="/about"></router-link>
    </nav>
    <router-view /> <!-- 路由视图 -->
  </div>
</template>

<script lang="ts">
import CustomAlert from './components/CustomAlert.vue';

export default {
  name: 'App'
}
</script>

<style>
nav {
  margin-bottom: 20px;
}
</style>
