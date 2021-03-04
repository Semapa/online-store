import axiosFirebase from '../../axios/firebaseDB'
import store from '../index'

export default {
    namespaced: true,
    state() {

        return {
            categories: []
        }
    },
    getters:{
        getCategories(state){
            return state.categories
        },
    },
    mutations: {
        setCategories(state) {
            state.categories = []
        },
        addCategory(state,category){
            state.categories.push(category)
        },
        deleteCategory(state, id) {
            console.log('deleteCategory',state, id)
            state.categories = state.categories.filter((category) => category.id !== id
            )
        },
    },
    actions: {
       async loadCategoriesFromServer({commit}){
            commit('setCategories')
            try {
                store.commit('setLoader', true)
                const response = await axiosFirebase.get('/categories.json')
                store.commit('setLoader', false)
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
                store.commit('setLoader', true)
                const token = store.getters['auth/token']
                await axiosFirebase.post(`/categories.json?auth=${token}`, payload)
                store.commit('setLoader', false)
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
                store.commit('setLoader', true)
                const token = store.getters['auth/token']
                await axiosFirebase.delete(`/categories/${id}.json?auth=${token}`)
                store.commit('setLoader', false)
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
                store.commit('setLoader', true)
                const token = store.getters['auth/token']
                await axiosFirebase.put(`/categories/${request.id}.json?auth=${token}`,
                    {title: request.title})
                store.commit('setLoader', false)
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
        },
    },
}
