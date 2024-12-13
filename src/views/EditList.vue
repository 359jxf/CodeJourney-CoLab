<template>
    <StickyNavbar
      textColor="var(--color)"
      highlightColor="var(--primary-color)"
    />
    <ThemeSelector :initialTheme="currentTheme" />
    <div class="wrapper">
      <div class="wrapper-2">
      <div class="title">
        <h1>Latest Works</h1>
        <div>
            <el-button
                class="invited-button"
                size="large"
                type="plain"
                :icon="Checked"
                @click=""
            >
                Invited
            </el-button>
            <el-button
                class="add-button"
                size="large"
                type="primary"
                :icon="Plus"
                @click=""
            >
                Add New
            </el-button>
        </div>
      </div>
      <div class="table">
        <el-table :data="filterTableData" stripe="true" style="width: 100%">
          <el-table-column label="Date" prop="date" />
          <el-table-column label="Host" prop="name" />
          <el-table-column label="File" prop="file" />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                Edit
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                Delete
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
  import { ElMessageBox } from 'element-plus' // 引入 ElMessageBox
  import { Plus, Checked } from '@element-plus/icons-vue'
  // 定义当前主题
  const currentTheme = ref({
    background: '#1A1A2E',
    color: '#FFFFFF',
    primaryColor: '#0F3460'
  })
  const router = useRouter()
  
  interface User {
    date: string
    name: string
    file: string
  }
  
  const search = ref('')
  const filterTableData = computed(() =>
    tableData.filter(
      (data) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase()) ||
        data.file.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  
  const handleEdit = (index: number, row: User) => {
    router.push('/basecode')
  }
  
  const handleDelete = (index: number, row: User) => {
    ElMessageBox.confirm(
      'Are you sure you want to delete this item?', // 提示信息
      'Confirm Deletion', // 标题
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
      .then(() => {
        // 用户确认删除，删除对应的数据行
        tableData.splice(index, 1);
        console.log(`Deleted: ${row.name}`);
      })
      .catch(() => {
        // 用户取消删除，做相应的处理
        console.log('Deletion canceled');
      });
  };
  
  const tableData: User[] = [
    {
      date: '2016-05-03',
      name: 'Tom',
      file: 'No. 189',
    },
    {
      date: '2016-05-02',
      name: 'John',
      file: 'No. 181',
    },
    {
      date: '2016-05-04',
      name: 'Morgan',
      file: 'No. 182',
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      file: 'No. 121',
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

  .invited-button .el-icon {
    color: #5d5d5d;
  }

  .add-button .el-icon {
    color: #fff;
  }
  
  .table {
    padding: 10px;
    background-color: white;
    border-radius: 10px;
  }
  </style>
  