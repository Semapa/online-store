<template>
  <div class="card">

    <table class="table">
      <thead>
        <tr>
          <th>
            <div class="card-title">
              <h1 class="card-title">Категории</h1>
              <button class="btn primary" @click="modal = true">Добавить</button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
      <template  v-for="category in categories" :key="category.id">
        <tr class="item" v-if="categories">
          <td>{{ category.title }}</td>
          <td>
            <div class="btn danger">Удалить</div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
  <teleport to="body">
    <app-modal v-if="modal" title="Создать новую категорию" @close="modal = false">
      <modal-categories @created="modal = false"/>
    </app-modal>
  </teleport>
</template>

<script>
import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import AppModal from '@/components/ui/AppModal'
import ModalCategories from '@/components/modal/ModalCategories'
export default {
  setup() {
    const modal = ref(false)
    const store = useStore()
    return {
      modal,
      categories: computed(() => store.getters['products/getCategories'])

    }
  },
  components: {AppModal, ModalCategories}
}
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-around;
}
.btn {
  font-size: 12px;
}
</style>