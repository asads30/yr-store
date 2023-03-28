import { defineStore } from 'pinia'

export const useContentStore = defineStore('content', {
  state: () => ({
    data: null,
    categories: [],
    anonse: '',
    products: [],
    category: {
      id: 0,
      name: '',
      description: ''
    }
  }),

  getters: {
    getData(state){
      return state.data
    },
    getCategories(state){
      return state.categories
    },
    getAnonse (state) {
      return state.anonse
    },
    getCategory: (state) => {
      return state.category
    },
    getProducts(state){
      return state.products
    }
  },

  actions: {
    fetchData(data){
      this.data = data
    },
    fetchCategories(categories){
      this.categories = categories
    },
    addCategory(category){
      this.categories.push(category)
    },
    fetchCategory(id){
      const categoryAdd = this.categories.find(category => category.id == id)
      this.category = categoryAdd
    },
    updateCategory(category){
      this.category = category
    },
    addAnonse(text){
      this.anonse = text
    },
    updateAnonse(text){
      this.anonse = text
    },
    addProduct(item){
      this.products.push({ id: item.id, name: item.name, description: item.description, price: item.price, category: item.category_id })
    }
  }
})
