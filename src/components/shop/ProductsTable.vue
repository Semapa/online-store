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
      <div class="text-center" @click.stop>
        <button v-if="!isBuy(product.id)" class="btn"
                @click="buy"
                :data-id="product.id"
                :data-count="product.count"
                :data-index="idx"
        >
          {{currency(product.price)}}
        </button>
        <app-product-control
            v-else
            :productId="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {currency} from '@/utils/currency'
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
    const cart = computed(() => store.getters['productsCart/getProductsCart'])

    function buy(e){
      let currentProduct = props.products
          .filter((product) => e.target.dataset.id === product.id)

      if(currentProduct[0].count > 0){
          store.commit('productsCart/addProductCart', {
            id: currentProduct[0].id,
            price: currentProduct[0].price,
            count: 1,
            title: currentProduct[0].title
          })
      }
    }

    function isBuy(id) {
      const item = cart.value.filter((product) => product.id === id)
      return item.length ? true : false
    }

    function openProduct(id){
      router.push(`/product/${id}`)
    }

    return {
      openProduct,
      currency,
      buy,
      cart,
      isBuy

    }
  },
  components: {AppProductControl}
}
</script>