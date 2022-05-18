<template>
  <div class="flex flex-col p-1">
    <div class="ml-0.5 flex flex-col">
      <router-link
        :to="{ name: 'stock', params: { stockid: searchStockNum } }"
        class="span-text w-fit rounded-[.05rem] bg-gray-300 px-0.5 font-medium text-gray-800 hover:bg-orange-400 hover:text-white"
        >{{ stockName }}</router-link
      >
      <div class="span-text-sm flex">
        <span class="text-gray-400">{{ stockNum }}.TW</span>
        <span class="ml-auto text-gray-400">{{ volumn }}張</span>
      </div>
    </div>
    <div class="h-[2rem] w-full" ref="chartDom"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import axios from 'axios'
import { computed, onMounted, ref, defineProps, toRef, watchEffect } from 'vue'
const { DateTime } = require('luxon')
// ... props ...
const props = defineProps({
  searchStockNum: {
    type: String,
    default: undefined
  }
})
const searchStockNum = toRef(props, 'searchStockNum')
// ... variables ...
const volumn = ref('')
const chartDom = ref()
const stockNum = ref('')
const stockName = ref('')
const isLoading = ref(false)
const daliyStockValue = ref([])
const option = ref({
  tooltip: {
    trigger: 'axis',
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
      show: true,
      borderColor: '#374151',
      top: '8%',
      left: '20%',
      right: '1%',
      bottom: '10%'
    }
  ],
  visualMap: {
    show: false,
    pieces: [
      {
        gt: computed(() => {
          return daliyStockValue.value.quote['21']
        }),
        lte: computed(() => {
          return roundTwo(daliyStockValue.value.quote['21'] * 1.1)
        }),
        color: '#FD0100'
      },
      {
        gt: 0,
        lte: computed(() => {
          return daliyStockValue.value.quote['21']
        }),
        color: 'green'
      }
    ]
  },
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
      show: false
    }
  ],
  yAxis: [
    {
      type: 'value',
      max: computed(() => {
        return roundTwo(daliyStockValue.value.quote['21'] * 1.1)
      }),
      min: computed(() => {
        return roundTwo(daliyStockValue.value.quote['21'] * 0.9)
      }),
      interval: computed(() => {
        return roundTwo((daliyStockValue.value.quote['21'] * 0.2) / 8)
      }),
      splitLine: {
        lineStyle: {
          color: '#374151'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#111827']
        }
      },
      axisLabel: {
        showMinLabel: true,
        fontSize: '0.12rem'
      }
    }
  ],
  series: [
    {
      data: computed(() => {
        return daliyStockValue.value.o.slice(0).reverse()
      }),
      type: 'line',
      showSymbol: false,
      symbolSize: 8,
      emphasis: {
        itemStyle: {
          scale: true,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'white'
        }
      },
      lineStyle: {
        width: 1.5
      },
      markLine: {
        silent: false,
        symbol: 'none',
        label: {
          show: false
        },
        lineStyle: {
          color: '#9CA3AF',
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
const roundTwo = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2')
}
const getdaliyStockValue = () => {
  return new Promise((resolve, reject) => {
    isLoading.value = true
    axios
      .get(
        `https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:${searchStockNum.value}:STOCK&quote=1`,
        {
          headers: {
            Authorization: ''
          }
        }
      )
      .then((res) => {
        daliyStockValue.value = res.data.data
        stockNum.value = res.data.data.quote['0'].split(':')[1]
        stockName.value = res.data.data.quote['200009']
        volumn.value = Math.round(res.data.data.quote['800001'])
        resolve(res.data.data)
      })
      .catch(() => {
        daliyStockValue.value = []
      })
  })
}
// ================ life cycle =====================
onMounted(() => {
  // updated Data every 1 minutes
  getdaliyStockValue().then((res) => {
    const myChart = echarts.init(chartDom.value)
    option.value && myChart.setOption(option.value)
    const resizeMyChart = () => myChart.resize()
    // setTimeout(resizeMyChart, 100)
    watchEffect((onInvalidate) => {
      window.addEventListener('resize', resizeMyChart)
      onInvalidate(() => {
        window.removeEventListener('resize', resizeMyChart)
      })
    })
  })
  watchEffect((onInvalidate) => {
    const updateData = setInterval(getdaliyStockValue, 60000)
    onInvalidate(() => {
      clearInterval(updateData)
    })
  })
})
</script>

<style lang="postcss" scoped></style>
