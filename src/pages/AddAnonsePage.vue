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
tg.onEvent('BackButtonClicked', goMain)
function onSubmit (){
  const anonse = {
    name: name.value,
    description: description.value
  }
  try {
    store.addAnonse(anonse)
    $q.notify({
      type: 'positive',
      message: 'Анонс добавлен',
      position: 'top-right'
    })
    router.push('/main')
    tg.offEvent('mainButtonClicked', onSubmit)
    tg.offEvent('BackButtonClicked', goMain)
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
  tg.offEvent('BackButtonClicked', goMain)
}
</script>

<style lang="scss" scoped>
  .anonse{
    padding: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .anonse-form{
    height: calc(100vh - 112px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  }
  .q-field{
    padding-bottom: 30px;
  }
</style>
