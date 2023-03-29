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
  tg.MainButton.enable()
  tg.MainButton.setParams({
    color: '#280064',
    text_color: '#fff',
    text: 'ОПУБЛИКОВАТЬ'
  })
  tg.BackButton.show()
  tg.onEvent('mainButtonClicked', onSubmit)
  tg.onEvent('backButtonClicked', goMain)
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
