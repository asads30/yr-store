import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { id_store } from 'boot/helpers'

export const useWebStore = defineStore('web', () => {
    const categories = ref([])

    async function getCategories() {
        await api.get(`shop/admin/category/${id_store}`).then(response => {
            categories = response.categories
        }).catch((error) => {
            console.log(error)
        })
    }

    onMounted(getCategories);

    return {
        categories,
        getCategories
    }
  })
