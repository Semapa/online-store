<template>
  <table class="table">
    <thead>
    <tr  class="item">
      <th>Название</th>
      <th>Количество</th>
      <th>Цена</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="product in products" :key="product.id">
      <td>{{product.title}}</td>
      <td>{{product.count}}</td>
      <td>{{product.price}}</td>
      <td>
        <div class="btn" :data-id="product.id" @click="openProduct">Редактировать</div>
      </td>
    </tr>
    </tbody>
  </table>

  <teleport to="body">
    <app-modal v-if="modal"  @close="modal = false">
      <modal-edit-products
          @delete="deleteProduct"
          @edit="editProduct"
          :product="currentProduct.value[0]"
          :categories="categories"
      />
    </app-modal>
  </teleport>
</template>

<script>
import {ref} from 'vue'
import AppModal from '@/components/ui/AppModal'
import ModalEditProducts from '@/components/admin/ModalEditProduct'

export default {
  props:['products', 'categories'],
  setup(props) {
    const modal = ref(false)
    const currentProduct = {}


    function openProduct(e){
      currentProduct.value = props.products.filter((product) => product.id === e.target.dataset.id)
      modal.value = true
    }
    function deleteProduct() {

    }

    function editProduct(values) {
      console.log('editProduct', values)
    }
    return {
      modal,
      openProduct,
      currentProduct,
      deleteProduct,
      editProduct
    }
  },
  components: {AppModal, ModalEditProducts}
}
</script>

<style scoped>

.btn {
  font-size: 12px;
}
</style>