import {computed, ref} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import axiosFirebase from '../axios/firebaseDB'
import {pay} from '../utils/pay'


export function useCart(){
    const store = useStore()
    const router = useRouter()
    const products = computed(() => store.getters['productsCart/getProductsCart'])
    const user = computed(() => store.getters['auth/getUser'])
    const modal = ref(false)

    function addAmountProduct(id) {
        store.commit('productsCart/addAmountProduct', {id})
    }

    function reduceAmountProduct(id) {
        store.commit('productsCart/reduceAmountProduct', {id})
    }

    function getTotal() {
        return products.value.reduce((total, product) => total + (product.price * product.count), 0)
    }

    async function toPay() {
        try {
            const token = store.getters['auth/token']
            await pay({
                description:'Покупка товара в онлайн магазине',
                amount: getTotal(),
                accountId: user.value.email
            })
            await store.dispatch('orders/createOrder', {
                data: Date.now(),
                userId: user.value.id,
                userEmail: user.value.email,
                products: {...products.value}
            })
            localStorage.removeItem('cart')
            store.commit('products/reduceAmount')

            products.value.forEach((product) => {
                axiosFirebase.patch(`/products/${product.id}.json?auth=${token}`,
                    {count: product.count})
            })
            store.commit('productsCart/clearCart')
            router.push('/')
        } catch (e) {
            console.log(e)
        }
    }
    return {
        addAmountProduct,
        reduceAmountProduct,
        products: products,
        getTotal: computed(getTotal),
        toPay,
        modal
    }
}