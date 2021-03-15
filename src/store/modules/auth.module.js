import {reactive} from 'vue'
import axios from 'axios'
import {error} from '@/utils/error'
const TOKEN_KEY = 'jwt-token'
const USER_ID = 'user-id'
const USER_ROLE = 'user-role'
const USER_EMAIL = 'user-email'

export default {

    //чтобы название экшенов были локальные
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
            user: reactive({
                id: localStorage.getItem(USER_ID),
                role: localStorage.getItem(USER_ROLE),
                email: localStorage.getItem(USER_EMAIL),
            })
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters ) {  // _ - не используем первый параметр state
            // !! приводит токен к булеан значению
            // если null, первый !делает true, второй ! false
            // если в токене строка, то !false, второй !true
            return !!getters.token  // получаем token с помощью геттера
        },
        getRole(state){
            return state.user.role
        },
        getUser(state){
            return state.user
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        logout(state) {
            state.token = null
            state.user.id = null
            state.user.role = null
            state.user.email = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(USER_ID)
            localStorage.removeItem(USER_ROLE)
            localStorage.removeItem(USER_EMAIL)
        },
        setUserId(state, id) {
            state.user.id = id
            localStorage.setItem(USER_ID, id)
        },
        setUserRole(state, role) {
            state.user.role = role
            localStorage.setItem(USER_ROLE, role)
        },
        setUserEmail(state, email) {
            state.user.email = email
            localStorage.setItem(USER_EMAIL, email)
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                console.log('login', data)
                commit('setToken', data.idToken)
                commit('setUserId', data.localId)
                commit('setUserEmail', data.email)
                // чистим форму логина
                commit('clearMessage', null, {root:true})
                dispatch('getRole')
            } catch (e){
                // записываем ошибку в стор чтобы показать ее в окне
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root:true}) // этот параметр нужен чтобы вызывлся экшен из глобального стора, а не из этого файла
                throw new Error()
            }
        },
        async getRole({state,commit}) {
            try {
                const url = 'https://vue-store-b9903-default-rtdb.europe-west1.firebasedatabase.app/.json'
                const {data} = await axios.get(url, {})
                const role = () => {
                    for (let key in data.roles) {
                        if(key === state.user.id)
                           return data.roles[key]
                    }
                }
                commit('setUserRole', role())
                console.log('user', state.user)
            } catch (e){
                console.log(e)
            }
        }
    },

}