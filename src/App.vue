<template>
  <div>
    <the-header @logout="logout"></the-header>

    <!-- <records-list></records-list> -->
    <router-view></router-view>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TheHeader from './components/layout/TheHeader.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
  },
  mounted() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.$store.dispatch('setUser', user.uid);
      }
    });
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout');
        this.$router.replace('/login');
      } catch (error) {
        console.log(error);
      }
    },
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
