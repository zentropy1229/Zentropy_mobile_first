<template>
  <div class="w-full p-1 text-gray-900">
    <div class="flex-center h-full w-full flex-col rounded-sm bg-gray-50 py-0.5">
      <div class="mb-1">
        <button class="chart-page-btn" @click="showSearchbox = true">區段查詢</button>
      </div>
      <div class="h-[65vh] w-full" ref="chartDom"></div>
      <div class="fixed top-0 z-50 h-screen w-full bg-gray-900/60" v-if="showSearchbox">
        <div class="y-center shadow-set relative mx-auto h-max w-max rounded p-1.5">
          <div class="mb-1 text-right">
            <button class="hover:scale-90" @click="showSearchbox = false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-1 w-1 text-black hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                />
              </svg>
            </button>
          </div>
          <form @submit.prevent="submitForm" class="flex w-[4rem] flex-col items-end gap-1">
            <div class="searchbox-container">
              <label>起始日期</label><input class="chart-searchbox shadow-set" type="date" v-model="start" />
            </div>
            <div class="searchbox-container">
              <label>結束日期</label><input class="chart-searchbox shadow-set" type="date" v-model="end" />
            </div>

            <button class="chart-page-btn">查詢</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import * as echarts from 'echarts'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import getCurrentTime from '@/utils/getCurrentTime'
const route = useRoute()
const showSearchbox = ref(false)
const start = ref('')
const end = ref('')
const submitForm = () => {
  showSearchbox.value = false
  initialFrom()
}
// here is Chart show
let myChart
let resizeMyChart
const chartDom = ref()
const upColor = '#ec0000'
const upBorderColor = '#8A0000'
const downColor = '#00da3c'
const downBorderColor = '#008F28'
const calculateMA = (dayCount, data) => {
  const result = []
  for (let i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-')
      continue
    }
    let sum = 0
    for (let j = 0; j < dayCount; j++) {
      sum += +data.values[i - j][1]
    }
    result.push(Math.round((sum / dayCount) * 100) / 100)
  }
  return result
}
const splitData = (rawData) => {
  const categoryData = []
  const values = []
  for (let i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0])
    values.push(rawData[i])
  }
  return {
    categoryData: categoryData,
    values: values
  }
}
const initialFrom = async () => {
  const formData = {
    params: {
      code: route.params.stockid,
      start: start.value || '2016-01-01',
      end: end.value || getCurrentTime('simple')
    }
  }
  myChart.showLoading()
  const res = await axios.get('/stock_data/', formData)
  const result = res.data
  myChart.hideLoading()
  const data0 = splitData(result)
  const option = ref({
    title: {
      textStyle: {
        fontSize: '.2rem'
      },
      text: '股票代號: ' + route.params.stockid,
      left: '10%',
      top: '10%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      textStyle: {
        fontSize: '.1rem'
      },
      data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: data0.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 50,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 50,
        end: 100
      }
    ],
    series: [
      {
        name: '日K',
        type: 'candlestick',
        data: data0.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor
        },
        markPoint: {
          label: {
            formatter: function (param) {
              return param != null ? Math.round(param.value) + '' : ''
            }
          },
          data: [
            {
              name: 'Mark',
              coord: ['2013/5/31', 2300],
              value: 2300,
              itemStyle: {
                color: 'rgb(41,60,85)'
              }
            },
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close'
            }
          ],
          tooltip: {
            formatter: function (param) {
              return param.name + '<br>' + (param.data.coord || '')
            }
          }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              }
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close'
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close'
            }
          ]
        }
      },
      {
        name: 'MA5',
        type: 'line',
        data: calculateMA(5, data0),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'MA10',
        type: 'line',
        data: calculateMA(10, data0),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'MA20',
        type: 'line',
        data: calculateMA(20, data0),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      },
      {
        name: 'MA30',
        type: 'line',
        data: calculateMA(30, data0),
        smooth: true,
        lineStyle: {
          opacity: 0.5
        }
      }
    ]
  })
  option.value && myChart.setOption(option.value)
}
onMounted(async () => {
  myChart = echarts.init(chartDom.value)
  await initialFrom()
  resizeMyChart = () => myChart.resize()
  window.addEventListener('resize', resizeMyChart)
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeMyChart)
  myChart.dispose()
})
</script>

<style lang="postcss" scoped>
.searchbox-container {
  @apply span-text flex w-full items-center justify-between font-medium;
}
.chart-searchbox {
  @apply w-3/4 rounded-sm p-[.18rem] text-center font-medium text-gray-900;
}
.chart-page-btn {
  @apply shadow-set w-max rounded-sm py-[0.15rem] px-2 text-[length:var(--span-text)] hover:scale-105;
}
</style>
