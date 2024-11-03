<template>
    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="prevMonth">&lt;</button>
        <span>{{ currentMonthYear }}</span>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="calendar-weekdays">
        <span v-for="day in weekDays" :key="day">{{ day }}</span>
      </div>
      <div class="calendar-days">
        <span v-for="day in blankDays" :key="'blank-' + day"></span>
        <span
          v-for="day in daysInMonth"
          :key="day"
          :class="{ 'today': isToday(day), 'selected': isSelected(day) }"
          @click="selectDate(day)"
          :style="getDayStyle(day)"
        >
          {{ day }}
        </span>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { defineProps } from 'vue';
  const props = defineProps<{
    color: string; // 卡片颜色
    textColor: string; // 普通文字颜色
  }>();

  // 获取日期样式的方法
    const getDayStyle = (day: number) => {
    if (isSelected(day)) {
        return {
        backgroundColor: props.color, // 使用传入的 color 作为背景色
        color: props.textColor, // 使用传入的 textColor 作为文字颜色
        };
    }
    return {};
    };
  // 日期数据
  const currentDate = ref(new Date());
  const selectedDate = ref(new Date());
  
  // 星期标题
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // 当前月年份显示
  const currentMonthYear = computed(() =>
    currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  );
  
  // 获取当月的天数
  const daysInMonth = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    return new Date(year, month + 1, 0).getDate();
  });
  
  // 获取月份的第一天是星期几
  const blankDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    return new Date(year, month, 1).getDay();
  });
  
  // 切换到上个月
  const prevMonth = () => {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1);
  };
  
  // 切换到下个月
  const nextMonth = () => {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1);
  };
  
  // 判断是否是今天
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.value.getMonth() === today.getMonth() &&
      currentDate.value.getFullYear() === today.getFullYear()
    );
  };
  
  // 判断是否是选中的日期
  const isSelected = (day: number) => {
    return (
      day === selectedDate.value.getDate() &&
      currentDate.value.getMonth() === selectedDate.value.getMonth() &&
      currentDate.value.getFullYear() === selectedDate.value.getFullYear()
    );
  };
  
  // 选择日期
  const selectDate = (day: number) => {
    selectedDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day);
  };
  </script>
  
  <style scoped>
  .calendar-container {
    width: 250px;
    height: 250px;
    background-color: #e8e8e8;
    border-radius: 10px;
    padding: 10px;
    text-align: center;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .calendar-header button {
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    font-size: 18px;
  }
  
  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: 12px;
    color: #888;
    margin-bottom: 5px;
  }
  
  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  
  .calendar-days span {
    display: inline-block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .calendar-days span.today {
    background-color: #d89081;
    color: white;
  }
  
  .calendar-days span.selected {
    

    color: white;
  }
  
  .calendar-days span:hover {
    background-color: #d0d0d0;
  }
  </style>
  