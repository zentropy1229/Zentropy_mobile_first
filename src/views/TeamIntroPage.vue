<template>
  <div class="flex flex-col bg-gray-800">
    <div class="container w-full">
      <div class="mt-2 mb-1 h-20 bg-gray-900"></div>
    </div>
    <div class="span-text-sm container w-full text-white lg:flex">
      <div class="w-full lg:w-[70%]">
        <h2 class="subtitle-text mb-0.5">上市{{ industryName }}分類行情</h2>
        <div class="relative z-30 mb-0.5 w-max rounded-sm bg-gray-600">
          <div
            class="flex cursor-pointer p-[0.125rem]"
            id="industrySelector"
            @click.stop.prevent="
              industrySelectorActive = !industrySelectorActive
            "
          >
            <span class="text-gray-200">產業別：{{ industryName }}</span>
            <button class="ml-1">
              <svg
                class="block h-0.5 w-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
              >
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
                  @click.prevent="startFilter(catagory.industry)"
                  class="block rounded-sm bg-gray-200 px-1 py-0.5 text-center text-gray-900 hover:bg-orange-300"
                  >{{ catagory.industry }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="mb-1">
          <p class="text-gray-400">資料更新時間：{{ updatedTime }}</p>
          <p class="text-gray-400">每分鐘更新一次</p>
        </div>
        <stock-table
          :tableTitle="stockTitle"
          :tableDetail="stockDetails"
          :isLoading="isLoading"
        />
      </div>
      <div class="ml-0 w-full lg:ml-2 lg:w-[30%]">
        <div class="mb-1">
          <h2 class="subtitle-text mb-0.5">台股搜尋</h2>
          <form class="relative">
            <input
              type="text"
              placeholder="搜尋台股代號 / 名稱"
              class="h-2 w-full rounded-sm bg-gray-600 px-0.5"
            />
            <button class="y-center absolute right-0.5">
              <svg
                class="h-[0.2rem] w-[0.2rem] text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path
                  d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
                />
              </svg>
            </button>
          </form>
        </div>
        <div class="mb-1">
          <h2 class="subtitle-text mb-0.5">我的自選股</h2>
          <div class="w-full rounded-sm bg-gray-600 font-medium">
            <table class="w-full">
              <tr class="border-b">
                <th class="h-2 w-4 px-0.5 text-left">股名</th>
                <th class="h-2 px-0.5 text-right">股價</th>
                <th class="h-2 px-0.5 text-right">漲跌</th>
                <th class="h-2 px-0.5 text-right">成交量</th>
              </tr>
              <tr v-for="index in 5" :key="index" class="border-b">
                <td class="h-2.5 w-4 px-0.5 text-left">
                  <a
                    href="javascript:"
                    class="block text-orange-300 hover:text-orange-400"
                    >福壽</a
                  ><a href="javascript:">1219</a>
                </td>
                <td class="h-2 px-0.5 text-right">125.00</td>
                <td class="h-2 px-0.5 text-right">5.00</td>
                <td class="h-2 px-0.5 text-right">8700</td>
              </tr>
            </table>
            <div class="w-full p-0.5 text-right">
              <a class="hover:text-orange-300" href="javascript:">查看全部>></a>
            </div>
          </div>
        </div>
        <div class="mb-1">
          <h2 class="subtitle-text mb-0.5">熱門新聞</h2>
          <div class="w-full rounded-sm bg-gray-600 font-medium">
            <ul class="p-0.5">
              <li
                class="mb-1 flex items-center"
                v-for="index in 8"
                :key="index"
              >
                <div>{{ index }}.</div>
                <div class="ml-0.5">
                  <a
                    href="javascript:"
                    class="span-text-lg font-medium hover:text-orange-300"
                    >新聞標題</a
                  >
                  <p class="font-light text-gray-300">
                    熱門新聞熱門新聞熱門新聞新聞熱門新聞熱門新聞...
                  </p>
                </div>
              </li>
              <div class="p-0.5 text-right">
                <a class="hover:text-orange-300" href="javascript:"
                  >查看全部>></a
                >
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import StockTable from '@/components/StockTable'
import axios from 'axios'
const { DateTime } = require('luxon')
let industrySelectorBlur
let realTimePrice
const catagoryContent = ref('')
const industryName = ref('半導體業')
const updatedTime = ref('')
const industrySelectorActive = ref(false)
const isLoading = ref(false)
const stockDetails = ref([])
const stockTitle = ref([
  '股價',
  '漲跌',
  '漲跌幅(%)',
  '開盤',
  '昨收',
  '最高',
  '最低',
  '成交量(張)'
])
// ================== Methods =====================
const startFilter = (value) => {
  industryName.value = value
  industrySelectorActive.value = false
  isLoading.value = true
  axios
    .get('http://127.0.0.1:8001/api/stock_name', {
      params: { industry: industryName.value },
      headers: {
        Authorization: ''
      }
    })
    .then((res) => {
      stockDetails.value = res.data
      isLoading.value = false
    })
    .catch(() => {
      stockDetails.value = []
      isLoading.value = false
    })
}
const realTimePriceAndTime = () => {
  startFilter(industryName.value)
  updatedTime.value = DateTime.now().toFormat('yyyy年MM月dd日 HH時mm分ss秒')
}
// ================== computed =====================
// ================== lifecycle =====================
onMounted(() => {
  industrySelectorBlur = (e) => {
    if (e.target.id !== 'industrySelector') industrySelectorActive.value = false
  }
  document.querySelector('body').addEventListener('click', industrySelectorBlur)
  axios
    .get('http://127.0.0.1:8001/api/stock_name/industry', {
      headers: {
        Authorization: ''
      }
    })
    .then((res) => {
      catagoryContent.value = res.data
    })
  realTimePriceAndTime()
  realTimePrice = setInterval(realTimePriceAndTime, 60000)
})
onUnmounted(() => {
  clearInterval(realTimePrice)
})
</script>

<style lang="postcss" scoped></style>
