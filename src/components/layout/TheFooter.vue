<template>
  <section class="footer">
    <h2>
      This website has been created by
      <a href="https://naveeraashraf.com">Naveera Ashraf</a> as a side project.
      You are free to use this app but its continuity is not guaranteed.
    </h2>
    <p>&copy; {{ date }} tadhkirah.com</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    }
  },
}
</script>

<style scoped>
.footer {
  @apply text-white
            text-xs
            my-4
            mx-auto
            p-6
            flex
            flex-col
            justify-center
            items-center
            text-center
            border-t-4
            border-grey-dark;
}

a {
  @apply text-gold;
}
</style>