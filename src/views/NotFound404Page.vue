<template>
  <div class="flex-center h-screen bg-gray-900 text-white">
    <div class="container flex flex-col items-start">
      <h2 class="title-text mb-1">抱歉！您尋找的頁面不存在</h2>
      <div class="span-text">
        <span class="text-gray-300">您可以返回上一頁重新搜尋</span>
        <span class="span-text-sm ml-1 text-gray-300">或者</span>
        <router-link :to="{ name: 'home' }" class="span-text-lg ml-1 font-medium hover:text-orange-400"
          >點此返回首頁</router-link
        >
      </div>
    </div>
  </div>
</template>

<script></script>

<style lang="postcss" scoped></style>
