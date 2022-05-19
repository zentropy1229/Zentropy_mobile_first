<template>
  <div class="flex min-h-screen flex-col bg-gray-800">
    <div class="container mb-1 w-full text-white">
      <div class="px-0.5">
        <div class="mt-2 rounded-sm bg-gray-900 px-0.5">
          <div class="mb-1 border-b-2 border-gray-600">
            <div class="span-text flex flex-col items-center px-2 py-1 lg:flex-row lg:items-end">
              <div class="flex flex-col lg:flex-row lg:items-end">
                <div class="mb-0.5 flex flex-col items-center lg:mb-0 lg:flex-row lg:items-end">
                  <span class="title-text mb-0.5 leading-none lg:mb-0">{{ getStockDetail.stockName }}</span>
                  <div class="ml-0.5 flex flex-col items-start">
                    <span class="subtitle-text leading-none text-gray-400">{{ route.params.stockid }}.TW</span>
                    <span class="span-text-sm leading-none text-gray-500">產業別：{{ industry }}</span>
                  </div>
                </div>
                <div class="ml-1 mb-1 flex items-end font-medium lg:mb-0">
                  <span class="text-[0.3rem] font-bold leading-none">{{ getStockDetail.price }}</span>
                  <span class="text-[0.13rem] leading-none text-gray-400">.TWD</span>
                  <span class="ml-0.5 text-[0.16rem] leading-none" :class="upOrDown">{{ getStockDetail.upDown }}</span>
                  <span class="ml-[0.05rem] text-[0.16rem] leading-none" :class="upOrDown"
                    >({{ getStockDetail.upDownPercent }}%)</span
                  >
                </div>
              </div>
              <button
                class="flex items-center rounded-sm border px-1 py-0.5 hover:bg-orange-300 hover:text-gray-800 lg:ml-auto lg:mr-1"
              >
                <svg
                  class="block h-[0.2rem] w-[0.2rem]"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM342.6 278.6C330.1 291.1 309.9 291.1 297.4 278.6L240 221.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L217.4 153.4C229.9 140.9 250.1 140.9 262.6 153.4L320 210.7L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L342.6 278.6z"
                  />
                </svg>
                <span class="subtitle-text-sm ml-0.5">技術圖表</span>
              </button>
            </div>
          </div>
          <div class="ml-2 flex flex-wrap gap-1">
            <div class="flex items-end">
              <span class="leading-none text-gray-400 after:absolute after:bottom-0 after:bg-rose-400">開盤</span
              ><span class="ml-1 text-[0.2rem] font-bold leading-none">{{ getStockDetail.open }}</span>
            </div>
            <div class="flex items-end">
              <span class="leading-none text-gray-400">最高</span
              ><span class="ml-1 text-[0.2rem] font-bold leading-none">{{ getStockDetail.high }}</span>
            </div>
            <div class="flex items-end">
              <span class="leading-none text-gray-400">最低</span
              ><span class="ml-1 text-[0.2rem] font-bold leading-none">{{ getStockDetail.low }}</span>
            </div>
            <div class="flex items-end">
              <span class="leading-none text-gray-400">昨收</span
              ><span class="ml-1 text-[0.2rem] font-bold leading-none">{{ getStockDetail.yesterday }}</span>
            </div>
          </div>
          <div class="h-20 w-full p-0.5 lg:h-28" ref="chartDom"></div>
        </div>
      </div>
    </div>
    <div class="container flex w-full flex-col text-white lg:flex-row">
      <div class="w-full lg:w-[66.666%]">
        <h2 class="subtitle-text-lg ml-0.5 mb-1">個股新聞</h2>
        <stock-page-news :keyword="route.params.stockid + getStockDetail.stockName" />
      </div>
      <div class="w-full px-0.5 lg:w-[33.333%]">
        <h2 class="subtitle-text-lg mb-1">AI技術分析</h2>
        <div class="h-12 bg-white"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import * as echarts from 'echarts'
import getCatagories from '@/utils/getCatagories.js'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, onMounted, watchPostEffect } from 'vue'
import StockPageNews from '@/components/StockTools/StockPageNews'
const { DateTime } = require('luxon')
const route = useRoute()
const router = useRouter()
const chartDom = ref()
const stockData = ref()
const industry = ref('')
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
      show: true,
      borderColor: '#374151',
      left: '5%',
      right: '5%',
      top: '3%'
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
      show: computed(() => {
        return !(window.innerWidth < 768)
      }),
      type: 'value',
      max: computed(() => {
        return roundTwo(stockData.value.quote['12'] * 1.03)
      }),
      min: computed(() => {
        return roundTwo(stockData.value.quote['13'] / 1.02)
      }),
      interval: computed(() => {
        return roundTwo((stockData.value.quote['21'] * 0.1) / 8)
      }),
      axisLabel: {
        formatter: function (value) {
          return value.toFixed(2)
        },
        fontSize: '0.1rem'
      },
      splitLine: {
        show: false,
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
          show: computed(() => {
            return !(window.innerWidth < 768)
          }),
          position: 'start',
          color: '#171717',
          fontSize: '0.12rem',
          backgroundColor: '#f4f4f5',
          padding: 4,
          borderRadius: 5
        },
        lineStyle: {
          color: 'rgba(212,212,216, 0.5)',
          type: 'solid',
          width: 2
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
const getStockData = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:${route.params.stockid}:STOCK&quote=1`
      )
      .then((res) => {
        if (res.data.data.o.length) {
          stockData.value = res.data.data
          resolve(res.data.data)
        } else {
          router.replace({ name: '404' })
          throw new Error('StockID is not exist')
        }
      })
  })
}
// ================ computed =====================
const getStockDetail = computed(() => {
  if (stockData.value) {
    const _data = stockData.value
    const upDown = _data.quote['220027'] > 0 ? `+ ${_data.quote['220027']}` : _data.quote['220027']
    const upDownPercent = _data.quote['56'] > 0 ? `+ ${_data.quote['56']}` : _data.quote['56']
    return {
      stockName: _data.quote['200009'],
      price: _data.quote['6'].toFixed(2),
      open: _data.o.slice(-1)[0].toFixed(2),
      high: _data.quote['12'].toFixed(2),
      low: _data.quote['13'].toFixed(2),
      yesterday: _data.quote['21'].toFixed(2),
      upDown: upDown,
      upDownPercent: upDownPercent,
      volumn: Math.round(_data.quote['800001']) + '張',
      pN: stockData.value.quote['220027']
    }
  } else {
    return '-'
  }
})
const upOrDown = computed(() => {
  return getStockDetail.value.pN > 0
    ? { 'text-rose-500': true }
    : getStockDetail.value.pN < 0
      ? { 'text-green-500': true }
      : { 'text-gray-200': true }
})
// ================ life cycle =====================
onMounted(() => {
  getCatagories(route.params.stockid).then((res) => {
    industry.value = res[0]
  })
  getStockData().then((res) => {
    const myChart = echarts.init(chartDom.value)
    const resizMyChart = () => myChart.resize()
    watchPostEffect((onInvalidate) => {
      myChart.setOption(option.value)
      window.addEventListener('resize', resizMyChart)
      onInvalidate(() => {
        window.removeEventListener('resize', resizMyChart)
      })
    })
  })
  watchPostEffect((onInvalidate) => {
    const updateData = setInterval(getStockData, 60000)
    onInvalidate(() => {
      clearInterval(updateData)
    })
  })
})
// ================ end =====================
</script>

<style lang="postcss" scoped></style>
