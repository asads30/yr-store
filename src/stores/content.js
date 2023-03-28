import { defineStore } from 'pinia'

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
    getCategory(state){
      return state.category
    },
    getProducts(state) {
      return state.products
    },
    getProduct(state){
      return state.product
    }
  },

  actions: {
    fetchData(data){
      this.data = data
    },
    fetchCategories(categories){
      this.categories = categories
    },
    fetchCategory(){
      this.category = category
    },
    fetchProducts(products){
      this.products = products
    },
    fetchProduct(){
      this.product = product
    }
  }
})
