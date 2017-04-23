<template>
  <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose">
    <el-menu-item-group title="Articles">
      <el-menu-item index="opportunities"><i class="el-icon-document"></i>My Articles</el-menu-item>
      <el-menu-item index="opportunity-form"><i class="el-icon-star-on"></i>Opportunities</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Publications">
      <el-menu-item index="/"><i class="el-icon-menu"></i>My Columns</el-menu-item>
      <el-menu-item index="/"><i class="el-icon-upload2"></i>Publish</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Extras">
      <el-menu-item index="settings"><i class="el-icon-setting"></i>Settings</el-menu-item>
    </el-menu-item-group>
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
