import { defineStore } from 'pinia';

export const useContentStore = defineStore('content', {
  state: () => ({
    // anonse: '',
    // categories: [
    //   {
    //     id: 1,
    //     title: 'Кроссовки',
    //     des: 'Описание категории, самые лучшие кроссовки, в описание вмещается до 256 символов'
    //   },
    //   {
    //     id: 2,
    //     title: 'Толстовки',
    //     des: 'Описание категории, самые лучшие кроссовки, в описание вмещается до 256 символов'
    //   }
    // ],
    // category: null,
    // products: [
    //   {
    //     id: 1,
    //     title: 'Nike Air Force I',
    //     des: 'Культовые кроссовки известного бренда',
    //     price: 12999,
    //     category: 1
    //   },
    //   {
    //     id: 2,
    //     title: 'Adidas Superstar',
    //     des: 'Культовые кроссовки известного бренда',
    //     price: 7999,
    //     category: 1
    //   },
    //   {
    //     id: 3,
    //     title: 'Nike Air Max',
    //     des: 'Культовые кроссовки известного бренда',
    //     price: 6500,
    //     category: 1
    //   }
    // ],
    // store: [],
    data: null,
    categories: []
  }),

  getters: {
    // getAnonse (state) {
    //   return state.anonse
    // },
    // getCategories(state){
    //   return state.categories
    // },
    // getCategory: (state) => {
    //   return (catId) => state.categories.filter((category) => category.id === catId)
    // },
    // getProducts(state){
    //   return state.products
    // },
    // getStore(state){
    //   return state.store
    // }
    getData (state) {
      return state.data
    },
    getCategories (state) {
      return state.categories
    }
  },

  actions: {
    // addAnonse (text) {
    //   this.anonse = text
    // },
    // updateAnonse (text) {
    //   this.anonse = text
    // },
    // addCategory (category) {
    //   this.categories.push(category)
    // },
    // updateCategory (category) {
    //   this.categories.push(category)
    // },
    // addProduct (item) {
    //   this.products.push({ id: item.id, title: item.title, des: item.des, price: item.price, category: item.category_id })
    // },
    // fetchCategory(id) {
    //   const categoryAdd = this.categories.find(category => category.id == id)
    //   this.state.category = categoryAdd
    // },
    // fetchStore(data){
    //   this.store = data
    // }
    fetchData(data){
      this.data = data
    },
    fetchCategories(categories){
      this.categories = categories
    }
  }
})
