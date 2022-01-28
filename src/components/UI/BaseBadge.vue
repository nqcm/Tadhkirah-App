<template>
  <div class="level-container">
    <!-- <h4>LEVEL</h4> -->
    <h3>{{ level }}</h3>
  </div>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: ['level'],
}
</script>

<style scoped>
.level-container {
  @apply w-12
          h-12          
          border-3
          text-gold
          rounded-full
          border-gold
          flex
          flex-col
          justify-center
          items-center;
}

h3 {
  @apply text-3xl
          text-center
          font-bold;
}
</style>
