<template>
  <div class="show-block-list" :class="{animation: active}" ref="list">
  <div class="container" v-for="list in priceList" :key="list.name">
    <div class="both-container">
      <div class="left-container">
        <span>{{list.name}}</span>
        <span class="price" :class="{'up-status': list.delta > 0}">{{ list.price }}</span>
      </div>
      <div class="right-container" :class="{'up-status': list.delta > 0}">
        <span>{{list.delta}}%</span>
      </div>
    </div>
    <div class="bottom">
      <span>成交量</span>
      <span>{{list.trade}}</span>
    </div>
  </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
const list = ref()
const active = ref(false)
const priceList = ref([
  {
    name: '台指數',
    price: '17625.59',
    delta: 0.38,
    trade: '2345.96億'
  },
  {
    name: '櫃買指數',
    price: '216.55',
    delta: -0.23,
    trade: '628.74億'
  },
  {
    name: '台指期',
    price: '17,520.00',
    delta: -0.21,
    trade: '51,329口'
  }
])
onMounted(() => {
  const listScrollHeight = list.value.scrollHeight
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > (listScrollHeight - 24)) active.value = true
    else active.value = false
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})
</script>

<style scoped>
  .show-block-list {
    display: flex;
    gap: 1em;
  }
  .show-block-list.animation {
    animation: initalShow 1s ease forwards;
  }
  .container {
    --default-color: rgb(8, 83, 1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 1em;
    border: 1px solid rgba(145, 145, 145, 0.363);
    box-shadow: rgba(145, 145, 145, 0.363)
    0px 1px 10px;
    padding: 1em;
    gap: .5em;
  }
  .both-container {
    display: flex;
    gap: 2em
  }
  .left-container {
    display: flex;
    flex-direction: column;
    font-weight: 500;
  }
  .left-container .price {
    color: var(--default-color);
  }
  .right-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--default-color);
    color: white;
    border-radius: 1em;
    font-size: .9em;
    padding: .5em;
    width: 60px;
    height: 50px;
  }
  .bottom {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: rgb(145, 145, 145)
  }
  .up-status {
    --default-color: rgb(207, 31, 0);
  }
  @keyframes initalShow {
    0% {
      transform: translateY(100px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
