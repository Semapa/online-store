<template>
  <the-auth-form/>
</template>

<script>
//всю логику перенесли в отдельный файл и получаем оттуда объект
import TheAuthForm from '../components/TheAuthForm'

export default {
  components: {TheAuthForm}
}
</script>

<style scoped>

</style>