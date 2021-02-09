import { createStore } from 'vuex'
import { createLogger } from 'vuex'
import auth from './modules/auth.module'
import products from './modules/products.module'
import productsCart from './modules/productsCart.module'

const plugins = []

// чтоб логгер работал только в режиме разработки
if(process.env.NODE_ENV === 'development') {
    plugins.push(createLogger())
}

export default createStore({
    plugins,
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        products,
        productsCart
    }
})
