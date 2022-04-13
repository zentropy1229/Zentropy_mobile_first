<template>
  <div class="initial">
    <router-view name="Header"></router-view>
    <router-view></router-view>
  </div>
  <router-view name="Footer"></router-view>
  <ScrollToTop/>
</template>

<script setup>
import ScrollTop from './components/smallComponents/ScrollTop'
const ScrollToTop = ScrollTop
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans TC', sans-serif;
}
body, #app {
  min-height: 100vh;
}
:root {
  --primary-color: rgb(64, 124, 255);
  --text-color-white: rgb(255, 255, 255);
  --text-color-black: rgb(1, 1, 1);
  --button-color-blue: rgba(203, 238, 255, 0.8);
  --nav-height: 64px;
}
.initial {
  min-height: 100vh;
}
</style>
