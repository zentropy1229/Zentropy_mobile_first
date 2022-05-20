<template>
  <div class="flex min-h-screen bg-gray-800">
    <div class="span-text container mt-1 mb-4 flex w-full flex-col items-center gap-3 text-white lg:flex-row">
      <div class="flex w-full flex-col items-center lg:w-1/2">
        <div class="mb-1 h-16 w-16 rounded-full bg-white"></div>
        <h2 class="text-[0.6rem] font-bold">Hello Zen!</h2>
        <span class="subtitle-text text-gray-400">管理及修改你的使用者資訊</span>
      </div>
      <div class="flex w-full flex-col lg:w-1/2">
        <div class="mb-1 flex">
          <h2 class="title-text">會員資訊</h2>
        </div>
        <form class="flex flex-col gap-1">
          <div class="flex flex-col" v-for="(info, key) in userInfo" :key="info">
            <span class="mb-0.5 w-5 text-gray-200">{{ info.text }}</span>
            <div class="flex flex-wrap items-center rounded-sm bg-gray-900 p-0.5">
              <div class="subtitle-text-sm py-[0.1rem] text-gray-400" v-if="isEditing !== info.text">
                <span>{{ info.value }}</span>
              </div>
              <template v-if="info.type === 'text' || info.type === 'date'">
                <input
                  class="subtitle-text-sm w-full rounded-sm bg-gray-50 p-0.5 py-[0.1rem] text-gray-900 lg:w-16"
                  :type="info.type"
                  v-model="editingInput"
                  v-if="isEditing === info.text"
                />
              </template>
              <template v-else>
                <select
                  class="subtitle-text-sm w-full rounded-sm bg-gray-50 p-0.5 py-[0.1rem] text-gray-900 lg:w-16"
                  v-model="editingInput"
                  v-if="isEditing === info.text"
                >
                  <option class="span-text-sm bg-gray-500">男生</option>
                  <option class="span-text-sm bg-gray-500">女生</option>
                  <option class="span-text-sm bg-gray-500">不分性別</option>
                </select>
              </template>
              <button
                class="relative ml-auto h-2 border-gray-600 px-1 after:absolute after:left-0 after:top-0 after:h-full after:w-[0.02rem] after:rounded-sm after:bg-gray-400 hover:bg-gray-800"
                @click.prevent="startEditing(info.text, info.value)"
                v-if="!(isEditing === info.text)"
              >
                <svg class="h-0.5 w-0.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">
                  <path
                    d="M362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32zM421.7 220.3L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3z"
                  />
                </svg>
              </button>
              <div class="ml-auto p-0.5" v-if="isEditing === info.text">
                <button @click.prevent="updateUserInfo(key)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-1 w-1 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"
                    />
                  </svg>
                </button>
                <button class="ml-0.5 text-rose-500" @click.prevent="isEditing = ''">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-1 w-1" fill="currentColor" viewBox="0 0 16 16">
                    <path
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <span class="ml-0.5 text-rose-500" v-if="errors && key === Object.keys(errors)[0]">{{
              errors[key][0]
            }}</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const isEditing = ref('')
const editingInput = ref('')
const errors = ref('')
const userInfo = computed(() => {
  return {
    email: {
      text: 'Email 電子郵件',
      value: store.state.userInfo.email,
      type: 'text'
    },
    username: {
      text: '使用者姓名',
      value: store.state.userInfo.username,
      type: 'text'
    },
    gender: {
      text: '性別',
      value: store.state.userInfo.gender,
      type: 'select'
    },
    birthday: {
      text: '生日',
      value: '2021-01-01',
      type: 'date'
    }
  }
})
const startEditing = (text, value) => {
  isEditing.value = text
  editingInput.value = value
}
const updateUserInfo = (key) => {
  errors.value = ''
  store
    .dispatch('initialize')
    .then(() => {
      axios
        .patch(`/api/user/${store.state.userInfo.id}/`, { [key]: editingInput.value })
        .then(() => {
          store.dispatch('getUserInfo')
        })
        .catch((err) => {
          errors.value = err.response.data
        })
        .then(() => {
          isEditing.value = errors.value ? isEditing.value : ''
        })
    })
    .catch((err) => {
      alert(err.message)
      router.replace({ name: 'login' })
    })
}
</script>

<style lang="postcss" scoped></style>
