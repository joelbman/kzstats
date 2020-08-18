import axios from 'axios'

const devCfg = {
  baseURL: 'https://staging.kztimerglobal.com/api/v2/',
  headers: { 'X-ApiKey': process.env.REACT_APP_API_KEY },
  responseType: 'json' as 'json',
}
const prodCfg = {
  baseURL: 'https://kztimerglobal.com/api/v2/',
  responseType: 'json' as 'json',
}
const localCfg = {
  baseURL: '/api/',
  responseType: 'json' as 'json',
}

const globalApiCfg = process.env.NODE_ENV === 'production' ? prodCfg : devCfg

const globalAPI = axios.create(globalApiCfg)
const localAPI = axios.create(localCfg)

export { globalAPI, localAPI }
