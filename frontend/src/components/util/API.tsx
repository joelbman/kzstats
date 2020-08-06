import axios from 'axios'

const devConfig = {
  baseURL: 'https://staging.kztimerglobal.com/api/v2/',
  headers: { 'X-ApiKey': process.env.REACT_APP_API_KEY },
  responseType: 'json',
}
const prodConfig = {
  baseURL: 'https://kztimerglobal.com/api/v2/',
  responseType: 'json',
}

let config = {}
config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

export default axios.create(config)
