import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueScrollTo from 'vue-scrollto'
import './assets/tailwind.css'

// eslint-disable-next-line no-unused-vars
// axios.defaults.baseURL = 'https://www.zentropy.ml:8000'
axios.defaults.baseURL = 'http://127.0.0.1:8001'
// axios.defaults.withCredentials = true
const app = createApp(App)
app.use(store).use(router).use(VueScrollTo).mount('#app')
