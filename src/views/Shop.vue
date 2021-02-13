<template>
  <div class="card">
    <ProductsFilter :categories="categories"
                    v-model="filter"
                    @change-category="changeCategory"
                    @change-product="changeProduct"/>
    <ProductsTable :products="products"/>
  </div>
</template>

<script>

import {useShop} from '@/use/shop'
import ProductsFilter from '@/components/shop/ProductsFilter'
import ProductsTable from '@/components/shop/ProductsTable'

  export default {
    components:{ProductsFilter, ProductsTable},
    setup(){
      return {
        ...useShop(),
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