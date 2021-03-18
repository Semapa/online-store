<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="filterValue">
      <span class="form-control-clear" @click="changeProductName">&times;</span>
    </div>

    <ul class="list">
      <li class="list-item"
          @click="changeCategory('')"
      >
        Все
      </li>
      <li class="list-item"
          v-for="(category, idx) in categories"
          :key="idx"
          @click="changeCategory(category.id)"
      >
        {{ category.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
export default {
  emits: ['update:modelValue','change-category','change-product'],
  // props: ['modelValue'],
  props: {
    categories: {
      type: Object,
      required: true,
    },
    modelValue:{}
  },
  setup(_, {emit}) {
    const filterValue = ref()

    watch([filterValue], values => {
      emit('update:modelValue', {
        filterValue: values[0]
      })
    })

    function changeCategory(cat){
      // console.log(cat)
      emit('change-category', cat)
    }
    function changeProductName(){
      filterValue.value = ''
      emit('change-product')
    }
    return {
      filterValue,
      changeCategory,
      changeProductName
    }
  }
}
</script>