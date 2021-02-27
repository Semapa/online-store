import axios from '../../axios/product'
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
        },
        setCategories(state) {
            state.categories = []
        },
        addProduct(state, product) {
            state.products.push(product)
        },
        addCategory(state,category){
            state.categories.push(category)
        },
        deleteCategory(state, id) {
            console.log('deleteCategory',state, id)
            state.categories = state.categories.filter((category) => category.id !== id
            )
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
            try {
                const response = await axiosFirebase.get('/categories.json')
                if(response.data) {
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
            } catch(e){
                console.log(e)
            }
        },
        async createCategory({dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axiosFirebase.post(`/categories.json?auth=${token}`, payload)
                console.log('axios', data)
                dispatch('setMessage', {
                    value: 'Новая категория успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async deleteCategoryFromServer({dispatch, commit}, id) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axiosFirebase.delete(`/categories/${id}.json?auth=${token}`)
                console.log('axios_delete', data)
                dispatch('setMessage', {
                    value: 'Категория успешно удалена',
                    type: 'primary'
                }, {root: true})
                commit('deleteCategory', id)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async updateCategoryFromServer({dispatch}, request) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axiosFirebase.put(`/categories/${request.id}.json?auth=${token}`, request)
                console.log('axios_update', data)
                dispatch('setMessage', {
                    value: 'Категория успешно обновлена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    },
}
