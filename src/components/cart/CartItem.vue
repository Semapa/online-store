<template>
  <table class="table">
    <thead>
    <tr>
      <th>Наименование</th>
      <th>Количество</th>
      <th>Цена (шт)</th>
    </tr>
    </thead>
    <tbody >
    <tr v-for="(product, idx) in products" :key="product.id" >
      <template v-if="product.count>0">
        <td>{{product.title}}</td>
        <td>
          <AppButton :class="'primary'" :text="'+'" @action="addAmountProduct(idx)"/>
          {{product.count}} шт.
          <AppButton :class="'danger'" :text="'-'" @action="reduceAmountProduct(idx)"/>
        </td>
        <td>{{ currency(product.price)}}</td>
      </template>
    </tr>

    </tbody>
  </table>
</template>

<script>
import {currency} from '@/utils/currency'
import {useCart} from '@/use/cart'
import AppButton from '@/components/ui/AppButton'

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
  components: {AppButton}
}

</script>

<style scoped>

</style>