<template>
  <router-view name="Header"></router-view>
  <div class="min-h-screen bg-gray-800 text-white">
    <router-view></router-view>
  </div>
  <router-view name="Footer"></router-view>
  <div class="flex-center fixed top-0 left-0 z-[99] h-full w-full flex-col bg-gray-900/60" v-if="store.state.isLoading">
    <loading-icon :isLoading="store.state.isLoading" class="mb-1" />
    <span class="span-text-sm font-bold tracking-wide text-gray-200" v-show="store.state.errorCounting >= 8"
      >頁面好像卡住了，可以重新整理試試看！</span
    >
  </div>
  <ScrollToTop />
</template>

<script setup>
import { useStore } from 'vuex'
import ScrollTop from './components/smallComponents/ScrollTop'
import LoadingIcon from '@/components/smallComponents/LoadingIcon'
const store = useStore()
const ScrollToTop = ScrollTop
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans TC', sans-serif;
}
body,
#app {
  min-height: 100vh;
  font-size: 16px;
}
</style>
