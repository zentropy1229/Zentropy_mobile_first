<template>
  <div class="containers" v-if="active">
    <button
      class="to-top flex items-center justify-center"
      v-scroll-to="scrollOption"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-[.2rem] w-[.2rem]"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
        />
        <path
          fill-rule="evenodd"
          d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const scrollOption = {
  el: '#app',
  container: 'body',
  duration: 2000,
  easing: [0.6, 0.8, 0.3, 1.9],
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
}
const active = ref(false)
const showStatus = () => {
  if (document.documentElement.scrollTop > window.innerHeight * 0.5) {
    active.value = true
  } else active.value = false
}
onMounted(() => {
  window.addEventListener('scroll', showStatus)
})
onUnmounted(() => {
  window.removeEventListener('scroll', showStatus)
})
</script>

<style scoped>
.containers {
  position: fixed;
  bottom: 0.8rem;
  right: 0.8rem;
}
.to-top {
  background: white;
  color: rgba(44, 51, 61, 0.74);
  border: 1px solid rgba(47, 70, 80, 0.144);
  border-radius: 50%;
  box-shadow: rgba(47, 70, 80, 0.144) 0px 1px 5px;
  width: 0.45rem;
  height: 0.45rem;
  cursor: pointer;
  z-index: 99;
}
.to-top:hover {
  background: rgba(44, 51, 61, 0.74);
  color: white;
}
</style>
