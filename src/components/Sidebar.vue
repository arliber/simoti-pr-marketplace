<template>
  <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1"><i class="el-icon-menu"></i>Opportunities</el-menu-item>
      <el-menu-item index="2"><i class="el-icon-document"></i>Suggested articles</el-menu-item>
      <el-menu-item index="3"><i class="el-icon-setting"></i>Settings</el-menu-item>
  </el-menu>
</template>

<script>
import auth from '../services/auth';

export default {
  name: 'sidebar',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isUserLoggedin;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    logout() {
      auth.logout();
    },
  },
};
</script>

<style scoped>
  .el-menu {
    text-align: left;
  }
</style>
