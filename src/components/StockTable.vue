<template>
  <div
    class="max-h-24 overflow-y-auto rounded-sm bg-gray-600 xl:overflow-x-hidden"
    :class="{ 'overflow-x-scroll': showOverflowX }"
    ref="stockTableContainer"
  >
    <table class="w-full" ref="stockTable">
      <thead>
        <tr
          class="relative sticky top-0 z-10 bg-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[0.05rem] after:w-full after:bg-gray-500"
        >
          <th class="catagory-stock-detail-th">股票代號 / 名稱</th>
          <th
            v-for="index in tableTitle"
            :key="index"
            class="catagory-stock-detail-th"
          >
            {{ index }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          @mouseenter="isHover"
          @mouseleave="isHover"
          v-for="stockList in tableDetail"
          :key="stockList"
          class="catagory-stock-detail-tr"
        >
          <td class="catagory-stock-detail-td">
            <router-link
              :to="{ name: 'home', query: { stock: stockList.stock } }"
              class="span-text block font-medium text-orange-300 hover:text-orange-600"
              >{{ stockList.stockName }}</router-link
            >
            <span class="rounded-sm text-gray-300"
              >{{ stockList.stock }}.TW</span
            >
          </td>
          <td
            class="catagory-stock-detail-td font-bold"
            :class="
              comparePrice(
                showStockData(stockList.stockDetail[0], 'price'),
                showStockData(stockList.stockDetail[0], 'yesterday')
              )
            "
          >
            {{ showStockData(stockList.stockDetail[0], 'price') }}
          </td>
          <td
            class="catagory-stock-detail-td font-bold"
            :class="
              comparePrice(showStockData(stockList.stockDetail[0], 'ud'), 0)
            "
          >
            <div class="flex-center">
              <svg
                class="h-0.5 w-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
                :class="
                  rotateIcon(showStockData(stockList.stockDetail[0], 'ud'), 0)
                "
              >
                <path
                  d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
                />
              </svg>
              {{ showStockData(stockList.stockDetail[0], 'ud') }}
            </div>
          </td>
          <td
            class="catagory-stock-detail-td font-bold"
            :class="
              comparePrice(
                showStockData(stockList.stockDetail[0], 'udpercent'),
                0
              )
            "
          >
            <div class="flex-center">
              <svg
                class="h-0.5 w-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
                :class="
                  rotateIcon(
                    showStockData(stockList.stockDetail[0], 'udpercent'),
                    0
                  )
                "
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
        </tr>
      </tbody>
    </table>
    <div class="flex-center flex-col text-slate-200" v-if="isLoading">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mb-0.5 h-1 w-1 animate-spin"
        viewBox="0 0 512 512"
        fill="currentColor"
      >
        <path
          d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM80.72 256H79.63c-9.078 0-16.4-8.011-15.56-17.34C72.36 146 146.5 72.06 239.3 64.06C248.3 63.28 256 70.75 256 80.09c0 8.35-6.215 15.28-14.27 15.99C164.7 102.9 103.1 164.3 96.15 241.4C95.4 249.6 88.77 256 80.72 256zM256 351.1c-53.02 0-96-43-96-95.1s42.98-96 96-96s96 43 96 96S309 351.1 256 351.1zM256 224C238.3 224 224 238.2 224 256s14.3 32 32 32c17.7 0 32-14.25 32-32S273.7 224 256 224z"
        />
      </svg>
      <span class="span-text animate-pulse font-medium">Loading ...</span>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref, toRef, computed, onMounted, onUnmounted } from 'vue'
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
  return function (value1, value2) {
    if (value1 > value2) {
      return { 'text-rose-500': true }
    } else if (value1 < value2) {
      return { 'text-green-400': true }
    } else {
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

// ================== lifeCycle =====================
onMounted(() => {
  showTableScrollX = () => {
    stockTableContainer.value.offsetWidth < stockTable.value.offsetWidth
      ? (showOverflowX.value = true)
      : (showOverflowX.value = false)
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
  @apply h-2 px-0.5 text-center;
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
</style>
