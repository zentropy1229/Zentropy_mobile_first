<template>
  <div class="flex flex-col p-1">
    <div class="ml-0.5 flex flex-col">
      <span class="span-text w-fit rounded-[.05rem] bg-gray-300 px-0.5 font-medium text-gray-800">{{ stockName }}</span>
      <div class="span-text-sm flex">
        <span class="text-gray-400">{{ stock }}.TW</span>
        <span class="ml-auto text-gray-400">{{ volumn }}張</span>
      </div>
    </div>
    <div class="h-[2rem] w-full" ref="chartDom"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import axios from 'axios'
import { computed, onMounted, onUnmounted, ref, defineProps, toRef } from 'vue'
let resizeMyChart
const props = defineProps({
  searchStockNum: {
    type: String,
    default: undefined
  }
})
const chartDom = ref()
const daliyStockValue = ref([])
const searchStockNum = toRef(props, 'searchStockNum')
const stock = ref('')
const stockName = ref('')
const volumn = ref('')
const roundTwo = (num) => {
  return +(Math.round(num + 'e+2') + 'e-2')
}
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
          return daliyStockValue.value.quote['12']
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
            return `${new Date(items * 1000).getHours()}:${new Date(items * 1000).getMinutes()}`
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
      scale: true,
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
      markLine: {
        silent: false,
        symbol: 'none',
        label: {
          show: false
        },
        lineStyle: {
          color: '#D1D5DB',
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
const getdaliyStockValue = async (stock) => {
  try {
    const res = await axios.get(`https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:${stock}:STOCK&quote=1`, {
      headers: {
        Authorization: ''
      }
    })
    daliyStockValue.value = res.data.data
  } catch {
    daliyStockValue.value = []
  }
}
onMounted(async () => {
  await getdaliyStockValue(searchStockNum.value)
  stock.value = daliyStockValue.value.quote['0'].split(':')[1]
  stockName.value = daliyStockValue.value.quote['200009']
  volumn.value = Math.round(daliyStockValue.value.quote['800001'])
  const myChart = echarts.init(chartDom.value)
  option.value && myChart.setOption(option.value)
  resizeMyChart = () => myChart.resize()
  setTimeout(resizeMyChart, 1000)
  window.addEventListener('resize', resizeMyChart)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeMyChart)
})
</script>

<style lang="postcss" scoped></style>
