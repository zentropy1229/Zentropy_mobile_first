<template>
  <div class="relative flex flex-col">
    <div class="flex-center container mb-2 flex-col">
      <div class="flex-center mb-2 flex-col">
        <a class="title-text text-black hover:text-gray-600" href="#">
          <span>Market Show市場趨勢</span>
        </a>
        <div class="subtitle-text mt-1 text-gray-300">
          <span>這裡可以放一些我們整理好的圖片，如果要用canvas畫也可以喔</span>
        </div>
      </div>
      <div>
        <SmallCards />
      </div>
    </div>
    <div
      class="slider-container relative hidden h-max overflow-hidden lg:block"
      @mouseenter="Show()"
      @mouseleave="noShow()"
    >
      <div
        class="chart-container relative my-1 flex flex-nowrap"
        :style="{ '--place': move, '--time': time }"
      >
        <div
          class="chart-image-container block basis-full px-[.5rem] py-[.4rem]"
          v-for="chart in newChartList"
          :key="chart.id"
          :class="{ scale: now === chart.id }"
        >
          <img
            class="chart-image h-[25vw] min-w-[50vw] border border-slate-100 bg-white object-contain shadow-xl"
            :src="chart.src"
            alt="chart.content"
          />
        </div>
      </div>
      <div class="tools-group">
        <button class="prev-btn" @click="change(now - 1)" :disabled="active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
            />
          </svg>
        </button>
        <button class="next-btn" @click="change(now + 1)" :disabled="active">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
            />
          </svg>
        </button>
        <div class="flex-center gap-1">
          <label v-for="dots in chartImageList" :key="dots.id">
            <input
              type="radio"
              name="dots"
              class="input-dots hidden"
              :checked="nowRealStep === dots.id"
              @click="change(dots.id)"
            />
            <span
              class="dots block h-[.1rem] w-[.1rem] cursor-pointer rounded-full bg-pbtn"
            ></span>
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
    src: 'https://image-charts.com/chart.js/2.8.0?bkg=white&icac=documentation&c=ewogICJ0eXBlIjogImJhciIsCiAgImRhdGEiOiB7CiAgICAibGFiZWxzIjogWwogICAgICAiSmFudWFyeSIsCiAgICAgICJGZWJydWFyeSIsCiAgICAgICJNYXJjaCIsCiAgICAgICJBcHJpbCIsCiAgICAgICJNYXkiLAogICAgICAiSnVuZSIsCiAgICAgICJKdWx5IgogICAgXSwKICAgICJkYXRhc2V0cyI6IFsKICAgICAgewogICAgICAgICJsYWJlbCI6ICJEYXRhc2V0IDEiLAogICAgICAgICJiYWNrZ3JvdW5kQ29sb3IiOiBbCiAgICAgICAgICAicmdiKDI1NSwgOTksIDEzMikiLAogICAgICAgICAgInJnYigyNTUsIDE1OSwgNjQpIiwKICAgICAgICAgICJyZ2IoMjU1LCAyMDUsIDg2KSIsCiAgICAgICAgICAicmdiKDc1LCAxOTIsIDE5MikiLAogICAgICAgICAgInJnYig1NCwgMTYyLCAyMzUpIiwKICAgICAgICAgICJyZ2IoMTUzLCAxMDIsIDI1NSkiLAogICAgICAgICAgInJnYigyNTUsIDk5LCAxMzIpIgogICAgICAgIF0sCiAgICAgICAgInlBeGlzSUQiOiAieSIsCiAgICAgICAgImRhdGEiOiBbCiAgICAgICAgICAyMjYsCiAgICAgICAgICAxNiwKICAgICAgICAgIC00NCwKICAgICAgICAgIDg0LAogICAgICAgICAgLTExLAogICAgICAgICAgLTE0LAogICAgICAgICAgMjUKICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibGFiZWwiOiAiRGF0YXNldCAyIiwKICAgICAgICAiYmFja2dyb3VuZENvbG9yIjogInJnYigyMDEsIDIwMywgMjA3KSIsCiAgICAgICAgInlBeGlzSUQiOiAieTEiLAogICAgICAgICJkYXRhIjogWwogICAgICAgICAgLTYxLAogICAgICAgICAgMjEsCiAgICAgICAgICAtNjgsCiAgICAgICAgICAtNTAsCiAgICAgICAgICAtNTYsCiAgICAgICAgICA4OSwKICAgICAgICAgIC05NQogICAgICAgIF0KICAgICAgfQogICAgXQogIH0sCiAgIm9wdGlvbnMiOiB7CiAgICAidGl0bGUiOiB7CiAgICAgICJkaXNwbGF5IjogdHJ1ZSwKICAgICAgInRleHQiOiAiQ2hhcnQuanMgQmFyIENoYXJ0IC0gTXVsdGkgQXhpcyIKICAgIH0sCiAgICAidG9vbHRpcHMiOiB7CiAgICAgICJtb2RlIjogImluZGV4IiwKICAgICAgImludGVyc2VjdCI6IHRydWUKICAgIH0sCiAgICAic2NhbGVzIjogewogICAgICAieUF4ZXMiOiBbCiAgICAgICAgewogICAgICAgICAgImlkIjogInkiLAogICAgICAgICAgInR5cGUiOiAibGluZWFyIiwKICAgICAgICAgICJkaXNwbGF5IjogdHJ1ZSwKICAgICAgICAgICJwb3NpdGlvbiI6ICJsZWZ0IgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgImlkIjogInkxIiwKICAgICAgICAgICJ0eXBlIjogImxpbmVhciIsCiAgICAgICAgICAiZGlzcGxheSI6IHRydWUsCiAgICAgICAgICAicG9zaXRpb24iOiAicmlnaHQiLAogICAgICAgICAgImdyaWRMaW5lcyI6IHsKICAgICAgICAgICAgImRyYXdPbkNoYXJ0QXJlYSI6IGZhbHNlCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdCiAgICB9CiAgfQp9&encoding=base64&ichm=7997509fe74b92a1098f26d164bf3cc208bd89be3e615fe62f1fa40b19712370',
    content: '',
    to: '#'
  },
  {
    id: 1,
    src: 'https://image-charts.com/chart.js/2.8.0?bkg=white&icac=documentation&c=ewogIHR5cGU6ICdiYXInLAogIGRhdGE6IHsKICAgIGxhYmVsczogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknXSwKICAgIGRhdGFzZXRzOiBbCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMScsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDI1NSwgOTksIDEzMiknLAogICAgICAgIGRhdGE6IFs1MiwgLTkzLCAtMjUsIC02NywgNTEsIC05NywgOV0sCiAgICAgIH0sCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMicsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDU0LCAxNjIsIDIzNSknLAogICAgICAgIGRhdGE6IFsxNywgMTMsIC0zOCwgODksIC0xMCwgNzUsIC01Ml0sCiAgICAgIH0sCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMycsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDc1LCAxOTIsIDE5MiknLAogICAgICAgIGRhdGE6IFstODQsIDMzLCA4MCwgNzUsIC04MywgLTM0LCAtNTBdLAogICAgICB9LAogICAgXSwKICB9LAogIG9wdGlvbnM6IHsKICAgIHRpdGxlOiB7CiAgICAgIGRpc3BsYXk6IHRydWUsCiAgICAgIHRleHQ6ICdDaGFydC5qcyBCYXIgQ2hhcnQgLSBTdGFja2VkJywKICAgIH0sCiAgICBzY2FsZXM6IHsKICAgICAgeEF4ZXM6IFsKICAgICAgICB7CiAgICAgICAgICBzdGFja2VkOiB0cnVlLAogICAgICAgIH0sCiAgICAgIF0sCiAgICAgIHlBeGVzOiBbCiAgICAgICAgewogICAgICAgICAgc3RhY2tlZDogdHJ1ZSwKICAgICAgICB9LAogICAgICBdLAogICAgfSwKICB9LAp9Cg%3D%3D&encoding=base64&ichm=203f6426d1f74cf129d145097970b1c8f6ca9144b8ad4134229df8fbb80ad3af',
    content: '',
    to: '#'
  },
  {
    id: 2,
    src: 'https://image-charts.com/chart?chbr=8&chd=t%3A10%2C15%2C25%2C30%2C40%2C80&chf=b0%2Clg%2C90%2C05B142%2C1%2C0CE858%2C0.2&chl=%7C%7C%7C%7C%2033%25%20!%7Cx2%20&chma=0%2C0%2C10%2C10&chs=700x450&cht=bvs&chtt=Revenue%20per%20month&chxl=0%3A%7CJan%7CFev%7CMar%7CAvr%7CMay&chxs=1N*cUSD0sz*%2C000000%2C14&chxt=x%2Cy&iclocale=en&icretina=1&icac=documentation&ichm=0b5aa5aee9abf7d2bc22a7ff1cffcd9ea7c72762a2673ed360da933ff54a330b',
    content: '',
    to: '#'
  },
  {
    id: 3,
    src: 'https://image-charts.com/chart.js/2.8.0?bkg=white&icac=documentation&c=ewogICJ0eXBlIjogImJhciIsCiAgImRhdGEiOiB7CiAgICAibGFiZWxzIjogWwogICAgICAiSmFudWFyeSIsCiAgICAgICJGZWJydWFyeSIsCiAgICAgICJNYXJjaCIsCiAgICAgICJBcHJpbCIsCiAgICAgICJNYXkiLAogICAgICAiSnVuZSIsCiAgICAgICJKdWx5IgogICAgXSwKICAgICJkYXRhc2V0cyI6IFsKICAgICAgewogICAgICAgICJsYWJlbCI6ICJEYXRhc2V0IDEiLAogICAgICAgICJiYWNrZ3JvdW5kQ29sb3IiOiBbCiAgICAgICAgICAicmdiKDI1NSwgOTksIDEzMikiLAogICAgICAgICAgInJnYigyNTUsIDE1OSwgNjQpIiwKICAgICAgICAgICJyZ2IoMjU1LCAyMDUsIDg2KSIsCiAgICAgICAgICAicmdiKDc1LCAxOTIsIDE5MikiLAogICAgICAgICAgInJnYig1NCwgMTYyLCAyMzUpIiwKICAgICAgICAgICJyZ2IoMTUzLCAxMDIsIDI1NSkiLAogICAgICAgICAgInJnYigyNTUsIDk5LCAxMzIpIgogICAgICAgIF0sCiAgICAgICAgInlBeGlzSUQiOiAieSIsCiAgICAgICAgImRhdGEiOiBbCiAgICAgICAgICAyMjYsCiAgICAgICAgICAxNiwKICAgICAgICAgIC00NCwKICAgICAgICAgIDg0LAogICAgICAgICAgLTExLAogICAgICAgICAgLTE0LAogICAgICAgICAgMjUKICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibGFiZWwiOiAiRGF0YXNldCAyIiwKICAgICAgICAiYmFja2dyb3VuZENvbG9yIjogInJnYigyMDEsIDIwMywgMjA3KSIsCiAgICAgICAgInlBeGlzSUQiOiAieTEiLAogICAgICAgICJkYXRhIjogWwogICAgICAgICAgLTYxLAogICAgICAgICAgMjEsCiAgICAgICAgICAtNjgsCiAgICAgICAgICAtNTAsCiAgICAgICAgICAtNTYsCiAgICAgICAgICA4OSwKICAgICAgICAgIC05NQogICAgICAgIF0KICAgICAgfQogICAgXQogIH0sCiAgIm9wdGlvbnMiOiB7CiAgICAidGl0bGUiOiB7CiAgICAgICJkaXNwbGF5IjogdHJ1ZSwKICAgICAgInRleHQiOiAiQ2hhcnQuanMgQmFyIENoYXJ0IC0gTXVsdGkgQXhpcyIKICAgIH0sCiAgICAidG9vbHRpcHMiOiB7CiAgICAgICJtb2RlIjogImluZGV4IiwKICAgICAgImludGVyc2VjdCI6IHRydWUKICAgIH0sCiAgICAic2NhbGVzIjogewogICAgICAieUF4ZXMiOiBbCiAgICAgICAgewogICAgICAgICAgImlkIjogInkiLAogICAgICAgICAgInR5cGUiOiAibGluZWFyIiwKICAgICAgICAgICJkaXNwbGF5IjogdHJ1ZSwKICAgICAgICAgICJwb3NpdGlvbiI6ICJsZWZ0IgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgImlkIjogInkxIiwKICAgICAgICAgICJ0eXBlIjogImxpbmVhciIsCiAgICAgICAgICAiZGlzcGxheSI6IHRydWUsCiAgICAgICAgICAicG9zaXRpb24iOiAicmlnaHQiLAogICAgICAgICAgImdyaWRMaW5lcyI6IHsKICAgICAgICAgICAgImRyYXdPbkNoYXJ0QXJlYSI6IGZhbHNlCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdCiAgICB9CiAgfQp9&encoding=base64&ichm=7997509fe74b92a1098f26d164bf3cc208bd89be3e615fe62f1fa40b19712370',
    content: '',
    to: '#'
  },
  {
    id: 4,
    src: 'https://image-charts.com/chart.js/2.8.0?bkg=white&icac=documentation&c=ewogIHR5cGU6ICdiYXInLAogIGRhdGE6IHsKICAgIGxhYmVsczogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknXSwKICAgIGRhdGFzZXRzOiBbCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMScsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDI1NSwgOTksIDEzMiknLAogICAgICAgIGRhdGE6IFs1MiwgLTkzLCAtMjUsIC02NywgNTEsIC05NywgOV0sCiAgICAgIH0sCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMicsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDU0LCAxNjIsIDIzNSknLAogICAgICAgIGRhdGE6IFsxNywgMTMsIC0zOCwgODksIC0xMCwgNzUsIC01Ml0sCiAgICAgIH0sCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMycsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDc1LCAxOTIsIDE5MiknLAogICAgICAgIGRhdGE6IFstODQsIDMzLCA4MCwgNzUsIC04MywgLTM0LCAtNTBdLAogICAgICB9LAogICAgXSwKICB9LAogIG9wdGlvbnM6IHsKICAgIHRpdGxlOiB7CiAgICAgIGRpc3BsYXk6IHRydWUsCiAgICAgIHRleHQ6ICdDaGFydC5qcyBCYXIgQ2hhcnQgLSBTdGFja2VkJywKICAgIH0sCiAgICBzY2FsZXM6IHsKICAgICAgeEF4ZXM6IFsKICAgICAgICB7CiAgICAgICAgICBzdGFja2VkOiB0cnVlLAogICAgICAgIH0sCiAgICAgIF0sCiAgICAgIHlBeGVzOiBbCiAgICAgICAgewogICAgICAgICAgc3RhY2tlZDogdHJ1ZSwKICAgICAgICB9LAogICAgICBdLAogICAgfSwKICB9LAp9Cg%3D%3D&encoding=base64&ichm=203f6426d1f74cf129d145097970b1c8f6ca9144b8ad4134229df8fbb80ad3af',
    content: '',
    to: '#'
  },
  {
    id: 5,
    src: 'https://image-charts.com/chart?chbr=8&chd=t%3A10%2C15%2C25%2C30%2C40%2C80&chf=b0%2Clg%2C90%2C05B142%2C1%2C0CE858%2C0.2&chl=%7C%7C%7C%7C%2033%25%20!%7Cx2%20&chma=0%2C0%2C10%2C10&chs=700x450&cht=bvs&chtt=Revenue%20per%20month&chxl=0%3A%7CJan%7CFev%7CMar%7CAvr%7CMay&chxs=1N*cUSD0sz*%2C000000%2C14&chxt=x%2Cy&iclocale=en&icretina=1&icac=documentation&ichm=0b5aa5aee9abf7d2bc22a7ff1cffcd9ea7c72762a2673ed360da933ff54a330b',
    content: '',
    to: '#'
  }
])
const newChartList = computed(() => {
  return chartImageList.value
    .slice(-2)
    .concat(chartImageList.value.slice(0))
    .concat(chartImageList.value.slice(0, 2))
})
const nowRealStep = computed(() => {
  return now.value > chartImageList.value.length - 1
    ? 0
    : now.value < 0
      ? chartImageList.value.length - 1
      : now.value
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
  const imageContainerWidth = document.querySelector(
    '.chart-image-container'
  ).offsetWidth
  const html = document.querySelector('html')
  const htmlSize = document.defaultView.getComputedStyle(html, null)
  defaultWidth.value =
    -1 *
    (1.5 * imageContainerWidth + parseInt(htmlSize.fontSize.split('px')[0])) // 初始化位置，移動1.5格
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
  @apply absolute top-2/4 left-0 -translate-y-2/4 cursor-pointer bg-transparent text-pbtn;
}
.next-btn {
  @apply left-full -translate-x-full -translate-y-2/4;
}
.next-btn:hover,
.prev-btn:hover {
  @apply text-phover;
}
.input-dots:hover ~ .dots,
.input-dots:checked ~ .dots {
  @apply bg-phover;
}
</style>
