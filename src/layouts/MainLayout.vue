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