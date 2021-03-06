<template>
  <div class="flex flex-col bg-gray-800">
    <div class="mt-1 text-white">
      <!-- hot stocks -->
      <div class="container">
        <h2 class="subtitle-text ml-1 mb-1">熱門股票一覽</h2>
        <div class="relative mb-1 flex overflow-x-auto rounded-sm bg-gray-900" ref="daliyHotChartDom">
          <svg
            class="absolute bottom-1 right-1 z-10 h-2 w-2 animate-pulse text-white/20 lg:hidden"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 448 512"
            v-if="!startScroll"
          >
            <path
              d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z"
            />
          </svg>
          <daliy-hot-charts v-for="hotStock of hotStocks" :key="hotStock" :searchStockNum="hotStock" class="w-full" />
          <loading-icon class="mx-auto p-1" :isLoading="isLoading" />
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
          <stock-search class="mb-1.5" />
          <my-stock class="mb-1" ref="myStockDom" />
          <h2 class="subtitle-text mb-0.5">熱門新聞</h2>
          <hot-news class="mb-1 bg-gray-900 px-0.5 py-1.5" ref="news" :showSeeAll="true" />
        </div>
        <!-- right container -->
        <div class="ml-0 w-full lg:ml-auto lg:max-w-[68%]">
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
            ref="stockTables"
            @orderList="orderList"
            class="mb-1"
          />
          <div class="span-text mb-3 text-center tracking-wider text-slate-400">
            <span v-show="next">滾到底以加載更多</span>
            <span v-show="!next">已經到底了</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, ref, watchPostEffect, watch, computed } from 'vue'
import getCurrentTime from '@/utils/getCurrentTime'
import MyStock from '@/components/StockHomeTools/MyStock'
import HotNews from '@/components/StockHomeTools/HotNews'
import StockTable from '@/components/StockHomeTools/StockTable'
import StockSearch from '@/components/StockHomeTools/StockSearch'
import LoadingIcon from '@/components/smallComponents/LoadingIcon'
import StockCatagory from '@/components/StockHomeTools/StockCatagory'
import BigMarketChart from '@/components/StockHomeTools/BigMarketChart'
import DaliyHotCharts from '@/components/StockHomeTools/DaliyHotCharts'
// ================== define dom =====================
const daliyHotChartDom = ref()
// ================== define route store ===================
const route = useRoute()
const store = useStore()
// ================== define ref =====================
const news = ref()
const next = ref('')
const myStockDom = ref()
const hotStocks = ref([])
const orderColumn = ref('')
const updatedTime = ref('')
const isLoading = ref(false)
const stockDetails = ref([])
const reverseColumn = ref('')
const startScroll = ref(false)
const stockTables = ref()
const industrySelectorActive = ref(false)
const industryFromRoute = computed(() => {
  return route.query.industry || ''
})
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
/**
 * @param {Number} limit 要取幾個熱門股票
 */
const getHotStocks = (limit) => {
  return new Promise((resolve, reject) => {
    isLoading.value = true
    axios
      .get('/api/stock_name/volumn', {
        headers: {
          Authorization: ''
        },
        params: {
          limit: limit
        }
      })
      .then((res) => {
        for (const stockSerise of res.data.results) {
          hotStocks.value.push(stockSerise.stockId)
        }
        resolve()
      })
      .then(() => {
        isLoading.value = false
      })
      .catch(() => {
        isLoading.value = false
        window.location.href = '/404'
        reject(new Error('not Found'))
      })
  })
}
// order list
const orderList = (index) => {
  orderColumn.value = index
  reverseColumn.value = reverseColumn.value === '-' ? '' : '-'
}
// start filter stock by catagory
const startFilter = (isUpdate) => {
  // prevent double start
  startScroll.value = true
  setTimeout(() => {
    startScroll.value = false
  }, 1000)
  // if not update clear stockDetail, else keep stockDetail
  if (!isUpdate) {
    stockDetails.value = []
    next.value = '/api/stock_name/orderData/?offset=0'
  }
  if (next.value) {
    stockTables.value.isLoading = true
    return new Promise((resolve, reject) => {
      axios
        .get(next.value, {
          params: { col: orderColumn.value, industry: route.query.industry || '', reverse: reverseColumn.value },
          headers: {
            Authorization: ''
          }
        })
        .then((res) => {
          if (res.data.results.length) {
            stockDetails.value = stockDetails.value.concat(res.data.results)
            next.value = res.data.next
            updatedTime.value = getCurrentTime()
            stockTables.value.isLoading = false
            resolve()
          } else {
            stockDetails.value = []
            window.location.replace('/404')
          }
        })
        .catch(() => {
          window.location.replace('/404')
        })
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
          industry: industryFromRoute.value,
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
  updatedTime.value = getCurrentTime()
  return getRealPrice
}
// scroll loading function
const scrollLoding = () => {
  const st = window.scrollY
  const wh = document.documentElement.clientHeight
  const dh = document.documentElement.scrollHeight
  if (Math.floor(dh - st - wh) < 100 && !startScroll.value) {
    if (next.value !== null) {
      startFilter(true)
    }
  }
}
// for mobile scrolling X
const startScrolling = () => {
  const x = daliyHotChartDom.value.scrollLeft
  x > 0 ? (startScroll.value = true) : (startScroll.value = false)
}
// ================== lifecycle =====================
onMounted(() => {
  // get initial data
  store.commit('setIsLoading', true)
  Promise.all([getHotStocks(4), startFilter(false), news.value.getNewsDetail(), myStockDom.value.updateStock()]).then(
    () => {
      store.commit('setIsLoading', false)
    }
  )

  // watch change
  watch([route, orderColumn, reverseColumn], () => {
    if (route.name === 'stockHome') {
      startFilter(false)
    }
  })
  // scroll update and minutes updated
  watchPostEffect((onInvalidate) => {
    // get lastest updated price (per minutes)
    const realTimePrice = setInterval(getRealPrice, 60000)
    // scrolling detect to load more data
    window.addEventListener('scroll', scrollLoding)
    daliyHotChartDom.value.addEventListener('scroll', startScrolling)
    onInvalidate(() => {
      window.removeEventListener('scroll', scrollLoding)
      daliyHotChartDom.value.removeEventListener('scroll', startScrolling)
      clearInterval(realTimePrice)
    })
  })
})
</script>

<style lang="postcss" scoped></style>
