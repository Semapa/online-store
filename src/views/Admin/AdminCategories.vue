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
import ModalCategories from '@/components/modal/ModalCategories'
import ModalUpdCategories from '@/components/modal/ModalUpdCategories'
import Loader from '@/components/TheLoader'

export default {
  setup() {
    const modal = ref(false)
    const modalUpd = ref(false)
    const store = useStore()
    const loading = computed(()=> store.getters.getLoader)
    const categories = computed(() => store.getters['products/getCategories'])
    let currentId = ''

    onMounted(() => {
      refreshCategories()
    })

    function createdCategory() {
      modal.value = false
      refreshCategories()
    }

    function deleteCategory(e) {
      store.commit('setLoader', true)
      store.dispatch('products/deleteCategoryFromServer', e.target.dataset.id )
      store.commit('setLoader', false)
    }

    function changeCategories(e) {
      currentId = e.target.dataset.id
      modalUpd.value = true
    }

    function updateCategory(title) {
      modalUpd.value = false
      store.commit('setLoader', true)
      store.dispatch('products/updateCategoryFromServer', {
        id: currentId,
        title: title
      } )
      store.commit('setLoader', false)
    }

    function refreshCategories() {
      store.commit('setLoader', true)
      store.dispatch('products/loadCategoriesFromServer')
      store.commit('setLoader', false)
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