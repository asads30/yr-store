<template>
  <q-page class="anonse form-product">
    <q-form
      @submit="goEditProduct"
      class="q-form anonse-form"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Изменение товара</h3>
        </div>
        <q-input
          outlined
          v-model="name"
          label="Название"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите название']"
        />
        <q-input
          outlined
          type="textarea"
          v-model="description"
          label="Описание *"
          lazy-rules
          hint="Максимум 255 символов"
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите описание']"
        />
        <q-input
          outlined
          v-model="price"
          label="Цена *"
          lazy-rules
          :rules="[ val => val && val.length > 0 && val > 0 || 'Пожалуйста, введите цену']"
          hint="Минимум 1 рубль"
        />
        <div class="delete-product">
          <q-btn color="red" label="Удалить товар" @click="deleteProduct" class="full-width" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import { api } from 'boot/axios'
  import { id_store } from 'boot/helpers'
  import { mapState } from 'pinia'
  import { useContentStore } from '../stores/content'

  export default {
    name: 'EditProductPage',
    data() {
      return {
        name: '',
        description: '',
        price: ''
      }
    },
    computed: {
      ...mapState(useContentStore, {
        storeInfo: 'storeinfo'
      })
    },
    methods: {
      async goEditProduct(){
        const id = this.$route.params.id;
        const data = {
          name: this.name,
          description: this.description,
          price: this.price*100
        }
        try {
          const response = await api.patch(`shop/admin/product/${id_store}/${id}?name=${data.name}&description=${data.description}&price=${data.price}`, data)
          if(response.status == 200 || response.status === 304){
            this.$router.push('/main');
            this.$q.notify({
              type: 'positive',
              message: 'Товар изменен',
              position: 'top-right'
            });
            setTimeout(() => {
              window.location.href = 'https://yr-store.netlify.app/#/main'
            }, 1000);
          }
        } catch (err) {
          this.$q.notify({
            type: 'negative',
            message: 'Ошибка сервера',
            position: 'top-right'
          });
        }
      },
      goBackEditProduct(){
        this.$router.push({ path: '/main' });
      },
      async fetchEditProduct(){
        const id = this.$route.params.id;
        try {
          const res = await api.get(`shop/admin/product/${id_store}/products/${id}`);
          if(res.status == 200 || res.status === 304){
            this.name = res.data.name;
            this.description = res.data.description;
            this.price = res.data.price/100;
          }
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: 'Ошибка сервера',
            position: 'top-right'
          });
        }
      },
      async deleteProduct(){
        const id = this.$route.params.id;
        const deleteProduct = {
          status: 0
        }
        try {
          const res = await api.patch(`shop/admin/product/${id_store}/${id}`, deleteProduct);
          if(res.status == 200 || res.status === 304){
            this.$router.push('/main');
            this.$q.notify({
              type: 'positive',
              message: 'Товар удален',
              position: 'top-right'
            });
            setTimeout(() => {
              window.location.href = 'https://yr-store.netlify.app/#/main'
            }, 1000);
          }
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: 'Ошибка сервера',
            position: 'top-right'
          });
        }
      }
    },
    mounted(){
      this.fetchEditProduct();
      const tg = window.Telegram.WebApp;
      tg.MainButton.setParams({
        text: 'СОХРАНИТЬ'
      });
      tg.BackButton.show();
      tg.onEvent('mainButtonClicked', this.goEditProduct);
      tg.onEvent('backButtonClicked', this.goBackEditProduct);
    }
  }
</script>
