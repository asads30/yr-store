<template>
  <q-page class="anonse">
    <q-form
      @submit="onSubmit"
      class="anonse-form"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Изменение анонса</h3>
        </div>
        <q-input
          outlined
          v-model="name"
          label="Название"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите название']"
        />
        <p>{{ anonse.name }}</p>
        <q-input
          outlined
          type="textarea"
          v-model="description"
          label="Описание *"
          lazy-rules
          hint="Максимум 255 символов"
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите описание']"
        />
        <p>{{ anonse.description }}</p>
      </div>
      <div class="anonse-footer">
        <router-link to="/main" class="footer-btn1">Назад</router-link>
        <q-btn label="Обновить" type="submit" class="footer-btn2"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useContentStore } from 'stores/content'
import { ref } from 'vue'
import { api } from 'boot/axios'
export default {
  setup () {
    const $q = useQuasar()
    const $store = useContentStore()
    const name = ref('')
    const description = ref('')
    const { getData } = $store
    const idStore = localStorage.getItem('id_store')
    return {
      name,
      description,
      anonse: getData,
      onSubmit () {
        const anonse = {
          name: name.value,
          description: description.value
        }
        try {
          api.patch(`shop/admin/shop/${idStore}`, anonse).then((response) => {
            if(response){
              try {
                addData(anonse)
              } catch (error) {
                console.log(error)
              }
              try {
                api.get(`shop/admin/shop/${id}`).then((response) => {
                  fetchData(response.data)
                }).catch((error) => {
                  console.log(error)
                });
              } catch (error) {
                console.log(error)
              }
              $q.notify({
                type: 'positive',
                message: 'Анонс изменен',
                position: 'top-right'
              })
              $router.push('/main')
            }
          })
        } catch (error) {
          $q.notify({
            type: 'negative',
            message: 'Ошибка.'
          })
        }
      }
    }
  }
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
