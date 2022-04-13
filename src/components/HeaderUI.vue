<template>
  <header class="header-container" :class="{'bg-p': active}">
    <div class="logo">
      <router-link :to="{name: 'home'}" class="header-nav">this is logo</router-link>
      </div>
      <ul class="header-navbar">
        <li v-for="nav in navList" :key="nav.linkName" class="header-navs">
          <router-link :to="{name: nav.linkName}" class="header-nav rounded-[5em] hover:bg-white/40">{{ nav.content }}</router-link>
        </li>
    </ul>

  </header>

</template>

<script setup>
import { onMounted, ref } from 'vue'
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

<style lang="postcss" scoped>
  .header-container {
    @apply sticky flex items-center justify-center top-0 h-nav z-50;
  }
  .logo {
    @apply w-max h-nav leading-nav;
  }
  .header-navbar {
    @apply flex flex-1 leading-nav;
  }
  .header-navs:nth-child(1), .header-navs:last-child {
    @apply ml-auto;
  }
  .header-nav {
    @apply font-light px-4 py-2 m-4 text-white;
  }
  .header-container .router-link-exact-active {
    @apply font-medium bg-white/40 rounded-[5em];
  }
</style>
