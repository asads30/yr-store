import { defineStore } from 'pinia'
import { api } from 'boot/axios'

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
        const res = await api.get(`shop/admin/shop/fefc4f1e4705752a99644bd7769776e5049303a4c35131a512bedeaca59b3cd5`)
        this.data = res.data
      } catch (err) {
        console.error(err)
      }
    },
    async fetchCategories() {
      try {
        const res = await api.get(`shop/admin/category/fefc4f1e4705752a99644bd7769776e5049303a4c35131a512bedeaca59b3cd5`)
        this.categories = res.data.categories
      } catch (err) {
        console.error(err)
      }
    },
    async fetchProducts() {
      try {
        const res = await api.get(`shop/admin/product/fefc4f1e4705752a99644bd7769776e5049303a4c35131a512bedeaca59b3cd5`)
        this.products = res.data.products
      } catch (err) {
        console.error(err)
      }
    },
    async addAnonse(anonse) {
      try {
        await api.patch(`shop/admin/shop/fefc4f1e4705752a99644bd7769776e5049303a4c35131a512bedeaca59b3cd5`, anonse)
      } catch (err) {
        console.error(err)
      }
    },
    async addCategory(category) {
      try {
        await api.post(`shop/admin/category/fefc4f1e4705752a99644bd7769776e5049303a4c35131a512bedeaca59b3cd5`, category)
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