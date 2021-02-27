<template>
  <div v-if="loading">
    <loader />
  </div>
  <div v-else class="card">
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
            <div class="btn danger" :data-id="category.id" @click="deleteCategory">Удалить</div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
  <teleport to="body">
    <app-modal v-if="modal" title="Создать новую категорию" @close="modal = false">
      <modal-categories @created="createdCategory"/>
    </app-modal>
  </teleport>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppModal from '@/components/ui/AppModal'
import ModalCategories from '@/components/modal/ModalCategories'
import Loader from '@/components/TheLoader'

export default {
  setup() {
    const modal = ref(false)
    const store = useStore()
    const loading = computed(()=> store.getters.getLoader)
    const categories = computed(() => store.getters['products/getCategories'])

    onMounted(() => {
      refreshCategories()
    })

    function createdCategory() {
      modal.value = false
      refreshCategories()
    }

    function deleteCategory(e) {
      console.log(e.target.dataset.id)
    }

    function refreshCategories() {
      store.commit('setLoader', true)
      store.dispatch('products/loadCategoriesFromServer')
      store.commit('setLoader', false)
    }
    return {
      modal,
      loading,
      createdCategory,
      deleteCategory,
      categories

    }
  },
  components: {AppModal, ModalCategories, Loader}
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