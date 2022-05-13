<template>
  <div class="flex-center mt-2 mb-1 flex-col rounded border-4 border-gray-700 bg-gray-900 text-white">
    <div class="flex-center mb-1 w-full gap-1 border-b-4 border-gray-700 pb-1">
      <button class="span-text border-x-4 border-b-4 border-gray-700 bg-gray-800 px-1 py-0.5 font-medium hover:scale-105 hover:bg-gray-600" v-for="i in 5" :key="i">台股大盤</button>
    </div>
    <div class="flex-center flex-col">
      <div class="mb-1 w-full border-b-4 border-gray-500 pb-0.5 text-center"><h2 class="subtitle-text">台股大盤行情</h2></div>
      <div class="mb-1 flex w-full items-end justify-between">
        <div class="flex w-full flex-col">
          <span class="subtitle-text mb-0.5">上市行情</span>
          <div class="flex items-end">
            <span class="subtitle-text-sm block leading-none text-gray-500">成交</span>
            <span class="subtitle-text ml-0.5 block font-bold leading-none">2255.69 億</span>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <span class="mb-0.5 text-[0.4rem] font-bold leading-none text-rose-500">15832.54</span>
          <div class="flex items-center leading-none">
            <svg class="h-1 w-1 rotate-180 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor">
              <path
                d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
              /></svg
            ><span class="text-[0.17rem] font-medium text-rose-500">115.18 (1.59%)</span>
          </div>
        </div>
      </div>
      <div class="flex">
        <div v-for="i in 4" :key="i" class="trade-info border-gray-600">
          <span class="block border-b border-dashed border-gray-600 py-0.5 text-gray-600">開盤</span>
          <span class="block py-0.5 text-gray-200">7233.34</span>
        </div>
      </div>
    </div>
    <div class="h-28 w-full" ref="chartDom"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref } from 'vue'
let resizeMyChart
const chartDom = ref()
const option = ref({
  color: 'white',
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  axisPointer: {
    link: { xAxisIndex: 'all' },
    label: {
      backgroundColor: '#777'
    }
  },
  grid: [
    {
      left: '5%',
      right: '5%'
    }
  ],
  xAxis: [{ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], boundaryGap: false }],
  yAxis: [{ type: 'value' }],
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(247, 252, 255, 0.499)' // 0% 处的颜色
            },
            {
              offset: 0.7,
              color: 'rgba(247, 252, 255, 0)' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      lineStyle: {
        color: 'rgb(223, 223, 223)'
      }
    }
  ]
})
onMounted(() => {
  const myChart = echarts.init(chartDom.value)
  option.value && myChart.setOption(option.value)
  resizeMyChart = () => myChart.resize()
  window.addEventListener('resize', resizeMyChart)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeMyChart)
})
</script>

<style lang="postcss" scoped>
span {
  letter-spacing: 0.015rem;
}
.trade-info {
  @apply subtitle-text-sm border-dashed border-gray-600 px-2 text-center;
}
.trade-info:nth-last-child(1) {
  border-right: 0;
}
</style>
