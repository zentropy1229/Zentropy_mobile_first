import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage'
import ChartPage from '@/views/ChartPage'
import StockPage from '@/views/StockPage'
import Header from '@/components/HeaderUI'
import Footer from '@/components/FooterUI'
import AboutUsPage from '@/views/AboutUsPage'
import NewsHomePage from '@/views/NewsHomePage'
import StockHomePage from '@/views/StockHomePage'
import MemberInfoPage from '@/views/MemberPage/MemberInfoPage'
import LoginPage from '@/views/MemberPage/LoginPage'
import NotFound404Page from '@/views/NotFound404Page'
import SignUpPage from '@/views/MemberPage/SignUpPage'
import store from '@/store'
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
    path: '/memberinfo',
    name: 'memberInfo',
    components: {
      default: MemberInfoPage,
      Header: Header,
      Footer: Footer
    },
    meta: {
      requireAuth: true
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

router.beforeEach((to, from) => {
  return store.dispatch('initialize').then((res) => {
    if (to.matched[0].name === 'login' && store.state.access) {
      return { name: 'memberInfo' }
    }
  }).catch((err) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
      alert(err.message)
      return { name: 'login' }
    }
  })
})

export default router
