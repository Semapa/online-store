<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: tError}">
      <label for="title">Название продукта</label>
      <input type="text" id="title" v-model="title" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>
    <div class="form-control">
      <label for="category">Категория</label>
      <select id="category" v-model="category">
        <option  v-for="titleCategory in categories"
                 :key="titleCategory.id"
                 :value="titleCategory.id"
        >
          {{titleCategory.title}}
        </option>
      </select>
    </div>
    <div class="form-control" :class="{invalid: iError}">
      <label for="title">Ссылка на изображение продукта</label>
      <input type="text" id="img" v-model="img" @blur="iBlur">
      <small v-if="iError">{{iError}}</small>
    </div>
    <div class="form-control" :class="{invalid: countError}">
      <label for="count">Количество продукта</label>
      <input type="number" id="count" v-model="count" @blur="countBlur">
      <small v-if="countError">{{countError}}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="price">Цена продукта</label>
      <input type="number" id="price" v-model="price" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <button class="button btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import {useStore} from 'vuex'
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export default {
  props: ['categories'],
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()
    const {isSubmitting, handleSubmit} = useForm()

    const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
        'title',
        yup.string()
            .trim()
            .required('Введите название товара')
    )

    const {value: category} = useField('category')

    const {value: img, errorMessage: iError, handleBlur: iBlur} = useField(
        'img',
        yup.string()
            .trim()
            .required('Введите ссылку на изображение продукта')
    )

    const MIN_AMOUNT = 0
    const {value: count, errorMessage: countError, handleBlur: countBlur} = useField(
        'count',
        yup.number()
            .typeError('Поле не может быть пустым')
            .required('Введите количество товара')
            .min(MIN_AMOUNT, `Количество товара не может быть меньше ${MIN_AMOUNT}`)
    )

    const {value: price, errorMessage: pError, handleBlur: pBlur} = useField(
        'price',
        yup.number()
            .typeError('Поле не может быть пустым')
            .required('Введите цену товара')
            .min(0, `Цена товара не может быть меньше 0`)
    )

    const onSubmit =  handleSubmit( async (values)=> {
      await store.dispatch('products/createProduct', values)
      emit('created')
    })

    return {
      isSubmitting,
      onSubmit,
      title,
      tError,
      tBlur,
      img,
      iError,
      iBlur,
      category,
      count,
      countError,
      countBlur,
      price,
      pError,
      pBlur,

    }
  }

}
</script>

<style scoped>
.btn {
  font-size: 12px;
}
</style>