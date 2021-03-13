import {useStore} from 'vuex'

export async function loadProducts() {
    const store = useStore()
    //Проверяем условие чтобы при возвращении с другой страницы не загружать заново
    if(store.getters['categories/getCategories'].length === 0){
        await store.dispatch('categories/loadCategoriesFromServer')
    }
    if(store.getters['products/getProducts'].length === 0) {
        await store.dispatch('products/loadProductsFromServer')
    }
}