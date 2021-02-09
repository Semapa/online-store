<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="products">
      <span class="form-control-clear">&times;</span>
    </div>

    <ul class="list">
      <li class="list-item" >Все</li>
      <li class="list-item">
        Название категории
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modeValue'],
  setup(_, {emit}) {
    const products = ref()

    watch([products], values => {
      emit('update:modelValue', {
        products: values[0]
      })
    })
    return {
      products
    }
  }
}
</script>