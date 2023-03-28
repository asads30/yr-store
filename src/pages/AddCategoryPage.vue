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
      <div class="anonse-footer">
        <q-btn label="Опубликовать" type="submit" class="footer-btn2"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
// import { useQuasar } from 'quasar'
// import { useRouter } from 'vue-router'
// import { useContentStore } from 'stores/content'
// import { ref } from 'vue'
// import { api } from 'boot/axios'

// export default {
//   setup () {
//     const $q = useQuasar()
//     const $router = useRouter()
//     const store = useContentStore()

//     const { addCategory } = store
//     const getId = store.getNewIdCategories
//     const name = ref(null)
//     const description = ref(null)
//     const idStore = localStorage.getItem('id_store')
//     return {
//       name,
//       description,
//       onSubmit () {
//         const category = {
//           id: getId,
//           name: name.value,
//           description: description.value
//         }
//         try {
//           api.post(`shop/admin/category/${idStore}`, category).then((response) => {
//             if(response.status == 200){
//               addCategory(category)
//               $q.notify({
//                 type: 'positive',
//                 message: 'Категория добавлена',
//                 position: 'top-right'
//               })
//               $router.push('/main')
//             }
//           }).catch((error) => {
//             $q.notify({
//               type: 'negative',
//               message: error
//             })
//           });
//         } catch (error) {
//           $q.notify({
//             type: 'negative',
//             message: 'Ошибка.'
//           })
//         }
//       }
//     }
//   }
// }

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useContentStore } from 'stores/content'
import { ref } from 'vue'
import { api } from 'boot/axios'

export default {
  setup () {
    const $q = useQuasar()
    const $store = useContentStore()
    const $router = useRouter()
    const name = ref('')
    const description = ref('')
    const idStore = localStorage.getItem('id_store')
    const { fetchData } = $store
    return {
      name,
      description,
      onSubmit () {
        const category = {
          name: name.value,
          description: description.value
        }
        try {
          api.post(`shop/admin/category/${idStore}`, category).then((response) => {
            if(response){
              try {
                api.get(`shop/admin/category/${idStore}`).then((response) => {
                  fetchData(response.data)
                }).catch((error) => {
                  console.log(error)
                });
              } catch (error) {
                console.log(error)
              }
              $q.notify({
                type: 'positive',
                message: 'Категория добавлена',
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
