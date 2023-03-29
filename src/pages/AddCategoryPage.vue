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
tg.BackButton.isVisible = true
tg.MainButton.setParams({
  color: '#3478F6',
  text_color: '#fff',
  text: 'Опубликовать'
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
    tg.offEvent('mainButtonClicked', onSubmit)
    tg.offEvent('backButtonClicked', goMain)
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error
    })
  }
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
  .q-uploader{
    width: calc(100% - 8px);
  }
  .page-title>h3{
    margin: 0 0 25px;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
  }
  .anonse-footer{
    display: flex;
    flex-direction: column;
  }
  .footer-btn1{
    height: 44px;
    line-height: 42px;
    border: 1px solid #3478F6;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 8px;
    background: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 18px;
    color: #3478F6;
  }
  .footer-btn2{
    height: 44px;
    line-height: 44px;
    border: 0;
    border-radius: 12px;
    text-align: center;
    background: #3478F6;
    text-decoration: none;
    font-weight: 600;
    font-size: 18px;
    color: #fff;
    text-transform: none;
    padding: 0;
  }
  .q-field{
    padding-bottom: 30px;
  }
</style>
