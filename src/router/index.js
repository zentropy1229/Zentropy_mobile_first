import { createRouter, createWebHistory } from 'vue-router'
import Header from '@/components/HeaderUI.vue'
import Footer from '@/components/FooterUI.vue'
import HomePage from '@/views/HomePage.vue'
import AboutPage from '@/views/AboutPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import TeamIntroPage from '@/views/TeamIntroPage.vue'
import ToolIntroPage from '@/views/ToolIntroPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import ChartPage from '@/views/ChartPage'

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
    }
  },
  {
    path: '/toolintro',
    name: 'toolintro',
    components: {
      default: ToolIntroPage,
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
    path: '/teamintro',
    name: 'teamintro',
    components: {
      default: TeamIntroPage,
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
    path: '/chart-tools',
    name: 'charttools',
    components: {
      default: ChartPage
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
