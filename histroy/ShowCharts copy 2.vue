<template>
  <div class="show-chart">
    <div class="container">
      <div class="title-container">
        <a class="title-text" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"/>
          </svg>
          <p>Market Show市場趨勢</p>
        </a>
        <div><span>這裡可以放一些我們整理好的圖片，如果要用canvas畫也可以喔</span></div>
      </div>
      <ShowBlock />
    </div>
    <div class="total-container" ref="chart" @mouseenter="Show()" @mouseleave="noShow()">
      <div class="chart-container" :style="{'--place': move, '--time': time}">
        <div v-for="chart in newChartList" :key="chart.id" class="chart-item">
          <img :src="chart.src" alt="chart.content">
        </div>
      </div>
      <div class="tools-group">
        <button class="prev-btn" @click="change(now - 1)" :disabled="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
          </svg>
        </button>
        <button class="next-btn" @click="change(now + 1)" :disabled="active">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
        </button>
        <div class="radio-btn">
          <label v-for="dots in chartImageList" :key="dots.id">
            <input type="radio" name="dots" class="input-dots" :checked="nowRealStep === dots.id" @click="change(dots.id)">
            <span class="dots"></span>
          </label>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import ShowBlock from './smallComponents/ShowBlock'
const now = ref(1)
const time = ref('')
const move = ref('')
const chartWidth = ref(0)
const chart = ref()
const active = ref(false)
const chartImageList = ref([
  {
    id: 1,
    src: 'https://image-charts.com/chart.js/2.8.0?bkg=white&icac=documentation&c=ewogICJ0eXBlIjogImJhciIsCiAgImRhdGEiOiB7CiAgICAibGFiZWxzIjogWwogICAgICAiSmFudWFyeSIsCiAgICAgICJGZWJydWFyeSIsCiAgICAgICJNYXJjaCIsCiAgICAgICJBcHJpbCIsCiAgICAgICJNYXkiLAogICAgICAiSnVuZSIsCiAgICAgICJKdWx5IgogICAgXSwKICAgICJkYXRhc2V0cyI6IFsKICAgICAgewogICAgICAgICJsYWJlbCI6ICJEYXRhc2V0IDEiLAogICAgICAgICJiYWNrZ3JvdW5kQ29sb3IiOiBbCiAgICAgICAgICAicmdiKDI1NSwgOTksIDEzMikiLAogICAgICAgICAgInJnYigyNTUsIDE1OSwgNjQpIiwKICAgICAgICAgICJyZ2IoMjU1LCAyMDUsIDg2KSIsCiAgICAgICAgICAicmdiKDc1LCAxOTIsIDE5MikiLAogICAgICAgICAgInJnYig1NCwgMTYyLCAyMzUpIiwKICAgICAgICAgICJyZ2IoMTUzLCAxMDIsIDI1NSkiLAogICAgICAgICAgInJnYigyNTUsIDk5LCAxMzIpIgogICAgICAgIF0sCiAgICAgICAgInlBeGlzSUQiOiAieSIsCiAgICAgICAgImRhdGEiOiBbCiAgICAgICAgICAyMjYsCiAgICAgICAgICAxNiwKICAgICAgICAgIC00NCwKICAgICAgICAgIDg0LAogICAgICAgICAgLTExLAogICAgICAgICAgLTE0LAogICAgICAgICAgMjUKICAgICAgICBdCiAgICAgIH0sCiAgICAgIHsKICAgICAgICAibGFiZWwiOiAiRGF0YXNldCAyIiwKICAgICAgICAiYmFja2dyb3VuZENvbG9yIjogInJnYigyMDEsIDIwMywgMjA3KSIsCiAgICAgICAgInlBeGlzSUQiOiAieTEiLAogICAgICAgICJkYXRhIjogWwogICAgICAgICAgLTYxLAogICAgICAgICAgMjEsCiAgICAgICAgICAtNjgsCiAgICAgICAgICAtNTAsCiAgICAgICAgICAtNTYsCiAgICAgICAgICA4OSwKICAgICAgICAgIC05NQogICAgICAgIF0KICAgICAgfQogICAgXQogIH0sCiAgIm9wdGlvbnMiOiB7CiAgICAidGl0bGUiOiB7CiAgICAgICJkaXNwbGF5IjogdHJ1ZSwKICAgICAgInRleHQiOiAiQ2hhcnQuanMgQmFyIENoYXJ0IC0gTXVsdGkgQXhpcyIKICAgIH0sCiAgICAidG9vbHRpcHMiOiB7CiAgICAgICJtb2RlIjogImluZGV4IiwKICAgICAgImludGVyc2VjdCI6IHRydWUKICAgIH0sCiAgICAic2NhbGVzIjogewogICAgICAieUF4ZXMiOiBbCiAgICAgICAgewogICAgICAgICAgImlkIjogInkiLAogICAgICAgICAgInR5cGUiOiAibGluZWFyIiwKICAgICAgICAgICJkaXNwbGF5IjogdHJ1ZSwKICAgICAgICAgICJwb3NpdGlvbiI6ICJsZWZ0IgogICAgICAgIH0sCiAgICAgICAgewogICAgICAgICAgImlkIjogInkxIiwKICAgICAgICAgICJ0eXBlIjogImxpbmVhciIsCiAgICAgICAgICAiZGlzcGxheSI6IHRydWUsCiAgICAgICAgICAicG9zaXRpb24iOiAicmlnaHQiLAogICAgICAgICAgImdyaWRMaW5lcyI6IHsKICAgICAgICAgICAgImRyYXdPbkNoYXJ0QXJlYSI6IGZhbHNlCiAgICAgICAgICB9CiAgICAgICAgfQogICAgICBdCiAgICB9CiAgfQp9&encoding=base64&ichm=7997509fe74b92a1098f26d164bf3cc208bd89be3e615fe62f1fa40b19712370',
    content: '',
    to: '#'
  },
  {
    id: 2,
    src: 'https://image-charts.com/chart.js/2.8.0?bkg=white&icac=documentation&c=ewogIHR5cGU6ICdiYXInLAogIGRhdGE6IHsKICAgIGxhYmVsczogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknXSwKICAgIGRhdGFzZXRzOiBbCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMScsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDI1NSwgOTksIDEzMiknLAogICAgICAgIGRhdGE6IFs1MiwgLTkzLCAtMjUsIC02NywgNTEsIC05NywgOV0sCiAgICAgIH0sCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMicsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDU0LCAxNjIsIDIzNSknLAogICAgICAgIGRhdGE6IFsxNywgMTMsIC0zOCwgODksIC0xMCwgNzUsIC01Ml0sCiAgICAgIH0sCiAgICAgIHsKICAgICAgICBsYWJlbDogJ0RhdGFzZXQgMycsCiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDc1LCAxOTIsIDE5MiknLAogICAgICAgIGRhdGE6IFstODQsIDMzLCA4MCwgNzUsIC04MywgLTM0LCAtNTBdLAogICAgICB9LAogICAgXSwKICB9LAogIG9wdGlvbnM6IHsKICAgIHRpdGxlOiB7CiAgICAgIGRpc3BsYXk6IHRydWUsCiAgICAgIHRleHQ6ICdDaGFydC5qcyBCYXIgQ2hhcnQgLSBTdGFja2VkJywKICAgIH0sCiAgICBzY2FsZXM6IHsKICAgICAgeEF4ZXM6IFsKICAgICAgICB7CiAgICAgICAgICBzdGFja2VkOiB0cnVlLAogICAgICAgIH0sCiAgICAgIF0sCiAgICAgIHlBeGVzOiBbCiAgICAgICAgewogICAgICAgICAgc3RhY2tlZDogdHJ1ZSwKICAgICAgICB9LAogICAgICBdLAogICAgfSwKICB9LAp9Cg%3D%3D&encoding=base64&ichm=203f6426d1f74cf129d145097970b1c8f6ca9144b8ad4134229df8fbb80ad3af',
    content: '',
    to: '#'
  },
  {
    id: 3,
    src: 'https://image-charts.com/chart?chbr=8&chd=t%3A10%2C15%2C25%2C30%2C40%2C80&chf=b0%2Clg%2C90%2C05B142%2C1%2C0CE858%2C0.2&chl=%7C%7C%7C%7C%2033%25%20!%7Cx2%20&chma=0%2C0%2C10%2C10&chs=700x450&cht=bvs&chtt=Revenue%20per%20month&chxl=0%3A%7CJan%7CFev%7CMar%7CAvr%7CMay&chxs=1N*cUSD0sz*%2C000000%2C14&chxt=x%2Cy&iclocale=en&icretina=1&icac=documentation&ichm=0b5aa5aee9abf7d2bc22a7ff1cffcd9ea7c72762a2673ed360da933ff54a330b',
    content: '',
    to: '#'
  },
  {
    id: 4,
    src: 'https://image-charts.com/chart.js/2.8.0?bkg=white&icac=documentation&c=&encoding=base64&ichm=7997509fe74b92a1098f26d164bf3cc208bd89be3e615fe62f1fa40b19712370',
    content: '',
    to: '#'
  }
])
const newChartList = computed(() => {
  return chartImageList.value.slice(-1).concat(chartImageList.value.slice(0)).concat(chartImageList.value.slice(0, 1))
})
const nowRealStep = computed(() => {
  return now.value > chartImageList.value.length
    ? now.value - chartImageList.value.length
    : now.value < 1 ? chartImageList.value.length : now.value
})
const change = (index) => {
  const limit = newChartList.value.length - 1
  chartWidth.value = chart.value.offsetWidth
  // Prevent multiclick //
  active.value = !active.value
  setTimeout(() => {
    active.value = !active.value
  }, 300)
  now.value = index
  if (now.value < 0) {
    time.value = 0 + 'ms'
    move.value = -1 * (limit - 1) * chartWidth.value + 'px'
    setTimeout(() => {
      now.value = limit - 2
      time.value = 300 + 'ms'
      move.value = -1 * (now.value) * chartWidth.value + 'px'
    }, 1)
    return
  }
  if (now.value > limit) {
    time.value = 0 + 'ms'
    move.value = -1 * 1 * chartWidth.value + 'px'
    setTimeout(() => {
      now.value = 2
      time.value = 300 + 'ms'
      move.value = -1 * now.value * chartWidth.value + 'px'
    }, 1)
    return
  }
  time.value = 300 + 'ms'
  move.value = -1 * (now.value) * chartWidth.value + 'px'
}
const noShow = () => {
  document.querySelector('.prev-btn').style.setProperty('display', 'none')
  document.querySelector('.next-btn').style.setProperty('display', 'none')
}
const Show = () => {
  document.querySelector('.prev-btn').style.setProperty('display', 'block')
  document.querySelector('.next-btn').style.setProperty('display', 'block')
}
// --------------------- life Cycle ---------------------//
onMounted(() => {
  move.value = -1 * chart.value.offsetWidth + 'px'
})
</script>
<!-- style -->
<style scoped>
  .show-chart {
    display: flex;
    position: relative;
    flex-direction: column;
    padding: .8em 1em;
    width: 100%;
    height: 100%;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .title-container {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: .2em;
    margin-left: 2em;
    color: rgba(155, 155, 155, 0.8)
  }
  .title-text {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .2em;
    font-size: 2em;
    font-weight: 500;
    color: var(--text-color-black);
    text-decoration: none;
  }
  .title-text:hover {
    color: var(--primary-color);
  }
  .total-container {
    position: relative;
    margin: 1em auto;
    /* overflow: hidden; */
    max-width: 800px;
    height: 600px;
  }
  .chart-container {
    --time: 0ms;
    --place: 0px;
    display: flex;
    flex-wrap: nowrap;
    transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    transition-duration: var(--time);
    transform: translate3d(var(--place), 0px, 0px);
  }
  .chart-item {
    display: block;
    flex-basis: 100%;
  }
  .chart-item img {
    width: 800px;
    height: 600px;
    object-fit: contain;
  }
  .next-btn, .prev-btn {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    border: 0;
    background: transparent;
    color: var(--button-color-blue);
    cursor: pointer;
  }
  .next-btn {
    left: 100%;
    transform: translate(-100%, -50%);
  }
  .next-btn:hover, .prev-btn:hover {
    color: rgba(54, 140, 253, 0.808);
  }
  .radio-btn {
    display: flex;
    position: absolute;
    gap: .8em;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
  .input-dots {
    display: none;
  }
  .input-dots:hover ~ .dots,
  .input-dots:checked ~ .dots {
    background:rgba(54, 140, 253, 0.808);
  }
  .dots {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--button-color-blue);
    cursor: pointer;
  }
</style>
