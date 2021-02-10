import axios from '../../axios/product'
// import {useStore} from "vuex"
//
// const store = useStore()

export default {
    namespaced: true,
    state() {

        return {
            products: [],
            categories: []
        }
    },
    getters:{
        getProducts(state){
          return state.products
      },
        getCategories(state){
            return state.categories
        }
    },
    mutations: {
        setProduct(state) {
            console.log('setProduct')
            state.products = []
        },
        addProduct(state, product) {
            state.products.push(product)
        },
        addCategories(state,categories){
            state.categories.push(categories)
        },
        sortProducts(state){
            console.log('sortProducts - products',state.products)
            state.products.sort((a, b) => {
            console.log('showStore',a.value.count, b.value.count)
            if (a.count > b.count) return -1
            if (a.count < b.count) return 1
            return 0
            })
        },
        // findProducts(state){
        //
        // }
    },
    actions: {
        /* axios.get('/products?id=4')
         * или
         * axios.get('/user', {
         * params: {
         *      ID: 12345
         *      }
         *  })
         */
        async loadProductsFromServer({commit}){
            const url = `/products`
            const response = await axios.get(url)
            response.data.map((product) => {
                commit('addProduct', product)
            })
        },
        // async create({commit, dispatch}, payload) {
        //     try {
        //         const {data} = await axios.post('/products', payload)
        //     } catch (e) {
        //         dispatch('setMessage', {
        //             value: e.message,
        //             type: 'danger'
        //         })
        //     }
        // }
        async loadCategoriesFromServer({commit}){
            const url = `/categories`
            const response = await axios.get(url)
            response.data.map((categories) => {
                commit('addCategories', categories)
            })
        }
    },

}
