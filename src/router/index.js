import {createRouter, createWebHistory} from 'vue-router'
// тк стор используем не в setup, то импортируем его из нашего файла
import store from '../store'
import Shop from '../views/Shop.vue'

const routes = [
    {
        path: '/',
        name: 'Shop',
        component: Shop,
        meta: {
            layout: 'main',
            auth: false      // требуется авторизация
        }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue'),  // загружаем по требования
        meta: {
            layout: 'auth',
            auth: false     // можно не писать по дефолту undefined
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin/Admin.vue'),  // загружаем по требования
        meta: {
            layout: 'admin',
            auth: true,     // можно не писать по дефолту undefined
            admin: true
        }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue'),  // загружаем по требования
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/Product.vue'),  // загружаем по требования
        meta: {
            layout: 'main'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

//вызывается перед загрузкой нужной страницы
router.beforeEach( (to, from, next) => {
    const requireAuth = to.meta.auth    //если нужна аторизация

    //если требуем авторизацию и она есть
    if( requireAuth && store.getters['auth/isAuthenticated']) {
        next() // переходим на новую страницу
    } else if (requireAuth && !store.getters['auth/isAuthenticated']){
        next('/auth?message=auth')  // перходим на страницу логина
    } else {
        next()
    }

})
export default router