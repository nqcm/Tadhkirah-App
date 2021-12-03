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
        :todaysRec="false"
      >
      </single-record-card>
    </div>
  </section>
</template>

<script>
import SingleRecordCard from './SingleRecordCard.vue';
export default {
  name: 'TodaysRecords',
  components: {
    SingleRecordCard,
  },

  computed: {
    filteredRecords() {
      return this.$store.getters.doneRecords;
    },
    hasRecords() {
      return this.$store.getters.doneHasRecords;
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