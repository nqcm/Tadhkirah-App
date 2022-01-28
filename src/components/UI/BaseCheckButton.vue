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
  @apply mx-4
          w-14
          h-14
          border-3
          rounded-full 
          border-green
          flex
          flex-col
          justify-center
          items-center
          cursor-pointer;
}

.circle img {
  @apply w-8;
}
</style>