<template>
  <div class="card">
    <div class="card-title">
      <h1 class="card-title">Продукты</h1>
      <button class="btn primary" @click="modal = true">Добавить</button>
    </div>
    <products-table
        v-if="products.length"
        :products="products"
        :categories="categories"
    />
    <h3 v-else>Добавьте новый продукт</h3>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать новый продукт" @close="modal = false">
        <modal-products :categories="categories" @created="createProduct"/>
      </app-modal>
    </teleport>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppModal from '@/components/ui/AppModal'
import ModalProducts from '@/components/admin/ModalProducts'
import ProductsTable from '@/components/admin/ProductsTable'
export default {
  setup() {
    const store = useStore()
    const categories = computed(() => store.getters['categories/getCategories'])
    const products = computed(() => store.getters['products/getProducts'])
    const modal = ref(false)

    onMounted(() => {
      store.dispatch('categories/loadCategoriesFromServer')
      store.dispatch('products/loadProductsFromServer')
    })

    function createProduct() {
      modal.value = false
    }
    return {
      modal,
      categories,
      createProduct,
      products
    }
  },
  components: {AppModal, ModalProducts, ProductsTable}
}
</script>

<style scoped>

</style>