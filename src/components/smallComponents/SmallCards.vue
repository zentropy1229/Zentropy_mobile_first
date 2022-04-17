<template>
  <div
    class="flex flex-col gap-2 md:flex-row"
    :class="{ animation: active }"
    ref="list"
  >
    <div
      class="flex flex-col justify-between rounded-md border-2 bg-white p-1 text-[.2rem] shadow-lg"
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
          class="flex-center ml-2 h-[.6rem] w-[.6rem] rounded-full text-[.18rem] text-white"
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
  const listScrollHeight = list.value.scrollHeight
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > listScrollHeight - 24) {
      active.value = true
    } else active.value = false
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
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
