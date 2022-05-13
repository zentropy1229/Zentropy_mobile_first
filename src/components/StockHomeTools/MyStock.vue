<template>
  <div>
    <h2 class="subtitle-text mb-0.5">我的自選股</h2>
    <div class="span-text w-full rounded-sm bg-gray-600 p-0.5">
      <table class="w-full">
        <tr class="border-b-4 border-gray-400">
          <th class="h-2 w-4 text-left">股名 / 代號</th>
          <th class="h-2 px-0.5 text-right">股價</th>
          <th class="h-2 px-0.5 text-right">漲跌</th>
          <th class="h-2 px-0.5 text-right">成交量</th>
        </tr>
        <tr v-for="index in 5" :key="index" class="border-b border-gray-500">
          <td class="h-2.5 w-4 text-left">
            <a
              href="javascript:"
              class="block font-medium text-orange-300 hover:text-orange-400"
              >福壽</a
            ><a href="javascript:" class="span-text-sm">1219.TW</a>
          </td>
          <td class="h-2 px-0.5 text-right">125.00</td>
          <td class="h-2 px-0.5 text-right">5.00</td>
          <td class="h-2 px-0.5 text-right">8700</td>
        </tr>
      </table>
      <div class="w-full p-0.5 text-right">
        <a class="span-text-sm hover:text-orange-300" href="javascript:"
          >查看全部...</a
        >
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style lang="postcss" scoped></style>
