import axios from 'axios'
import {error} from '@/utils/error'
const TOKEN_KEY = 'jwt-token'

export default {
    //чтобы название экшенов были локальные
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY),
            user: {
                id: null,
                role: null
            }
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        logout(state) {
            state.token = null
            localStorage.removeItem(TOKEN_KEY)

        },
        setUserId(state, id) {
            state.user.id = id
        },
        setUserRole(state, role) {
            state.user.role = role
        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                commit('setToken', data.idToken)
                commit('setUserId', data.localId)
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
    getters: {
        token(state) {
            return state.token
        },
        isAuthenticated(_, getters ) {  // _ - не используем первый параметр state
            // !! приводит токен к булеан значению
            // если null, первый !делает true, второй ! false
            // если в токене строка, то !false, второй !true
            return !!getters.token  // получаем token с помощью геттера
        }
    }
}