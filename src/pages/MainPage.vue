<template>
  <q-page class="flex flex-start column main">
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
            <router-link :to="'/category/' + category?.id" class="category__edit">редактировать категорию</router-link>
          </div>
          <div class="category__description">{{ category?.description }}</div>
        </div>
        <div class="category__list">
          <div
            class="category__item"
            v-for="product in products"
            :key="product?.id"
            v-show="products"
          >
            <div
              class="category__img"
              :style="'background-image: url(' + background(product.thumbnail_buffer.data) + ');'"
            ></div>
            <div class="category__content">
              <div class="category-title">{{ product?.name }}</div>
              <div class="category__des">{{ product?.description }}</div>
              <div class="category__price">{{ product?.price.toLocaleString() }} ₽</div>
            </div>
          </div>
          <router-link to="/add-product" class="category__item category__not">
            <div class="category__img category__not-img"></div>
            <div class="category__content category__not-content">
              <div class="category__not-icon">
                <img src="~assets/add.svg" alt="">
              </div>
              <div class="category__not-title">
                <span>Добавить товар</span>
              </div>
            </div>
          </router-link>
        </div>
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

<script setup>
import { useQuasar } from 'quasar'
import { onMounted, onBeforeUnmount } from "vue"
import { useRouter } from 'vue-router'
import { useContentStore } from 'stores/content'
import { storeToRefs } from "pinia"
const store = useContentStore()
const router = useRouter()
const $q = useQuasar()
const { getCategories } = storeToRefs(store)
const { getData } = storeToRefs(store)
const { getProducts } = storeToRefs(store)
const { fetchCategories } = store
const { fetchData } = store
const { fetchProducts } = store
const categories = getCategories
const anonse = getData
const products = getProducts
const tg = window.Telegram.WebApp
$q.loading.show()
tg.MainButton.show()
tg.MainButton.enable()
if(anonse.name != ''){
  tg.MainButton.setParams({
    color: '#3478F6',
    text_color: '#fff',
    text: 'Изменить анонс'
  })
  tg.onEvent('mainButtonClicked', goEditAnonse)
} else {
  tg.MainButton.setParams({
    color: '#3478F6',
    text_color: '#fff',
    text: 'Написать анонс'
  })
  tg.onEvent('mainButtonClicked', goAddAnonse)
}
tg.BackButton.hide()
onMounted(() => {
  fetchCategories()
  fetchData()
  fetchProducts()
  $q.loading.hide()
})
function background (buffer) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return 'data:image/png;base64,' + window.btoa( binary )
}
function goEditAnonse(){
  router.push('/edit-anons')
}
function goAddAnonse(){
  router.push('/add-anons')
}
</script>
