<template>
  <div>
    <div v-if="store.state.access && !showError">
      <div class="predict-container border-b-2 border-gray-400">
        <h3 class="predict-title">產業分析</h3>
        <dash-board class="" :perdictResult="perdictResult?.single" />
      </div>
      <div class="predict-container">
        <h3 class="predict-title">綜合分析</h3>
        <dash-board :perdictResult="perdictResult?.universal" />
      </div>
    </div>
    <div class="flex-center span-text h-6 rounded-sm bg-gray-900 font-medium" v-if="showError || !store.state.access">
      <span v-if="showError">此股票無法預測</span>
      <div v-if="!store.state.access" class="flex-center flex-col">
        <span class="mb-0.5">登入以查看股票預測</span>
        <router-link :to="{ name: 'login' }" class="rounded-sm px-1 py-0.5 text-p hover:bg-gray-800">登入</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DashBoard from '@/components/StockTools/DashBoard'
const store = useStore()
const route = useRoute()
const showError = ref(false)
const perdictResult = ref()

// ================ methods =====================

const predict = () => {
  showError.value = false
  return new Promise((resolve, reject) => {
    axios
      .get('/api/predict/', {
        params: {
          stock: route.params.stockid || '1219'
        }
      })
      .then((res) => {
        perdictResult.value = res.data.predict
        resolve()
      })
      .catch((err) => {
        showError.value = true
        reject(new Error(err.response.data))
      })
  })
}

// ================ life cycle =====================
onMounted(() => {
  predict()
})
</script>

<style lang="postcss" scoped>
.predict-container {
  @apply mb-1 h-[4rem] overflow-hidden;
}
.predict-title {
  @apply subtitle-text-sm w-fit border-l-4 border-p bg-gray-900 px-0.5;
}
</style>
