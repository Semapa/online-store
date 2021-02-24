<template>
  <div class="card">

    <table class="table">
      <thead>
        <tr>
          <th>
            <div class="card-title">
              <h1 class="card-title">Категории</h1>
              <button class="btn primary">Добавить</button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="item">
          <td>Овощи</td>
          <td>
            <div class="btn danger">Удалить</div>
          </td>
        </tr>
        <tr class="item">
          <td>Фрукты</td>
          <td>
            <div class="btn danger">Удалить</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AdminCategories'
}
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-around;
}
.btn {
  font-size: 12px;
}
</style>