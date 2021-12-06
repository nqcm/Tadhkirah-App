<template>
  <header>
    <nav>
      <h1>Tadhkirah</h1>
      <ul>
        <li>
          <span>{{ email }}</span>
          <span @click="$emit('logout')">Logout</span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  emits: ['logout'],
  props: ['email'],
};
</script>

<style scoped>
header {
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
}
</style>