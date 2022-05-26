<template>
  <div class="main span-text flex flex-col overflow-hidden">
    <div class="container mt-4">
      <div class="main-title">
        <div>
          <h1 class="border-left subtitle-text-lg">團隊</h1>
        </div>
      </div>
      <div class="main-content flex-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-1/3 lg:order-2" viewBox="0 0 500 500">
          <path class="cls-1" fill="#393332" d="M186.77,223.93l-4.9-1a95,95,0,1,1,85.81-26l-94.39,94.39Z" />
          <path
            class="cls-2"
            fill="#fff"
            d="M200.5,39.79a90,90,0,0,1,63.64,153.64l-82.71,82.71,9.27-46.32,2-9.82-9.82-1.95A90,90,0,0,1,200.5,39.79m0-10a100,100,0,0,0-19.61,198.07l-15.74,78.71L271.21,200.5A100,100,0,0,0,200.5,29.79Z"
          />
          <path
            class="cls-2"
            fill="#fff"
            d="M299.5,465.21a95,95,0,0,1-67.38-162l.18-.14.19-.22,94.22-94.23-13.48,67.43,4.9,1A95,95,0,0,1,299.5,465.21Z"
          />
          <path
            class="cls-2"
            fill="#fff"
            d="M318.57,223.86l-9.27,46.32-2,9.82,9.82,1.95a90,90,0,1,1-81.36,24.68l0-.05.07-.06,82.66-82.66m16.28-30.43L228.79,299.49h0a100,100,0,1,0,90.32-27.36l15.74-78.71Z"
          />
        </svg>
        <div class="span-text-lg flex flex-col lg:order-1 lg:w-2/3">
          <span class="subtitle-text mb-1">Zentropy ｜禪熵 </span>
          <p class="mb-0.5">
            「熵」是用來測量一個系統的混亂程度，而熵只會不變或增加，就像股市資料愈來愈多變得更加混沌，但終能回歸「禪」那似有若無的真理。
          </p>
          <p class="mb-2">
            理財是現代人必經的課題，但股票除了累積大量的資料，更有許多不同的切入點與分析方法，造成一般人難以入門，而我們的宗旨即是帶領使用者跟隨我們的腳步，透過機器學習領略股海無涯的玄妙，看透常人所無法領悟的奧秘，一同進入禪的無我境界。
          </p>
          <span class="span-text ml-auto text-slate-400"
            ><i>“&ensp;Entropy 是我們的生活態度；Zen 則是我們的處世哲學&ensp;”</i></span
          >
        </div>
      </div>

      <div class="main-title">
        <div>
          <h1 class="border-left subtitle-text-lg">成員</h1>
        </div>
      </div>
      <div class="main-content mb-4">
        <div class="main-member w-full lg:w-1/2">
          <div class="main-member-card-position">
            <div class="member-mask"></div>
            <p class="member-info border-left">
              陳俊佑 <br />
              機器學習
            </p>
            <img class="member-img" src="https://zentropy.s3.ap-northeast-1.amazonaws.com/img/yoooo.jpg" />
          </div>
        </div>
        <div id="slideshow">
          <div class="entire-content">
            <div class="content-carrousel">
              <figure class="shadow">
                <img id="p1" src="https://zentropy.s3.ap-northeast-1.amazonaws.com/img/yoooo.jpg" />
              </figure>
              <figure class="shadow">
                <img id="p2" src="https://zentropy.s3.ap-northeast-1.amazonaws.com/img/rich.jpg" />
              </figure>
              <figure class="shadow">
                <img id="p3" src="https://zentropy.s3.ap-northeast-1.amazonaws.com/img/kai.png" />
              </figure>
              <figure class="shadow">
                <img id="p4" src="https://zentropy.s3.ap-northeast-1.amazonaws.com/img/jay.jpg" />
              </figure>
              <figure class="shadow">
                <img id="p5" src="https://zentropy.s3.ap-northeast-1.amazonaws.com/img/lun.jpg" />
              </figure>
              <figure class="shadow">
                <img id="p6" src="https://zentropy.s3.ap-northeast-1.amazonaws.com/img/bao.jpg" />
              </figure>
              <!-- <figure class="shadow"><img src="https://images.pexels.com/photos/302515/pexels-photo-302515.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"/></figure>
              <figure class="shadow"><img src="https://images.pexels.com/photos/301682/pexels-photo-301682.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"/></figure>
              <figure class="shadow"><img src="https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"/></figure> -->
            </div>
          </div>
        </div>
      </div>

      <div class="main-title">
        <h1 class="border-left subtitle-text-lg">聯絡我們</h1>
      </div>
      <div class="main-content mb-4">
        <div class="contact-us-content">
          <div class="mb-0.5 flex flex-col lg:flex-row lg:items-end">
            <h2 class="subtitle-text mb-0.5 leading-none lg:mb-0">歡迎與我們聯繫！</h2>
            <span class="span-text-lg font-medium leading-none text-slate-400">追蹤我們的社群或用電子郵件聯絡我們</span>
          </div>
          <p class="text-slate-00">
            可於此區塊的右方輸入欄直接寄電子郵件詢問！（需要於輸入格中填寫完整的資訊）或是使用您的社群帳戶，向我們社群媒體的官方帳號提問，於
            Zentropy 每個分頁的頁尾皆會連結我們各個社群媒體帳號！
          </p>
        </div>

        <div class="contact-us-content">
          <form class="contact-us-content-right" action="https://formsubmit.co/zentropy1229@gmail.com" method="POST">
            <input type="email" class="w-16" placeholder="電子郵件" name="email" id="" required />
            <div class="flex w-16">
              <input type="text" class="w-full" placeholder="姓名" name="name" id="" />
              <select class="ml-0.5" name="gender" id="">
                <option selected disabled>性別</option>
                <option value="男">男</option>
                <option value="女">女</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <input type="text" class="w-16" placeholder="主旨" name="_subject" id="" required />
            <textarea
              name="message"
              class="w-16"
              placeholder="請輸入問題內容"
              id=""
              cols="30"
              rows="10"
              required
            ></textarea>
            <button type="submit" class="rounded-sm bg-sky-500 px-1 py-0.5 hover:bg-sky-600">送出</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const $ = require('jquery')
