<template>
  <el-card class="box-card">
    <div slot="header">
      <span style="line-height: 36px;">Settings</span>
    </div>
    <el-alert title="Unauthorized" type="warning" :closable="false" show-icon></el-alert>
  </el-card>
</template>

<script>
export default {
  name: 'settings',
  created() {
    this.$emit('toggleView', 'withSidebar');
  },
};
</script>

<style scoped>

</style>
