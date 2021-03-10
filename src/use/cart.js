import {computed} from 'vue'
import {useStore} from 'vuex'

export function useCart(){
    const store = useStore()
    const products = computed(() => store.getters['productsCart/getProductsCart'])

    function addAmountProduct(id) {
        store.commit('productsCart/addAmountProduct', {id})
    }

    function reduceAmountProduct(id) {
        store.commit('productsCart/reduceAmountProduct', {id})
    }

    function getTotal() {
        return products.value.reduce((total, product) => total + (product.price * product.count), 0)
    }

    return {
        addAmountProduct,
        reduceAmountProduct,
        products: products,
        getTotal: computed(getTotal)
    }
}