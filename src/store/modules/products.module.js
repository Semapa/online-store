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
        reduceAmount(state){
            const cart = store.getters['productsCart/getProductsCart']
            console.log('reduceAmount', cart)
            let products = []
            cart.forEach((item) => {
                products = state.products.filter((product) => {
                    if(product.id === item.id) {
                        product.count = product.count - (+item.count)
                    }
                    return product
                })
            })
            state.products = products
            console.log('newProducts', state.products)
        },
        deleteProduct(state, id){
            console.log('deleteProduct',state, id)
            state.categories = state.categories.filter((category) => category.id !== id)
        },
        sortProducts(state){
            state.products.sort((a, b) => {
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
                const token = store.getters['auth/token']
                await axiosFirebase.post(`/products.json?auth=${token}`, payload)
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
                const response = await axiosFirebase.get('/products.json')
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
        },
        async deleteProductFromServer({dispatch, commit}, id) {
            try {
                const token = store.getters['auth/token']
                await axiosFirebase.delete(`/products/${id}.json?auth=${token}`)
                dispatch('setMessage', {
                    value: 'Продукт успешно удален',
                    type: 'primary'
                }, {root: true})
                commit('deleteProduct', id)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
    }


}
