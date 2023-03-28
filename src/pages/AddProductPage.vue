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
          v-model="description"
          label="Описание *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите описание']"
          hint="Максимум 255 символов"
        />
        <div class="upload">
          <q-uploader
            label="Фото"
            auto-upload
            :factory="setImage"
            accept="image/*"
            max-file-size="2097152"
            hide-upload-btn="true"
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
        <q-select outlined v-model="category" :options="categories" label="Категория" />
        <div class="add-custom"></div>
        <div class="add-title">Покупатель получит это после совершения покупки</div>
        <q-input
          outlined
          type="textarea"
          v-model="comment_after_buy"
          label="Сообщение для покупателя"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Пожалуйста, введите сообщение']"
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
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useContentStore } from 'stores/content'
import { api } from 'boot/axios'

export default {
  setup () {
    const $q = useQuasar()
    const $store = useContentStore()
    const $router = useRouter()
    const name = ref(null)
    const description = ref(null)
    const price = ref(null)
    const category = ref(null)
    const comment_after_buy = ref(null)
    const image = ref(null)
    const { getCategories, getData, fetchProducts } = $store
    const initUser = localStorage.getItem('init_user')
    const categories = []
    getCategories.filter((value, index) => {
      const item = {
          label: value.name,
          value: value.id
      }
      categories.push(item)
    })
    return {
      name,
      description,
      price,
      category,
      categories,
      comment_after_buy,
      categories,
      image,
      onSubmit () {
        const idStore = localStorage.getItem('id_store')
        const product = {
          name: name.value,
          description: description.value,
          price: price.value,
          channel_id: getData?.id,
          comment_after_buy: comment_after_buy.value,
          userId: 386567097,
          category_id: category.value.value,
          image: image.value
        }
        console.log(initUser)
        try {
          api.post(`shop/admin/product/${idStore}`, product).then((response) => {
            if(response){
              try {
                api.get(`shop/admin/product/${idStore}`).then((response) => {
                  fetchProducts(response.data)
                }).catch((error) => {
                  console.log(error)
                });
                $q.notify({
                  type: 'positive',
                  message: 'Товар добавлен',
                  position: 'top-right'
                })
                $router.push('/main')
              } catch (error) {
                console.log(error)
              }
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  methods: {
    setImage (files) {
      this.image = files[0]
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
