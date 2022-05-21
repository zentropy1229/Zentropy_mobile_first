<template>
  <div>
    <h2 class="subtitle-text mb-0.5">我的自選股</h2>
    <div class="span-text w-full rounded-sm bg-gray-900 font-medium" v-if="store.state.access">
      <table class="w-full">
        <thead>
          <tr class="span-text-sm border-b-2 border-gray-400">
            <th class="h-2 w-6 px-0.5 text-left">股名 / 代號</th>
            <th class="h-2 px-0.5 text-right">股價</th>
            <th class="h-2 px-0.5 text-right">漲跌</th>
            <th class="h-2 px-0.5 text-right">成交量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stockInfo in stockInfo" :key="stockInfo" class="border-b border-gray-500">
            <td class="h-2.5 w-4 px-0.5 text-left">
              <router-link
                :to="{ name: 'stock', params: { stockid: stockInfo.stock.stock } }"
                class="block font-medium text-p hover:text-white"
                >{{ stockInfo.stock.stockName }}</router-link
              >
              <span class="span-text-sm text-gray-300">{{ stockInfo.stock.stock }}.TW</span>
            </td>
            <td class="h-2 px-0.5 text-right font-bold">{{ stockInfo.price }}</td>
            <td class="h-2 px-0.5 text-right font-bold">{{ stockInfo.ud }}</td>
            <td class="h-2 px-0.5 text-right font-bold">{{ stockInfo.volumn }}</td>
          </tr>
        </tbody>
      </table>
      <div class="w-full p-0.5 text-right">
        <a class="span-text-sm hover:text-orange-300" href="javascript:">查看全部...</a>
      </div>
    </div>
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
// ================== refs ==========================
const store = useStore()
const stockInfo = ref()
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
