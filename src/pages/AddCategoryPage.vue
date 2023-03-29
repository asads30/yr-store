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

<script setup>
import { ref } from 'vue'
import { useContentStore } from 'stores/content'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
const store = useContentStore()
const router = useRouter()
const $q = useQuasar()
const name = ref('')
const description = ref('')
const tg = window.Telegram.WebApp
tg.MainButton.show()
tg.BackButton.show()
tg.MainButton.enable()
tg.MainButton.setParams({
  color: '#280064',
  text_color: '#fff',
  text: 'ОПУБЛИКОВАТЬ'
})
tg.onEvent('mainButtonClicked', onSubmit)
tg.onEvent('backButtonClicked', goMain)
function onSubmit (){
  const category = {
    name: name.value,
    description: description.value
  }
  try {
    store.addCategory(category)
    $q.notify({
      type: 'positive',
      message: 'Категория добавлена',
      position: 'top-right'
    })
    router.push('/main')
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error
    })
  }
  tg.offEvent('mainButtonClicked', onSubmit)
  tg.offEvent('backButtonClicked', goMain)
}
function goMain(){
  router.push('/main')
  tg.offEvent('mainButtonClicked', onSubmit)
  tg.offEvent('backButtonClicked', goMain)
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
