import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    isLoading: false,
    access: ''
  },
  getters: {
  },
  mutations: {
    setIsLoading (state, status) {
      state.isLoading = status
    },
    setToken (state, { access, refresh }) {
      state.access = access
      localStorage.setItem('refreshToken', refresh)
    },
    removeToken (state) {
      state.access = ''
      localStorage.clear()
      sessionStorage.clear()
    }
  },
  actions: {
    async initialize ({ commit }) {
      if (localStorage.getItem('refreshToken')) {
        const refresh = localStorage.getItem('refreshToken')
        try {
          const res = await axios.post('/api/v1/jwt/refresh/', { refresh: refresh })
          const access = res.data.access
          commit('setToken', { access, refresh })
          axios.defaults.headers.common.Authorization = 'Bearer ' + access
        } catch (err) {
          commit('removeToken')
          axios.defaults.headers.common.Authorization = ''
        }
      } else {
        commit('removeToken')
      }
    }
  },
  modules: {
  }
})
