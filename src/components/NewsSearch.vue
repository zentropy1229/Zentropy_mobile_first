<template>
  <div class="relative">
    <form class="relative">
      <input
        type="text"
        v-model="inputKeywords"
        @click.stop.prevent="showPreviewKeyWord = true"
        placeholder="輸入關鍵字搜尋相關新聞"
        class="span-text h-2.5 w-full rounded-sm border bg-gray-800 px-0.5 outline-none"
      />
      <!-- search button -->
      <button class="y-center absolute right-0.5" @click.prevent="startSearch">
        <svg
          class="h-[0.2rem] w-[0.2rem] text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
        >
          <path
            d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"
          />
        </svg>
      </button>
      <!-- delete button -->
      <button class="y-center ounded-full absolute right-3 z-10" v-if="inputKeywords" @click="inputKeywords = ''">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-[.15rem] w-[.15rem] text-gray-400 hover:text-gray-500"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2V3zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8 5.829 5.854z"
          />
        </svg>
      </button>
    </form>
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['startSearch'])
// import axios from 'axios'
const inputKeywords = ref('')
const showPreviewKeyWord = ref(false)
const startSearch = () => {
  emit('startSearch', inputKeywords.value)
}
</script>
<style lang="postcss" scoped></style>
