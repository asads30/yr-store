import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://yr-store.netlify.app/api',
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem('init_data')
  }
})

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
