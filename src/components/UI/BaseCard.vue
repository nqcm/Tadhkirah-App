<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: ['showAlert'],
}
</script>

<style scoped>
.card {
  @apply bg-grey-cards
        text-white
          rounded-2xl
          max-w-xs
          h-96
          m-auto
          my-4
          p-4
          shadow-md;
}

/* .alert {
  outline: 0.2rem solid rgb(250, 82, 110);
  outline: none;
  @apply shadow-xl;
} */

/* .normal {
  outline: none;
} */
</style>