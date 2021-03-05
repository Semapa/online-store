<template>
  <div back center>
    <h2 class="text-center text-white">{{product.title}}</h2>
  </div>
  <div class="card-item">
    <img :src=product.img />
    <div class="card-item-descr">
      <p class="text-center text-white">Категория: <strong>{{product.category}}</strong></p>
      <p class="text-center text-white">Цена: <strong>{{product.price}}</strong></p>

      <AppProductControl
          :count="+product.count"
          :productId="product.id"
          class="text-white"
      />
    </div>
  </div>
</template>

<script>
import AppProductControl from '@/components/ui/AppProductControl'

export default {
  props:{
    product:{
      type: Object,
      require: true
    }},
  setup(){
    //console.log('route', route.params.id)
    return{

    }
  },
  components: {AppProductControl}
}
</script>

<style scoped>
.card-item {
  display: flex;
  justify-content: space-around;
}
.card-item-descr {
  flex-basis: 40%;
}
</style>