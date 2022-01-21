<template>
  <div class="circle">
    <img :src="require('@/assets/icons/undo-alt-solid.svg')" alt="" />
  </div>
</template>

<script>
export default {
  name: 'BaseRedoButton',
}
</script>

<style scoped>
.circle {
  @apply m-auto 
          w-12 md:w-16 
          h-12 md:h-16 
          border-4 
          rounded-full 
          border-red 
          flex 
          flex-col 
          justify-center 
          items-center
          cursor-pointer;
}

.circle img {
  @apply w-5 md:w-8;
}
</style>