<template>
  <div class="relative">
    <div class="relative rounded-sm bg-gray-600 xl:overflow-x-hidden" :class="{ 'overflow-x-scroll': showOverflowX }" ref="stockTableContainer">
      <table class="w-full" ref="stockTable">
        <thead>
          <!-- 表頭 -->
          <tr class="relative border-b-4 border-gray-400 bg-gray-600">
            <th class="catagory-stock-detail-th">股票代號 / 名稱</th>
            <th v-for="index in tableTitle" :key="index" class="catagory-stock-detail-th">
              {{ index }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr @mouseenter="isHover" @mouseleave="isHover" v-for="stockList in tableDetail" :key="stockList" class="catagory-stock-detail-tr">
            <!-- 股票名稱（第一欄） -->
            <td class="catagory-stock-detail-td">
              <router-link
                :to="{
                  name: 'home',
                  query: { stock: stockList.stock }
                }"
                class="span-text block font-medium text-orange-300 hover:text-orange-600"
                >{{ stockList.stockName }}</router-link
              >
              <span class="rounded-sm text-gray-300">{{ stockList.stock }}.TW</span>
            </td>
            <!-- 股票資訊 start -->
            <td class="catagory-stock-detail-td font-bold">
              <span
                class="updownlimit"
                :class="comparePrice('price', showStockData(stockList.stockDetail[0], 'price'), showStockData(stockList.stockDetail[0], 'yesterday'))"
                >{{ showStockData(stockList.stockDetail[0], 'price') }}</span
              >
            </td>
            <td class="catagory-stock-detail-td font-bold" :class="comparePrice('ud', showStockData(stockList.stockDetail[0], 'ud'))">
              <div class="flex-center">
                <svg
                  class="h-0.5 w-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                  :class="rotateIcon(showStockData(stockList.stockDetail[0], 'ud'), 0)"
                >
                  <path
                    d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
                  />
                </svg>
                {{ showStockData(stockList.stockDetail[0], 'ud') }}
              </div>
            </td>
            <td class="catagory-stock-detail-td font-bold" :class="comparePrice('ud', showStockData(stockList.stockDetail[0], 'udpercent'))">
              <div class="flex-center">
                <svg
                  class="h-0.5 w-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                  :class="rotateIcon(showStockData(stockList.stockDetail[0], 'udpercent'), 0)"
                >
                  <path
                    d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
                  />
                </svg>
                {{ showStockData(stockList.stockDetail[0], 'udpercent') }}
              </div>
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList.stockDetail[0], 'open') }}
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList.stockDetail[0], 'yesterday') }}
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList.stockDetail[0], 'high') }}
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList.stockDetail[0], 'low') }}
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList.stockDetail[0], 'volumn') }}
            </td>
            <!-- 股票資訊 end -->
          </tr>
        </tbody>
      </table>
    </div>
    <!-- LOADING -->
    <loading-icon :isLoading="isLoading" class="x-center absolute -bottom-3" />
  </div>
</template>
<script setup>
import { defineProps, ref, toRef, computed, onMounted, onUnmounted, watch } from 'vue'
import LoadingIcon from '@/components/smallComponents/LoadingIcon'
let showTableScrollX
// ================== ref Define =====================
const stockTableContainer = ref()
const stockTable = ref()
const showOverflowX = ref(false)
// ================== Props Define =====================
const props = defineProps({
  tableDetail: {
    type: Array
  },
  tableTitle: {
    type: Array
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
const tableTitle = toRef(props, 'tableTitle')
const tableDetail = toRef(props, 'tableDetail')
const isLoading = toRef(props, 'isLoading')
// ================== Methods =====================
const isHover = (e) => {
  const _ = ['text-orange-400', 'text-orange-300']
  e.target.classList.toggle('bg-gray-700')
  _.map((el) => e.target.querySelector('td a').classList.toggle(el))
}
// ================== computed =====================
// 顯示每筆的股票資料，判斷是否為空值
const showStockData = computed(() => {
  return function (value, name) {
    return value ? value[name] : '-'
  }
})
// 比較漲跌
const comparePrice = computed(() => {
  // value1 比較值 value2基準值
  return function (comparePattern, compareValue, baseValue = 0) {
    switch (comparePattern) {
      case 'price':
        if (Math.round(((compareValue - baseValue) / baseValue) * 10000) / 100 >= 9.95) {
          return { 'bg-rose-500': true }
        }
        if (Math.round(((compareValue - baseValue) / baseValue) * 10000) / 100 <= -10) {
          return { 'bg-green-500': true }
        }
        if (compareValue > baseValue) return { 'text-rose-500': true }
        if (compareValue < baseValue) return { 'text-green-400': true }
        return {}
      case 'ud':
        if (compareValue > 0) return { 'text-rose-500': true }
        if (compareValue < 0) return { 'text-green-400': true }
        return {}
    }
  }
})
const rotateIcon = computed(() => {
  return function (value1, value2) {
    if (value1 > value2) {
      return { 'rotate-180': true }
    } else if (value1 < value2) {
      return {}
    } else {
      return { hidden: true }
    }
  }
})
watch(tableDetail, () => {
  showTableScrollX()
})
// ================== lifeCycle =====================
onMounted(() => {
  showTableScrollX = () => {
    stockTableContainer.value.offsetWidth < stockTable.value.offsetWidth ? (showOverflowX.value = true) : (showOverflowX.value = false)
  }
  showTableScrollX()
  window.addEventListener('resize', showTableScrollX)
})
onUnmounted(() => {
  window.removeEventListener('resize', showTableScrollX)
})
</script>

<style lang="postcss" scoped>
.catagory-stock-detail-tr {
  @apply border-b border-gray-500;
}
.catagory-stock-detail-td {
  @apply h-[0.55rem] px-0.5 text-center;
}
.catagory-stock-detail-th {
  @apply h-3 px-0.5 text-center font-light;
}
.catagory-stock-detail-th:nth-child(1) {
  @apply text-left;
}
.catagory-stock-detail-td:nth-child(1) {
  @apply text-left;
}
tbody .catagory-stock-detail-tr:nth-last-child(1) {
  @apply border-b-0;
}
tbody .catagory-stock-detail-tr:nth-last-child(1) td {
  @apply pb-0.5;
}
.updownlimit {
  @apply block rounded-[.1rem] p-[0.05rem];
}
</style>
