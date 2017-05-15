<template>
  <section id="notifications">
    <h3>No Notifications</h3>
    <img src="../assets/no-notifications.png"/>
  </section>
</template>

<script>
export default {
  name: 'notifications',
};
</script>

<style scoped>
#notifications {
  background: #F2EEF5;
  border-right: 1px solid #DBC9EA;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 70px;
}
h3 {
  color: #bfaad2;
  font-weight: normal;
}
</style>
