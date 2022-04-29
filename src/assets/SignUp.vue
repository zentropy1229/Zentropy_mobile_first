<template>
  <div class="mx-auto">
    <div class="mb-8"><h1 class="title">SignUp</h1></div>
    <div>
      <form @submit.prevent="submitForm" class="flex flex-col gap-4">
        <div class="field">
          <label>Email</label>
          <input type="email" class="borders" v-model="email" />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" class="borders" v-model="password" />
        </div>
        <div class="field">
          <label>Re-Password</label>
          <input type="password" class="borders" v-model="rePassword" />
        </div>
        <div class="field" v-if="errors.length">
          <p v-for="error in errors" :key="error" class="error-text">
            {{ error }}
          </p>
        </div>
        <div class="field items-end">
          <button
            class="button bg-slate-500 font-bold text-white hover:bg-slate-400"
          >
            Submit
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
const router = useRouter()
const email = ref('')
const password = ref('')
const rePassword = ref('')
const errors = ref([])
const toastDetail = inject('toastDetail')
const submitForm = () => {
  errors.value = []
  if (email.value === '') {
    errors.value.push('請輸入Email')
  }
  if (password.value === '') errors.value.push('請輸入密碼')
  if (password.value !== rePassword.value) errors.value.push('密碼認證錯誤')
  if (!errors.value.length) {
    const formData = {
      username: email.value,
      password: password.value
    }
    axios.defaults.headers.common.Authorization = ''
    axios
      .post('/api/v1/users/', formData)
      .then((res) => {
        toastDetail.value.content = '註冊成功，跳轉至登入頁面！'
        toastDetail.value.status = !toastDetail.value.status
        setTimeout(() => {
          toastDetail.value.status = !toastDetail.value.status
        }, 3000)
        router.push('/log-in')
      })
      .catch((err) => {
        if (err.response) {
          const errorDate = err.response.data.password
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
  @apply rounded-lg border border-slate-100 bg-slate-50 p-2;
}
.field label {
  @apply text-sm text-slate-500;
}
.error-text {
  @apply rounded-lg bg-rose-200 px-4 py-2 text-center text-rose-600;
}
</style>
