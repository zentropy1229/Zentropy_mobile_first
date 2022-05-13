<template>
  <div class="flex flex-col bg-gray-800">
    <div class="container w-full"><chart-show /></div>
    <div class="span-text container w-full text-white lg:flex">
      <div class="w-full lg:w-[70%]">
        <h2 class="subtitle-text mb-0.5">上市{{ industryName }}分類行情</h2>
        <div class="relative z-30 mb-0.5 w-max rounded-sm bg-gray-600">
          <div class="flex-center flex h-2.5 cursor-pointer px-1" id="industrySelector" @click.stop.prevent="industrySelectorActive = !industrySelectorActive">
            <span class="text-gray-200">產業別：{{ industryName }}</span>
            <button class="ml-1">
              <svg class="block h-0.5 w-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
                <path
                  d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
                />
              </svg>
            </button>
          </div>
          <div
            class="industry-filter absolute h-16 w-16 origin-top overflow-y-scroll rounded-sm border border-gray-400 bg-gray-600 p-1 shadow-lg transition-all lg:h-max lg:w-36 lg:overflow-y-hidden"
            :class="{
              'scale-y-1 opacity-1': industrySelectorActive,
              'scale-y-0 opacity-0': !industrySelectorActive
            }"
          >
            <ul class="flex h-max flex-wrap gap-[0.2rem]">
              <li v-for="catagory in catagoryContent" :key="catagory">
                <a
                  href="#"
                  @click.prevent="startFilter(catagory.industry, false)"
                  class="block rounded-sm bg-gray-200 px-1 py-0.5 text-center text-gray-900 hover:bg-orange-300"
                  >{{ catagory.industry }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-1 text-[0.12rem]">
          <p class="text-gray-400">更新時間：每分鐘更新一次</p>
          <p class="text-gray-400">資料更新時間：{{ updatedTime }}</p>
        </div>
        <stock-table :tableTitle="stockTitle" :tableDetail="stockDetails" :isLoading="isLoading" class="mb-4" />
      </div>
      <div class="ml-0 w-full lg:ml-2 lg:w-[30%]">
        <stock-search class="mb-1" ref="search" />
        <my-stock class="mb-1" />
        <hot-news class="mb-1" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import ChartShow from '@/components/StockHomeTools/ChartShow'
import StockSearch from '@/components/StockHomeTools/StockSearch'
import MyStock from '@/components/StockHomeTools/MyStock'
import HotNews from '@/components/StockHomeTools/HotNews'
import StockTable from '@/components/StockHomeTools/StockTable'
import axios from 'axios'
let industrySelectorBlur
let realTimePrice
let scrollLoding
let next
const { DateTime } = require('luxon')
const search = ref()
const updatedTime = ref('')
const catagoryContent = ref('')
const industryName = ref('其他電子業')
const industrySelectorActive = ref(false)
const isLoading = ref(false)
const stockDetails = ref([])
const stockTitle = ref(['股價', '漲跌', '漲跌幅(%)', '開盤', '昨收', '最高', '最低', '成交量(張)'])
// ================== Methods =====================
const startFilter = (industryType, isUpdate) => {
  function sleep () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 800)
    })
  }
  if (!isUpdate) {
    industrySelectorActive.value = false
    stockDetails.value = []
    next = '/api/stock_name?page=1'
  }
  industryName.value = industryType
  isLoading.value = true
  axios
    .get(next, {
      params: { industry: industryName.value },
      headers: {
        Authorization: ''
      }
    })
    .then(async (res) => {
      await sleep()
      stockDetails.value = stockDetails.value.concat(res.data.results)
      next = res.data.next
      isLoading.value = false
    })
    .catch(() => {
      stockDetails.value = []
      isLoading.value = false
    })
  console.log('awdadad')
}
const getRealPrice = async function () {
  let updateValue = []
  try {
    const iterateTimes = Math.ceil(stockDetails.value.length / 30) ? Math.ceil(stockDetails.value.length / 30) : 1
    for (let i = 1; i <= iterateTimes; i++) {
      const res = await axios.get('/api/stock_name', {
        params: { industry: industryName.value, page: i },
        headers: {
          Authorization: ''
        }
      })
      updateValue = updateValue.concat(res.data.results)
      next = res.data.next
    }
  } catch {
    updateValue = stockDetails.value
  }
  stockDetails.value = updateValue
  updatedTime.value = DateTime.now().toFormat('yyyy年MM月dd日 HH時mm分ss秒')
}
// ================== computed =====================
// ================== lifecycle =====================
onMounted(() => {
  // industry selector detect itself
  industrySelectorBlur = (e) => {
    if (e.target.id !== 'industrySelector') industrySelectorActive.value = false
  }
  // scroll loading function
  scrollLoding = () => {
    const st = document.documentElement.scrollTop
    const dh = document.documentElement.scrollHeight
    const wh = window.innerHeight
    if (st + wh >= dh) {
      if (next !== null) {
        startFilter(industryName.value, true)
      }
    }
  }
  // get industry catagories from db
  ;(function getIndustryCatagory () {
    axios
      .get('/api/stock_name/industry', {
        headers: {
          Authorization: ''
        }
      })
      .then((res) => {
        catagoryContent.value = res.data
      })
  })()
  // get lastest updated price (per minutes)
  getRealPrice()
  realTimePrice = setInterval(getRealPrice, 60000)
  // scrolling detect to load more data
  window.addEventListener('scroll', scrollLoding)
  // click to hide industry selector
  document.querySelector('body').addEventListener('click', industrySelectorBlur)
})
onUnmounted(() => {
  window.clearInterval(realTimePrice)
  window.removeEventListener('scroll', scrollLoding)
  document.querySelector('body').removeEventListener('click', industrySelectorBlur)
})
</script>

<style lang="postcss" scoped></style>
