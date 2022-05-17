<template>
  <div class="mb-2 w-full">
    <div class="flex flex-wrap">
      <a
        :href="news.url"
        target="_blank"
        class="span-text mb-1 h-[5.5rem] max-w-full px-0.5 lg:max-w-[50%]"
        v-for="news in newsDetail"
        :key="news"
      >
        <div class="h-full rounded-sm bg-gray-900/60 px-1 hover:scale-105 hover:bg-gray-900">
          <div class="py-1">
            <span class="subtitle-text-sm block truncate">{{ news.title }}</span>
          </div>
          <div class="">
            <img class="mb-[0.28rem] h-8 w-full object-cover" :src="news.img" alt="" />
            <div class="span-text-sm mb-1.5 text-right text-gray-400">
              <span>{{ news.source }}</span>
              <span>{{ news.publish }}</span>
            </div>
            <div class="text-gray-100">
              <span>{{ news.content }}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { onMounted, ref, defineProps, toRef, watch } from 'vue'
const props = defineProps({
  keyword: {
    type: String,
    default: undefined
  }
})
const newsDetail = ref('')
const keyword = toRef(props, 'keyword')
const getNews = () => {
  axios
    .get('/api/news/', {
      headers: {
        Authorization: ''
      },
      params: {
        keyword: keyword.value
      }
    })
    .then((res) => {
      newsDetail.value = res.data
    })
    .catch(() => {
      console('錯誤發生')
    })
}
onMounted(() => {
  watch(keyword, () => {
    getNews()
  })
})
</script>
<style lang="postcss" scoped></style>
