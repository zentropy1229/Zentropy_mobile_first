<template>
  <div class="rounded-sm font-medium">
    <ul>
      <li
        class="mb-1 flex items-center border-b border-gray-400 py-0.5 hover:rounded-sm hover:bg-gray-700"
        v-for="news in newsDetail"
        :key="news"
      >
        <div class="mx-0.5">
          <a :href="news.url" class="span-text font-medium hover:text-orange-300" target="_blank">{{ news.title }}</a>
          <p class="span-text-sm font-light text-gray-300">
            {{ news.source + news.publish }}
          </p>
        </div>
      </li>
      <div class="span-text flex-center text-right font-medium" v-show="!newsDetail.length && !isLoading">
        <span>暫無資料</span>
      </div>
      <div class="span-text-sm text-right" v-if="newsDetail.length && showSeeAll">
        <router-link :to="{ name: 'news' }" class="hover:text-orange-300">查看全部...</router-link>
      </div>
    </ul>
    <!-- LOADING -->
    <loading-icon :isLoading="isLoading" class="mt-1" />
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, toRef, watchEffect } from 'vue'
import LoadingIcon from '@/components/smallComponents/LoadingIcon'
import axios from 'axios'
const emit = defineEmits(['alreadyBottom'])
const props = defineProps({
  keywords: {
    type: String,
    default: '台股'
  },
  page: {
    type: Number,
    default: 0
  },
  showSeeAll: {
    type: Boolean,
    default: false
  },
  isUpdate: {
    type: Boolean,
    default: true
  }
})
const newsDetail = ref([])
const isLoading = ref(false)
// 傳到後端的關鍵字
const page = toRef(props, 'page')
const keywords = toRef(props, 'keywords')
const isUpdate = toRef(props, 'isUpdate')
// 是否顯示查看全部
const showSeeAll = toRef(props, 'showSeeAll')
// 是否到底
const alreadyBottom = (value) => {
  emit('alreadyBottom', value)
}
const getNewsDetail = (value) => {
  isLoading.value = true
  axios
    .get('/api/news/', {
      params: {
        keyword: keywords.value,
        page: page.value
      }
    })
    .then((res) => {
      newsDetail.value = newsDetail.value.concat(res.data)
      alreadyBottom(false)
      isLoading.value = false
      return res.data
    })
    .catch(() => {
      alreadyBottom(true)
      isLoading.value = false
      return 'error happend!!'
    })
}
watchEffect(() => {
  if (!isUpdate.value) {
    newsDetail.value = []
  }
  getNewsDetail()
})
</script>

<style lang="postcss" scoped></style>
