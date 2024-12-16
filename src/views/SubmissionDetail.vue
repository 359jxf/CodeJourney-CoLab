<template>
    <div>
      <div title="Result" width="600">
        <div v-if="submissionDetail">
          <strong>This is your No.{{ submissionDetail.attemptNum }} try:</strong>
          <ul>
            <li>Submitted at {{ submissionDetail.submitTime }} and took {{ submissionDetail.totalTime }} seconds</li>
            <li><strong>Language:</strong> {{ submissionDetail.language }}</li>
            <li><strong>State:</strong> {{ getStateMessage(submissionDetail.state) }}</li>
            <li><strong>Pass Count:</strong> {{ submissionDetail.passCount }}</li>
            <li v-if="submissionDetail.firstFailureOutput">
              <strong>First Failure Output:</strong> {{ submissionDetail.firstFailureOutput }}
            </li>
            <li><strong>Code:</strong> <pre>{{ submissionDetail.code }}</pre></li>
          </ul>
        </div>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  // 获取路由中的参数
  const route = useRoute();
  const problemId = ref<number | null>(null);
  const attemptNum = ref<number | null>(null);
  
  const submissionDetail = ref<any>(null);
  
  // 状态映射
  const stateMessages: Record<number, string> = {
    1: 'Correct',
    2: 'Compile Error',
    3: 'Wrong Answer'
  };
  
  const getStateMessage = (state: number) => {
    return stateMessages[state] || 'Unknown State';
  };
  
  // 请求并加载提交的详细信息
  const fetchSubmissionDetail = async () => {
    if (problemId.value !== null && attemptNum.value !== null) {
      try {
        const response = await axios.get(
          `http://localhost:8048/question/getSubmission?questionId=${problemId.value}&attemptNum=${attemptNum.value}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        submissionDetail.value = response.data;
      } catch (error) {
        console.error('Error fetching submission detail:', error);
        submissionDetail.value = { error: 'Failed to fetch submission details' };
      }
    }
  };
  
  // 在路由变化时更新问题ID和尝试编号
  watch(() => route.query.problemId, (newProblemId) => {
    problemId.value = Number(newProblemId);
    fetchSubmissionDetail();
  });
  
  watch(() => route.query.attemptNum, (newAttemptNum) => {
    attemptNum.value = Number(newAttemptNum);
    fetchSubmissionDetail();
  });
  
  onMounted(() => {
    // 初始化从路由获取的参数
    problemId.value = Number(route.query.problemId);
    attemptNum.value = Number(route.query.attemptNum);
    
    if (problemId.value !== null && attemptNum.value !== null) {
      fetchSubmissionDetail();
    }
  });
  </script>

<style scoped>

</style>
