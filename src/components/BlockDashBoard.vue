<template>
  <div class="container">
    <div>
      <h2 class="title-text text-center">數據化的呈現</h2>
      <p class="subtitle-text-sm text-center text-gray-300">
        以輕鬆的方式找到最適合的交易點
      </p>
    </div>
    <div class="flex-center flex-wrap">
      <DashBoard :scoreValue="80" class="" />
      <DashBoard :scoreValue="60" class="hidden lg:block" />
    </div>
  </div>
</template>
<script setup>
import DashBoard from '@/components/smallComponents/DashBoard'
</script>
