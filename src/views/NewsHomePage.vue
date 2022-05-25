<template>
  <div class="bg-gray-800">
    <div class="container flex min-h-screen flex-col items-center text-white">
      <div class="mx-auto mt-3 mb-1 flex flex-col items-center">
        <h1 class="title-text mb-0.5">綜合新聞</h1>
        <span class="span-text text-gray-300">台股通吃大小事，一眼看近天下事</span>
      </div>
      <news-search class="mb-1 w-3/4 lg:w-1/3" @startSearch="startSearch" />
      <hot-news ref="news" @alreadyBottom="alreadyBottom = $event" />
      <button
        class="span-text mb-1 rounded-sm bg-gray-300 py-0.5 px-1 font-medium text-gray-800 hover:bg-gray-900 hover:text-gray-300"
        @click="loadMore"
        v-if="!alreadyBottom"
      >
        加載更多
      </button>
      <div class="span-text mb-1 text-gray-500" v-else>已經到底了</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import NewsSearch from '@/components/NewsSearch'
import HotNews from '@/components/StockHomeTools/HotNews'
const news = ref()
const page = ref(0)
const store = useStore()
const keywords = ref('台股')
const isUpdate = ref(true)
const alreadyBottom = ref(false)
const startSearch = (value) => {
  keywords.value = value || '台股'
  page.value = 0
  isUpdate.value = false
}
const loadMore = () => {
  isUpdate.value = true
  page.value++
}
onMounted(() => {
  watch(
    [keywords, page, isUpdate],
    () => {
      store.commit('setIsLoading', true)
      news.value
        .getNewsDetail(keywords.value, isUpdate.value, page.value)
        .then(() => {
          store.commit('setIsLoading', false)
        })
        .catch(() => {
          store.commit('setIsLoading', false)
        })
    },
    { immediate: true }
  )
})
</script>
