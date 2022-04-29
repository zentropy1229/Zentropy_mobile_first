<template>
  <div class="mx-auto">
    <div class="mb-8"><h1 class="title">Login</h1></div>
    <div>
      <form class="flex gap-4 flex-col" @submit.prevent="submitForm">
        <div class="field">
          <label>Email</label>
          <input type="text" class="borders" v-model="email" />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="text" class="borders" v-model="password" />
        </div>
        <div class="field" v-if="errors.length">
          <p v-for="error in errors" :key="error" class="error-text">
            {{ error }}
          </p>
        </div>
        <div class="field items-center">
          <button
            class="button font-bold bg-slate-500 text-white hover:bg-slate-400"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
const errors = ref([])
const email = ref('')
const password = ref('')
const toastDetail = inject('toastDetail')

const submitForm = () => {
  errors.value = []
  if (email.value === '') {
    errors.value.push('請輸入Email')
  }
  if (password.value === '') errors.value.push('請輸入密碼')
  if (!errors.value.length) {
    const formData = {
      username: email.value,
      password: password.value
    }
    axios.defaults.headers.common.Authorization = ''

    axios
      .post('/api/v1/jwt/create/', formData)
      .then((res) => {
        toastDetail.value.content = '登入成功！歡迎進入'
        toastDetail.value.status = !toastDetail.value.status
        setTimeout(() => {
          toastDetail.value.status = !toastDetail.value.status
        }, 3000)
        const access = res.data.access
        const refresh = res.data.refresh
        store.commit('setToken', { access, refresh })
        axios.defaults.headers.common.Authorization = 'Bearer ' + access
        router.push('/')
      })
      .catch((err) => {
        if (err.response) {
          const errorDate = err.response.data
          for (const property in errorDate) {
            errors.value.push(`${errorDate[property]}`)
          }
        } else if (err.message) {
          errors.value.push('出錯了，請重新註冊')
        }
      })
  }
}
</script>

<style lang="postcss" scoped>
.field {
  @apply flex flex-col gap-2;
}
.borders {
  @apply border border-slate-100 bg-slate-50 p-2 rounded-lg;
}
.field label {
  @apply text-sm text-slate-500;
}
.error-text {
  @apply text-rose-600 bg-rose-200 px-4 py-2 rounded-lg text-center w-60;
}
</style>
