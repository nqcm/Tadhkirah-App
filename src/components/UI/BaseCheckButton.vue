<template>
  <div class="circle">
    <img :src="require('@/assets/icons/check-solid.svg')" alt="" />
  </div>
</template>

<script>
export default {
  name: 'BaseCheckButton',
}
</script>

<style scoped>
.circle {
  @apply m-auto
          w-12 md:w-16
          h-12 md:h-16
          border-4
          rounded-full 
          border-green
          flex
          flex-col
          justify-center
          items-center
          cursor-pointer;
}

.circle img {
  @apply w-6 md:w-10;
}
</style>