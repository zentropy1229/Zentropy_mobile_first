<template>
  <div class="container flex min-h-screen flex-col items-center bg-gray-800 text-white">
    <div class="mx-auto mt-4 mb-1 flex flex-col items-center">
      <h1 class="title-text mb-0.5">綜合新聞</h1>
      <span class="block">台股通吃大小事，一眼看近天下事</span>
    </div>
    <stock-search class="basis-1/2" :url="'/api/news/'" />
    <hot-news />
  </div>
</template>

<script setup>
import StockSearch from '@/components/StockHomeTools/StockSearch'
import HotNews from '@/components/StockHomeTools/HotNews'
</script>
