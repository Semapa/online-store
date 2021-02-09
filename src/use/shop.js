import {ref, onMounted, watch} from 'vue'
import {useStore} from 'vuex'

export function useShop(){
    const store = useStore()
    const products = ref(store.getters['products/getProducts'])
    const filter = ref('')

    onMounted(() => {
        store.dispatch('products/loadProductsFromServer')
        // store.commit('sortProducts')
    })

    watch(filter, val => {
        console.log('val', val.products)
        console.log('store.products', products.value)
    })

    return {
        products,
        filter
    }
}