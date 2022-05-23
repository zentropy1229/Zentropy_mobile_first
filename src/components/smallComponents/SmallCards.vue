<template>
  <div class="flex flex-col gap-2 text-white md:flex-row" :class="{ animation: active }" ref="list">
    <div
      class="span-text-lg flex flex-col justify-between rounded-md bg-gray-900 p-1"
      v-for="list in priceList"
      :key="list.name"
    >
      <div class="mb-1 flex justify-between">
        <div class="flex flex-col font-bold">
          <span>{{ list.name }}</span>
          <span
            :class="{
              'text-red-500': list.delta > 0,
              'text-green-500': list.delta < 0
            }"
            >{{ list.price }}</span
          >
        </div>
        <div
          class="flex-center ml-2 h-[.6rem] w-[.6rem] rounded-full text-white"
          :class="{
            'bg-red-500': list.delta > 0,
            'bg-green-500': list.delta < 0
          }"
        >
          <span>{{ list.delta }}%</span>
        </div>
      </div>
      <div class="flex justify-between text-gray-400">
        <span>成交量</span>
        <span>{{ list.trade }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const list = ref()
const active = ref(false)
let showCards
const priceList = ref([
  {
    name: '台指數',
    price: '17625.59',
    delta: 0.38,
    trade: '2345.96億'
  },
  {
    name: '櫃買指數',
    price: '216.55',
    delta: -0.23,
    trade: '628.74億'
  },
  {
    name: '台指期',
    price: '17,520.00',
    delta: -0.21,
    trade: '51,329口'
  }
])
onMounted(() => {
  showCards = () => {
    if (document.documentElement.scrollTop > list.value.offsetTop) {
      active.value = true
    } else active.value = false
  }
  window.addEventListener('scroll', showCards)
})
onUnmounted(() => {
  window.removeEventListener('scroll', showCards)
})
</script>

<style scoped>
.animation {
  animation: initalShow 1s ease forwards;
}
@keyframes initalShow {
  0% {
    transform: translateY(100px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
