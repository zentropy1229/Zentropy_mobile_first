<template>
  <div class="text-white">
    <!-- table -->
    <stock-table
      class="mb-0.5 w-full"
      :tableTitle="stockTitle"
      :tableDetail="stockInfo"
      :isLoading="isLoading"
      @orderList="orderList"
      v-if="getPaginator"
    />
    <!-- page -->
    <div class="ml-auto flex">
      <button
        v-for="page of getPaginator"
        :key="page"
        class="flex-center h-2 w-2 border bg-gray-900 text-white"
        @click="nowPage = page"
      >
        {{ page }}
      </button>
    </div>
    <!-- no content -->
    <div class="rounded-sm bg-gray-900 py-2 text-center" v-if="!getPaginator">
      <span>沒有自選股! 趕快來選股去</span>
      <a href="/stock" class="rounded-sm px-1 py-0.5 text-p hover:bg-gray-800">股票首頁</a>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { useStore } from 'vuex'
import { watch, computed, ref } from '@vue/runtime-core'
import StockTable from '@/components/StockHomeTools/StockTable'
// ================== refs ==========================
const column = ref('')
const nowPage = ref(1)
const stockInfo = ref()
const store = useStore()
const reverseColumn = ref('')
const isLoading = ref(false)
const stockTitle = ref({
  price: '股價',
  ud: '漲跌',
  udpercent: '漲跌幅(%)',
  open: '開盤',
  yesterday: '昨收',
  high: '最高',
  low: '最低',
  volumn: '成交量(張)'
})
// ================== Methods =======================
const orderList = (col) => {
  column.value = col
  reverseColumn.value = reverseColumn.value === '-' ? '' : '-'
}
const getStockData = () => {
  const stocks = myFavStock.value.join(',')
  return new Promise((resolve, reject) => {
    isLoading.value = true
    axios
      .get('/api/stock_name/orderData/?offset=0', {
        params: { stocks, col: column.value, reverse: reverseColumn.value, limit: 50 },
        headers: {
          Authorization: ''
        }
      })
      .then((res) => {
        stockInfo.value = res.data.results.slice((nowPage.value - 1) * 10, nowPage.value * 10)
        isLoading.value = false
        resolve()
      })
      .catch((err) => {
        isLoading.value = false
        reject(err.message)
      })
  })
}
// ================== computed ======================
const getPaginator = computed(() => {
  const pageSize = 10
  const totalStocks = store.state.userInfo.favoriteStocks?.length
  const totalPage = Math.ceil(totalStocks / pageSize)
  return totalPage || 0
})
const myFavStock = computed(() => {
  return store.state.userInfo.favoriteStocks
})
// ================== life-cycle ====================
watch([myFavStock, nowPage, column, reverseColumn], getStockData)
</script>
<style lang="postcss" scoped></style>
