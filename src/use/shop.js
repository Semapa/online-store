import {ref} from 'vue'
import {useStore} from 'vuex'

export function useShop(){
    const store = useStore()
    const products = ref(store.getters.getProducts)

    function sortProducts(){
        console.log('showStore - products',products.value)
        products.value.sort((a, b) => {
            console.log('showStore',a.count, b.count)
            if (a.count > b.count) return -1
            if (a.count < b.count) return 1
            return 0
        })
    }
    return {
        products,
        sortProducts
    }
}