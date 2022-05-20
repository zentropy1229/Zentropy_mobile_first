import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
    access: '',
    userInfo: {}
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
      axios.defaults.headers.common.Authorization = ''
    },
    /**
     * @param {Object} state state in vuex
     * @param {Object} favStocks my fav stock list
     */
    setUserInfo (state, { userInfo }) {
      state.userInfo = userInfo
    }
  },
  actions: {
    initialize ({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('refreshToken')) {
          const refresh = localStorage.getItem('refreshToken')
          axios.post('/api/token/refresh/', { refresh: refresh })
            .then(res => {
              const access = res.data.access
              commit('setToken', { access, refresh })
              axios.defaults.headers.common.Authorization = 'Bearer ' + access
              resolve()
            }).then(() => {
              dispatch('getUserInfo')
            }).catch(() => {
              commit('removeToken')
              reject(new Error('尚未登入，請重新登入'))
            })
        } else {
          commit('removeToken')
          reject(new Error('尚未登入，請重新登入'))
        }
      })
    },
    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/user').then((res) => {
          const userInfo = res.data[0]
          commit('setUserInfo', { userInfo })
          resolve()
        }).catch(err => {
          reject(new Error(err.message))
        })
      })
    },
    logOut ({ commit }) {
      commit('removeToken')
    }
  },
  modules: {
  }
})
