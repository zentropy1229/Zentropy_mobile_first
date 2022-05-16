import { createRouter, createWebHistory } from 'vue-router'
import Header from '@/components/HeaderUI.vue'
import Footer from '@/components/FooterUI.vue'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import stockHomePage from '@/views/stockHomePage.vue'
import NewsHomePage from '@/views/NewsHomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import ChartPage from '@/views/ChartPage'
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
    path: '/about',
    name: 'about',
    components: {
      default: AboutPage,
      Header: Header,
      Footer: Footer
    },
    meta: {
      requireAuth: true
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
    path: '/contact',
    name: 'contact',
    components: {
      default: ContactPage,
      Header: Header,
      Footer: Footer
    }
  },
  {
    path: '/stock',
    name: 'stock',
    components: {
      default: stockHomePage,
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
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
