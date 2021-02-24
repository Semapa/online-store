<template>
  <nav class="navbar">
    <h3>Online store</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <template v-if="role === 'admin'">
        <li>
          <router-link to="/admin/categories">Категории</router-link>
        </li>
        <li>
          <router-link to="/admin/products">Продукты</router-link>
        </li>
      </template>
      <li>
        <router-link to="/cart">Корзина</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/auth">Войти</router-link>
      </li>
      <li v-if="isAuthenticated">
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from'vue-router'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/')
      },
      isAuthenticated: computed(() => store.getters['auth/isAuthenticated']),
      role: computed(() => store.getters['auth/getRole']),

    }
  }
}
</script>

<style scoped>

</style>