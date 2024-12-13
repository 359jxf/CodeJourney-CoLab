<template>
    <StickyNavbar
      textColor="var(--color)"
      highlightColor="var(--primary-color)"
    />
    <ThemeSelector :initialTheme="currentTheme" />
    <div class="wrapper">
      <div class="wrapper-2">
      <div class="title">
        <h1>Problem List</h1>
      </div>
      <div class="table">
        <el-table :data="filterTableData" stripe="true" style="width: 100%">
          <el-table-column
            prop="status"
            label="Status"
            width="100"
            :filters="[
                { text: 'passed', value: 'passed' },
                { text: 'failed', value: 'failed' },
                { text: 'no attempt', value: 'no attempt' },
            ]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
            >
              <template #default="scope">
                <el-tag
                :type="scope.row.status === 'passed' ? 'success' : (scope.row.status === 'failed' ? 'danger' : 'info')"
                disable-transitions
                >{{ scope.row.status }}</el-tag
                >
              </template>
          </el-table-column>
            
          <el-table-column label="Title" prop="title" />
          <el-table-column
            prop="tag"
            label="Tag"
            width="100"
            :filters="[
                { text: 'hard', value: 'hard' },
                { text: 'moderate', value: 'moderate' },
                { text: 'easy', value: 'easy' },
            ]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
            >
              <template #default="scope">
                <el-tag
                :type="scope.row.tag === 'hard' ? 'warning' : (scope.row.tag === 'moderate' ? 'primary' : 'success')"
                disable-transitions
                >{{ scope.row.tag }}</el-tag
                >
              </template>
            </el-table-column>

          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
              <el-button type="primary" text="true" size="small" @click="handleTry(scope.$index, scope.row)">
                Try
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import ThemeSelector from '../components/BackgroundTheme.vue'
  import StickyNavbar from '../components/Navbar.vue'
  // 定义当前主题
  const currentTheme = ref({
    background: '#1A1A2E',
    color: '#FFFFFF',
    primaryColor: '#0F3460'
  })
  const router = useRouter()
  
  interface User {
    status: string
    title: string
    tag: string
  }
  
  const search = ref('')
  const filterTableData = computed(() =>
    tableData.filter(
      (data) =>
        !search.value ||
        data.title.toLowerCase().includes(search.value.toLowerCase()) 
    )
  )

  const filterStatus = (value: string, row: User) => {
    return row.status === value
  }

  const filterTag = (value: string, row: User) => {
    return row.tag === value
  }
  
  const handleTry = (index: number, row: User) => {
    router.push('/normalOJ')
  }
  
  const tableData: User[] = [
    {
      status: 'no attempt',
      title: 'waewe',
      tag: 'hard'
    },
    {
      status: 'no attempt',
      title: 'No. 181',
      tag: 'hard'
    },
    {
      status: 'failed',
      title: 'No. 182',
      tag: 'moderate'
    },
    {
      status: 'passed',
      title: 'No. 121',
      tag: 'easy'
    },
  ]
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
  
  .wrapper {
    display: flex;
    flex-direction: column;
  }

  .wrapper-2 {
    margin: 12vh 12vw 12vh 12vw;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content:space-between;
  }

  .table {
    padding: 10px;
    background-color: white;
    border-radius: 10px;
  }
  </style>
  