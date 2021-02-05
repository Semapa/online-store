<template>
  <div class="card">
    <div class="products-filter">
      <div class="form-control">
        <input type="text" placeholder="Найти товар...">
        <span class="form-control-clear">&times;</span>
      </div>

      <ul class="list">
        <li class="list-item" @click="sortProducts">Все</li>
        <li class="list-item">
          Название категории
        </li>
      </ul>
    </div>
    <div class="products-table">
      <div class="product-card" v-for="product in products" :key="product.id">
        <div class="product-img">
          <img :src=product.img>
        </div>
        <h4 class="product-title">{{product.title}}</h4>
        <div class="text-center">
          <button class="btn">{{product.count}}</button>
          <!--          <div class="product-controls">-->
          <!--            <button class="btn danger">-</button>-->
          <!--            <strong>123</strong>-->
          <!--            <button class="btn primary">+</button>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useShop} from '@/use/shop'
  export default {
    setup(){
      return {...useShop()}
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