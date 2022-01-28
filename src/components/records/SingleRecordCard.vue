<template>
  <article>
    <edit-record
      :key="id"
      :show="editDialogOpen"
      :id="id"
      @close="closeDialog"
    ></edit-record>

    <base-card :class="isOverdue ? 'alert' : 'normal'">
      <div class="content">
        <header class="badge">
          <base-badge :level="rec.level"></base-badge>
        </header>

        <div class="text" @click="openDialog">
          <h2>{{ rec.name }}</h2>
          <p>{{ rec.description }}</p>
        </div>

        <div class="small-text">
          <p>
            <span>Total Revisions</span>
            {{ rec.counter }}
          </p>
          <hr class="line" />
        </div>

        <div class="nav">
          <base-redo-button @click="makeLevelOne"></base-redo-button>
          <base-check-button @click="markDone"></base-check-button>
        </div>
      </div>
    </base-card>
  </article>
</template>


<script>
import { DateTime } from 'luxon'

import EditRecord from './EditRecord.vue'
import BaseCheckButton from '../UI/BaseCheckButton.vue'
import BaseRedoButton from '../UI/BaseRedoButton.vue'

export default {
  name: 'SingleRecordCard',
  components: {
    EditRecord,
    BaseCheckButton,
    BaseRedoButton,
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
.content {
  @apply h-full
          pt-2
          pb-4
          px-5
          flex
          flex-col
          justify-between;
}

.badge {
  @apply flex-none ml-2;
}

.text {
  @apply flex-grow cursor-pointer my-4;
}

.text h2 {
  @apply text-2xl font-semibold mb-4;
}

.text p {
  @apply text-white text-opacity-70;
}

.small-text {
  @apply my-8;
}

.small-text p {
  @apply font-normal text-white text-opacity-70 mb-2;
}

.small-text span {
  @apply italic font-light;
}

.line {
  border: 0;
  height: 2px;
  background: #fff;
  opacity: 0.2;
}

.nav {
  @apply flex-none flex flex-row justify-center;
}

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