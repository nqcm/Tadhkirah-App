<template>
  <section>
    <div class="container">
      <div v-if="todayHasRecords">
        <single-record-card
          v-for="record in filteredRecords"
          :key="record.id"
          :id="record.id"
        >
        </single-record-card>
      </div>
      <!-- <div v-else class="empty-image">
        <img :src="require('@/assets/images/empty.png')" alt="" />
        <h3>You are all caught up!</h3>
      </div> -->
      <empty v-else-if="hasRecords" text="You are all caught up!"></empty>
      <empty v-else text="No records found!"></empty>
    </div>

    <div>
      <h3>Today's Done Records</h3>
      <done-records></done-records>
    </div>
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
            mx-auto
            md:mt-2
            pt-2
            pb-2
            md:rounded-xl;
}
</style>