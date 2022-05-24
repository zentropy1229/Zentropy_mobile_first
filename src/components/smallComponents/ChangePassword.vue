<template>
  <div class="absolute top-0 left-0 z-[100] h-screen w-screen" @keydown.enter.prevent="send">
    <div class="fixed top-0 left-0 h-full w-full bg-gray-900/80 blur-xl"></div>
    <div class="y-center x-center flex-center fixed h-max w-16 flex-col rounded bg-gray-700 p-1">
      <div class="flex flex-col">
        <h2 class="subtitle-text mx-auto mb-1">更改密碼</h2>
        <input class="change-password mb-1" type="password" placeholder="密碼" v-model="password" />
        <input class="change-password" type="password" placeholder="確認密碼" v-model="confirmPassword" />
        <div class="my-1 flex flex-col gap-0.5">
          <span
            class="rounded-sm bg-rose-100 px-1 py-[0.05rem] font-medium text-rose-500"
            v-for="err in errors"
            :key="err"
            v-show="errors.length"
            >{{ err }}</span
          >
        </div>
      </div>

      <div class="flex">
        <button class="btn-style bg-rose-500" @click.prevent="send">確定</button>
        <button class="btn-style ml-1 bg-gray-100 text-gray-900" @click.prevent="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from 'vuex'
import { ref, defineEmits } from 'vue'
import regexTest from '@/utils/regexTest'
const errors = ref([])
const password = ref('')
const store = useStore()
const confirmPassword = ref('')
const emit = defineEmits(['abort'])

const send = () => {
  errors.value = []
  if (!(password.value === confirmPassword.value)) {
    errors.value.push('確認密碼錯誤')
    return
  }
  errors.value = regexTest('passwordRule', password.value).password
  if (!errors.value.length) {
    const form = new FormData()
    form.append('password', password.value)
    store
      .dispatch('getToken')
      .then(() => {
        axios
          .patch(`/api/user/${store.state.userInfo.id}/`, form)
          .then(() => {
            store.dispatch('logOut')
          })
          .then(() => {
            alert('修改密碼成功，請重新登入')
            window.location.replace('/login')
          })
          .catch((err) => {
            errors.value = err.response.data.password
          })
      })
      .catch((err) => {
        alert(err.message)
        window.location.replace('/login')
      })
  }
}
const cancel = () => {
  password.value = ''
  confirmPassword.value = ''
  errors.value = []
  emit('abort', false)
}
</script>

<style lang="postcss" scoped>
.btn-style {
  @apply span-text rounded-sm px-0.5 py-[0.05rem] font-medium;
}
.change-password {
  @apply w-10 rounded-sm bg-gray-800 p-0.5;
}
</style>
