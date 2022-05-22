<template>
  <div class="span-text w-full rounded-sm bg-gray-900 font-medium">
    <table class="w-full">
      <thead>
        <tr class="span-text-sm border-b-2 border-gray-400">
          <th class="h-2 w-6 px-0.5 text-left">股名 / 代號</th>
          <th class="h-2 px-0.5 text-right">股價</th>
          <th class="h-2 px-0.5 text-right">漲跌</th>
          <th class="h-2 px-0.5 text-right">成交量</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="stock in stockInfo" :key="stock" class="border-b border-gray-500">
          <td class="h-2.5 w-4 px-0.5 text-left">
            <router-link
              :to="{ name: 'stock', params: { stockid: stock.stock.stock } }"
              class="block font-medium text-p hover:text-white"
              >{{ stock.stock.stockName }}</router-link
            >
            <span class="span-text-sm text-gray-300">{{ stock.stock.stock }}.TW</span>
          </td>
          <td class="h-2 px-0.5 text-right font-bold">{{ stock.price }}</td>
          <td class="h-2 px-0.5 text-right font-bold">{{ stock.ud }}</td>
          <td class="h-2 px-0.5 text-right font-bold">{{ stock.volumn }}</td>
        </tr>
      </tbody>
    </table>
    <div class="w-full p-0.5 text-right" v-show="props.routerInfo">
      <router-link
        :to="{ name: props.routerInfo.name, query: props.routerInfo.query }"
        class="span-text-sm hover:text-orange-300"
        href="javascript:"
        >查看全部...</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRef } from 'vue'
const props = defineProps({
  stockInfo: {
    type: Array,
    default: undefined
  },
  routerInfo: {
    type: Object,
    defalut: undefined
  }
})
const stockInfo = toRef(props, 'stockInfo')
</script>
