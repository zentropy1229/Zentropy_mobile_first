<template>
  <div class="mt-2 mb-1 h-32 rounded border-4 border-gray-700 bg-gray-900" ref="chartDom"></div>
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
.searchbox-container {
  @apply span-text flex w-full items-center justify-between font-medium;
}
.chart-searchbox {
  @apply w-3/4 rounded-sm p-[.18rem] text-center font-medium text-p;
}
.chart-page-btn {
  @apply shadow-set w-max rounded-sm py-[0.15rem] px-2 text-[length:var(--span-text)] hover:scale-105 hover:text-p;
  color: rgb(223, 223, 223);
}
</style>
