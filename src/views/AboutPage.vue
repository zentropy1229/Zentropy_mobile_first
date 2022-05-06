<template>
  <div class="container mt-1">
    <div class="flex-center flex-col">
      <div class="relative mb-1">
        <form @submit.prevent="send" class="flex border">
          <input
            type="text"
            v-model="stockContent"
            class="span-text w-[3rem] p-0.5 outline-none"
            placeholder="輸入股票代號"
          />
          <button class="span-text h-full border bg-p p-0.5 text-white">
            send
          </button>
          <button
            class="y-center ounded-full absolute right-3 z-10"
            v-if="stockContent"
            @click="stockContent = ''"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-[.15rem] w-[.15rem] text-gray-400 hover:text-gray-600"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"
              />
            </svg>
          </button>
        </form>
        <div class="absolute z-10 w-full bg-white">
          <ul class="span-text-sm border">
            <li
              class="search-items flex cursor-pointer items-center justify-between p-0.5 hover:bg-gray-50"
              v-for="stockDetail of showStockName"
              :key="stockDetail.stock"
              @click="
                stockContent = stockDetail.stock + '-' + stockDetail.stockName
              "
            >
              <span v-html="searchMark(stockDetail)"></span>
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
      <span class="subtitle-text-sm mb-1 text-gray-200">預測結果：</span>
      <span class="title-text text-p">{{ stock }}</span>
    </div>
    <DashBoard :scoreValue="stockValue" :scoreStr="stockStr" />
  </div>
</template>

<style lang="postcss" scoped></style>

<script setup>
import { ref, computed, watch } from 'vue'
import DashBoard from '@/components/smallComponents/DashBoard'
// import { onMounted } from '@vue/runtime-core'
import axios from 'axios'
// import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'
const stockContent = ref('')
const showStockName = ref([])
const stock = ref('尚未查詢')
// const router = useRouter()
// const store = useStore()
const send = async () => {
  const formData = { stock: stockContent.value.split('-')[0] }
  stock.value = '查詢中...'
  await axios
    .post('/stock/', formData)
    .then((res) => {
      stock.value = res.data
    })
    .catch(() => {
      stock.value = '查無資料'
    })
}
// onMounted(() => {
//   axios
//     .get('/api/v1/users/')
//     .then((res) => {
//       content.value = res.data
//     })
//     .catch(() => {
//       store.commit('removeToken')
//       router.push('/log-in')
//     })
// })

const stockValue = computed(() => {
  if (stock.value === 'A') return 100
  if (stock.value === 'B') return 75
  if (stock.value === 'C') return 50
  if (stock.value === 'D') return 25
  if (stock.value === 'E') return 0
  return undefined
})
const stockStr = computed(() => {
  if (stock.value === 'A') return '大漲'
  if (stock.value === 'B') return '小漲'
  if (stock.value === 'C') return '平平'
  if (stock.value === 'D') return '小跌'
  if (stock.value === 'E') return '大跌'
  else return '尚未預測'
})
const searchMark = computed(() => {
  return function (stockList) {
    const stockFull = stockList.stock + ' ' + stockList.stockName
    const index = stockFull.indexOf(stockContent.value)
    return `${stockFull.substring(
      0,
      index
    )}<span class="text-rose-600 font-bold">${stockFull.substring(
      index,
      index + stockContent.value.length
    )}</span>${stockFull.substring(index + stockContent.value.length)}`
  }
})
watch(stockContent, (nV, oV) => {
  if (nV) {
    axios
      .get('api/stock_name/search', {
        headers: {
          Authorization: ''
        },
        params: { search: stockContent.value }
      })
      .then((res) => {
        showStockName.value = res.data
      })
  }
  if (nV === '') {
    showStockName.value = []
  }
})
</script>

<style lang="postcss" scoped>
.search-items:hover .search-items-icons {
  display: block;
}
</style>
