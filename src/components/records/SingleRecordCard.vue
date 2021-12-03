<template>
  <div>
    <edit-record
      :show="editDialogOpen"
      :id="id"
      @close="closeDialog"
    ></edit-record>

    <base-card>
      <header class="single-rec-header" :class="isOverdue ? 'alert' : 'normal'">
        <h2>{{ name }}</h2>
        <h3>{{ id }}</h3>
        <base-badge :level="level"></base-badge>
      </header>
      <p>{{ description }}</p>
      <nav class="single-rec-nav">
        <base-button @click="openDialog">Edit</base-button>
        <base-button v-if="isTodaysRec || isOverdue" @click="markDone"
          >Done</base-button
        >
        <base-button v-if="isTodaysRec || isOverdue" @click="makeLevelOne"
          >Back to level 1</base-button
        >
      </nav>
    </base-card>
  </div>
</template>


<script>
import { DateTime } from 'luxon';

import EditRecord from './EditRecord.vue';

export default {
  name: 'SingleRecordCard',
  components: {
    EditRecord,
  },
  props: ['id', 'name', 'description', 'level', 'dueDate'],
  // props: ['record'],
  data() {
    return {
      editDialogOpen: false,
    };
  },

  computed: {
    isTodaysRec() {
      const today = DateTime.now().toISO().split('T')[0];
      return this.dueDate === today ? true : false;
    },
    isOverdue() {
      const today = DateTime.now();
      const date = DateTime.fromISO(this.dueDate);
      if (date < today && date.startOf('day') < today.startOf('day')) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    openDialog() {
      this.editDialogOpen = true;
    },
    closeDialog() {
      this.editDialogOpen = false;
    },
    makeLevelOne() {
      this.$store.dispatch('makeLevelOne', this.id);
    },
    markDone() {
      this.$store.dispatch('markRecDone', this.id);
    },
  },
};
</script>

<style>
.single-rec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.single-rec-header h2 {
  font-size: 2rem;
  margin: 0.5rem 0;
}

.single-rec-header p {
  margin: 0.5rem 0;
}

.single-rec-nav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.5s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.normal {
  background-color: blueviolet;
}

.alert {
  background-color: brown;
}
</style>