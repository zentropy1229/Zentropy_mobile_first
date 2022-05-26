<template>
  <header
    class="sticky top-0 z-50 text-white"
    :class="{
      'overflow-hidden': !active,
      'border-b-2 border-gray-400 bg-gray-800': !isHomePage
    }"
  >
    <div
      class="flex h-[var(--navbar-height)] items-center justify-between px-3 transition duration-500 ease-in-out xl:scale-105"
      :class="{
        'border-b-2 border-gray-400 bg-gray-800 shadow-xl xl:scale-100': active && isHomePage,
        'xl:scale-100': !isHomePage
      }"
      @mouseenter="active = true"
      @mouseleave="showNavBar"
    >
      <!-- logo here!!!!!!!!!!!!!!!!!!!!!!!! -->
      <div class="order-2 m-0 p-0 xl:order-none">
        <router-link :to="{ name: 'home' }" class="flex-center logo">
          <svg class="h-2 w-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
            <path
              class="cls-1 text-[#393332] transition-all duration-700"
              fill="currentColor"
              d="M186.77,223.93l-4.9-1a95,95,0,1,1,85.81-26l-94.39,94.39Z"
            />
            <path
              class="cls-2"
              fill="#fff"
              d="M200.5,39.79a90,90,0,0,1,63.64,153.64l-82.71,82.71,9.27-46.32,2-9.82-9.82-1.95A90,90,0,0,1,200.5,39.79m0-10a100,100,0,0,0-19.61,198.07l-15.74,78.71L271.21,200.5A100,100,0,0,0,200.5,29.79Z"
            />
            <path
              class="cls-2"
              fill="#fff"
              d="M299.5,465.21a95,95,0,0,1-67.38-162l.18-.14.19-.22,94.22-94.23-13.48,67.43,4.9,1A95,95,0,0,1,299.5,465.21Z"
            />
            <path
              class="cls-2"
              fill="#fff"
              d="M318.57,223.86l-9.27,46.32-2,9.82,9.82,1.95a90,90,0,1,1-81.36,24.68l0-.05.07-.06,82.66-82.66m16.28-30.43L228.79,299.49h0a100,100,0,1,0,90.32-27.36l15.74-78.71Z"
            />
          </svg>
          <span class="block hidden text-[0.22rem] font-bold lg:block">Zentropy</span>
        </router-link>
      </div>
      <ul class="hidden flex-1 xl:flex">
        <!-- v-for for nav link desktop -->
        <li v-for="nav in navList" :key="nav.linkName" class="flex-center first:ml-auto">
          <router-link :to="{ name: nav.linkName }" class="desktop-nav-link hover:text-sky-500">{{
            nav.content
          }}</router-link>
        </li>
        <!-- hover show for member -->
        <li
          class="relative ml-auto cursor-pointer first:ml-auto"
          @mouseenter="showMemberLink = true"
          @mouseleave="showMemberLink = false"
        >
          <div class="desktop-nav-link hover:text-sky-500">
            <span v-if="!store.state.access">會員</span>
            <div class="flex-center flex-col" v-else>
              <img
                :src="store.state.userInfo.profile_image"
                class="h-[0.45rem] w-[0.45rem] rounded-full border-2 border-white object-fill"
                alt=""
              />
            </div>
          </div>
          <div
            class="span-text absolute right-0 origin-top scale-y-0 overflow-hidden rounded-sm bg-gray-800 transition-all"
            :class="{
              'show-member-link': showMemberLink
            }"
          >
            <router-link :to="{ name: 'login' }" class="desktop-member-link" v-if="!store.state.access"
              >登入</router-link
            >
            <router-link :to="{ name: 'signup' }" class="desktop-member-link" v-if="!store.state.access"
              >註冊</router-link
            >
            <router-link :to="{ name: 'memberInfo' }" class="desktop-member-link" v-if="store.state.access"
              >會員中心</router-link
            >
            <router-link
              :to="{ name: 'memberInfo', query: { anchorId: 'myStock' } }"
              class="desktop-member-link"
              v-if="store.state.access"
              >我的自選股</router-link
            >
            <div class="desktop-member-link cursor-pointer" v-if="store.state.access" @click="logOut()">登出</div>
          </div>
        </li>
      </ul>
      <!--mobile display-->
      <button class="order-1 h-min xl:hidden" @click="showMobileNav">
        <svg xmlns="http://www.w3.org/2000/svg" class="mobile-icon" fill="currentColor" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <button class="order-3 xl:hidden" @click="showMobileMember">
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
          <li v-for="nav in navList" :key="nav.linkName" class="mb-1 border-b border-slate-600 last:border-none">
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
        <div class="mobile-nav-header text-sky-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="mobile-icon ml-auto" fill="currentColor" viewBox="0 0 16 16">
            <path d="M10 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path
              d="M2 1a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2ZM1 3a1 1 0 0 1 1-1h2v2H1V3Zm4 10V2h9a1 1 0 0 1 1 1v9c0 .285-.12.543-.31.725C14.15 11.494 12.822 10 10 10c-3.037 0-4.345 1.73-4.798 3H5Zm-4-2h3v2H2a1 1 0 0 1-1-1v-1Zm3-1H1V8h3v2Zm0-3H1V5h3v2Z"
            />
          </svg>
          <span class="ml-1 text-[length:var(--mobile-navlink-text)]">會員中心</span>
          <button class="mobile-cancel-btn text-white" @click="showMobileMember">
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
          <router-link
            :to="{ name: 'login' }"
            class="mobile-member-btn"
            v-if="!store.state.access"
            @click="showMobileMember"
            >登入</router-link
          >
          <router-link
            :to="{ name: 'signup' }"
            class="mobile-member-btn"
            v-if="!store.state.access"
            @click="showMobileMember"
            >註冊</router-link
          >
          <router-link
            :to="{ name: 'memberInfo' }"
            class="mobile-member-btn"
            v-if="store.state.access"
            @click="showMobileMember"
            >會員中心</router-link
          >
          <router-link
            :to="{ name: 'memberInfo', query: { anchorId: 'myStock' } }"
            class="mobile-member-btn"
            v-if="store.state.access"
            @click="showMobileMember"
            >我的自選股</router-link
          >
          <div class="mobile-member-btn cursor-pointer" v-if="store.state.access" @click="logOut()">登出</div>
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
    content: '股市',
    linkName: 'stockHome'
  },
  {
    content: '新聞',
    linkName: 'news'
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
  @apply block h-max w-6 border-b border-gray-600 py-0.5 text-center hover:bg-gray-700;
}
.show-member-link {
  @apply scale-y-100 border border-gray-600;
}
.mobile-nav {
  @apply fixed top-0 z-50 h-screen w-screen bg-gray-800 transition-all duration-1000 xl:hidden;
}
.mobile-nav-header {
  @apply flex items-center border-b-2 border-slate-600 p-2;
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
.router-link-exact-active:nth-child(1) {
  @apply font-medium text-sky-500;
}
.mobile-icon {
  @apply h-[0.4rem] w-[0.4rem];
}
.mobile-member-btn {
  @apply block border-b border-slate-600 py-1 text-center text-[length:var(--mobile-navlink-text)];
}
.mobile-member-btn:nth-last-child(1) {
  @apply border-0;
}
.logo:hover .cls-1 {
  @apply text-sky-500;
}
.logo span {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: white;
}
</style>
