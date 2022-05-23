<template>
  <div class="flex flex-col overflow-hidden rounded border-4 border-gray-700 bg-gray-900 text-white">
    <div class="mb-1 w-full border-b border-gray-700">
      <div class="overflow-x-auto">
        <div class="inline-flex">
          <button
            class="span-text h-2.5 w-max border-r-2 border-gray-700 px-1 font-medium text-slate-400 hover:bg-[#1c2538] hover:text-white"
            :class="{ highlight: currentBigMarket === bigMarketId }"
            v-for="(bigMarketName, bigMarketId) in allBigMarkets"
            @click="currentBigMarket = bigMarketId"
            :key="bigMarketName"
          >
            {{ bigMarketName }}
          </button>
        </div>
      </div>
    </div>
    <div class="flex-center w-full flex-wrap px-1 lg:flex-nowrap">
      <div class="flex-center w-16 flex-col">
        <div class="mb-1 w-full pb-0.5 text-center lg:text-left"><h2 class="subtitle-text">台股大盤行情</h2></div>
        <div class="mb-1 flex w-full items-end justify-between">
          <div class="flex flex-col">
            <span class="subtitle-text-sm mb-0.5 text-slate-400">{{ getStockValueDetail.stockName }}</span>
            <div class="flex items-end leading-none">
              <span class="subtitle-text-sm block leading-none text-slate-400">成交</span>
              <span class="subtitle-text-sm ml-0.5 block font-bold leading-none">{{ getStockValueDetail.volumn }}</span>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <span class="mb-0.5 text-[0.3rem] font-bold leading-none" :class="judgeUpDown">{{
              getStockValueDetail.price
            }}</span>
            <div class="flex items-center" :class="judgeUpDown">
              <svg
                class="h-0.5 w-0.5"
                :class="{ 'rotate-180': getStockValueDetail.upDown > 0 }"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
              >
                <path
                  d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"
                /></svg
              ><span class="text-[0.13rem] font-medium leading-none"
                >{{ getStockValueDetail.upDown }} ({{ getStockValueDetail.upDownPercent }}%)</span
              >
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="trade-info">
            <span class="trade-info-index">開盤</span>
            <span class="trade-info-text">{{ getStockValueDetail.open }}</span>
          </div>
          <div class="trade-info">
            <span class="trade-info-index">最高</span>
            <span class="trade-info-text">{{ getStockValueDetail.high }}</span>
          </div>
          <div class="trade-info">
            <span class="trade-info-index">最低</span>
            <span class="trade-info-text">{{ getStockValueDetail.low }}</span>
          </div>
          <div class="trade-info">
            <span class="trade-info-index">昨收</span>
            <span class="trade-info-text">{{ getStockValueDetail.yesterday }}</span>
          </div>
        </div>
      </div>
      <div class="h-[4.7rem] w-full lg:ml-1.5 lg:w-24" ref="chartDom"></div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import * as echarts from 'echarts'
import { DateTime } from 'luxon'
import { onMounted, ref, computed, watchEffect } from 'vue'
const chartDom = ref()
const daliyStockValue = ref()
const currentBigMarket = ref('TWS:TSE01:INDEX')
const allBigMarkets = ref({
  'TWS:TSE01:INDEX': '加權指數',
  'TWF:TXF:FUTURES': '台指期',
  'TWS:TSE27:INDEX': '電子指數',
  'TWS:TSE31:INDEX': '金融指數'
})
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
      left: computed(() => {
        return window.innerWidth < 768 ? '5%' : '15%'
      }),
      right: '5%'
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: computed(() => {
        return daliyStockValue.value.t
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
        return roundTwo(Math.max(getStockValueDetail.value.high, getStockValueDetail.value.yesterday) * 1.003)
      }),
      min: computed(() => {
        return roundTwo(Math.min(getStockValueDetail.value.low, getStockValueDetail.value.yesterday) / 1.01)
      }),
      axisLabel: {
        formatter: function (value) {
          return parseFloat(value).toFixed(2)
        },
        fontSize: '0.1rem',
        show: computed(() => {
          return !(window.innerWidth < 768)
        })
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
        return daliyStockValue.value.c.slice(0).reverse()
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
          color: 'white',
          fontSize: '0.12rem',
          backgroundColor: 'orange',
          padding: 4,
          borderRadius: 5
        },
        lineStyle: {
          color: '#f3f4f6',
          type: 'solid'
        },
        data: [
          {
            yAxis: computed(() => {
              return daliyStockValue.value.quote['21']
            })
          }
        ]
      }
    }
  ]
})
// ================ methods =====================
/**
 * 取小數點兩位數
 * @param {Number} num 輸入數字
 */
const roundTwo = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2')
}
// get stock value - daliy
const getBigMarketValue = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=${currentBigMarket.value}&quote=1`,
        {
          headers: {
            Authorization: ''
          }
        }
      )
      .then((res) => {
        daliyStockValue.value = res.data.data
        resolve(res.data.data)
      })
      .catch((err) => {
        daliyStockValue.value = []
        reject(err.data)
      })
  })
}
// ================ computed =====================
// get stock value - from daliy data
const getStockValueDetail = computed(() => {
  if (daliyStockValue.value) {
    const _data = daliyStockValue.value
    let volumn = _data.quote['800001'] / 100000000
    volumn = volumn > 1 ? volumn.toFixed(2) + '億' : (volumn * 10000).toFixed(2) + '萬'
    return {
      stockName: _data.quote['200009'],
      price: _data.quote['6'],
      open: _data.o.slice(-1)[0],
      high: _data.quote['12'],
      low: _data.quote['13'],
      yesterday: _data.quote['21'],
      upDown: _data.quote['220027'],
      upDownPercent: _data.quote['56'],
      volumn: volumn
    }
  } else {
    return '-'
  }
})
// judge up or down and change color
const judgeUpDown = computed(() => {
  return getStockValueDetail.value.upDown > 0 ? { 'text-rose-500': true } : { 'text-green-500': true }
})
// ================ life cycle =====================
onMounted(() => {
  // initial data and echarts logic
  const myChart = echarts.init(chartDom.value)
  const resizeMyChart = () => myChart.resize()
  setTimeout(() => {
    resizeMyChart()
  }, 100)
  watchEffect((onInvalidate) => {
    getBigMarketValue().then(() => {
      myChart.setOption(option.value)
    })
    window.addEventListener('resize', resizeMyChart)
    onInvalidate(() => {
      window.removeEventListener('resize', resizeMyChart)
    })
  })
  // update data per mins
  watchEffect((onInvalidate) => {
    const updateData = setInterval(getBigMarketValue, 60000)
    onInvalidate(() => {
      clearInterval(updateData)
    })
  })
})
</script>

<style lang="postcss" scoped>
span {
  letter-spacing: 0.015rem;
}
.trade-info {
  @apply span-text border-dashed border-gray-600 px-0.5 text-center;
}
.trade-info:nth-last-child(1) {
  @apply border-r-0;
}
.trade-info-index {
  @apply block border-b border-dashed border-gray-600 py-0.5 text-slate-400;
}
.trade-info-text {
  @apply block py-0.5 font-bold text-white;
}
.highlight {
  @apply bg-[#1c2538] text-white;
}
</style>
