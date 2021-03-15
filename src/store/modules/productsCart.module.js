import store from '../index'

export default {
    namespaced: true,
    state(){

        return {
            productsCart: JSON.parse(localStorage.getItem('cart')) ?? [],
        }
    },
    getters: {
        getProductsCart(state){
            return state.productsCart
        }
    },
    mutations: {
        clearCart(state) {
          state.productsCart = []
        },
        addProductCart(state, product) {
            state.productsCart.push(product)
            localStorage.setItem('cart', JSON.stringify(state.productsCart))
        },
        addAmountProduct(state, payload) {
            const countProduct = store.getters['products/getProducts']
                .filter(product => product.id === payload.id)

            console.log('countProduct', countProduct[0].count)
            state.productsCart.filter(product => {
                if(product.id === payload.id && product.count < countProduct[0].count) product.count++
                localStorage.setItem('cart', JSON.stringify(state.productsCart))
            })
        },
        reduceAmountProduct(state, payload) {
            state.productsCart.filter(product=>{
                if(product.id === payload.id) {
                    if (product.count > 0) product.count--

                    // удаляем из корзины продукт с количеством 0
                    if (product.count === 0){
                        state.productsCart = state.productsCart.filter((item) => item.id !== payload.id)
                    }
                    localStorage.setItem('cart', JSON.stringify(state.productsCart))
                }
            })
        }
    },
    actions: {}

}