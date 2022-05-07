<template>
  <table class="flex-center bord span-text container mt-4">
    <tbody>
      <div class="flex justify-center">
        <button @click="getAll" class="border px-1 py-0.5">選取全部</button>
        <button @click="cancelAll" class="ml-1 border px-1 py-0.5">
          取消選取
        </button>
      </div>

      <tr v-for="index in Math.ceil(content.length / 5)" :key="index">
        <td
          v-for="catagory in content.slice((index - 1) * 5, index * 5)"
          :key="catagory"
        >
          <label
            ><input
              type="checkbox"
              class="checkbox hidden"
              @change="checked"
              :checked="checkedList.includes(catagory.industry)"
              :value="catagory.industry"
            />
            <div
              class="span-text flex-center origin-background h-2 w-6 cursor-pointer rounded-lg text-white"
              ref="label"
            >
              <span class="block">{{ catagory.industry }}</span>
            </div></label
          >
        </td>
      </tr>
    </tbody>
  </table>
  <button
    @click="filter"
    class="mx-auto mb-2 block rounded-sm bg-rose-400 px-2 py-0.5 text-white"
  >
    submit
  </button>
  <div class="flex-center span-text container mb-2 flex-col">
    <span
      >資料更新時間：{{
        result.length
          ? DateTime.fromISO(result[0].updated)
              .setZone('UTC')
              .toFormat('yyyy-MM-dd HH:mm:ss')
          : ''
      }}</span
    >
    <span class="mb-2">資料總筆數：{{ result.length }}</span>
    <table class="result-list">
      <tbody>
        <tr v-show="result.length">
          <th class="pb-0.5">股票代號</th>
          <th class="pb-0.5">股票名稱</th>
          <th class="pb-0.5">市場別</th>
        </tr>
        <tr
          v-for="list in result"
          :key="list"
          class="mb-1 border-b text-center text-slate-600"
        >
          <td
            v-for="item in Object.entries(list).slice(0, -1)"
            :key="item"
            class="px-1.5 py-0.5"
          >
            {{ item[1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
const { DateTime } = require('luxon')
const content = ref('')
const checkedList = ref([])
const result = ref([])
const checked = (event) => {
  if (event.target.checked) {
    checkedList.value.push(event.target.value)
  } else {
    checkedList.value.splice(checkedList.value.indexOf(event.target.value), 1)
  }
}
const getAll = () => {
  checkedList.value = []
  for (const item in content.value) {
    checkedList.value.push(content.value[item].industry)
  }
}
const cancelAll = () => {
  checkedList.value = []
}
const filter = () => {
  if (!checkedList.value.length) {
    result.value = []
    return
  }
  axios
    .get('http://127.0.0.1:8001/api/stock_name', {
      params: { industry: checkedList.value.join(','), sort: 'industry' },
      headers: {
        Authorization: ''
      }
    })
    .then((res) => {
      result.value = res.data
    })
}
onMounted(() => {
  axios
    .get('http://127.0.0.1:8001/api/stock_name/industry', {
      headers: {
        Authorization: ''
      }
    })
    .then((res) => {
      content.value = res.data
    })
})
</script>

<style lang="postcss" scoped>
* {
  --bg: rgb(71 85 105);
}
.bord {
  border-collapse: separate;
  border-spacing: 0.5rem;
}
.origin-background {
  background: var(--bg);
}
.origin-background:hover {
  --bg: rgb(51 65 85);
}
.checkbox:checked + .origin-background {
  --bg: rgb(203 213 225);
  font-weight: 400;
}
.result-list tr td:nth-child(3) {
  @apply text-green-400;
  font-weight: 500;
}
</style>
