<template>
  <div>
    <teleport to="#dialog">
      <transition name="modal">
        <base-modal :show="!!error" @close="error = false">
          <template v-slot:header>
            <h3>{{ error }}</h3>
          </template>
        </base-modal>
      </transition>
    </teleport>
    <section>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <div v-else-if="hasRecords">
        <single-record-card
          v-for="record in filteredRecords"
          :key="record.id"
          :id="record.id"
        >
        </single-record-card>
      </div>
      <h3 v-else>No records found</h3>
    </section>
  </div>
</template>

<script>
import SingleRecordCard from './SingleRecordCard.vue';
export default {
  name: 'AllRecords',
  components: {
    SingleRecordCard,
  },
  data() {
    return {
      isLoading: true,
      error: null,
    };
  },
  created() {
    this.loadRecords();
  },
  computed: {
    filteredRecords() {
      return this.$store.getters.records;
    },
    hasRecords() {
      return this.$store.getters.hasRecords;
    },
  },
  methods: {
    async loadRecords() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('loadRecords');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
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