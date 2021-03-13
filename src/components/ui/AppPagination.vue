<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button class="btn"
              @click="$emit('update:modelValue', modelValue - 1)"
              :disabled="modelValue === 1"
      >&lt;</button>
    </li>
    <li class="pagination-item" v-for="(p, index) in pages" :key="index">
      <button :class="['btn', {active: p === modelValue}]"
              @click="$emit('update:modelValue', p)"
      >{{p}}</button>
    </li>
    <li class="pagination-item">
      <button class="btn"
              @click="$emit('update:modelValue', modelValue + 1)"
              :disabled="modelValue === pages"
      >&gt;</button>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: ['count', 'size', 'modelValue'],
  setup(props) {
    console.log(props)
    return {
      pages: Math.ceil(props.count / props.size)
    }
  }
}
</script>

<style scoped>
.pagination {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}
.pagination-item > button {
  border: none;
  border-radius: 8px;
  background: #eee;
  transition: all 0.22s;
  color: inherit;
  font-weight: normal;
  padding: 0.5rem 1rem;
}

.pagination-item > button.active {
  background: #3eaf7c;
  color: #fff;
  font-weight: bold;
}

</style>