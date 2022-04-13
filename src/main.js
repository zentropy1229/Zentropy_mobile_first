import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueScrollTo from 'vue-scrollto'
import './assets/tailwind.css'

// eslint-disable-next-line no-unused-vars
const app = createApp(App)
app.use(store).use(router).use(VueScrollTo).mount('#app')