const person = [
  {
    id: 2,
    name: '李濟',
    info: '前端'
  },
  {
    id: 3,
    name: '陳愷',
    info: '後端'
  },
  {
    id: 1,
    name: '陳俊佑',
    info: '機器學習'
  },
  {
    id: 6,
    name: '鮑政宇',
    info: '機器學習'
  },
  {
    id: 4,
    name: '張聖杰',
    info: '協助開發'
  },
  {
    id: 5,
    name: '蕭宇倫',
    info: '協助開發'
  }
]
$(document).ready(function () {
  $('.member-info').show()
  $('.member-mask').show()

  for (const member of person) {
    const id = `#p${member.id}`
    $(id).click(function (event) {
      /* Act in the event */
      $('.member-img').attr('src', $(id).attr('src'))
      $('.member-info').html(member.name + '</br>' + member.info)
      $('.member-img').fadeOut(20).fadeIn(2000)
      $('.member-info').fadeOut(20).fadeIn(2000)
      $('.member-mask').fadeOut(20).fadeIn(2000)
    })
  }

  $('.member-mask').hover(function (event) {
    $('.member-info').hide()
    $('.member-mask').hide()
  })

  $('.member-img').mouseout(function (event) {
    $('.member-info').show()
    $('.member-mask').show()
  })
})
</script>

<style lang="postcss">
.main {
  background-color: #202837;
  color: #fff;
}

p {
  line-height: 2;
}

img {
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none;
}
sub {
  vertical-align: sub;
}
/* CSS RESET END */

ul {
  list-style-type: none;
  padding: 0;
}

/* padding 做間距, 父元件 -margin 把子元件 padding 推到 container外 */
.card {
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
}

.card-item {
  /* width: 25%;  或下面方法,用算的 */
  width: calc(100% / 4 - 1.5rem);
  padding-left: 8px;
  padding-right: 8px;
}

/*///////////////////////////////////////////////////////////////////////////////////////*/

