import axios from 'axios'

export default axios.create({
  baseURL: 'http://staging.kztimerglobal.com/api/v2/',
  headers: { 'X-ApiKey': '**************' },
  responseType: 'json',
})
