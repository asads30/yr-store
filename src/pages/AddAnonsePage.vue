<template>
  <q-page class="anonse">
    <q-form
      class="q-form anonse-form"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Добавление анонса</h3>
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
    data() {
      return {
        name: '',
        description: ''
      }
    },
    methods: {
      async goSave(){
        const anonse = {
          name: this.name,
          description: this.description
        }
        try {
          const response = await api.patch(`shop/admin/shop/${id_store}`, anonse)
          if(response.status == 200 || response.status === 304){
            this.$router.push('/main');
            this.$q.notify({
              type: 'positive',
              message: 'Анонс добавлен',
              position: 'top-right'
            });
          }
        } catch (err) {
          this.$q.notify({
            type: 'negative',
            message: 'Ошибка сервера',
            position: 'top-right'
          });
        }
      },
      connectInfo(){
        this.name = this.storeInfo.name;
        this.description = this.storeInfo.description;
      },
      goBack(){
        this.$router.push({ path: '/main' })
      }
    },
    computed: {
      ...mapState(useContentStore, {
        storeInfo: 'getStoreInfo'
      })
    },
    mounted(){
      const tg = window.Telegram.WebApp;
      tg.MainButton.setParams({
        color: '#280064',
        text_color: '#fff',
        text: 'СОХРАНИТЬ'
      });
      tg.BackButton.show();
      tg.onEvent('mainButtonClicked', this.goSave);
      tg.onEvent('backButtonClicked', this.goBack);
      this.connectInfo();
    }
  }
</script>
