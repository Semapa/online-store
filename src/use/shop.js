import {ref, onMounted, watch,reactive, computed} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {useRoute} from 'vue-router'

export function useShop(){
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
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
        //Проверяем условие чтобы при возвращении с другой страницы не загружать заново
        if(store.getters['categories/getCategories'].length === 0){
            await store.dispatch('categories/loadCategoriesFromServer')
        }
        if(store.getters['products/getProducts'].length === 0) {
            await store.dispatch('products/loadProductsFromServer')
        }
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