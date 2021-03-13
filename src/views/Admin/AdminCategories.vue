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
      <template v-if="categories.length" >
        <tr class="item" v-for="category in categories" :key="category.id">
          <td>{{ category.title }}</td>
          <td>
            <div class="flex">
              <div class="btn" :data-id="category.id" @click="changeCategories">Изменить</div>
              <div class="btn danger" :data-id="category.id" @click="deleteCategory">Удалить</div>
            </div>
          </td>
        </tr>
      </template>
      <template v-else>
        <h3>Создайте новую категорию</h3>
      </template>
      </tbody>
    </table>
  </div>
  <teleport to="body">
    <app-modal v-if="modal" title="Создать новую категорию" @close="modal = false">
      <modal-categories @created="createdCategory"/>
    </app-modal>
    <app-modal v-if="modalUpd" title="Изменить категорию" @close="modalUpd = false">
      <modal-upd-categories
          @updated="updateCategory"/>
    </app-modal>
  </teleport>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppModal from '@/components/ui/AppModal'
import ModalCategories from '@/components/admin/ModalCategories'
import ModalUpdCategories from '@/components/admin/ModalEditCategory'
import Loader from '@/components/TheLoader'
import {loadProducts} from '../../utils/loadProducts'

// Не совсем понятно для чего выносить таблицу с категориями в компонент,
// если она используется в одном месте
export default {
  setup() {
    const modal = ref(false)
    const modalUpd = ref(false)
    const store = useStore()
    const loading = ref(true)
    const categories = computed(() => store.getters['categories/getCategories'])
    let currentId = ''

    onMounted(async () => {
      await loadProducts()
      loading.value = false
    })

    function createdCategory() {
      modal.value = false
      refreshCategories()
    }

    function deleteCategory(e) {
      store.dispatch('categories/deleteCategoryFromServer', e.target.dataset.id )
    }

    function changeCategories(e) {
      currentId = e.target.dataset.id
      modalUpd.value = true
    }

    async function updateCategory(title) {
      modalUpd.value = false
      await store.dispatch('categories/updateCategoryFromServer', {
        id: currentId,
        title: title
      } )
      refreshCategories()
    }

    // Не совсем понял, можно ли обойтись без этой функции
    // без нее не обновляется страница при создании, удалении и изменении категории
    function refreshCategories() {
      store.dispatch('categories/loadCategoriesFromServer')
    }
    return {
      modal,
      modalUpd,
      loading,
      createdCategory,
      deleteCategory,
      changeCategories,
      updateCategory,
      categories

    }
  },
  components: {AppModal, ModalCategories, ModalUpdCategories, Loader}
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

.flex{
  display: flex;
}
</style>