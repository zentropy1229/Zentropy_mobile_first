<template>
  <div class="container" ref="feature">
    <div
      class="mb-[.8rem] opacity-0"
      v-for="(num, index) of 3"
      :key="num"
      :class="{ animation: active }"
      :style="{ '--delay-time': index / 5 + 's' }"
    >
      <div
        class="title-container relative mb-1 w-max pl-1 text-[.25rem] font-bold"
      >
        <p>投資有預期</p>
        <p>禪能更放心</p>
      </div>
      <p class="text-[.18rem] text-gray-400">
        醫重條就快了兒性雄東不業整基們酒現營書車相增！高不的，素合我來檢故，用戲星問水。我開看處助對品上去味水活整身到，此的好友，華次顯家。時長班那教全英隨導冷小毛系家從是縣民直不操在小著那，化反雜著月。
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const feature = ref()
const active = ref(false)
let showFeature
onMounted(() => {
  showFeature = () => {
    const startPoint =
      feature.value.offsetTop - feature.value.offsetHeight * 1.5
    if (document.documentElement.scrollTop > startPoint) {
      active.value = true
    } else active.value = false
  }
  window.addEventListener('scroll', showFeature)
})
onUnmounted(() => {
  window.removeEventListener('scroll', showFeature)
})
</script>

<style lang="postcss" scoped>
.title-container::after {
  @apply absolute top-0 left-0 h-full w-[.1rem] bg-p content-[''];
}
.animation {
  --delay-time: 0s;
  animation: showFeature 2000ms ease-in-out forwards;
  animation-delay: var(--delay-time);
}
@keyframes showFeature {
  0% {
    transform: translateX(-200px);
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
