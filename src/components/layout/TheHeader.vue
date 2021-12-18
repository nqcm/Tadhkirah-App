<template>
  <header>
    <nav>
      <div class="back-arrow">
        <a href="#">
          <img :src="require('@/assets/icons/arrow-left-solid.svg')" alt="" />
        </a>
      </div>
      <div>
        <ul>
          <li>
            {{ email }}
          </li>
          <li @click="$emit('logout')">Logout</li>
        </ul>
      </div>
    </nav>
    <section class="logo">
      <div class="logo-image">
        <img :src="require('@/assets/images/logo-graphic.png')" alt="" />
      </div>
      <div class="logo-text">
        <img :src="require('@/assets/images/tadhkirah.svg')" alt="" />
      </div>
    </section>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  emits: ['logout'],
  props: ['email'],
}
</script>

<style scoped>
header {
  @apply w-full flex flex-col justify-center items-center bg-transparent;
}

header nav {
  @apply w-full sm:w-10/12 py-10 xl:py-14 flex justify-around sm:justify-between items-center;
}

.back-arrow {
  @apply w-4 sm:w-5 xl:w-8;
}

header ul {
  @apply flex justify-center items-center;
}

li {
  @apply my-0 ml-4 sm:ml-10 text-gold text-xs sm:text-base xl:text-xl;
}

.logo {
  @apply flex flex-col items-center xl:-mt-28;
}

.logo-image {
  @apply w-60 sm:w-72 xl:w-80;
}

.logo-text {
  @apply w-40 lg:w-48 xl:w-60 mt-3;
}
/* header {
  width: 100%;
  height: 5rem;
  background-color: #2074a8;
  display: flex;
  justify-content: center;
  align-items: center;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
}
h1 {
  color: white;
  margin: 0;
  font-size: 2rem;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
} */
</style>