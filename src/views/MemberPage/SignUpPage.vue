<template>
  <div class="align-center flex min-h-screen bg-gray-800 text-white">
    <div class="container mx-auto mb-2">
      <div class="mt-2 mb-1">
        <h2 class="subtitle-text text-center">註冊</h2>
      </div>
      <form @submit.prevent="">
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">電子郵件Email</label>
            <span class="ml-0.5 block text-[0.1rem] text-rose-400">{{ errors.email?.slice(0, 1)[0] }}</span>
          </div>
          <input type="text" class="input-value" v-model="formData.email" />
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">使用者名稱</label>
            <span class="ml-0.5 block text-[0.1rem] text-rose-400">{{ errors.username?.slice(0, 1)[0] }}</span>
          </div>
          <input type="text" class="input-value" v-model="formData.username" />
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">密碼</label>
            <span class="ml-0.5 block block text-[0.1rem] text-rose-400">{{ errors.password?.slice(0, 1)[0] }}</span>
          </div>
          <input type="password" class="input-value" v-model="formData.password" />
          <div class="flex flex-col">
            <span class="passwrod-tips">* 密碼需包含大小寫英文字母及數字</span>
            <span class="passwrod-tips">* 密碼長度需為6-20個字元</span>
            <span class="passwrod-tips">* 密碼不可包含中文</span>
          </div>
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">確認密碼</label>
            <span class="ml-0.5 block block text-[0.1rem] text-rose-400">{{
              errors.passwordConfirm?.slice(0, 1)[0]
            }}</span>
          </div>
          <input type="password" class="input-value" v-model="passwordConfirm" />
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">手機號碼</label>
            <span class="ml-0.5 block text-[0.1rem] text-rose-400">{{ errors.phone?.slice(0, 1)[0] }}</span>
          </div>
          <input type="text" class="input-value" v-model="formData.phone" />
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">性別</label>
            <span class="ml-0.5 block block text-[0.1rem] text-rose-400">{{ errors.gender?.slice(0, 1)[0] }}</span>
          </div>
          <select class="input-value" v-model="formData.gender">
            <option class="span-text-sm bg-gray-900">男生</option>
            <option class="span-text-sm bg-gray-900">女生</option>
            <option class="span-text-sm bg-gray-900">不分性別</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            class="rounded-sm bg-slate-100 py-0.5 px-2 text-gray-900 hover:bg-gray-700 hover:text-white"
            @click="submitFrom"
          >
            註冊
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import regexTest from '@/utils/regexTest'
const router = useRouter()
const passwordConfirm = ref('')
const formData = ref({
  email: '',
  username: '',
  password: '',
  phone: '',
  gender: ''
})
const errors = ref({})
const submitFrom = () => {
  errors.value = {}
  if (!(formData.value.password === passwordConfirm.value)) {
    errors.value.passwordConfirm = ['驗證密碼不一致']
  }
  errors.value.email = regexTest('emailRule', formData.value.email).email
  errors.value.username = regexTest('usernameRule', formData.value.username).username
  errors.value.password = regexTest('passwordRule', formData.value.password).password
  errors.value.phone = regexTest('phoneRule', formData.value.phone).phone
  errors.value.gender = regexTest('genderRule', formData.value.gender).gender
  // ==================================================
  Object.entries(errors.value).forEach(([key, value]) => {
    if (!Object.values(value).length) {
      delete errors.value[key]
    }
  })
  // if ok submit form
  if (!Object.keys(errors.value).length) {
    axios
      .post('/api/user/', formData.value, { header: { Authorization: '' } })
      .then(() => {
        alert('註冊成功')
        router.push({ name: 'login' })
      })
      .catch((err) => {
        errors.value = err.response.data
      })
  }
}
</script>

<style lang="postcss" scoped>
.input-container {
  @apply mb-1 flex flex-col;
}
.label-container {
  @apply mb-0.5 flex items-center;
}
.input-label {
  @apply span-text-sm text-gray-400;
}
.input-value {
  @apply span-text-lg mb-0.5 w-16 rounded-[0.08rem] border border-slate-600 bg-gray-900 px-0.5 py-[0.08rem] font-medium tracking-widest outline-none;
}
.passwrod-tips {
  @apply mb-0.5 text-[.1rem] text-gray-300;
}
</style>
