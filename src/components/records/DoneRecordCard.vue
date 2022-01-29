<template>
  <article class="card custom">
    <header class="card-header">
      <h2>{{ name }}</h2>
    </header>

    <div class="details">
      <div class="text">
        <p>Next repeat on</p>
        <h2>{{ dueDate }}</h2>
      </div>
      <base-badge :level="level" class="badge"></base-badge>
    </div>
  </article>
</template>

<script>
export default {
  name: 'DoneRecordCard',
  props: ['name', 'dueDate', 'level'],
}
</script>

<style scoped>
.card {
  @apply bg-grey-cards
          text-white
          rounded-3xl
          w-60
          h-56
          p-6
          flex
          flex-col;
}

.custom {
  box-shadow: -0.5rem 0.5rem 1rem rgba(0, 0, 0, 0.7);
  transition: 0.2s;
}

.custom:hover {
  transform: translateY(-1rem);
}

.custom:hover ~ .custom {
  transform: translateX(130px);
}

.custom:not(:first-child) {
  margin-left: -130px;
}

.card-header h2 {
  @apply text-2xl font-semibold mt-6 mb-4;
}

.details {
  @apply flex justify-around mt-4;
}

.text p {
  @apply text-sm italic font-light;
}

.text h2 {
  @apply text-xl mt-1;
}

.badge {
  @apply ml-4;
}
</style>