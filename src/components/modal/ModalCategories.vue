<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: cError}">
      <label for="category">Название новой категории</label>
      <input type="text" id="category" v-model="category" @blur="cBlur">
      <small v-if="cError">{{cError}}</small>
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

    const {value: category, errorMessage: cError, handleBlur: cBlur} = useField(
        'category',
        yup.string()
          .trim()
          .required('Введите название новой категории')
    )
    const onSubmit =  handleSubmit( async (values)=> {
      console.log('onSubmit', values)
    })

    return {
      isSubmitting,
      onSubmit,
      cError,
      cBlur,
      category
    }
  }

}
</script>

<style scoped>
.btn {
  font-size: 12px;
}
</style>