import {ref, onMounted, watch,reactive, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {useRoute} from 'vue-router'
import {loadProducts} from '@/utils/loadProducts'

export function useShop(){
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const loading = ref(true)
    const categories = computed(() => store.getters['categories/getCategories'])
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

    onMounted(async () => {
        await loadProducts()
        loading.value = false
    })

    watch(filter, name => {
        filterValue.product = name.filterValue
    })
    watch(filterValue, value => {
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
        changeProduct,
        loading
    }
}