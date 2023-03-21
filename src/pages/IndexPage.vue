<template>
  <q-page class="flex flex-start justify-between column start">
    <div class="start__logo">
      <img src="~assets/logo.svg">
    </div>
    <div class="start__box flex column justify-between">
      <div class="start__top">
        <div class="start__img">
          <img src="~assets/start.png" alt="">
        </div>
        <div class="start__title">Здравствуйте!<br />Здесь вы можете настроить свой интернет-магазин, добавить товары и категории.</div>
      </div>
      <div class="start__bottom flex column">
        <q-btn outline color="primary" label="Вернуться в Телеграм" class="start__back" @click="backTelegram" />
        <q-btn color="primary" label="Продолжить" class="start__next" to="/main" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  methods: {
    backTelegram(){
      console.log('Назад')
    }
  },
})
</script>

<style lang="scss" scoped>
  .start{
    background: radial-gradient(101.94% 101.94% at 50% -1.94%, #330081 0%, #1F004D 100%);
    padding: 0 12px 16px;
    &__logo{
      padding: 16px 0 26px;
      height: 76px;
      text-align: center;
      img{
        height: 34px;
      }
    }
    &__box{
      height: calc(100vh - 92px);
      border-radius: 12px;
      background: #fff;
      padding: 12px 12px 22px;
    }
    &__img{
      margin-bottom: 12px;
      text-align: center;
      img{
        max-width: 100%;
      }
    }
    &__title{
      font-weight: 600;
      font-size: 16px;
      line-height: 125%;
      color: #280064;
      text-align: center;
    }
    &__back{
      height: 47px;
      line-height: 47px;
      padding: 0;
      font-weight: 600;
      font-size: 18px;
      text-transform: none;
      border-radius: 10px;
      margin-bottom: 12px;
    }
    &__next{
      height: 47px;
      line-height: 47px;
      padding: 0;
      font-weight: 600;
      font-size: 18px;
      text-transform: none;
      border-radius: 10px;
    }
  }
</style>
