import { createStore } from 'vuex'
// import { createLogger } from 'vuex'
import auth from './modules/auth.module'
import products from './modules/products.module'
import categories from './modules/categories.module'
import productsCart from './modules/productsCart.module'
import orders from './modules/orders.module'
// const plugins = []

// чтоб логгер работал только в режиме разработки
if(process.env.NODE_ENV === 'development') {
    // plugins.push(createLogger())
}

export default createStore({
    // plugins,
    state() {
        return {
            message: null,
        }
    },
    mutations: {
        setMessage(state, message) {
            state.message = message
        },
        clearMessage(state) {
            state.message = null
        },
    },
    actions: {
        // чтобы закрывалось окно с сообщением через 5 сек
        setMessage({commit}, message) {
            commit('setMessage', message)
            setTimeout(() => {
                commit('clearMessage')
            }, 5000)
        }
    },
    modules: {
        auth,
        products,
        productsCart,
        categories,
        orders
    }
})
