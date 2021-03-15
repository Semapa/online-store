<template>
  <div class="card">
    <h1>Корзина</h1>
    <h3 class="text-center" v-if="!products.length">В корзине пока ничего нет</h3>
      <CartItem :products="products" v-else/>
    <hr>
    <p class="text-right"><strong>Всего: {{currency(getTotal)}}</strong></p>
    <p class="text-right">
      <button class="btn"
              @click="toPay"
              :disabled="!isAuthenticated"
      >Купить</button>
    </p>
  </div>
  <div v-if="!isAuthenticated" class="card">
    <p><strong>Чтобы совершить покупку необходимо войти в систему.</strong></p>
    <the-auth-form />
  </div>

  <teleport to="body">
    <app-modal v-if="modal" title="Выберете способ оплаты" @close="modal = false">
      <modal-pay />
    </app-modal>
  </teleport>

</template>

<script>
import AppModal from '@/components/ui/AppModal'
import ModalPay from '@/components/cart/ModalPay'
import TheAuthForm from '../components/TheAuthForm'
import {useCart} from '@/use/cart'
import CartItem from '@/components/cart/CartItem'
import {currency} from '@/utils/currency'
import {computed} from 'vue'
import {useStore} from 'vuex'

export default {
  components: {CartItem, TheAuthForm, AppModal, ModalPay},
  setup() {
    const store = useStore()

    return {
      ...useCart(),
      currency,
      isAuthenticated: computed(() => store.getters['auth/isAuthenticated']),
    }
  }
}
</script>

<style scoped>

</style>