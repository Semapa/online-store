import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useCart(){
    const store = useStore()
    const router = useRouter()
    const products = computed(() => store.getters['productsCart/getProductsCart'])
    const isAuthenticated = store.getters['auth/isAuthenticated']

    function addAmountProduct(id) {
        store.commit('productsCart/addAmountProduct', {id})
    }

    function reduceAmountProduct(id) {
        store.commit('productsCart/reduceAmountProduct', {id})
    }

    function getTotal() {
        return products.value.reduce((total, product) => total + (product.price * product.count), 0)
    }

    function toPay() {
        if(!isAuthenticated) router.push('/auth')

    }
    return {
        addAmountProduct,
        reduceAmountProduct,
        products: products,
        getTotal: computed(getTotal),
        toPay
    }
}