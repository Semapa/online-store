// import axios from '../../axios/product'
import axiosFirebase from '../../axios/firebaseDB'
import store from '../index'
// import {useStore} from "vuex"
//
// const store = useStore()

export default {
    namespaced: true,
    state() {

        return {
            products: [],
        }
    },
    getters:{
        getProducts(state){
          return state.products
      },
    },
    mutations: {
        setProducts(state) {
            state.products = []
        },
        addProduct(state, product) {
            state.products.push(product)
        },
        sortProducts(state){
            console.log('sortProducts - products',state.products)
            state.products.sort((a, b) => {
            console.log('sortProducts',a.value.count, b.value.count)
            if (a.count > b.count) return -1
            if (a.count < b.count) return 1
                //    return state.allProducts.sort((a, b) => b.count - a.count)
            return 0
            })
        },
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
        // async loadProductsFromServerJSON({commit}){
        //     const url = `/products`
        //     const response = await axios.get(url, {
        //     })
        //     response.data.map((product) => {
        //         commit('addProduct', product)
        //     })
        // },
        // async loadCategoriesJSON({commit}){
        //     const url = `/categories`
        //     const response = await axios.get(url)
        //     response.data.map((categories) => {
        //         commit('addCategories', categories)
        //     })
        // },
        async createProduct({dispatch}, payload) {
            try {
                store.commit('setLoader', true)
                const token = store.getters['auth/token']
                await axiosFirebase.post(`/products.json?auth=${token}`, payload)
                store.commit('setLoader', false)
                dispatch('setMessage', {
                    value: 'Новый продукт успешно создан',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadProductsFromServer({commit}){
            commit('setProducts')
            try {
                store.commit('setLoader', true)
                const response = await axiosFirebase.get('/products.json')
                store.commit('setLoader', false)
                if(response.data) {
                    const products = Object.keys(response.data).map((key) => {
                        return {
                            id: key,
                            ...response.data[key]
                        }
                    })
                    products.map((product) => {
                        commit('addProduct', product)
                    })
                }
            } catch(e){
                console.log(e)
            }
        }
    },
}
