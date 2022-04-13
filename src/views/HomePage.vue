<template>
  <div>
    <div class="home-main" ref="main">
      <div class="home-images">
        <transition grop name="fade" mode="in-out">
          <img src="https://picsum.photos/id/1075/3240/2160" v-if="!active" :class="{'sticky-image': !active}">
          <img src="https://picsum.photos/id/1076/3240/2160" v-else :class="{'sticky-image': active}">
        </transition>
      </div>
      <div class="home-title-container">
        <div class="show-title-ani" :class="showAnimationClass" key="awdwa">
          <span>Zentropy</span>
        </div>
        <transition name="flip">
          <div v-if="active" class="hidden-text">
            <span>交易好伙伴</span>
            <transition name="flip">
              <button class="free-btn" v-if="active">Start Free</button>
            </transition>
          </div>
        </transition>
      </div>
      <div :class="{'hidden-block': !active}"></div>
    </div>
    <div class="main-block-one">
      <ShowCharts />
    </div>
    <div class="main-block-two">
      <MainBlockTwo />
    </div>
    <!-- <div class="main-block-three">
      <MainBlockThree />
    </div> -->
  </div>
</template>

<script setup>
import MainBlockTwo from '@/components/MainBlockTwo'
import ShowCharts from '@/components/ShowCharts'
import { onMounted, onUnmounted, ref } from 'vue'
const main = ref()
const active = ref(false)
const avoidScroll = ref(true)
const showAnimationClass = ref({
  'show-text-up': active,
  'show-text-down': true
})
// ------------------- life-cycle ---------------------- //
onMounted(() => {
  main.value.addEventListener('scroll', (e) => {
    if (main.value.scrollTop) {
      active.value = true
    }
  })
  main.value.addEventListener('wheel', (e) => {
    if (e.deltaY < 0 && !main.value.scrollTop) {
      active.value = false
    }
  })
  window.addEventListener('scroll', (e) => {
    if (document.documentElement.scrollTop && avoidScroll.value) {
      active.value = true
      avoidScroll.value = false
    }
    if (!document.documentElement.scrollTop) {
      active.value = false
      avoidScroll.value = true
    }
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
  window.removeEventListener('wheel', () => {})
})
</script>

<style scoped>
  /* ------------------------- Main Title ------------------------- */
  ::-webkit-scrollbar {
    width: 0px;
  }
  .home-main {
    --offset-height: 64px;
    font-size: 16px;
    position: relative;
    width: 100%;
    height: 100vh;
    top: calc(var(--offset-height) * -1);
    margin-bottom: calc(var(--offset-height) * -1);
    overflow-y: scroll;
    scrollbar-width: none;
  }
  .home-images {
    height: 100%;
  }
  .home-images img {
    position: static;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .home-main .sticky-image {
    position: absolute;
    top: 0;
    left: 0;
  }
  .home-title-container {
    position: absolute;
    top: 38%;
    left: 15%;
    color: var(--text-color-white);
    font-size: 5em;
    font-weight: 700;
  }
  .show-text-down {
    --move: 100px;
    transform: translateY(var(--move));
    transition: .5s;
  }
  /* 這行要在下面喔 */
  .show-text-up {
    --move: 20px;
  }
  .hidden-text {
    display: flex;
    flex-direction: column;
    width: fit-content;
    margin-top: .5rem;
  }
  .free-btn {
    border: 0;
    border-radius: 3em;
    padding: 0.5em 1em;
    margin-top: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    color: var(--text-color-black);
    font-size: 1.5rem;
    font-weight: 500;
  }
  .free-btn:hover {
    color: var(--text-color-white);
    background: var(--primary-color);
  }
  .hidden-block {
    display: block;
    min-height: 20px;
    width: 100%;
  }
  /* ------------------------- Main Content ------------------------- */
  .main-block-one, .main-block-two {
    position: relative;
    margin: 0 auto;
    max-width: 2560px;
  }
  .main-block-one {
    margin-top: 2em;
  }
  .main-block-two {
    background: rgb(243, 243, 243);
  }
  /* ------------------------- Animation For Vue ------------------------- */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.8s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .flip-enter-active,
  .flip-leave-active {
    transition: all 0.5s ease;
    transform: translateY(0px);
  }
  .flip-enter-from,
  .flip-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  @keyframes showTitle {
    0% {
      transform: translateY(200px);
    }
    100% {
      transform: translateY(100px);
    }
  }
</style>
