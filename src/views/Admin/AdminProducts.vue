<template>
  <div v-if="loading">
    <loader />
  </div>
  <div v-else class="card">
    <div class="card-title">
      <h1 class="card-title">Продукты</h1>
      <button class="btn primary" @click="modal = true">Добавить</button>
    </div>
    <div  v-if="productsPage.length">
    <products-table
        :products="productsPage"
        :categories="categories"
    />
      <app-pagination
          v-model="page"
          :count="products.length"
          :size="PAGE_SIZE"
      />
    </div>
    <h3 v-else>Добавьте новый продукт</h3>



  </div>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать новый продукт" @close="modal = false">
        <modal-products :categories="categories" @created="createProduct"/>
      </app-modal>
    </teleport>

</template>

<script>
import {ref, computed, onMounted, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import AppModal from '@/components/ui/AppModal'
import ModalProducts from '@/components/admin/ModalProducts'
import ProductsTable from '@/components/admin/ProductsTable'
import AppPagination from '@/components/ui/AppPagination'
import Loader from '@/components/TheLoader'
import {loadProducts} from '../../utils/loadProducts'
import chunk from 'lodash.chunk'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router =useRouter()
    const categories = computed(() => store.getters['categories/getCategories'])
    const products = computed(() => store.getters['products/getProducts'])
    const loading = ref(true)
    const modal = ref(false)
    const PAGE_SIZE = 8
    const page = ref(route.query.page ? +route.query.page : 1)
    const _setPage = () => router.replace({query:{page: page.value}})

    onMounted(async () => {
      _setPage()
      await loadProducts()
      loading.value = false
    })

    watch(page, _setPage)

    const productsPage = computed(() => chunk(products.value, PAGE_SIZE)[page.value - 1])
    console.log('page', productsPage)
    function createProduct() {
      modal.value = false
    }
    return {
      modal,
      categories,
      createProduct,
      products,
      productsPage,
      PAGE_SIZE,
      page,
      loading
    }
  },
  components: {AppModal, Loader, ModalProducts, ProductsTable, AppPagination}
}
</script>

<style scoped>

</style>