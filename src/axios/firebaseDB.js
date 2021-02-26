import axios from 'axios'
// useRoute здесь не будет работать т.к. мы находимся в axios
// импортируем router
import router from '@/router'

const firebaseAxios = axios.create({
    baseURL: process.env.VUE_APP_FB_URL
})

/* В случае устаревания токена
 * Первый параметр - функция вызываемая в случае успешного завершения
 * Второй параметр - функция вызываемая в случае ошибки
 *
 */

firebaseAxios.interceptors.response.use(null, error => {
    // Если устарел токен от сервера будет приходить 401 ошибка
    if(error.response.status === 401) {
        router.push('/auth?message=auth')
    }
    return Promise.reject(error)
})

export default firebaseAxios