<template>
  <div>
    <edit-record
      :key="id"
      :show="editDialogOpen"
      :id="id"
      @close="closeDialog"
    ></edit-record>
    <article class="rec-box">
      <div class="badge">
        <base-badge :level="rec.level"></base-badge>
      </div>
      <div class="text">
        <h2>{{ rec.name }}</h2>
        <p>Next on {{ rec.dueDate }}</p>
      </div>
      <div class="btn">
        <base-button @click="openDialog">Edit</base-button>
      </div>
    </article>
  </div>
</template>


<script>
import EditRecord from './EditRecord.vue'
export default {
  name: 'AllRecordsSingleCard',
  components: {
    EditRecord,
  },
  props: ['id'],
  data() {
    return {
      editDialogOpen: false,
      rec: {},
    }
  },
  created() {
    this.rec = this.$store.getters.records.find((r) => r.id === this.id)
  },

  methods: {
    openDialog() {
      this.editDialogOpen = true
    },
    closeDialog() {
      this.editDialogOpen = false
      this.rec = this.$store.getters.records.find((r) => r.id === this.id)
    },
  },
}
</script>

<style scoped>
.rec-box {
  @apply bg-grey-light
        w-80
        sm:w-auto        
        flex
        justify-between
        items-center
        mx-auto
        sm:mx-2
        md:mx-0
        mb-2
        md:pl-2
        py-4
        rounded-md
        md:rounded-lg;
}

.badge {
  @apply w-1/5;
}

.text {
  @apply w-3/5 md:w-1/2 flex flex-col justify-start;
}

h2 {
  @apply text-white font-semibold text-lg;
}

p {
  @apply text-white font-light text-xs lg:text-sm italic mt-1;
}

.btn {
  @apply w-1/5;
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