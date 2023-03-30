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
            <button @click="editCat(category?.id)" class="category__edit">редактировать категорию</button>
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

<script setup>
import { onMounted } from "vue"
import { useRouter } from 'vue-router'
import { useContentStore } from 'stores/content'
import { storeToRefs } from "pinia"
import Product from './Product.vue'
const store = useContentStore()
const router = useRouter()
const { getCategories } = storeToRefs(store)
const { addAnonse } = storeToRefs(store)
const { fetchCategories } = store
const { fetchData } = store
const { fetchCategory } = store
const categories = getCategories
const tg = window.Telegram.WebApp
if(addAnonse === false){
  tg.MainButton.show()
  tg.MainButton.enable()
}
tg.MainButton.setParams({
  color: '#280064',
  text_color: '#fff',
  text: 'ДАЛЕЕ'
})
tg.onEvent('mainButtonClicked', goAddAnonse)
tg.BackButton.hide()
onMounted(() => {
  fetchCategories()
  fetchData()
})
function goAddAnonse(){
  router.push('/add-anons')
}
function editCat(id){
  try {
    fetchCategory(id)
  } catch (error) {
    console.log(error)
  }
  router.push('/category/' + id)
}
</script>