.container {
  max-width: 1352px;
  margin: 0 auto;
  padding-left: 8px;
  padding-right: 8px;
}

/* 標題 */
.main-title {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}

.border-left {
  border-left: 10px solid #38bdf8;
  padding-left: 26px;
}

/* 主要段落 */
.main-content {
  font-size: 0.15rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* 聯絡我們細節 */
.contact-us-content {
  width: calc(100% / 2 - 0.1rem);
}

.contact-us-content-right {
  display: flex;
  width: max-content;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem;
  margin: 0 auto;
}

.contact-us-content-right input,
.contact-us-content-right textarea,
.contact-us-content-right select {
  background-color: #111827;
  padding: 0.15rem 0.1rem;
  border-radius: 0.1rem;
}

/* 成員細節 */
.main-member {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
}

.main-member-card {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-member-card-position {
  position: relative;
}

.member-img {
  border-radius: 20px;
  box-shadow: 0px 0px 20px 5px whitesmoke;
  width: 4rem;
  height: 4rem;
}

.member-info {
  position: absolute;
  left: 10%;
  bottom: 0.8rem;
  font-weight: bold;
  font-size: 0.275rem;
}
.member-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 20px;
  opacity: 0.5;
}

/* 測試輪播 */
#slideshow {
  margin: 0 auto;
  /* padding-top: 50px; */
  margin-top: 50px;
  height: 400px;
  width: 50%;
  /* background-color: #6adecd; */
  box-sizing: border-box;
}

.slideshow-title {
  font-family: 'Allerta Stencil';
  font-size: 62px;
  color: #fff;
  margin: 0 auto;
  text-align: center;
  margin-top: 25%;
  letter-spacing: 3px;
  font-weight: 300;
}

.entire-content {
  margin: auto;
  width: 150px;
  perspective: 600px;
  position: relative;
  padding-top: 80px;
}

.content-carrousel {
  width: 100%;
  position: absolute;
  float: right;
  animation: rotar 15s reverse ease-in-out infinite;
  transform-style: preserve-3d;
}

.content-carrousel:hover {
  animation-play-state: paused;
  cursor: pointer;
}

.content-carrousel figure {
  width: 100%;
  height: 120px;
  overflow: hidden;
  position: absolute;
}

.content-carrousel figure:nth-child(1) {
  transform: rotateY(0deg) translateZ(300px);
}
.content-carrousel figure:nth-child(2) {
  transform: rotateY(60deg) translateZ(300px);
}
.content-carrousel figure:nth-child(3) {
  transform: rotateY(120deg) translateZ(300px);
}
.content-carrousel figure:nth-child(4) {
  transform: rotateY(180deg) translateZ(300px);
}
.content-carrousel figure:nth-child(5) {
  transform: rotateY(240deg) translateZ(300px);
}
.content-carrousel figure:nth-child(6) {
  transform: rotateY(300deg) translateZ(300px);
}
.content-carrousel figure:nth-child(7) {
  transform: rotateY(360deg) translateZ(300px);
}

/* 小修 */
.shadow {
  position: absolute;
  box-shadow: 0px 0px 20px 0px dimgray;
  border-radius: 10px;
}

.shadow:hover {
  position: absolute;
  box-shadow: 0px 0px 20px 0px whitesmoke;
  border-radius: 10px;
}

.content-carrousel img {
  image-rendering: auto;
  transition: all 300ms;
  width: 100%;
  height: 100%;
}

.content-carrousel img:hover {
  transform: scale(1.2);
  transition: all 300ms;
}

.content-carrousel img:active {
  transform: scale(1);
  transition: all 300ms;
}

/* 平板 RWD */
@media (max-width: 786px) {
  .card-item {
    width: 50%;
  }
  .member-info {
    bottom: 0.13rem;
    font-size: 0.2rem;
  }
  .main-content {
    flex-direction: column;
    gap: 0.5rem;
  }
  .contact-us-content {
    width: 100%;
  }
  .contact-us-content-right {
    margin: 0;
  }
}
/* 手機 RWD */
@media (max-width: 375px) {
  .card-item {
    width: 100%;
  }
}

@keyframes rotar {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>
