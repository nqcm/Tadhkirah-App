<template>
  <div class="empty-image">
    <img :src="require('@/assets/images/empty.png')" alt="" />
    <h3>{{ text }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Empty',
  props: ['text'],
}
</script>

<style scoped>
.empty-image {
  @apply flex
          flex-col
          justify-center
          items-center
          h-auto;
}

.empty-image img {
  @apply w-1/2
          lg:w-1/3
          mt-16
          md:mt-20
          lg:mt-40;
}

.empty-image h3 {
  @apply text-gold
          sm:text-lg
          md:text-2xl
          xl:text-3xl
          mb-20
          md:mb-24
          lg:mb-32;
}
</style>