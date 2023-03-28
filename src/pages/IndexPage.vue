<template>
  <q-page class="start">
    <div class="start__logo">
      <img src="~assets/logo.svg">
    </div>
    <div class="start__box">
      <div class="start__top">
        <div class="start__img">
          <img src="~assets/start.png" alt="">
        </div>
        <div class="start__title">Здравствуйте!<br />Здесь вы можете настроить свой интернет-магазин, добавить товары и категории.</div>
      </div>
      <div class="start__bottom">
        <q-btn outline color="primary" label="Вернуться в Телеграм" class="start__back" @click="backTelegram" />
        <q-btn color="primary" label="Продолжить" class="start__next" to="/main" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { onMounted } from 'vue'
import { useContentStore } from 'stores/content'
import { useRouter } from 'vue-router'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'MainPage',
  preFetch ({ currentRoute }) {
    const tg = window.Telegram.WebApp
    const id_store = currentRoute.params.id
    tg.expand()
    tg.enableClosingConfirmation()
    localStorage.setItem('id_store', id_store)
    localStorage.setItem('init_data', tg.initData)
    localStorage.setItem('init_user', tg.initDataUnsafe)
  },
  setup() {
    const $store = useContentStore()
    const $router = useRouter()
    const { fetchData, fetchCategories, fetchProducts } = $store
    const id_store = $router.params.id
    onMounted(() => {
      try {
        api.get(`shop/admin/shop/${id_store}`).then((response) => {
          fetchData(response.data)
        }).catch((error) => {
          console.log(error)
        });
        api.get(`shop/admin/category/${id_store}`).then((response) => {
          fetchCategories(response.data.categories)
        }).catch((error) => {
          console.log(error)
        })
        api.get(`shop/admin/product/${id_store}`).then((response) => {
          fetchProducts(response.data.products)
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log(error)
      }
    })
    return{
      backTelegram() {
        window.Telegram.WebApp.close()
      }
    }
  }
})
</script>
