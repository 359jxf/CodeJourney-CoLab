<template>
  <section class="features">
    <h2>A Selection of Recommended Features for Users to Try</h2>
    <div class="features-grid">
      <div v-for="feature in features" :key="feature.name" class="feature-button" @click="navigateTo(feature.route)">
        <div class="icon-container">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 18C0.5 8.33502 8.33502 0.5 18 0.5C27.665 0.5 35.5 8.33502 35.5 18C35.5 27.665 27.665 35.5 18 35.5C8.33502 35.5 0.5 27.665 0.5 18Z" fill="#2C2C2C"/>
            <path d="M0.5 18C0.5 8.33502 8.33502 0.5 18 0.5C27.665 0.5 35.5 8.33502 35.5 18C35.5 27.665 27.665 35.5 18 35.5C8.33502 35.5 0.5 27.665 0.5 18Z" stroke="#2C2C2C" stroke-linecap="round"/>
            <path d="M18 9.66667L20.575 14.8833L26.3333 15.725L22.1667 19.7833L23.15 25.5167L18 22.8083L12.85 25.5167L13.8333 19.7833L9.66666 15.725L15.425 14.8833L18 9.66667Z" stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="feature-text">{{ feature.name }}</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FeaturesSection',
  setup() {
    const router = useRouter();
    const features = ref([
      { name: "Interactive Teaching", route: "/basecode" },
      { name: "Team Projects", route: "/basecode" },
      { name: "Free Exploration", route: "/basecode" },
      { name: "Team Competitions", route: "/normalOJ" },
      { name: "Individual Practice", route: "/normalOJ" },
      { name: "Peer Code Review", route: "/" }
    ]);

    const navigateTo = (route: string) => {
      router.push(route); // 使用路由导航
    };

    return {
      features,
      navigateTo
    };
  }
});
</script>

<style scoped>
.features {
  text-align: center;
  padding: 40px 20px;
  background-color: #1a2b5f;
  color: white;
}

.features-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.feature-button {
  background-color: white;
  color: #333;
  padding: 20px;
  border-radius: 5px;
  width: 150px;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px; /* Space between icon and text */
}

.feature-text {
  margin-top: 5px; /* Add some space above the text */
}
</style>
