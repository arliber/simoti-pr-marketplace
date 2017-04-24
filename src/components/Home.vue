<template>
  <div class="welcome">
    <img src="../assets/welcome.jpg" width="50%" height="50%">
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

<style scoped>
.welcome {
  display: flex;
  justify-content: center;
}
</style>
