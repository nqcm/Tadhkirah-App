<template>
  <button :class="colorClass">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: ['mode'],
  computed: {
    colorClass() {
      return this.mode == 'red' ? 'red' : 'gold'
    },
  },
}
</script>

<style scoped>
button {
  @apply sm:text-lg md:text-xl;
}

.gold {
  @apply text-gold;
}

.red {
  @apply text-red;
}
</style>