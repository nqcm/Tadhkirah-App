<template>
  <the-header :email="email" @logout="logout"></the-header>

  <section>
    <div class="nav">
      <record-filter
        :selection="selectedTab"
        @filter="filterRecords"
      ></record-filter>
      <add-record-button @click="openDialog"></add-record-button>
    </div>

    <transition name="list">
      <component v-if="!isLoading" :is="selectedTab"></component>
    </transition>

    <add-record v-if="dialogOpen" @close="closeDialog"></add-record>
  </section>
</template>

<script>
// import { onAuthStateChanged } from 'firebase/auth'
import { getUserState } from '../firebase'

import TheHeader from '../components/layout/TheHeader.vue'

import RecordFilter from '../components/records/RecordFilter.vue'
import AddRecordButton from '../components/records/AddRecordButton.vue'
import AllRecords from '../components/records/AllRecords.vue'
import DueRecords from '../components/records/DueRecords.vue'
import AddRecord from '../components/records/AddRecord.vue'

export default {
  name: 'Home',
  components: {
    TheHeader,
    RecordFilter,
    AddRecordButton,
    AllRecords,
    DueRecords,
    AddRecord,
  },

  data() {
    return {
      selectedTab: 'all-records',
      dialogOpen: false,
      email: '',
      isLoading: false,
    }
  },

  mounted() {
    this.isAuth()
    //   (auth, (user) => {
    //   if (user) {
    //     this.$store.dispatch('setUser', user.uid)
    //     this.email = user.email
    //   } else {
    //     this.$router.replace('/login')
    //   }
    // })
  },

  methods: {
    async isAuth() {
      this.isLoading = true
      const user = await getUserState()
      if (user) {
        this.$store.dispatch('setUser', user.uid)
        this.email = user.email
        this.isLoading = false
      } else {
        this.$router.replace('/login')
      }
    },
    async logout() {
      this.email = ''
      try {
        await this.$store.dispatch('logout')
        this.$router.replace('/login')
      } catch (error) {
        console.error(error)
      }
    },

    filterRecords(selection) {
      this.selectedTab = selection
    },
    openDialog() {
      this.dialogOpen = true
    },
    closeDialog() {
      this.dialogOpen = false
    },
  },
}
</script>

<style scoped>
.nav {
  @apply w-11/12 lg:w-10/12 2xl:max-w-screen-2xl mt-10 sm:mt-14 lg:mt-16 mx-auto flex justify-between items-center;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-enter-active {
  transition: all 0.3s ease-out;
}
.list-leave-active {
  transition: all 0.3s ease-in;
}
.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>