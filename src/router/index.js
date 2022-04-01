import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'
import TeamIntroPage from '../views/TeamIntroPage.vue'
import ToolIntroPage from '../views/ToolIntroPage.vue'
import LoginPage from '../views/LoginPage.vue'
import Header from '../components/HeaderUI.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: HomePage,
      Header: Header
    }
  },
  {
    path: '/about',
    name: 'about',
    components: {
      default: AboutPage,
      Header: Header
    }
  },
  {
    path: '/toolintro',
    name: 'toolintro',
    components: {
      default: ToolIntroPage,
      Header: Header
    }
  },
  {
    path: '/contact',
    name: 'contact',
    components: {
      default: ContactPage,
      Header: Header
    }
  },
  {
    path: '/teamintro',
    name: 'teamintro',
    components: {
      default: TeamIntroPage,
      Header: Header
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      default: LoginPage
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
