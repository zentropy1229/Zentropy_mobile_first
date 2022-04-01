<template>
  <header class="header-container">
    <div class="logo">
      <router-link :to="{name: 'home'}" class="header-nav">this is logo</router-link>
      </div>
      <ul class="header-navbar">
        <li v-for="nav, i in navList" :key="nav.linkName" class="header-navs">
          <router-link :to="{name: nav.linkName}" class="header-nav" :ref='el => navItem[i] = el'>{{ nav.content }}</router-link>
        </li>
    </ul>

  </header>

</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const navItem = ref([])
const router = useRoute()
const navList = [
  {
    content: '關於我們',
    linkName: 'about'
  },
  {
    content: '聯絡我們',
    linkName: 'contact'
  },
  {
    content: '功能介紹',
    linkName: 'toolintro'
  },
  {
    content: '團隊介紹',
    linkName: 'teamintro'
  },
  {
    content: '會員',
    linkName: 'login'
  }
]
watch(router, (nV) => {
  if (nV.name !== 'home') {
    navItem.value.forEach(item => {
      item.$el.style.color = 'black'
    })
  } else {
    navItem.value.forEach(item => {
      item.$el.style = 'white'
    })
  }
})

</script>

<style scoped>
  .header-container {
    --height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--height);
  }
  .logo {
    width: 150px;
    height: var(--height);
    line-height: var(--height);
    border: 1px solid rgb(255, 255, 255);
  }
  .header-navbar {
    display: flex;
    flex: 1 0 0;
    list-style: none;
    line-height: var(--height);
  }
  .header-navs:nth-child(1) {
    margin-left: auto;
  }
  .header-navs:last-child {
    margin-left: auto;
  }
  .header-nav {
    text-decoration: none;
    padding: .5em 1.2em;
    margin: 1em;
    color: rgb(255, 255, 255);
  }
  .header-nav:hover {
    background-color: rgba(255, 255, 255, 0.205);
    border-radius: 5em;
  }
  .header-container .router-link-exact-active {
    font-weight: bolder;
    background-color: rgba(230, 230, 230, 0.5);
    border-radius: 5em;
  }
</style>
