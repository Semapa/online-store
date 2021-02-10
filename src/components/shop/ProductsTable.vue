<template>
  <div class="products-table">
  <div class="product-card" v-for="(product, idx) in products"
       :key="product.id"
       @click="showControl"
  >
    <div class="product-img">
      <img :src=product.img>
    </div>
    <h4 class="product-title">{{product.title}}</h4>
    <div class="text-center">
      <button v-if="!isShowControl[product.id]" class="btn"
              :data-id="product.id"
              :data-count="product.count"
              :data-index="idx"
      >
        {{product.count}}
      </button>
        <div v-else class="product-controls">
          <AppButton :class="'danger'" @action="reduceAmountProduct(product.id)">-</AppButton>
          <strong>{{product.count}}</strong>
          <AppButton :class="'primary'" @action="addAmountProduct(product.id)">+</AppButton>
        </div>
    </div>
  </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useCart} from '@/use/cart'
import AppButton from '@/components/ui/AppButton'
export default {
  props: {
    products: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const store = useStore()
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

    return {
      isShowControl,
      showControl,
      ...useCart()
    }
  },
  components: {AppButton}
}
</script>