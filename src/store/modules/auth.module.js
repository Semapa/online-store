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
        async login({ commit }, payload) {
            console.log(payload)
            commit('setToken', 'TEST TOKEN')
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