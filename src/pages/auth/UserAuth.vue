<template>
  <div class="container">
    <base-modal v-if="!!error" :show="true" @close="close">
      <template v-slot:header>
        <h3>{{ error }}</h3>
      </template>
    </base-modal>
    <base-button @click="login"><h3>Sign in with Google</h3> </base-button>
    <div class="spinner-bg" v-if="isLogginIn"></div>
    <base-spinner v-if="isLogginIn"></base-spinner>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      isLogginIn: false,
    };
  },

  methods: {
    async login() {
      try {
        this.isLogginIn = true;
        await this.$store.dispatch('login');
        this.isLogginIn = false;
        this.$router.replace('/');
      } catch (err) {
        this.error = err.message;
      }
    },
    close() {
      this.isLogginIn = false;

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

.spinner-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>