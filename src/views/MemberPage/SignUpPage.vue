<template>
  <div class="align-center flex min-h-screen bg-gray-800 text-white">
    <div class="container mx-auto">
      <div class="mt-2 mb-1">
        <h2 class="subtitle-text text-center">註冊</h2>
      </div>
      <form @submit.prevent="">
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">電子郵件Email</label>
            <span class="ml-0.5 block text-[0.1rem] text-rose-400">{{ showError('email') }}</span>
          </div>
          <input type="text" class="input-value" v-model="formData.email" />
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">使用者名稱</label>
            <span class="ml-0.5 block text-[0.1rem] text-rose-400">{{ showError('username') }}</span>
          </div>
          <input type="text" class="input-value" v-model="formData.username" />
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">密碼</label>
            <span class="ml-0.5 block block text-[0.1rem] text-rose-400">{{ showError('password') }}</span>
          </div>
          <input type="password" class="input-value" v-model="formData.password" />
          <div class="flex flex-col">
            <span class="passwrod-tips">* 密碼需包含大小寫英文字母及數字</span>
            <span class="passwrod-tips">* 密碼長度需為8-20個字元</span>
            <span class="passwrod-tips">* 密碼不可包含中文</span>
          </div>
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">確認密碼</label>
            <span class="ml-0.5 block block text-[0.1rem] text-rose-400">{{ showError('password_confirm') }}</span>
          </div>
          <input type="password" class="input-value" v-model="passwordConfirm" />
        </div>
        <div class="input-container">
          <div class="label-container">
            <label class="input-label">性別</label>
            <span class="ml-0.5 block block text-[0.1rem] text-rose-400">{{ showError('gender') }}</span>
          </div>
          <select class="input-value" v-model="formData.gender">
            <option class="span-text-sm bg-gray-500">男生</option>
            <option class="span-text-sm bg-gray-500">女生</option>
            <option class="span-text-sm bg-gray-500">不分性別</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button class="rounded-sm bg-white py-0.5 px-2 text-gray-600" @click="submitFrom">註冊</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const passwordConfirm = ref('')
const formData = ref({
  email: '',
  username: '',
  password: '',
  gender: ''
})
const error = ref({
  email: [''],
  username: [''],
  password: [''],
  password_confirm: [''],
  gender: ['']
})
const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
const usernameRule = /^.{1,20}$/
const genderRule = /^((男生)|(女生)|(不分性別))$/
const passwordCaseRule = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
const passwordLengthRule = /^.{8,20}$/
const passwordCharacterRule = /^[^\u4e00-\u9fff]+$/
const checkForm = (label, regx, errStr) => {
  !formData.value[label]
    ? (error.value[label] = ['此欄位不可為空白'])
    : !regx.test(formData.value[label])
        ? (error.value[label] = [errStr])
        : delete error.value[label]
}
const submitFrom = () => {
  checkForm('email', emailRule, '電子郵件與規則不符')
  checkForm('username', usernameRule, '最多為20個字元')
  checkForm('gender', genderRule, '請輸入正確的性別')
  checkForm('password', passwordCaseRule, '密碼需包含大小寫英文字母及數字')
  if (!error.value.password || !error.value.password[0]) {
    checkForm('password', passwordLengthRule, '密碼長度需為8-20個字元')
  }
  if (!error.value.password || !error.value.password[0]) {
    checkForm('password', passwordCharacterRule, '密碼不可包含中文')
  }
  if (passwordConfirm.value !== formData.value.password) {
    error.value.password_confirm = ['驗證密碼不一致']
  } else {
    delete error.value.password_confirm
  }
  // ==================================================
  if (!Object.keys(error.value).length) {
    axios
      .post('/api/user/', formData.value)
      .then((res) => {
        alert('註冊成功')
        router.push({ name: 'login' })
      })
      .catch((err) => {
        error.value = err.response.data
      })
  }
}
const showError = computed(() => {
  return function (field) {
    if (error.value[field]) return error.value[field][0]
    else return ''
  }
})
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
  @apply span-text mb-0.5 w-16 border-b bg-transparent py-[0.05rem] font-medium outline-none;
}
.passwrod-tips {
  @apply mb-0.5 text-[.1rem] text-gray-300;
}
</style>
