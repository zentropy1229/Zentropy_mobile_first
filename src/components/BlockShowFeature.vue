<template>
  <div class="container" ref="feature">
    <div class="mb-2 lg:order-2">
      <h2 class="title-text">好用小工具</h2>
      <p class="subtitle-text-sm text-slate-400">以輕鬆的方式找到最適合的交易點</p>
    </div>
    <div class="flex flex-col lg:flex-row">
      <div class="basis-full lg:basis-1/2">
        <div
          class="w-25% mb-[.8rem] flex flex-col opacity-0"
          v-for="(intro, index) of introContent"
          :key="intro"
          :class="{ animation: active }"
          :style="{ '--delay-time': index / 5 + 's' }"
        >
          <div class="title-container subtitle-text relative mb-1 w-max pl-1">
            <h2>{{ intro.title }}</h2>
          </div>
          <p class="span-text-lg w-full text-slate-400">
            {{ intro.content }}
          </p>
        </div>
      </div>
      <div class="basis-full lg:ml-1 lg:basis-1/2">
        <img
          src="https://zentropy.s3.ap-northeast-1.amazonaws.com/img/table-demo.png"
          class="rounded-sm object-fill"
          alt="股票示意圖"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const feature = ref()
const active = ref(false)
const introContent = [
  {
    title: '即時成交資訊',
    content: 'Zentropy提供每分鐘即時更新的股價資訊，資料源自「臺灣證券交易所 TWSE」，可靠的資訊，不會遺漏每一個交易時機'
  },
  {
    title: '完善的圖表功能',
    content: '可排序及分類的股票清單，互動式的股票線圖，必要的功能全都有'
  },
  {
    title: '最即時的台股新聞',
    content:
      '除了個股頁面提供相關的即時新聞外，也精心篩選出熱到流汗的台股新聞，同時也有提供搜尋頁面，想知道的資訊全都有'
  }
]
let showFeature
onMounted(() => {
  showFeature = () => {
    const startPoint = feature.value.offsetTop - feature.value.offsetHeight * 1.5
    if (document.documentElement.scrollTop > startPoint) {
      active.value = true
    }
  }
  window.addEventListener('scroll', showFeature)
})
onUnmounted(() => {
  window.removeEventListener('scroll', showFeature)
})
</script>

<style lang="postcss" scoped>
.title-container::after {
  @apply absolute top-0 left-0 h-full w-[.1rem] bg-sky-500 content-[''];
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
