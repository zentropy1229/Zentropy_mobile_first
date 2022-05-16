<template>
  <div class="rounded-sm font-medium">
    <ul class="px-0.5 py-1.5">
      <li class="mb-1 flex items-center border-b border-gray-400 py-0.5 hover:rounded-sm hover:bg-gray-700" v-for="news in newsDetail" :key="news">
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
        <a class="hover:text-orange-300" href="javascript:">查看全部...</a>
      </div>
    </ul>
    <!-- LOADING -->
    <loading-icon :isLoading="isLoading" />
  </div>
</template>
<script setup>
import { onMounted, ref, defineProps, toRef } from 'vue'
import LoadingIcon from '@/components/smallComponents/LoadingIcon'
import axios from 'axios'
const props = defineProps({
  keywords: {
    type: String,
    default: undefined
  },
  page: {
    type: String,
    default: undefined
  },
  showSeeAll: {
    type: Boolean,
    default: false
  }
})
const newsDetail = ref([])
const isLoading = ref(false)
const page = toRef(props, 'page')
const keywords = toRef(props, 'keywords')
const showSeeAll = toRef(props, 'showSeeAll')
onMounted(() => {
  isLoading.value = true
  axios
    .get('/api/news/', {
      params: {
        keyword: keywords.value,
        page: page.value
      }
    })
    .then((res) => {
      newsDetail.value = res.data
      isLoading.value = false
    })
    .catch(() => {
      newsDetail.value = []
      isLoading.value = false
    })
})
</script>

<style lang="postcss" scoped></style>
