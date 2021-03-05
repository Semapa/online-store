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
      <div class="text-center" @click.stop="buy">
        <button v-if="!isBuy(product.id)" class="btn"
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
import {ref, computed} from 'vue'
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
    const cart = computed(() => store.getters['productsCart/getProductsCart'])

    function buy(e){
      console.log('buy', e.target.dataset.id)
      let currentProduct = props.products
          .filter((product) => e.target.dataset.id === product.id)
      console.log('currentProduct', currentProduct[0])
      store.commit('productsCart/addProductCart', currentProduct[0])
      console.log('productsCart', cart.value)
    }

    function isBuy(id) {
      const item = cart.value.filter((product) => product.id === id)
      console.log('isBuy', item)
      return item.length ? true : false
    }

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
      const count = store.getters['productsCart/getProductsCart']
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
      countProductCart,
      buy,
      cart,
      isBuy

    }
  },
  components: {AppProductControl}
}
</script>