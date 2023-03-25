import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://90.156.227.182:3000/',
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('init_user')
  }
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
