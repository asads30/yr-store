<template>
  <q-page class="start">
    <div class="start__logo">
      <img src="~assets/logo.svg">
    </div>
    <div class="start__box">
      <div class="start__top">
        <div class="start__img">
          <img src="~assets/start.png" alt="">
        </div>
        <div class="start__title">Здравствуйте!<br />Здесь вы можете настроить свой интернет-магазин, добавить товары и категории.</div>
      </div>
      <div class="start__bottom">
        <q-btn outline color="primary" label="Вернуться в Телеграм" class="start__back" @click="backTelegram" />
        <q-btn color="primary" label="Продолжить" class="start__next" to="/main" />
      </div>
    </div>
  </q-page>
</template>

<script>
  import { mapActions } from 'pinia'

  export default{
    name: 'IndexPage',
    methods: {
      ...mapActions(useContentStore, ['fetchData']),
    },
    mounted(){
      // const id = this.$route.params.id
      // const tg = window.Telegram.WebApp
      // tg.expand()
      // tg.enableClosingConfirmation()
      // localStorage.setItem('user_id', tg.initDataUnsafe.user.id)
      localStorage.setItem('id_store', 'fefc4f1e4705752a99644bd7769776e5049303a4c35131a512bedeaca59b3cd5')
      localStorage.setItem('init_data', 'query_id=AAG5iwoXAAAAALmLCheEvkf-&user=%7B%22id%22%3A386567097%2C%22first_name%22%3A%22Asadbek%22%2C%22last_name%22%3A%22Ibragimov%22%2C%22username%22%3A%22wpbrouz%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D&auth_date=1680790119&hash=89f3a9372e59626f8d0c57fa946b8433eed41f24a5726d0596feda281b97f910')
    }
  }
</script>
