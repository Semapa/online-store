import {ref, computed} from 'vue'
import {useStore} from 'vuex'


// const CART_MODEL = {
//   '2': 3,
//   '5': 1
// }

// key = product id
// value = product count

export function useCart(){
    const store = useStore()

    const products = ref(store.getters['productsCart/getProductsCart'])
    // const total = getTotal

    function addAmountProduct(id) {
        store.commit('productsCart/addAmountProduct', {id:id})
    }

    function reduceAmountProduct(id) {
        store.commit('productsCart/reduceAmountProduct', {id:id})
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
        addAmountProduct,
        reduceAmountProduct,
        products: products,
        getTotal: computed(getTotal),
        // total:computed(total),
        toPay
    }
}