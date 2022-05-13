<template>
  <div>
    <h2 class="subtitle-text mb-0.5">熱門新聞</h2>
    <div class="w-full rounded-sm bg-gray-600 font-medium">
      <ul class="px-0.5 py-1.5">
        <li class="mb-1 flex items-center border-b border-gray-400 pb-0.5" v-for="news in newsDetail" :key="news">
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
        <div class="span-text-sm text-right" v-show="newsDetail.length">
          <a class="hover:text-orange-300" href="javascript:">查看全部...</a>
        </div>
      </ul>
      <!-- LOADING -->
      <loading-icon :isLoading="isLoading" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import LoadingIcon from '@/components/smallComponents/LoadingIcon'
import axios from 'axios'
const newsDetail = ref([])
const isLoading = ref(false)
onMounted(() => {
  isLoading.value = true
  axios
    .get('/api/news/')
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
