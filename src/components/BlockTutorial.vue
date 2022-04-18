<template>
  <div class="flex-center container relative flex-col">
    <div
      class="shadow-set sticky top-[1.8rem] mb-2 rounded-md lg:flex"
      v-for="num of 3"
      :key="num"
    >
      <div
        class="title-container content-width relative flex flex-col justify-between gap-4 p-2"
      >
        <div>
          <h2 class="subtitle-text mb-1">我們的介紹{{ num }}</h2>
          <span class="span-text-lg block text-gray-400"
            >目事離員根回接明超登實工三品特技們他而孩媽價事用職再年不了氣時真農信的，比心樣不輪些……展心度精個務生問才界時養試電存願和公前展他他，常奇了了子二廣我人子，了常界子青陽北的來我。</span
          >
        </div>
        <div>
          <a
            class="span-text underline decoration-dashed decoration-2 underline-offset-8 hover:text-p"
            href="javascript:void(0)"
            >查看更多</a
          >
        </div>
      </div>
      <div class="content-width p-2">
        <div class="h-[20vw] w-full rounded-md bg-gray-200"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="postcss" scoped>
.title-container::before {
  @apply absolute right-0 top-1/2 hidden h-3/4 w-[1.5px] -translate-y-1/2 bg-white content-[''] lg:block;
}
.title-container::after {
  @apply absolute bottom-0 left-0 h-[1.5px] w-full bg-white content-[''] lg:hidden;
}
.content-width {
  @apply w-full lg:w-1/2;
}
</style>
