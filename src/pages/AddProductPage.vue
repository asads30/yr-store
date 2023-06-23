<template>
  <q-page class="anonse form-product">
    <q-form
      class="q-form anonse-form"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Добавление товара</h3>
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
          v-model="description"
          label="Описание *"
          lazy-rules
          hint="Максимум 255 символов"
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите описание']"
        />
        <q-file 
          outlined 
          v-model="image" 
          label="Фотография товара"
          :filter="checkFileSize"
          @rejected="onRejected"
        />
        <q-input
          outlined
          v-model="price"
          label="Цена *"
          lazy-rules
          :rules="[ val => val && val.length > 0 && val > 70 || 'Минимальная цена 70 руб']"
          hint="Минимум 70 рублей"
          v-on:keyup="setNum"
        />
        <q-select outlined v-model="category" :options="categories" label="Категория" />
        <div class="add-custom"></div>
        <div class="add-title">Покупатель получит это после совершения покупки</div>
        <q-input
          outlined
          v-model="comment_after_buy"
          label="Сообщение для покупателя"
          lazy-rules
          hint="Максимум 255 символов"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import { mapState } from 'pinia'
  import { useContentStore } from '../stores/content'
  import { api } from 'boot/axios'
  import { id_store } from 'boot/helpers'

  export default {
    name: 'AddProductPage',
    data() {
      return {
        name: '',
        description: '',
        image: null,
        price: 0,
        category: null,
        comment_after_buy: '',
        categories: []
      }
    },
    computed: {
      ...mapState(useContentStore, {
        allCats: 'getAllCategories',
        storeInfo: 'storeinfo'
      })
    },
    methods: {
      async goAddProduct(){
        var formdata = new FormData();
        let userid = localStorage.getItem('user_id')
        formdata.append("name", this.name);
        formdata.append("image", this.image);
        formdata.append("description", this.description);
        formdata.append("price", this.price);
        formdata.append("comment_after_buy", this.comment_after_buy);
        formdata.append("userId", userid);
        formdata.append("category_id", this.category.value);
        try {
          const response = await api.post(`shop/admin/product/${id_store}`, formdata)
          if(response.status == 200 || response.status === 304){
            this.$router.push('/main');
            this.$q.notify({
              type: 'positive',
              message: 'Товар добавлен',
              position: 'top-right'
            });
            setTimeout(() => {
              window.location.href = 'https://myyarmarka.ru/#/main'
            }, 1000);
          }
        } catch (err) {
          
          if(err.code == 'ERR_BAD_REQUEST'){
            this.$q.notify({
              type: 'negative',
              message: 'Фотография большого размера, попробуйте уменьшить',
              position: 'top-right'
            });
          } else{
            this.$q.notify({
              type: 'negative',
              message: 'Ошибка сервера',
              position: 'top-right'
            });
          }
        }
        window.Telegram.WebApp.offEvent('mainButtonClicked', this.goAddProduct);
        window.Telegram.WebApp.offEvent('backButtonClicked', this.goBackProduct);
      },
      getCategories(){
        this.allCats.filter((value) => {
          const item = {
            label: value.name,
            value: value.id
          }
          this.categories.push(item)
        })
      },
      goBackProduct(){
        this.$router.push({ path: '/main' });
        window.Telegram.WebApp.offEvent('mainButtonClicked', this.goAddProduct);
        window.Telegram.WebApp.offEvent('backButtonClicked', this.goBackProduct);
      },
      setNum(v) {
        const val = v.target.value.replace(/[^0-9]/g, "");
        this.price = val;
      },
      checkFileSize (files) {
        return files.filter(file => file.size < 2097152)
      },
      onRejected (rejectedEntries) {
        this.$q.notify({
          type: 'negative',
          message: 'Максимальный размер фотографии 1 мб',
          position: 'top-right'
        });
        console.log(rejectedEntries)
      }
    },
    mounted(){
      const tg = window.Telegram.WebApp;
      tg.MainButton.show();
      tg.MainButton.enable();
      tg.MainButton.setParams({
        color: '#280064',
        text_color: '#fff',
        text: 'ОПУБЛИКОВАТЬ'
      });
      tg.BackButton.show();
      tg.onEvent('mainButtonClicked', this.goAddProduct);
      tg.onEvent('backButtonClicked', this.goBackProduct);
      this.getCategories();
    }
  }
</script>
