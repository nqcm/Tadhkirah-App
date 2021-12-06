<template>
  <section>
    <add-record-button></add-record-button>
    <record-filter @filter="filterRecords"></record-filter>
    <transition name="list">
      <component :is="selectedTab"></component>
    </transition>

    <!-- <all-records v-if="selectedTab === 'all'"></all-records>
    <todays-records v-if="selectedTab === 'today'"></todays-records> -->
  </section>
</template>

<script>
import AddRecordButton from './AddRecordButton.vue';

import RecordFilter from './RecordFilter.vue';
import AllRecords from './AllRecords.vue';
import DueRecords from './DueRecords.vue';
export default {
  name: 'RecordsList',
  components: {
    RecordFilter,
    AllRecords,
    DueRecords,
    AddRecordButton,
  },
  data() {
    return {
      selectedTab: 'all-records',
    };
  },

  methods: {
    filterRecords(selection) {
      this.selectedTab = selection;
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

.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-enter-active {
  transition: all 0.3s ease-out;
}
.list-leave-active {
  transition: all 0.3s ease-in;
}
.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>