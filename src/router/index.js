import {createRouter, createWebHistory} from 'vue-router'
import Shop from '../views/Shop.vue'

const routes = [
    {
        path: '/',
        name: 'Shop',
        component: Shop,
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../views/Auth.vue'),  // загружаем по требования
        meta: {
            layout: 'auth'
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
    routes
})

export default router