<template>
  <div class="container">
    <div class="card-container" v-for="list of tutorialList" :key="list.step">
    <div class="title-container">
      <div class="card-title">{{list.step}}</div>
      <div class="line"></div>
    </div>
    <div class="content">
      <span>{{ list.content }}</span>
    </div>
    <button class="next-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </button>
  </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
const tutorialList = ref([
  {
    step: '第一步',
    content: '應都沒有高常，怎麼之本是電。想不是很鞋子知道為，來款樂不熟所有的請多到沒辦法應都沒有高常，怎麼之本是電。想不是很鞋子知道為，來款樂不熟所有的請多到沒辦法'
  },
  {
    step: '第二步',
    content: '應都沒有高常，來款樂怎麼之本是電。想不是很鞋子知道為，來款樂不熟所有的請多到沒辦法'
  },
  {
    step: '第三步',
    content: '應都沒有高常，怎麼之本是電。想不是很鞋子知道為，來款樂不熟所有的請多到沒辦法應都沒有高常，怎麼之本是電。想不是很鞋子知道為，來款樂不熟所有的請多到沒辦法'
  }
])
</script>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 0 40px;
    margin: 0 auto;
    max-width: 1100px;
  }
  .card-container {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    margin-bottom: 2em;
    padding: 1.5em 0.5em;
    gap: 1.5em;
    border-radius: 1em;
    flex-basis: calc((100% - 100px) / 3);
    box-shadow: rgba(54, 65, 82, 0.226)
    0px 1px 10px;
    background: white;
  }
  .card-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: var(--primary-color);
  }
  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1em;
  }
  .card-title {
    font-weight: 700;
  }
  .line {
    width: 60%;
    height: 1px;
    background-color: rgba(54, 65, 82, 0.226);
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 2em;
    font-weight: 300;
    color: rgb(165, 165, 165);
    overflow-y: scroll;
  }
  .next-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 50%;
    background: rgb(42, 134, 255);
    color: white;
    cursor: pointer;
  }
  .next-btn:hover {
    animation: next 1s ease infinite alternate;
  }
  @keyframes next {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(25%);
    }
  }
  @media (max-width: 1076px) {
    .card-container {
    display: flex;
    flex-basis: calc((100% - 60px) / 2);
    }
    .container {
    max-width: 800px;
    }
  }
  @media (max-width: 768px) {
    .card-container {
    display: flex;
    flex-basis: calc((100% - 60px) / 1);
    }
    .container {
    max-width: 500px;
    justify-content: center;
    }
  }
</style>
