<template>
  <section>
    <div class="container">
      <div class="card-container" v-if="todayHasRecords">
        <single-record-card
          v-for="record in filteredRecords"
          :key="record.id"
          :id="record.id"
        >
        </single-record-card>
      </div>

      <empty v-else-if="hasRecords" text="You are all caught up!"></empty>
      <empty v-else text="You don't have any records!"></empty>
    </div>

    <done-records></done-records>
  </section>
</template>

<script>
import SingleRecordCard from './SingleRecordCard.vue'
import DoneRecords from './DoneRecords.vue'
import Empty from './Empty.vue'

export default {
  name: 'DueRecords',
  components: {
    SingleRecordCard,
    DoneRecords,
    Empty,
  },

  computed: {
    filteredRecords() {
      return this.$store.getters.todaysRecords
    },
    todayHasRecords() {
      return this.$store.getters.todayHasRecords
    },
    hasRecords() {
      return this.$store.getters.hasRecords
    },
  },
}
</script>

<style scoped>
.container {
  @apply bg-grey-dark
            w-11/12 lg:w-10/12
            min-h-screen
            mx-auto
            md:mt-2
            pt-2
            pb-2
            md:rounded-xl;
}

.card-container {
  @apply m-auto
          px-2
          py-4
          grid
          gap-y-8
          md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4
          justify-items-center
          md:place-content-start;
}
</style>