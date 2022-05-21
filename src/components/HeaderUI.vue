<template>
  <header
    class="sticky top-0 z-50 text-white"
    :class="{
      'overflow-hidden': !active,
      'border-b border-gray-400 bg-gray-800': !isHomePage
    }"
  >
    <div
      class="flex h-[var(--navbar-height)] items-center justify-between px-2 transition duration-500 ease-in-out lg:scale-105"
      :class="{
        'bg-gray-50 text-gray-600 shadow-xl lg:scale-100': active && isHomePage,
        'lg:scale-100': !isHomePage
      }"
      @mouseenter="active = true"
      @mouseleave="showNavBar"
    >
      <div class="order-2 m-0 p-0 lg:order-none">
        <a href="/" class="logo desktop-nav-link">this is logo</a>
      </div>
      <ul class="hidden flex-1 lg:flex">
        <li v-for="nav in navList" :key="nav.linkName" class="first:ml-auto">
          <router-link :to="{ name: nav.linkName }" class="desktop-nav-link hover:text-p">{{
            nav.content
          }}</router-link>
        </li>
        <li class="relative ml-auto" @mouseenter="showMemberLink = true" @mouseleave="showMemberLink = false">
          <a href="javascript:" class="desktop-nav-link hover:text-p">會員</a>
          <div
            class="span-text shadow-set absolute top-2 -left-2.5 h-0 overflow-hidden rounded transition-all"
            :class="{
              'show-member-link': showMemberLink,
              'text-gray-600': !isHomePage
            }"
          >
            <a href="/login" class="desktop-member-link" v-if="!store.state.access">登入</a>
            <router-link :to="{ name: 'signup' }" class="desktop-member-link" v-if="!store.state.access"
              >註冊</router-link
            >
            <router-link :to="{ name: 'memberInfo' }" class="desktop-member-link" v-if="store.state.access"
              >會員中心</router-link
            >
            <div class="desktop-member-link cursor-pointer" v-if="store.state.access" @click="logOut()">登出</div>
          </div>
        </li>
      </ul>
      <!--mobile display-->
      <button class="order-1 h-min lg:hidden" @click="showMobileNav">
        <svg xmlns="http://www.w3.org/2000/svg" class="mobile-icon" fill="currentColor" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <button class="order-3 lg:hidden" @click="showMobileMember">
        <svg xmlns="http://www.w3.org/2000/svg" class="mobile-icon" fill="currentColor" viewBox="0 0 16 16">
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path
            fill-rule="evenodd"
            d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
          />
          <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        </svg>
      </button>
      <!--mobile nav-->
      <div class="mobile-nav" :class="{ 'left-0': mobileNavActive, '-left-[110%]': !mobileNavActive }">
        <div class="mobile-nav-header">
          <button class="mobile-cancel-btn" @click="showMobileNav">
            <svg xmlns="http://www.w3.org/2000/svg" class="mobile-icon" fill="currentColor" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>
        </div>
        <ul class="mobile-nav-list">
          <li v-for="nav in navList" :key="nav.linkName" class="mb-1 border-b border-slate-100 last:border-none">
            <router-link :to="{ name: nav.linkName }" class="mobile-nav-link" @click="showMobileNav">
              <span>{{ nav.content }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width=".2rem"
                height=".2rem"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                <path
                  d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"
                />
              </svg>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- mobile-member -->
      <div
        class="mobile-nav"
        :class="{
          'left-0': mobileMemberActive,
          'left-full': !mobileMemberActive
        }"
      >
        <div class="mobile-nav-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mobile-icon ml-auto text-p"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path
              d="M2 1a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2ZM1 3a1 1 0 0 1 1-1h2v2H1V3Zm4 10V2h9a1 1 0 0 1 1 1v9c0 .285-.12.543-.31.725C14.15 11.494 12.822 10 10 10c-3.037 0-4.345 1.73-4.798 3H5Zm-4-2h3v2H2a1 1 0 0 1-1-1v-1Zm3-1H1V8h3v2Zm0-3H1V5h3v2Z"
            />
          </svg>
          <span class="ml-1 text-[length:var(--mobile-navlink-text)] text-p">會員中心</span>
          <button class="mobile-cancel-btn" @click="showMobileMember">
            <svg xmlns="http://www.w3.org/2000/svg" class="mobile-icon" fill="currentColor" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
              />
              <path
                fill-rule="evenodd"
                d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
              />
            </svg>
          </button>
        </div>
        <div class="mobile-nav-list">
          <router-link class="mobile-member-btn mb-1 bg-p text-white" :to="{ name: 'login' }">登入</router-link>
          <router-link class="mobile-member-btn border-2" :to="{ name: 'signup' }">註冊</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const store = useStore()
const active = ref(false)
const isHomePage = ref(false)
const showMemberLink = ref(false)
const mobileNavActive = ref(false)
const mobileMemberActive = ref(false)
const navList = [
  {
    content: '股票首頁',
    linkName: 'stockHome'
  },
  {
    content: '新聞首頁',
    linkName: 'news'
  },
  {
    content: '圖表',
    linkName: 'charttools'
  },
  {
    content: '關於我們',
    linkName: 'aboutus'
  }
]
const showMobileMember = () => {
  mobileMemberActive.value = !mobileMemberActive.value
  document.querySelector('body').classList.toggle('overflow-hidden')
}
const showMobileNav = () => {
  mobileNavActive.value = !mobileNavActive.value
  document.querySelector('body').classList.toggle('overflow-hidden')
}
const showNavBar = () => {
  if (document.documentElement.scrollTop) {
    active.value = true
  } else active.value = false
}
const logOut = () => {
  store.dispatch('logOut').then(() => {
    window.location.href = '/'
  })
}
watch(route, () => {
  isHomePage.value = route.name === 'home'
})
// ---------------------------------------- life-cycle ----------------------------------------
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop) {
      active.value = true
    } else {
      active.value = false
    }
  })
  isHomePage.value = route.name === 'home'
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
  mobileNavActive.value = false
  document.querySelector('body').classList.remove('overflow-hidden')
})
</script>

<style lang="postcss" scoped>
.desktop-nav-link {
  @apply relative block overflow-hidden px-[.3rem] py-[.2rem] text-[length:var(--navlink-text)] font-light;
}
.desktop-nav-link::after {
  @apply absolute -left-1 bottom-px h-[.05rem] w-[.2rem] -translate-x-1/2 rounded-full bg-current opacity-0 content-[''];
}
.desktop-nav-link:hover.desktop-nav-link::after {
  @apply left-1/2 opacity-100 transition-all duration-500 ease-in-out;
}
.desktop-member-link {
  @apply block w-6 py-0.5 text-center hover:bg-slate-100;
}
.show-member-link {
  height: 1rem;
}
.mobile-nav {
  @apply fixed top-0 z-50 h-screen w-screen bg-white text-black lg:hidden;
  transition: left 1s ease;
}
.mobile-nav-header {
  @apply flex items-center border-b p-2;
}
.mobile-nav-list {
  @apply flex flex-col p-2;
}
.mobile-nav-link {
  @apply flex items-center justify-between pb-1 text-[length:var(--mobile-navlink-text)];
}
.mobile-cancel-btn {
  @apply ml-auto h-fit;
}
.router-link-exact-active {
  @apply font-medium text-p;
}
.mobile-icon {
  @apply h-[0.4rem] w-[0.4rem];
}
.mobile-member-btn {
  @apply block rounded-sm py-1 text-center text-[length:var(--mobile-navlink-text)];
}
</style>
