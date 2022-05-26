<template>
  <form @submit.prevent="$emit('updateImage', file.files[0])" class="flex-center">
    <div class="relative h-max rounded-sm bg-gray-900 p-[0.05rem] active:bg-gray-700">
      <div class="x-center y-center absolute text-center" v-html="nowUploadStatus"></div>
      <input type="file" accept="image/*" class="h-2 w-10 cursor-pointer opacity-0" @change="changeStatus" ref="file" />
    </div>
    <div class="absolute top-0 left-0 z-[100] h-screen w-screen" v-if="image">
      <div class="fixed top-0 left-0 h-full w-full bg-gray-900/80 blur-xl"></div>
      <div class="y-center x-center flex-center absolute h-max w-16 flex-col rounded bg-gray-700 p-1">
        <h2 class="subtitle-text mb-1">更換大頭貼</h2>
        <img
          :src="image"
          class="mb-1 h-6 w-6 rounded-full border-4 border-slate-400 object-fill shadow-lg"
          alt="大頭照"
        />
        <div class="flex">
          <button class="btn-style bg-sky-500">確定</button>
          <button class="btn-style ml-1 bg-rose-500" @click.prevent="cancelUpload">取消</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const file = ref()
const image = ref()
const nowUploadStatus = ref('點擊上傳大頭照')
const fileReader = new FileReader()

const loadImage = (e) => {
  image.value = e.target.result
}
const changeStatus = () => {
  fileReader.readAsDataURL(file.value.files[0])
  fileReader.addEventListener('load', loadImage)
}
const cancelUpload = () => {
  file.value.value = ''
  fileReader.removeEventListener('load', loadImage)
  image.value = ''
}
</script>

<style lang="postcss" scoped>
.btn-style {
  @apply span-text rounded-sm px-0.5 py-[0.05rem] font-medium;
}
</style>
