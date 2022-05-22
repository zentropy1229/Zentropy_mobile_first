import axios from 'axios'
import Qs from 'qs'
import store from '@/store/index.js'

/**
 * @module
 * @param {String} action 要執行的動做 'remove' or 'add'
 * @param {String} stock stockid
 */
export default function modifyFavStocks (action, stock, event) {
  const send = () => {
    axios.post('/api/user/mfs/', Qs.stringify({ [action]: stock }))
      .then(() => {
        store.dispatch('getUserInfo')
      })
      .catch((err) => {
        alert(err.message)
        window.location.href = '/login'
      })
  }
  store.dispatch('getToken').then(() => {
    if (store.state.userInfo.favoriteStocks.length > 50) {
      if (action === 'add') {
        alert('自選股數量已達上限！')
        return
      }
      send()
    } else {
      send()
    }
  })
}
