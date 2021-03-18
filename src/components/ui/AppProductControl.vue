<template>
  <div class="product-controls">
    <app-button :class="'danger'" @action="reduceAmountProduct(productId)">-</app-button>
    <strong>{{countProductCart}}</strong>
    <app-button :disabled="!isAvailable" :class="'primary'" @action="addAmountProduct(productId)">+</app-button>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import AppButton from '@/components/ui/AppButton'
import {useCart} from '@/use/cart'
export default {
  props:{
    productId: {
      type: String,
      require: true
    },
  },
  setup(props){
    const store = useStore()
    const product = computed(() => store.getters['products/getProducts']
                        .filter((item) => item.id === props.productId))

    const cart = computed(() => store.getters['productsCart/getProductsCart']
                        .filter((product) => product.id === props.productId))
                        
    function getCount() {
      if(cart.value[0])
        return cart.value[0].count < product.value[0].count ? true : false
      else return true
    }
    function getCountProductCart(){
      if(cart.value[0])
        return cart.value[0].count
      else return 0  
    }

    return {
      ...useCart(),
      isAvailable: computed(getCount),
      countProductCart: computed(getCountProductCart),
    }
  },
  components: {AppButton}
}
</script>

<style scoped>

</style>