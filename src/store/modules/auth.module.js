import axios from 'axios'
import {error} from '@/utils/error'
const TOKEN_KEY = 'jwt-token'

export default {
    //чтобы название экшенов были локальные
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY)
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

        }
    },
    actions: {
        async login({commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                commit('setToken', data.idToken)
                // чистим форму логина
                commit('clearMessage', null, {root:true})
            } catch (e){
                // записываем ошибку в стор чтобы показать ее в окне
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root:true}) // этот параметр нужен чтобы вызывлся экшен из глобального стора, а не из этого файла
                throw new Error()
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