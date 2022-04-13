<template>
  <header class="header-container" :class="{'show-back': active}">
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
import { onMounted, ref } from 'vue'
const navItem = ref([])
const active = ref(false)
const navList = [
  {
    content: '圖表',
    linkName: 'charttools'
  },
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
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > window.innerHeight * 0.8) {
      active.value = true
    } else {
      active.value = false
    }
  })
})
</script>

<style scoped>
  .header-container {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--nav-height);
    z-index: 99;
  }
  .logo {
    width: 150px;
    height: var(--nav-height);
    line-height: var(--nav-height);
  }
  .header-navbar {
    display: flex;
    flex: 1 0 0;
    list-style: none;
    line-height: var(--height);
  }
  .header-navs:nth-child(1), .header-navs:last-child {
    margin-left: auto;
  }
  .header-nav {
    font-weight: 300;
    text-decoration: none;
    padding: .5em 1em;
    margin: 1em;
    color: var(--text-color-white);
  }
  .header-nav:hover {
    background-color: rgba(255, 255, 255, 0.205);
    border-radius: 5em;
  }
  .header-container .router-link-exact-active {
    font-weight: 500;
    background-color: rgba(230, 230, 230, 0.5);
    border-radius: 5em;
  }
  .show-back {
    background: var(--primary-color);
  }
</style>
