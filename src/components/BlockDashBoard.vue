<template>
  <div class="container">
    <div>
      <h2 class="title-text">數據化的呈現方式</h2>
      <p class="subtitle-text text-gray-300">
        以最輕鬆的方式找到最適合的交易點
      </p>
    </div>
    <div class="flex-center flex-wrap">
      <DashBoard :scoreValue="80" />
      <DashBoard :scoreValue="60" class="hidden md:block" />
      <DashBoard :scoreValue="20" class="hidden md:block" />
    </div>
  </div>
</template>
<script setup>
import DashBoard from '@/components/smallComponents/DashBoard'
</script>
