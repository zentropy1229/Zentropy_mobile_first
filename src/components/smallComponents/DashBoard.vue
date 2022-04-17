<template>
  <div
    ref="guage"
    class="relative h-[5rem] basis-full rounded-md lg:basis-[calc(45%)]"
  ></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, defineProps, toRef, onUnmounted } from 'vue'
const guage = ref()
const props = defineProps({
  scoreValue: {
    type: Number,
    default: 0
  }
})
const scoreValue = toRef(props, 'scoreValue')
const option = {
  tooltip: {
    formatter: '預測結果 <br/>{b} : {c}%'
  },
  textStyle: {
    fontSize: '.2rem'
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
        fontSize: '.2rem'
      },
      data: [
        {
          value: scoreValue.value,
          name: '預測結果'
        }
      ],
      title: {
        fontSize: '.15rem'
      },
      axisLabel: {
        fontSize: '.13rem'
      }
    }
  ]
}
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
    console.log(nowScroll)
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
})
onUnmounted(() => {
  window.removeEventListener('scroll', startAnimation)
  window.removeEventListener('resize', resizeHandler)
})
</script>
