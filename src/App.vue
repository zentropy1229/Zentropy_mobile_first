<template>
  <router-view name="Header"></router-view>
  <div class="min-h-screen">
    <router-view></router-view>
  </div>
  <router-view name="Footer"></router-view>
  <ScrollToTop />
</template>

<script setup>
import ScrollTop from './components/smallComponents/ScrollTop'
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
