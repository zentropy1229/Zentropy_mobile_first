<template>
  <div class="flex min-h-screen flex-col bg-gray-900">
    <div class="container w-full"><div class="h-32 w-full" ref="chartDom"></div></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { onMounted, watchEffect } from '@vue/runtime-core'
const { DateTime } = require('luxon')
const chartDom = ref()
const route = useRoute()
const router = useRouter()
const stockData = ref([])
const option = ref({
  color: 'white',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  axisPointer: {
    link: { xAxisIndex: 'all' },
    snap: true,
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
  xAxis: [
    {
      type: 'category',
      data: computed(() => {
        return stockData.value.t
          .slice(0)
          .reverse()
          .map((items) => {
            return DateTime.fromMillis(items * 1000).toFormat('HH:mm')
          })
      }),
      boundaryGap: false,
      axisLabel: {
        interval: 240 / 4,
        formatter: function (value, index) {
          const h = +value.split(':')[0]
          if (h === 9) return h
          if (h === 10) return h
          if (h === 11) return h
          if (h === 12) return h
          if (h === 13) return h
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      max: computed(() => {
        return roundTwo(stockData.value.quote['12'] * 1.005)
      }),
      min: computed(() => {
        return roundTwo(stockData.value.quote['13'] / 1.005)
      }),
      interval: computed(() => {
        return roundTwo((stockData.value.quote['21'] * 0.05) / 8)
      }),
      axisLabel: {
        formatter: function (value) {
          return value.toFixed(2)
        },
        fontSize: '0.1rem'
      },
      splitLine: {
        lineStyle: {
          color: '#374151'
        }
      },
      scale: true,
      splitNumber: 3
    }
  ],
  series: [
    {
      data: computed(() => {
        return stockData.value.c.slice(0).reverse()
      }),
      type: 'line',
      showSymbol: false,
      symbolSize: 8,
      emphasis: {
        itemStyle: {
          color: 'white',
          scale: true,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'white'
        }
      },
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
        color: '#f3f4f6',
        width: 2
      },
      markLine: {
        symbol: 'none',
        label: {
          show: true,
          position: 'start',
          color: 'white',
          fontSize: '0.12rem'
        },
        lineStyle: {
          color: '#9CA3AF',
          type: 'solid'
        },
        data: [
          {
            yAxis: computed(() => {
              return stockData.value.quote['21']
            })
          }
        ]
      }
    }
  ]
})
// ================ methods =====================
const roundTwo = (num) => {
  return +(Math.round(num + 'e+1') + 'e-1')
}
const getStockData = async () => {
  try {
    const res = await axios.get(
      `https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:${route.params.stockid}:STOCK&quote=1`
    )
    if (res.data.data.o.length) {
      stockData.value = res.data.data
      return res.data.data
    } else {
      alert('股票代號錯誤')
      router.replace({ name: 'stockHome' })
    }
  } catch {
    console.log('錯誤')
    router.replace({ name: 'home' })
  }
}

// ================ life cycle =====================
onMounted(async () => {
  await getStockData()
  const myChart = echarts.init(chartDom.value)
  watchEffect((onInvalidate) => {
    myChart.setOption(option.value)
    const resizMyChart = () => myChart.resize()
    window.addEventListener('resize', resizMyChart)
    onInvalidate(() => {
      window.removeEventListener('resize', resizMyChart)
    })
  })
})
</script>

<style lang="postcss" scoped></style>
