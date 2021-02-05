<template>
<!--  <main-layout></main-layout>-->
      <component :is="layout + '-layout'" v-if="layout"/>
</template>

<script>
import {computed, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import MainLayout from "@/layout/MainLayout"
import AuthLayout from "@/layout/AuthLayout"
import {useStore} from 'vuex'

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    onMounted(() => {
      store.dispatch('loadProductsFromServer')
    })

    return {
      layout: computed( () => route.meta.layout)
    }
  },
  components:{MainLayout, AuthLayout}

}
</script>

<style>

</style>
