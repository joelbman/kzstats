import Axios from 'axios'

const globalAPI = Axios.create({
  baseURL: 'https://kztimerglobal.com/api/v2.0/',
})

export { globalAPI }
