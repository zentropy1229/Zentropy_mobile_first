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
      <div class="span-text flex-center text-right font-medium" v-show="!newsDetail.length">
        <span>暫無資料</span>
      </div>
      <div class="span-text-sm text-right" v-if="newsDetail.length && showSeeAll">
        <router-link :to="{ name: 'news' }" class="hover:text-orange-300">查看全部...</router-link>
      </div>
    </ul>
  </div>
</template>
<script setup>
import axios from 'axios'
import { useStore } from 'vuex'
import { ref, defineProps, defineEmits, toRef, watchEffect } from 'vue'
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
const store = useStore()
const newsDetail = ref([])
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
  store.commit('setIsLoading', true)
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
      store.commit('setIsLoading', false)
      return res.data
    })
    .catch((err) => {
      alreadyBottom(true)
      store.commit('setIsLoading', false)
      return err
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
