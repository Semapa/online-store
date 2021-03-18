<template>
  <div v-if="loading">
    <loader />
  </div>
  <div v-else-if="product">
     <div back center>
       <h2 class="text-center text-white">{{product.title}}</h2>
    </div>
    <div class="card-item">
      <img :src=product.img />
      <div>
        <p class="text-center text-white">Категория: <strong>{{category.title}}</strong></p>
        <p class="text-center text-white">Цена: <strong>{{currency(product.price)}}</strong></p>

      </div>
    </div>
  </div>
  <h3 v-else class="text-center text-white">
    Товара не найден.
  </h3>
</template>

<script>
import {useRoute} from 'vue-router'
import {useStore} from 'vuex'
import {computed, ref, onMounted} from "vue";
import {loadProducts} from '@/utils/loadProducts'
import Loader from '@/components/TheLoader'
import {currency} from '@/utils/currency'

export default {
  setup(){
    const route = useRoute()
    const store = useStore()
    const loading = ref(true)
    const id = route.params.id
    
    const product = computed(() =>
        store.getters['products/getProducts']
            .find((product) => product.id === id))
    
    const category = computed(() => 
        store.getters['categories/getCategories']
            .find((category) => category.id === product.value.category))

    onMounted(async () => {
      await loadProducts()
      loading.value = false
    })


    return {
      product,
      loading,
      id,
      category,
      currency
    }
  },
  components:{Loader}

}
</script>

<style scoped>
.card-item{
  display: flex;
    justify-content: center;
    align-items: center;
}
</style>