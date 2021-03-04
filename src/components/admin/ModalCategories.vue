<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: cError}">
      <label for="title">Название новой категории</label>
      <input type="text" id="title" v-model="title" @blur="cBlur">
      <small v-if="cError">{{cError}}</small>
    </div>
    <button class="button btn primary" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'
import {useStore} from 'vuex'

export default {
  emits: ['created'],
  setup(_, {emit}) {
    const store = useStore()
    const {isSubmitting, handleSubmit} = useForm()

    const {value: title, errorMessage: cError, handleBlur: cBlur} = useField(
        'title',
        yup.string()
          .trim()
          .required('Введите название новой категории')
    )

    const onSubmit =  handleSubmit( async (values)=> {
      await store.dispatch('categories/createCategory', values)
      emit('created')
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