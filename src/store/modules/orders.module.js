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
            state.orders = state.orders.filter((order) => order.id !== id
            )
        },
    },
    actions: {
        async createOrder({dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
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
    },
}
