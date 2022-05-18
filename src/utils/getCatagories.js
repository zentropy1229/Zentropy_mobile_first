import axios from 'axios'
/**
 * @param {String} stockId stockid
 * @returns Promise Array
 */
export default function (stockId = '') {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/stock_name/industry', {
        headers: {
          Authorization: ''
        },
        params: {
          stockId: stockId
        }
      })
      .then((res) => {
        resolve(res.data.industry)
      }).catch((err) => {
        reject(new Error(err))
      })
  })
  // get industry catagories from db
}
