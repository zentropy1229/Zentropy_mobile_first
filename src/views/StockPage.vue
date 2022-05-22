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
                @click="changeBlock()"
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
                <span class="subtitle-text-sm ml-0.5" v-if="chartBlock === 'chart'">技術圖表</span>
                <span class="subtitle-text-sm ml-0.5" v-else>基本線圖</span>
              </button>
            </div>
          </div>
          <div v-show="chartBlock === 'chart'">
            <!-- stock detail text -->
            <div class="ml-2 mr-3 flex flex-wrap gap-1">
              <div class="flex items-end">
                <span class="stock-info-title">開盤</span><span class="stock-info-data">{{ getStockDetail.open }}</span>
              </div>
              <div class="flex items-end">
                <span class="stock-info-title">最高</span><span class="stock-info-data">{{ getStockDetail.high }}</span>
              </div>
              <div class="flex items-end">
                <span class="stock-info-title">最低</span><span class="stock-info-data">{{ getStockDetail.low }}</span>
              </div>
              <div class="flex items-end">
                <span class="stock-info-title">昨收</span
                ><span class="stock-info-data">{{ getStockDetail.yesterday }}</span>
              </div>
              <div class="flex items-end">
                <span class="stock-info-title">成交量</span
                ><span class="stock-info-data">{{ getStockDetail.volumn }}</span>
              </div>
              <div class="ml-auto">
                <button
                  class="fav-btn text-p"
                  @click="modifyFavStocks('add', route.params.stockid)"
                  v-if="!checkFavStock"
                >
                  加入自選股
                </button>
                <button class="fav-btn text-rose-400" @click="modifyFavStocks('remove', route.params.stockid)" v-else>
                  移除自選股
                </button>
              </div>
            </div>
            <!-- charts dom -->
            <div class="h-20 w-full p-0.5 lg:h-28" ref="chartDom"></div>
          </div>
          <!-- kbar component -->
          <k-bar v-if="chartBlock === 'kBar'" />
        </div>
      </div>
    </div>
    <div class="container flex w-full flex-col text-white lg:flex-row">
      <div class="order-2 w-full lg:order-1 lg:w-[66.666%]">
        <h2 class="subtitle-text-lg mb-1 ml-0.5">個股新聞</h2>
        <stock-page-news :keyword="route.params.stockid + getStockDetail.stockName" />
      </div>
      <div class="order-1 w-full px-0.5 lg:order-2 lg:w-[33.333%]">
        <h2 class="subtitle-text-lg mb-1">AI技術分析</h2>
        <dash-board-combine class="w-full" />
        <h2 class="subtitle-text-lg mb-1">產業熱門股</h2>
        <industry-hot-stock class="mb-1 lg:mb-4" :industry="industry" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import * as echarts from 'echarts'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import getCatagories from '@/utils/getCatagories.js'
import modifyFavStocks from '@/utils/modifyFavStocks'
import { ref, computed, onMounted, watchEffect } from 'vue'
// ================ components =====================

import KBar from '@/components/StockTools/KBar'
import StockPageNews from '@/components/StockTools/StockPageNews'
import DashBoardCombine from '@/components/StockTools/DashBoardCombine'
import IndustryHotStock from '@/components/StockTools/IndustryHotStock'

// ================ refs =====================

const { DateTime } = require('luxon')
const store = useStore()
const route = useRoute()
const chartDom = ref()
const stockData = ref()
const industry = ref('')
const chartBlock = ref('chart')
const option = ref({
  color: 'white',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
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
        return roundTwo(Math.max(stockData.value.quote['12'], stockData.value.quote['21']) * 1.03)
      }),
      min: computed(() => {
        return roundTwo(Math.min(stockData.value.quote['13'], stockData.value.quote['21']) / 1.02)
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
      name: '成交價',
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
    },
    {
      name: '交易量',
      type: 'line',
      color: 'rgb(64, 124, 255)',
      showSymbol: false,
      data: computed(() => {
        return stockData.value.v.slice(0).reverse()
      }),
      lineStyle: {
        opacity: 0
      }
    }
  ]
})

// ================ methods =====================

// round data
const roundTwo = (num) => {
  return +(Math.round(num + 'e+1') + 'e-1')
}
// get stock data
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
          window.location.replace('/404')
          reject(new Error('StockID is not exist'))
        }
      })
  })
}
// change chart block
/**
 * @param {String} type chart type 'chart', 'kBar'
 */
const changeBlock = () => {
  chartBlock.value = chartBlock.value === 'chart' ? 'kBar' : 'chart'
}
// ================ computed =====================

// normalize stock data
const getStockDetail = computed(() => {
  if (stockData.value) {
    const _data = stockData.value
    const upDown = _data.quote['220027'] > 0 ? `+ ${_data.quote['220027']}` : _data.quote['220027']
    const upDownPercent = _data.quote['56'] > 0 ? `+ ${_data.quote['56']}` : _data.quote['56']
    return {
      stockName: _data.quote['200009'],
      price: _data.quote['6'] ? _data.quote['6'].toFixed(2) : '-',
      open: _data.o.slice(-1)[0] ? _data.o.slice(-1)[0].toFixed(2) : '-',
      high: _data.quote['12'] ? _data.quote['12'].toFixed(2) : '-',
      low: _data.quote['13'] ? _data.quote['13'].toFixed(2) : '-',
      yesterday: _data.quote['21'] ? _data.quote['21'].toFixed(2) : '-',
      upDown: upDown,
      upDownPercent: upDownPercent,
      volumn: Math.round(_data.quote['800001']) + '張',
      pN: stockData.value.quote['220027']
    }
  } else {
    return '-'
  }
})

// judge data up or down
const upOrDown = computed(() => {
  return getStockDetail.value.pN > 0
    ? { 'text-rose-500': true }
    : getStockDetail.value.pN < 0
      ? { 'text-green-500': true }
      : { 'text-gray-200': true }
})

// check if stock in favstock list
const checkFavStock = computed(() => {
  const favStocks = store.state.userInfo?.favoriteStocks
  return favStocks?.includes(route.params.stockid)
})

// ================ life cycle =====================

onMounted(() => {
  getCatagories(route.params.stockid).then((res) => {
    industry.value = res[0]
  })
  // initail data and watch data change
  getStockData().then((res) => {
    const myChart = echarts.init(chartDom.value)
    const resizMyChart = () => myChart.resize()
    watchEffect((onInvalidate) => {
      myChart.setOption(option.value)
      window.addEventListener('resize', resizMyChart)
      onInvalidate(() => {
        window.removeEventListener('resize', resizMyChart)
      })
    })
  })
  // update data
  watchEffect((onInvalidate) => {
    const updateData = setInterval(getStockData, 60000)
    onInvalidate(() => {
      clearInterval(updateData)
    })
  })
})

// ================ end =====================
</script>

<style lang="postcss" scoped>
.stock-info-title {
  @apply leading-none text-gray-400;
}
.stock-info-data {
  @apply ml-1 text-[0.2rem] font-bold leading-none;
}
.fav-btn {
  @apply rounded-sm px-1 py-0.5 font-medium hover:bg-gray-800;
}
</style>
