<template>
  <div class="products-table">
  <div class="product-card" v-for="(product, idx) in products" :key="product.id"  @click="showCount">
    <div class="product-img">
      <img :src=product.img>
    </div>
    <h4 class="product-title">{{product.title}}</h4>
    <div class="text-center">
      <button v-if="!isProductControls[product.id]" class="btn" :data-id="product.id" :data-count="product.count" >{{product.count}}</button>
        <div v-else class="product-controls">
          <AppButton :class="'danger'" :text="'-'" @action="reduceAmountProduct(idx)"/>
          <strong>{{product.count}}</strong>
          <AppButton :class="'primary'" :text="'+'" @action="addAmountProduct(idx)"/>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useCart} from '@/use/cart'
import AppButton from '@/components/ui/AppButton'
export default {
  props: {
    products: {
      type: Object,
      required: true,
    }
  },
  setup() {
    const store = useStore()
    let isProductControls = ref([])

    function showCount(e) {
      console.log('e', e.target.dataset)
      if(e.target.dataset.count > 0 && isProductControls.value[e.target.dataset.id] === true){
        return isProductControls
      }
      isProductControls.value[e.target.dataset.id] = e.target.dataset.count >0 ? true : false
      store.commit('productsCart/addProductCart', e.target.dataset.id)
      console.log('isProductControls', store)
      console.log('productsCart', store.getters['productsCart/getProductsCart'])
      return isProductControls
    }

    return {
      isProductControls,
      showCount,
      ...useCart()
    }
  },
  components: {AppButton}
}
</script>