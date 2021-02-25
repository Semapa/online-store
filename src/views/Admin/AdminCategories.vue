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
        <tr class="item">
          <td>Овощи</td>
          <td>
            <div class="btn danger">Удалить</div>
          </td>
        </tr>
        <tr class="item">
          <td>Фрукты</td>
          <td>
            <div class="btn danger">Удалить</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <teleport to="body">
    <app-modal v-if="modal" title="Создать новую категорию" @close="modal = false">
      <modal-categories />
    </app-modal>
  </teleport>
</template>

<script>
import {ref} from 'vue'
import AppModal from '@/components/ui/AppModal'
import ModalCategories from '@/components/modal/ModalCategories'
export default {
  setup() {
    const modal = ref(false)

    return {
      modal,

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