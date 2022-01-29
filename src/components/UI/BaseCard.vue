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
          p-4
          shadow-md;
  /* mx-auto md:mx-0 md:ml-4
          my-4 md:my-8 */
}

.alert {
  /* outline: 0.2rem solid rgb(228, 107, 103); */
  box-shadow: rgba(228, 107, 103, 1) 0px 0px 0px 3px;
}

.normal {
  outline: none;
}
</style>