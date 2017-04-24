<template>
  <div class="hello">
    <h1>Welcome to Simtoi</h1>
    <img src="http://placehold.it/500x350">
  </div>
</template>

<script>
export default {
  name: 'home',
  created() {
    this.$emit('toggleView', 'withSidebar');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
