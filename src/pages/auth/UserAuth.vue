<template>
  <div class="container">
    <base-modal v-if="!!error" :show="true" @close="close">
      <template v-slot:header>
        <h3>{{ error }}</h3>
      </template>
    </base-modal>
    <base-button @click="login"><h3>Sign in with Google</h3> </base-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
    };
  },

  methods: {
    async login() {
      try {
        await this.$store.dispatch('login');
        this.$router.replace('/');
      } catch (err) {
        this.error = err.message;
      }
    },
    close() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
.signin {
  width: 10%;
  height: 5rem;
  margin: 5rem auto;
  padding: 1rem 2rem;
  background-color: royalblue;
  color: white;
}

.container {
  width: 80%;
  margin: 5rem auto;
}
</style>