<template>
  <q-page class="anonse">
    <q-form
      class="q-form anonse-form"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Добавление товара</h3>
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
        <q-file outlined v-model="image" label="Outlined" />
        <q-input
          outlined
          v-model="price"
          label="Цена *"
          lazy-rules
          :rules="[ val => val && val.length > 0 && val > 0 || 'Пожалуйста, введите цену']"
          hint="Минимум 1 рубль"
        />
        <q-select outlined v-model="category" :options="categories" label="Категория" />
        <div class="add-custom"></div>
        <div class="add-title">Покупатель получит это после совершения покупки</div>
        <q-input
          outlined
          type="textarea"
          v-model="comment_after_buy"
          label="Сообщение для покупателя"
          lazy-rules
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
  const name = ref('')
  const description = ref('')
  const image = ref(null)
  const price = ref('')
  const category = ref('')
  const comment_after_buy = ref('')
  const { getCategories, getData, addProduct } = store
  const categories = []
  getCategories.filter((value, index) => {
    const item = {
      label: value.name,
      value: value.id
    }
    categories.push(item)
  })
  function onSubmit (){
    const product = {
      name: name.value,
      description: description.value,
      image: image.value,
      price: price.value,
      channel_id: getData?.id,
      comment_after_buy: comment_after_buy.value,
      userId: 386567097,
      category_id: category.value.value
    }
    try {
      addProduct(product)
      $q.notify({
        type: 'positive',
        message: 'Товар добавлен',
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
