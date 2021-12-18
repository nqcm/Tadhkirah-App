<template>
  <section>
    <div class="btn-container">
      <!-- <add-record-button></add-record-button> -->
      <record-filter
        :selection="selectedTab"
        @filter="filterRecords"
      ></record-filter>
      <add-record-button @click="openDialog"></add-record-button>
    </div>
    <transition name="list">
      <component :is="selectedTab"></component>
    </transition>

    <add-record v-if="dialogOpen" @close="closeDialog"></add-record>

    <!-- <all-records v-if="selectedTab === 'all'"></all-records>
    <todays-records v-if="selectedTab === 'today'"></todays-records> -->
  </section>
</template>

<script>
import AddRecordButton from './AddRecordButton.vue'
import AddRecord from './AddRecord.vue'

import RecordFilter from './RecordFilter.vue'
import AllRecords from './AllRecords.vue'
import DueRecords from './DueRecords.vue'
export default {
  name: 'RecordsList',
  components: {
    RecordFilter,
    AllRecords,
    DueRecords,
    AddRecordButton,
    AddRecord,
  },
  data() {
    return {
      selectedTab: 'due-records',
      dialogOpen: false,
    }
  },
  methods: {
    filterRecords(selection) {
      this.selectedTab = selection
    },
    openDialog() {
      this.dialogOpen = true
    },
    closeDialog() {
      this.dialogOpen = false
    },
  },
}
</script>

<style scoped>
.btn-container {
  @apply sm:w-10/12 xl:w-9/12 my-10 sm:my-14 lg:my-16 mx-2 sm:mx-auto flex justify-between items-center;
}
/* section {
  margin-top: 10rem;
  padding: 0;
  margin: auto;
  max-width: 40rem;
} */

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