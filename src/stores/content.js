import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useContentStore = defineStore('content', {
  state: () => ({
    anonse: '',
    categories: [],
    products: [],
    category: {
      id: 0,
      title: '',
      des: ''
    },
    data: null
  }),

  getters: {
    getAnonse (state) {
      return state.anonse
    },
    getCategories(state){
      return state.categories
    },
    getCategory: (state) => {
      return state.category
    },
    getProducts(state){
      return state.products
    },
    getData(state){
      return state.data
    }
  },

  actions: {
    addAnonse (text) {
      this.anonse = text
    },
    updateAnonse (text) {
      this.anonse = text
    },
    addCategory (category) {
      this.categories.push(category)
    },
    fetchCategory(id) {
      const categoryAdd = this.categories.find(category => category.id == id)
      this.category = categoryAdd
    },
    updateCategory (category) {
      this.category = category
    },
    addProduct (item) {
      this.products.push({ id: item.id, title: item.title, des: item.des, price: item.price, category: item.category_id })
    },
    fetchData(data){
      this.data = data
    },
    fetchCategories(categories){
      this.categories = categories
    }
  }
})
