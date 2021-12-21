<template>
  <div class="main-div">
    <div class="btn-container">
      <button :class="todaysButtonClass" @click="selectToday">
        Today's Revision
      </button>
    </div>
    <div class="btn-container">
      <button :class="allButtonClass" @click="selectAll">All</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordFilter',
  props: ['selection'],
  emits: ['filter'],
  computed: {
    todaysButtonClass() {
      return this.selection == 'due-records' ? 'active' : ''
    },
    allButtonClass() {
      return this.selection == 'all-records' ? 'active' : ''
    },
  },
  methods: {
    selectAll() {
      this.$emit('filter', 'all-records')
    },
    selectToday() {
      this.$emit('filter', 'due-records')
    },
  },
}
</script>


<style scoped>
.main-div {
  @apply flex;
}

.btn-container {
  @apply py-0.5 sm:pt-2 md:pt-3 lg:pt-4 px-2 sm:pr-4 lg:pr-6;
}

button {
  @apply sm:text-lg md:text-2xl xl:text-3xl text-gold cursor-pointer;
}

.active {
  @apply border-b-4 xl:border-b-8;
}
</style>