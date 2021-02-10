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
            state.productsCart.push(product)
        },
        addAmountProduct(state, payload) {
            state.productsCart.filter(product=>{
                if(product.id === payload.id) product.count++
            })
        },
        reduceAmountProduct(state, payload) {
            state.productsCart.filter(product=>{
                if(product.id === payload.id) {
                    if (product.count > 0) product.count--
                }
            })
        }
    },
    actions: {}

}