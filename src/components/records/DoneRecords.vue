<template>
  <section>
    <!-- <div v-if="hasRecords">
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
    </div> -->

    <h3>Recently revised</h3>

    <div class="divider"></div>

    <div v-if="hasRecords" class="card-list">
      <done-record-card
        v-for="record in filteredRecords"
        :key="record.id"
        :name="record.name"
        :dueDate="record.dueDate"
        :level="record.level"
      ></done-record-card>
    </div>
  </section>
</template>

<script>
// import SingleRecordCard from './SingleRecordCard.vue'
import DoneRecordCard from './DoneRecordCard.vue'
export default {
  name: 'TodaysRecords',
  components: {
    DoneRecordCard,
  },

  computed: {
    filteredRecords() {
      return this.$store.getters.doneRecords
    },
    hasRecords() {
      return this.$store.getters.doneHasRecords
    },
  },
}
</script>

<style scoped>
section {
  @apply hidden md:block
          w-10/12
          mx-auto
          my-2
          p-4;
}

h3 {
  @apply text-gold text-lg ml-4;
}

.divider {
  @apply h-px bg-gold ml-3 mt-2;
}

.card-list {
  @apply flex p-6 overflow-hidden;
}
</style>