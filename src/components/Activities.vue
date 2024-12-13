<template>
    <div class="wrapper-2">
      <div class="title">
        <h2>Practice Record</h2>
      </div>
      <div class="table">
        <el-table :data="filterTableData" :border="parentBorder" height="340" style="width: 100%">
          <el-table-column type="expand">
            <template #default="props">
              <div m="4">
                <el-table :data="props.row.record" :border="childBorder">
                  <el-table-column label="Date" prop="date" />
                  <el-table-column
                    prop="result"
                    label="Result"
                    >
                      <template #default="scope">
                        <el-tag
                        :type="scope.row.result === 'correct' ? 'success' : 'danger' "
                        disable-transitions
                        >{{ scope.row.result }}</el-tag
                        >
                      </template>
                  </el-table-column>
                  <el-table-column label="Language" prop="language" />
                  <el-table-column align="right">
                    <template #default="scope">
                      <el-button type="primary" text="true" size="small" @click="handleMore(scope.$index, scope.row)">
                        More
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="Status"
            width="100"
            >
              <template #default="scope">
                <el-tag
                :type="scope.row.status === 'passed' ? 'success' : 'danger' "
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
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const parentBorder = ref(false)
  const childBorder = ref(false)
  
  interface User {
    status: string
    title: string
    tag: string
    record: object
  }
  
  const search = ref('')
  
  const filterTableData = computed(() =>
    tableData.filter(
      (data) =>
        !search.value ||
        data.title.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  const handleMore = (index: number, row: User) => {
    router.push('/normalOJ')
  }
  
  const tableData: User[] = [
    {
      status: 'failed',
      title: 'No. 182',
      tag: 'moderate',
      record: [
        {
          date: '2022-11-11',
          result: 'wrong answer',
          language: 'python',
        },
        {
          date: '2022-11-11',
          result: 'wrong answer',
          language: 'python',
        },
      ]
    },
    {
      status: 'passed',
      title: 'No. 121',
      tag: 'easy',
      record: [
        {
          date: '2022-11-10',
          result: 'correct',
          language: 'python',
        }
      ]
    },
  ]
  </script>
  
  
  <style scoped>
  
  .wrapper-2 {
    height: 430px;
    padding: 10px;
    background-color: white;
    border-radius: 10px;
  }

  .title h2 {
    padding-bottom: 15px;
    color: #5d5d5d;
    border-bottom:1px solid #cccccc;
  }

  .table {
    /* height: 300px;
    overflow-y: scroll; */
  }
  </style>