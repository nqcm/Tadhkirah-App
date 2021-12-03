<template>
  <section>
    <div v-if="hasRecords">
      <single-record-card
        v-for="record in filteredRecords"
        :key="record.id"
        :id="record.id"
        :name="record.name"
        :description="record.description"
        :level="record.level"
        :dueDate="record.dueDate"
      >
      </single-record-card>
    </div>
    <h3 v-else>No records found</h3>
    <div>
      <h3>Today's Done Records</h3>
      <done-records></done-records>
    </div>
  </section>
</template>

<script>
import SingleRecordCard from './SingleRecordCard.vue';
import DoneRecords from './DoneRecords.vue';
export default {
  name: 'DueRecords',
  components: {
    SingleRecordCard,
    DoneRecords,
  },

  computed: {
    filteredRecords() {
      return this.$store.getters.todaysRecords;
    },
    hasRecords() {
      return this.$store.getters.todayHasRecords;
    },
  },
};
</script>

<style scoped>
section {
  margin-top: 10rem;
  padding: 0;
  margin: auto;
  max-width: 40rem;
}
</style>