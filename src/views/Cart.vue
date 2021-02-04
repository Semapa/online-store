<template>
  <div class="card">
    <h1>Корзина</h1>

    <h3 class="text-center">В корзине пока ничего нет</h3>
    <table class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="amount>0">
        <td>Название</td>
        <td>
          <button class="btn primary" @click="addAmountProduct">+</button>
          {{amount}} шт.
          <button class="btn danger" @click="reduceAmountProduct">-</button>
        </td>
        <td>42 000 руб.</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: 14 200 руб.</strong></p>
    <p class="text-right">
      <button class="btn" >Оплатить</button>
    </p>
  </div>
</template>

<script>

// const CART_MODEL = {
//   '2': 3,
//   '5': 1
// }

// key = product id
// value = product count

import {ref, computed} from 'vue'
import {useStore} from 'vuex'
// import product from "@/axios/product";

export default {
  setup() {
    const store = useStore()
    const amount = ref(1)
    const products = ref(store.getters.getProducts)


    // function load() {
    //   store.dispatch('loadProducts')
    // }
    function addAmountProduct() {
        amount.value++
      console.log(products.value)
    }

    function reduceAmountProduct() {
      amount.value--
    }

    return {
      amount,
      addAmountProduct,
      reduceAmountProduct,
      products: computed(products)
      // load
    }
  }
}
</script>

<style scoped>

</style>