<template>
  <add-record v-if="dialogOpen" @close="closeDialog"></add-record>
  <div class="add-record">
    <base-button @click="openDialog">Add a new Record</base-button>
  </div>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';
import AddRecord from './AddRecord.vue';
export default {
  name: 'AddRecordButton',
  components: {
    AddRecord,
    BaseButton,
  },
  data() {
    return {
      dialogOpen: false,
    };
  },
  methods: {
    openDialog() {
      this.dialogOpen = true;
    },
    closeDialog() {
      this.dialogOpen = false;
    },
  },
};
</script>

<style scoped>
.add-record {
  margin: 5rem auto;
  width: 50%;
  display: flex;
  justify-content: center;
}
</style>