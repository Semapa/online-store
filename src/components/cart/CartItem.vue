<template>
  <table class="table">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена</th>
    </tr>
    </thead>
    <tbody >
    <tr v-for="(product) in products" :key="product.id" >
      <template v-if="product.count>0">
        <td>{{product.title}}</td>
        <td>
<!--          как альтернативный вариант-->
<!--          <AppButton :class="'primary'" :text="'+'" @action="addAmountProduct(idx)"/>-->
          <app-product-control
              :productId="product.id"
          />
<!--          <AppButton :class="'primary'" @action="addAmountProduct(product.id)">+</AppButton>-->
<!--          {{product.count}} шт.-->
<!--          <AppButton :class="'danger'" @action="reduceAmountProduct(product.id)">-</AppButton>-->
        </td>
        <td>{{ currency(product.price * product.count)}}</td>
      </template>
    </tr>

    </tbody>
  </table>
</template>

<script>
import {currency} from '@/utils/currency'
import {useCart} from '@/use/cart'
import AppProductControl from '@/components/ui/AppProductControl'
export default {
  props: {
    products: {
      type: Object,
      required: true,
    }
  },
  setup(){

    return {
      currency,
      ...useCart()
    }
  },
  components: {AppProductControl}
}

</script>

<style scoped>

</style>