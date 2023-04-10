<template>
  <q-page class="anonse form-product">
    <q-form
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
        var formdata = new FormData();
        let userid = localStorage.getItem('user_id')
        const id = this.$route.params.id;
        formdata.append("name", this.name);
        formdata.append("description", this.description);
        formdata.append("price", this.price*100);
        formdata.append("channel_id", this.storeInfo?.id);
        formdata.append("userId", userid);
        try {
          const response = await api.patch(`shop/admin/product/${id_store}/${id}?name=${this.name}&?description=${this.description}&?price=${this.price}`, formdata)
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
        window.Telegram.WebApp.offEvent('mainButtonClicked', this.goEditProduct);
        window.Telegram.WebApp.offEvent('backButtonClicked', this.goBackEditProduct);
      },
      goBackEditProduct(){
        this.$router.push({ path: '/main' });
        window.Telegram.WebApp.offEvent('mainButtonClicked', this.goEditProduct);
        window.Telegram.WebApp.offEvent('backButtonClicked', this.goBackEditProduct);
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
        window.Telegram.WebApp.offEvent('mainButtonClicked', this.goEditProduct);
        window.Telegram.WebApp.offEvent('backButtonClicked', this.goBackEditProduct);
      }
    },
    mounted(){
      this.fetchEditProduct();
      const tg = window.Telegram.WebApp;
      tg.MainButton.show();
      tg.MainButton.enable();
      tg.MainButton.setParams({
        color: '#280064',
        text_color: '#fff',
        text: 'СОХРАНИТЬ'
      });
      tg.BackButton.show();
      tg.onEvent('mainButtonClicked', this.goEditProduct);
      tg.onEvent('backButtonClicked', this.goBackEditProduct);
    }
  }
</script>
