<template>
  <span class="level-container">
    <!-- <h4>LEVEL</h4> -->
    <h3>{{ level }}</h3>
  </span>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: ['level'],
};
</script>

<style scoped>
span {
  background-color: #2074a8;
  width: 100px;
  border-radius: 25px;
}

span h3 {
  color: #fff;
  text-align: center;
  font-size: 1.25rem;
  margin: 0.5rem 0;
}
</style>
