import axiosFirebase from '../../axios/firebaseDB'
import store from '../index'

export default {
    namespaced: true,
    state() {

        return {
            orders: []

        }
    },
    getters:{
        getOrders(state){
            return state.orders
        },
    },
    mutations: {
        setOrders(state) {
            state.orders = []
        },
        addOrders(state,order){
            state.orders.push(order)
        },
        deleteOrders(state, id) {
            console.log('deleteOrders',state, id)
            state.orders = state.orders.filter((order) => order.id !== id
            )
        },
    },
    actions: {
        // async loadCategoriesFromServer({commit}){
        //     commit('setCategories')
        //     try {
        //         const response = await axiosFirebase.get('/categories.json')
        //         if(response.data) {
        //             const categories = Object.keys(response.data).map((key) => {
        //                 return {
        //                     id: key,
        //                     title: response.data[key].title
        //                 }
        //             })
        //             categories.map((category) => {
        //                 commit('addCategory', category)
        //             })
        //         }
        //     } catch(e){
        //         console.log(e)
        //     }
        // },
        async createOrder({dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                console.log('createOrder', payload)
                await axiosFirebase.post(`/orders.json?auth=${token}`, payload)

                dispatch('setMessage', {
                    value: 'Новый заказ успешно создан',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        // async deleteCategoryFromServer({dispatch, commit}, id) {
        //     try {
        //         const token = store.getters['auth/token']
        //         await axiosFirebase.delete(`/categories/${id}.json?auth=${token}`)
        //         dispatch('setMessage', {
        //             value: 'Категория успешно удалена',
        //             type: 'primary'
        //         }, {root: true})
        //         commit('deleteCategory', id)
        //
        //     } catch (e) {
        //         dispatch('setMessage', {
        //             value: e.message,
        //             type: 'danger'
        //         }, {root: true})
        //     }
        // },
        // async updateCategoryFromServer({dispatch}, request) {
        //     try {
        //         const token = store.getters['auth/token']
        //         await axiosFirebase.put(`/categories/${request.id}.json?auth=${token}`,
        //             {title: request.title})
        //         dispatch('setMessage', {
        //             value: 'Категория успешно обновлена',
        //             type: 'primary'
        //         }, {root: true})
        //     } catch (e) {
        //         dispatch('setMessage', {
        //             value: e.message,
        //             type: 'danger'
        //         }, {root: true})
        //     }
        // },
    },
}
