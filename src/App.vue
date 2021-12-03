<template>
  <div>
    <the-header></the-header>
    <add-record-button></add-record-button>
    <!-- <records-list></records-list> -->
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import AddRecordButton from './components/records/AddRecordButton.vue';
// import RecordsList from './components/records/RecordsList.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    AddRecordButton,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
  background-color: #f5efe8;
}
</style>
