<template>
  <div class="card" :class="showAlert">
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
          rounded-4xl
          w-cw
          h-ch
          m-auto
          my-4
          p-4
          shadow-md;
}

.alert {
  /* outline: 0.2rem solid rgb(250, 82, 110); */
}

.normal {
  outline: none;
}
</style>