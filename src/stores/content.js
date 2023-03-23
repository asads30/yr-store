import { defineStore } from 'pinia';

export const useContentStore = defineStore('content', {
  state: () => ({
    anonse: '',
    categories: [
      {
        id: 1,
        title: 'Кроссовки',
        des: 'Описание категории, самые лучшие кроссовки, в описание вмещается до 256 символов'
      },
      {
        id: 2,
        title: 'Толстовки',
        des: 'Описание категории, самые лучшие кроссовки, в описание вмещается до 256 символов'
      }
    ],
    category: {
      id: 0,
      title: '',
      des: ''
    },
    products: [
      {
        id: 1,
        title: 'Nike Air Force I',
        des: 'Культовые кроссовки известного бренда',
        price: 12999,
        category: 1
      },
      {
        id: 2,
        title: 'Adidas Superstar',
        des: 'Культовые кроссовки известного бренда',
        price: 7999,
        category: 1
      },
      {
        id: 3,
        title: 'Nike Air Max',
        des: 'Культовые кроссовки известного бренда',
        price: 6500,
        category: 1
      }
    ]
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
    }
  }
})
