<template>
  <div class="single-rec-card">
    <edit-record
      :key="id"
      :show="editDialogOpen"
      :id="id"
      @close="closeDialog"
    ></edit-record>

    <base-card :class="isOverdue ? 'alert' : 'normal'">
      <base-badge :level="rec.level"></base-badge>
      <header class="single-rec-header">
        <h2>{{ rec.name }}</h2>
      </header>
      <p>{{ rec.description }}</p>
      <nav class="single-rec-nav">
        <base-button @click="openDialog">Edit</base-button>
        <base-button v-if="isTodaysRec || isOverdue" @click="markDone">{{
          doneButtonText
        }}</base-button>
        <base-button v-if="isTodaysRec || isOverdue" @click="makeLevelOne">{{
          levelOneButtonText
        }}</base-button>
      </nav>
    </base-card>
  </div>
</template>


<script>
import { DateTime } from 'luxon'

import EditRecord from './EditRecord.vue'

export default {
  name: 'SingleRecordCard',
  components: {
    EditRecord,
  },
  props: ['id'],
  data() {
    return {
      isDoneSaving: false,
      isLevelOneSaving: false,
      editDialogOpen: false,
      rec: {},
    }
  },
  created() {
    this.rec = this.$store.getters.records.find((r) => r.id === this.id)
  },

  computed: {
    isTodaysRec() {
      const today = DateTime.now().toISO().split('T')[0]
      return this.rec.dueDate === today ? true : false
    },
    isOverdue() {
      const today = DateTime.now()
      const date = DateTime.fromISO(this.rec.dueDate)
      if (date < today && date.startOf('day') < today.startOf('day')) {
        return true
      } else {
        return false
      }
    },
    doneButtonText() {
      return this.isDoneSaving ? 'Saving...' : 'Done'
    },
    levelOneButtonText() {
      return this.isLevelOneSaving ? 'Saving...' : 'Back to Level 1'
    },
  },

  methods: {
    openDialog() {
      this.editDialogOpen = true
    },
    closeDialog() {
      this.editDialogOpen = false
      this.rec = this.$store.getters.records.find((r) => r.id === this.id)
    },
    async makeLevelOne() {
      this.isLevelOneSaving = true

      await this.$store.dispatch('makeLevelOne', this.rec.id)
      this.rec = this.$store.getters.records.find((r) => r.id === this.id)
      this.isLevelOneSaving = false
    },
    async markDone() {
      this.isDoneSaving = true
      await this.$store.dispatch('markRecDone', this.rec.id)
      this.rec = this.$store.getters.records.find((r) => r.id === this.id)
      this.isDoneSaving = false
    },
  },
}
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
</style>