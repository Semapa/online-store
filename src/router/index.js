import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            layout: 'main'
        }
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('./views/Auth.vue'),  // загружаем по требования
        meta: {
            layout: 'auth'
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router