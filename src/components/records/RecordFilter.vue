<template>
  <div>
    <base-button :mode="todaysButtonClass" @click="selectToday"
      >Today's Revision</base-button
    >
    <base-button :mode="allButtonClass" @click="selectAll">All</base-button>
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