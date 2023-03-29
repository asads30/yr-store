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
  import { useRouter } from 'vue-router'
  import { useContentStore } from 'stores/content'
  import { onMounted, ref } from 'vue'
  export default {
    setup () {
      const $q = useQuasar()
      const $store = useContentStore()
      const name = ref('')
      const description = ref('')
      const { getCategory } = $store
      const $router = useRouter()
      onMounted(() => {
        name.value = getCategory?.name
        description.value = getCategory?.description
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
        const category = {
          name: name.value,
          description: description.value,
          id: getCategory.id
        }
        try {
          $store.updateCategory(category)
          $q.notify({
            type: 'positive',
            message: 'Категория изменена',
            position: 'top-right'
          })
          $router.push('/main')
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
        $router.push('/main')
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
