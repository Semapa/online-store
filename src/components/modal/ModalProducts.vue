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
          <option value="yabloki">Яблоки</option>
          <option value="ogurcy">Огурцы</option>
        </select>
      </div>

    <div class="form-control" :class="{invalid: aError}">
      <label for="amount">Количество продукта</label>
      <input type="number" id="amount" v-model="amount" @blur="aBlur">
      <small v-if="aError">{{aError}}</small>
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
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export default {
  setup() {
    const {isSubmitting, handleSubmit} = useForm()

    const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
        'title',
        yup.string()
            .trim()
            .required('Введите название товара')
    )

    const {value: category} = useField('category')

    const MIN_AMOUNT = 0
    const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField(
        'amount',
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
      console.log('onSubmit', values)
    })

    return {
      isSubmitting,
      onSubmit,
      title,
      tError,
      tBlur,
      category,
      amount,
      aError,
      aBlur,
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>