import {ref, onMounted, watch} from 'vue'
import {useStore} from 'vuex'

export function useShop(){
    const store = useStore()
    const products = ref(store.getters['products/getProducts'])
    const categories = ref(store.getters['products/getCategories'])
    const filter = ref('')

    onMounted(() => {
        store.dispatch('products/loadProductsFromServer')
        store.dispatch('products/loadCategoriesFromServer')
        // store.commit('sortProducts')
    })

    watch(filter, val => {
        console.log('val', val.filterValue)
        console.log('store.products', products.value)
    })

    return {
        products,
        categories,
        filter
    }
}