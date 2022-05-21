<template>
  <div>
    <slim-stock-table :stockInfo="stockInfo" :routerInfo="routerInfo" v-if="!error" />
    <span class="span-text bg-gray-900 px-1 py-0.5 font-medium text-white" v-else>出錯了，請重新整理！</span>
  </div>
</template>

<script setup>
import axios from 'axios'
import SlimStockTable from '@/components/StockTools/SlimStockTable'
import { ref, toRef, defineProps, onMounted, watch } from 'vue'
const props = defineProps({
  industry: {
    type: String,
    required: true
  }
})
const error = ref(false)
const stockInfo = ref()
const industry = toRef(props, 'industry')
const routerInfo = ref({
  name: 'stockHome',
  query: {
    industry: industry.value
  }
})
const getStockData = () => {
  const queryData = {
    industry: industry.value,
    col: 'volumn',
    limit: 10,
    offset: 0,
    reverse: '-'
  }
  return new Promise((resolve, reject) => {
    error.value = false
    axios
      .get('/api/stock_name/orderData/', { params: queryData })
      .then((res) => {
        stockInfo.value = res.data.results
        resolve()
      })
      .catch((err) => {
        error.value = true
        reject(new Error(err))
      })
  })
}
onMounted(() => {
  watch(industry, getStockData)
})
</script>
