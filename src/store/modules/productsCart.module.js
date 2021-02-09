export default {
    namespaced: true,
    state(){

        return {
            productsCart: [],

        }
    },
    getters: {
        getProductsCart(state){
            console.log('getProductsCard')
            return state.productsCart
        }
    },
    mutations: {
        addProductCart(state, product) {
            console.log('addProduct', state,product)
            // state.productsCart.push(product)
        }
    },
    actions: {}

}