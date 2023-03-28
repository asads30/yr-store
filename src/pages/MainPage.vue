<template>
  <q-page class="flex flex-start column main">
    <div
      style="height: 41px;width: 100%;"
      class="menu"
    >
      <div class="menu__list">
        <div
          class="menu__item"
          v-for="category in categories"
          :key="category?.id"
          v-show="categories"
        >
          <button class="menu__btn">{{ category?.name }}</button>
        </div>
      </div>
    </div>
    <div class="categories">
      <div
        class="category"
        v-for="category in categories"
        :key="category?.id"
        v-show="categories"
      >
        <div class="category__top">
          <div class="category__box">
            <div class="category__title">{{ category?.name }}</div>
            <router-link :to="'/category/' + category?.id">редактировать категорию</router-link>
          </div>
          <div class="category__description">{{ category?.description }}</div>
        </div>
      </div>
      <router-link to="/add-category" class="category__add">
        <div class="category__add-icon">
          <img src="~assets/add.svg" alt="">
        </div>
        <div class="category__add-title">
          <span>Добавить категорию</span>
        </div>
      </router-link>
    </div>
    <div class="footer">
      <router-link to="/add-anons" class="footer__btn" v-if="anonse == null">Написать анонс</router-link>
      <router-link to="/edit-anons" class="footer__btn" v-else>Изменить анонс</router-link>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useContentStore } from 'stores/content'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'MainPage',
  preFetch () {
    const $store = useContentStore()
    const { fetchData, fetchCategories } = $store
    const idStore = localStorage.getItem('id_store');
    try {
      api.get(`shop/admin/shop/${idStore}`).then((response) => {
        fetchData(response.data)
      }).catch((error) => {
        console.log(error)
      });
      try {
        api.get(`shop/admin/category/${idStore}`).then((response) => {
          fetchCategories(response.data.categories)
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  },
  setup() {
    const $store = useStore()
    const { getData, getCategories } = $store
    return {
      anonse: getData.name,
      categories: getCategories
    }
  }
})
</script>
