<template>
  <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose">
      <el-submenu index="/opportunities">
        <template slot="title"><i class="el-icon-menu"></i>Opportunities</template>
        <el-menu-item index="opportunity-form"><i class="el-icon-plus"></i>Add new</el-menu-item>
      </el-submenu>
      <el-menu-item index="/"><i class="el-icon-document"></i>Suggested articles</el-menu-item>
      <el-menu-item index="/"><i class="el-icon-setting"></i>Settings</el-menu-item>
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
    logout() {
      auth.logout();
    },
    handleOpen(key) {
      this.$router.push(key);
    },
    handleClose(key) {
      this.$router.push(key);
    },
  },
};
</script>

<style scoped>

</style>
