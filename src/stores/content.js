import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { id_store } from 'boot/helpers'

export const useContentStore = defineStore('content', {
  state: () => ({
    data: null,
    categories: [],
    category: null,
    products: [],
    product: null
  }),

  getters: {
    getData (state) {
      return state.data
    },
    getCategories (state) {
      return state.categories
    },
    getProducts(state) {
      return state.products
    },
    getCategory(state){
      return state.category
    },
    getProduct(state){
      return state.product
    }
  },

  actions: {
    async fetchData() {
      try {
        const res = await api.get(`shop/admin/shop/${id_store}`)
        this.data = res.data
      } catch (err) {
        console.error(err)
      }
    },
    async fetchCategories() {
      try {
        const res = await api.get(`shop/admin/category/${id_store}`)
        this.categories = res.data.categories
      } catch (err) {
        console.error(err)
      }
    },
    async fetchProducts() {
      try {
        const res = await api.get(`shop/admin/product/${id_store}`)
        this.products = res.data.products
      } catch (err) {
        console.error(err)
      }
    },
    async addAnonse(anonse) {
      try {
        await api.patch(`shop/admin/shop/${id_store}`, anonse)
      } catch (err) {
        console.error(err)
      }
    },
    async addCategory(category) {
      try {
        await api.post(`shop/admin/category/${id_store}`, category)
      } catch (err) {
        console.error(err)
      }
    },
    fetchCategory(){
      this.category = category
    },
    fetchProduct(){
      this.product = product
    }
  }
})
