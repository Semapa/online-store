import axios from '@/axios/firebaseDB'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        }
    },
    actions: {
        async createCategories({dispatch}, payload) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/categories.json?auth=${token}`, payload)
                console.log('axios', data)
                dispatch('setMessage', {
                    value: 'Новая категория успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e){
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }
    }
}