<template>
  <div
    ref="guage"
    class="relative h-[5rem] basis-full rounded-md lg:basis-[calc(45%)]"
  ></div>
</template>

<script setup>
import * as echarts from 'echarts'
import {
  onMounted,
  ref,
  defineProps,
  toRef,
  onUnmounted,
  watch,
  reactive,
  computed
} from 'vue'
const guage = ref()
const props = defineProps({
  scoreValue: {
    type: Number,
    default: undefined
  },
  scoreStr: {
    type: String,
    default: undefined
  }
})
const scoreValue = toRef(props, 'scoreValue')
const scoreStr = toRef(props, 'scoreStr')
const option = reactive({
  tooltip: computed(() => {
    return {
      formatter: `預測結果 <br/>{b} : ${scoreStr.value}`
    }
  }),
  textStyle: {
    fontSize: '.2rem'
  },
  series: [
    {
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: [
            [0.2, '#55FA9F'],
            [0.4, '#A0FBC9'],
            [0.6, '#e3e3e3'],
            [0.8, '#FBB1AD'],
            [1, '#FA6961']
          ]
        }
      },
      splitLine: {
        lineStyle: {
          color: '#e3e3e3'
        }
      },
      splitNumber: 4,
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: false
      },
      detail: computed(() => {
        return {
          valueAnimation: true,
          formatter: scoreStr.value,
          fontSize: '.2rem'
        }
      }),
      data: computed(() => {
        return [
          {
            value: scoreValue.value,
            name: '預測結果'
          }
        ]
      }),
      title: {
        fontSize: '.15rem'
      }
    }
  ]
})
let startAnimation
let resizeHandler
// ----------------------------------------------lifecycle----------------------------------------------
onMounted(() => {
  const myChart = echarts.init(guage.value)
  myChart.setOption(option)
  const startAnimationPoint =
    guage.value.offsetTop - guage.value.offsetHeight * 1.5
  startAnimation = () => {
    const nowScroll = document.documentElement.scrollTop
    if (
      nowScroll > startAnimationPoint &&
      nowScroll < startAnimationPoint + 40
    ) {
      myChart.clear()
      myChart.setOption(option)
    }
  }
  resizeHandler = () => {
    myChart.resize()
  }
  window.addEventListener('scroll', startAnimation)
  window.addEventListener('resize', resizeHandler)
  watch(scoreValue, () => {
    myChart.setOption(option)
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', startAnimation)
  window.removeEventListener('resize', resizeHandler)
})
</script>
