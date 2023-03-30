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

<script setup>
  import { onMounted } from "vue"
  import { useRouter } from 'vue-router'
  onMounted(() => {
    const router = useRouter()
    const tg = window.Telegram.WebApp
    const id = router.params.id
    tg.expand()
    tg.enableClosingConfirmation()
    localStorage.setItem('id_store', id)
    localStorage.setItem('init_data', tg.initData)
    localStorage.setItem('user_id', tg.initDataUnsafe.user.id)
  })
</script>
