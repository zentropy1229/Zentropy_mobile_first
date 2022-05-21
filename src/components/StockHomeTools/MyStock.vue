<template>
  <div>
    <h2 class="subtitle-text mb-0.5">我的自選股</h2>
    <slim-stock-table :stockInfo="stockInfo" :routerInfo="routerInfo" v-if="store.state.access" />
    <div class="span-text flex-center h-4 w-full flex-col rounded-sm bg-gray-900 font-bold" v-else>
      <span>登入以加入自選股</span>
      <router-link :to="{ name: 'login' }" class="rounded-sm px-1 py-0.5 text-p hover:bg-gray-800">登入</router-link>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { useStore } from 'vuex'
import { watch, computed, ref } from '@vue/runtime-core'
import SlimStockTable from '@/components/StockTools/SlimStockTable'
// ================== refs ==========================
const store = useStore()
const stockInfo = ref()
const routerInfo = ref({
  name: 'memberInfo'
})
// ================== Methods =======================
const getStockData = () => {
  const stocks = myFavStock.value.slice(-5).join(',')
  return new Promise((resolve, reject) => {
    axios.get('/api/stock_name/getmfs/', { params: { stocks, sort: '-stock__favoriteStock__updated' } }).then((res) => {
      stockInfo.value = res.data
    })
  })
}
// ================== computed ======================
const myFavStock = computed(() => {
  return store.state.userInfo.favoriteStocks
})
// ================== life-cycle ====================
watch(myFavStock, getStockData)
</script>

<style lang="postcss" scoped></style>
