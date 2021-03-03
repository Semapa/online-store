<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: cError}">
      <label for="title">Новое название категории</label>
      <input type="text" id="title" v-model="title" @blur="cBlur">
      <small v-if="cError">{{cError}}</small>
    </div>
    <button class="button btn primary" :disabled="isSubmitting">Изменить</button>
  </form>
</template>

<script>
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export default {
  emits: ['updated'],
  setup(_, {emit}) {
    const {isSubmitting, handleSubmit} = useForm()

    const {value: title, errorMessage: cError, handleBlur: cBlur} = useField(
        'title',
        yup.string()
            .trim()
            .required('Введите новое название категории')
    )
    const onSubmit =  handleSubmit(  ()=> {
      emit('updated', title.value)
    })

    return {
      isSubmitting,
      onSubmit,
      cError,
      cBlur,
      title
    }
  }

}
</script>

<style scoped>
.btn {
  font-size: 12px;
}
</style>