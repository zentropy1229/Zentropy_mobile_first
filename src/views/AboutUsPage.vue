<template>
  <div class="main span-text flex flex-col">
    <div class="container mt-4">
      <div class="main-title">
        <div>
          <h1 class="border-left subtitle-text-lg">團隊</h1>
        </div>
      </div>
      <div class="main-content">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel sit porro libero, quis explicabo rem nobis
          assumenda ad exercitationem iste? Culpa dignissimos sed optio dolorum, fugit dolor commodi laborum soluta
          numquam in nisi error iusto repellendus? At, ratione debitis nemo delectus repudiandae fugiat! Ipsa officiis
          iste repudiandae tempore ut nostrum asperiores quas nihil voluptates? Quisquam dignissimos, aliquam distinctio
          soluta sunt saepe harum non vel explicabo omnis iusto blanditiis labore accusamus quis architecto porro
          aperiam, excepturi doloribus repudiandae maiores pariatur assumenda dolore! Dicta, praesentium necessitatibus
          molestiae accusamus temporibus, accusantium est maiores dignissimos consectetur magnam, quibusdam itaque qui
          minus voluptatem doloribus facere enim nisi laborum? Assumenda magnam voluptatibus fugit accusamus suscipit
          deserunt natus distinctio architecto commodi facilis, quibusdam ipsum maxime! Error omnis iste corporis dolor,
          eius illo, autem perspiciatis eos, rem facere eum fuga quos quibusdam obcaecati deserunt nulla quisquam? Optio
          ea dolorum voluptates tenetur nobis! Officiis laboriosam cupiditate, voluptatibus neque id commodi amet
          eveniet consequuntur alias quae a beatae obcaecati rerum maxime deserunt, deleniti facilis accusamus
          aspernatur minima molestiae at esse nobis. Excepturi laudantium laboriosam error, architecto fugit temporibus
          ut quae nesciunt obcaecati quos doloremque eos asperiores molestias officiis blanditiis hic deserunt nihil
          accusantium at, consequatur dolorem iste repellendus repellat assumenda?
        </p>
      </div>

      <div class="main-title">
        <div>
          <h1 class="border-left subtitle-text-lg">成員</h1>
        </div>
      </div>
      <div class="main-content">
        <div class="main-member">
          <div class="main-member-card-position">
            <div class="member-mask"></div>
            <p class="member-info border-left">
              李濟 <br />
              前端
            </p>
            <img class="member-img" src="https://picsum.photos/1920/1080/?random=10" />
          </div>
        </div>
        <div id="slideshow">
          <div class="entire-content">
            <div class="content-carrousel">
              <figure class="shadow">
                <img
                  id="p1"
                  src="https://images.pexels.com/photos/21261/pexels-photo.jpg?w=940&h=650&auto=compress&cs=tinysrgb"
                />
              </figure>
              <figure class="shadow">
                <img
                  id="p2"
                  src="https://images.pexels.com/photos/567973/pexels-photo-567973.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                />
              </figure>
              <figure class="shadow">
                <img
                  id="p3"
                  src="https://images.pexels.com/photos/776653/pexels-photo-776653.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                />
              </figure>
              <figure class="shadow">
                <img
                  id="p4"
                  src="https://images.pexels.com/photos/54630/japanese-cherry-trees-flowers-spring-japanese-flowering-cherry-54630.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                />
              </figure>
              <figure class="shadow">
                <img
                  id="p5"
                  src="https://images.pexels.com/photos/758733/pexels-photo-758733.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                />
              </figure>
              <figure class="shadow">
                <img
                  id="p6"
                  src="https://images.pexels.com/photos/131046/pexels-photo-131046.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
                />
              </figure>
              <!-- <figure class="shadow"><img src="https://images.pexels.com/photos/302515/pexels-photo-302515.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"/></figure>
              <figure class="shadow"><img src="https://images.pexels.com/photos/301682/pexels-photo-301682.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"/></figure>
              <figure class="shadow"><img src="https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"/></figure> -->
            </div>
          </div>
        </div>
      </div>

      <div class="main-title mb-1">
        <h1 class="border-left subtitle-text-lg">聯絡我們</h1>
      </div>
      <div class="main-content">
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
            <input type="text" class="w-16" placeholder="主旨" name="_subject" id="" />
            <textarea name="message" class="w-16" placeholder="請輸入問題內容" id="" cols="30" rows="10"></textarea>
            <button type="submit" class="rounded-sm bg-sky-500 px-1 py-0.5 hover:bg-sky-600">送出</button>
            <!-- <div>
              <div>
                <svg style="width: 2rem; height: 2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                  />
                </svg>
                <span>facebook</span>
              </div>
              <div>
                <svg style="width: 2rem; height: 2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1 0 2.1.5 2.6 1.4l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2V234c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.2-3.2-3.2zM448 113.7V399c-.1 44.8-36.8 81.1-81.7 81H81c-44.8-.1-81.1-36.9-81-81.7V113c.1-44.8 36.9-81.1 81.7-81H367c44.8.1 81.1 36.8 81 81.7zm-61.6 122.6c0-73-73.2-132.4-163.1-132.4-89.9 0-163.1 59.4-163.1 132.4 0 65.4 58 120.2 136.4 130.6 19.1 4.1 16.9 11.1 12.6 36.8-.7 4.1-3.3 16.1 14.1 8.8 17.4-7.3 93.9-55.3 128.2-94.7 23.6-26 34.9-52.3 34.9-81.5z"
                  />
                </svg>
                <span>line</span>
              </div>
              <div>
                <svg style="width: 2rem; height: 2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
                  />
                </svg>
                <span>twitter</span>
              </div>
              <div>
                <svg style="width: 2rem; height: 2rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"
                  />
                </svg>
                <span>instagram</span>
              </div>
            </div> -->
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
    id: 1,
    name: '李濟',
    info: '前端'
  },
  {
    id: 2,
    name: '陳愷',
    info: '後端'
  },
  {
    id: 3,
    name: '陳俊佑',
    info: '機器學習'
  },
  {
    id: 4,
    name: '鮑政宇',
    info: '機器學習'
  },
  {
    id: 5,
    name: '張聖杰',
    info: ''
  },
  {
    id: 6,
    name: '蕭宇倫',
    info: ''
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
      $('.member-img').slideToggle(1000).slideToggle(2000)
      $('.member-info').slideToggle(1000).slideToggle(2000)
      $('.member-mask').slideToggle(1000).slideToggle(2000)
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
  margin-bottom: 0.25rem;
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
  margin-bottom: 0.25rem;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 50px;
}
/* .main-member-card {
        width: 75%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      } */
