import { createStore } from 'vuex'
// import { createLogger } from 'vuex'
import auth from './modules/auth.module'
import products from './modules/products.module'
import productsCart from './modules/productsCart.module'

const plugins = []

// чтоб логгер работал только в режиме разработки
if(process.env.NODE_ENV === 'development') {
    // plugins.push(createLogger())
}

export default createStore({
    plugins,
    state() {
        return {
            message: null,
            loader: false
        }
    },
    getters: {
        getLoader(state){
            return state.loader
        }
    },
    mutations: {
        setMessage(state, message) {
            state.message = message
        },
        clearMessage(state) {
            state.message = null
        },
        setLoader(state, value) {
           state.loader = value
        }
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
        productsCart
    }
})
