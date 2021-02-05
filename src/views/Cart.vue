<template>
  <div class="card">
    <h1>Корзина</h1>
    <h3 class="text-center" v-if="!products.length">В корзине пока ничего нет</h3>
    <!--      <CartItem></CartItem>-->
    <table class="table" v-else>
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
          <button class="btn primary" @click="addAmountProduct(idx)">+</button>
          {{product.count}} шт.
          <button class="btn danger" @click="reduceAmountProduct(idx)">-</button>
        </td>
        <td>{{ currency(product.price)}}</td>
        </template>
      </tr>

      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{currency(getTotal)}}</strong></p>
    <p class="text-right">
      <button class="btn" @click="toPay">Оплатить</button>
    </p>
  </div>
</template>

<script>
import {useCart} from '@/use/cart'

export default {
  setup() {
    return {...useCart()}
  }
}
</script>

<style scoped>

</style>