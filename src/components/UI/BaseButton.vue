<template>
  <button>
    <span :class="mode">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: ['mode'],
}
</script>

<style scoped>
button {
  @apply py-0.5 sm:py-2 md:py-3 lg:py-4 px-2 sm:px-4 md:px-5 lg:px-6 sm:text-lg md:text-2xl lg:text-3xl text-gold cursor-pointer;
}

.active {
  @apply border-b-4 lg:border-b-8;
}
</style>