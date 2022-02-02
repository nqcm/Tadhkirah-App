<template>
  <section>
    <div class="container">
      <div>
        <div v-if="hasRecords" class="card-container">
          <all-records-single-card
            v-for="record in filteredRecords"
            :key="record.id"
            :id="record.id"
          >
          </all-records-single-card>
        </div>

        <empty v-else text="No records found!"></empty>
      </div>
    </div>
    <done-records></done-records>
    <teleport to="#dialog">
      <transition name="modal">
        <base-modal :show="!!error" @close="error = false">
          <template v-slot:header>
            <h3>{{ error }}</h3>
          </template>
        </base-modal>
      </transition>
    </teleport>
  </section>
</template>

<script>
import AllRecordsSingleCard from './AllRecordsSingleCard.vue'
import DoneRecords from './DoneRecords.vue'
import Empty from './Empty.vue'

export default {
  name: 'AllRecords',
  components: {
    AllRecordsSingleCard,
    DoneRecords,
    Empty,
  },
  data() {
    return {
      isLoading: true,
      error: null,
    }
  },

  computed: {
    filteredRecords() {
      return this.$store.getters.records
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
            pb-1
            rounded-xl;
}

.card-container {
  @apply mx-2
          grid
          grid-cols-1 md:grid-cols-2 xl:grid-cols-3
          gap-x-2 lg:gap-x-3
          gap-y-0 lg:gap-y-3;
}
</style>