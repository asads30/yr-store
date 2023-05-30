import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    headers: { 'Cache-Control': 'no-cache' },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter),
    Authorization: localStorage.getItem('init_data')
  }
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
