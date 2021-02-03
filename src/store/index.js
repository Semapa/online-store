import { createStore } from 'vuex'
import { createLogger } from 'vuex'
import auth from './modules/auth.module'

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
        auth
    }
})
