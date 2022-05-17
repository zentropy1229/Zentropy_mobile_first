<template>
  <h2 class="subtitle-text mb-0.5">上市{{ industryName }}分類行情</h2>
  <div class="relative z-30 mb-0.5 w-max rounded-sm bg-gray-600">
    <div
      class="flex-center flex h-2.5 cursor-pointer px-1"
      id="industrySelector"
      @click.stop.prevent="$emit('changeSelectorState', !industrySelectorActive)"
    >
      <span class="text-gray-200">產業別：{{ industryName }}</span>
      <button class="ml-1">
        <svg class="block h-0.5 w-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
          <path
            d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
          />
        </svg>
      </button>
    </div>
    <div
      class="industry-filter absolute h-16 w-16 origin-top overflow-y-scroll rounded-sm border border-gray-400 bg-gray-600 p-1 shadow-lg transition-all lg:h-max lg:w-32 lg:overflow-y-hidden"
      :class="{
        'scale-y-1 opacity-1': industrySelectorActive,
        'scale-y-0 opacity-0': !industrySelectorActive
      }"
    >
      <ul class="flex h-max flex-wrap gap-[0.2rem]">
        <li v-for="catagory in catagoryContent" :key="catagory">
          <a
            href="javascript:void(0)"
            @click.prevent="pushRouter(catagory)"
            class="block rounded-sm bg-gray-200 px-1 py-0.5 text-center text-gray-900 hover:bg-orange-300"
            >{{ catagory }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watchEffect, defineProps, defineEmits, toRef, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
// ============= definprops and emits =============
const emit = defineEmits(['changeSelectorState'])
const props = defineProps({
  industrySelectorActive: {
    type: Boolean,
    default: false
  }
})
// ============= define route =====================
const router = useRouter()
const route = useRoute()
// ============= define ref =======================
const catagoryContent = ref('')
const industryName = ref('')
const industrySelectorActive = toRef(props, 'industrySelectorActive')
// ============= methods ==========================
const pushRouter = (industry) => {
  industryName.value = industry
  router.push({
    name: 'stockHome',
    query: {
      industry: industry
    }
  })
}
const checkRoute = () => {
  if (!catagoryContent.value.includes(route.query.industry)) {
    router.replace({ name: 'stockHome', query: { industry: '塑膠工業' } })
  }
}
const industrySelectorBlur = (e) => {
  if (e.target.id !== 'industrySelector') {
    emit('changeSelectorState', false)
  }
}
// ============= life-cycle =======================
// onMounted action
onMounted(() => {
  // get industry catagories from db and check route in initial
  ;(function getIndustryCatagory () {
    axios
      .get('/api/stock_name/industry', {
        headers: {
          Authorization: ''
        }
      })
      .then((res) => {
        catagoryContent.value = res.data.industry
      })
      .then(() => {
        watch(
          route,
          (nV, oV) => {
            if (nV.name === 'stockHome') {
              checkRoute()
            }
          },
          { immediate: true }
        )
      })
  })()
  // watch route change and body click
  watchEffect((onInvalidate) => {
    industryName.value = route.query.industry
    document.querySelector('body').addEventListener('click', industrySelectorBlur)
    onInvalidate(() => {
      document.querySelector('body').removeEventListener('click', industrySelectorBlur)
    })
  })
})
</script>
<style lang="postcss" scoped></style>
