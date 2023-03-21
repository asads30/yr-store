<template>
  <q-layout class="layout">
    <q-page-container class="page">
      <q-header class="header">
        <router-link to="/main" class="logo">
          <img src="~assets/logo-s.svg" alt="">
        </router-link>
        <div class="sitename">Личный кабинет интернет-магазина</div>
      </q-header>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout'
})
</script>

<style lang="scss" scoped>
  .layout{
    background: #F6F6F9;
  }
  .header{
    background: none;
    padding: 16px 12px 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo{
      margin-bottom: 8px;
    }
    .sitename{
      font-size: 12px;
      line-height: 16px;
      color: $primary;
    }
  }
</style>
