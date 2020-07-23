import axios from 'axios'

export default axios.create({
  baseURL: 'http://staging.kztimerglobal.com/api/v2/',
  headers: { 'X-ApiKey': 'ec2bfcd8-2340-4739-ae5f-b48f9cf25151' },
  responseType: 'json',
})
