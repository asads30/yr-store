<template>
  <q-page class="anonse">
    <q-form
      @submit="onSubmit"
      class="anonse-form"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Изменение категории</h3>
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

<script>
  import { useQuasar } from 'quasar'
  import { useRoute } from 'vue-router'
  import { useContentStore } from 'stores/content'
  import { onMounted, ref } from 'vue'
  import { api } from 'boot/axios'
  export default {
    setup () {
      const $q = useQuasar()
      const $store = useContentStore()
      const name = ref('')
      const description = ref('')
      const { getCategory } = $store
      const $route = useRoute()
      onMounted(() => {
        const id_store = localStorage.getItem('id_store');
        const id = $route.params.id
        const current = api.get(`shop/admin/category/${id_store}/${id}`)
        name.value = current.data?.name
        description.value = current.data?.description
        const tg = window.Telegram.WebApp
        tg.MainButton.show()
        tg.MainButton.enable()
        tg.MainButton.setParams({
          color: '#280064',
          text_color: '#fff',
          text: 'СОХРАНИТЬ'
        })
        tg.BackButton.show()
        tg.onEvent('mainButtonClicked', onSubmit)
        tg.onEvent('backButtonClicked', goMain)
      })
      function onSubmit() {
        const categoryId = $route.params.id
        const category = {
          name: name.value,
          description: description.value,
          id: categoryId
        }
        try {
          const result = $store.updateCategory(category)
          if(result == 'success'){
            $q.notify({
              type: 'positive',
              message: 'Категория изменена',
              position: 'top-right'
            })
            $route.push('/main')
          } else {
            $q.notify({
              type: 'negative',
              message: 'Ошибка.'
            })
            $route.push('/main')
          }

        } catch (error) {
          $q.notify({
            type: 'negative',
            message: 'Ошибка.'
          })
        }
        tg.offEvent('mainButtonClicked', onSubmit)
        tg.offEvent('backButtonClicked', goMain)
      }
      function goMain(){
        $route.push('/main')
        tg.offEvent('mainButtonClicked', onSubmit)
        tg.offEvent('backButtonClicked', goMain)
      }
      return {
        name,
        description,
        category: getCategory
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
  .page-title>h3{
    margin: 0 0 25px;
    font-size: 18px;
    font-weight: 700;
    line-height: 20px;
  }
</style>
