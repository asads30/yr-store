<template>
  <q-page class="flex flex-start justify-between column anonse">
    <q-form
      @submit="onSubmit"
      class="anonse-form flex flex-start justify-between column"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Добавление категории</h3>
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
      </div>
    </q-form>
  </q-page>
</template>

<script>
  import { api } from 'boot/axios'
  import { id_store } from 'boot/helpers'
  export default {
    name: 'AddCategoryPage',
    data() {
      return {
        name: '',
        description: ''
      }
    },
    methods: {
      async goAddCategory(){
        const category = {
          name: this.name,
          description: this.description
        }
        try {
          const response = await api.post(`shop/admin/category/${id_store}`, category)
          if(response.status == 200 || response.status === 304){
            this.$router.push('/main');
            this.$q.notify({
              type: 'positive',
              message: 'Категория добавлена',
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
      goBackCategory(){
        this.$route.push('/main')
      }
    },
    mounted(){
      const tg = window.Telegram.WebApp;
      tg.MainButton.setParams({
        color: '#280064',
        text_color: '#fff',
        text: 'ДОБАВИТЬ'
      });
      tg.BackButton.show();
      tg.onEvent('mainButtonClicked', this.goAddCategory);
      tg.onEvent('backButtonClicked', this.goBackCategory);
    },
    unmounted(){
      window.Telegram.WebApp.offEvent('mainButtonClicked', this.goAddCategory)
      window.Telegram.WebApp.offEvent('backButtonClicked', this.goBackCategory)
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
