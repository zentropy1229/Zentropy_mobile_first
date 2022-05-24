<template>
  <div class="lg:flex-center relative h-screen bg-white bg-cover lg:overflow-hidden lg:bg-loginPage">
    <div class="rounded-md bg-white p-2 lg:w-20">
      <div class="slideLeft subtitle-text-lg mb-4 font-bold text-p xs:mb-2">
        <h1>Zentropy帳戶登入</h1>
      </div>
      <div>
        <div
          class="relative mb-1.5 overflow-hidden pl-[.3rem] after:absolute after:inset-0 after:w-[.1rem] after:bg-gray-600"
        >
          <span class="slideLeft subtitle-text-sm block text-gray-600">歡迎回來</span>
          <span class="slideLeft span-text block text-gray-400">登入開啟全新的一天 !</span>
        </div>
        <form class="flex-center flex-col gap-1.5" @submit.prevent="submitForm">
          <div class="field">
            <input
              type="text"
              class="input-frame"
              :class="{ 'border-focus': accountFocus }"
              v-model="email"
              @focus="accountFocus = true"
              @blur="accountFocus = false"
            />
            <label
              class="initial-placeholder"
              :class="{
                'placeholder-focus': accountShrink,
                'text-p': accountFocus
              }"
              >電子郵件Email</label
            >
          </div>
          <div class="field">
            <input
              type="password"
              class="input-frame"
              :class="{ 'border-focus': passwordFocus }"
              v-model="password"
              @focus="passwordFocus = true"
              @blur="passwordFocus = false"
            />
            <label
              class="initial-placeholder"
              :class="{
                'placeholder-focus': passwordShrink,
                'text-p': passwordFocus
              }"
              >請輸入密碼</label
            >
          </div>
          <div class="mb-0.5 mr-auto" v-if="error">
            <span class="span-text rounded-sm bg-rose-50 px-1 py-[0.1rem] font-medium text-rose-500">{{ error }}</span>
          </div>
          <button class="span-text-lg w-full bg-slate-600 py-[.2rem] text-white hover:bg-blue-600">
            <p>登入</p>
          </button>
        </form>
      </div>
      <div class="my-1 h-px w-full bg-slate-200"></div>
      <div class="flex-center span-text flex-col">
        <div class="flex-center mb-1">
          <span class="text-gray-900">還沒有帳號?</span>
          <router-link class="ml-[.1rem] text-p hover:text-blue-400" :to="{ name: 'signup' }">註冊</router-link>
        </div>
        <router-link class="text-p hover:text-blue-400" :to="{ name: 'home' }">忘記密碼</router-link>
      </div>
    </div>
    <div class="absolute bottom-4 right-4 hidden lg:block">
      <router-link :to="{ name: 'home' }" class="subtitle-text-sm cursor-pointer text-white hover:text-p"
        >回首頁</router-link
      >
    </div>
    <!-- 背景 -->
    <div class="hidden lg:block">
      <div
        class="circle-item right-8 top-6 h-4 w-2.5"
        style="--circle-item-duration: 2s; --circle-item-rotate: 60deg"
      ></div>
      <div class="circle-item top-10 left-8 h-4 w-4"></div>
      <div class="circle-item left-4 top-20 h-8 w-4" style="--circle-item-rotate: 30deg"></div>
      <div class="circle-item top-20 right-2 h-2 w-2" style="--circle-item-duration: 8s"></div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const accountFocus = ref(false)
const passwordFocus = ref(false)
const error = ref()
const email = ref('')
const password = ref('')
// ----------------------------------- methods -----------------------------------
const submitForm = () => {
  error.value = ''
  if (password.value === '' || email.value === '') error.value = '帳號或密碼錯誤'
  if (!error.value.length) {
    const formData = {
      email: email.value,
      password: password.value
    }
    axios.defaults.headers.common.Authorization = ''

    axios
      .post('/api/token/', formData)
      .then((res) => {
        const access = res.data.access
        const refresh = res.data.refresh
        store.commit('setToken', { access, refresh })
        axios.defaults.headers.common.Authorization = 'Bearer ' + access
        alert('登入成功！')
        router.push({ name: 'stockHome' })
      })
      .catch((err) => {
        if (err.response) {
          error.value = '帳號或密碼錯誤!'
          password.value = ''
        }
      })
  }
}
// ----------------------------------- computed -----------------------------------
const accountShrink = computed(() => {
  return accountFocus.value ? 1 : email.value ? 1 : 0
})
const passwordShrink = computed(() => {
  return passwordFocus.value ? 1 : password.value ? 1 : 0
})
</script>

<style lang="postcss" scoped>
.field {
  @apply relative flex w-full flex-col text-[length:var(--input-holder-text)] text-slate-300;
}
.input-frame {
  @apply border border-slate-200 bg-transparent p-[.16rem] text-[length:var(--input-text)] text-slate-800 outline-none;
}
.error-text {
  @apply mb-1 rounded-lg text-center text-rose-600;
}
.initial-placeholder {
  @apply pointer-events-none absolute top-1/2 left-[.2rem] -translate-y-1/2 font-light transition-all duration-200 ease-in-out;
}
.placeholder-focus {
  @apply top-0 left-[0.1rem] scale-[.85] bg-white;
}
.border-focus {
  @apply scale-[1.02] border-p shadow-xl shadow-slate-100;
}
.circle-item {
  --circle-item-duration: 5s;
  --circle-item-rotate: 0deg;
  @apply absolute rounded-full bg-[#749fff] shadow-xl;
  animation: floats linear infinite;
  animation-duration: var(--circle-item-duration);
}
@keyframes floats {
  0%,
  100% {
    transform: translateY(10px) rotate(var(--circle-item-rotate));
  }
  50% {
    transform: translateY(-10px) rotate(calc(var(--circle-item-rotate) * -1));
  }
}
</style>
