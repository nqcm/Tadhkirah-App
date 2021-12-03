<template>
  <base-modal :show="true">
    <template v-slot:header>
      <h3>Are you sure you want to delete this record?</h3>
    </template>
    <template v-slot:footer>
      <base-button @click="$emit('close')">Cancel</base-button>
      <base-button @click="$emit('delete')">Delete</base-button>
    </template>
  </base-modal>
</template>

<script>
export default {
  name: 'DeleteWarning',
  emits: ['close', 'delete'],
};
</script>