.main-member-card {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-member-card-position {
  position: relative;
  width: 75%;
}

/* 圓角 */
/* .member-img {
        width: calc(100% / 1.92);
        border-radius: 20px;
        position: absolute;
        box-shadow: 0px 0px 5px 5px gray;
      } */
.member-img {
  border-radius: 20px;
  box-shadow: 0px 0px 20px 5px whitesmoke;
  width: 100%;
  height: 100%;
}

/* .member-img:hover {
        border-radius: 20px;
        box-shadow: 0px 0px 20px 5px whitesmoke;
        transform: scale(1.1);
        transition: all 600ms;
      } */
/* .member-info {
        width: 100%;
        height: 17rem;
        border-radius: 20px;
        text-align: end;
      } */
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
  width: 100%;
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

/* .sub-heading {
        padding-top: 50px;
        font-size: 18px;
      } .sub-heading-two {
        font-size: 15px;
      } .sub-heading-three {
        font-size: 13px;
      } .sub-heading-four {
        font-size: 11px;
      } .sub-heading-five {
        font-size: 9px;
      } .sub-heading-six {
        font-size: 7px;
      } .sub-heading-seven {
        font-size: 5px;
      } .sub-heading-eight {
        font-size: 3px;
      } .sub-heading-nine {
        font-size: 1px;
      } */

.entire-content {
  margin: auto;
  width: 190px;
  perspective: 1000px;
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
  /* border: 1px solid #3b444b; */
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
/* } .content-carrousel figure:nth-child(8) {
        transform: rotateY(280deg) translateZ(300px);
      } .content-carrousel figure:nth-child(9) {
        transform: rotateY(320deg) translateZ(300px);
      } .content-carrousel figure:nth-child(10) {
        transform: rotateY(360deg) translateZ(300px);
      } */

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
