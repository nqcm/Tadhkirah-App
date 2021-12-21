<template>
  <div class="level-container">
    <!-- <h4>LEVEL</h4> -->
    <h3>{{ level }}</h3>
  </div>
</template>

<script>
export default {
  name: 'BaseBadge',
  props: ['level'],
}
</script>

<style scoped>
.level-container {
  @apply m-auto w-10 md:w-14 h-10 md:h-14 border-2 md:border-2 text-gold rounded-full border-gold flex flex-col justify-center items-center;
}

h3 {
  @apply text-xl md:text-3xl text-center font-bold;
}

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
