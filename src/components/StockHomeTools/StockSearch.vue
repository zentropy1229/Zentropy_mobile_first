<template>
  <div class="relative">
    <form class="relative">
      <input
        type="text"
        v-model="inputStockName"
        @click.stop.prevent="showPreviewKeyWord = true"
        placeholder="搜尋台股代號/名稱"
        class="span-text h-2.5 w-full rounded-sm border bg-gray-800 px-2 outline-none"
      />
      <!-- search button -->
      <div class="y-center absolute left-0.5">
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
      </div>
      <!-- delete button -->
      <button
        class="y-center ounded-full absolute right-1 z-10"
        v-if="inputStockName"
        ref="deleteButton"
        @click.prevent="inputStockName = ''"
        tabindex="-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-[.15rem] w-[.15rem] text-gray-400 hover:text-gray-500"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"
          />
        </svg>
      </button>
    </form>
    <!-- 搜尋框框 -->
    <div
      class="absolute z-10 w-full overflow-hidden rounded-sm border-2 border-gray-300 bg-gray-200"
      v-show="showPreviewKeyWord && getStockName.length"
    >
      <ul class="span-text text-gray-900">
        <li
          class="search-items flex cursor-pointer items-center justify-between border-b border-gray-400 px-0.5 py-1 hover:bg-gray-400 focus:bg-gray-400"
          v-for="stockDetail of getStockName"
          :key="stockDetail.stock"
          @keyup.enter="goStockPage(stockDetail.stock)"
          tabindex="0"
          @click.stop.prevent="goStockPage(stockDetail.stock)"
        >
          <!-- highlight your input text -->
          <div v-html="searchMark(stockDetail)"></div>
          <span class="search-items-icons hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-[.15rem] w-[.15rem] text-gray-400"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"
              />
            </svg>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watchEffect, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
let stopSearching
let firstStock
const router = useRouter()
const deleteButton = ref()
const getStockName = ref([])
const inputStockName = ref('')
const showPreviewKeyWord = ref(false)
const goStockPage = (stockid) => {
  router.push({ name: 'stock', params: { stockid: stockid } })
}
const searchMark = computed(() => {
  return function (stockList) {
    const stockFull = stockList.stock + ' ' + stockList.stockName
    const index = stockFull.indexOf(inputStockName.value)
    return `${stockFull.substring(0, index)}<span class="text-orange-400 font-bold">${stockFull.substring(
      index,
      index + inputStockName.value.length
    )}</span>${stockFull.substring(index + inputStockName.value.length)}`
  }
})
const detectInput = () => {
  axios
    .get('api/stock_name/search', {
      headers: {
        Authorization: ''
      },
      params: { search: inputStockName.value }
    })
    .then((res) => {
      getStockName.value = res.data
      showPreviewKeyWord.value = true
      firstStock = res.data[0].stock
      return res.data
    })
    .catch(() => {
      getStockName.value = []
    })
}
onMounted(() => {
  document.querySelector('form').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      goStockPage(firstStock)
    }
  })
  watch(inputStockName, (nV, oV) => {
    if (nV) {
      detectInput()
    } else {
      getStockName.value = []
    }
  })
  watchEffect((onInvalidate) => {
    stopSearching = () => {
      showPreviewKeyWord.value = false
    }

    document.documentElement.addEventListener('click', stopSearching)
    onInvalidate(() => {
      document.documentElement.removeEventListener('click', stopSearching)
    })
  })
})
</script>
<style lang="postcss" scoped>
.search-items:hover .search-items-icons {
  display: block;
}
.search-items:nth-child(1) {
  @apply bg-gray-400;
}
</style>
