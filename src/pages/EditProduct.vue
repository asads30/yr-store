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
        <q-file outlined v-model="new_image" label="Фотография (новая)" />
        <q-input
          outlined
          v-model="price"
          label="Цена *"
          lazy-rules
          :rules="[ val => val && val.length > 0 && val > 0 || 'Пожалуйста, введите цену']"
          hint="Минимум 1 рубль"
        />
        <div class="add-custom"></div>
        <div class="add-title">Покупатель получит это после совершения покупки</div>
        <q-input
          outlined
          type="textarea"
          v-model="comment_after_buy"
          label="Сообщение для покупателя"
          lazy-rules
          hint="Максимум 255 символов"
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
        new_image: null,
        price: '',
        comment_after_buy: '',
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
        formdata.append("image", this.new_image);
        formdata.append("description", this.description);
        formdata.append("price", this.price*100);
        formdata.append("channel_id", this.storeInfo?.id);
        formdata.append("comment_after_buy", this.comment_after_buy);
        formdata.append("userId", userid);
        formdata.append("category_id", this.category.value);
        try {
          const response = await api.patch(`shop/admin/product/${id_store}/${id}`, formdata)
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
        this.$router.push({ path: '/main' })
      },
      async fetchEditProduct(){
        const id = this.$route.params.id;
        try {
          const res = await api.get(`shop/admin/product/${id_store}/products/${id}`);
          if(res.status == 200 || res.status === 304){
            this.name = res.data.name;
            this.description = res.data.description;
            this.price = res.data.price/100;
            this.category = res.data.category;
            this.comment_after_buy = res.data.comment_after_buy;
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
        try {
          const res = await api.patch(`shop/admin/product/${id_store}/${id}?status=0`);
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
