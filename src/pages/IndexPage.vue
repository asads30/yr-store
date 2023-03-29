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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainPage',
  preFetch ({ currentRoute }) {
    const tg = window.Telegram.WebApp
    const id = currentRoute.params.id ? currentRoute.params.id : '28e89f4a2cf3b8e5c61a80b131c2093f78770966b0e825f4553ad92777f44d3d'
    tg.expand()
    tg.enableClosingConfirmation()
    localStorage.setItem('id_store', id)
    localStorage.setItem('init_data', JSON.stringify(tg.initData))
  },
  setup() {
    return{
      backTelegram() {
        window.Telegram.WebApp.close()
      }
    }
  }
})
</script>
