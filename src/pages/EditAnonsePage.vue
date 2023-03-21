<template>
  <q-page class="flex flex-start justify-between column anonse">
    <q-form
      @submit="onSubmit"
      class="anonse-form flex flex-start justify-between column"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Добавление анонса</h3>
        </div>
        <q-input
          outlined
          type="textarea"
          v-model="anonse"
          label="Текст анонса *"
          lazy-rules
          hint="Максимум 255 символов"
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите текст']"
        />
      </div>
      <div class="anonse-footer">
        <router-link to="/main" class="footer-btn1">Назад</router-link>
        <q-btn label="Обновить" type="submit" class="footer-btn2"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useContentStore } from 'stores/content'
import { storeToRefs } from 'pinia'

export default {
  setup () {
    const $q = useQuasar()
    const $router = useRouter()
    const store = useContentStore()
    const { anonse } = storeToRefs(store)
    const { updateAnonse } = store
    return {
      anonse,
      onSubmit () {
        $q.notify({
          type: 'positive',
          message: 'Анонс обновлен',
          position: 'top-right'
        })
        updateAnonse(anonse)
        $router.push('/main')
      }
    }
  }
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
  }
  .q-field{
    padding-bottom: 30px;
  }
</style>
