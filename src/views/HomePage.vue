<template>
  <section
    class="main-container relative -top-[var(--navbar-height)] -mb-[var(--navbar-height)] h-screen overflow-y-scroll"
    ref="main"
  >
    <div class="h-full">
      <transition grop name="fade" mode="in-out">
        <img
          src="https://picsum.photos/id/266/3240/2160"
          class="images"
          :class="{ 'sticky-image': !active }"
          v-if="!active"
        />
        <img src="https://picsum.photos/id/267/3240/2160" class="images" :class="{ 'sticky-image': active }" v-else />
      </transition>
    </div>
    <div
      class="x-center absolute top-[3rem] text-[length:var(--home-slogan-text)] lg:top-[4rem] lg:left-[15%] lg:-translate-x-0 lg:font-bold"
    >
      <div class="flex-center relative w-16 flex-col" :class="showAnimationClass">
        <svg
          class="x-center absolute -top-8 h-8 w-8 transition-all duration-500"
          :class="{ 'opacity-0': active }"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
        >
          <path
            class="cls-1 text-[#393332] transition-all duration-700"
            fill="currentColor"
            d="M186.77,223.93l-4.9-1a95,95,0,1,1,85.81-26l-94.39,94.39Z"
          />
          <path
            class="cls-2"
            fill="#fff"
            d="M200.5,39.79a90,90,0,0,1,63.64,153.64l-82.71,82.71,9.27-46.32,2-9.82-9.82-1.95A90,90,0,0,1,200.5,39.79m0-10a100,100,0,0,0-19.61,198.07l-15.74,78.71L271.21,200.5A100,100,0,0,0,200.5,29.79Z"
          />
          <path
            class="cls-2"
            fill="#fff"
            d="M299.5,465.21a95,95,0,0,1-67.38-162l.18-.14.19-.22,94.22-94.23-13.48,67.43,4.9,1A95,95,0,0,1,299.5,465.21Z"
          />
          <path
            class="cls-2"
            fill="#fff"
            d="M318.57,223.86l-9.27,46.32-2,9.82,9.82,1.95a90,90,0,1,1-81.36,24.68l0-.05.07-.06,82.66-82.66m16.28-30.43L228.79,299.49h0a100,100,0,1,0,90.32-27.36l15.74-78.71Z"
          />
        </svg>
        <span class="slogan-title">Zentropy</span>
      </div>
      <transition name="flip">
        <div v-show="active" class="flex w-16 flex-col items-center">
          <span class="hidden text-sky-600 lg:block">交易好伙伴</span>
          <div class="flex flex-col items-center lg:hidden">
            <p class="slogan-title leading-[1.2] text-sky-600">Predict</p>
            <p class="slogan-title text-white">Trading</p>
          </div>
          <transition name="flip">
            <router-link
              :to="{ name: 'stockHome' }"
              class="flex-center mt-1 rounded bg-sky-600 p-1 text-[length:var(--home-btn-text)] font-medium text-white hover:bg-white hover:text-black lg:w-full"
              v-if="active"
            >
              <span>免費開始</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-1 w-1" fill="currentColor" viewBox="0 0 640 512">
                <path
                  d="M129.1 480H128V384H352L245.2 448.1C210.4 468.1 170.6 480 129.1 480zM352 128H128V32H129.1C170.6 32 210.4 43.03 245.2 63.92L352 128zM104 128C130.2 128 153.4 140.6 168 160H456C525.3 160 591 182.7 635.2 241.6C641.6 250.1 641.6 261.9 635.2 270.4C591 329.3 525.3 352 456 352H168C153.4 371.4 130.2 384 104 384H96V480H80C53.49 480 32 458.5 32 432V384H40C17.91 384 0 366.1 0 344V168C0 145.9 17.89 128 39.96 128H32V80C32 53.49 53.49 32 80 32H96V128H104zM476.4 208C473.1 208 472 209.1 472 212.4V299.6C472 302 473.1 304 476.4 304C496.1 304 512 288.1 512 268.4V243.6C512 223.9 496.1 208 476.4 208z"
                />
              </svg>
            </router-link>
          </transition>
        </div>
      </transition>
    </div>
    <div :class="{ 'hidden-block': !active }"></div>
  </section>
  <section class="main-block">
    <BlockSlider />
  </section>
  <section class="main-block">
    <BlockShowFeature />
  </section>
  <section class="main-block">
    <BlockDashBoard class="ml-auto" />
  </section>
  <section class="main-block">
    <BlockTutorial />
  </section>
</template>

<script setup>
import BlockTutorial from '@/components/BlockTutorial'
import BlockSlider from '@/components/BlockSlider'
import BlockShowFeature from '@/components/BlockShowFeature'
import BlockDashBoard from '@/components/BlockDashBoard'
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
  scrollbar-width: none;
}
.main-block {
  @apply mx-auto py-3;
}
.slogan-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
.images {
  @apply h-full w-full object-cover;
}
.sticky-image {
  @apply absolute top-0 left-0 !important;
}
/* show-animation */
.show-text-down {
  @apply text-white;
  --move: 1.5rem;
  transform: translateY(var(--move));
  transition: 0.5s;
}
.show-text-up {
  --move: 10px;
}
.hidden-block {
  @apply block min-h-[50px];
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
  transition: all 0.4s ease;
  transform: translateY(0px);
}
.flip-enter-from,
.flip-leave-to {
  opacity: 0;
  transform: translateY(0.8rem);
}
</style>
