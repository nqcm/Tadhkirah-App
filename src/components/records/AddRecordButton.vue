<template>
  <div class="plus">
    <img :src="require('@/assets/icons/plus-solid.svg')" alt="" />
  </div>
</template>

<script>
export default {
  name: 'AddRecordButton',
}
</script>

<style scoped>
.plus {
  @apply w-9 sm:w-10 md:w-11 xl:w-12 px-2 cursor-pointer;
}
</style>