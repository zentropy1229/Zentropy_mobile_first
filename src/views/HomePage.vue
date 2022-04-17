<template>
  <section
    class="main-container relative -top-[var(--navbar-height)] -mb-[var(--navbar-height)] h-screen overflow-y-scroll"
    ref="main"
  >
    <div class="h-full">
      <transition grop name="fade" mode="in-out">
        <img
          src="https://picsum.photos/id/1033/3240/2160"
          class="images"
          :class="{ 'sticky-image': !active }"
          v-if="!active"
        />
        <img
          src="https://picsum.photos/id/261/3240/2160"
          class="images"
          :class="{ 'sticky-image': active }"
          v-else
        />
      </transition>
    </div>
    <div
      class="x-center absolute top-1/4 text-[.7rem] font-black lg:top-[30%] lg:left-[15%] lg:-translate-x-0 lg:font-bold"
    >
      <div :class="showAnimationClass">
        <span class="primary-title">Zentropy</span>
      </div>
      <transition name="flip">
        <div v-if="active" class="flex flex-col items-center">
          <span class="hidden text-p lg:block">交易好伙伴</span>
          <div class="flex flex-col items-center lg:hidden">
            <p class="primary-title text-p">Predict</p>
            <p class="primary-title text-white">Trading</p>
          </div>
          <transition name="flip">
            <button
              class="flex-center mt-1 rounded-[.25rem] bg-p p-1 text-[.35em] font-medium text-white hover:bg-white hover:text-black lg:w-full"
              v-if="active"
            >
              <span>Start Free</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-1 h-[.3rem] w-[.3rem]"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 13.5a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h4.793L2.146 2.854a.5.5 0 1 1 .708-.708L13 12.293V7.5a.5.5 0 0 1 1 0v6z"
                />
              </svg>
            </button>
          </transition>
        </div>
      </transition>
    </div>
    <div :class="{ 'hidden-block': !active }"></div>
  </section>
  <section class="main-block bg-gray-100/50">
    <BlockSlider />
  </section>
  <section class="main-block">
    <BlockShowFeature />
  </section>
  <section class="main-block bg-gray-100/50">
    <BlockTutorial />
  </section>
  <section class="main-block">
    <BlockDashBoard />
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
.primary-title {
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
