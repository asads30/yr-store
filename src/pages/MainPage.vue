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
        >
          <button class="menu__btn">{{ category?.title }}</button>
        </div>
      </div>
    </div>
    <div class="categories">
      <div
        class="category"
        v-for="category in categories"
        :key="category?.id"
      >
        <div class="category__top">
          <div class="category__box">
            <div class="category__title">{{ category?.title }}</div>
            <button @click="editCat(category?.id)" class="category__edit">редактировать категорию</button>
          </div>
          <div class="category__description">{{ category?.des }}</div>
        </div>
        <div class="category__list">
          <div
            class="category__item"
            v-for="product in getProducts(category)"
            :key="product?.id"
          >
            <div
              class="category__img"
              :style="'background-image: url(' + background(product?.id) + ');'"
            ></div>
            <div class="category__content">
              <div class="category-title">{{ product?.title }}</div>
              <div class="category__des">{{ product?.des }}</div>
              <div class="category__price">{{ product?.price.toLocaleString() }} ₽</div>
              <router-link
                :to="'product/' + product?.id"
                class="category__btn"
              >Редактировать</router-link>
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
          <span>Добавить категорию</span>
        </div>
      </router-link>
    </div>
    <div class="footer">
      <router-link to="/add-anons" class="footer__btn" v-if="anonse == ''">Написать анонс</router-link>
      <router-link to="/edit-anons" class="footer__btn" v-else>Изменить анонс</router-link>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useContentStore } from 'stores/content'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainPage',
  setup() {
    const store = useContentStore()
    const anonse = store.getAnonse
    const categories = store.getCategories
    const products = store.getProducts
    const $router = useRouter()
    const { fetchCategory } = store
    return {
      anonse,
      categories,
      products,
      thumbStyle: {
        right: '2px',
        borderRadius: '3.5px',
        backgroundColor: '#3478F6',
        width: '2px',
        opacity: 0.3
      },
      barStyle: {
        right: '1px',
        borderRadius: '4.5px',
        backgroundColor: '#3478F6',
        width: '4px',
        opacity: 0.1
      },
      editCat(id){
        try {
          fetchCategory(id)
        } catch (error) {
          console.log(error)
        }
        $router.push('/category/' + id)
      }
    };
  },
  methods: {
    background (id) {
      return require('../assets/item-' + id + '.jpg')
    },
    getProducts(category) {
      var products = this.products
      return products.filter(product => product.category == category?.id)
    },
    editCat(){

    }
  }
})
</script>

<style lang="scss" scoped>
  .menu{
    margin: 0 12px;
    overflow: hidden;
    max-width: calc(100vw - 24px);
    padding: 0 0 10px;
    &__list{
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      gap: 8px;
      padding-bottom: 3px;
    }
    &__btn{
      height: 27px;
      line-height: 27px;
      border-radius: 12px;
      background: #fff;
      border: 0;
      font-weight: 600;
      font-size: 14px;
      color: #000;
      padding: 0 8px;
    }
  }
  .categories{
    padding: 0 12px 10px;
    height: calc(100vh - 205px);
    overflow-x: hidden;
    overflow-y: scroll;
    .category{
      &__add{
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FFFFFF;
        border: 2px solid #EFEFF3;
        border-radius: 12px;
        width: 100%;
        padding: 8px 0;
        text-decoration: none;
        &-icon{
          margin-right: 10px;
          height: 40px;
        }
        &-title{
          width: 140px;
          font-size: 18px;
          line-height: 22px;
          color: #DCDCDD;
          text-align: center;
          font-weight: 500;
        }
      }
      &:not(:last-child){
        margin-bottom: 15px;
      }
      &__box{
        display: flex;
        align-items: center;
        margin-bottom: 4px;
      }
      &__title{
        font-weight: 600;
        font-size: 18px;
        line-height: 25px;
        color: #000;
        margin-right: 8px;
      }
      &__edit{
        font-size: 11px;
        line-height: 15px;
        color: #3478F6;
        background: none;
        border: none;
        padding: 0;
      }
      &__description{
        font-size: 11px;
        line-height: 150%;
        color: #8E8E92;
        margin-bottom: 17px;
      }
      &__list{
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }
      &__item{
        width: calc(50% - 8px);
      }
      &__img{
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        width: 100%;
        background-size: cover;
        height: 110px;
      }
      &__content{
        background: #fff;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
        padding: 8px;
      }
      &-title{
        font-weight: 600;
        line-height: 16px;
        font-size: 15px;
        color: #000;
        margin-bottom: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      &__des{
        font-size: 11px;
        color: #8E8E92;
        margin-bottom: 5px;
        line-height: 13px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &__price{
        font-size: 14px;
        font-weight: 600;
        color: #000;
        margin-bottom: 5px;
      }
      &__btn{
        height: 25px;
        line-height: 23px;
        padding: 0 10px;
        text-align: center;
        display: block;
        width: 100%;
        color: #3478F6;
        border: 1px solid #3478F6;
        text-decoration: none;
        border-radius: 20px;
        font-weight: 700;
        font-size: 11px;
        text-transform: uppercase;
      }
      &__not{
        text-decoration: none;
        &-img{
          background: url(../assets/product.svg) 100% no-repeat;
          background-size: cover;
        }
        &-content{
          padding: 15px 0;
          height: 119px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        &-title{
          font-size: 18px;
          line-height: 125%;
          color: #DCDCDD;
          width: 134px;
        }
      }
    }
  }
  .footer{
    padding: 16px 12px;
    &__btn{
      background: #3478F6;
      border-radius: 12px;
      height: 44px;
      width: 100%;
      display: block;
      line-height: 44px;
      color: #fff;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      font-size: 18px;
    }
  }
</style>
