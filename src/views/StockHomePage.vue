<template>
  <div class="flex flex-col bg-gray-800">
    <div class="mt-1 text-white">
      <!-- hot stocks -->
      <div class="container">
        <h2 class="subtitle-text ml-1 mb-1">熱門股票一覽</h2>
        <div class="mb-1 flex rounded-sm bg-gray-900">
          <daliy-hot-charts :searchStockNum="'1219'" class="w-full" />
          <daliy-hot-charts :searchStockNum="'2330'" class="w-full" />
          <daliy-hot-charts :searchStockNum="'6807'" class="w-full" />
          <daliy-hot-charts :searchStockNum="'3025'" class="w-full" />
        </div>
      </div>
      <!-- big market -->
      <div class="container mb-1">
        <big-market-chart />
      </div>
      <!-- stockTable & news -->
      <div class="span-text container flex w-full flex-col lg:flex-row">
        <!-- left container -->
        <div class="w-full lg:w-[30%]">
          <h2 class="subtitle-text mb-0.5">台股搜尋</h2>
          <stock-search class="mb-1" />
          <my-stock class="mb-1" />
          <h2 class="subtitle-text mb-0.5">熱門新聞</h2>
          <hot-news class="mb-1 bg-gray-600 px-0.5 py-1.5" :showSeeAll="true" />
        </div>
        <!-- right container -->
        <div class="ml-0 w-full lg:ml-2 lg:w-[70%]">
          <stock-catagory
            :industrySelectorActive="industrySelectorActive"
            @changeSelectorState="industrySelectorActive = $event"
          />
          <div class="mb-1 text-[0.12rem]">
            <p class="text-gray-400">更新時間：每分鐘更新一次</p>
            <p class="text-gray-400">資料更新時間：{{ updatedTime }}</p>
          </div>
          <stock-table
            :tableTitle="stockTitle"
            :tableDetail="stockDetails"
            :isLoading="isLoading"
            @orderList="orderList"
            class="mb-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { DateTime } from 'luxon'
import { useRoute } from 'vue-router'
import { onMounted, ref, watchPostEffect, watch } from 'vue'
import BigMarketChart from '@/components/StockHomeTools/BigMarketChart'
import StockSearch from '@/components/StockHomeTools/StockSearch'
import MyStock from '@/components/StockHomeTools/MyStock'
import HotNews from '@/components/StockHomeTools/HotNews'
import StockTable from '@/components/StockHomeTools/StockTable'
import DaliyHotCharts from '@/components/StockHomeTools/DaliyHotCharts'
import StockCatagory from '@/components/StockHomeTools/StockCatagory'
// ================== define let =====================

// ================== define route ===================
const route = useRoute()
// ================== define ref =====================
const next = ref('')
const orderColumn = ref('')
const reverseColumn = ref('')
const updatedTime = ref('')
const stockDetails = ref([])
const isLoading = ref(false)
const industrySelectorActive = ref(false)
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
// ================== Methods ========================
// order list
const orderList = (index) => {
  orderColumn.value = index
  reverseColumn.value = reverseColumn.value === '-' ? '' : '-'
}
const setCurrentTime = () => {
  updatedTime.value = DateTime.now().toFormat('yyyy年MM月dd日 HH時mm分ss秒')
}
// start filter stock by catagory
const startFilter = (isUpdate) => {
  // if not update clear stockDetail, else keep stockDetail
  if (!isUpdate) {
    stockDetails.value = []
    next.value = '/api/stock_name/orderData?offset=0'
  }
  isLoading.value = true
  if (next.value) {
    axios
      .get(next.value, {
        params: { col: orderColumn.value, industry: route.query.industry, reverse: reverseColumn.value }
      })
      .then((res) => {
        stockDetails.value = stockDetails.value.concat(res.data.results)
        next.value = res.data.next
        setCurrentTime()
        isLoading.value = false
      })
      .catch(() => {
        stockDetails.value = []
        isLoading.value = false
        window.location.href = '/404'
      })
  }
}
// get real and now price
const getRealPrice = async function () {
  let updateValue = []
  try {
    const iterateTimes = Math.ceil(stockDetails.value.length / 30) ? Math.ceil(stockDetails.value.length / 30) : 1
    for (let i = 0; i < iterateTimes; i++) {
      const res = await axios.get('/api/stock_name/orderData', {
        params: {
          col: orderColumn.value,
          industry: route.query.industry,
          reverse: reverseColumn.value,
          offset: i * 30
        },
        headers: {
          Authorization: ''
        }
      })
      updateValue = updateValue.concat(res.data.results)
      next.value = res.data.next
    }
  } catch {
    updateValue = stockDetails.value
  }
  stockDetails.value = updateValue
  setCurrentTime()
  return getRealPrice
}
// scroll loading function
const scrollLoding = () => {
  const st = window.scrollY
  const wh = document.documentElement.clientHeight
  const dh = document.documentElement.scrollHeight
  if (!Math.floor(dh - st - wh)) {
    if (next.value !== null) {
      startFilter(true)
    }
  }
}
// ================== lifecycle =====================
onMounted(() => {
  // get initial data
  // getRealPrice()
  // after route change clear data and get new data
  // startFilter(false)
  watch(
    [route, orderColumn, reverseColumn],
    () => {
      startFilter(false)
    },
    { immediate: true }
  )
  // click to hide industry selector
  watchPostEffect((onInvalidate) => {
    // get lastest updated price (per minutes)
    const realTimePrice = setInterval(getRealPrice, 60000)
    // scrolling detect to load more data
    window.addEventListener('scroll', scrollLoding)
    onInvalidate(() => {
      window.removeEventListener('scroll', scrollLoding)
      clearInterval(realTimePrice)
    })
  })
})
</script>

<style lang="postcss" scoped></style>
