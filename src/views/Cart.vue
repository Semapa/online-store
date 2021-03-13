<template>
  <div class="card">
    <h1>Корзина</h1>
    <h3 class="text-center" v-if="!products.length">В корзине пока ничего нет</h3>
      <CartItem :products="products" v-else/>
    <hr>
    <p class="text-right"><strong>Всего: {{currency(getTotal)}}</strong></p>
    <p class="text-right">
      <button class="btn" @click="toPay">Купить</button>
    </p>
  </div>
</template>

<script>
import {useCart} from '@/use/cart'
import CartItem from '@/components/cart/CartItem'
import {currency} from '@/utils/currency'


export default {

  components: {CartItem},
  setup() {

    return {...useCart(),
      currency
    }
  }
}
</script>

<style scoped>

</style>