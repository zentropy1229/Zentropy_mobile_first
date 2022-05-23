<template>
  <div class="lg:flex-center container">
    <div class="mb-2 lg:order-2">
      <h2 class="title-text text-center">直覺可靠的預測方式</h2>
      <p class="subtitle-text-sm text-center text-slate-400">以輕鬆的方式找到最適合的交易點</p>
    </div>
    <div class="-mb-5 h-20 lg:order-1 lg:mr-auto lg:w-24">
      <DashBoard class="w-full" ref="dashBoard" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import DashBoard from '@/components/smallComponents/DashBoard'
const dashBoard = ref()
onMounted(() => {
  dashBoard.value.option.series[0] = {
    axisLine: {
      lineStyle: {
        color: [
          [0.333, '#10b981'],
          [0.666, '#d1d5db'],
          [1, '#ef4444']
        ]
      }
    },
    pointer: {
      itemStyle: {
        color: '#9ca3af'
      }
    },
    axisLabel: {
      // color: '#eab308'
      color: 'white'
    }
  }
})
</script>
