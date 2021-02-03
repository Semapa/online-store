import {computed, watch} from 'vue'
import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {useStore} from "vuex"
import {useRouter} from 'vue-router'

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()

    // handleBlur - уводим фокус, включается валидация
    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        // добавляем валидаторы из yup
        yup
            .string()   // это стока
            .trim()     // без пробелов
            .required('Пожалуйста введите email') // обязательное
            .email('Необходимо ввести корректный email')    // это email
    )
    const PASSWORD_MIN_LENGTH = 6
    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Пожалуйста введите пароль')
            .min(PASSWORD_MIN_LENGTH, `Пароль не может быть меньше ${PASSWORD_MIN_LENGTH} символов`)    // минимальная длинна
    )

    // submitCount.value - сколько раз нажимали кнопку войти
    const isTooManyAttempts = computed(() => submitCount.value >= 3)

    // смотрим если isTooManyAttempts=true запускаем таймер чтобы сделать кнопку активной
    watch(isTooManyAttempts, val => {
        if (val) {
            setTimeout( () => submitCount.value = 0, 2000)
        }
    })
    const onSubmit = handleSubmit( async values => {
        console.log('Form', values)
        await store.dispatch('auth/login', values)
        router.push('/')
    })


    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting, // для отключения кнопки Войти, если форма сабмитится в данный момент
        isTooManyAttempts
    }
}