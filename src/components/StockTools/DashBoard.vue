<template>
  <div class="flex-center flex-col">
    <div ref="guage" class="relative h-[5rem] w-full rounded-md" v-if="!isLoading"></div>
    <loading-icon :isLoading="isLoading" />
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import addAlpha from '@/utils/addAlpha'
import { computed, onMounted, ref, watchEffect, defineProps, toRef } from 'vue'
import LoadingIcon from '@/components/smallComponents/LoadingIcon'
const props = defineProps({
  perdictResult: String
})
const guage = ref()
const isLoading = ref(false)
const perdictResult = toRef(props, 'perdictResult')
const option = ref({
  series: [
    {
      name: 'Predict',
      type: 'gauge',
      startAngle: 180,
      min: -1.5,
      max: 1.5,
      splitNumber: 6,
      endAngle: 0,
      animationDuration: 1000,
      animationEasing: 'quadraticOut',
      radius: '80%',
      silent: true,
      axisLine: {
        lineStyle: {
          width: 2,
          color: [
            [0.333, '#10b981'],
            [0.666, '#fff'],
            [1, '#ef4444']
          ]
        }
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: '#fff'
        }
      },
      progress: {
        show: true,
        width: 200,
        itemStyle: {
          color: computed(() => {
            return {
              type: 'radial',
              global: true,
              x: guage.value.offsetWidth / 2,
              y: guage.value.offsetHeight / 2,
              r: (guage.value.offsetWidth / 2) * 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: 'transparent'
                },
                {
                  offset: 0.6,
                  color: 'transparent'
                },
                {
                  offset: 1,
                  color: addAlpha('#f3f4f6', 0.1)
                }
              ]
            }
          })
        }
      },
      anchor: {
        show: true,
        size: computed(() => {
          return (Math.min(guage.value.offsetWidth, guage.value.offsetHeight) / 2) * 0.1
        }),
        showAbove: true,
        itemStyle: {
          color: '#001122',
          opacity: 0.9,
          borderColor: 'rgba(255,255,255,0.8)',
          borderWidth: 1,
          shadowBlur: 30,
          shadowColor: 'rgba(255, 255, 255, 0.5)'
        }
      },
      pointer: {
        offsetCenter: [0, '20%'],
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        length: '100%',
        itemStyle: {
          color: 'rgba(255,255,255,0.9)'
        }
      },
      axisLabel: {
        color: '#fff',
        fontSize: '0.15rem',
        distance: -60,
        formatter: function (value) {
          if (value === 1) {
            return '買入'
          } else if (value === 0) {
            return '持平'
          } else if (value === -1) {
            return '賣出'
          }
          return ''
        }
      },
      title: {
        show: false,
        color: '#fff'
        // offsetCenter: [0, 0],
      },
      detail: {
        show: false
      },
      data: [
        {
          value: computed(() => {
            return perdictResult.value || 1
          })
        }
      ]
    }
  ]
})
// ----------------------------------------------lifecycle----------------------------------------------
onMounted(() => {
  const myChart = echarts.init(guage.value)
  const resizeHandler = () => {
    myChart.resize()
  }
  watchEffect((onInvalidate) => {
    myChart.setOption(option.value)
    window.addEventListener('resize', resizeHandler)
    onInvalidate(() => {
      window.removeEventListener('resize', resizeHandler)
    })
  })
})
</script>
