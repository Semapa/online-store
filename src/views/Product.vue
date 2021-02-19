<template>
  <ProductCard
      v-if="product"
      :product="product"
  />
  <h3 v-else class="text-center text-white">
    Товара не найден.
  </h3>
</template>

<script>
import ProductCard from '@/components/shop/ProductCard'
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {computed} from "vue";
export default {
  setup(){
    const route = useRoute()
    const store = useStore()
    const products = store.getters['products/getProducts']
    console.log('products', products)
    const product = computed(() => products.find((product) => product.id === route.params.id))
    // console.log('product', product.value.title)
    return {
      product
    }
  },
  components:{ProductCard}

}
</script>

<style scoped>

</style>