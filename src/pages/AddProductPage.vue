<template>
  <q-page class="flex flex-start justify-between column anonse">
    <q-form
      @submit="onSubmit"
      class="anonse-form flex flex-start justify-between column"
    >
      <div class="anonse-main">
        <div class="page-title">
          <h3>Добавление товара</h3>
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
          v-model="des"
          label="Описание *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите описание']"
          hint="Максимум 255 символов"
        />
        <div class="upload">
          <q-uploader
            label="Фото"
            auto-upload
            :url="getUrl"
          />
        </div>
        <q-input
          outlined
          v-model="price"
          label="Цена *"
          lazy-rules
          :rules="[ val => val && val.length > 0 && val > 0 || 'Пожалуйста, введите цену']"
          hint="Минимум 1 рубль"
        />
        <q-select outlined v-model="category" :options="options" label="Категория" />
        <div class="add-custom"></div>
        <div class="add-title">Покупатель получит это после совершения покупки</div>
        <q-input
          outlined
          type="textarea"
          v-model="message"
          label="Сообщение для покупателя"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите сообщение']"
          hint="Максимум 255 символов"
        />
        <div class="upload">
          <q-uploader
            label="Прикреплённый файл или изображение"
            auto-upload
            :url="getUrl"
          />
        </div>
      </div>
      <div class="anonse-footer">
        <q-btn label="Опубликовать" type="submit" class="footer-btn2"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    const name = ref(null)
    const des = ref(null)
    const price = ref(null)
    const category = ref(null)
    const message = ref(null)

    return {
      name,
      des,
      price,
      category,
      message,
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      onSubmit () {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Успешно'
        })
      }
    }
  },
  methods: {
    getUrl (files) {
      return `http://localhost:4444/upload?count=${files.length}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .anonse{
    height: 100%;
  }
  .anonse-form{
    height: calc(100vh - 88px);
    overflow: hidden;
  }
  .anonse-main{
    padding: 12px;
    height: calc(100% - 66.28px);
    overflow-y: scroll;
  }
  .q-uploader{
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
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
    padding: 10px 12px;
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
    margin-bottom: 15px;
  }
  .add-custom{
    width: 100%;
    height: 1px;
    background: #D8D8D8;
    margin: 20px 0 15px;
  }
  .add-title{
    font-weight: 600;
    font-size: 16px;
    color: #858585;
    line-height: 20px;
    margin-bottom: 15px;
  }
</style>
