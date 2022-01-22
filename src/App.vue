<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from './firebase'

// export default {
//   name: 'App',
//   data() {
//     return {
//       email: '',
//     }
//   },
// mounted() {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       this.$store.dispatch('setUser', user.uid)
//       this.email = user.email
//     }
//   })
// },

//   methods: {
//     async logout() {
//       this.email = ''
//       try {
//         await this.$store.dispatch('logout')
//         this.$router.replace('/login')
//       } catch (error) {
//         console.log(error)
//       }
//     },
//   },
// }
</script>

<style>
body {
  @apply bg-grey-medium;
}
</style>
