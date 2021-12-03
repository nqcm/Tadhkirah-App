<template>
  <base-card>
    <base-button @click="selectAll">All</base-button>
    <base-button @click="selectToday">Today's Revision</base-button>
  </base-card>
</template>

<script>
export default {
  name: 'RecordFilter',
  emits: ['filter'],
  methods: {
    selectAll() {
      this.$emit('filter', 'all-records');
    },
    selectToday() {
      this.$emit('filter', 'due-records');
    },
  },
};
</script>