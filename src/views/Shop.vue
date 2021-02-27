<template>
  <div v-if="loading">
    <loader />
  </div>
  <div v-else class="card">
    <products-filter :categories="categories"
                    v-model="filter"
                    @change-category="changeCategory"
                    @change-product="changeProduct"/>
    <products-table :products="products"/>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useShop} from '@/use/shop'
import Loader from '@/components/TheLoader'
import ProductsFilter from '@/components/shop/ProductsFilter'
import ProductsTable from '@/components/shop/ProductsTable'

  export default {
    components:{ProductsFilter, ProductsTable, Loader},
    setup(){
      const store = useStore()
      const loading = computed(()=> store.getters.getLoader)
      return {
        ...useShop(),
        loading
      }
    }
  }
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>