<template>
  <div class="card">
    <table class="table">
      <thead>
      <tr>
        <th>
          <div class="card-title">
            <h1 class="card-title">Продукты</h1>
            <button class="btn primary" @click="modal = true">Добавить</button>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="item">
        <td>Яблоки</td>
        <td>
          <div class="btn">Редактировать</div>
        </td>
      </tr>
      <tr class="item">
        <td>Груши</td>
        <td>
          <div class="btn">Редактировать</div>
        </td>
      </tr>
      </tbody>
    </table>
    <teleport to="body">
      <app-modal v-if="modal" title="Создать новый продукт" @close="modal = false">
        <modal-products />
      </app-modal>
    </teleport>
  </div>
</template>

<script>
import {ref} from 'vue'
import AppModal from '@/components/ui/AppModal'
import ModalProducts from '@/components/modal/ModalProducts'
export default {
  setup() {
    const modal = ref(false)
    return {
      modal
    }
  },
  components: {AppModal, ModalProducts}
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