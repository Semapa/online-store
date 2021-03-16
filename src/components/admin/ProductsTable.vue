<template>
  <table class="table">
    <thead>
    <tr  class="item">
      <th>Название</th>
      <th>Количество</th>
      <th>Цена</th>
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
      <td>
        <div class="btn danger" :data-id="product.id" @click="deleteProduct">Удалить</div>
      </td>
    </tr>
    </tbody>
  </table>

  <teleport to="body">
    <app-modal v-if="modalEdit"  @close="modalEdit = false">
      <modal-edit-products
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
import axiosFirebase from '../../axios/firebaseDB'
import {useStore} from 'vuex'

export default {
  props:['products', 'categories'],
  setup(props) {
    const store = useStore()
    const modalEdit = ref(false)
    const currentProduct = {}


    function openProduct(e){
      currentProduct.value = props.products.filter((product) => product.id === e.target.dataset.id)
      modalEdit.value = true
    }

    // Как правильно? Так
    async function deleteProduct(e) {
      try {
        await store.dispatch('products/deleteProductFromServer',e.target.dataset.id)
        await store.dispatch('products/loadProductsFromServer')
      } catch (e) {
        console.log(e)
      }
    }
    // Или так??? В каком месте обращаться к БД, здесь или в экшене?
    async function editProduct(id, values) {
      try {
        const token = store.getters['auth/token']
        await axiosFirebase.patch(`/products/${id}.json?auth=${token}`, values)
        modalEdit.value = false
        await store.dispatch('products/loadProductsFromServer')
      } catch(e) {
        console.log(e)
      }

    }
    return {
      modalEdit,
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