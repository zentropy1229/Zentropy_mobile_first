<template>
  <div class="container relative flex flex-col">
    <div class="mb-2">
      <h2 class="title-text">集大成的預測系統</h2>
      <p class="subtitle-text-sm text-slate-400">可靠且方便運用</p>
    </div>
    <div
      class="sticky -top-[2.5rem] mb-5 w-full rounded-md border-4 border-gray-600 bg-gray-900 lg:top-[1.5rem] lg:flex"
      v-for="detail of comment"
      :key="detail"
    >
      <div class="title-container relative flex w-full flex-col p-2 lg:w-1/2">
        <div class="mb-0.5">
          <div>
            <img :src="detail.img" class="h-[3rem] w-full rounded-md object-contain" />
            <h2 class="subtitle-text mb-1 border-l-8 border-sky-500 pl-0.5 font-bold tracking-wider">
              {{ detail.name }}
            </h2>
          </div>
          <span class="mb-0.5 block w-fit rounded bg-[#1c2538] px-0.5 py-[0.05rem] text-slate-400">{{
            detail.type
          }}</span>
          <span class="span-text-lg block text-slate-400">{{ detail.comment }} </span>
        </div>
      </div>

      <div class="p-2">
        <img :src="detail.img2" class="h-[3rem] w-full rounded-sm object-contain lg:h-[5rem]" />
      </div>
    </div>
  </div>
</template>

<script setup>
const comment = [
  {
    name: 'A小朋友',
    type: '貴族學校學生',
    comment:
      '會知道 Zentropy 是同學介紹的，自己對股票一竅不通，看到股價跌那麼慘真的很煩惱沒想到 Zentropy 一個神操作反而讓我倒賺一些，傻爆眼！',
    img: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/1-1.png',
    img2: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/1-2.jpg'
  },
  {
    name: 'B小姐',
    type: '公務員',
    comment:
      '跟著姐妹一起投資沒想到跌那麼多，幸好有按照 Zentropy 的預測操作，讓損失減到最小，看來下次姐妹聚會喝下午茶我該請客了！',
    img: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/2-1.png',
    img2: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/2-2.jpg'
  },
  {
    name: 'C先生',
    type: '身心科醫生',
    comment:
      '對於我這種忙碌的人來說，Zentropy 真的是方便又好用，跟著它的建議與指示走，沒想到最後獲利比預期的多非常多，真的是太棒了！',
    img: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/3-1.png',
    img2: 'https://zentropy.s3.ap-northeast-1.amazonaws.com/img/3-2.jpg'
  }
]
</script>

<style lang="postcss" scoped>
.title-container::before {
  @apply y-center absolute right-0 hidden h-3/4 w-[4px] rounded-full bg-gray-700 content-[''] lg:block;
}
.title-container::after {
  @apply x-center absolute bottom-0 h-[4px]  w-3/4 rounded-full bg-gray-700 content-[''] lg:hidden;
}
</style>
