<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="filterValue">
      <span class="form-control-clear">&times;</span>
    </div>

    <ul class="list">
      <li class="list-item" >Все</li>
      <li class="list-item"
          v-for="category in categories"
          :key="category.id"
      >
        {{ category.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
export default {
  emits: ['update:modelValue'],
  // props: ['modelValue'],
  props: {
    categories: {
      type: Object,
      required: true,
    },
    modeValue:{}
  },
  setup(_, {emit}) {
    const filterValue = ref()

    watch([filterValue], values => {
      emit('update:modelValue', {
        filterValue: values[0]
      })
    })
    return {
      filterValue
    }
  }
}
</script>