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
  @apply mx-4
          w-14 
          h-14
          border-3 
          rounded-full 
          border-red 
          flex 
          flex-col 
          justify-center 
          items-center
          cursor-pointer;
}

.circle img {
  @apply w-7;
}
</style>