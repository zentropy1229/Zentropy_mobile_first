<template>
  <div class="rounded-sm font-medium">
    <ul>
      <li
        class="mb-1 flex items-center border-b border-gray-400 py-0.5 hover:rounded-sm hover:bg-[#13273e]"
        v-for="news in newsDetail"
        :key="news"
      >
        <div class="mx-0.5">
          <a :href="news.url" class="span-text font-medium hover:text-sky-500" target="_blank">{{ news.title }}</a>
          <p class="span-text-sm font-light text-gray-300">
            {{ news.source + news.publish }}
          </p>
        </div>
      </li>
      <div class="span-text flex-center text-right font-medium" v-show="!newsDetail.length">
        <span>暫無資料</span>
      </div>
      <div class="span-text-sm text-right" v-if="newsDetail.length && showSeeAll">
        <router-link :to="{ name: 'news' }" class="hover:text-sky-500">查看全部...</router-link>
      </div>
    </ul>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, defineProps, defineEmits, toRef, defineExpose } from 'vue'
const emit = defineEmits(['alreadyBottom'])
const props = defineProps({
  showSeeAll: {
    type: Boolean,
    default: false
  }
})
const newsDetail = ref([])
// 是否顯示查看全部
const showSeeAll = toRef(props, 'showSeeAll')
// 是否到底
const alreadyBottom = (value) => {
  emit('alreadyBottom', value)
}
const getNewsDetail = (keywords, isUpdate, page) => {
  return new Promise((resolve, reject) => {
    if (!isUpdate) {
      newsDetail.value = []
    }
    axios
      .get('/api/news/', {
        params: {
          keyword: keywords,
          page: page
        }
      })
      .then((res) => {
        newsDetail.value = newsDetail.value.concat(res.data)
        alreadyBottom(false)
        resolve(res.data)
      })
      .catch((err) => {
        alreadyBottom(true)
        reject(new Error(err))
      })
  })
}
defineExpose({ getNewsDetail })
</script>

<style lang="postcss" scoped></style>
