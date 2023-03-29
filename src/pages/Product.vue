<template>
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
</template>

<script>
  import { api } from 'boot/axios'
  export default {
    name: 'Product',
    data() {
      return {
        products: []
      }
    },
    props: {
      id: Number
    },
    mounted() {
      const id_store = localStorage.getItem('id_store')
      api.get(`shop/admin/product/${id_store}/categories/${this.id}`).then((response => {
        this.products = response.data.products
      })).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      background (buffer) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return 'data:image/png;base64,' + window.btoa( binary )
      }
    },
  }
</script>
