<template>
  <div>
    <form @submit.prevent>
      <div>
        <label for="name">Name</label>
        <input v-model="name" type="text" placeholder="Name of Surah / Hizb / Portion" class="name" id="name">
      </div>
      
      <div>
        <label for="desc">Description (optional)</label>
        <input v-model="desc" type="text" placeholder="Notes or description for yourself" class="desc" id="desc">
      </div>

      <div>
        <label for="level">Choose a Level. Tip: Any portion with more than five mistakes go back to level 1</label>
        <select v-model="levelInput" name="level" id="level">
          <option v-for="level in levels" v-bind:key="level.key" v-bind:value="level.value">
            {{level.text}}
          </option>
        </select>
      </div>

      <div>
        <label for="date">Revision date</label>
        <input v-model="date" type="date" placeholder="Revision date" class="date" id="date">
      </div>

      <div>
        <input type="submit" class="submit" id="submit">  
      </div>
    </form>

    <div>
      <p>{{ name }} </p>
      <p>{{ desc }} </p>
      <p>{{ levelInput }} </p>
      <p>{{ String(date) }} </p>


    </div>
  </div>
  
</template>

<script>
export default {
  name: "AddRecord",
  
  data() {
    return {
      name: "",
      desc: "",
      levels: [
        {key: 1, text: "This works!", value: 1},
        {key: 2, text: "this also works!!", value: 2},
        {key: 3, text: "3", value: 3},
        {key: 4, text: "4", value: 4},
        {key: 5, text: "5", value: 5}
      ],
      date: ""
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
