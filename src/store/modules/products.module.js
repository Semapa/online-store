import axios from '../../axios/product'
import axiosFirebase from '../../axios/firebaseDB'
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
        },
    },
    mutations: {
        setProduct(state) {
            state.products = []
            console.log('setProduct', state.products)
        },
        setCategories(state) {
            state.categories = []
            console.log('setCategories', state.categories)
        },
        addProduct(state, product) {
            state.products.push(product)
        },
        addCategory(state,category){
            state.categories.push(category)
            console.log('addCategories', state.categories)
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
        async loadProductsFromServer({commit}){
            const url = `/products`
            const response = await axios.get(url, {

            })

            response.data.map((product) => {
                commit('addProduct', product)
            })
        },
        // async loadCategoriesJSON({commit}){
        //     const url = `/categories`
        //     const response = await axios.get(url)
        //     response.data.map((categories) => {
        //         commit('addCategories', categories)
        //     })
        // },
        async loadCategoriesFromServer({commit}){
            commit('setCategories')
            const response = await axiosFirebase.get('/categories.json')
            console.log('loadCategoriesFromServer', response.data)
            const categories = Object.keys(response.data).map((key) => {
                return {
                    id: key,
                    title: response.data[key].title
                }
            })
            categories.map((category) => {
                commit('addCategory', category)
            })
        }
    },

}
