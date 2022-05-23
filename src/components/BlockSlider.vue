<template>
  <div class="relative flex flex-col">
    <div class="flex-center container mb-2.5 flex-col">
      <div class="flex-center mb-2 flex-col">
        <router-link :to="{ name: 'stockHome' }" class="mb-0.5 hover:text-gray-600">
          <span class="title-text text-white">Market Show市場趨勢</span>
        </router-link>
        <div class="subtitle-text-sm text-slate-400">
          <span>以各式各樣的圖表，視覺化呈現市場走向</span>
        </div>
      </div>
      <SmallCards />
    </div>
    <div
      class="slider-container relative hidden h-max overflow-hidden lg:block"
      @mouseenter="Show()"
      @mouseleave="noShow()"
    >
      <div class="chart-container relative mb-1.5 flex flex-nowrap" :style="{ '--place': move, '--time': time }">
        <div
          class="chart-image-container block basis-full px-[.5rem] py-[.2rem]"
          v-for="chart in newChartList"
          :key="chart.id"
          :class="{ scale: now === chart.id }"
        >
          <img
            class="chart-image h-[25vw] min-w-[50vw] rounded-sm border-2 border-gray-600 bg-gray-900 object-contain shadow-xl"
            :src="chart.src"
            alt="chart.content"
          />
        </div>
      </div>
      <div class="tools-group">
        <button class="prev-btn" @click="change(now - 1)" :disabled="active">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
            />
          </svg>
        </button>
        <button class="next-btn" @click="change(now + 1)" :disabled="active">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 16 16">
            <path
              d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
            />
          </svg>
        </button>
        <div class="flex-center gap-[0.15rem]">
          <label v-for="dots in chartImageList" :key="dots.id">
            <input
              type="radio"
              name="dots"
              class="input-dots hidden"
              :checked="nowRealStep === dots.id"
              @click="change(dots.id)"
            />
            <span class="dots block h-[.1rem] w-[.1rem] cursor-pointer rounded-full bg-sky-100"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import SmallCards from './smallComponents/SmallCards'
const now = ref(0)
const time = ref('')
const move = ref('')
const defaultWidth = ref(0)
const chartWidth = ref(0)
const active = ref(false)
const defaultTime = 300
const chartImageList = ref([
  {
    id: 0,
    src: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/slider-1.png',
    content: '',
    to: '#'
  },
  {
    id: 1,
    src: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/slider-2.png',
    content: '',
    to: '#'
  },
  {
    id: 2,
    src: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/slider-3.png',
    content: '',
    to: '#'
  },
  {
    id: 3,
    src: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/slider-4.png',
    content: '',
    to: '#'
  }
])
const newChartList = computed(() => {
  return chartImageList.value.slice(-2).concat(chartImageList.value.slice(0)).concat(chartImageList.value.slice(0, 2))
})
const nowRealStep = computed(() => {
  return now.value > chartImageList.value.length - 1 ? 0 : now.value < 0 ? chartImageList.value.length - 1 : now.value
})
const change = (index) => {
  const limit = newChartList.value.length - 1
  // Prevent multiclick //
  active.value = !active.value
  setTimeout(() => {
    active.value = !active.value
  }, defaultTime + 50)
  // start change
  now.value = index
  if (now.value < 0) {
    time.value = defaultTime + 'ms'
    now.value = limit - 4 // 現在正確的位置是 id 的最後一個
    move.value = -1 * -1 * chartWidth.value + defaultWidth.value + 'px' // 但是接下來要去的位置是-1位置的那個
    setTimeout(() => {
      time.value = 0 + 'ms' // 然後再快速變換到正確的位置
      move.value = -1 * now.value * chartWidth.value + defaultWidth.value + 'px'
    }, defaultTime)
    return
  }
  if (now.value > limit - 4) {
    time.value = defaultTime + 'ms'
    now.value = 0 // 現在正確的位置是 id 的第一個
    move.value = -1 * (limit - 3) * chartWidth.value + defaultWidth.value + 'px' // 但是接下來要去的位置是到數第二位置的那個
    setTimeout(() => {
      time.value = 0 + 'ms' // 然後再快速變換到正確的位置
      move.value = -1 * now.value * chartWidth.value + defaultWidth.value + 'px'
    }, defaultTime)
    return
  }
  time.value = defaultTime + 'ms'
  move.value = -1 * now.value * chartWidth.value + defaultWidth.value + 'px'
}
const initialPosition = () => {
  const imageContainerWidth = document.querySelector('.chart-image-container').offsetWidth
  const html = document.querySelector('html')
  const htmlSize = document.defaultView.getComputedStyle(html, null)
  defaultWidth.value = -1 * (1.5 * imageContainerWidth + parseInt(htmlSize.fontSize.split('px')[0])) // 初始化位置，移動1.5格
  chartWidth.value = imageContainerWidth
  // 接下來每一次需要增加的距離，因為前面把padding32扣掉了，所以這邊不用扣
  move.value = -1 * now.value * chartWidth.value + defaultWidth.value + 'px' // 移動
}
// --------------------- button show ---------------------//
const noShow = () => {
  document.querySelector('.prev-btn').style.setProperty('display', 'none')
  document.querySelector('.next-btn').style.setProperty('display', 'none')
}
const Show = () => {
  document.querySelector('.prev-btn').style.setProperty('display', 'block')
  document.querySelector('.next-btn').style.setProperty('display', 'block')
}
// --------------------- life Cycle ---------------------//
onMounted(() => {
  initialPosition()
  window.addEventListener('resize', initialPosition)
})
onUnmounted(() => {
  window.removeEventListener('resize', initialPosition)
})
</script>

<style scoped lang="postcss">
.chart-container {
  --time: 0ms;
  --place: 0px;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-duration: var(--time);
  transform: translate3d(var(--place), 0px, 0px);
}
.chart-image-container {
  --scale: 1;
  transform: scale(var(--scale));
  transition: var(--time);
}
.chart-image-container.scale {
  --scale: 1.05;
}
/* tools */
.next-btn,
.prev-btn {
  @apply absolute top-2/4 left-0 -translate-y-2/4 cursor-pointer bg-transparent text-sky-100/50;
}
.next-btn {
  @apply left-full -translate-x-full -translate-y-2/4;
}
.next-btn:hover,
.prev-btn:hover {
  @apply text-sky-500;
}
.input-dots:hover ~ .dots,
.input-dots:checked ~ .dots {
  @apply bg-sky-500;
}
</style>
