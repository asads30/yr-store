import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { id_store } from 'boot/helpers'

export const useContentStore = defineStore('content', {
  state: () => ({
    data: null,
    categories: [],
    category: null,
    products: [],
    product: null,
    addAnonse: false
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
        const resCategories = res.data.categories
        this.categories = resCategories
      } catch (err) {
        console.error(err)
      }
      try {
        this.categories.forEach(function(item) {
          const itemAdd = api.get(`shop/admin/product/${id_store}/categories/${item.id}`)
          this.products.push(itemAdd);
        });
      } catch (err) {
        console.error(err)
      }
    },
    async addAnonse(anonse) {
      try {
        await api.patch(`shop/admin/shop/${id_store}`, anonse).then((response) => {
          if(response.status == 200){
            this.addAnonse = true
            return 'success'
          } else{
            return 'error'
          }
        })
      } catch (err) {
        return err
      }
    },
    async addCategory(category) {
      try {
        await api.post(`shop/admin/category/${id_store}`, category)
      } catch (err) {
        console.error(err)
      }
    },
    async addProduct(product) {
      try {
        await api.post(`shop/admin/product/${id_store}`, product)
      } catch (err) {
        console.error(err)
      }
    },
    async fetchCategory(id) {
      try {
        const res = await api.get(`shop/admin/category/${id_store}/${id}`)
        this.category = res.data
      } catch (err) {
        console.error(err)
      }
    },
    async updateCategory(category) {
      try {
        await api.patch(`shop/admin/category/${id_store}/${category.id}`, category)
        this.category = category
      } catch (err) {
        console.error(err)
      }
    },
    clearCategory(){
      try {
        this.category = null
      } catch (error) {
        console.log(error)
      }
    }
  }
})
