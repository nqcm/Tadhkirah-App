<template>
  <AddRecord></AddRecord>
</template>

<script>
import AddRecord from "./components/AddRecord.vue";

export default {
  name: "App",
  components: {
    AddRecord,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
