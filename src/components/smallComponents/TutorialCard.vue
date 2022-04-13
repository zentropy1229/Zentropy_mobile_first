<template>
  <div class="cards-container lg: max-w-[800px]">
    <div class="cards" v-for="list of tutorialList" :key="list.step">
    <div class="title-container">
      <div class="card-title">{{list.step}}</div>
      <div class="line"></div>
    </div>
    <div class="card-content">
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

<style lang="postcss" scoped>
  .cards-container {
    @apply flex flex-wrap justify-between max-w-container mx-auto px-4;
  }
  .cards {
    @apply relative overflow-hidden flex flex-col items-center justify-between h-96 p-4;
    @apply rounded-lg shadow-xl bg-white;
    flex-basis: calc((100% - 15%) / 3);
  }
  .cards::after {
    @apply content-[""] absolute top-0 left-0 w-full h-2 bg-p;
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
  .card-content {
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
    .cards-container {
    max-width: 800px;
    }
    .cards {
    display: flex;
    flex-basis: calc((100% - 15%) / 2);
    }
  }
  @media (max-width: 768px) {
    .cards-container {
    max-width: 500px;
    justify-content: center;
    }
    .cards {
    display: flex;
    flex-basis: calc((100% - 15%) / 1);
    }
  }
</style>
