<template>
  <div class="product-controls">
    <AppButton :class="'danger'" @action="reduceAmountProduct(productId)">-</AppButton>
    <strong>{{count}}</strong>
    <AppButton :class="'primary'" @action="addAmountProduct(productId)">+</AppButton>
  </div>
</template>

<script>
import AppButton from '@/components/ui/AppButton'
import {useCart} from '@/use/cart'
export default {
  props:{
    count: {
      type: Number,
      require: true
    },
    productId: {
      type: String,
      require: true
    }
  },
  setup(){

    return {
      ...useCart()
    }
  },
  components: {AppButton}
}
</script>

<style scoped>

</style>