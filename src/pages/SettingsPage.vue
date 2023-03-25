<template>
  <q-page class="flex flex-start justify-between column settings">
    <h4>Магазин №{{ id }}</h4>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useContentStore } from 'stores/content'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SettingsPage',
  setup() {
    const route = useRoute()
    const store = useContentStore()
    const id = route.params.id

    return {
      id
    }
  }
})
</script>

<style lang="scss" scoped>
  .settings{
    padding: 12px;
    height: 100%;
    h4{
      font-size: 16px;
      margin: 0 0 10px;
      color: #000;
      font-weight: 600;
    }
  }
</style>
