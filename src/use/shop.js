import {ref, onMounted, watch,reactive, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {useRoute} from 'vue-router'

export function useShop(){
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const categories = ref(store.getters['products/getCategories'])
    const filter = ref('')
    const filterValue = reactive({product:'', category:''})

    const products = computed(() => store.getters['products/getProducts']
        .filter((product) => {
            if(filterValue.product.length){
                return product.title.includes(filterValue.product)
            }
            if(filterValue.category.length){
                    return product.category.includes(filterValue.category)
            }
            return product
        }))

    onMounted(() => {
        store.commit('setLoader', true)
        store.dispatch('products/loadCategoriesFromServer')
        store.dispatch('products/loadProductsFromServer')
        store.commit('setLoader', false)
    })

    watch(filter, name => {
        console.log('val', name.filterValue)
        filterValue.product = name.filterValue
    })
    watch(filterValue, value => {
        console.log('filterValue', value.category,value.product)
        router.replace({
            path: '/',
            query: {
                cat: value.category,
                prod: value.product
            }
        })
        console.log('route', route.query)
    })

    function changeCategory(cat){
        console.log('changeCategory', cat)
        filterValue.category = cat
    }
    function changeProduct(){
        filterValue.product = ''
    }

    return {
        products,
        categories,
        filter,
        changeCategory,
        changeProduct
    }
}