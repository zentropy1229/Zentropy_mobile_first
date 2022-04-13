<template>
  <div>
    <div class="main-container" ref="main">
      <div class="image-container">
        <transition grop name="fade" mode="in-out">
          <img src="https://picsum.photos/id/1075/3240/2160" class="images" :class="{'sticky-image': !active}" v-if="!active">
          <img src="https://picsum.photos/id/1076/3240/2160" class="images" :class="{'sticky-image': active}" v-else>
        </transition>
      </div>
      <div class="home-title-container">
        <div :class="showAnimationClass">
          <span>Zentropy</span>
        </div>
        <transition name="flip">
          <div v-if="active" class="hidden-text">
            <span>交易好伙伴</span>
            <transition name="flip">
              <button class="free-btn" v-if="active">Start Free</button>
            </transition>
          </div>
        </transition>
      </div>
      <div :class="{'hidden-block': !active}"></div>
    </div>
    <div class="main-block">
      <BlockSlider />
    </div>
    <div class="main-block bg-gray-100">
      <BlockTutorial />
    </div>
  </div>
</template>

<script setup>
import BlockTutorial from '@/components/BlockTutorial'
import BlockSlider from '@/components/BlockSlider'
import { onMounted, onUnmounted, ref } from 'vue'
const main = ref()
const active = ref(false)
const avoidScroll = ref(true)
const showAnimationClass = ref({
  'show-text-up': active,
  'show-text-down': true
})
// ------------------- life-cycle ---------------------- //
onMounted(() => {
  main.value.addEventListener('scroll', (e) => {
    if (main.value.scrollTop) {
      active.value = true
    }
  })
  main.value.addEventListener('wheel', (e) => {
    if (e.deltaY < 0 && !main.value.scrollTop) {
      active.value = false
    }
  })
  window.addEventListener('scroll', (e) => {
    if (document.documentElement.scrollTop && avoidScroll.value) {
      active.value = true
      avoidScroll.value = false
    }
    if (!document.documentElement.scrollTop) {
      active.value = false
      avoidScroll.value = true
    }
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
  window.removeEventListener('wheel', () => {})
})
</script>

<style lang="postcss" scoped>
  /* ------------------------- Main Title ------------------------- */
  ::-webkit-scrollbar {
    width: 0px;
  }
  .main-container {
    @apply relative -top-[64px] -mb-[64px] h-screen overflow-y-scroll;
    scrollbar-width: none;
  }
  .image-container {
    @apply h-full;
  }
  .images {
    @apply static w-full h-full object-cover;
  }
  .sticky-image {
    @apply absolute top-0 left-0 !important;
  }
  .home-title-container {
    @apply absolute top-[30%] left-[10%] text-[5rem] text-white font-bold;
  }
  /* show-animation */
  .show-text-down {
    --move: 150px;
    transform: translateY(var(--move));
    transition: .5s;
  }
  .show-text-up {
    --move: 30px;
  }
  .hidden-text {
    @apply flex flex-col w-fit mt-2;
  }
  .free-btn {
    @apply rounded-[5rem] px-4 py-4 mt-4 font-medium text-3xl bg-p text-white uppercase tracking-wider;
  }
  .free-btn:hover {
    @apply bg-white text-black;
  }
  .hidden-block {
    @apply block min-h-[50px];
  }
  /* ------------------------- Main Content ------------------------- */
  .main-block {
    @apply max-w-[2560px] mx-auto py-12;
  }
  /* ------------------------- Animation For Vue ------------------------- */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.8s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .flip-enter-active,
  .flip-leave-active {
    transition: all 0.5s ease;
    transform: translateY(0px);
  }
  .flip-enter-from,
  .flip-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  @keyframes showTitle {
    0% {
      transform: translateY(200px);
    }
    100% {
      transform: translateY(100px);
    }
  }
</style>
