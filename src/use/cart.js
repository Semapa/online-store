import {ref, computed} from 'vue'
import {useStore} from 'vuex'
import {currency} from '@/utils/currency'

// const CART_MODEL = {
//   '2': 3,
//   '5': 1
// }

// key = product id
// value = product count

export function useCart(){
    const store = useStore()
    const amount = ref(1)
    const products = ref(store.getters.getProducts)
    // const total = getTotal


    function addAmountProduct(idx) {
        products.value[idx].count++
        // console.log(products.value[idx])
    }

    function reduceAmountProduct(idx) {
        if (products.value[idx].count > 0)
            products.value[idx].count--
    }

    function getTotal() {
        let count = 0
        products.value.map((item) => {
            count += item.price * item.count
        })
        return count
    }

    function toPay(){
        // const ob = Object.keys(CART_MODEL)
        // console.log('ob', ob)
        console.log('products', products)
        console.log('store.products', store.getters.getProducts)
    }

    return {
        amount,
        currency,
        addAmountProduct,
        reduceAmountProduct,
        products: products,
        getTotal: computed(getTotal),
        // total:computed(total),
        toPay
    }
}