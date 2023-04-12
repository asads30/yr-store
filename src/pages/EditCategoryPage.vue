<template>
  <q-page class="flex flex-start justify-between column anonse">
    <q-form
      class="anonse-form flex flex-start justify-between column"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Изменение категории</h3>
        </div>
        <q-input
          outlined
          v-model="name"
          label="Название *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите название']"
          hint="Максимум 128 символов"
        />
        <q-input
          outlined
          type="textarea"
          v-model="description"
          label="Описание *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите описание']"
          hint="Максимум 255 символов"
        />
        <div class="delete-product">
          <q-btn color="red" label="Удалить категорию" @click="deleteCategory" class="full-width" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import { api } from 'boot/axios'
  import { id_store } from 'boot/helpers'
  export default {
    name: 'EditCategoryPage',
    data() {
      return {
        name: '',
        description: ''
      }
    },
    methods: {
      async goEditCategory(){
        const category = {
          name: this.name,
          description: this.description
        }
        const id = this.$route.params.id;
        try {
          const response = await api.patch(`shop/admin/category/${id_store}/${id}`, category)
          if(response.status == 200 || response.status === 304){
            this.$router.push('/main');
            this.$q.notify({
              type: 'positive',
              message: 'Категория изменена',
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
        window.Telegram.WebApp.offEvent('mainButtonClicked', this.goEditCategory);
        window.Telegram.WebApp.offEvent('backButtonClicked', this.goBackCategoryEdit);
      },
      goBackCategoryEdit(){
        this.$router.push({ path: '/main' });
        window.Telegram.WebApp.offEvent('mainButtonClicked', this.goEditCategory);
        window.Telegram.WebApp.offEvent('backButtonClicked', this.goBackCategoryEdit);
      },
      async fetchEditCategory(){
        const id = this.$route.params.id;
        try {
          const res = await api.get(`shop/admin/category/${id_store}/${id}`);
          if(res.status == 200 || res.status === 304){
            this.name = res.data.name;
            this.description = res.data.description;
          }
        } catch (error) {
          this.$q.notify({
            type: 'negative',
            message: 'Ошибка сервера',
            position: 'top-right'
          });
        }
      },
      async deleteCategory(){
        const id = this.$route.params.id;
        const deleteCategory = {
          status: 0
        }
        try {
          const res = await api.patch(`shop/admin/category/${id_store}/${id}`, deleteCategory);
          if(res.status == 200 || res.status === 304){
            this.$router.push('/main');
            this.$q.notify({
              type: 'positive',
              message: 'Категория удалена',
              position: 'top-right'
            });
            setTimeout(() => {
              window.location.href = 'https://myyarmarka.ru/#/main'
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
      this.fetchEditCategory();
      const tg = window.Telegram.WebApp;
      tg.MainButton.show();
      tg.MainButton.enable();
      tg.MainButton.setParams({
        color: '#280064',
        text_color: '#fff',
        text: 'СОХРАНИТЬ'
      });
      tg.BackButton.show();
      tg.onEvent('mainButtonClicked', this.goEditCategory);
      tg.onEvent('backButtonClicked', this.goBackCategoryEdit);
    }
  }
</script>

<style lang="scss" scoped>
  .anonse{
    padding: 12px;
    height: 100%;
  }
  .anonse-form{
    height: calc(100vh - 112px);
  }
  .page-title>h3{
    margin: 0 0 25px;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
  }
  .q-field{
    padding-bottom: 30px;
  }
</style>
