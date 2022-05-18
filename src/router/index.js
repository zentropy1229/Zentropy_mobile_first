import { createRouter, createWebHistory } from 'vue-router'
import Header from '@/components/HeaderUI.vue'
import Footer from '@/components/FooterUI.vue'
import HomePage from '@/views/HomePage.vue'
import AboutUsPage from '@/views/AboutUsPage.vue'
import StockPage from '@/views/StockPage.vue'
import StockHomePage from '@/views/StockHomePage.vue'
import NewsHomePage from '@/views/NewsHomePage.vue'
import LoginPage from '@/views/MemberPage/LoginPage.vue'
import SignUpPage from '@/views/MemberPage/SignUpPage.vue'
import ChartPage from '@/views/ChartPage'
import NotFound404Page from '@/views/NotFound404Page'
import store from '@/store'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: HomePage,
      Header: Header,
      Footer: Footer
    }
  },
  {
    path: '/news',
    name: 'news',
    components: {
      default: NewsHomePage,
      Header: Header,
      Footer: Footer
    }
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    components: {
      default: AboutUsPage,
      Header: Header,
      Footer: Footer
    }
  },
  {
    path: '/stock',
    name: 'stockHome',
    components: {
      default: StockHomePage,
      Header: Header,
      Footer: Footer
    }
  },
  {
    path: '/stock/:stockid([a-zA-z0-9]+)',
    name: 'stock',
    components: {
      default: StockPage,
      Header: Header,
      Footer: Footer
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: LoginPage
    }
  },
  {
    path: '/signup',
    name: 'signup',
    components: {
      default: SignUpPage,
      Header: Header,
      Footer: Footer
    }
  },
  {
    path: '/chart-tools',
    name: 'charttools',
    components: {
      default: ChartPage
    },
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/404',
    name: '404',
    components: {
      default: NotFound404Page
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    if (to.matched[0].name === 'stockHome') {
      return { top: window.scrollY }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

router.beforeEach(async (to, from) => {
  await store.dispatch('initialize')
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.access) {
      alert('請先登入')
      return { name: 'login' }
    } else {
      axios.defaults.headers.common.Authorization = 'Bearer ' + store.state.access
    }
  }
  if (to.matched[0].name === 'login' && store.state.access) {
    return { name: 'home' }
  }
})

export default router
