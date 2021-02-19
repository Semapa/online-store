<template>
  <div class="products-table">
    <div class="product-card" v-for="(product, idx) in products"
         :key="product.id"
         @click="openProduct(product.id)"
    >
      <div class="product-img">
        <img :src=product.img>
      </div>
      <h4 class="product-title">{{product.title}}</h4>
      <div class="text-center" @click.stop="showControl">
        <button v-if="!isShowControl[product.id]" class="btn"
                :data-id="product.id"
                :data-count="product.count"
                :data-index="idx"
        >
          {{product.count}}
        </button>
        <AppProductControl
            v-else
            :count="countProductCart"
            :productId="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'


import AppProductControl from '@/components/ui/AppProductControl'
export default {
  props: {
    products: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    let isShowControl = ref([])

    function showControl(e) {
      isShowControl.value[e.target.dataset.id] = e.target.dataset.count >0 ? true : false

      if(isShowControl.value[e.target.dataset.id] === true){
          let currentProduct = props.products[e.target.dataset.index]
          console.log('currentProduct',currentProduct)
          currentProduct.count = 1
          store.commit('productsCart/addProductCart', currentProduct)
      }
//      return isShowControl
    }
    function countProductCart(){
      const count = store.getters.getProductsCart
      console.log('count', count)
      return count
    }

    function openProduct(id){
      router.push(`/product/${id}`)
    }

    return {
      isShowControl,
      showControl,
      openProduct,
      countProductCart

    }
  },
  components: {AppProductControl}
}
</script>