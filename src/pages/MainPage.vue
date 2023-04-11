<template>
  <q-page class="flex flex-start column main">
    <div class="categories">
      <div
        class="category"
        v-for="category in cats"
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
      <q-btn color="blue" label="Загрузить еще" @click="loadMore" class="full-width load-more" v-if="length < categories.length" />
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
    data() {
      return {
        length: 5
      }
    },
    computed: {
      ...mapState(useContentStore, {
        categories: 'getCategories',
        storeInfo: 'getStoreInfo'
      }),
      cats() {
        return this.categories.slice(0, this.length);
      },
    },
    components: {
      Product
    },
    methods: {
      ...mapActions(useContentStore, ['fetchCategories']),
      goAdd(){
        this.$router.push('/add-anons');
      },
      loadMore(){
        if (this.length > this.categories.length) return;
        this.length = this.length + 3;
      },
      goClose(){
        window.Telegram.WebApp.close();
      }
    },
    beforeCreate(){
      this.$q.loading.show();
    },
    mounted(){
      this.fetchCategories();
      this.$q.loading.hide();
      const tg = window.Telegram.WebApp;
      tg.MainButton.setParams({
        color: '#280064',
        text_color: '#fff',
        text: 'ЗАКРЫТЬ'
      });
      tg.BackButton.show();
      tg.onEvent('mainButtonClicked', this.goClose);
      tg.BackButton.hide();
    }
  }
</script>
