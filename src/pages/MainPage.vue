<template>
  <q-page class="flex flex-start column main">
    <div class="categories">
      <div
        class="category"
        v-for="category in categories"
        :key="category?.id"
      >
        <div class="category__top">
          <div class="category__box">
            <div class="category__title">{{ category?.name }}</div>
            <router-link :to="'/category/' + category?.id" class="category__edit">редактировать категорию</router-link>
          </div>
          <div class="category__description">{{ category?.description }}</div>
        </div>
        <Product :id="category?.id" />
      </div>
      <router-link to="/add-category" class="category__add">
        <div class="category__add-icon">
          <img src="~assets/add.svg" alt="">
        </div>
        <div class="category__add-title">
          <span>Категория</span>
        </div>
      </router-link>
    </div>
  </q-page>
</template>

<script>
  import { mapState, mapActions } from 'pinia'
  import { useContentStore } from '../stores/content'
  import Product from './Product'
  export default {
    computed: {
      ...mapState(useContentStore, {
        categories: 'getCategories',
        storeInfo: 'getStoreInfo'
      })
    },
    components: {
      Product
    },
    methods: {
      ...mapActions(useContentStore, ['fetchData']),
      ...mapActions(useContentStore, ['fetchCategories']),
      ...mapActions(useContentStore, ['fetchProducts']),
      goAdd(){
        this.$router.push('/add-anons');
      }
    },
    beforeCreate(){
      this.$q.loading.show();
    },
    mounted(){
      this.fetchCategories();
      this.fetchProducts();
      this.fetchData();
      this.$q.loading.hide();
      const tg = window.Telegram.WebApp;
      tg.MainButton.hide();
      tg.BackButton.hide();
    }
  }
</script>
