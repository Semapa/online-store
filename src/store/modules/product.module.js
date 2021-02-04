import axios from '../../axios/product'
// import {useStore} from "vuex"
//
// const store = useStore()

export default {
    namespace: true,
    state() {


        return {
            products: []

        }
    },
    getters:{
      getProducts(state){
          console.log('getProducts')
          return state.products
      }
    },
    mutations: {
        setProduct(state, product) {
            state.products = product
        },
        addProduct(state, product) {
            state.products.push(product)
        }
    },
    actions: {
        async loadProducts({commit}){
            const response = await axios.get('/products')
            response.data.map((product) => {
                commit('addProduct', product)
            })
        }
        // async create({commit, dispatch}, payload) {
        //     try {
        //         const {data} = await axios.post('/products', payload)
        //     } catch (e) {
        //         dispatch('setMessage', {
        //             value: e.message,
        //             type: 'danger'
        //         })
        //     }
        // }
    }
}
