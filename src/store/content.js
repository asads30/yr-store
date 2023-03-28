import { defineStore } from 'pinia';

export const useContentStore = defineStore('content', {
  state: () => ({
    data: null,
    categories: []
  }),

  getters: {
    getData (state) {
      return state.data
    },
    getCategories (state) {
      return state.categories
    }
  },

  actions: {
    fetchData(data){
      this.data = data
    },
    addData(anonse){
      this.data.name = anonse.name
      this.data.description = anonse.description
    },
    fetchCategories(categories){
      this.categories = categories
    },
  }
})
