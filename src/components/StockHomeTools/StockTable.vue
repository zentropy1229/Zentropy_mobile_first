<template>
  <div class="span-text relative">
    <div
      class="relative rounded-sm bg-gray-900"
      :class="{ 'overflow-x-scroll': showOverflowX }"
      ref="stockTableContainer"
    >
      <table class="w-full whitespace-nowrap" ref="stockTable">
        <thead>
          <!-- table title -->
          <tr class="span-text-sm relative border-b-2 border-gray-400">
            <th class="catagory-stock-detail-th">收藏</th>
            <th class="catagory-stock-detail-th">股票代號 / 名稱</th>
            <th
              v-for="(title, index) in tableTitle"
              :key="index"
              class="catagory-stock-detail-th"
              @click="
                () => {
                  $emit('orderList', index)
                  nowColumnIndex = index
                }
              "
            >
              <div
                class="flex-center h-2 cursor-pointer rounded-sm hover:bg-sky-400/80"
                :class="{ 'bg-[#13273e] font-medium': index === nowColumnIndex }"
              >
                <span>{{ title }}</span>
                <svg
                  class="ml-[0.05rem] h-0.5 w-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                  />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stockList in tableDetail" :key="stockList" class="catagory-stock-detail-tr hover:bg-[#13273e]">
            <!-- collect - first column -->
            <td class="catagory-stock-detail-td">
              <button
                class="rounded-sm p-0.5 text-sky-500 hover:bg-sky-900"
                @click="modifyFavStocks('add', stockList.stock.stock)"
                v-if="!checkFavStock(stockList.stock.stock)"
              >
                <svg class="h-0.5 w-0.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                  <path
                    d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"
                  />
                </svg>
              </button>
              <button
                class="rounded-sm p-0.5 hover:bg-gray-600"
                @click="modifyFavStocks('remove', stockList.stock.stock)"
                v-else
              >
                <svg class="h-0.5 w-0.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                  <path
                    d="M400 288h-352c-17.69 0-32-14.32-32-32.01s14.31-31.99 32-31.99h352c17.69 0 32 14.3 32 31.99S417.7 288 400 288z"
                  />
                </svg>
              </button>
            </td>
            <!-- stockName  -->
            <td class="catagory-stock-detail-td">
              <router-link
                :to="{
                  name: 'stock',
                  params: { stockid: stockList.stock.stock }
                }"
                class="span-text stock-name-td block font-medium text-white"
                >{{ stockList.stock.stockName }}</router-link
              >
              <span class="rounded-sm text-slate-400">{{ stockList.stock.stock }}.TW</span>
            </td>
            <!-- stock info start -->
            <td class="catagory-stock-detail-td font-bold">
              <span
                class="updownlimit"
                :class="comparePrice('price', showStockData(stockList, 'price'), showStockData(stockList, 'yesterday'))"
                >{{ showStockData(stockList, 'price') }}</span
              >
            </td>
            <td class="catagory-stock-detail-td font-bold" :class="comparePrice('ud', showStockData(stockList, 'ud'))">
              <div class="flex-center">
                <svg
                  class="h-0.5 w-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                  :class="rotateIcon(showStockData(stockList, 'ud'), 0)"
                >
                  <path
                    d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
                  />
                </svg>
                {{ showStockData(stockList, 'ud') }}
              </div>
            </td>
            <td
              class="catagory-stock-detail-td font-bold"
              :class="comparePrice('ud', showStockData(stockList, 'udpercent'))"
            >
              <div class="flex-center">
                <svg
                  class="h-0.5 w-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  fill="currentColor"
                  :class="rotateIcon(showStockData(stockList, 'udpercent'), 0)"
                >
                  <path
                    d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
                  />
                </svg>
                {{ showStockData(stockList, 'udpercent') }}
              </div>
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList, 'open') }}
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList, 'yesterday') }}
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList, 'high') }}
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList, 'low') }}
            </td>
            <td class="catagory-stock-detail-td">
              {{ showStockData(stockList, 'volumn') }}
            </td>
            <!-- stock info end -->
          </tr>
        </tbody>
      </table>
    </div>
    <!-- LOADING -->
    <loading-icon :isLoading="isLoading" class="x-center absolute -bottom-3" />
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import LoadingIcon from '@/components/smallComponents/LoadingIcon'
import modifyFavStocks from '@/utils/modifyFavStocks'
import { defineProps, ref, toRef, computed, onMounted, watchEffect, defineExpose, onUpdated } from 'vue'
const store = useStore()
// ================== ref Define =====================
const stockTable = ref()
const nowColumnIndex = ref('')
const showOverflowX = ref(false)
const stockTableContainer = ref()
const isLoading = ref(false)
// ================== Props Define =====================
const props = defineProps({
  tableDetail: {
    type: Array
  },
  tableTitle: {
    type: Object
  }
})
const tableTitle = toRef(props, 'tableTitle')
const tableDetail = toRef(props, 'tableDetail')
// ================== Methods =====================
const showTableScrollX = () => {
  stockTableContainer.value.offsetWidth < stockTable.value.offsetWidth
    ? (showOverflowX.value = true)
    : (showOverflowX.value = false)
}
// ================== computed =====================
// 顯示每筆的股票資料，判斷是否為空值
const showStockData = computed(() => {
  return function (value, name) {
    return value ? value[name] : '-'
  }
})
// compare up or down
const comparePrice = computed(() => {
  // compareValue 比較值 vbaseValue基準值
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
// rotate the icon if up or down
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
// check fav stocks
const checkFavStock = computed(() => {
  return function (stock) {
    const favStocks = store.state.userInfo.favoriteStocks || []
    return favStocks.includes(stock)
  }
})
// ================== lifeCycle =====================
onMounted(() => {
  // table overflowx action
  watchEffect((onInvalidate) => {
    window.addEventListener('resize', showTableScrollX)
    onInvalidate(() => {
      window.removeEventListener('resize', showTableScrollX)
    })
  })
})
onUpdated(() => {
  showTableScrollX()
})
defineExpose({ isLoading })
</script>

<style lang="postcss" scoped>
.catagory-stock-detail-tr {
  @apply border-b border-gray-500;
}
.catagory-stock-detail-tr:hover .stock-name-td {
  @apply text-sky-500;
}
.catagory-stock-detail-td {
  @apply h-[0.55rem] px-0.5 text-center;
}
.catagory-stock-detail-th {
  @apply h-3 px-0.5 text-center font-light;
}
.catagory-stock-detail-th:nth-child(2) {
  @apply text-left;
}
.catagory-stock-detail-td:nth-child(2) {
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
